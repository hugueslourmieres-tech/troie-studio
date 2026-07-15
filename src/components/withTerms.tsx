import { Term } from "@/components/Term";
import { GLOSSAIRE, termIds, type Locale, type TermId } from "@/lib/glossaire";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Le motif d'un terme, pluriels compris : « prompt » attrape « prompts »,
 * « agent IA » attrape « agents IA », « LLM » attrape « LLMs ». On borne des
 * deux côtés pour ne pas couper un mot au milieu (le `\b` de JS gère mal les
 * accents, d'où `\p{L}`) : sans ça « SEO » attraperait le « seo » niché dans
 * un mot plus long.
 *
 * Volontairement sans lookbehind, malgré la lisibilité qu'il aurait donnée :
 * Safari ne le gère que depuis 16.4, et une regex non supportée ne rate pas
 * la détection, elle jette à la construction. Or ce code tourne aussi dans le
 * navigateur (Intro est un composant client), donc l'exception casserait la
 * section entière. On capture le caractère d'avant, et on le remet.
 */
function patternFor(id: TermId, locale: Locale) {
  const body = GLOSSAIRE[id][locale].match
    .split(/\s+/)
    .map((w) => `${escapeRegExp(w)}s?`)
    .join("\\s+");
  return new RegExp(`(^|[^\\p{L}])(${body})(?!\\p{L})`, "iu");
}

/**
 * Enrobe la PREMIÈRE occurrence de chaque terme du glossaire, et elle seule :
 * défini une fois, le mot n'a plus besoin de l'être vingt lignes plus bas, et
 * le texte reste lisible. `used` porte la mémoire à l'échelle de la page.
 *
 * Les termes longs passent avant les courts (`termIds` est trié) pour que
 * « agent IA » ne se fasse pas manger par « agent ».
 */
export function withTerms(
  text: string,
  used: Set<TermId>,
  locale: Locale,
): React.ReactNode {
  for (const id of termIds(locale)) {
    if (used.has(id)) continue;
    const m = patternFor(id, locale).exec(text);
    if (!m) continue;
    used.add(id);
    // m[1] = le caractère qui précède (ou "" en début de texte), m[2] = le mot.
    // Le caractère d'avant appartient au texte, pas au terme : il repart donc
    // dans `before`, sinon on le mangerait.
    const start = m.index + m[1].length;
    const word = m[2];
    const before = text.slice(0, start);
    const after = text.slice(start + word.length);
    return (
      <>
        {withTerms(before, used, locale)}
        <Term id={id}>{word}</Term>
        {withTerms(after, used, locale)}
      </>
    );
  }
  return text;
}
