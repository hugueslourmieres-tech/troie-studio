import { NextResponse } from "next/server";
import { Resend } from "resend";
import { clientIp, createRateLimiter, escapeHtml, originAllowed } from "@/lib/audit/guards";

/**
 * POST /api/presence (26/10/2026)
 *
 * Demande d'« analyse de présence » depuis l'accueil, onglet « Je n'ai pas de
 * site » : entreprise, ville, e-mail, consentement. Hugues regarde la fiche
 * Google, la position sur la recherche principale et les réponses de ChatGPT
 * et Gemini, puis répond à la main sous 48 h.
 *
 * Garde-fous (repris de src/lib/audit/guards.ts) :
 *   - Origin : un POST qui ne vient pas du site est refusé (403).
 *   - Limite par IP : 3 demandes par heure (mémoire d'instance).
 *   - Pot de miel « website » : rempli = robot, réponse ok sans envoi.
 *
 * Envoi Resend, comme /api/contact : un e-mail à CONTACT_TO (réponse directe
 * au visiteur via replyTo), puis une courte confirmation au visiteur.
 * Transport absent en local : la demande est écrite dans la console et
 * acceptée. En production : 503.
 *
 * Corps JSON : { company, city, email, consent, locale?, website? }
 */

export const runtime = "nodejs";

const rateLimited = createRateLimiter(3, 60 * 60 * 1000);

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 200;
}

const clip = (value: unknown, max: number) =>
  String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
  }

  let body: {
    company?: string;
    city?: string;
    email?: string;
    consent?: boolean;
    locale?: string;
    website?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  // Pot de miel : le robot croit avoir réussi.
  if (clip(body.website, 200) !== "") {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const company = clip(body.company, 120);
  const city = clip(body.city, 80);
  const email = clip(body.email, 200).toLowerCase();
  const en = body.locale === "en";

  if (company.length < 2 || city.length < 2) {
    return NextResponse.json({ ok: false, error: "fields" }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 422 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: "consent" }, { status: 422 });
  }
  // Une adresse web dans le nom de l'entreprise ou la ville : démarchage.
  if (/https?:\/\//i.test(`${company} ${city}`)) {
    return NextResponse.json({ ok: false, error: "fields" }, { status: 422 });
  }

  const subject = `[Analyse de présence] ${company}, ${city}`;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "TROIE <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[presence] transport absent, e-mail non envoyé :", subject, `(${email})`);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[presence] RESEND_API_KEY ou CONTACT_TO manquant");
    return NextResponse.json({ ok: false, error: "transport" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const e = escapeHtml;
  const wrap = (inner: string) =>
    `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#111318">${inner}</div>`;

  const q = encodeURIComponent(`${company} ${city}`);
  const internal = wrap(
    [
      `<p><strong>Entreprise :</strong> ${e(company)}</p>`,
      `<p><strong>Ville :</strong> ${e(city)}</p>`,
      `<p><strong>E-mail :</strong> <a href="mailto:${e(email)}">${e(email)}</a></p>`,
      `<p><strong>Langue du site :</strong> ${en ? "anglais" : "français"}</p>`,
      `<p><strong>Consentement :</strong> oui (case cochée sur l'accueil)</p>`,
      `<hr/>`,
      `<p>À regarder : fiche Google, position sur la recherche principale, réponses de ChatGPT et Gemini. Promis sous 48 h.</p>`,
      `<p><a href="https://www.google.com/search?q=${q}">Recherche Google</a>, <a href="https://www.google.com/maps/search/${q}">Google Maps</a></p>`,
    ].join(""),
  );

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html: internal,
    });
    if (error) {
      console.error("[presence] erreur Resend (interne)", error);
      return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
    }
  } catch (err) {
    console.error("[presence] exception Resend (interne)", err);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }

  // Confirmation au visiteur : un échec ici ne doit pas faire échouer la demande.
  const confirm = en
    ? {
        subject: `Your presence analysis for ${company}`,
        html: wrap(
          [
            `<p>Hello,</p>`,
            `<p>Thank you for your request for <strong>${e(company)}</strong> (${e(city)}).</p>`,
            `<p>I will look at your Google Business Profile, where you rank on your main search, and what ChatGPT and Gemini say about you. You will get the analysis by email within 48 hours.</p>`,
            `<p>If you have anything to add, just reply to this email.</p>`,
            `<p>Hugues<br/>TROIE Studio</p>`,
          ].join(""),
        ),
      }
    : {
        subject: `Votre analyse de présence pour ${company}`,
        html: wrap(
          [
            `<p>Bonjour,</p>`,
            `<p>Merci pour votre demande pour <strong>${e(company)}</strong> (${e(city)}).</p>`,
            `<p>Je regarde votre fiche Google, votre position sur votre recherche principale et ce que répondent ChatGPT et Gemini. Vous recevez l'analyse par e-mail sous 48 h.</p>`,
            `<p>Si vous voulez ajouter quelque chose, répondez simplement à cet e-mail.</p>`,
            `<p>Hugues<br/>TROIE Studio</p>`,
          ].join(""),
        ),
      };

  try {
    const { error } = await resend.emails.send({
      from,
      to: [email],
      replyTo: to,
      subject: confirm.subject,
      html: confirm.html,
    });
    if (error) console.error("[presence] erreur Resend (visiteur)", error);
  } catch (err) {
    console.error("[presence] exception Resend (visiteur)", err);
  }

  return NextResponse.json({ ok: true });
}
