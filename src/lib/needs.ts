/**
 * Les besoins du formulaire « Lancer un projet » (1er/10/2026). La stratégie
 * d'abord. La liste sert au formulaire de projet (/contact#projet), aux liens
 * qui présélectionnent un besoin (?besoin=…) et à l'email envoyé au studio.
 */
export type NeedSlug = "strategie" | "site" | "contenus" | "accompagnement" | "a-definir";

export const NEEDS: { slug: NeedSlug; fr: string; en: string }[] = [
  { slug: "strategie", fr: "Clarifier ma stratégie ou mon positionnement", en: "Clarify my strategy or positioning" },
  { slug: "site", fr: "Créer ou refaire mon site", en: "Build or rebuild my website" },
  { slug: "contenus", fr: "Produire des photos ou des vidéos", en: "Produce photos or videos" },
  { slug: "accompagnement", fr: "Être accompagné dans la durée", en: "Get ongoing support" },
  { slug: "a-definir", fr: "À définir", en: "Not sure yet" },
];

/** Événement émis par les boutons qui présélectionnent un besoin sur la même page. */
export const NEED_EVENT = "troie:need";

export function isNeed(value: string | null | undefined): value is NeedSlug {
  return !!value && NEEDS.some((n) => n.slug === value);
}

/**
 * Les anciens liens `?subject=…` des autres pages, ramenés au besoin le plus
 * proche. Tout autre sujet (ai-act, audit-ia, agent-*, formation-*) retombe
 * sur « À définir ».
 */
export const SUBJECT_TO_NEED: Record<string, NeedSlug> = {
  strategy: "strategie",
  web: "site",
  creation: "contenus",
  "création": "contenus",
  training: "accompagnement",
};
