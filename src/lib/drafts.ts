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
  // 26/10/2026 : l'exemple Bien en règle est remplacé par une projection
  // affichée partout et étiquetée comme telle (BIENENREGLE_PROJECTION_6M,
  // src/lib/results.ts). Plus aucun brouillon pour l'instant.
  return [];
}
