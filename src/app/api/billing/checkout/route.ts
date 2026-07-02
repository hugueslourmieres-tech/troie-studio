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
  try {
    const body = await request.json();
    productKey = String(body?.product ?? "");
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const product = BILLING_PRODUCTS[productKey];
  if (!product) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }

  // Utilisateur connecté obligatoire : l'accès est rattaché au compte.
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return NextResponse.json({ error: "auth_not_configured" }, { status: 503 });
  }
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  const origin =
    request.headers.get("origin") ?? "https://troiestudio.fr";
  const isSubscription = product.interval !== "one_time";

  const session = await stripe.checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    client_reference_id: user.id,
    customer_email: user.email ?? undefined,
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
    metadata: { user_id: user.id, product_key: product.key },
    ...(isSubscription
      ? {
          subscription_data: {
            metadata: { user_id: user.id, product_key: product.key },
            // Essai gratuit : 7 jours, carte demandée, annulable avant débit.
            trial_period_days: 7,
          },
        }
      : {}),
    allow_promotion_codes: true,
    success_url: `${origin}/formations/dashboard?paiement=ok&produit=${product.key}`,
    cancel_url: `${origin}/formations/tarifs?paiement=annule`,
  });

  return NextResponse.json({ url: session.url });
}
