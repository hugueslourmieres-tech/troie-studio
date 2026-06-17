/**
 * Agents IA TROIE — source de vérité unique.
 * ─────────────────────────────────────────────────────────────────────
 * Trois figures de l'Antiquité au service des marques :
 *
 *   01 · HERMÈS   — messager / commerce / éloquence  →  agent commercial
 *   02 · ACHILLE  — héros invincible de l'Iliade     →  agent éditorial
 *   03 · HESTIA   — déesse du foyer et de la flamme  →  agent SAV
 *
 * À éditer ici quand les valeurs réelles sont décidées :
 *
 *   1. `setupFrom` et `monthlyFrom` : null = "sur devis". Mettre un
 *      nombre en euros HT pour publier un prix d'entrée.
 *
 *   2. `photo.src` : remplacer les placeholders /images/agents/<slug>.jpg
 *      par les portraits définitifs (Hugues fournit les visuels).
 *
 *   3. `PDF_BRIEF` : null → bouton "Télécharger le brief" masqué.
 * ─────────────────────────────────────────────────────────────────────
 */

export type Sector =
  | "ecom"
  | "b2b"
  | "b2c"
  | "luxury"
  | "service"
  | "saas"
  | "brand";

export type Agent = {
  slug: "hermes" | "achille" | "hestia";
  index: "01" | "02" | "03";
  /** Nom court (mythologie). */
  name: { fr: string; en: string };
  /** Titre éditorial. Ex: "L'agent qui ouvre les portes." */
  title: { fr: string; en: string };
  /** Fonction concrète, une ligne. Ex: "Prospection. Qualification. RDV." */
  subtitle: { fr: string; en: string };
  /** Contexte mythologique court. */
  myth: { fr: string; en: string };
  /** Mission opérationnelle, 2-3 phrases. */
  mission: { fr: string; en: string };
  /** Secteurs cible. Sert le filtre + la table comparative. */
  bestFor: Sector[];
  /** Capacités concrètes (skills) — 6 à 9 puces. */
  skills: { fr: string[]; en: string[] };
  /** Outils sous-jacents (chips). */
  stack: string[];
  /** Ce qui est livré après setup. */
  deliverables: { fr: string; en: string };
  /** Indicateurs mesurables (KPIs). */
  kpis: { fr: string[]; en: string[] };
  /** Setup HT EUR. null = sur devis. */
  setupFrom: number | null;
  /** Abonnement mensuel HT EUR. null = sur devis. */
  monthlyFrom: number | null;
  /** Portrait pleine page (N&B) — utilisé sur /agents et home. */
  photo: { src: string; alt: string };
  /** Portrait close-up orange/sépia — vignette du tableau comparatif. */
  portrait: { src: string; alt: string };
  /** Logos d'outils principaux (icônes existantes /images/logos/*). */
  tools?: Array<{ src: string; label: string }>;
  /** Phrase de signature, italique Bodoni en bas de carte. */
  signature: { fr: string; en: string };
};

export const AGENTS: Agent[] = [
  {
    slug: "hermes",
    index: "01",
    name: { fr: "Hermès", en: "Hermes" },
    title: {
      fr: "L'agent qui ouvre les portes.",
      en: "The agent who opens doors.",
    },
    subtitle: {
      fr: "Prospection. Qualification. Rendez-vous pris.",
      en: "Outreach. Qualification. Booked meetings.",
    },
    myth: {
      fr: "Messager des dieux, dieu du commerce et de l'éloquence. Hermès porté le caducée et franchit les seuils. Dans l'Antiquité, on l'invoquait avant un voyage d'affaires ou une transaction importante.",
      en: "Messenger of the gods, god of commerce and eloquence. Hermes carries the caduceus and crosses every threshold. In antiquity, he was invoked before any journey or business deal.",
    },
    mission: {
      fr: "Hermès prospecte à froid, qualifie les leads entrants et prend les rendez-vous dans l'agenda du commercial. Sans dégrader le ton de marque, sans spammer, sans laisser un signal sans réponse.",
      en: "Hermes runs cold outreach, qualifies inbound leads and books meetings in the rep's calendar. On-brand tone, no spam, no signal left unanswered.",
    },
    bestFor: ["b2b", "service", "saas"],
    skills: {
      fr: [
        "Recherche d'entreprises ciblées (Apollo, Sales Navigator, Pappers)",
        "Enrichissement de contacts (e-mail vérifié, rôle, ancienneté)",
        "E-mails de prospection personnalisés, écrits dans votre voix",
        "Suivi multi-touch : relance 2, 3, 4 dans le ton, sans pression",
        "Qualification BANT / MEDDIC (budget, autorité, besoin, timing)",
        "Prise de rendez-vous directe sur Cal.com / Calendly",
        "Mise à jour CRM en temps réel (HubSpot, Pipedrive, Notion)",
        "Reporting hebdo : volume, taux, signaux faibles, top objections",
      ],
      en: [
        "Targeted account research (Apollo, Sales Navigator, Pappers)",
        "Contact enrichment (verified e-mail, role, seniority)",
        "Personalised outreach e-mails, written in your voice",
        "Multi-touch follow-up: gentle, never pushy",
        "BANT / MEDDIC qualification (budget, authority, need, timing)",
        "Direct meeting booking via Cal.com / Calendly",
        "Real-time CRM updates (HubSpot, Pipedrive, Notion)",
        "Weekly report: volume, rates, weak signals, top objections",
      ],
    },
    stack: ["Apollo", "Claude", "Make", "HubSpot", "Cal.com"],
    deliverables: {
      fr: "Agent paramétré sur votre ICP, 200 à 500 prospects qualifiés / mois, 10 à 30 RDV qualifiés, supervision humaine TROIE pendant 30 jours.",
      en: "Agent set up on your ICP, 200 to 500 qualified prospects / month, 10 to 30 booked meetings, TROIE human supervision for 30 days.",
    },
    kpis: {
      fr: [
        "10 à 30 RDV qualifiés / mois",
        "200 à 500 prospects sourcés / mois",
        "Taux de réponse 3× vs cold classique",
      ],
      en: [
        "10 to 30 booked meetings / month",
        "200 to 500 prospects sourced / month",
        "3× reply rate vs classic cold outbound",
      ],
    },
    setupFrom: null,
    monthlyFrom: null,
    photo: {
      src: "/images/agents/hermes.jpg",
      alt: "Hermès, agent commercial TROIE",
    },
    portrait: {
      src: "/images/agents/portrait/hermes.jpg",
      alt: "Hermès, portrait orange",
    },
    tools: [
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/hubspot.svg", label: "HubSpot" },
      { src: "/images/logos/make.svg", label: "Make" },
    ],
    signature: {
      fr: "Hermès vous ouvre les portes.",
      en: "Hermes opens the doors for you.",
    },
  },
  {
    slug: "achille",
    index: "02",
    name: { fr: "Achille", en: "Achilles" },
    title: {
      fr: "L'agent qui ne s'arrête jamais.",
      en: "The agent who never stops.",
    },
    subtitle: {
      fr: "Éditorial. Réseaux sociaux. Newsletter. Image IA.",
      en: "Editorial. Social. Newsletter. AI imagery.",
    },
    myth: {
      fr: "Héros de l'Iliade, le plus grand guerrier de l'Antiquité. Formé par le centaure Chiron. Sa colère a fait basculer la guerre de Troie. Presque invincible, infatigable au combat, premier en ligne, dernier à se replier.",
      en: "Hero of the Iliad, the greatest warrior of antiquity. Trained by the centaur Chiron. His wrath shifted the war for Troy. Nearly invincible, tireless in battle, first to advance, last to fall back.",
    },
    mission: {
      fr: "Achille produit les contenus éditoriaux et sociaux à la cadence que demande votre marché. Articles, posts, images IA, formats courts. Sans relâche. Avec validation humaine avant chaque publication.",
      en: "Achilles produces editorial and social content at the cadence your market demands. Articles, posts, AI imagery, short formats. Relentless. Human validation before every publish.",
    },
    bestFor: ["ecom", "brand", "luxury", "b2c", "b2b"],
    skills: {
      fr: [
        "Articles longs SEO / GEO (référencement Google + LLM)",
        "Posts LinkedIn, Instagram, TikTok dans la voix de la marque",
        "Adaptation par canal : un sujet, cinq formats sortants",
        "Génération d'images on-brand (Midjourney, Sora, Veo)",
        "Sous-titrage et montage court pour reels et shorts",
        "Newsletters segmentées (VIP, prospects, abonnés)",
        "Calendrier éditorial auto-rééquilibré chaque semaine",
        "Veille concurrence et signaux faibles social listening",
      ],
      en: [
        "Long-form SEO / GEO articles (Google + LLM ranking)",
        "LinkedIn, Instagram, TikTok posts in brand voice",
        "Channel adaptation: one topic, five outbound formats",
        "On-brand image generation (Midjourney, Sora, Veo)",
        "Captioning and short edits for reels and shorts",
        "Segmented newsletters (VIP, prospects, subscribers)",
        "Editorial calendar rebalanced every week",
        "Competitor watch and weak social-listening signals",
      ],
    },
    stack: ["Claude", "Midjourney", "Make", "Notion", "Resend"],
    deliverables: {
      fr: "Agent calé sur votre charte (voix, mots interdits, formats), bibliothèque de prompts versionnée, 30 à 60 contenus publiables / mois, calendrier vivant.",
      en: "Agent set on your brand book (voice, banned words, formats), versioned prompt library, 30 to 60 publishable contents / month, living calendar.",
    },
    kpis: {
      fr: [
        "30 à 60 contenus publiables / mois",
        "Voix de marque cohérente sur 5 canaux",
        "Délai brief → publication divisé par 4",
      ],
      en: [
        "30 to 60 publishable contents / month",
        "Consistent brand voice across 5 channels",
        "Brief → publish time divided by 4",
      ],
    },
    setupFrom: null,
    monthlyFrom: null,
    photo: {
      src: "/images/agents/achille.jpg",
      alt: "Achille, agent éditorial TROIE",
    },
    portrait: {
      src: "/images/agents/portrait/achille.jpg",
      alt: "Achille, portrait orange",
    },
    tools: [
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/midjourney.svg", label: "Midjourney" },
      { src: "/images/logos/make.svg", label: "Make" },
      { src: "/images/logos/figma.svg", label: "Figma" },
    ],
    signature: {
      fr: "Achille ne rend jamais les armes.",
      en: "Achilles never lays down his arms.",
    },
  },
  {
    slug: "hestia",
    index: "03",
    name: { fr: "Hestia", en: "Hestia" },
    title: {
      fr: "L'agent qui veille sur le foyer.",
      en: "The agent who tends the hearth.",
    },
    subtitle: {
      fr: "Service client 24/7. Multilingue. Toujours présent.",
      en: "Customer care 24/7. Multilingual. Always présent.",
    },
    myth: {
      fr: "Déesse du foyer, de l'hospitalité et de la flamme sacrée qui ne s'éteint jamais. Première servie dans les sacrifices, dernière à quitter l'Olympe. Dans la Grèce antique, on n'allumait pas un nouveau foyer sans emporter une braise du sien.",
      en: "Goddess of the hearth, of hospitality and of the sacred flame that never dies. First honoured in offerings, last to leave Olympus. In ancient Greece, no new home was kindled without a coal from hers.",
    },
    mission: {
      fr: "Hestia répond aux clients (avant-vente, SAV, suivi commande, retours), en multilingue, 24/7, dans le ton de la marque. Elle escalade vers un humain dès qu'un cas l'exigé, avec le contexte complet du ticket.",
      en: "Hestia answers customers (pre-sale, support, order tracking, returns), multilingual, 24/7, in brand voice. She escalates to a human the moment a case requires it, full context attached.",
    },
    bestFor: ["ecom", "b2c", "saas", "luxury", "service"],
    skills: {
      fr: [
        "Compréhension multilingue (FR, EN, ES, IT, DE)",
        "Lecture en direct du catalogue, du stock et des prix",
        "Suivi commande temps réel (Shopify, WooCommerce, Stripe)",
        "Étiquettes de retour, RMA, remboursements avec règles",
        "Recommandation produit personnalisée (taille, style, complément)",
        "Qualification réclamations (urgence, sensibilité, légal)",
        "Escalade humaine avec contexte complet et historique client",
        "Synthèse hebdo : top motifs, signaux faibles, NPS",
      ],
      en: [
        "Multilingual understanding (FR, EN, ES, IT, DE)",
        "Live read of catalogue, stock and prices",
        "Real-time order tracking (Shopify, WooCommerce, Stripe)",
        "Return labels, RMA, refunds with rules",
        "Personalised product recommendation (size, style, add-on)",
        "Claim qualification (urgency, sensitivity, legal)",
        "Human escalation with full context and customer history",
        "Weekly digest: top topics, weak signals, NPS",
      ],
    },
    stack: ["Claude", "Shopify", "Stripe", "Make", "Slack"],
    deliverables: {
      fr: "Agent connecté à votre back-office, brief de marque, 60 à 85 % des tickets résolus seuls, dashboard quotidien, supervision humaine TROIE 4 semaines.",
      en: "Agent wired to your back-office, brand brief, 60 to 85 % tickets resolved unattended, daily dashboard, TROIE human supervision for 4 weeks.",
    },
    kpis: {
      fr: [
        "60 à 85 % de tickets résolus sans humain",
        "Première réponse en moins de 60 secondes",
        "5 langues, présence 24 / 7",
      ],
      en: [
        "60 to 85 % tickets solved without humans",
        "First response under 60 seconds",
        "5 languages, 24 / 7 presence",
      ],
    },
    setupFrom: null,
    monthlyFrom: null,
    photo: {
      src: "/images/agents/hestia.jpg",
      alt: "Hestia, agent de service client TROIE",
    },
    portrait: {
      src: "/images/agents/portrait/hestia.jpg",
      alt: "Hestia, portrait orange",
    },
    tools: [
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/make.svg", label: "Make" },
      { src: "/images/logos/hubspot.svg", label: "HubSpot" },
    ],
    signature: {
      fr: "Hestia veille sur votre foyer.",
      en: "Hestia tends to your hearth.",
    },
  },
];

/** Chemin du PDF brief à fournir. null = bouton "Télécharger" masqué. */
export const PDF_BRIEF: string | null = null;

/** Helpers — alignés sur formatPrice() de formations.ts pour cohérence. */
export const formatSetup = (
  setupFrom: number | null,
  locale: "fr" | "en",
): string => {
  if (setupFrom === null) return locale === "fr" ? "Sur devis" : "On request";
  const formatted = new Intl.NumberFormat(
    locale === "fr" ? "fr-FR" : "en-GB",
    {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    },
  ).format(setupFrom);
  return locale === "fr" ? `À partir de ${formatted}` : `From ${formatted}`;
};

export const formatMonthly = (
  monthlyFrom: number | null,
  locale: "fr" | "en",
): string => {
  if (monthlyFrom === null) return locale === "fr" ? "Sur devis" : "On request";
  const formatted = new Intl.NumberFormat(
    locale === "fr" ? "fr-FR" : "en-GB",
    {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    },
  ).format(monthlyFrom);
  return locale === "fr" ? `${formatted} / mois` : `${formatted} / month`;
};

export const sectorLabel = (sector: Sector, locale: "fr" | "en"): string => {
  const map = {
    ecom: { fr: "E-commerce", en: "E-commerce" },
    b2b: { fr: "B2B", en: "B2B" },
    b2c: { fr: "B2C", en: "B2C" },
    luxury: { fr: "Luxe", en: "Luxury" },
    service: { fr: "Services", en: "Services" },
    saas: { fr: "SaaS", en: "SaaS" },
    brand: { fr: "Marques", en: "Brands" },
  } as const;
  return map[sector][locale];
};
