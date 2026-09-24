/**
 * Titres et descriptions calibrés pour la page de résultats (24/09/2026).
 *
 * Google affiche environ 60 signes de titre et 155 à 160 signes de
 * description. Au-delà, il coupe au hasard ou réécrit lui-même : autant
 * choisir la coupe.
 */

/** Le suffixe ajouté par le gabarit de titre du layout (« %s, TROIE Studio »). */
const BRAND_SUFFIX = ", TROIE Studio";

/**
 * Titre de page : la marque n'est ajoutée que si l'ensemble tient dans la
 * zone affichée. Un titre déjà long part seul, en titre absolu.
 */
export function seoTitle(title: string, max = 62): string | { absolute: string } {
  return title.length + BRAND_SUFFIX.length <= max ? title : { absolute: title };
}

/**
 * Meta description : coupe propre à la dernière fin de phrase qui tient,
 * sinon au dernier mot entier, avec une ellipse. Le texte complet reste
 * disponible pour l'aperçu de partage (openGraph).
 */
export function metaDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" ? "), cut.lastIndexOf(" ! "));
  if (stop >= 90) return cut.slice(0, stop + (cut[stop] === "." ? 1 : 2)).trim();
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,:.\-–(]+$/, "") + "…";
}
