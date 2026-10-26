/**
 * Les besoins du formulaire « Décrire mon projet » (26/10/2026). Le choix
 * est obligatoire : il trie les demandes et décourage les démarchages
 * commerciaux qui remplissent le formulaire au hasard. La liste sert au
 * formulaire (/contact#projet), aux liens qui présélectionnent un besoin
 * (?besoin=…), à la validation côté serveur et à l'email envoyé au studio.
 */
export type NeedSlug = "site" | "boutique" | "application" | "referencement" | "autre";

export const NEEDS: { slug: NeedSlug; fr: string; en: string }[] = [
  { slug: "site", fr: "Site internet", en: "Website" },
  { slug: "boutique", fr: "Boutique en ligne", en: "Online store" },
  { slug: "application", fr: "Application", en: "App" },
  { slug: "referencement", fr: "Référencement et Google Ads", en: "SEO and Google Ads" },
  { slug: "autre", fr: "Autre", en: "Other" },
];

/** Événement émis par les boutons qui présélectionnent un besoin sur la même page. */
export const NEED_EVENT = "troie:need";

export function isNeed(value: string | null | undefined): value is NeedSlug {
  return !!value && NEEDS.some((n) => n.slug === value);
}

/**
 * Les anciens liens (?besoin= d'avant le 26/10/2026, ?subject=…) ramenés au
 * besoin le plus proche. Un sujet sans équivalent clair (strategie, ai-act…)
 * ne présélectionne rien : la personne choisit elle-même.
 */
export const LEGACY_TO_NEED: Record<string, NeedSlug> = {
  web: "site",
  shopify: "boutique",
  seo: "referencement",
  contenus: "autre",
  creation: "autre",
  "création": "autre",
  accompagnement: "autre",
  training: "autre",
};
