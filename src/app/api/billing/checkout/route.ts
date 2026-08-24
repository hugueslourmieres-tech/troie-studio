import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/billing/stripe";
import { BILLING_PRODUCTS } from "@/lib/billing/catalog";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/billing/checkout  { product: "cours-01" | "abo-mensuel" | ... }
 *
 * Crée une Stripe Checkout Session pour l'utilisateur connecté et
 * renvoie son URL. Les prix viennent du catalogue (price_data inline),
 * l'attribution d'accès se fait dans le webhook, jamais ici.
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "billing_not_configured" },
      { status: 503 },
    );
  }

  let productKey = "";
  let siteRaw = "";
  let localeRaw = "";
  try {
    const body = await request.json();
    productKey = String(body?.product ?? "");
    siteRaw = String(body?.site ?? "");
    localeRaw = String(body?.locale ?? "");
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const product = BILLING_PRODUCTS[productKey];
  if (!product) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }

  /*
   * Utilisateur connecté obligatoire pour tout ce qui débloque un accès :
   * l'accès est rattaché au compte. Les prestations de service (audit)
   * s'achètent SANS compte : Stripe collecte l'email, le webhook notifie.
   */
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    if (!product.service) {
      return NextResponse.json({ error: "auth_not_configured" }, { status: 503 });
    }
  }
  if (!user && !product.service) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  /* Contexte de la commande de service : site scanné, langue de retour. */
  const locale = localeRaw === "en" ? "en" : "fr";
  const site = siteRaw
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9.:_\/-]/g, "")
    .slice(0, 120);

  /*
   * L'origine ne vient PAS du header `Origin` : il est fourni par l'appelant,
   * donc n'importe quel site pourrait faire renvoyer nos clients chez lui
   * après paiement. On la prend de la configuration, et on ne tolère le
   * header qu'en développement, où il vaut localhost. Même durcissement que
   * troie-app (checkout/route.ts), corrigé là-bas en premier.
   */
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "development"
      ? (request.headers.get("origin") ?? "http://localhost:3000")
      : "https://troiestudio.fr");
  const isSubscription = product.interval !== "one_time";

  const session = await stripe.checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    client_reference_id: user?.id ?? undefined,
    customer_email: user?.email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: product.amountCents,
          product_data: {
            name: product.name,
            description: product.description,
          },
          ...(isSubscription
            ? { recurring: { interval: product.interval as "month" | "year" } }
            : {}),
        },
      },
    ],
    metadata: {
      ...(user ? { user_id: user.id } : {}),
      product_key: product.key,
      ...(product.service && site ? { site } : {}),
    },
    ...(isSubscription
      ? {
          subscription_data: {
            metadata: { user_id: user!.id, product_key: product.key },
            // Essai gratuit : 7 jours, carte demandée, annulable avant débit.
            trial_period_days: 7,
          },
        }
      : {}),
    allow_promotion_codes: true,
    /*
     * Consentement explicite au moment de payer : contenu numérique fourni
     * immédiatement, donc la renonciation au droit de rétractation doit être
     * expresse (art. L221-28 C. conso). Même clause que côté troie.app.
     */
    custom_text: {
      submit: {
        message: product.service
          ? "En payant, vous acceptez les CGV (troiestudio.fr/cgv). Nous vous contactons sous 48 h ouvrées pour valider le périmètre avant de démarrer la prestation."
          : "En payant, vous acceptez les CGV (troiestudio.fr/cgv) et demandez l'accès immédiat au contenu, ce qui vaut renonciation expresse au droit de rétractation.",
      },
    },
    success_url: product.service
      ? `${origin}/${locale}/scan-ia/merci`
      : `${origin}/formations/dashboard?paiement=ok&produit=${product.key}`,
    cancel_url: product.service
      ? `${origin}/${locale}/scan-ia?paiement=annule`
      : `${origin}/formations/tarifs?paiement=annule`,
  });

  return NextResponse.json({ url: session.url });
}
