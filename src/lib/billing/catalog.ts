/**
 * Catalogue de vente de la plateforme e-learning.
 *
 * Source de vérité unique pour les prix affichés ET facturés (les
 * Checkout Sessions Stripe sont créées avec ces montants en
 * `price_data` inline : rien à configurer dans le dashboard Stripe).
 *
 * Les one-shot donnent un accès à vie au cours (user_course_access,
 * expires_at null). L'abonnement donne accès à tout le catalogue tant
 * qu'il est actif (course_slug "abonnement", expires_at = fin de
 * période, renouvelé par webhook).
 *
 * Montants abonnement : [estimation] à valider par Hugues avant mise
 * en avant marketing. Les one-shot reprennent les prix déjà publiés
 * (97 € / 297 €, seed Supabase et pages cours).
 */

export type BillingProduct = {
  /** Identifiant interne, stocké dans user_course_access.course_slug. */
  key: string;
  /** Nom affiché sur la page tarifs et dans Stripe Checkout. */
  name: string;
  description: string;
  /** Montant TTC en centimes d'euro. */
  amountCents: number;
  /** one_time = accès à vie ; month/year = abonnement récurrent. */
  interval: "one_time" | "month" | "year";
  /** Slugs de cours couverts ("*" = tout le catalogue). */
  grants: string[];
};

export const BILLING_PRODUCTS: Record<string, BillingProduct> = {
  /**
   * Le pack AI Act vendu sur troie.app, en paiement unique.
   *
   * Il vit ici ET dans troie-app/src/lib/billing.ts, et ce n'est pas une
   * duplication paresseuse : la Checkout Session est creee par troie.app,
   * mais c'est le webhook de CE projet qui accorde l'acces, en relisant
   * `grants` par product_key dans ce catalogue. Une cle absente ici =
   * paiement encaisse, aucun acces accorde. Les deux doivent bouger ensemble.
   *
   * « aiact » est l'id du cours dans troie-app/src/lib/formation.ts.
   */
  "aiact-unitaire": {
    key: "aiact-unitaire",
    name: "Conformité AI Act · accès à vie",
    description:
      "Le parcours AI Act complet, l'examen et l'attestation nominative. Accès permanent, sans abonnement.",
    amountCents: 5900,
    interval: "one_time",
    grants: ["aiact"],
  },
  "cours-01": {
    key: "cours-01",
    name: "Cours 01 · Maîtriser ChatGPT & Claude",
    description: "4 modules, 90 min, 25 prompts livrés. Accès à vie.",
    amountCents: 9900,
    interval: "one_time",
    grants: ["cours-01"],
  },
  "cours-02": {
    key: "cours-02",
    name: "Cours 02 · Workflows IA",
    description: "7 modules, 3 h, Make, MCPs, agents persistants. Accès à vie.",
    amountCents: 29700,
    interval: "one_time",
    grants: ["cours-02"],
  },
  "abo-mensuel": {
    key: "abo-mensuel",
    name: "Abonnement TROIE Formations · mensuel",
    description: "Tout le catalogue, QCM, prompts et nouveautés. 7 jours d'essai gratuit.",
    amountCents: 2900,
    interval: "month",
    grants: ["*"],
  },
  "abo-annuel": {
    key: "abo-annuel",
    name: "Abonnement TROIE Formations · annuel",
    description: "Tout le catalogue, 2 mois offerts par rapport au mensuel.",
    amountCents: 29000,
    interval: "year",
    grants: ["*"],
  },
};

/** Slug d'accès unique posé en base pour un abonnement actif. */
export const SUBSCRIPTION_ACCESS_SLUG = "abonnement";

export function formatEuros(amountCents: number): string {
  const euros = amountCents / 100;
  return Number.isInteger(euros)
    ? `${euros} €`
    : `${euros.toFixed(2).replace(".", ",")} €`;
}
