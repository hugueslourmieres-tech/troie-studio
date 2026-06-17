import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact
 *
 * Receives the contact form and sends it to the inbox via Resend.
 *
 * Required env vars on Vercel (Project Settings → Environment Variables):
 *   - RESEND_API_KEY     : the API key from https://resend.com (free tier 100/day)
 *   - CONTACT_TO         : recipient email, e.g. hugueslourmieres@gmail.com
 *
 * Optional:
 *   - CONTACT_FROM       : sender, defaults to "TROIE <onboarding@resend.dev>"
 *                          Once you verify a domain on Resend, set this to
 *                          something like "contact@troie.studio".
 *
 * Field shape (JSON body):
 *   { name, email, company?, subject?, message }
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let payload: Payload = {};
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email and message are required" },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (message.length > 6000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "TROIE <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "Email transport not configured" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const lines = [
    `<p><strong>Nom :</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    company ? `<p><strong>Entreprise :</strong> ${escapeHtml(company)}</p>` : "",
    subject ? `<p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>` : "",
    `<hr/>`,
    `<p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>`,
  ].filter(Boolean);

  const subjectLine = subject
    ? `[TROIE] ${subject}, ${name}`
    : `[TROIE] Nouveau message de ${name}`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: subjectLine,
      html: `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#1a1714">${lines.join("")}</div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend exception:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
