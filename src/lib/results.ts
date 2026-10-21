/**
 * Résultats clients affichés sur le site. Uniquement des chiffres réels,
 * jamais d'estimation ni d'arrondi flatteur.
 *
 * LOIR Paris : export Shopify (ShopifyQL) lu le 21/10/2026. Cumuls sur 12
 * mois glissants, de septembre 2023 à septembre 2026 (37 points) :
 * ventes nettes (table sales, net_sales, en euros), commandes (orders),
 * visites (table sessions). Shopify ne mesure les visites que depuis
 * octobre 2022 : aucune comparaison de visites avant septembre 2023.
 *
 * Rutherford et Autajon : chiffres du CV 2026 de Hugues, obtenus avec le
 * groupe Rutherford (impression et packaging, B2B).
 */

/** Mois (AAAA-MM) des points des séries LOIR ci-dessous. */
export const LOIR_MONTHS = ["2023-09", "2023-10", "2023-11", "2023-12", "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"];

/** Ventes nettes sur 12 mois glissants, en euros. */
export const LOIR_SALES = [140189, 142235, 139431, 137413, 146420, 154979, 187690, 187229, 185579, 182310, 180076, 176642, 187358, 228876, 232817, 247268, 252998, 249637, 262014, 269472, 285402, 298325, 316700, 322208, 325206, 354243, 377881, 370561, 381431, 426780, 457711, 465045, 455583, 453749, 457716, 464254, 493815];

/** Commandes sur 12 mois glissants. */
export const LOIR_ORDERS_12M = [1785, 1844, 1804, 1767, 1834, 1923, 2444, 2459, 2465, 2419, 2398, 2372, 2470, 3027, 3028, 3181, 3287, 3243, 3268, 3294, 3376, 3505, 3604, 3622, 3631, 3974, 4202, 4124, 4237, 4755, 4775, 4895, 4856, 4795, 4945, 5051, 5447];

/** Visites (sessions) sur 12 mois glissants. */
export const LOIR_VISITS = [133506, 136422, 134209, 134829, 135679, 142848, 143936, 140357, 140729, 141330, 142306, 142539, 148954, 148617, 150765, 149612, 163276, 164996, 169907, 175753, 181218, 184623, 194641, 199364, 206223, 217244, 228358, 240556, 247507, 266736, 279805, 288266, 291678, 300166, 310115, 318206, 331941];

/** Commandes par année pleine (table sales). */
export const LOIR_ORDERS = [
  { year: "2022", value: 1542 },
  { year: "2023", value: 1767 },
  { year: "2024", value: 3181 },
  { year: "2025", value: 4124 },
];

/** Panier moyen par année pleine, en euros (table sales). */
export const LOIR_AOV = { from: 78.72, to: 94.62, fromYear: "2022", toYear: "2025" };
