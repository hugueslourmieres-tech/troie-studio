import type { ComponentType } from "react";
import { ManagerPasRemplace } from "./_content/manager-pas-remplace";
import { CommentUtiliserChatgptDebutant } from "./_content/comment-utiliser-chatgpt-debutant";
import { AiActEntreprise2026 } from "./_content/ai-act-entreprise-2026";
import { ArnaqueIaVoixClonee } from "./_content/arnaque-ia-voix-clonee";

export type Article = {
  slug: string;
  title: string;
  /** Titre court pour les cartes / fil d'Ariane (sinon = title). */
  cardTitle?: string;
  description: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  category: string;
  readingMinutes: number;
  /** Mots-clés indicatifs (SEO interne, non rendus). */
  keywords?: string[];
  Body: ComponentType;
};

export const ARTICLES: Article[] = [
  {
    slug: "ia-remplacer-mon-metier-manager-pas-remplace",
    title: "L'IA va-t-elle remplacer mon métier ? Manager, pas remplacé",
    cardTitle: "L'IA va-t-elle remplacer mon métier ?",
    description:
      "Le patron de Mistral l'a dit à l'Assemblée : on ne fait plus le travail, on manage des IA. Ce que ça change vraiment pour votre métier, et comment apprendre à manager l'IA.",
    date: "2026-06-22",
    category: "Comprendre l'IA",
    readingMinutes: 6,
    keywords: [
      "l'IA va-t-elle remplacer mon métier",
      "IA et emploi",
      "Mistral Assemblée nationale manager",
      "manager une IA",
    ],
    Body: ManagerPasRemplace,
  },
  {
    slug: "comment-utiliser-chatgpt-debutant",
    title: "Comment utiliser ChatGPT : le guide simple pour débuter",
    cardTitle: "Comment utiliser ChatGPT (guide débutant)",
    description:
      "Vous n'avez jamais osé vous lancer ? Le guide clair pour utiliser ChatGPT gratuitement : c'est quoi un prompt, 5 exemples, les erreurs à éviter. Sans jargon.",
    date: "2026-06-22",
    category: "Comprendre l'IA",
    readingMinutes: 7,
    keywords: [
      "comment utiliser ChatGPT",
      "ChatGPT débutant",
      "c'est quoi un prompt",
      "utiliser ChatGPT gratuitement",
    ],
    Body: CommentUtiliserChatgptDebutant,
  },
  {
    slug: "ai-act-entreprise-2026",
    title: "AI Act : ce que votre entreprise doit faire en 2026",
    cardTitle: "AI Act : ce que votre entreprise doit faire",
    description:
      "Former vos équipes à l'IA n'est plus optionnel : l'AI Act impose un niveau de compétence minimal, avec des sanctions en 2026. Les 4 étapes pour être en règle.",
    date: "2026-06-21",
    category: "L'IA au travail",
    readingMinutes: 7,
    keywords: [
      "AI Act entreprise",
      "AI Act 2026 que faire",
      "former ses équipes à l'IA",
      "conformité IA entreprise",
    ],
    Body: AiActEntreprise2026,
  },
  {
    slug: "arnaque-ia-voix-clonee",
    title:
      "On peut cloner votre voix en 30 secondes : l'arnaque IA à connaître",
    cardTitle: "Arnaque IA : on peut cloner votre voix",
    description:
      "Voix clonée, faux proche en détresse, faux conseiller bancaire : comment fonctionnent les arnaques par deepfake vocal, et les bons réflexes pour s'en protéger.",
    date: "2026-06-20",
    category: "L'IA à la maison",
    readingMinutes: 6,
    keywords: [
      "arnaque IA voix",
      "deepfake vocal",
      "cloner une voix IA",
      "se protéger arnaque IA",
    ],
    Body: ArnaqueIaVoixClonee,
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Articles triés du plus récent au plus ancien. */
export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);
