import type { QuizQuestion } from "./QuizPlayer";
import {
  COMPRENDRE_IA,
  IA_EN_FAMILLE,
  OUTILS_QUOTIDIEN,
  SECURITE_LIMITES,
  MODULE_0_FREE,
  COURSE_01_PREVIEW,
  COURSE_02_PREVIEW,
} from "./questions";

/* ─────────────────────────────────────────────────────────────────────
   Catalogue des QCM TROIE.

   La plateforme a deux versants :
   - PERSO   : comprendre l'IA, l'utiliser sans danger, en famille.
   - PRO     : prompting, agents, automatisation (parcours payants).

   Les 4 QCM "starter" (free + starter) sont disponibles dès la
   création de compte. On ne met pas en avant les vidéos pas encore
   produites : cliquer sur un cours lance directement le QCM.
   ───────────────────────────────────────────────────────────────────── */

export type QuizCategory = "perso" | "pro";
export type QuizLevel = "Découverte" | "Intermédiaire" | "Avancé";

export type Quiz = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: QuizCategory;
  audience: string;
  level: QuizLevel;
  minutes: number;
  /** Accessible sans achat (dès la création de compte). */
  free: boolean;
  /** Mis en avant comme l'un des QCM de départ. */
  starter: boolean;
  questions: QuizQuestion[];
  /** Aperçu d'un parcours payant : le QCM est un teaser. */
  locked?: boolean;
  /** CTA de fin de quiz (sinon, défaut générique). */
  ctaHref?: string;
  ctaLabel?: string;
};

export const QUIZZES: Quiz[] = [
  /* ── 4 QCM STARTER (perso, gratuits, dès l'inscription) ── */
  {
    slug: "comprendre-ia",
    title: "Comprendre l'IA",
    tagline: "Les bases, sans jargon",
    description:
      "Ce qu'est vraiment une IA générative, comment elle fonctionne, ce qu'elle sait et ne sait pas faire.",
    category: "perso",
    audience: "Tout public",
    level: "Découverte",
    minutes: 8,
    free: true,
    starter: true,
    questions: COMPRENDRE_IA,
  },
  {
    slug: "ia-en-famille",
    title: "L'IA en famille",
    tagline: "Parents & enfants",
    description:
      "Comprendre les limites de l'IA et utiliser ces outils en famille, sans se mettre en danger.",
    category: "perso",
    audience: "Parents & enfants",
    level: "Découverte",
    minutes: 8,
    free: true,
    starter: true,
    questions: IA_EN_FAMILLE,
  },
  {
    slug: "outils-au-quotidien",
    title: "Bien utiliser les outils",
    tagline: "ChatGPT, Claude, Gemini",
    description:
      "Les bons réflexes pour tirer le meilleur des outils IA dans la vie de tous les jours.",
    category: "perso",
    audience: "Tout public",
    level: "Découverte",
    minutes: 8,
    free: true,
    starter: true,
    questions: OUTILS_QUOTIDIEN,
  },
  {
    slug: "limites-securite",
    title: "Limites & sécurité",
    tagline: "Vérifier, protéger, garder l'esprit critique",
    description:
      "Hallucinations, données personnelles, arnaques : utiliser l'IA en confiance, mais en sécurité.",
    category: "perso",
    audience: "Tout public",
    level: "Découverte",
    minutes: 8,
    free: true,
    starter: true,
    questions: SECURITE_LIMITES,
  },

  /* ── Pour aller plus loin (perso) ── */
  {
    slug: "theorie-llm",
    title: "Théorie des LLM",
    tagline: "Sous le capot",
    description:
      "Pre-training, RLHF, hallucinations, sycophancy : comment un grand modèle de langage est fabriqué.",
    category: "perso",
    audience: "Curieux & tech",
    level: "Intermédiaire",
    minutes: 10,
    free: true,
    starter: false,
    questions: MODULE_0_FREE,
  },

  /* ── PRO : aperçus des parcours payants ── */
  {
    slug: "prompting-pro",
    title: "Prompting pro",
    tagline: "Parcours 01 · aperçu",
    description:
      "Structurer ses prompts, créer des system prompts, automatiser ses tâches solo. Aperçu du Parcours 01.",
    category: "pro",
    audience: "Indépendants & solo",
    level: "Intermédiaire",
    minutes: 3,
    free: true,
    starter: false,
    questions: COURSE_01_PREVIEW,
    locked: true,
    ctaHref: "/formations/cours-01",
    ctaLabel: "Voir le Parcours 01",
  },
  {
    slug: "agents-automatisation",
    title: "Agents & automatisation",
    tagline: "Parcours 02 · aperçu",
    description:
      "Agents persistants, MCP, workflows Make. Aperçu du Parcours 02 pour aller plus loin.",
    category: "pro",
    audience: "Équipes & pros",
    level: "Avancé",
    minutes: 3,
    free: true,
    starter: false,
    questions: COURSE_02_PREVIEW,
    locked: true,
    ctaHref: "/formations/cours-02",
    ctaLabel: "Voir le Parcours 02",
  },
];

export const STARTER_QUIZZES = QUIZZES.filter((q) => q.starter);
export const PERSO_QUIZZES = QUIZZES.filter((q) => q.category === "perso");
export const PRO_QUIZZES = QUIZZES.filter((q) => q.category === "pro");

export function getQuiz(slug: string): Quiz | undefined {
  return QUIZZES.find((q) => q.slug === slug);
}
