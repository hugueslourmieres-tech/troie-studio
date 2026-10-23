import { PDFDocument, StandardFonts } from "pdf-lib";
import { CHECKLIST_STEPS } from "./checklist";
import {
  A4,
  ACCENT,
  INK,
  MUTED,
  PANEL,
  WHITE,
  clean,
  drawFooter,
  drawParagraph,
  embedLogotype,
  paintPage,
} from "./pdf-common";

/**
 * La checklist AI Act PME en PDF A4, à cocher au fil de l'eau.
 * Portée depuis troie.app le 23/10/2026 : l'encart final ne vend plus un
 * cours en ligne mais l'accompagnement de l'agence (ateliers sur cas réels).
 */

const M = 56;

export async function buildChecklistPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([A4.w, A4.h]);
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await embedLogotype(doc);

  doc.setTitle("Checklist AI Act : une PME en règle, en 7 étapes");
  doc.setAuthor("TROIE Studio");
  doc.setCreator("TROIE Studio, troiestudio.fr");
  doc.setSubject("AI Act, article 4 : les sept étapes d'une PME");
  doc.setLanguage("fr-FR");

  paintPage(page);
  const contentW = A4.w - 2 * M;

  let y = A4.h - M - 4;
  if (logo) {
    const w = 72;
    const h = (logo.height / logo.width) * w;
    page.drawImage(logo, { x: A4.w - M - w, y: y - h + 10, width: w, height: h });
  }
  page.drawText("Checklist AI Act pour PME", { x: M, y, size: 9, font: bold, color: ACCENT });
  y -= 24;
  page.drawText(clean("En règle avec l'AI Act, en 7 étapes.", bold), {
    x: M,
    y,
    size: 20,
    font: bold,
    color: INK,
  });
  y -= 18;
  y = drawParagraph(
    page,
    "L'article 4 du règlement (UE) 2024/1689 s'applique depuis le 2 février 2025 : une obligation de moyens, garantir un niveau suffisant de maîtrise de l'IA, sans certificat requis. Depuis le 2 août 2026, contrôles et sanctions sont possibles. Cochez au fil de l'eau.",
    { x: M, y, font: helv, size: 9.5, maxWidth: contentW, lineHeight: 13, color: MUTED },
  );
  y -= 14;

  CHECKLIST_STEPS.forEach((s, i) => {
    const box = 13;
    page.drawRectangle({
      x: M,
      y: y - box + 3,
      width: box,
      height: box,
      borderColor: INK,
      borderWidth: 1.1,
      color: WHITE,
    });
    page.drawText(clean(`${i + 1}. ${s.title}`, bold), {
      x: M + box + 10,
      y,
      size: 11.5,
      font: bold,
      color: INK,
    });
    y -= 15;
    y = drawParagraph(page, s.body, {
      x: M + box + 10,
      y,
      font: helv,
      size: 9,
      maxWidth: contentW - box - 10,
      lineHeight: 12,
      color: MUTED,
    });
    y -= 13;
  });

  /* Encart : les étapes 4 et 5, avec l'agence */
  const boxH = 82;
  y -= 2;
  page.drawRectangle({ x: M, y: y - boxH, width: contentW, height: boxH, color: PANEL });
  page.drawText(clean("Les étapes 4 et 5, avec nous", bold), {
    x: M + 18,
    y: y - 24,
    size: 10,
    font: bold,
    color: ACCENT,
  });
  drawParagraph(
    page,
    "TROIE Studio accompagne vos équipes avec des ateliers sur vos cas réels, puis vous laisse les documents qui restent : charte, registre, trace des ateliers. Un appel de 30 minutes pour en parler : cal.com/troiestudio/30min",
    { x: M + 18, y: y - 40, font: helv, size: 9.5, maxWidth: contentW - 36, lineHeight: 13, color: INK },
  );

  page.drawText(
    clean(
      "Synthèse pratique, pas un avis juridique. Règlement (UE) 2024/1689, modifié par le règlement (UE) 2026/1744.",
      helv,
    ),
    { x: M, y: 56, size: 7.5, font: helv, color: MUTED },
  );
  drawFooter(page, helv, "Checklist AI Act, TROIE Studio, troiestudio.fr/fr/outils", 1, M);
  return doc.save();
}
