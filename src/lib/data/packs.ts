/**
 * Packs, forfaits proposés sur le site.
 * Le tarif d'ancrage "Audit Marketing/IA, 2 500€ HT" provient du devis
 * réel signé pour LOIR Paris (Réf. DEV-2026-03-30-02). Les autres packs
 * sont calibrés autour pour cohérence commerciale.
 *
 * Les libellés sont disponibles en FR/EN dans la même structure pour faciliter
 * une éventuelle bascule i18n future. v1 ne traduit que le nécessaire.
 */

export type Pack = {
  slug: string;
  index: string;
  title: { fr: string; en: string };
  category: { fr: string; en: string };
  pitch: { fr: string; en: string };
  deliverables: { fr: string[]; en: string[] };
  price: number;
  priceUnit?: { fr: string; en: string };
  duration: { fr: string; en: string };
  highlight?: boolean;
};

export const PACKS: Pack[] = [
  {
    slug: "audit-ia",
    index: "01",
    title: {
      fr: "Audit Marketing / IA",
      en: "Marketing / AI Audit",
    },
    category: {
      fr: "Conseil",
      en: "Consulting",
    },
    pitch: {
      fr: "Audit des outils existants, analyse des besoins, recommandations prioritaires et restitution de synthèse.",
      en: "Audit of existing tools, needs analysis, prioritised recommendations and synthesis report.",
    },
    deliverables: {
      fr: [
        "Audit des outils marketing & IA",
        "Cartographie des points de friction",
        "Plan d'action priorisé",
        "Synthèse restituée à l'oral et à l'écrit",
      ],
      en: [
        "Audit of marketing & AI tools",
        "Mapping of friction points",
        "Prioritised action plan",
        "Final report, written and presented",
      ],
    },
    price: 2500,
    duration: { fr: "2 à 3 semaines", en: "2 to 3 weeks" },
    highlight: true,
  },
  {
    slug: "site-vitrine",
    index: "02",
    title: {
      fr: "Site web vitrine",
      en: "Showcase website",
    },
    category: { fr: "Création", en: "Creative" },
    pitch: {
      fr: "Site sur-mesure jusqu'à 6 pages, bilingue, optimisé SEO et GEO. Hébergement Vercel inclus la première année.",
      en: "Custom website up to 6 pages, bilingual, SEO + GEO ready. Vercel hosting included first year.",
    },
    deliverables: {
      fr: [
        "Design sur-mesure, motion inclus",
        "Jusqu'à 6 pages, bilingue FR / EN",
        "Optimisation SEO + GEO (LLMs)",
        "Hébergement & domaine première année",
      ],
      en: [
        "Custom design with motion",
        "Up to 6 pages, bilingual FR / EN",
        "SEO + GEO optimisation (LLMs)",
        "Hosting & domain first year",
      ],
    },
    price: 4500,
    duration: { fr: "3 à 4 semaines", en: "3 to 4 weeks" },
  },
  {
    slug: "site-premium",
    index: "03",
    title: {
      fr: "Site premium / e-commerce",
      en: "Premium / e-commerce site",
    },
    category: { fr: "Création", en: "Creative" },
    pitch: {
      fr: "Plateforme avancée : e-commerce, espace client, intégrations CRM, motion design éditorial, scénarios IA.",
      en: "Advanced platform: e-commerce, client area, CRM integrations, editorial motion design, AI flows.",
    },
    deliverables: {
      fr: [
        "Architecture sur-mesure (jusqu'à 15 pages)",
        "E-commerce, paiement, gestion produits",
        "Intégrations CRM / mailing / analytics",
        "Animations scroll-triggered, motion luxe",
        "Hébergement Vercel + domaine inclus",
      ],
      en: [
        "Custom architecture (up to 15 pages)",
        "E-commerce, payment, product management",
        "CRM / mailing / analytics integrations",
        "Scroll-triggered motion, luxury feel",
        "Vercel hosting + domain included",
      ],
    },
    price: 9500,
    duration: { fr: "6 à 8 semaines", en: "6 to 8 weeks" },
  },
  {
    slug: "identite-marque",
    index: "04",
    title: {
      fr: "Identité de marque",
      en: "Brand identity",
    },
    category: { fr: "Création", en: "Creative" },
    pitch: {
      fr: "Plateforme de marque, logo, charte graphique complète, applications. Livré sous forme d'un guide PDF.",
      en: "Brand platform, logo, full graphic charter, applications. Delivered as a PDF brand book.",
    },
    deliverables: {
      fr: [
        "Plateforme de marque & territoire",
        "Logo, monogramme, déclinaisons",
        "Charte graphique complète (40+ pages)",
        "Templates print & digital",
      ],
      en: [
        "Brand platform & territory",
        "Logo, monogram, lockups",
        "Full brand book (40+ pages)",
        "Print & digital templates",
      ],
    },
    price: 3800,
    duration: { fr: "3 semaines", en: "3 weeks" },
  },
  {
    slug: "shooting",
    index: "05",
    title: {
      fr: "Shooting photo / vidéo",
      en: "Photo / video shoot",
    },
    category: { fr: "Création", en: "Creative" },
    pitch: {
      fr: "Une journée de tournage à Paris : photo produit, mode, corporate, événementiel. Livraison retouchée sous 7 jours.",
      en: "One full shooting day in Paris: product, fashion, corporate, events. Retouched delivery within 7 days.",
    },
    deliverables: {
      fr: [
        "Pré-production & moodboard",
        "1 journée de tournage à Paris",
        "30 photos retouchées HD",
        "1 vidéo montée 30 sec / format social",
      ],
      en: [
        "Pre-production & moodboard",
        "1 full shooting day in Paris",
        "30 retouched HD photos",
        "1 edited 30-sec video / social format",
      ],
    },
    price: 2200,
    duration: { fr: "1 jour + 7 jours retouches", en: "1 day + 7 days post" },
  },
  {
    slug: "formation-ia",
    index: "06",
    title: {
      fr: "Formation IA",
      en: "AI training",
    },
    category: { fr: "Formation", en: "Training" },
    pitch: {
      fr: "Une journée intra-entreprise pour former vos équipes aux outils IA. Trois niveaux disponibles. Livrables opérationnels le jour même.",
      en: "One in-house day to train your team on AI tools. Three levels available. Working deliverables on day one.",
    },
    deliverables: {
      fr: [
        "Niveau au choix : ChatGPT / automatisation / agents",
        "Audit pré-formation",
        "1 journée en présentiel ou remote",
        "Livrables opérationnels en fin de session",
      ],
      en: [
        "Level: ChatGPT / automation / agents",
        "Pre-training audit",
        "1 day on-site or remote",
        "Working deliverables by end of session",
      ],
    },
    price: 1800,
    priceUnit: { fr: "/ jour", en: "/ day" },
    duration: { fr: "1 jour", en: "1 day" },
  },
];
