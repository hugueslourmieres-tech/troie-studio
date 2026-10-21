/**
 * Résultats clients affichés sur le site (21/10/2026). Uniquement des
 * chiffres réels et vérifiables, jamais d'estimation ni d'arrondi flatteur.
 *
 * LOIR Paris : export Shopify (ShopifyQL, table sales, net_sales) lu le
 * 21/10/2026. Ventes nettes cumulées sur 12 mois glissants, en milliers
 * d'euros, de décembre 2022 à septembre 2026 (46 points). Visites (sessions)
 * et panier moyen : années pleines 2022 et 2025.
 *
 * Rutherford et Autajon : chiffres du CV 2026 de Hugues, obtenus avec le
 * groupe Rutherford (impression et packaging, B2B).
 */

/** Ventes nettes LOIR Paris sur 12 mois glissants, k€, déc. 2022 à sept. 2026. */
export const LOIR_ROLLING_K = [
  117.5, 119.7, 124.0, 129.4, 134.8, 131.4, 138.6, 149.2, 148.1, 140.2, 142.2,
  139.4, 137.4, 146.4, 155.0, 187.7, 187.2, 185.6, 182.3, 180.1, 176.6, 187.4,
  228.9, 232.8, 247.3, 253.0, 249.6, 262.0, 269.5, 285.4, 298.3, 316.7, 322.2,
  325.2, 354.2, 377.9, 370.6, 381.4, 426.8, 457.7, 465.0, 455.6, 453.7, 457.7,
  464.3, 493.8,
];

/** Index du point « septembre 2023 » dans LOIR_ROLLING_K (début des 3 ans). */
export const LOIR_SEP_2023 = 9;

/** Commandes par année pleine, LOIR Paris. */
export const LOIR_ORDERS = [
  { year: "2022", value: 1542 },
  { year: "2023", value: 1767 },
  { year: "2024", value: 3181 },
  { year: "2025", value: 4124 },
];
