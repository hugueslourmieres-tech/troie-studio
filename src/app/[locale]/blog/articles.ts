import type { ComponentType } from "react";
import { ManagerPasRemplace } from "./_content/manager-pas-remplace";
import { CommentUtiliserChatgptDebutant } from "./_content/comment-utiliser-chatgpt-debutant";
import { AiActEntreprise2026 } from "./_content/ai-act-entreprise-2026";
import { ArnaqueIaVoixClonee } from "./_content/arnaque-ia-voix-clonee";
import { CommentEcrireUnPrompt } from "./_content/comment-ecrire-un-prompt";
import { ChatgptClaudeGeminiLeChat } from "./_content/chatgpt-claude-gemini-le-chat";
import { PourquoiLiaHallucine } from "./_content/pourquoi-lia-hallucine";
import { GlossaireIa } from "./_content/glossaire-ia";
import { IaViePriveeDonnees } from "./_content/ia-vie-privee-donnees";
import { IaEnfantEcole } from "./_content/ia-enfant-ecole";
import { CestQuoiUnAgentIa } from "./_content/cest-quoi-un-agent-ia";
import { IaEthique } from "./_content/ia-ethique";

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
  /** Image d'aperçu (rendue en duotone orange). */
  cover: string;
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
    cover: "/images/blog/manager.jpg",
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
    cover: "/images/blog/chatgpt-debutant.jpg",
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
    cover: "/images/blog/ai-act.jpg",
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
    cover: "/images/blog/arnaque-voix.jpg",
    keywords: [
      "arnaque IA voix",
      "deepfake vocal",
      "cloner une voix IA",
      "se protéger arnaque IA",
    ],
    Body: ArnaqueIaVoixClonee,
  },
  {
    slug: "comment-ecrire-un-prompt",
    title: "Comment écrire un bon prompt : la recette + 8 exemples",
    cardTitle: "Comment écrire un bon prompt",
    description:
      "La réponse de l'IA est moyenne ? C'est la question qui l'est. La recette d'un bon prompt en 4 ingrédients, avec 8 exemples prêts à copier.",
    date: "2026-06-19",
    category: "Comprendre l'IA",
    readingMinutes: 5,
    cover: "/images/blog/prompt.jpg",
    keywords: ["c'est quoi un prompt", "comment écrire un prompt", "exemples de prompts"],
    Body: CommentEcrireUnPrompt,
  },
  {
    slug: "chatgpt-claude-gemini-le-chat",
    title: "ChatGPT, Claude, Gemini, Le Chat : lequel choisir en 2026 ?",
    cardTitle: "ChatGPT, Claude, Gemini ou Le Chat ?",
    description:
      "Comparatif simple et sans parti pris des 4 IA du moment : leurs différences, et laquelle choisir selon votre besoin (dont l'option française, Mistral).",
    date: "2026-06-18",
    category: "Comprendre l'IA",
    readingMinutes: 5,
    cover: "/images/blog/comparatif.jpg",
    keywords: ["ChatGPT vs Claude vs Gemini", "quelle IA choisir", "Le Chat Mistral"],
    Body: ChatgptClaudeGeminiLeChat,
  },
  {
    slug: "pourquoi-lia-hallucine",
    title: "Pourquoi l'IA invente des choses (et comment la vérifier)",
    cardTitle: "Pourquoi l'IA \"hallucine\"",
    description:
      "L'IA vous donne une info crédible mais fausse ? On appelle ça une hallucination. Pourquoi ça arrive, et 3 réflexes pour ne jamais se faire avoir.",
    date: "2026-06-17",
    category: "Comprendre l'IA",
    readingMinutes: 5,
    cover: "/images/blog/hallucinations.jpg",
    keywords: ["l'IA hallucine", "ChatGPT se trompe", "vérifier une réponse IA"],
    Body: PourquoiLiaHallucine,
  },
  {
    slug: "glossaire-ia",
    title: "Glossaire de l'IA : 20 mots expliqués simplement",
    cardTitle: "Glossaire de l'IA (20 mots simples)",
    description:
      "IA, LLM, prompt, token, agent, hallucination, deepfake, AI Act... Le vocabulaire de l'IA expliqué en une phrase chacun, sans jargon.",
    date: "2026-06-16",
    category: "Comprendre l'IA",
    readingMinutes: 6,
    cover: "/images/blog/glossaire.jpg",
    keywords: ["glossaire IA", "vocabulaire intelligence artificielle", "lexique IA"],
    Body: GlossaireIa,
  },
  {
    slug: "ia-vie-privee-donnees",
    title: "IA et vie privée : ce qu'il ne faut jamais coller dans ChatGPT",
    cardTitle: "IA et vie privée : ce qu'il ne faut jamais coller",
    description:
      "Où vont vos messages ? Ce qu'il ne faut jamais confier à une IA, et 3 réglages pour reprendre la main sur vos données (perso et entreprise).",
    date: "2026-06-15",
    category: "L'IA à la maison",
    readingMinutes: 5,
    cover: "/images/blog/vie-privee.jpg",
    keywords: ["ChatGPT données personnelles", "IA RGPD", "confidentialité ChatGPT"],
    Body: IaViePriveeDonnees,
  },
  {
    slug: "ia-enfant-ecole",
    title: "Votre enfant fait ses devoirs avec l'IA : interdire ou accompagner ?",
    cardTitle: "Votre enfant et l'IA à l'école",
    description:
      "60 % des lycéens utilisent déjà l'IA, souvent en cachette. Pourquoi interdire ne marche pas, et 4 règles simples pour accompagner sans diaboliser.",
    date: "2026-06-14",
    category: "L'IA à la maison",
    readingMinutes: 5,
    cover: "/images/blog/ecole.jpg",
    keywords: ["enfant IA école", "ado ChatGPT devoirs", "IA et triche scolaire"],
    Body: IaEnfantEcole,
  },
  {
    slug: "cest-quoi-un-agent-ia",
    title: "C'est quoi un agent IA ? (et ce que ça change pour votre travail)",
    cardTitle: "C'est quoi un agent IA ?",
    description:
      "ChatGPT répond, un agent IA agit. La différence en clair, un exemple concret, et les garde-fous à connaître avant de leur déléguer des tâches.",
    date: "2026-06-13",
    category: "L'IA au travail",
    readingMinutes: 5,
    cover: "/images/blog/agent.jpg",
    keywords: ["c'est quoi un agent IA", "agent IA définition", "automatiser avec l'IA"],
    Body: CestQuoiUnAgentIa,
  },
  {
    slug: "ia-ethique",
    title: "IA éthique : c'est quoi concrètement (et pourquoi ça compte)",
    cardTitle: "IA éthique : c'est quoi concrètement ?",
    description:
      "L'IA éthique, ce n'est pas une IA gentille. Définition simple, pourquoi ça compte (biais, désinformation, données) et 4 réflexes au quotidien.",
    date: "2026-06-12",
    category: "Comprendre l'IA",
    readingMinutes: 5,
    cover: "/images/blog/ethique.jpg",
    keywords: ["IA éthique", "intelligence artificielle éthique", "IA responsable"],
    Body: IaEthique,
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Articles triés du plus récent au plus ancien. */
export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);
