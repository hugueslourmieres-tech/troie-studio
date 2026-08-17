import { NextResponse } from "next/server";

/**
 * POST /api/scan-ia
 *
 * Le scan de citabilité IA : produit d'appel de l'offre visibilité IA.
 * Reçoit { url }, va chercher la page d'accueil, robots.txt, llms.txt et
 * sitemap.xml du site, et rend un score sur 100 avec le détail des
 * vérifications.
 *
 * ⚠️ PÉRIMÈTRE VOLONTAIREMENT HONNÊTE (17/08/2026). Le scan mesure la
 * LISIBILITÉ du site par les moteurs IA (accès des robots, contenu servi
 * sans JavaScript, données structurées, signaux de citabilité). Il ne
 * mesure PAS si le site est effectivement cité par ChatGPT ou Perplexity :
 * personne ne peut le garantir, et la page de résultat le dit. Ne pas
 * transformer ce score en promesse de citation.
 *
 * Toutes les vérifications sont déterministes et gratuites (aucun appel
 * à une API payante), donc le scan peut rester illimité et sans compte.
 *
 * Anti-abus, calqué sur /api/contact :
 *   - Origin : un POST dont l'Origin n'est pas le site est rejeté.
 *   - Limite par IP : 10 scans par heure (mémoire d'instance, best-effort).
 *   - Garde SSRF : cibles http(s) publiques uniquement, jamais d'adresse
 *     privée, de localhost ou de port exotique.
 *   - Taille et durée bornées : 1,5 Mo par ressource, 8 s par fetch.
 */

export const runtime = "nodejs";

/* ── Anti-abus ─────────────────────────────────────────────────── */

const hits = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function originAllowed(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return (
      host === "troiestudio.fr" ||
      host === "www.troiestudio.fr" ||
      host === "localhost"
    );
  } catch {
    return false;
  }
}

/* ── Garde SSRF ────────────────────────────────────────────────── */

/** Toute IP littérale est refusée : on scanne des noms de domaine publics. */
function isIpv4Literal(host: string) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
}

function normalizeTarget(raw: string): URL | null {
  const trimmed = raw.trim().replace(/\s+/g, "");
  if (!trimmed || trimmed.length > 300) return null;
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withProto);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (url.username || url.password) return null;
  if (url.port && url.port !== "80" && url.port !== "443") return null;
  const host = url.hostname.toLowerCase();
  if (!host.includes(".")) return null;
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost") ||
    host.includes("[") || // IPv6 littéral
    isIpv4Literal(host)
  ) {
    return null;
  }
  // On scanne toujours la racine du site, pas une page profonde.
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

/* ── Fetch borné ───────────────────────────────────────────────── */

const UA =
  "Mozilla/5.0 (compatible; TROIE-ScanIA/1.0; +https://troiestudio.fr/scan-ia)";
const MAX_BYTES = 1_500_000;
const FETCH_TIMEOUT_MS = 8_000;

async function fetchCapped(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,text/plain,*/*" },
      redirect: "follow",
      signal: controller.signal,
    });
    const reader = res.body?.getReader();
    let received = 0;
    const chunks: Uint8Array[] = [];
    if (reader) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        chunks.push(value);
        if (received >= MAX_BYTES) {
          controller.abort();
          break;
        }
      }
    }
    const buf = new Uint8Array(received > 0 ? Math.min(received, MAX_BYTES) : 0);
    let offset = 0;
    for (const c of chunks) {
      const slice = c.subarray(0, Math.max(0, buf.length - offset));
      buf.set(slice, offset);
      offset += slice.length;
      if (offset >= buf.length) break;
    }
    return {
      ok: res.ok,
      status: res.status,
      finalUrl: res.url,
      contentType: res.headers.get("content-type") ?? "",
      text: new TextDecoder("utf-8", { fatal: false }).decode(buf),
    };
  } catch {
    return { ok: false, status: 0, finalUrl: url, contentType: "", text: "" };
  } finally {
    clearTimeout(timer);
  }
}

/* ── Analyse ───────────────────────────────────────────────────── */

type Status = "pass" | "warn" | "fail";
type Item = { label: string; status: Status; detail: string };
type Category = { id: string; label: string; points: number; max: number; items: Item[] };

/**
 * Les robots des moteurs IA dont le blocage coûte des points. Bingbot est
 * volontairement absent (le bloquer casserait aussi Bing classique), et
 * Google-Extended ne concerne que Gemini, pas les AI Overviews, ce que le
 * libellé doit dire pour rester exact.
 */
const AI_BOTS: { token: string; label: string }[] = [
  { token: "gptbot", label: "GPTBot (entraînement OpenAI)" },
  { token: "oai-searchbot", label: "OAI-SearchBot (recherche ChatGPT)" },
  { token: "claudebot", label: "ClaudeBot (Anthropic)" },
  { token: "perplexitybot", label: "PerplexityBot" },
  { token: "google-extended", label: "Google-Extended (Gemini)" },
];

/** Parse minimal de robots.txt : groupes user-agent → règles Disallow/Allow. */
function parseRobots(txt: string) {
  const groups = new Map<string, { disallow: string[]; allow: string[] }>();
  let currentAgents: string[] = [];
  let lastWasAgent = false;
  const sitemaps: string[] = [];
  for (const rawLine of txt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const m = line.match(/^([a-zA-Z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!lastWasAgent) currentAgents = [];
      currentAgents.push(value.toLowerCase());
      lastWasAgent = true;
      for (const a of currentAgents) {
        if (!groups.has(a)) groups.set(a, { disallow: [], allow: [] });
      }
    } else {
      lastWasAgent = false;
      if (key === "sitemap" && value) sitemaps.push(value);
      if (key === "disallow" || key === "allow") {
        for (const a of currentAgents) {
          const g = groups.get(a);
          if (g) g[key === "disallow" ? "disallow" : "allow"].push(value);
        }
      }
    }
  }
  return { groups, sitemaps };
}

/** Le bot est-il intégralement bloqué (Disallow: / sans Allow racine) ? */
function botBlocked(groups: Map<string, { disallow: string[]; allow: string[] }>, token: string) {
  let rules = groups.get(token);
  if (!rules) {
    for (const [agent, g] of groups) {
      if (agent !== "*" && (agent.includes(token) || token.includes(agent))) {
        rules = g;
        break;
      }
    }
  }
  if (!rules) rules = groups.get("*");
  if (!rules) return false;
  const blockedAll = rules.disallow.some((d) => d === "/");
  const allowedRoot = rules.allow.some((a) => a === "/" || a === "");
  return blockedAll && !allowedRoot;
}

function extractJsonLdTypes(html: string): string[] {
  const types: string[] = [];
  const re = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]);
      const nodes = Array.isArray(parsed) ? parsed : parsed["@graph"] ?? [parsed];
      for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
        const t = node?.["@type"];
        if (typeof t === "string") types.push(t);
        else if (Array.isArray(t)) types.push(...t.filter((x) => typeof x === "string"));
      }
    } catch {
      /* JSON-LD invalide : ignoré, l'absence de type parlera d'elle-même */
    }
  }
  return types;
}

function visibleText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html: string, name: string) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)\\s*=\\s*["']${name}["'][^>]*>`,
    "i",
  );
  const tag = html.match(re)?.[0];
  if (!tag) return "";
  return tag.match(/content\s*=\s*["']([^"']*)["']/i)?.[1]?.trim() ?? "";
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, error: "origin" }, { status: 400 });
  }
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "body" }, { status: 400 });
  }
  const target = normalizeTarget(body.url ?? "");
  if (!target) {
    return NextResponse.json({ ok: false, error: "url" }, { status: 422 });
  }

  const started = Date.now();
  const origin = target.origin;
  const [home, robots, llms, sitemapProbe] = await Promise.all([
    fetchCapped(origin + "/"),
    fetchCapped(origin + "/robots.txt"),
    fetchCapped(origin + "/llms.txt"),
    fetchCapped(origin + "/sitemap.xml"),
  ]);

  if (!home.ok || !home.text) {
    return NextResponse.json(
      { ok: false, error: "unreachable", status: home.status },
      { status: 200 },
    );
  }

  const html = home.text;
  const text = visibleText(html);
  const lower = html.toLowerCase();

  /* A. Accès des robots IA, 25 points */
  const robotsOk = robots.ok && !robots.contentType.includes("html");
  const { groups, sitemaps } = robotsOk
    ? parseRobots(robots.text)
    : { groups: new Map(), sitemaps: [] as string[] };
  const botItems: Item[] = AI_BOTS.map((bot) => {
    const blocked = robotsOk && botBlocked(groups, bot.token);
    return {
      label: bot.label,
      status: blocked ? "fail" : "pass",
      detail: blocked
        ? "Bloqué par robots.txt : ce moteur ne peut pas lire le site."
        : "Autorisé à lire le site.",
    } as Item;
  });
  const blockedCount = botItems.filter((i) => i.status === "fail").length;
  const catA: Category = {
    id: "acces",
    label: "Accès des moteurs IA",
    points: 25 - blockedCount * 5,
    max: 25,
    items: botItems,
  };

  /* B. Contenu lisible sans JavaScript, 20 points */
  const textLen = text.length;
  const bPoints = textLen >= 1500 ? 20 : textLen >= 600 ? 12 : 0;
  const catB: Category = {
    id: "contenu",
    label: "Contenu lisible sans JavaScript",
    points: bPoints,
    max: 20,
    items: [
      {
        label: "Texte servi dans le HTML initial",
        status: textLen >= 1500 ? "pass" : textLen >= 600 ? "warn" : "fail",
        detail:
          textLen >= 1500
            ? `${textLen.toLocaleString("fr-FR")} caractères lisibles sans exécuter JavaScript.`
            : textLen >= 600
              ? `Seulement ${textLen.toLocaleString("fr-FR")} caractères lisibles : une partie du contenu n'existe qu'après JavaScript, que la plupart des robots IA n'exécutent pas.`
              : "Le HTML initial est quasiment vide : pour un robot IA, ce site n'a pas de contenu.",
      },
    ],
  };

  /* C. Données structurées, 20 points */
  const types = extractJsonLdTypes(html);
  const hasIdentity = types.some((t) =>
    ["Organization", "LocalBusiness", "Corporation", "Store", "ProfessionalService"].some((k) =>
      t.includes(k),
    ),
  );
  const richTypes = types.filter((t) =>
    ["FAQPage", "Product", "Service", "Article", "BlogPosting", "Course", "Event", "BreadcrumbList"].some(
      (k) => t.includes(k),
    ),
  );
  const cPoints = (types.length > 0 ? 8 : 0) + (hasIdentity ? 6 : 0) + (richTypes.length > 0 ? 6 : 0);
  const catC: Category = {
    id: "schema",
    label: "Données structurées (Schema.org)",
    points: cPoints,
    max: 20,
    items: [
      {
        label: "Balisage JSON-LD",
        status: types.length > 0 ? "pass" : "fail",
        detail:
          types.length > 0
            ? `Types détectés : ${[...new Set(types)].slice(0, 6).join(", ")}.`
            : "Aucun JSON-LD : les moteurs IA doivent deviner qui vous êtes.",
      },
      {
        label: "Identité de l'entreprise (Organization, LocalBusiness)",
        status: hasIdentity ? "pass" : "fail",
        detail: hasIdentity
          ? "L'entreprise est décrite formellement."
          : "Rien ne décrit formellement l'entreprise, son adresse, son activité.",
      },
      {
        label: "Contenus riches (FAQ, produits, articles)",
        status: richTypes.length > 0 ? "pass" : "warn",
        detail:
          richTypes.length > 0
            ? `Présents : ${[...new Set(richTypes)].join(", ")}.`
            : "Aucun contenu riche balisé : les FAQ balisées sont le format le plus repris par les moteurs IA.",
      },
    ],
  };

  /* D. Fondamentaux, 15 points */
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description = metaContent(html, "description");
  const ogTitle = metaContent(html, "og:title");
  const ogDesc = metaContent(html, "og:description");
  const langAttr = html.match(/<html[^>]*\slang\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
  const canonical = /<link[^>]+rel\s*=\s*["']canonical["']/i.test(html);
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const dChecks: [boolean, number, string, string][] = [
    [title.length > 3, 3, "Balise titre", title ? `« ${title.slice(0, 80)} »` : "Absente."],
    [description.length > 20, 3, "Méta description", description ? "Présente." : "Absente ou vide."],
    [Boolean(langAttr), 2, "Langue déclarée", langAttr ? `lang="${langAttr}"` : "Absente."],
    [canonical, 2, "URL canonique", canonical ? "Présente." : "Absente."],
    [Boolean(ogTitle && ogDesc), 3, "Balises Open Graph", ogTitle && ogDesc ? "Présentes." : "Incomplètes ou absentes."],
    [h1Count === 1, 2, "Un titre H1 unique", h1Count === 1 ? "Présent." : h1Count === 0 ? "Aucun H1." : `${h1Count} H1 concurrents.`],
  ];
  const catD: Category = {
    id: "fondamentaux",
    label: "Fondamentaux techniques",
    points: dChecks.reduce((s, [ok, pts]) => s + (ok ? pts : 0), 0),
    max: 15,
    items: dChecks.map(([ok, , label, detail]) => ({
      label,
      status: ok ? "pass" : "fail",
      detail,
    })),
  };

  /* E. Signaux de citabilité, 20 points */
  const sitemapOk =
    sitemaps.length > 0 ||
    (sitemapProbe.ok && sitemapProbe.text.trimStart().startsWith("<"));
  const llmsOk = llms.ok && !llms.contentType.includes("html") && llms.text.trim().length > 0;
  const contactOk = /href\s*=\s*["'][^"']*contact/i.test(html) || /tel:|mailto:/i.test(html);
  const freshOk =
    /datemodified|datepublished/i.test(lower) ||
    /<time[\s>]/i.test(html) ||
    /\b20(2[5-9])\b/.test(text);
  const eChecks: [boolean, string, string, string][] = [
    [sitemapOk, "Plan du site (sitemap.xml)", "Présent.", "Introuvable : les robots découvrent les pages au hasard."],
    [llmsOk, "Fichier llms.txt", "Présent : le site guide explicitement les moteurs IA.", "Absent. Standard émergent : le fournir vous distingue, son absence n'est pas encore pénalisante."],
    [contactOk, "Coordonnées visibles (contact, téléphone)", "Présentes.", "Introuvables sur la page d'accueil : un moteur IA ne peut pas vous rattacher à un lieu ou un contact."],
    [freshOk, "Signaux de fraîcheur (dates)", "Présents.", "Aucune date détectée : impossible de juger si le contenu est à jour."],
  ];
  const catE: Category = {
    id: "citabilite",
    label: "Signaux de citabilité",
    points: eChecks.reduce((s, [ok]) => s + (ok ? 5 : 0), 0),
    max: 20,
    items: eChecks.map(([ok, label, passDetail, failDetail]) => ({
      label,
      status: ok ? "pass" : label.includes("llms") ? "warn" : "fail",
      detail: ok ? passDetail : failDetail,
    })),
  };

  const categories = [catA, catB, catC, catD, catE];
  const score = categories.reduce((s, c) => s + c.points, 0);

  return NextResponse.json({
    ok: true,
    url: home.finalUrl,
    https: home.finalUrl.startsWith("https:"),
    score,
    categories,
    fetchedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
  });
}
