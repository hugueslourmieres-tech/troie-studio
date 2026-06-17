/**
 * Programmes de formation TROIE — source de vérité unique.
 *
 * ─────────────────────────────────────────────────────────────────────
 * À éditer ici quand les valeurs réelles sont décidées :
 *
 *   1. `priceFrom` par programme : null = "sur devis". Mettre un nombre
 *      en euros HT pour publier un prix d'entrée ("À partir de 1 500 €").
 *
 *   2. `SESSIONS` : tableau vide tant qu'aucune session inter n'est
 *      programmée. Si non vide, la page affiche un bloc "Prochaines
 *      sessions" avec date / ville / places restantes.
 *
 *   3. `FINANCEMENT.qualiopi` : false par défaut → texte neutre OPCO.
 *      Ne passer à `true` QUE quand la certification Qualiopi est
 *      effective (numéro de cert. à ajouter).
 *
 *   4. `PDF_PROGRAMME` : null → bouton "Télécharger le programme" masqué.
 *      Déposer le PDF dans /public/formations/ et mettre le chemin
 *      (ex: "/formations/programme-troie.pdf").
 * ─────────────────────────────────────────────────────────────────────
 */

export type Format = "intra" | "inter" | "remote";

export type Programme = {
  slug: "decouverte" | "pratique" | "agents";
  index: "01" | "02" | "03";
  title: { fr: string; en: string };
  duration: { fr: string; en: string };
  audience: { fr: string; en: string };
  objective: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  bullets: { fr: string[]; en: string[] };
  deliverables: { fr: string; en: string };
  prerequisites: { fr: string; en: string };
  formats: Format[];
  /** Prix d'entrée HT en euros. null = "sur devis". */
  priceFrom: number | null;
  photo: { src: string; alt: string };
  tools?: Array<{ src: string; label: string }>;
};

export const PROGRAMMES: Programme[] = [
  {
    slug: "decouverte",
    index: "01",
    title: { fr: "Découverte", en: "Discovery" },
    subtitle: {
      fr: "Fondamentaux IA",
      en: "AI fundamentals",
    },
    duration: { fr: "½ journée", en: "½ day" },
    audience: {
      fr: "Équipes tous métiers, débutants en IA générative.",
      en: "All-trade teams, new to generative AI.",
    },
    objective: {
      fr: "Repartir autonome sur l'IA générative texte au quotidien.",
      en: "Leave autonomous on day-to-day generative AI for text.",
    },
    bullets: {
      fr: [
        "ChatGPT, Claude, Gemini : usage avancé et différenciation",
        "Méthode de prompting : structure, contexte, contraintes",
        "Cas d'usage métier : rédaction, analyse, synthèse, recherche",
        "Hygiène des données : ce qu'on partage, ce qu'on ne partage pas",
        "Mise en place d'une bibliothèque de prompts d'équipe",
      ],
      en: [
        "ChatGPT, Claude, Gemini: advanced use and how they differ",
        "Prompting method: structure, context, constraints",
        "Hands-on use cases: writing, analysis, synthesis, research",
        "Data hygiene: what to share, what to keep out",
        "Setting up a team prompt library",
      ],
    },
    deliverables: {
      fr: "Bibliothèque de prompts prête à l'emploi, attestation de formation.",
      en: "Ready-to-use prompt library, training certificate.",
    },
    prerequisites: {
      fr: "Aucun. Apporter un ordinateur portable.",
      en: "None. Laptop required.",
    },
    formats: ["intra", "inter", "remote"],
    priceFrom: null,
    photo: {
      src: "/images/training-section/01.jpg",
      alt: "Atelier formation IA, prise de notes",
    },
    tools: [
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/gemini.svg", label: "Gemini" },
      { src: "/images/logos/perplexity.svg", label: "Perplexity" },
    ],
  },
  {
    slug: "pratique",
    index: "02",
    title: { fr: "Pratique", en: "Practice" },
    subtitle: {
      fr: "Production & création IA",
      en: "AI production & creation",
    },
    duration: { fr: "1 journée", en: "1 day" },
    audience: {
      fr: "Marketing, communication, création, direction artistique.",
      en: "Marketing, communications, creative, art direction.",
    },
    objective: {
      fr: "Produire du contenu image et vidéo au niveau de marque.",
      en: "Produce on-brand image and video content.",
    },
    bullets: {
      fr: [
        "Midjourney, Sora, Veo, Runway : forces et usages typiques",
        "Génération d'images et de vidéos cohérentes avec une charte",
        "Intégration au workflow créatif (brief, sélection, retouche)",
        "Droits, mentions, limites et précautions juridiques",
        "Construction d'un workflow type reproductible",
      ],
      en: [
        "Midjourney, Sora, Veo, Runway: strengths and typical use",
        "Generating image and video that stay on brand",
        "Plugging into the creative workflow (brief, selection, retouch)",
        "Rights, crédits, limits and legal precautions",
        "Building a repeatable workflow blueprint",
      ],
    },
    deliverables: {
      fr: "Workflow documenté, presets et settings, attestation.",
      en: "Documented workflow, presets and settings, certificate.",
    },
    prerequisites: {
      fr: "Niveau Découverte ou usage régulier d'un outil IA texte.",
      en: "Discovery level or regular use of an AI text tool.",
    },
    formats: ["intra", "inter", "remote"],
    priceFrom: null,
    photo: {
      src: "/images/training-section/02.jpg",
      alt: "Production d'image IA, écran de travail",
    },
    tools: [
      { src: "/images/logos/midjourney.svg", label: "Midjourney" },
      { src: "/images/logos/runway.svg", label: "Runway" },
      { src: "/images/logos/adobe.svg", label: "Adobe" },
      { src: "/images/logos/figma.svg", label: "Figma" },
    ],
  },
  {
    slug: "agents",
    index: "03",
    title: { fr: "Agents", en: "Agents" },
    subtitle: {
      fr: "Automatisation & déploiement",
      en: "Automation & deployment",
    },
    duration: { fr: "2 journées", en: "2 days" },
    audience: {
      fr: "Profils ops, growth, IT, dirigeants opérationnels.",
      en: "Ops, growth, IT and hands-on leadership profiles.",
    },
    objective: {
      fr: "Automatiser des processus internes et déployer des agents.",
      en: "Automate internal processes and deploy agents.",
    },
    bullets: {
      fr: [
        "Make, n8n, Zapier : choisir et combiner les bons outils",
        "Conception d'agents IA (Claude, OpenAI) : tâches, mémoire, garde-fous",
        "Déploiement, supervision et coût d'exécution",
        "Gouvernance et privacy-by-design : périmètre, journalisation",
        "Mise en production de 1 à 2 automatisations sur vos cas",
      ],
      en: [
        "Make, n8n, Zapier: picking and combining the right tools",
        "Designing AI agents (Claude, OpenAI): tasks, memory, guardrails",
        "Deployment, supervision and running cost",
        "Governance and privacy-by-design: scope, logging",
        "Shipping 1 to 2 automations on your real cases",
      ],
    },
    deliverables: {
      fr: "Feuille de route, 1 à 2 automatisations en production, attestation.",
      en: "Roadmap, 1 to 2 automations in production, certificate.",
    },
    prerequisites: {
      fr: "Niveau Pratique. Accès aux outils internes ciblés.",
      en: "Practice level. Access to the targeted internal tools.",
    },
    formats: ["intra"],
    priceFrom: null,
    photo: {
      src: "/images/training-section/03.jpg",
      alt: "Mise en place d'un agent IA, workshop",
    },
    tools: [
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/make.svg", label: "Make" },
    ],
  },
];

export type Session = {
  programmeSlug: Programme["slug"];
  date: string; // ISO YYYY-MM-DD
  city: string;
  spots: number;
};

/** Aucune session inter programmée pour l'instant. Ajouter ici quand calendrier connu. */
export const SESSIONS: Session[] = [];

export const FINANCEMENT = {
  /** Passer à `true` UNIQUEMENT quand la certification Qualiopi est délivrée. */
  qualiopi: false as boolean,
  /** Liste de partenaires OF certifiés (si TROIE passe par un partenaire). */
  opcoPartners: [] as string[],
};

/** Chemin du PDF programme à fournir. null = bouton "Télécharger le programme" masqué. */
export const PDF_PROGRAMME: string | null = null;

/** Helpers */
export const formatPrice = (priceFrom: number | null, locale: "fr" | "en") => {
  if (priceFrom === null) return locale === "fr" ? "Sur devis" : "On request";
  const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(priceFrom);
  return locale === "fr" ? `À partir de ${formatted}` : `From ${formatted}`;
};

export const formatLabel = (
  format: Format,
  locale: "fr" | "en",
): string => {
  const map = {
    intra: { fr: "Intra-entreprise", en: "In-house" },
    inter: { fr: "Inter-entreprise", en: "Open enrolment" },
    remote: { fr: "Remote", en: "Remote" },
  } as const;
  return map[format][locale];
};
