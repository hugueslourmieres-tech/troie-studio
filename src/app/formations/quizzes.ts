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
import { NIVEAU_IA } from "./niveau-ia";

/** Palier de résultat (QCM à 3 niveaux comme « niveau IA »). */
export type QuizTier = { min: number; label: string; body: string };

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
  /** Pictogramme (path SVG Lucide-style, viewBox 0 0 24 24). */
  icon: string;
  /** Image de couverture (photo CC, rendue en duotone orange). */
  cover: string;
  /** Aperçu d'un parcours payant : le QCM est un teaser. */
  locked?: boolean;
  /** CTA de fin de quiz (sinon, défaut générique). */
  ctaHref?: string;
  ctaLabel?: string;
  /** QCM "niveau" : 3 paliers de résultat au lieu d'un pass/fail binaire. */
  tiers?: QuizTier[];
  /** CTA secondaire "nous contacter" en fin de QCM. */
  contactHref?: string;
  contactLabel?: string;
};

export const QUIZZES: Quiz[] = [
  /* ── QCM phare : situer son niveau en IA, pour tous ── */
  {
    slug: "niveau-ia",
    cover: "/images/quiz/niveau-ia.jpg",
    icon: "M12 2a4.5 4.5 0 0 0-4.5 4.5v.5A3.5 3.5 0 0 0 5 10.5 3.5 3.5 0 0 0 7 14a3.5 3.5 0 0 0 .5 5 3.5 3.5 0 0 0 4.5 1.5M12 2a4.5 4.5 0 0 1 4.5 4.5v.5A3.5 3.5 0 0 1 19 10.5 3.5 3.5 0 0 1 17 14a3.5 3.5 0 0 1-.5 5 3.5 3.5 0 0 1-4.5 1.5M12 2v18.5",
    title: "Connaître mon niveau en IA",
    tagline: "10 questions · 3 niveaux",
    description:
      "10 questions, des bases jusqu'aux agents et au MCP, pour situer votre niveau en IA et savoir par où continuer. Pour tous, particuliers comme pros.",
    category: "perso",
    audience: "Tout public",
    level: "Découverte",
    minutes: 6,
    free: true,
    starter: true,
    questions: NIVEAU_IA,
    ctaHref: "/formations",
    ctaLabel: "Voir les formations",
    contactHref: "/fr/contact",
    contactLabel: "Nous contacter",
    tiers: [
      {
        min: 0,
        label: "Débutant",
        body: "Vous découvrez l'IA, et c'est le meilleur moment pour bien démarrer. Nos formations « Découverte » posent les bases utiles dès la première séance, sans jargon.",
      },
      {
        min: 0.5,
        label: "Intermédiaire",
        body: "Vous avez de bons réflexes. On passe à la vitesse supérieure : prompting avancé, bons outils et premiers workflows pour gagner du temps au quotidien.",
      },
      {
        min: 0.8,
        label: "Avancé",
        body: "Vous maîtrisez les fondamentaux. Place aux agents, à l'automatisation via MCP et au déploiement en équipe. Parlons de votre cas concret.",
      },
    ],
  },
  /* ── 4 QCM STARTER (perso, gratuits, dès l'inscription) ── */
  {
    slug: "comprendre-ia",
    cover: "/images/quiz/ci-3.jpg",
    icon: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4",
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
    cover: "/images/quiz/fam-1.jpg",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
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
    cover: "/images/quiz/out-2.jpg",
    icon: "m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z",
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
    cover: "/images/quiz/sec-1.jpg",
    icon: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM9 12l2 2 4-4",
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
    cover: "/images/quiz/ci-1.jpg",
    icon: "M12 2a4.5 4.5 0 0 0-4.5 4.5v.5A3.5 3.5 0 0 0 5 10.5 3.5 3.5 0 0 0 7 14a3.5 3.5 0 0 0 .5 5 3.5 3.5 0 0 0 4.5 1.5M12 2a4.5 4.5 0 0 1 4.5 4.5v.5A3.5 3.5 0 0 1 19 10.5 3.5 3.5 0 0 1 17 14a3.5 3.5 0 0 1-.5 5 3.5 3.5 0 0 1-4.5 1.5M12 2v18.5",
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
    cover: "/images/quiz/ci-7.jpg",
    icon: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M16 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0",
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
    cover: "/images/quiz/sec-3.jpg",
    icon: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83zM2 12.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92M2 17.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92",
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
