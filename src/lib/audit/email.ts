import { escapeHtml as esc } from "./guards";
import type { AuditFull, Band, CategoryId, CheckStatus } from "./types";

/**
 * E-mails de l'audit SEO et GEO : le rapport complet pour le visiteur, et
 * la notification interne. HTML en tableaux, styles en ligne (Gmail,
 * Outlook). Charte TROIE : blanc chaud, encre, bleu cobalt pour les
 * chiffres seulement. Aucun prix. Une seule action : la page contact, ou
 * une réponse à l'e-mail (décision du 26/10/2026, plus de lien Cal).
 */

const INK = "#111318";
const GRAPHITE = "#4f5562";
const ACCENT = "#2f5bd3";
const CANVAS = "#fbfaf8";
const RULE = "#e7e4df";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
export const CONTACT_EMAIL = "contact@troiestudio.fr";

const BAND_COLOR: Record<Band, string> = {
  excellent: "#178a4c",
  bon: "#b78207",
  renforcer: "#c25a17",
  fragile: "#c22f33",
};

/** Les deux notes en tête. Repli pour un rapport ancien sans seoScore. */
export function twoScores(r: AuditFull) {
  const cat = (id: CategoryId) => r.categories.find((c) => c.id === id)?.score ?? 0;
  const seo = r.seoScore ?? Math.round((cat("technique") * 0.25 + cat("contenu") * 0.25 + cat("performance") * 0.2) / 0.7);
  const geo = r.geoScore ?? cat("ia");
  return {
    seo,
    geo,
    seoBand: r.seoBand ?? bandOfLocal(seo),
    geoBand: r.geoBand ?? bandOfLocal(geo),
    weakest: r.weakest ?? (seo < geo ? "seo" : "geo"),
  } as const;
}

function bandOfLocal(score: number): Band {
  if (score >= 85) return "excellent";
  if (score >= 70) return "bon";
  if (score >= 50) return "renforcer";
  return "fragile";
}

export function bandWord(band: Band, en: boolean) {
  const fr = { excellent: "Excellent", bon: "Bon", renforcer: "À renforcer", fragile: "Fragile" };
  const enW = { excellent: "Excellent", bon: "Good", renforcer: "Needs work", fragile: "Fragile" };
  return (en ? enW : fr)[band];
}

function statusWord(s: CheckStatus, en: boolean) {
  if (s === "pass") return en ? "OK" : "OK";
  if (s === "warn") return en ? "To improve" : "À améliorer";
  return en ? "To fix" : "À corriger";
}

function statusColor(s: CheckStatus) {
  return s === "pass" ? ACCENT : s === "warn" ? GRAPHITE : INK;
}

export function reportEmail(
  r: AuditFull,
  { en, firstName, locale }: { en: boolean; firstName: string; locale: string },
) {
  const L = (fr: string, enText: string) => (en ? enText : fr);
  const contactUrl = `https://troiestudio.fr/${locale}/contact#projet`;
  const pageUrl = `https://troiestudio.fr/${locale}/audit-seo-gratuit?site=${encodeURIComponent(r.host)}`;
  const hello = firstName ? L(`Bonjour ${esc(firstName)},`, `Hello ${esc(firstName)},`) : L("Bonjour,", "Hello,");
  const date = new Date(r.fetchedAt).toLocaleDateString(en ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const ts = twoScores(r);
  const bar = (c: { label: string; score: number }) => ({ label: c.label, score: c.score });
  const seoCats = r.categories.filter((c) => c.id !== "ia").map(bar);
  const bars = seoCats
    .map(
      (c) => `
      <tr>
        <td style="padding:10px 0 4px;font:500 14px/1.4 ${FONT};color:${INK}">${esc(c.label)}</td>
        <td align="right" style="padding:10px 0 4px;font:500 14px/1.4 ${FONT};color:${ACCENT}">${c.score}<span style="color:${GRAPHITE};font-weight:400">/100</span></td>
      </tr>
      <tr><td colspan="2" style="padding:0 0 4px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tr>
          <td width="${Math.max(2, c.score)}%" style="height:6px;background:${ACCENT};border-radius:3px;font-size:0;line-height:0">&nbsp;</td>
          <td style="height:6px;background:#ebe8e3;font-size:0;line-height:0">&nbsp;</td>
        </tr></table>
      </td></tr>`,
    )
    .join("");

  const GEO_KEYS = ["ai-bots", "jsonld", "llms", "no-js", "faq"];
  const geoRows = GEO_KEYS.map((id) => r.details.find((c) => c.id === id))
    .filter((c): c is AuditFull["details"][number] => Boolean(c))
    .map(
      (c) => `<tr>
        <td style="padding:7px 0;border-top:1px solid ${RULE};font:14px/1.4 ${FONT};color:${INK}">${esc(c.title)}</td>
        <td align="right" style="padding:7px 0;border-top:1px solid ${RULE};font:500 12px/1.4 ${FONT};color:${statusColor(c.status)};white-space:nowrap">${statusWord(c.status, en)}</td>
      </tr>`,
    )
    .join("");

  const tile = (side: "seo" | "geo") => {
    const score = side === "seo" ? ts.seo : ts.geo;
    const band = side === "seo" ? ts.seoBand : ts.geoBand;
    const weak = ts.weakest === side;
    const label =
      side === "seo"
        ? L("SEO, visibilité sur Google", "SEO, visibility on Google")
        : L("GEO, visibilité dans les IA", "GEO, visibility in AI engines");
    return `<td valign="top" width="50%" style="padding:18px 16px;border:1px solid ${weak ? ACCENT : RULE};border-radius:12px;background:${weak ? "#f4f6fd" : "#ffffff"}">
      <p style="margin:0;font:500 13px/1.4 ${FONT};color:${GRAPHITE}">${label}</p>
      <p style="margin:10px 0 0;font:500 48px/1 ${FONT};letter-spacing:-0.04em;color:${BAND_COLOR[band]}">${score}<span style="font-size:18px;letter-spacing:0;color:${GRAPHITE};font-weight:400">/100</span></p>
      <p style="margin:8px 0 0;font:500 15px/1.4 ${FONT};color:${INK}">${bandWord(band, en)}</p>
      ${weak ? `<p style="margin:8px 0 0;font:500 12px/1.4 ${FONT};color:${ACCENT}">${L("À traiter en premier", "Fix this first")}</p>` : ""}
    </td>`;
  };

  const issues = r.issues.length
    ? r.issues
        .map(
          (i, n) => `<tr><td style="padding:8px 0;border-top:1px solid ${RULE};font:500 15px/1.5 ${FONT};color:${INK}"><span style="color:${ACCENT}">${n + 1}.</span>&nbsp; ${esc(i.title)}</td></tr>`,
        )
        .join("")
    : `<tr><td style="padding:8px 0;font:15px/1.5 ${FONT};color:${GRAPHITE}">${L("Rien de bloquant. Les points restants relèvent du réglage fin.", "Nothing blocking. What remains is fine tuning.")}</td></tr>`;

  const catOrder: CategoryId[] =
    ts.weakest === "geo" ? ["ia", "technique", "contenu", "performance"] : ["technique", "contenu", "performance", "ia"];
  const details = catOrder
    .map((cat) => {
      const label = r.categories.find((c) => c.id === cat)?.label ?? cat;
      const rows = r.details
        .filter((c) => c.cat === cat)
        .map(
          (c) => `
          <tr><td style="padding:14px 0;border-top:1px solid ${RULE}">
            <p style="margin:0;font:500 15px/1.4 ${FONT};color:${INK}">${esc(c.title)} <span style="font-weight:500;font-size:12px;color:${statusColor(c.status)}">&nbsp;${statusWord(c.status, en)}</span></p>
            <p style="margin:6px 0 0;font:14px/1.6 ${FONT};color:${GRAPHITE}">${esc(c.found)}</p>
            ${
              c.status === "pass"
                ? ""
                : `<p style="margin:6px 0 0;font:14px/1.6 ${FONT};color:${GRAPHITE}">${esc(c.why)}</p>
            <p style="margin:6px 0 0;font:14px/1.6 ${FONT};color:${INK}"><strong style="font-weight:600">${L("À faire", "To do")} :</strong> ${esc(c.fix)}</p>`
            }
          </td></tr>`,
        )
        .join("");
      return `
        <tr><td style="padding:28px 0 6px;font:500 18px/1.3 ${FONT};color:${INK};letter-spacing:-0.01em">${esc(label)}</td></tr>
        ${rows}`;
    })
    .join("");

  const fixes = r.fixes
    .map(
      (f) => `
      <tr><td style="padding:18px 0 0">
        <p style="margin:0;font:500 15px/1.4 ${FONT};color:${INK}">${esc(f.title)}${f.file ? ` <span style="font-weight:400;color:${GRAPHITE}">(${esc(f.file)})</span>` : ""}</p>
        <p style="margin:6px 0 10px;font:14px/1.6 ${FONT};color:${GRAPHITE}">${esc(f.intro)}</p>
        <pre style="margin:0;padding:14px 16px;background:#f3f1ee;border-radius:10px;font:12px/1.55 Menlo,Consolas,monospace;color:${INK};white-space:pre-wrap;word-break:break-word">${esc(f.code)}</pre>
      </td></tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="${en ? "en" : "fr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${L("Votre audit SEO et GEO", "Your SEO and GEO audit")}</title></head>
<body style="margin:0;padding:0;background:${CANVAS}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CANVAS}">
<tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
  <tr><td style="padding:0 0 24px;font:400 26px/1 'Bodoni Moda',Didot,Georgia,serif;letter-spacing:0.06em;color:${INK}">TROIE</td></tr>
  <tr><td style="background:#ffffff;border:1px solid ${RULE};border-radius:16px;padding:32px 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="font:15px/1.6 ${FONT};color:${INK}">${hello}</td></tr>
      <tr><td style="padding:8px 0 0;font:15px/1.6 ${FONT};color:${GRAPHITE}">${L(
        `Voici le rapport complet de l'audit de <strong style="color:${INK};font-weight:500">${esc(r.host)}</strong>, réalisé le ${date}.`,
        `Here is the full audit report for <strong style="color:${INK};font-weight:500">${esc(r.host)}</strong>, run on ${date}.`,
      )}</td></tr>
      <tr><td style="padding:24px 0 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0"><tr>
          ${tile("seo")}<td width="12" style="font-size:0">&nbsp;</td>${tile("geo")}
        </tr></table>
      </td></tr>
      <tr><td style="padding:24px 0 0;font:500 15px/1.4 ${FONT};color:${INK}">${L("Le détail du score SEO", "SEO score breakdown")}</td></tr>
      <tr><td style="padding:4px 0 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${bars}</table></td></tr>
      <tr><td style="padding:24px 0 6px;font:500 15px/1.4 ${FONT};color:${INK}">${L("Le détail du score GEO", "GEO score breakdown")}</td></tr>
      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${geoRows}</table></td></tr>
      <tr><td style="padding:28px 0 8px;font:500 18px/1.3 ${FONT};color:${INK}">${L("Les trois points à corriger d'abord", "The three points to fix first")}</td></tr>
      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${issues}</table></td></tr>
    </table>
  </td></tr>
  <tr><td style="height:16px"></td></tr>
  <tr><td style="background:#ffffff;border:1px solid ${RULE};border-radius:16px;padding:8px 28px 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${details}</table>
  </td></tr>
  ${
    r.fixes.length
      ? `<tr><td style="height:16px"></td></tr>
  <tr><td style="background:#ffffff;border:1px solid ${RULE};border-radius:16px;padding:28px">
    <p style="margin:0;font:500 18px/1.3 ${FONT};color:${INK}">${L("Les correctifs prêts pour votre site", "Fixes ready for your site")}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fixes}</table>
  </td></tr>`
      : ""
  }
  <tr><td style="height:16px"></td></tr>
  <tr><td style="background:#ffffff;border:1px solid ${RULE};border-radius:16px;padding:28px">
    <p style="margin:0;font:500 20px/1.3 ${FONT};color:${INK};letter-spacing:-0.01em">${L("Faire corriger ces points.", "Get these points fixed.")}</p>
    <p style="margin:10px 0 20px;font:15px/1.6 ${FONT};color:${GRAPHITE}">${L(
      "Nous corrigeons le site avec vous, puis nous mesurons à nouveau. Décrivez votre projet, ou répondez simplement à cet e-mail.",
      "We fix the site with you, then measure again. Describe your project, or simply reply to this email.",
    )}</p>
    <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${INK};border-radius:999px">
      <a href="${contactUrl}" style="display:inline-block;padding:14px 26px;font:500 15px/1 ${FONT};color:#ffffff;text-decoration:none">${L("Décrire mon projet", "Describe my project")}</a>
    </td></tr></table>
    <p style="margin:18px 0 0;font:14px/1.6 ${FONT};color:${GRAPHITE}">${L("Ou écrivez-nous", "Or write to us at")} : <a href="mailto:${CONTACT_EMAIL}" style="color:${ACCENT}">${CONTACT_EMAIL}</a></p>
  </td></tr>
  <tr><td style="padding:24px 4px 0;font:12px/1.6 ${FONT};color:${GRAPHITE}">
    ${L(
      "Cet audit mesure la lisibilité de la page d'accueil par les moteurs de recherche et les moteurs IA. Il ne dit pas si le site est cité par ChatGPT ou un autre assistant : personne ne peut le mesurer ni le garantir.",
      "This audit measures how readable the home page is for search engines and AI engines. It does not say whether the site is cited by ChatGPT or another assistant: nobody can measure or guarantee that.",
    )}
    <br><br>
    <a href="${pageUrl}" style="color:${GRAPHITE}">${L("Relancer l'audit", "Run the audit again")}</a><br><br>
    ${L(
      "Vous recevez cet e-mail parce que vous avez demandé ce rapport sur troiestudio.fr. Pour ne plus rien recevoir de notre part, répondez « stop ».",
      "You receive this email because you requested this report on troiestudio.fr. To stop hearing from us, reply “stop”.",
    )}<br>TROIE Studio, troiestudio.fr
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  const subject = L(
    `Votre audit SEO et GEO : ${r.host}, SEO ${ts.seo}/100, GEO ${ts.geo}/100`,
    `Your SEO and GEO audit: ${r.host}, SEO ${ts.seo}/100, GEO ${ts.geo}/100`,
  );
  return { subject, html };
}

export function notificationEmail(
  r: AuditFull,
  { email, firstName, locale }: { email: string; firstName: string; locale: string },
) {
  const ts = twoScores(r);
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:${GRAPHITE}">${k}</td><td style="padding:6px 0;color:${INK}">${v}</td></tr>`;
  const html = `<div style="font:15px/1.6 ${FONT};color:${INK}">
  <p style="margin:0 0 12px">Nouveau rapport d'audit demandé.</p>
  <table cellpadding="0" cellspacing="0" style="font:15px/1.5 ${FONT}">
    ${row("Site", `<a href="${esc(r.url)}">${esc(r.url)}</a>`)}
    ${row("Score SEO", `<strong>${ts.seo}/100</strong> (${bandWord(ts.seoBand, false)})${ts.weakest === "seo" ? ", le plus faible" : ""}`)}
    ${row("Score GEO", `<strong>${ts.geo}/100</strong> (${bandWord(ts.geoBand, false)})${ts.weakest === "geo" ? ", le plus faible" : ""}`)}
    ${row("Score global", `${r.score}/100`)}
    ${row("Détail", r.categories.map((c) => `${esc(c.label)} ${c.score}`).join(", "))}
    ${row("E-mail", `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
    ${row("Prénom", esc(firstName || "Non renseigné"))}
    ${row("Langue", locale === "en" ? "anglais" : "français")}
    ${row("Consentement", "Oui (case cochée)")}
  </table>
  <p style="margin:16px 0 4px">Points prioritaires :</p>
  <ol style="margin:0;padding-left:20px">${r.issues.map((i) => `<li>${esc(i.title)}</li>`).join("")}</ol>
</div>`;
  return { subject: `[TROIE] Audit : ${r.host}, SEO ${ts.seo}, GEO ${ts.geo}, ${email}`, html };
}
