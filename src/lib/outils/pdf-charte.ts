import { PDFDocument, PDFPage, StandardFonts } from "pdf-lib";
import {
  A4,
  ACCENT,
  HAIR,
  INK,
  MUTED,
  WHITE,
  clean,
  drawFooter,
  embedLogotype,
  paintPage,
  todayFr,
  wrap,
} from "./pdf-common";

/**
 * Générateur de charte d'usage de l'IA, personnalisée puis livrée en PDF.
 * Porté depuis troie.app le 23/10/2026.
 *
 * Aucun texte n'impose de charte, mais c'est la mesure la plus simple à
 * produire au titre de l'article 4 du règlement (UE) 2024/1689 (maîtrise de
 * l'IA, obligation de MOYENS, « niveau suffisant », aucun certificat requis).
 *
 * Vocabulaire : l'agence fait du conseil et de l'accompagnement. Le document
 * parle de sensibilisation, d'ateliers et d'accompagnement, jamais de
 * « formation ». Une charte purement disciplinaire serait une adjonction au
 * règlement intérieur (art. L. 1321-5 du code du travail) : la mention le
 * dit, sans jouer au juriste.
 */

const M = 52;

export type CharteNiveau = "souple" | "standard" | "strict";
export const CHARTE_NIVEAUX: CharteNiveau[] = ["souple", "standard", "strict"];

export type CharteInput = {
  /** Raison sociale affichée en tête et dans les règles. */
  organisation: string;
  /** Activité, une ligne, facultative. */
  activite?: string;
  /** Outils nommément autorisés (règle 2). */
  outils: string[];
  /** Personne référente IA (règle 7). Un nom, pas un service. */
  referent?: string;
  /** Adresse de signalement (règle 7). */
  contact?: string;
  /** Niveau d'exigence : ajuste les règles 3 et 6. */
  niveau: CharteNiveau;
};

/** Les dix règles, dont deux se durcissent selon le niveau choisi. */
export function charteRegles(input: CharteInput): { t: string; d: string }[] {
  const outils =
    input.outils.length > 0
      ? input.outils.join(", ")
      : "aucun outil n'est encore validé, la procédure ci-dessous s'applique à toute demande";

  const donnees: Record<CharteNiveau, string> = {
    souple:
      "Ne sont jamais saisies dans un outil non validé : les données personnelles de clients ou de salariés, les données de santé, les éléments de paie et les secrets d'affaires. En cas de doute sur une donnée, elle est considérée comme interdite.",
    standard:
      "Ne sont jamais saisies dans un outil non validé : les données personnelles de clients ou de salariés, les données de santé, les éléments de paie, les pièces contractuelles, le code source et les secrets d'affaires. En cas de doute, la donnée est considérée comme interdite. Le RGPD s'applique entièrement à ce qui est saisi dans un prompt.",
    strict:
      "Aucune donnée non publique ne peut être saisie dans un outil d'IA, quel qu'il soit, sans validation écrite préalable du référent. Sont interdites en toutes circonstances : les données personnelles de clients ou de salariés, les données de santé, les éléments de paie, les pièces contractuelles, le code source et les secrets d'affaires. Le RGPD s'applique entièrement à ce qui est saisi dans un prompt.",
  };

  const decisions: Record<CharteNiveau, string> = {
    souple:
      "Une IA ne décide jamais seule : le tri final des candidatures, l'évaluation des personnes et les décisions disciplinaires restent humains. Ces usages relèvent du haut risque au sens du règlement européen, dont les règles s'appliqueront le 2 décembre 2027, et le RGPD encadre déjà les décisions entièrement automatisées.",
    standard:
      "Une IA ne décide jamais seule. Sont écartés nommément : le tri final des candidatures, l'évaluation des personnes, les décisions disciplinaires, l'accès à un crédit ou à un service essentiel. Ces usages relèvent du haut risque au sens du règlement européen, dont les règles s'appliqueront le 2 décembre 2027, et le RGPD encadre déjà les décisions entièrement automatisées.",
    strict:
      "Une IA ne décide jamais seule et ne prépare aucune décision concernant une personne sans validation écrite du référent. Sont écartés nommément : le tri des candidatures à toute étape, l'évaluation des personnes, les décisions disciplinaires, l'accès à un crédit ou à un service essentiel, et toute notation de comportement. Ces usages relèvent du haut risque au sens du règlement européen, dont les règles s'appliqueront le 2 décembre 2027, et le RGPD encadre déjà les décisions entièrement automatisées.",
  };

  const referent = input.referent?.trim() || "[nom du référent à compléter]";
  const contact = input.contact?.trim() || "[adresse de signalement à compléter]";

  return [
    {
      t: "1. Le périmètre",
      d: `La présente charte s'applique à toute personne travaillant pour ${input.organisation} : salariés, alternants, stagiaires, dirigeants et prestataires qui interviennent sur ses données. Elle couvre tout système d'intelligence artificielle, y compris les fonctions d'IA déjà intégrées à la suite bureautique ou au CRM, et les outils utilisés depuis un compte personnel dans un cadre professionnel.`,
    },
    {
      t: "2. Les outils autorisés",
      d: `Les outils validés à ce jour sont : ${outils}. La version ou l'offre compte : les garanties d'une version gratuite grand public diffèrent de celles d'une offre professionnelle. Toute demande d'ajout d'un outil est adressée au référent, qui répond sous quinze jours au regard des données traitées, des garanties du fournisseur et du besoin réel.`,
    },
    { t: "3. Les données interdites en saisie", d: donnees[input.niveau] },
    {
      t: "4. La relecture humaine",
      d: "Aucune production d'une IA ne part vers un client, un candidat, une administration ou le public sans avoir été relue par une personne nommée. La relecture est une étape du travail, pas une intention : elle laisse une trace dans l'outil habituel.",
    },
    {
      t: "5. La transparence",
      d: "Un contenu en grande partie généré par une IA et diffusé à l'extérieur est signalé comme tel. En interne, chacun indique lorsqu'une analyse ou un document a été produit avec une IA. À un client qui demande si une IA a été utilisée, la réponse est factuelle et immédiate. Le règlement européen prévoit des obligations de transparence pour les échanges avec une machine et pour certains contenus générés.",
    },
    { t: "6. Les décisions interdites à l'IA seule", d: decisions[input.niveau] },
    {
      t: "7. Le référent et le signalement",
      d: `Le référent IA est ${referent}. Tout incident se signale à ${contact} : donnée divulguée, réponse aberrante partie chez un client, soupçon de contenu erroné ou de contrefaçon. Un signalement de bonne foi n'expose à aucune sanction.`,
    },
    {
      t: "8. La tenue du registre",
      d: "La charte pose la règle, le registre des usages en garde la trace : outils validés, usages, personnes concernées, incidents. Le référent le met à jour à chaque arrivée ou retrait d'un outil, et au moins une fois par trimestre.",
    },
    {
      t: "9. La maîtrise de l'IA et sa trace",
      d: `Chaque personne qui utilise l'IA dans son travail bénéficie d'une sensibilisation ou d'un accompagnement proportionné à son usage réel, dans les trois mois qui suivent son arrivée ou l'ouverture d'un accès. ${input.organisation} conserve la trace de cet effort, personne par personne : date, contenu, intervenant. L'article 4 du règlement (UE) 2024/1689 impose une obligation de moyens, garantir un niveau suffisant de maîtrise de l'IA, et non un programme ou un certificat déterminé.`,
    },
    {
      t: "10. La révision",
      d: "La présente charte porte une date de version. Elle est relue au moins une fois par an, et mise à jour à chaque nouvel outil validé. Une charte sans date ne prouve rien, et une charte qui ignore les outils réellement utilisés se retourne contre celui qui l'a écrite.",
    },
  ];
}

export async function buildChartePdf(input: CharteInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);
  const logo = await embedLogotype(doc);

  const org = clean(input.organisation.trim() || "Votre organisation", bold);
  const dateFr = todayFr();

  doc.setTitle(`Charte d'usage de l'intelligence artificielle, ${org}`);
  doc.setAuthor(org);
  doc.setCreator("TROIE Studio, troiestudio.fr");
  doc.setProducer("TROIE Studio");
  doc.setSubject("Charte interne d'usage de l'IA, article 4 du règlement (UE) 2024/1689");
  doc.setLanguage("fr-FR");

  const contentW = A4.w - M * 2;
  const footerLeft = `Charte d'usage de l'IA, ${org}, version du ${dateFr}`;
  let page: PDFPage = doc.addPage([A4.w, A4.h]);
  let pageNo = 1;
  paintPage(page);

  const newPage = () => {
    drawFooter(page, helv, footerLeft, pageNo, M);
    page = doc.addPage([A4.w, A4.h]);
    pageNo += 1;
    paintPage(page);
    return A4.h - M;
  };

  /* En-tête */
  let y = A4.h - M - 6;
  if (logo) {
    const w = 70;
    const h = (logo.height / logo.width) * w;
    page.drawImage(logo, { x: A4.w - M - w, y: y - h + 12, width: w, height: h });
  }
  page.drawText(clean("Charte d'usage de l'intelligence artificielle", bold), {
    x: M,
    y,
    size: 19,
    font: bold,
    color: INK,
  });
  y -= 24;
  page.drawText(org, { x: M, y, size: 14, font: bold, color: ACCENT });
  y -= 16;
  const meta = input.activite?.trim()
    ? `${input.activite.trim()}. Version du ${dateFr}.`
    : `Version du ${dateFr}.`;
  page.drawText(clean(meta, helv), { x: M, y, size: 9, font: helv, color: MUTED });

  /* Préambule */
  y -= 30;
  const preambule =
    "L'article 4 du règlement (UE) 2024/1689 sur l'intelligence artificielle, applicable depuis le 2 février 2025, demande aux organisations qui utilisent des systèmes d'IA de prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA de leur personnel. C'est une obligation de moyens : aucun programme ni certificat n'est imposé. Depuis le 2 août 2026, les autorités nationales peuvent contrôler. Cette charte, datée et tenue à jour, est la mesure la plus simple à produire pour montrer l'effort, avec le registre des usages et la trace des ateliers suivis.";
  const preLines = wrap(preambule, helv, 8.5, contentW - 6);
  const boxH = 24 + preLines.length * 11;
  page.drawRectangle({ x: M - 10, y: y - boxH + 14, width: contentW + 20, height: boxH, color: WHITE, borderColor: HAIR, borderWidth: 0.5 });
  page.drawText("Pourquoi ce document", { x: M, y: y - 2, size: 10, font: bold, color: INK });
  let py = y - 18;
  for (const line of preLines) {
    page.drawText(line, { x: M, y: py, size: 8.5, font: helv, color: INK });
    py -= 11;
  }
  y = y - boxH - 6;

  /* Les dix règles */
  for (const r of charteRegles({ ...input, organisation: org })) {
    const lines = wrap(r.d, helv, 9.5, contentW);
    const blockH = 15 + lines.length * 12 + 12;
    if (y - blockH < 70) y = newPage();
    page.drawText(clean(r.t, bold), { x: M, y, size: 11, font: bold, color: INK });
    y -= 15;
    for (const line of lines) {
      page.drawText(line, { x: M, y, size: 9.5, font: helv, color: INK });
      y -= 12;
    }
    y -= 12;
  }

  /* Adoption et signatures */
  if (y < 300) y = newPage();
  page.drawText("Adoption et diffusion", { x: M, y, size: 11, font: bold, color: INK });
  y -= 15;
  const adoption =
    "Cette charte est diffusée à toutes les personnes concernées et rangée avec le registre des usages. Si elle prévoit des sanctions, elle constitue une adjonction au règlement intérieur au sens de l'article L. 1321-5 du code du travail : elle suit alors la procédure d'adoption correspondante, consultation des représentants du personnel, transmission à l'inspection du travail et dépôt au greffe. Sans clause disciplinaire, elle vaut note de service.";
  for (const line of wrap(adoption, helv, 9.5, contentW)) {
    page.drawText(line, { x: M, y, size: 9.5, font: helv, color: INK });
    y -= 12;
  }

  y -= 22;
  const colW = (contentW - 24) / 2;
  const sign = [
    { l: "Pour l'organisation", s: "Nom, fonction, date, signature" },
    { l: "Le référent IA", s: input.referent?.trim() || "Nom, date, signature" },
  ];
  sign.forEach((s, i) => {
    const x = M + i * (colW + 24);
    page.drawRectangle({ x, y: y - 56, width: colW, height: 62, color: WHITE, borderColor: HAIR, borderWidth: 0.6 });
    page.drawText(clean(s.l, bold), { x: x + 10, y: y - 8, size: 8.5, font: bold, color: INK });
    page.drawText(clean(s.s, helv), { x: x + 10, y: y - 22, size: 7.5, font: helv, color: MUTED });
  });
  y -= 84;

  /* Suite logique */
  page.drawText("Les deux pièces qui complètent cette charte", { x: M, y, size: 10, font: bold, color: INK });
  y -= 14;
  const suites = [
    "Le registre des usages de l'IA : la trace vivante des outils validés, des usages, des personnes concernées et des incidents. Modèle gratuit sur troiestudio.fr/fr/outils.",
    "La trace des ateliers et sensibilisations, personne par personne : date, contenu, intervenant.",
  ];
  for (const s of suites) {
    page.drawRectangle({ x: M, y: y + 2, width: 3, height: 3, color: ACCENT });
    for (const line of wrap(s, helv, 9, contentW - 12)) {
      page.drawText(line, { x: M + 10, y, size: 9, font: helv, color: INK });
      y -= 11.5;
    }
    y -= 4;
  }

  y -= 10;
  const mention =
    "Document généré gratuitement sur troiestudio.fr par TROIE Studio, conseil et accompagnement. Modèle fondé sur le règlement (UE) 2024/1689 et le code du travail, à adapter à votre organisation. Il ne constitue pas un conseil juridique.";
  for (const line of wrap(mention, italic, 7.5, contentW)) {
    page.drawText(line, { x: M, y, size: 7.5, font: italic, color: MUTED });
    y -= 10;
  }

  drawFooter(page, helv, footerLeft, pageNo, M);
  return doc.save();
}
