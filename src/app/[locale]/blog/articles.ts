import type { ComponentType } from "react";
import { ManagerPasRemplace } from "./_content/manager-pas-remplace";

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
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Articles triés du plus récent au plus ancien. */
export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);
