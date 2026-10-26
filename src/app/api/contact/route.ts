import { NextResponse } from "next/server";
import { Resend } from "resend";
import { NEEDS, isNeed } from "@/lib/needs";

/**
 * POST /api/contact
 *
 * Receives the contact form and sends it to the inbox via Resend.
 *
 * Anti-spam, en couches (les 7 premieres sans aucune configuration) :
 *   0a. Origin : un POST dont l'Origin n'est pas le site (ou absent) est
 *       ignore en silence. Les bots qui POST l'API directement tombent la.
 *   0b. Marqueur x-troie-form : envoye par le vrai formulaire uniquement.
 *   0c. Filtre de contenu, en deux niveaux (26/10/2026) :
 *       - motifs sans ambiguite (casino, viagra, crypto...) : ignores en
 *         silence,
 *       - motifs de demarchage (backlinks, offres SEO, « I came across your
 *         website »...) : le message part quand meme, avec « [à vérifier] »
 *         en tete de l'objet. Un vrai prospect n'est jamais perdu.
 *   1. Honeypot : champ "website" invisible ; rempli = bot, on repond
 *      ok sans envoyer (le bot croit avoir reussi).
 *   2. Delai minimal : le formulaire envoie "elapsedMs" (temps passe
 *      sur la page) ; moins de 3 s = bot. (Forgeable : les couches 0a-0c
 *      existent precisement parce que celle-ci ne suffit pas.)
 *   3. Filtre a liens : plus de 2 URLs dans le message = refus visible
 *      (le visiteur peut retirer les liens et renvoyer).
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
 *
 * Formulaire de projet (bouton « Lancer un projet », /contact#projet,
 * depuis le 1er/10/2026, sans champ budget) :
 *   { kind: "projet", need, outcome, situation?, deadline?, name, email,
 *     companySite, phone?, locale?, website?, elapsedMs?, turnstileToken? }
 * need (liste de src/lib/needs.ts) et companySite (site web ou nom de
 * l'entreprise) sont obligatoires depuis le 26/10/2026.
 * Le « message » contrôlé par les filtres est alors ce que la personne veut
 * obtenir, suivi de l'endroit où elle en est. Les erreurs lui sont
 * renvoyées dans la langue de la page (locale). Le formulaire de contact
 * classique (kind absent) reste accepté.
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
  /** Formulaire de projet. */
  kind?: string;
  need?: string;
  needLabel?: string;
  outcome?: string;
  situation?: string;
  deadline?: string;
  phone?: string;
  locale?: string;
  /** Site web ou nom de l'entreprise (obligatoire pour le formulaire de projet). */
  companySite?: string;
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
const SPAM_HARD =
  /\b(crypto (invest|trading)|bitcoin invest|loan offer|casino|viagra|cialis|escort)\b/i;

/*
 * Démarchage commercial probable : le message est envoyé quand même, avec
 * « [à vérifier] » en tête de l'objet. Un faux positif coûte un coup d'œil,
 * jamais un prospect.
 */
const SPAM_SOFT =
  /\b(backlinks?|guest post|link building|seo (service|package|expert|agency)s?|boost your (ranking|traffic)|increase your (ranking|traffic|sales)|first page (of|on) google|web design services?|white[- ]label|outsourc(e|ing)|offshore|i came across your (website|site|company)|i (was|have been) (checking|looking at|browsing) your (website|site)|dear (sir|madam|business owner|website owner)|we are a (leading|team of)|unsubscribe|lead generation services?)\b/i;

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

  // Messages d'erreur lus par le visiteur. Le formulaire de projet les
  // reçoit dans la langue de la page (locale), le formulaire classique
  // garde les siens.
  const isProject = payload.kind === "projet";
  const en = isProject && payload.locale === "en";
  const say = (fr: string, english: string) => (en ? english : fr);

  // 4. Limite par IP.
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        error: say(
          "Trop de messages. Réessayez dans une heure.",
          "Too many messages. Please try again in an hour.",
        ),
      },
      { status: 429 },
    );
  }

  const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

  const name = clip(payload.name, 200);
  const email = clip(payload.email, 200);
  const company = clip(payload.company, 200);
  const phone = clip(payload.phone, 40);
  const outcome = clip(payload.outcome, 3000);
  const situation = clip(payload.situation, 3000);
  const needSlug = clip(payload.need, 40);
  const needEntry = NEEDS.find((n) => n.slug === needSlug);
  const needLabel = needEntry ? needEntry.fr : "";
  const companySite = clip(payload.companySite, 200);
  const deadline = clip(payload.deadline, 60);
  const subject = isProject ? needLabel : (payload.subject?.trim() ?? "");
  const message = isProject
    ? [outcome, situation].filter(Boolean).join("\n\n")
    : (payload.message?.trim() ?? "");

  if (
    !name ||
    !email ||
    !message ||
    (isProject && (!outcome || !companySite || !isNeed(needSlug)))
  ) {
    return NextResponse.json(
      {
        error: isProject
          ? say(
              "Remplissez les champs marqués d'un astérisque : besoin, ce que vous voulez obtenir, nom, email et site de l'entreprise.",
              "Please fill in the fields marked with an asterisk: need, what you want to achieve, name, email and company website.",
            )
          : "name, email and message are required",
      },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      {
        error: isProject
          ? say("Vérifiez votre adresse email.", "Please check your email address.")
          : "Invalid email",
      },
      { status: 400 },
    );
  }
  if (message.length > 6000) {
    return NextResponse.json(
      {
        error: isProject
          ? say("Votre message est trop long.", "Your message is too long.")
          : "Message too long",
      },
      { status: 400 },
    );
  }
  if (message.length < 12) {
    return NextResponse.json(
      {
        error: isProject
          ? say(
              "Dites-nous-en un peu plus sur ce que vous voulez obtenir.",
              "Tell us a little more about what you want to achieve.",
            )
          : "Dites-nous-en un peu plus : votre message est très court.",
      },
      { status: 400 },
    );
  }

  // 0c. Motifs sans ambiguïté : acceptés en façade, jamais envoyés.
  const scanned = `${name} ${company} ${companySite} ${subject} ${message}`;
  if (SPAM_HARD.test(scanned)) {
    return NextResponse.json({ ok: true });
  }
  // Motifs de démarchage : envoyés, mais signalés dans l'objet.
  const softMatch = scanned.match(SPAM_SOFT);
  const flagged = !!softMatch;

  // 3. Filtre a liens : les spams commerciaux en collent partout.
  if (countUrls(`${message} ${subject} ${company}`) > 2) {
    return NextResponse.json(
      {
        error: say(
          "Message refusé (trop de liens). Retirez les adresses web et réessayez.",
          "Message refused (too many links). Remove the web addresses and try again.",
        ),
      },
      { status: 400 },
    );
  }

  // 5. Turnstile (si configure).
  const turnstileOk = await verifyTurnstile(payload.turnstileToken ?? "", ip);
  if (!turnstileOk) {
    return NextResponse.json(
      {
        error: say(
          "Vérification anti-robot échouée. Réessayez, ou rechargez la page.",
          "Anti-robot check failed. Try again, or reload the page.",
        ),
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "TROIE <onboarding@resend.dev>";

  const resend = apiKey && to ? new Resend(apiKey) : null;

  const row = (label: string, value: string, long = false) =>
    value
      ? `<p><strong>${label} :</strong>${long ? "<br/>" : " "}<span style="white-space:pre-wrap;line-height:1.6">${escapeHtml(value)}</span></p>`
      : "";

  const projectLines = [
    row("Besoin", needLabel || "À définir"),
    row("Ce que la personne veut obtenir", outcome, true),
    row("Où elle en est", situation || "Non précisé", true),
    row("Échéance", deadline || "À définir"),
    `<hr/>`,
    row("Nom", name),
    `<p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    row("Site ou entreprise", companySite),
    row("Téléphone", phone),
    row("Langue du site", payload.locale === "en" ? "anglais" : "français"),
    flagged ? row("À vérifier", `démarchage probable (motif : « ${softMatch?.[0] ?? ""} »)`) : "",
  ].filter(Boolean);

  const contactLines = [
    `<p><strong>Nom :</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    company ? `<p><strong>Entreprise :</strong> ${escapeHtml(company)}</p>` : "",
    subject ? `<p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>` : "",
    `<hr/>`,
    `<p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>`,
  ].filter(Boolean);

  const lines = isProject ? projectLines : contactLines;

  const baseSubject = isProject
    ? `[TROIE] Projet : ${needLabel}, ${name}`
    : subject
      ? `[TROIE] ${subject}, ${name}`
      : `[TROIE] Nouveau message de ${name}`;
  const subjectLine = flagged ? `[à vérifier] ${baseSubject}` : baseSubject;

  // Transport absent : en local, l'email est écrit dans la console et la
  // demande est acceptée (pour tester le formulaire). En production, refus
  // lisible (503) qui renvoie vers l'adresse affichée sur la page.
  if (!resend || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] transport absent, email non envoyé :", subjectLine);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY ou CONTACT_TO manquant");
    return NextResponse.json(
      {
        error: say(
          "L'envoi est momentanément indisponible. Écrivez-nous à l'adresse affichée sur cette page.",
          "Sending is temporarily unavailable. Please write to the address shown on this page.",
        ),
      },
      { status: 503 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: subjectLine,
      html: `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#111318">${lines.join("")}</div>`,
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
