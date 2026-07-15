import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/billing/stripe";
import {
  BILLING_PRODUCTS,
  SUBSCRIPTION_ACCESS_SLUG,
} from "@/lib/billing/catalog";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendAccessEmail } from "@/lib/billing/emails";

/**
 * POST /api/stripe/webhook
 *
 * Seule source de vérité pour l'attribution des accès :
 * - checkout.session.completed (mode payment)  : accès à vie au cours.
 * - checkout.session.completed (mode subscription) : rien ici, on
 *   attend customer.subscription.* qui porte la période.
 * - customer.subscription.created/updated : upsert de l'accès
 *   "abonnement" avec expires_at = fin de période (+3 j de grâce).
 * - customer.subscription.deleted : accès coupé (expires_at = now).
 *
 * Idempotence : table billing_events (event.id en clé primaire).
 * Signature vérifiée avec STRIPE_WEBHOOK_SECRET.
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "billing_not_configured" }, { status: 503 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "supabase_not_configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      webhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  /*
   * Idempotence : on LIT si l'event est déjà traité, on ne l'écrit pas encore.
   *
   * L'ancienne version inserait ici, avant le travail, et prenait n'importe
   * quelle erreur d'insertion pour un doublon. Deux consequences : un echec
   * d'attribution laissait un 200 a Stripe, qui ne reessayait donc jamais, et
   * une table indisponible faisait passer tous les paiements pour des doublons.
   * L'argent rentrait, l'acces non, et rien ne le disait.
   *
   * Desormais l'event n'est marque qu'a la toute fin, si tout a reussi. Les
   * attributions etant des upsert, un rejeu apres echec partiel est sans
   * danger : c'est ce qui rend ce sens-la possible.
   */
  const { data: seen, error: seenError } = await admin
    .from("billing_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();
  if (seenError) {
    // La table ne repond pas : on ne devine pas, on laisse Stripe reessayer.
    console.error("[stripe] lecture billing_events", event.id, seenError);
    return NextResponse.json({ error: "dedupe_unavailable" }, { status: 503 });
  }
  if (seen) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  /** Collecte les echecs : un seul suffit a refuser le 200. */
  const failures: string[] = [];
  const check = (label: string, error: { message: string } | null) => {
    if (error) {
      console.error(`[stripe] ${label}`, event.id, error.message);
      failures.push(`${label}: ${error.message}`);
    }
  };

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId =
        session.metadata?.user_id ?? session.client_reference_id ?? null;
      const productKey = session.metadata?.product_key ?? null;
      const product = productKey ? BILLING_PRODUCTS[productKey] : null;
      if (!userId || !product) {
        /*
         * Rien a rejouer : une metadonnee absente n'apparaitra pas au retry.
         * Mais un paiement encaisse sans acces possible ne doit pas
         * disparaitre en silence, comme avant : il hurle dans les logs.
         */
        console.error("[stripe] session encaissee sans user ou produit connu", {
          event: event.id,
          userId,
          productKey,
          catalogue: Object.keys(BILLING_PRODUCTS),
        });
        break;
      }

      // Accès à vie pour les achats one-shot (les abonnements sont
      // gérés par les événements customer.subscription.*).
      if (session.mode === "payment") {
        for (const slug of product.grants) {
          if (slug === "*") continue;
          const { error } = await admin.from("user_course_access").upsert(
            {
              user_id: userId,
              course_slug: slug,
              source: "purchase",
              expires_at: null,
              stripe_ref: typeof session.id === "string" ? session.id : null,
            },
            { onConflict: "user_id,course_slug" },
          );
          // Le resultat n'etait pas lu : l'acces pouvait echouer sans un mot.
          check(`upsert acces ${slug} pour ${userId}`, error);
        }
      }

      // Email de bienvenue (one-shot comme abonnement), best-effort.
      const email =
        session.customer_details?.email ?? session.customer_email ?? null;
      if (email) {
        await sendAccessEmail({ to: email, productName: product.name });
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object;
      const userId = sub.metadata?.user_id ?? null;
      if (!userId) break;

      // Fin de période + 3 jours de grâce (retry de paiement Stripe).
      const periodEnds = sub.items.data
        .map((item) => item.current_period_end)
        .filter((n): n is number => typeof n === "number");
      const periodEnd = periodEnds.length ? Math.max(...periodEnds) : null;
      if (!periodEnd) break;

      const active = sub.status === "active" || sub.status === "trialing";
      const expiresAt = active
        ? new Date((periodEnd + 3 * 86400) * 1000).toISOString()
        : new Date().toISOString();

      const { error: subError } = await admin.from("user_course_access").upsert(
        {
          user_id: userId,
          course_slug: SUBSCRIPTION_ACCESS_SLUG,
          source: "subscription",
          expires_at: expiresAt,
          stripe_ref: sub.id,
        },
        { onConflict: "user_id,course_slug" },
      );
      check(`upsert abonnement pour ${userId}`, subError);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const userId = sub.metadata?.user_id ?? null;
      if (!userId) break;

      const { error: cutError } = await admin
        .from("user_course_access")
        .update({ expires_at: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("course_slug", SUBSCRIPTION_ACCESS_SLUG);
      check(`coupure abonnement pour ${userId}`, cutError);
      break;
    }

    case "charge.refunded": {
      /*
       * Rembourse = revoque. Sans ce cas, un achat unitaire rembourse gardait
       * son acces a vie : paye 59, rembourse 59, formation offerte. Decouvert
       * en remboursant le paiement de test du 15 juillet.
       *
       * On ne coupe que sur remboursement INTEGRAL (charge.refunded = true),
       * et uniquement les acces `source = purchase` : les abonnements ont
       * leur propre cycle via customer.subscription.*.
       */
      const charge = event.data.object;
      if (!charge.refunded) break; // remboursement partiel : on ne coupe pas
      const pi =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : (charge.payment_intent?.id ?? null);
      if (!pi) break;

      // La charge ne porte pas nos metadonnees : on remonte a la Checkout
      // Session par le payment_intent, c'est elle qui sait qui et quoi.
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: pi,
        limit: 1,
      });
      const session = sessions.data[0];
      const userId =
        session?.metadata?.user_id ?? session?.client_reference_id ?? null;
      const productKey = session?.metadata?.product_key ?? null;
      const product = productKey ? BILLING_PRODUCTS[productKey] : null;
      if (!userId || !product) {
        console.error("[stripe] remboursement sans session rattachable", {
          event: event.id,
          payment_intent: pi,
        });
        break;
      }
      for (const slug of product.grants) {
        if (slug === "*") continue;
        const { error } = await admin
          .from("user_course_access")
          .update({ expires_at: new Date().toISOString() })
          .eq("user_id", userId)
          .eq("course_slug", slug)
          .eq("source", "purchase");
        check(`revocation apres remboursement ${slug} pour ${userId}`, error);
      }
      break;
    }

    default:
      break;
  }

  /*
   * Un seul echec suffit a refuser le 200 : Stripe reessaiera, et les
   * attributions etant des upsert, le rejeu est sans danger. C'est tout
   * l'interet de ne marquer l'event qu'ici.
   */
  if (failures.length) {
    return NextResponse.json(
      { error: "processing_failed", failures },
      { status: 500 },
    );
  }

  const { error: markError } = await admin
    .from("billing_events")
    .insert({ id: event.id, type: event.type });
  if (markError) {
    /*
     * Course entre deux livraisons du meme event : l'autre l'a marque avant
     * nous. Le travail est fait des deux cotes et idempotent, donc c'est sans
     * consequence. On le note quand meme, ca ne devrait pas etre courant.
     */
    console.warn("[stripe] marquage event", event.id, markError.message);
  }

  return NextResponse.json({ received: true });
}
