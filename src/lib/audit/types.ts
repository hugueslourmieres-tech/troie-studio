/**
 * Types partagés entre le moteur d'audit (serveur) et la page
 * /audit-seo-gratuit (client). Aucun import serveur ici.
 */

export type CheckStatus = "pass" | "warn" | "fail";
export type CategoryId = "technique" | "contenu" | "ia" | "performance";
export type Band = "excellent" | "bon" | "renforcer" | "fragile";

/** Une vérification complète : ce qui a été trouvé, pourquoi ça compte, quoi faire. */
export type Check = {
  id: string;
  cat: CategoryId;
  title: string;
  status: CheckStatus;
  weight: number;
  found: string;
  why: string;
  fix: string;
};

export type CategoryScore = { id: CategoryId; label: string; score: number };

/** Correctif pré-écrit pour le site audité (déterministe, à relire). */
export type Fix = {
  id: string;
  title: string;
  intro: string;
  code: string;
  file?: string;
};

/** Ce que le visiteur reçoit sans laisser son e-mail. */
export type AuditSummary = {
  scanId: string;
  url: string;
  host: string;
  /** Score global historique (notification e-mail). N'est plus affiché en tête. */
  score: number;
  band: Band;
  /** Visibilité sur Google : technique, contenu, performance. */
  seoScore: number;
  seoBand: Band;
  /** Visibilité dans les IA : la famille « Lisibilité IA ». */
  geoScore: number;
  geoBand: Band;
  /** Le côté le plus faible (égalité : « geo »). */
  weakest: "seo" | "geo";
  categories: CategoryScore[];
  /** Les trois points les plus importants, titres seulement. */
  issues: { id: string; title: string; cat: CategoryId; status: CheckStatus }[];
  /** La liste des vérifications, sans explication ni correctif. */
  checks: { id: string; title: string; cat: CategoryId; status: CheckStatus }[];
  counts: { pass: number; warn: number; fail: number };
  /** Nombre de correctifs pré-écrits qui attendent dans le rapport. */
  fixCount: number;
  durationMs: number;
  fetchedAt: string;
};

/** Le rapport détaillé, débloqué contre l'e-mail. */
export type AuditFull = AuditSummary & { details: Check[]; fixes: Fix[]; emailNote?: string };

/** Étapes réelles du scan, envoyées au fil de l'eau par /api/scan-ia. */
export type PhaseId = "home" | "robots" | "sitemap" | "llms" | "markup" | "score";

export type StreamEvent =
  | { type: "phase"; id: PhaseId }
  | { type: "result"; summary: AuditSummary }
  | { type: "error"; error: "unreachable" | "blocked" | "failed"; status?: number };

export function bandOf(score: number): Band {
  if (score >= 85) return "excellent";
  if (score >= 70) return "bon";
  if (score >= 50) return "renforcer";
  return "fragile";
}
