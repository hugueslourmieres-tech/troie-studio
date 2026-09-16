/**
 * Les besoins de l'accueil (refonte du 16/09/2026). Un seul parcours :
 * « voici mon besoin, voici votre proposition adaptée ». La liste sert à
 * l'accueil, au formulaire de projet et à l'email envoyé au studio.
 */
export type NeedSlug =
  | "site"
  | "automatisation"
  | "visibilite"
  | "contenus"
  | "a-definir";

export const NEEDS: { slug: NeedSlug; fr: string; en: string }[] = [
  { slug: "site", fr: "Créer un site ou une application", en: "Build a website or an app" },
  { slug: "automatisation", fr: "Automatiser des tâches", en: "Automate tasks" },
  { slug: "visibilite", fr: "Développer ma visibilité", en: "Grow my visibility" },
  { slug: "contenus", fr: "Produire des contenus et des images", en: "Produce content and images" },
  { slug: "a-definir", fr: "À définir", en: "Not sure yet" },
];

/** Événement émis par les boutons « Décrire mon projet » des cartes. */
export const NEED_EVENT = "troie:need";

export function isNeed(value: string | null | undefined): value is NeedSlug {
  return !!value && NEEDS.some((n) => n.slug === value);
}

/** Les anciens liens `?subject=…` des autres pages, ramenés au besoin le plus proche. */
export const SUBJECT_TO_NEED: Record<string, NeedSlug> = {
  web: "site",
  creation: "contenus",
  "création": "contenus",
  strategy: "visibilite",
  "audit-ia": "automatisation",
  "agent-custom": "automatisation",
  "agent-hermes": "automatisation",
  "agent-achille": "automatisation",
  "agent-hestia": "automatisation",
};
