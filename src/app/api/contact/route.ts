import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact
 *
 * Receives the contact form and sends it to the inbox via Resend.
 *
 * Anti-spam, en couches (les 7 premieres sans aucune configuration) :
 *   0a. Origin : un POST dont l'Origin n'est pas le site (ou absent) est
 *       ignore en silence. Les bots qui POST l'API directement tombent la.
 *   0b. Marqueur x-troie-form : envoye par le vrai formulaire uniquement.
 *   0c. Filtre de contenu : les motifs de spam commerciaux recurrents
 *       (backlinks, guest post, crypto...) sont ignores en silence.
 *   1. Honeypot : champ "website" invisible ; rempli = bot, on repond
 *      ok sans envoyer (le bot croit avoir reussi).
 *   2. Delai minimal : le formulaire envoie "elapsedMs" (temps passe
 *      sur la page) ; moins de 3 s = bot. (Forgeable : les couches 0a-0c
 *      existent precisement parce que celle-ci ne suffit pas.)
 *   3. Filtre a liens : plus de 2 URLs dans le message = spam.
 *   4. Limite par IP : 3 envois par heure (memoire de l'instance,
 *      best-effort en serverless mais suffisant contre les rafales).
 *   5. Cloudflare Turnstile (optionnel) : si TURNSTILE_SECRET_KEY est
 *      definie, le jeton "turnstileToken" est verifie cote serveur.
 *      C'est la couche de fond si le spam persiste malgre tout.
 *
 * Required env vars on Vercel (Project Settings, Environment Variables):
 *   - RESEND_API_KEY : the API key from https://resend.com (free tier 100/day)
 *   - CONTACT_TO     : recipient email
 * Optional:
 *   - CONTACT_FROM                    : sender identity
 *   - TURNSTILE_SECRET_KEY            : active la verification Turnstile
 *   - NEXT_PUBLIC_TURNSTILE_SITE_KEY  : affiche le widget cote client
 *
 * Field shape (JSON body):
 *   { name, email, company?, subject?, message, website?, elapsedMs?, turnstileToken? }
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
  /** Honeypot : doit rester vide (les bots le remplissent). */
  website?: string;
  /** Temps passe sur le formulaire, en millisecondes. */
  elapsedMs?: number;
  /** Jeton Cloudflare Turnstile (si le widget est actif). */
  turnstileToken?: string;
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

/* Limite par IP : fenetre glissante d'une heure, 3 envois max. */
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Purge occasionnelle pour ne pas grossir indefiniment.
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

function countUrls(text: string): number {
  return (text.match(/https?:\/\//gi) ?? []).length;
}

/** Les hôtes légitimes du formulaire (prod + previews Vercel). */
function allowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return (
      host === "troiestudio.fr" ||
      host === "www.troiestudio.fr" ||
      host === "localhost" ||
      host.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

/*
 * Motifs des spams de formulaire B2B qui reviennent en boucle (offres SEO,
 * backlinks, crypto...). Volontairement court et grossier : un vrai
 * prospect n'écrit aucune de ces expressions, et chaque motif ajouté est
 * un faux positif possible. En cas de doute, NE PAS ajouter.
 */
const SPAM_PATTERNS =
  /\b(backlinks?|guest post|link building|seo (service|package|expert)s?|boost your (ranking|traffic)|increase your (ranking|traffic|sales)|web design service|crypto (invest|trading)|bitcoin invest|loan offer|casino|viagra|escort)\b/i;

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // pas configure : couche desactivee
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    // Cloudflare injoignable : on laisse passer (les autres couches
    // restent actives), plutot que de bloquer de vrais prospects.
    return true;
  }
}

export async function POST(request: Request) {
  let payload: Payload = {};
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // 0a + 0b. Un POST qui ne vient pas du formulaire du site (mauvaise
  // origine, ou marqueur absent) est accepté en façade et jeté : le bot
  // croit avoir réussi et ne s'adapte pas.
  if (
    !allowedOrigin(request.headers.get("origin")) ||
    request.headers.get("x-troie-form") !== "1"
  ) {
    return NextResponse.json({ ok: true });
  }

  // 1. Honeypot : on repond "ok" sans rien envoyer.
  if ((payload.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. Delai minimal : un humain ne remplit pas 5 champs en 3 secondes.
  const elapsed = Number(payload.elapsedMs ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < 3000) {
    return NextResponse.json({ ok: true });
  }

  // 4. Limite par IP.
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de messages. Réessayez dans une heure." },
      { status: 429 },
    );
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
  if (message.length < 12) {
    return NextResponse.json(
      { error: "Dites-nous en un peu plus : votre message est très court." },
      { status: 400 },
    );
  }

  // 0c. Motifs de spam commerciaux : acceptés en façade, jamais envoyés.
  if (SPAM_PATTERNS.test(`${name} ${company} ${subject} ${message}`)) {
    return NextResponse.json({ ok: true });
  }

  // 3. Filtre a liens : les spams commerciaux en collent partout.
  if (countUrls(`${message} ${subject} ${company}`) > 2) {
    return NextResponse.json(
      { error: "Message refusé (trop de liens). Retirez les URLs et réessayez." },
      { status: 400 },
    );
  }

  // 5. Turnstile (si configure).
  const turnstileOk = await verifyTurnstile(payload.turnstileToken ?? "", ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Vérification anti-robot échouée. Rechargez la page." },
      { status: 400 },
    );
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
