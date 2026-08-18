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

  /* ── Barème v2, recalibré le 18/08/2026 ──────────────────────────
     Le v1 mesurait l'hygiène technique : tout site correct tapait 80+ et
     le score ne disait rien (constaté sur 8 prospects réels : 82 à 95).
     Le v2 mesure la CITABILITÉ : l'hygiène pèse peu (elle est banale),
     les critères qui gouvernent la reprise par les moteurs IA pèsent
     lourd (identité complète, FAQ balisée, llms.txt, fraîcheur datée),
     et presque aucun site français ne les passe aujourd'hui. Un site
     "propre" ordinaire doit atterrir vers 45-60, pas 85. */

  /* A. Accès des moteurs IA, 15 points : indispensable mais banal */
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
    points: Math.max(0, 15 - blockedCount * 3),
    max: 15,
    items: botItems,
  };

  /* B. Contenu servi sans JavaScript, 15 points, seuils relevés */
  const textLen = text.length;
  const bPoints = textLen >= 3000 ? 15 : textLen >= 1500 ? 10 : textLen >= 600 ? 5 : 0;
  const catB: Category = {
    id: "contenu",
    label: "Contenu lisible sans JavaScript",
    points: bPoints,
    max: 15,
    items: [
      {
        label: "Texte servi dans le HTML initial",
        status: textLen >= 3000 ? "pass" : textLen >= 1500 ? "warn" : "fail",
        detail:
          textLen >= 3000
            ? `${textLen.toLocaleString("fr-FR")} caractères lisibles sans exécuter JavaScript.`
            : textLen >= 1500
              ? `${textLen.toLocaleString("fr-FR")} caractères seulement : les moteurs IA préfèrent citer les pages qui portent une vraie substance dès le HTML.`
              : textLen >= 600
                ? `${textLen.toLocaleString("fr-FR")} caractères : trop peu pour qu'un moteur IA trouve quoi que ce soit à reprendre.`
                : "Le HTML initial est quasiment vide : pour un robot IA, ce site n'a pas de contenu.",
      },
    ],
  };

  /* C. Identité pour les IA, 25 points : ce qui permet de vous DÉCRIRE */
  const jsonLdBlocks: string[] = [];
  {
    const reLd = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let mLd: RegExpExecArray | null;
    while ((mLd = reLd.exec(html))) jsonLdBlocks.push(mLd[1]);
  }
  const ldRaw = jsonLdBlocks.join(" ");
  const types = extractJsonLdTypes(html);
  const hasIdentity = types.some((t) =>
    ["Organization", "LocalBusiness", "Corporation", "Store", "ProfessionalService"].some((k) =>
      t.includes(k),
    ),
  );
  const identityComplete =
    hasIdentity && /"address"/i.test(ldRaw) && /"(sameAs|telephone)"/i.test(ldRaw);
  const identityLogo = hasIdentity && /"logo"/i.test(ldRaw);
  const cPoints =
    (types.length > 0 ? 5 : 0) +
    (hasIdentity ? 6 : 0) +
    (identityComplete ? 8 : 0) +
    (identityLogo ? 6 : 0);
  const catC: Category = {
    id: "identite",
    label: "Identité pour les moteurs IA",
    points: cPoints,
    max: 25,
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
        label: "Entité entreprise (Organization, LocalBusiness)",
        status: hasIdentity ? "pass" : "fail",
        detail: hasIdentity
          ? "L'entreprise est déclarée formellement."
          : "Rien ne déclare formellement l'entreprise : un moteur IA ne peut pas confirmer qui vous êtes.",
      },
      {
        label: "Identité complète (adresse + téléphone ou profils sameAs)",
        status: identityComplete ? "pass" : "fail",
        detail: identityComplete
          ? "Adresse et rattachements présents : l'entité est vérifiable."
          : "Sans adresse ni rattachements (sameAs, téléphone), les moteurs IA ne peuvent pas relier votre site à une entreprise réelle. C'est le critère qui gouverne la confiance, et presque personne ne le remplit.",
      },
      {
        label: "Logo déclaré dans l'entité",
        status: identityLogo ? "pass" : "fail",
        detail: identityLogo
          ? "Présent."
          : "Absent : votre marque apparaît sans visage dans les résultats enrichis.",
      },
    ],
  };

  /* D. Contenu citable, 25 points : ce que les moteurs IA REPRENNENT */
  const hasFaq = types.some((t) => t.includes("FAQPage"));
  const richTypes = types.filter((t) =>
    ["Product", "Service", "Article", "BlogPosting", "Course", "Event", "HowTo", "Review"].some(
      (k) => t.includes(k),
    ),
  );
  const h2Count = (html.match(/<h2[\s>]/gi) ?? []).length;
  const llmsOk = llms.ok && !llms.contentType.includes("html") && llms.text.trim().length > 0;
  const dPoints =
    (hasFaq ? 8 : 0) + (richTypes.length > 0 ? 5 : 0) + (h2Count >= 4 ? 4 : 0) + (llmsOk ? 8 : 0);
  const catD: Category = {
    id: "citable",
    label: "Contenu citable",
    points: dPoints,
    max: 25,
    items: [
      {
        label: "FAQ balisée (FAQPage)",
        status: hasFaq ? "pass" : "fail",
        detail: hasFaq
          ? "Présente : c'est le format le plus repris par les moteurs IA."
          : "Absente : les questions-réponses balisées sont le format que les moteurs IA reprennent le plus, et presque aucun site ne l'a.",
      },
      {
        label: "Contenus riches balisés (produits, articles, services)",
        status: richTypes.length > 0 ? "pass" : "fail",
        detail:
          richTypes.length > 0
            ? `Présents : ${[...new Set(richTypes)].join(", ")}.`
            : "Aucun : vos offres n'existent pas en tant qu'objets pour les moteurs IA.",
      },
      {
        label: "Structure de titres (H2)",
        status: h2Count >= 4 ? "pass" : "fail",
        detail:
          h2Count >= 4
            ? `${h2Count} sections H2 : le contenu est découpable et citable.`
            : `${h2Count} H2 seulement : un contenu sans sections est difficile à découper, donc à citer.`,
      },
      {
        label: "Fichier llms.txt",
        status: llmsOk ? "pass" : "fail",
        detail: llmsOk
          ? "Présent : le site guide explicitement les moteurs IA."
          : "Absent : le standard qui indique aux moteurs IA quoi lire en priorité. Le fournir vous place devant la quasi-totalité des sites français.",
      },
    ],
  };

  /* E. Fondamentaux et fraîcheur, 20 points, fraîcheur STRICTE */
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description = metaContent(html, "description");
  const ogTitle = metaContent(html, "og:title");
  const ogDesc = metaContent(html, "og:description");
  const langAttr = html.match(/<html[^>]*\slang\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
  const canonical = /<link[^>]+rel\s*=\s*["']canonical["']/i.test(html);
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const basicsPts =
    (title.length > 3 && description.length > 20 ? 2 : 0) +
    (Boolean(ogTitle && ogDesc) ? 2 : 0) +
    (canonical && Boolean(langAttr) ? 2 : 0) +
    (h1Count === 1 ? 2 : 0);
  const sitemapOk =
    sitemaps.length > 0 ||
    (sitemapProbe.ok && sitemapProbe.text.trimStart().startsWith("<"));
  const contactOk = /href\s*=\s*["'][^"']*contact/i.test(html) || /tel:|mailto:/i.test(html);
  const freshOk = /"date(Modified|Published)"/i.test(ldRaw) || /<time[\s>]/i.test(html);
  const eChecks: [boolean, number, string, string, string][] = [
    [basicsPts === 8, 0, "Fondamentaux (titre, description, OG, canonique, H1)", "Complets.", `Incomplets (${basicsPts / 2}/4) : titre, méta description, Open Graph, canonique + langue, H1 unique.`],
    [sitemapOk, 4, "Plan du site (sitemap.xml)", "Présent.", "Introuvable : les robots découvrent les pages au hasard."],
    [contactOk, 4, "Coordonnées lisibles (contact, téléphone)", "Présentes.", "Introuvables : un moteur IA ne peut pas vous rattacher à un lieu ou un contact."],
    [freshOk, 4, "Fraîcheur datée (dateModified, time)", "Présente : le contenu est daté machine.", "Aucune date lisible par les machines : les moteurs IA privilégient les sources datées, et un simple millésime dans le texte ne suffit pas."],
  ];
  const catE: Category = {
    id: "fondamentaux",
    label: "Fondamentaux et fraîcheur",
    points:
      basicsPts +
      (sitemapOk ? 4 : 0) +
      (contactOk ? 4 : 0) +
      (freshOk ? 4 : 0),
    max: 20,
    items: eChecks.map(([ok, , label, passDetail, failDetail]) => ({
      label,
      status: ok ? "pass" : label.includes("Fondamentaux") && basicsPts >= 4 ? "warn" : "fail",
      detail: ok ? passDetail : failDetail,
    })),
  };

  const categories = [catA, catB, catC, catD, catE];
  const score = categories.reduce((s, c) => s + c.points, 0);

  /* Deux notes derivees des memes verifications, ponderees par pertinence :
     l'identite et le contenu citable pesent surtout en GEO, les
     fondamentaux surtout en SEO, l'acces et le contenu servi comptent
     pour les deux. */
  const W: Record<string, { seo: number; geo: number }> = {
    acces: { seo: 1, geo: 1 },
    contenu: { seo: 1, geo: 1 },
    identite: { seo: 0.3, geo: 1 },
    citable: { seo: 0.3, geo: 1 },
    fondamentaux: { seo: 1, geo: 0.4 },
  };
  const weighted = (k: "seo" | "geo") => {
    let pts = 0;
    let max = 0;
    for (const c of categories) {
      const w = W[c.id]?.[k] ?? 1;
      pts += c.points * w;
      max += c.max * w;
    }
    return Math.round((pts / max) * 100);
  };
  const seoScore = weighted("seo");
  const geoScore = weighted("geo");

  return NextResponse.json({
    ok: true,
    url: home.finalUrl,
    https: home.finalUrl.startsWith("https:"),
    score,
    seoScore,
    geoScore,
    categories,
    fetchedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
  });
}
