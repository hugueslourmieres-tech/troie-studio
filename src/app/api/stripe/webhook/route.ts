import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/billing/stripe";
import {
  BILLING_PRODUCTS,
  SUBSCRIPTION_ACCESS_SLUG,
} from "@/lib/billing/catalog";
import { createAdminClient } from "@/lib/supabase/admin";

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

  // Idempotence : si l'event a déjà été traité, on répond 200 sans agir.
  const { error: dedupeError } = await admin
    .from("billing_events")
    .insert({ id: event.id, type: event.type });
  if (dedupeError) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.mode !== "payment") break; // abonnements gérés plus bas

      const userId =
        session.metadata?.user_id ?? session.client_reference_id ?? null;
      const productKey = session.metadata?.product_key ?? null;
      const product = productKey ? BILLING_PRODUCTS[productKey] : null;
      if (!userId || !product) break;

      // Accès à vie à chaque cours couvert par le produit.
      for (const slug of product.grants) {
        if (slug === "*") continue;
        await admin.from("user_course_access").upsert(
          {
            user_id: userId,
            course_slug: slug,
            source: "purchase",
            expires_at: null,
            stripe_ref: typeof session.id === "string" ? session.id : null,
          },
          { onConflict: "user_id,course_slug" },
        );
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

      await admin.from("user_course_access").upsert(
        {
          user_id: userId,
          course_slug: SUBSCRIPTION_ACCESS_SLUG,
          source: "subscription",
          expires_at: expiresAt,
          stripe_ref: sub.id,
        },
        { onConflict: "user_id,course_slug" },
      );
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const userId = sub.metadata?.user_id ?? null;
      if (!userId) break;

      await admin
        .from("user_course_access")
        .update({ expires_at: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("course_slug", SUBSCRIPTION_ACCESS_SLUG);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
