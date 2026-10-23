import { PDFDocument, PDFFont, PDFPage, StandardFonts } from "pdf-lib";
import {
  A4,
  ACCENT,
  BG,
  HAIR,
  INK,
  MUTED,
  WHITE,
  clean,
  drawFooter,
  drawParagraph,
  embedLogotype,
  paintPage,
  wrap,
} from "./pdf-common";

/**
 * Le registre des usages de l'IA, en PDF A4 à remplir (trois pages).
 * Porté depuis troie.app le 23/10/2026 et recentré sur les usages :
 *
 *   1. les outils et leurs usages (ce qui tourne, pour quoi, avec quelles données),
 *   2. la maîtrise de l'IA, personne par personne (ateliers, sensibilisation),
 *   3. le mode d'emploi, et ce que le registre prouve ou ne prouve pas.
 *
 * Le règlement n'impose aucun modèle : celui-ci reprend ce qu'un contrôle
 * demanderait. L'article 4 est une obligation de moyens, aucun certificat
 * n'est exigé.
 */

const M = 44;
const USABLE = A4.w - 2 * M; // 507,28 pt

type Col = { label: string; w: number };

const USAGES: Col[] = [
  { label: "Outil et offre", w: 92 },
  { label: "Usage", w: 122 },
  { label: "Utilisé par", w: 90 },
  { label: "Données saisies", w: 92 },
  { label: "Validé le", w: 55 },
  { label: "Revu le", w: 56 },
];

const PERSONNES: Col[] = [
  { label: "Nom et prénom", w: 112 },
  { label: "Fonction", w: 86 },
  { label: "Outils utilisés", w: 96 },
  { label: "Atelier ou sensibilisation", w: 118 },
  { label: "Date", w: 50 },
  { label: "Trace", w: 45 },
];

const GUIDE: { t: string; d: string }[] = [
  {
    t: "Outil et offre",
    d: "Le nom de l'outil et la version utilisée : une offre gratuite grand public n'offre pas les garanties d'une offre professionnelle. Notez aussi les fonctions IA intégrées aux logiciels métier.",
  },
  {
    t: "Usage et données saisies",
    d: "À quoi sert l'outil, en une phrase, et quelles données y entrent. C'est ce qui permet de vérifier que la charte est respectée et qu'aucun usage ne glisse vers le haut risque.",
  },
  {
    t: "Utilisé par",
    d: "Un service ou des noms. Les comptes personnels utilisés à des fins professionnelles comptent aussi : ils vous engagent.",
  },
  {
    t: "Personnes : atelier ou sensibilisation",
    d: "L'intitulé, la durée et l'intervenant. Une séance interne d'une heure compte, à condition d'être datée et décrite. « On en a parlé en réunion » ne compte pas.",
  },
  {
    t: "Trace",
    d: "La référence du document qui atteste : feuille d'émargement, support remis, compte rendu. Sans trace rattachable, la ligne reste déclarative.",
  },
  {
    t: "Mise à jour",
    d: "À chaque arrivée, chaque départ, chaque nouvel outil, et au moins une fois par trimestre. Le registre se range avec la charte d'usage.",
  },
];

function drawTable(
  page: PDFPage,
  cols: Col[],
  top: number,
  rows: number,
  bold: PDFFont,
) {
  const headH = 20;
  const rowH = 27;
  page.drawRectangle({ x: M, y: top - headH, width: USABLE, height: headH, color: INK });
  let cx = M;
  for (const c of cols) {
    page.drawText(clean(c.label, bold), { x: cx + 5, y: top - headH + 7, size: 7.5, font: bold, color: BG });
    cx += c.w;
  }
  for (let r = 0; r < rows; r++) {
    const rt = top - headH - r * rowH;
    page.drawRectangle({
      x: M,
      y: rt - rowH,
      width: USABLE,
      height: rowH,
      color: r % 2 === 0 ? WHITE : BG,
      borderColor: HAIR,
      borderWidth: 0.5,
    });
    let sx = M;
    for (let i = 0; i < cols.length - 1; i++) {
      sx += cols[i].w;
      page.drawLine({ start: { x: sx, y: rt }, end: { x: sx, y: rt - rowH }, thickness: 0.5, color: HAIR });
    }
  }
}

function fillLine(page: PDFPage, label: string, x: number, y: number, w: number, bold: PDFFont) {
  const l = clean(label, bold);
  page.drawText(l, { x, y, size: 9, font: bold, color: INK });
  const lw = bold.widthOfTextAtSize(l, 9) + 6;
  page.drawLine({ start: { x: x + lw, y: y - 2 }, end: { x: x + w, y: y - 2 }, thickness: 0.6, color: HAIR });
}

export async function buildRegistrePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await embedLogotype(doc);

  doc.setTitle("Registre des usages de l'IA, article 4 de l'AI Act");
  doc.setAuthor("TROIE Studio");
  doc.setCreator("TROIE Studio, troiestudio.fr");
  doc.setSubject("Trace interne des usages et de la maîtrise de l'IA, règlement (UE) 2024/1689");
  doc.setLanguage("fr-FR");

  const footer = "Registre des usages de l'IA, modèle TROIE Studio, troiestudio.fr/fr/outils";

  /* Page 1 : les outils et leurs usages */
  const p1 = doc.addPage([A4.w, A4.h]);
  paintPage(p1);
  let y = A4.h - M - 8;
  if (logo) {
    const w = 70;
    const h = (logo.height / logo.width) * w;
    p1.drawImage(logo, { x: A4.w - M - w, y: y - h + 12, width: w, height: h });
  }
  p1.drawText(clean("Registre des usages de l'intelligence artificielle", bold), { x: M, y, size: 16, font: bold, color: INK });
  y -= 16;
  p1.drawText(clean("Article 4 du règlement (UE) 2024/1689. À conserver et tenir à jour.", helv), {
    x: M,
    y,
    size: 9,
    font: helv,
    color: MUTED,
  });
  y -= 26;
  fillLine(p1, "Organisation :", M, y, 290, bold);
  fillLine(p1, "Référent IA :", M + 306, y, USABLE - 306, bold);
  y -= 20;
  fillLine(p1, "Mis à jour le :", M, y, 180, bold);
  y -= 30;
  p1.drawText(clean("1. Les outils et leurs usages", bold), { x: M, y, size: 11, font: bold, color: ACCENT });
  y -= 10;
  drawTable(p1, USAGES, y, 18, bold);
  drawFooter(p1, helv, footer, 1, M);

  /* Page 2 : la maîtrise de l'IA, personne par personne */
  const p2 = doc.addPage([A4.w, A4.h]);
  paintPage(p2);
  y = A4.h - M - 8;
  p2.drawText(clean("2. La maîtrise de l'IA, personne par personne", bold), { x: M, y, size: 11, font: bold, color: ACCENT });
  y -= 15;
  y = drawParagraph(
    p2,
    "Toute personne qui utilise l'IA pour son travail, y compris stagiaires, alternants et prestataires réguliers. La fonction sert à justifier la proportionnalité : on n'attend pas la même maîtrise d'un dirigeant, d'un commercial et d'une personne qui paramètre un agent.",
    { x: M, y, font: helv, size: 8.5, maxWidth: USABLE, lineHeight: 11, color: MUTED },
  );
  y -= 8;
  drawTable(p2, PERSONNES, y, 22, bold);
  drawFooter(p2, helv, footer, 2, M);

  /* Page 3 : le mode d'emploi */
  const p3 = doc.addPage([A4.w, A4.h]);
  paintPage(p3);
  let gy = A4.h - M - 16;
  p3.drawText(clean("Ce qu'il faut y mettre", bold), { x: M, y: gy, size: 16, font: bold, color: INK });
  gy -= 28;
  for (const g of GUIDE) {
    p3.drawText(clean(g.t, bold), { x: M, y: gy, size: 10, font: bold, color: INK });
    gy -= 14;
    gy = drawParagraph(p3, g.d, { x: M, y: gy, font: helv, size: 9, maxWidth: USABLE, lineHeight: 12, color: MUTED });
    gy -= 10;
  }

  gy -= 6;
  const proof =
    "L'article 4 est une obligation de moyens : il demande de prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA, pas d'obtenir un résultat certifié. Aucun certificat n'est exigé par le règlement. Ce registre ne vous rend donc pas « conforme » à lui seul : il documente votre effort, et c'est ce qu'on vous demandera de montrer. Depuis le 2 août 2026, les autorités nationales peuvent contrôler.";
  const boxH = 40 + wrap(proof, helv, 8.8, USABLE - 28).length * 11.5;
  p3.drawRectangle({ x: M, y: gy - boxH, width: USABLE, height: boxH, color: WHITE, borderColor: INK, borderWidth: 0.8 });
  p3.drawText(clean("Ce que ce registre prouve, et ce qu'il ne prouve pas", bold), {
    x: M + 14,
    y: gy - 20,
    size: 10,
    font: bold,
    color: INK,
  });
  drawParagraph(p3, proof, { x: M + 14, y: gy - 36, font: helv, size: 8.8, maxWidth: USABLE - 28, lineHeight: 11.5, color: MUTED });

  p3.drawText(
    clean("Document pratique, pas un avis juridique. Règlement (UE) 2024/1689, modifié par le règlement (UE) 2026/1744.", helv),
    { x: M, y: 56, size: 7.5, font: helv, color: MUTED },
  );
  drawFooter(p3, helv, footer, 3, M);

  return doc.save();
}
