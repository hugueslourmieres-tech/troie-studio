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
import { FormationIaObligatoireEntreprise } from "./_content/formation-ia-obligatoire-entreprise";
import { AgentIaPmeGuide } from "./_content/agent-ia-pme-guide";
import { FormationIaObligatoireEntrepriseEn } from "./_content/formation-ia-obligatoire-entreprise.en";
import { AgentIaPmeGuideEn } from "./_content/agent-ia-pme-guide.en";
import { AiActEntreprise2026En } from "./_content/ai-act-entreprise-2026.en";
import { ManagerPasRemplaceEn } from "./_content/manager-pas-remplace.en";
import { CommentUtiliserChatgptDebutantEn } from "./_content/comment-utiliser-chatgpt-debutant.en";
import { CommentEcrireUnPromptEn } from "./_content/comment-ecrire-un-prompt.en";
import { ChatgptClaudeGeminiLeChatEn } from "./_content/chatgpt-claude-gemini-le-chat.en";
import { PourquoiLiaHallucineEn } from "./_content/pourquoi-lia-hallucine.en";
import { GlossaireIaEn } from "./_content/glossaire-ia.en";
import { IaViePriveeDonneesEn } from "./_content/ia-vie-privee-donnees.en";
import { ArnaqueIaVoixCloneeEn } from "./_content/arnaque-ia-voix-clonee.en";
import { IaEnfantEcoleEn } from "./_content/ia-enfant-ecole.en";
import { CestQuoiUnAgentIaEn } from "./_content/cest-quoi-un-agent-ia.en";
import { IaEthiqueEn } from "./_content/ia-ethique.en";
import { AccessibiliteSiteWebObligation } from "./_content/accessibilite-site-web-obligation";
import { AccessibiliteSiteWebObligationEn } from "./_content/accessibilite-site-web-obligation.en";
import { AiActControlable2Aout2026 } from "./_content/ai-act-controlable-2-aout-2026";
import { AiActControlable2Aout2026En } from "./_content/ai-act-controlable-2-aout-2026.en";

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
  /** Version anglaise (vraie traduction) : absente = article FR seul. */
  titleEn?: string;
  cardTitleEn?: string;
  descriptionEn?: string;
  BodyEn?: ComponentType;
};

/** Libellés de catégories pour la version anglaise. */
export const CATEGORY_EN: Record<string, string> = {
  "Comprendre l'IA": "Understanding AI",
  "L'IA au travail": "AI at work",
  "L'IA à la maison": "AI at home",
  Conformité: "Compliance",
};

/**
 * Champs d'un article dans la locale demandée. La version EN n'est
 * servie que si la traduction existe (BodyEn), sinon repli FR.
 */
export function localizeArticle(a: Article, locale: string) {
  const en = locale === "en" && !!a.BodyEn;
  return {
    hasEn: !!a.BodyEn,
    title: en ? a.titleEn ?? a.title : a.title,
    cardTitle: en
      ? a.cardTitleEn ?? a.titleEn ?? a.title
      : a.cardTitle ?? a.title,
    description: en ? a.descriptionEn ?? a.description : a.description,
    category: en ? CATEGORY_EN[a.category] ?? a.category : a.category,
    Body: en && a.BodyEn ? a.BodyEn : a.Body,
  };
}

export const ARTICLES: Article[] = [
  {
    slug: "ai-act-controlable-2-aout-2026",
    title:
      "AI Act : ce qui devient contrôlable le 2 août 2026 (et ce que votre PME doit avoir fait avant)",
    cardTitle: "AI Act : contrôlable le 2 août 2026",
    description:
      "Le 2 août 2026, les autorités peuvent contrôler et sanctionner. L'obligation de former vos équipes existe depuis février 2025. Qui est concerné, ce que vous risquez, et le minimum vital en 4 semaines.",
    date: "2026-07-06",
    category: "Conformité",
    readingMinutes: 6,
    cover: "/images/blog/ai-act-2-aout.jpg",
    keywords: [
      "AI Act 2 août 2026",
      "contrôle AI Act entreprise",
      "article 4 littératie IA",
      "obligation formation IA PME",
      "sanction AI Act",
    ],
    titleEn:
      "The EU AI Act becomes enforceable on August 2, 2026: what your SMB must have done by then",
    cardTitleEn: "EU AI Act: enforceable August 2, 2026",
    descriptionEn:
      "On August 2, 2026, national supervisory authorities can inspect and fine. The obligation to train your teams has applied since February 2025. Who is affected, what you risk, and the bare minimum in 4 weeks.",
    Body: AiActControlable2Aout2026,
    BodyEn: AiActControlable2Aout2026En,
  },
  {
    slug: "accessibilite-site-web-obligation",
    title:
      "Accessibilité web obligatoire : ce que l'affaire Carrefour change pour votre site",
    cardTitle: "Accessibilité web : l'affaire Carrefour",
    description:
      "Depuis juin 2025, l'accessibilité est obligatoire pour l'e-commerce. Carrefour vient d'être condamné sous astreinte. Qui est concerné, les 5 familles de critères, et par où commencer.",
    date: "2026-07-04",
    category: "Conformité",
    readingMinutes: 6,
    cover: "/images/blog/accessibilite-carrefour.jpg",
    keywords: [
      "accessibilité site web obligatoire",
      "RGAA e-commerce",
      "European Accessibility Act",
      "mise en conformité accessibilité numérique",
      "condamnation Carrefour accessibilité",
    ],
    titleEn:
      "Web accessibility is now mandatory: what the Carrefour ruling means for your website",
    cardTitleEn: "Web accessibility: the Carrefour ruling",
    descriptionEn:
      "Since June 2025, accessibility has been mandatory for e-commerce. Carrefour has just been ordered to comply under daily penalty. Who is covered, the 5 families of criteria, and where to start.",
    Body: AccessibiliteSiteWebObligation,
    BodyEn: AccessibiliteSiteWebObligationEn,
  },
  {
    slug: "formation-ia-obligatoire-entreprise",
    title: "Formation IA obligatoire en entreprise : ce que dit vraiment l'article 4",
    cardTitle: "Formation IA obligatoire : ce que dit l'article 4",
    description:
      "Depuis février 2025, former les équipes qui utilisent l'IA est une obligation légale (littératie IA, AI Act). Qui est concerné, ce qu'exige une formation conforme, et par où commencer.",
    date: "2026-07-02",
    category: "L'IA au travail",
    readingMinutes: 6,
    cover: "/images/corpo/montpellier/DSC_7573.jpg",
    keywords: [
      "formation IA obligatoire",
      "littératie IA article 4",
      "AI Act formation entreprise",
      "obligation formation intelligence artificielle",
    ],
    titleEn: "Mandatory AI training at work: what Article 4 actually says",
    cardTitleEn: "Mandatory AI training: what Article 4 says",
    descriptionEn: "Since February 2025, training the teams who use AI has been a legal obligation (AI literacy, EU AI Act). Who is in scope, what compliant training requires, and where to start.",
    Body: FormationIaObligatoireEntreprise,
    BodyEn: FormationIaObligatoireEntrepriseEn,
  },
  {
    slug: "agent-ia-pme-guide",
    title: "Agent IA pour PME : le guide pour démarrer sans se tromper",
    cardTitle: "Agent IA pour PME : le guide pour démarrer",
    description:
      "Ce qu'un agent IA fait vraiment, les trois familles qui rapportent en PME, les prix réels (publiés), et les erreurs à éviter. Le guide concret, sans jargon.",
    date: "2026-07-02",
    category: "L'IA au travail",
    readingMinutes: 7,
    cover: "/images/ia-packs/solo-pc.jpg",
    keywords: [
      "agent IA PME",
      "automatisation IA entreprise",
      "déployer un agent IA",
      "prix agent IA",
    ],
    titleEn: "AI agents for SMBs: the guide to getting started right",
    cardTitleEn: "AI agents for SMBs: the getting-started guide",
    descriptionEn: "What an AI agent really does, the three use cases that pay off for SMBs, the actual prices (published), and the mistakes to avoid. The practical, jargon-free guide.",
    Body: AgentIaPmeGuide,
    BodyEn: AgentIaPmeGuideEn,
  },
  {
    slug: "ia-remplacer-mon-metier-manager-pas-remplace",
    title: "L'IA va-t-elle remplacer mon métier ? Manager, pas remplacé",
    cardTitle: "L'IA va-t-elle remplacer mon métier ?",
    description:
      "Le patron de Mistral l'a dit à l'Assemblée : on ne fait plus le travail, on manage des IA. Ce que ça change vraiment pour votre métier, et comment apprendre à manager l'IA.",
    date: "2026-06-22",
    category: "Comprendre l'IA",
    readingMinutes: 6,
    cover: "/images/blog/manager-v2.jpg",
    keywords: [
      "l'IA va-t-elle remplacer mon métier",
      "IA et emploi",
      "Mistral Assemblée nationale manager",
      "manager une IA",
    ],
    titleEn: "Will AI Replace My Job? Manager, Not Replaced",
    cardTitleEn: "Will AI replace my job?",
    descriptionEn: "Mistral's CEO said it before the French Parliament: we no longer do the work, we manage AIs. What that really changes for your job, and how to learn to manage AI.",
    Body: ManagerPasRemplace,
    BodyEn: ManagerPasRemplaceEn,
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
    cover: "/images/blog/chatgpt-debutant-v2.jpg",
    keywords: [
      "comment utiliser ChatGPT",
      "ChatGPT débutant",
      "c'est quoi un prompt",
      "utiliser ChatGPT gratuitement",
    ],
    titleEn: "How to Use ChatGPT: The Simple Beginner's Guide",
    cardTitleEn: "How to use ChatGPT (beginner's guide)",
    descriptionEn: "Never dared to give it a try? The clear guide to using ChatGPT for free: what a prompt is, 5 example prompts, the mistakes to avoid. No jargon.",
    Body: CommentUtiliserChatgptDebutant,
    BodyEn: CommentUtiliserChatgptDebutantEn,
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
    cover: "/images/blog/ai-act-v2.jpg",
    keywords: [
      "AI Act entreprise",
      "AI Act 2026 que faire",
      "former ses équipes à l'IA",
      "conformité IA entreprise",
    ],
    titleEn: "EU AI Act: what your company needs to do in 2026",
    cardTitleEn: "EU AI Act: what your company needs to do",
    descriptionEn: "Training your teams on AI is no longer optional: the EU AI Act requires a minimum level of competence, with penalties from 2026. The 4 steps to get compliant.",
    Body: AiActEntreprise2026,
    BodyEn: AiActEntreprise2026En,
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
    cover: "/images/blog/arnaque-voix-v2.jpg",
    keywords: [
      "arnaque IA voix",
      "deepfake vocal",
      "cloner une voix IA",
      "se protéger arnaque IA",
    ],
    titleEn: "Your Voice Can Be Cloned in 30 Seconds: The AI Scam to Know About",
    cardTitleEn: "AI scam: your voice can be cloned",
    descriptionEn: "Cloned voices, fake loved ones in distress, fake bank advisors: how voice deepfake scams work, and the right reflexes to protect yourself.",
    Body: ArnaqueIaVoixClonee,
    BodyEn: ArnaqueIaVoixCloneeEn,
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
    cover: "/images/blog/prompt-v2.jpg",
    keywords: ["c'est quoi un prompt", "comment écrire un prompt", "exemples de prompts"],
    titleEn: "How to Write a Good Prompt: The Recipe + 8 Examples",
    cardTitleEn: "How to Write a Good Prompt",
    descriptionEn: "Getting mediocre answers from AI? The problem is the question. The 4-ingredient recipe for a good prompt, with 8 examples ready to copy.",
    Body: CommentEcrireUnPrompt,
    BodyEn: CommentEcrireUnPromptEn,
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
    cover: "/images/blog/comparatif-v2.jpg",
    keywords: ["ChatGPT vs Claude vs Gemini", "quelle IA choisir", "Le Chat Mistral"],
    titleEn: "ChatGPT, Claude, Gemini, Le Chat: Which One to Choose in 2026?",
    cardTitleEn: "ChatGPT, Claude, Gemini or Le Chat?",
    descriptionEn: "A simple, unbiased comparison of today's 4 leading AIs: how they differ, and which one to pick for your needs (including the French option, Mistral).",
    Body: ChatgptClaudeGeminiLeChat,
    BodyEn: ChatgptClaudeGeminiLeChatEn,
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
    cover: "/images/blog/hallucinations-v2.jpg",
    keywords: ["l'IA hallucine", "ChatGPT se trompe", "vérifier une réponse IA"],
    titleEn: "Why AI Makes Things Up (and How to Fact-Check It)",
    cardTitleEn: "Why AI Hallucinates",
    descriptionEn: "AI gave you a credible but false answer? That is called a hallucination. Why it happens, and 3 habits so you never get fooled again.",
    Body: PourquoiLiaHallucine,
    BodyEn: PourquoiLiaHallucineEn,
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
    cover: "/images/blog/glossaire-v2.jpg",
    keywords: ["glossaire IA", "vocabulaire intelligence artificielle", "lexique IA"],
    titleEn: "AI Glossary: 20 Terms Explained in Plain English",
    cardTitleEn: "AI glossary (20 simple terms)",
    descriptionEn: "AI, LLM, prompt, token, agent, hallucination, deepfake, EU AI Act... The vocabulary of AI explained in one sentence each, with zero jargon.",
    Body: GlossaireIa,
    BodyEn: GlossaireIaEn,
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
    cover: "/images/blog/vie-privee-v2.jpg",
    keywords: ["ChatGPT données personnelles", "IA RGPD", "confidentialité ChatGPT"],
    titleEn: "AI and Privacy: What You Should Never Paste into ChatGPT",
    cardTitleEn: "AI and privacy: what never to paste",
    descriptionEn: "Where do your messages go? What you should never share with an AI, plus 3 settings to take back control of your data (personal and business).",
    Body: IaViePriveeDonnees,
    BodyEn: IaViePriveeDonneesEn,
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
    cover: "/images/blog/ecole-v2.jpg",
    keywords: ["enfant IA école", "ado ChatGPT devoirs", "IA et triche scolaire"],
    titleEn: "Your Child Does Homework With AI: Ban It or Guide It?",
    cardTitleEn: "Your Child and AI at School",
    descriptionEn: "Over 60% of high school students already use AI, often in secret. Why banning it does not work, and 4 simple rules to guide your child without demonizing the tool.",
    Body: IaEnfantEcole,
    BodyEn: IaEnfantEcoleEn,
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
    cover: "/images/blog/agent-v2.jpg",
    keywords: ["c'est quoi un agent IA", "agent IA définition", "automatiser avec l'IA"],
    titleEn: "What Is an AI Agent? (And What It Changes for Your Work)",
    cardTitleEn: "What Is an AI Agent?",
    descriptionEn: "ChatGPT answers, an AI agent acts. The difference explained clearly, a concrete example, and the guardrails to know before delegating tasks to one.",
    Body: CestQuoiUnAgentIa,
    BodyEn: CestQuoiUnAgentIaEn,
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
    cover: "/images/blog/ethique-v2.jpg",
    keywords: ["IA éthique", "intelligence artificielle éthique", "IA responsable"],
    titleEn: "Ethical AI: What It Actually Means (and Why It Matters)",
    cardTitleEn: "Ethical AI: What Does It Actually Mean?",
    descriptionEn: "Ethical AI is not just nice AI. A simple definition, why it matters (bias, misinformation, your data), and 4 everyday habits for responsible use.",
    Body: IaEthique,
    BodyEn: IaEthiqueEn,
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Articles triés du plus récent au plus ancien. */
export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);
