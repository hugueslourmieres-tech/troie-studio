/**
 * Le vocabulaire IA de TROIE Studio, en un seul endroit.
 *
 * Bilingue, parce que le site l'est. Les définitions vivent ici et non dans
 * `messages/{fr,en}.json` pour une raison précise : `match` n'est pas de la
 * copie, c'est un motif de détection. Le mettre sous les yeux d'un traducteur
 * l'inviterait à le reformuler, et la détection casserait en silence.
 *
 * Le vocabulaire de troie.app (AI Act, littératie, examen) est volontairement
 * séparé : les deux sites parlent à des gens différents. Là où un mot est
 * commun aux deux, la définition est reprise à l'identique.
 *
 * `match` = la forme cherchée dans les textes (insensible à la casse).
 * `def` = une phrase, deux au maximum. Si ça ne tient pas, c'est un article.
 */
export type Locale = "fr" | "en";

export type GlossEntry = {
  /** Le mot tel qu'il s'affiche en titre de l'infobulle. */
  label: string;
  /** La forme repérée automatiquement dans les contenus. */
  match: string;
  def: string;
};

export const GLOSSAIRE = {
  agent: {
    fr: {
      label: "Agent IA",
      match: "agent IA",
      def: "Une IA à qui l'on confie une tâche entière : elle enchaîne les étapes et utilise des outils, au lieu de répondre une seule fois.",
    },
    en: {
      label: "AI agent",
      match: "AI agent",
      def: "An AI you hand a whole task to: it works through the steps and uses tools, instead of answering once and stopping.",
    },
  },
  mcp: {
    fr: {
      label: "MCP",
      match: "MCP",
      def: "Model Context Protocol : la prise standard qui branche une IA sur vos outils (agenda, fichiers, CRM) pour qu'elle agisse, et pas seulement qu'elle réponde.",
    },
    en: {
      label: "MCP",
      match: "MCP",
      def: "Model Context Protocol: the standard socket that plugs an AI into your tools (calendar, files, CRM) so it can act, not just answer.",
    },
  },
  llm: {
    fr: {
      label: "LLM",
      match: "LLM",
      def: "Large language model : le moteur derrière ChatGPT, Claude ou Gemini. Il prédit le mot suivant, ce qui suffit à écrire, résumer et raisonner.",
    },
    en: {
      label: "LLM",
      match: "LLM",
      def: "Large language model: the engine behind ChatGPT, Claude or Gemini. It predicts the next word, which turns out to be enough to write, summarise and reason.",
    },
  },
  geo: {
    fr: {
      label: "GEO",
      match: "GEO",
      def: "Generative Engine Optimization : se faire citer par ChatGPT ou Perplexity quand ils répondent, comme le SEO vous fait remonter dans Google.",
    },
    en: {
      label: "GEO",
      match: "GEO",
      def: "Generative Engine Optimization: getting cited by ChatGPT or Perplexity when they answer, the way SEO gets you ranked in Google.",
    },
  },
  seo: {
    fr: {
      label: "SEO",
      match: "SEO",
      def: "Search engine optimization : faire remonter vos pages dans les résultats de Google sans payer la place, par le contenu et la technique.",
    },
    en: {
      label: "SEO",
      match: "SEO",
      def: "Search engine optimization: getting your pages to rank in Google without paying for the slot, through content and technical work.",
    },
  },
  sea: {
    fr: {
      label: "SEA",
      match: "SEA",
      def: "Search engine advertising : les liens sponsorisés en tête des résultats. On y paie la visibilité au clic, là où le SEO la gagne.",
    },
    en: {
      label: "SEA",
      match: "SEA",
      def: "Search engine advertising: the sponsored links at the top of the results. Here you pay per click for visibility, where SEO earns it.",
    },
  },
  aiact: {
    fr: {
      label: "AI Act",
      match: "AI Act",
      def: "Le règlement européen 2024/1689 sur l'intelligence artificielle. Il n'encadre pas l'IA en général : il encadre les usages selon le risque qu'ils font courir aux personnes.",
    },
    en: {
      label: "AI Act",
      match: "AI Act",
      def: "European regulation 2024/1689 on artificial intelligence. It does not police AI in general: it polices uses, according to the risk they create for people.",
    },
  },
  prompt: {
    fr: {
      label: "Prompt",
      match: "prompt",
      def: "Votre consigne. Plus elle est précise, meilleure est la réponse.",
    },
    en: {
      label: "Prompt",
      match: "prompt",
      def: "Your instruction. The more precise it is, the better the answer.",
    },
  },
  workflow: {
    fr: {
      label: "Workflow",
      match: "workflow",
      def: "L'enchaînement des étapes d'une tâche, écrit une fois pour que l'agent le rejoue à l'identique. C'est ce qui vous reste si le contrat s'arrête.",
    },
    en: {
      label: "Workflow",
      match: "workflow",
      def: "The chain of steps of a task, written once so the agent can replay it identically. It is what stays yours if the contract ends.",
    },
  },
} as const satisfies Record<string, Record<Locale, GlossEntry>>;

export type TermId = keyof typeof GLOSSAIRE;

/**
 * Les termes du plus long au plus court, par langue : « agent IA » doit passer
 * avant « agent », sinon le court mange le long et la bonne définition ne
 * s'affiche jamais.
 */
export function termIds(locale: Locale): TermId[] {
  return (Object.keys(GLOSSAIRE) as TermId[]).sort(
    (a, b) => GLOSSAIRE[b][locale].match.length - GLOSSAIRE[a][locale].match.length,
  );
}
