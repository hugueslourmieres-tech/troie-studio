import Stripe from "stripe";

/**
 * Client Stripe serveur, instancié à la demande.
 *
 * Sans STRIPE_SECRET_KEY (dev local, préproduction), getStripe()
 * renvoie null et les routes de facturation répondent 503 : le reste
 * de la plateforme (mode démo) continue de fonctionner.
 */
let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(key);
  }
  return stripeSingleton;
}
