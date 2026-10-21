import "server-only";
import type { Client } from "@/components/AnalyticsPanel";

/**
 * Brouillons du tableau de bord : chiffres d'EXEMPLE, jamais en production.
 * Module serveur seulement. VERCEL_ENV est lu à l'exécution, côté serveur :
 * ces données ne partent dans la page que sur les prévisualisations Vercel
 * et en développement, jamais dans le JavaScript du site en ligne.
 */
const SHOW_DRAFTS =
  process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

export function draftClients(en: boolean): Client[] {
  if (!SHOW_DRAFTS) return [];
  return [
    {
      // EXEMPLE À REMPLACER (21/10/2026) : Bien en règle (bienenregle.com),
      // campagne Google Ads de deux mois. Le site n'est pas encore en ligne
      // et aucune campagne n'a tourné : AUCUN de ces chiffres n'est réel.
      // À remplacer par les vrais chiffres du compte Google Ads.
      id: "bien-en-regle",
      name: "Bien en règle",
      sector: en ? "Google Ads, example" : "Google Ads, exemple",
      draft: true,
      note: en
        ? "EXAMPLE DATA, NOT REAL. A two-month Google Ads campaign for bienenregle.com."
        : "DONNÉES D'EXEMPLE, NON RÉELLES. Une campagne Google Ads de deux mois pour bienenregle.com.",
      source: en
        ? "Example only. Real figures will come from the Google Ads account after two months."
        : "Exemple seulement. Les vrais chiffres viendront du compte Google Ads après deux mois.",
      metrics: [
        {
          id: "requests",
          label: en ? "Requests" : "Demandes",
          headline: 35,
          sub: en ? "in two months" : "en deux mois",
          data: {
            kind: "line",
            points: [
              { d: "2026-07-01", v: 0 },
              { d: "2026-07-15", v: 6 },
              { d: "2026-08-01", v: 14 },
              { d: "2026-08-15", v: 25 },
              { d: "2026-09-01", v: 35 },
            ],
          },
        },
      ],
    },
  ];
}
