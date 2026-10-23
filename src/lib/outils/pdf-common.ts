import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, PDFFont, PDFImage, PDFPage, rgb } from "pdf-lib";

/**
 * Socle commun des PDF des outils gratuits (charte, registre, checklist),
 * portés depuis troie.app le 23/10/2026 dans la charte de l'agence :
 * blanc cassé chaud, encre presque noire, bleu cobalt pour les repères.
 *
 * Encodage : polices standard Helvetica (WinAnsi). Elles couvrent les
 * accents français (é è à ç û ô î), les guillemets « » et l'apostrophe
 * typographique. `clean()` écarte tout le reste, caractère par caractère,
 * d'après le jeu réel de la police : un PDF ne doit jamais casser sur une
 * saisie exotique.
 */

export const INK = rgb(0.067, 0.075, 0.094); // #111318
export const MUTED = rgb(0.31, 0.333, 0.384); // #4f5562
export const ACCENT = rgb(0.184, 0.357, 0.827); // #2f5bd3
export const BG = rgb(0.984, 0.98, 0.973); // #fbfaf8
export const PANEL = rgb(0.953, 0.945, 0.933); // #f3f1ee
export const HAIR = rgb(0.84, 0.82, 0.8);
export const WHITE = rgb(1, 1, 1);

export const A4 = { w: 595.28, h: 841.89 };

/** Remplace ce que WinAnsi ne sait pas dessiner, puis filtre sur le jeu de la police. */
export function clean(s: string, font?: PDFFont): string {
  const base = s
    .replace(new RegExp(String.fromCharCode(0x2014), "g"), ", ")
    .replace(/[‘′]/g, "’")
    .replace(/[   ]/g, " ")
    .replace(/[\r\n\t]+/g, " ");
  if (!font) return base;
  const allowed = new Set(font.getCharacterSet());
  return Array.from(base)
    .filter((ch) => allowed.has(ch.codePointAt(0) ?? 0))
    .join("");
}

export function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  /* Coupe sur les espaces ordinaires seulement : l'espace insécable reste collé (guillemets « »). */
  const words = clean(text, font).split(/ +/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(next, size) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Dessine un paragraphe et renvoie la nouvelle ordonnée. */
export function drawParagraph(
  page: PDFPage,
  text: string,
  o: {
    x: number;
    y: number;
    font: PDFFont;
    size: number;
    maxWidth: number;
    lineHeight: number;
    color?: ReturnType<typeof rgb>;
  },
): number {
  let y = o.y;
  for (const line of wrap(text, o.font, o.size, o.maxWidth)) {
    page.drawText(line, { x: o.x, y, size: o.size, font: o.font, color: o.color ?? INK });
    y -= o.lineHeight;
  }
  return y;
}

/** Fond blanc cassé et filet bleu en tête : la signature de chaque page. */
export function paintPage(page: PDFPage) {
  page.drawRectangle({ x: 0, y: 0, width: A4.w, height: A4.h, color: BG });
  page.drawRectangle({ x: 0, y: A4.h - 5, width: A4.w, height: 5, color: ACCENT });
}

/** Logo-mot TROIE, ou rien si le fichier manque (le PDF reste valide). */
export async function embedLogotype(doc: PDFDocument): Promise<PDFImage | null> {
  try {
    return await doc.embedPng(
      readFileSync(join(process.cwd(), "public/brand/troie-logotype.png")),
    );
  } catch {
    return null;
  }
}

export function drawFooter(page: PDFPage, font: PDFFont, left: string, n: number, margin: number) {
  page.drawLine({
    start: { x: margin, y: 44 },
    end: { x: A4.w - margin, y: 44 },
    thickness: 0.5,
    color: HAIR,
  });
  page.drawText(clean(left, font), { x: margin, y: 32, size: 7.5, font, color: MUTED });
  const p = `Page ${n}`;
  page.drawText(p, {
    x: A4.w - margin - font.widthOfTextAtSize(p, 7.5),
    y: 32,
    size: 7.5,
    font,
    color: MUTED,
  });
}

/** Date du jour en toutes lettres, en français. */
export function todayFr(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}
