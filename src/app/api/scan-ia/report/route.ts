import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL, notificationEmail, reportEmail } from "@/lib/audit/email";
import { runAudit, storedAudit } from "@/lib/audit/engine";
import {
  clientIp,
  createRateLimiter,
  normalizeTarget,
  originAllowed,
} from "@/lib/audit/guards";
import type { AuditFull } from "@/lib/audit/types";

/**
 * POST /api/scan-ia/report
 *
 * Débloque le rapport détaillé de l'audit SEO et GEO contre l'e-mail du
 * visiteur (26/10/2026). Reçoit { scanId, url, email, firstName?, consent,
 * locale }. Reprend le scan en mémoire s'il existe encore sur l'instance,
 * sinon relance l'audit sur l'URL (instances serverless sans mémoire
 * partagée). Envoie le rapport complet au visiteur et une notification à
 * CONTACT_TO, puis renvoie le rapport à la page.
 *
 * Mêmes garde-fous que /api/scan-ia (Origin, SSRF), plus un quota propre :
 * 5 demandes de rapport par heure et par IP. Expéditeur : exactement celui
 * de /api/contact. Sans RESEND_API_KEY (en local), le rapport est débloqué
 * quand même et l'envoi est seulement journalisé.
 */

export const runtime = "nodejs";
export const maxDuration = 30;

const rateLimited = createRateLimiter(5, 60 * 60 * 1000);

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 200;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, error: "origin" }, { status: 400 });
  }
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let body: {
    scanId?: string;
    url?: string;
    email?: string;
    firstName?: string;
    consent?: boolean;
    locale?: string;
    website?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "body" }, { status: 400 });
  }

  const en = body.locale === "en";
  const locale = en ? "en" : "fr";
  const email = String(body.email ?? "").trim().toLowerCase();
  const firstName = String(body.firstName ?? "").trim().slice(0, 60);
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 422 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: "consent" }, { status: 422 });
  }
  // Pot de miel : un robot remplit le champ caché, on ne lui envoie rien.
  if (body.website) {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 400 });
  }

  let report: AuditFull | null = body.scanId ? storedAudit(String(body.scanId), en) : null;
  if (!report) {
    const target = normalizeTarget(String(body.url ?? ""));
    if (!target) return NextResponse.json({ ok: false, error: "url" }, { status: 422 });
    const out = await runAudit(target, { en });
    if ("error" in out) {
      return NextResponse.json({ ok: false, error: out.error }, { status: 200 });
    }
    report = out;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "TROIE <onboarding@resend.dev>";
  let emailSent = false;

  if (!apiKey) {
    console.info(
      `[audit-seo] RESEND_API_KEY absente : rapport débloqué sans envoi (${report.host}, ${report.score}/100, ${email}).`,
    );
  } else {
    const resend = new Resend(apiKey);
    const mail = reportEmail(report, { en, firstName, locale });
    try {
      const { error } = await resend.emails.send({
        from,
        to: [email],
        replyTo: CONTACT_EMAIL,
        subject: mail.subject,
        html: mail.html,
      });
      if (error) console.error("Audit SEO : erreur Resend (visiteur)", error);
      else emailSent = true;
    } catch (err) {
      console.error("Audit SEO : exception Resend (visiteur)", err);
    }
    if (to) {
      const note = notificationEmail(report, { email, firstName, locale });
      try {
        const { error } = await resend.emails.send({
          from,
          to: [to],
          replyTo: email,
          subject: note.subject,
          html: note.html,
        });
        if (error) console.error("Audit SEO : erreur Resend (notification)", error);
      } catch (err) {
        console.error("Audit SEO : exception Resend (notification)", err);
      }
    }
  }

  return NextResponse.json({ ok: true, emailSent, report });
}
