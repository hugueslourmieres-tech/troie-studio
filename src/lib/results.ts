/**
 * Résultats clients affichés sur le site. Uniquement des chiffres réels,
 * jamais d'estimation ni d'arrondi flatteur.
 *
 * LOIR Paris (21/10/2026, décision de Hugues) : UNIQUEMENT des pourcentages
 * d'évolution, jamais de montant ni de volume. Les valeurs brutes (export
 * Shopify, ShopifyQL, lu le 21/10/2026) ne sont PAS dans le dépôt : ce
 * fichier part dans le JavaScript du navigateur. Séries : évolution en %
 * par rapport à septembre 2024, cumuls sur 12 mois glissants, de septembre
 * 2024 à septembre 2026 (25 points), deux ans à la demande de Hugues. Shopify ne mesure les visites que
 * depuis octobre 2022 : aucune comparaison de visites avant septembre 2023.
 *
 * Rutherford et Autajon : chiffres du CV 2026 de Hugues, obtenus avec le
 * groupe Rutherford (impression et packaging, B2B).
 */

/** Mois (AAAA-MM) des points des séries LOIR ci-dessous. */
export const LOIR_MONTHS = ["2024-09", "2024-10", "2024-11", "2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"];

/** Ventes nettes, évolution en % depuis septembre 2024 (12 mois glissants). */
export const LOIR_SALES_PCT = [0.0, 22.2, 24.3, 32.0, 35.0, 33.2, 39.8, 43.8, 52.3, 59.2, 69.0, 72.0, 73.6, 89.1, 101.7, 97.8, 103.6, 127.8, 144.3, 148.2, 143.2, 142.2, 144.3, 147.8, 163.6];

/** Commandes, évolution en % depuis septembre 2024 (12 mois glissants). */
export const LOIR_ORDERS_PCT = [0.0, 22.6, 22.6, 28.8, 33.1, 31.3, 32.3, 33.4, 36.7, 41.9, 45.9, 46.6, 47.0, 60.9, 70.1, 67.0, 71.5, 92.5, 93.3, 98.2, 96.6, 94.1, 100.2, 104.5, 120.5];

/** Visites, évolution en % depuis septembre 2024 (12 mois glissants). */
export const LOIR_VISITS_PCT = [0.0, -0.2, 1.2, 0.4, 9.6, 10.8, 14.1, 18.0, 21.7, 23.9, 30.7, 33.8, 38.4, 45.8, 53.3, 61.5, 66.2, 79.1, 87.8, 93.5, 95.8, 101.5, 108.2, 113.6, 122.8];

/** Commandes par année pleine, évolution en % par rapport à 2023. */
export const LOIR_ORDERS_YEARLY_PCT = [{"year": "2023", "pct": 0}, {"year": "2024", "pct": 80}, {"year": "2025", "pct": 133}];
