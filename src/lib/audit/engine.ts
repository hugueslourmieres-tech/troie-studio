import { fetchCapped, type Fetched } from "./guards";
import {
  bandOf,
  type AuditFull,
  type AuditSummary,
  type CategoryId,
  type CategoryScore,
  type Check,
  type CheckStatus,
  type Fix,
  type PhaseId,
} from "./types";

/**
 * Moteur de l'audit SEO et GEO gratuit (/audit-seo-gratuit, 26/10/2026).
 *
 * Successeur du scan IA du 17/08/2026 : mêmes ressources lues (page
 * d'accueil, robots.txt, llms.txt, sitemap.xml), mêmes garde-fous, mais
 * quatre familles notées (Technique, Contenu, Lisibilité IA, Performance)
 * et, pour chaque vérification, ce qui a été trouvé, pourquoi ça compte et
 * la correction recommandée.
 *
 * ⚠️ PÉRIMÈTRE HONNÊTE, non négociable. L'audit mesure la LISIBILITÉ du
 * site par les moteurs de recherche et les moteurs IA. Il ne dit PAS si le
 * site est cité par ChatGPT ou Perplexity : personne ne peut le mesurer ni
 * le garantir, et la page le dit. Tout est déterministe, gratuit (aucune
 * API payante) et rien n'est inventé : chaque phrase du rapport découle
 * d'un fait lu dans le HTML ou les fichiers du site.
 */

/* ── Lecture du HTML ───────────────────────────────────────────── */

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  laquo: "«",
  raquo: "»",
  hellip: "…",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ccedil: "ç",
  ecirc: "ê",
  ocirc: "ô",
};

function decode(s: string) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(s: string) {
  return decode(s.replace(/<[^>]+>/g, " "));
}

function visibleText(html: string) {
  return stripTags(
    html
      .replace(/<head[\s\S]*?<\/head>/i, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<template[\s\S]*?<\/template>/gi, " "),
  );
}

function attr(tag: string, name: string) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  if (!m) return null;
  return decode(m[1] ?? m[2] ?? m[3] ?? "");
}

function metaContent(head: string, key: string) {
  const re = /<meta\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(head))) {
    const tag = m[0];
    const n = (attr(tag, "name") ?? attr(tag, "property") ?? "").toLowerCase();
    if (n === key) return attr(tag, "content") ?? "";
  }
  return null;
}

function tags(html: string, name: string) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function headings(html: string, level: number) {
  const re = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) out.push(stripTags(m[1]));
  return out;
}

type Ld = Record<string, unknown>;

function jsonLdNodes(html: string): Ld[] {
  const out: Ld[] = [];
  const re = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    const o = node as Ld;
    out.push(o);
    if (Array.isArray(o["@graph"])) (o["@graph"] as unknown[]).forEach(walk);
  };
  while ((m = re.exec(html))) {
    try {
      walk(JSON.parse(m[1].trim()));
    } catch {
      /* JSON-LD invalide : ignoré, son absence parlera d'elle-même */
    }
  }
  return out;
}

function typesOf(n: Ld): string[] {
  const t = n["@type"];
  if (typeof t === "string") return [t];
  if (Array.isArray(t)) return t.filter((x): x is string => typeof x === "string");
  return [];
}

/** Parse minimal de robots.txt : groupes user-agent, règles, sitemaps. */
function parseRobots(txt: string) {
  const groups = new Map<string, { disallow: string[]; allow: string[] }>();
  let current: string[] = [];
  let lastWasAgent = false;
  const sitemaps: string[] = [];
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const m = line.match(/^([a-zA-Z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!lastWasAgent) current = [];
      current.push(value.toLowerCase());
      lastWasAgent = true;
      for (const a of current) if (!groups.has(a)) groups.set(a, { disallow: [], allow: [] });
    } else {
      lastWasAgent = false;
      if (key === "sitemap" && value) sitemaps.push(value);
      if (key === "disallow" || key === "allow") {
        for (const a of current) {
          const g = groups.get(a);
          if (g) g[key === "disallow" ? "disallow" : "allow"].push(value);
        }
      }
    }
  }
  return { groups, sitemaps };
}

/** Le robot est-il intégralement bloqué (Disallow: / sans Allow racine) ? */
function botBlocked(groups: Map<string, { disallow: string[]; allow: string[] }>, token: string) {
  const rules = groups.get(token) ?? groups.get("*");
  if (!rules) return false;
  const blockedAll = rules.disallow.some((d) => d === "/" || d === "/*");
  const allowedRoot = rules.allow.some((a) => a === "/" || a === "/*");
  return blockedAll && !allowedRoot;
}

/** Les robots des moteurs IA lus dans robots.txt. */
const AI_BOTS = [
  { token: "gptbot", name: "GPTBot" },
  { token: "oai-searchbot", name: "OAI-SearchBot" },
  { token: "chatgpt-user", name: "ChatGPT-User" },
  { token: "claudebot", name: "ClaudeBot" },
  { token: "perplexitybot", name: "PerplexityBot" },
  { token: "google-extended", name: "Google-Extended" },
];

const SOCIAL_HOSTS = [
  "linkedin.com",
  "instagram.com",
  "facebook.com",
  "x.com",
  "twitter.com",
  "youtube.com",
  "tiktok.com",
  "pinterest.com",
];

const fmt = (n: number, en: boolean) => n.toLocaleString(en ? "en-GB" : "fr-FR");

/** Coupe propre à la dernière fin de phrase, sinon au dernier mot entier. */
function cutAt(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (stop >= max * 0.55) return cut.slice(0, stop + 1).trim();
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,:;.\-–(|]+$/, "") + "…";
}

/* ── Scan ──────────────────────────────────────────────────────── */

export type AuditError = { error: "unreachable" | "blocked"; status: number };

const STORE = new Map<string, { full: AuditFull; at: number; en: boolean }>();
const STORE_TTL_MS = 60 * 60 * 1000;

export function storedAudit(scanId: string, en: boolean) {
  const hit = STORE.get(scanId);
  if (!hit || Date.now() - hit.at > STORE_TTL_MS || hit.en !== en) return null;
  return hit.full;
}

function remember(full: AuditFull, en: boolean) {
  const now = Date.now();
  if (STORE.size > 300) {
    for (const [k, v] of STORE) if (now - v.at > STORE_TTL_MS || STORE.size > 250) STORE.delete(k);
  }
  STORE.set(full.scanId, { full, at: now, en });
}

export function summarize(full: AuditFull): AuditSummary {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { details, fixes, ...summary } = full;
  return summary;
}

export async function runAudit(
  target: URL,
  { en, onPhase }: { en: boolean; onPhase?: (id: PhaseId) => void },
): Promise<AuditFull | AuditError> {
  const L = (fr: string, enText: string) => (en ? enText : fr);
  const started = Date.now();
  const origin = target.origin;
  const tick = <T,>(id: PhaseId) => (v: T) => {
    onPhase?.(id);
    return v;
  };

  const [home, robots, llms, sitemapProbe] = await Promise.all([
    fetchCapped(origin + "/").then(tick<Fetched>("home")),
    fetchCapped(origin + "/robots.txt").then(tick<Fetched>("robots")),
    fetchCapped(origin + "/llms.txt").then(tick<Fetched>("llms")),
    fetchCapped(origin + "/sitemap.xml"),
  ]);

  if (!home.ok || !home.text) {
    const blocked = [401, 403, 429, 503].includes(home.status);
    return { error: blocked ? "blocked" : "unreachable", status: home.status };
  }

  /* Plan du site : sitemap.xml, sinon l'index de WordPress et Yoast. */
  const isXml = (f: Fetched) => f.ok && /^\s*(<\?xml|<urlset|<sitemapindex)/i.test(f.text);
  let sitemapFound = isXml(sitemapProbe);
  if (!sitemapFound) sitemapFound = isXml(await fetchCapped(origin + "/sitemap_index.xml"));
  onPhase?.("sitemap");

  const finalUrl = new URL(home.finalUrl || origin + "/");
  const html = home.text;
  const headEnd = html.search(/<\/head>/i);
  const head = headEnd > 0 ? html.slice(0, headEnd) : html;
  const text = visibleText(html);
  const nodes = jsonLdNodes(html);
  const types = nodes.flatMap(typesOf);
  onPhase?.("markup");

  /* ── Faits lus ─────────────────────────────────────────────── */
  const titleRaw = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const title = titleRaw ? stripTags(titleRaw) : "";
  const desc = metaContent(head, "description");
  const viewport = metaContent(head, "viewport");
  const robotsMeta = (metaContent(head, "robots") ?? "") + " " + home.robotsHeader;
  const noindex = /noindex/i.test(robotsMeta);
  const lang = html.match(/<html\b[^>]*\slang\s*=\s*["']?([a-zA-Z-]+)/i)?.[1] ?? "";
  const linkTags = tags(head, "link");
  const canonicalTag = linkTags.find((t) => /rel\s*=\s*["']?canonical/i.test(t));
  const canonical = canonicalTag ? attr(canonicalTag, "href") ?? "" : "";
  const hreflangs = linkTags.filter((t) => /hreflang\s*=/i.test(t));
  const hasXDefault = hreflangs.some((t) => /hreflang\s*=\s*["']?x-default/i.test(t));
  const h1s = headings(html, 1);
  const h2s = headings(html, 2);
  const h3s = headings(html, 3);
  const questions = [...h2s, ...h3s].filter((h) => /\?\s*$/.test(h));
  const imgs = tags(html, "img");
  const imgsWithAlt = imgs.filter((t) => attr(t, "alt") !== null).length;
  const imgsLazy = imgs.filter((t) => /loading\s*=\s*["']?lazy/i.test(t)).length;
  const ogTitle = metaContent(head, "og:title");
  const ogDesc = metaContent(head, "og:description");
  const ogImage = metaContent(head, "og:image");
  const ogSiteName = metaContent(head, "og:site_name");
  const scripts = tags(html, "script");
  const externalScripts = scripts.filter((t) => /\ssrc\s*=/i.test(t)).length;

  const anchors: { href: string; label: string }[] = [];
  {
    const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html))) {
      const href = attr(`<a ${m[1]}>`, "href");
      if (href) anchors.push({ href, label: stripTags(m[2]) });
    }
  }
  const absolute = (href: string) => {
    try {
      return new URL(href, finalUrl);
    } catch {
      return null;
    }
  };
  // Profils seulement (un par réseau) : ni publications, ni liens de partage.
  const socialByHost = new Map<string, string>();
  for (const a of anchors) {
    const u = absolute(a.href);
    if (!u) continue;
    const net = SOCIAL_HOSTS.find((h) => u.hostname.replace(/^www\./, "").endsWith(h));
    if (!net || socialByHost.has(net)) continue;
    const path = u.pathname.replace(/\/$/, "");
    if (!path || /\/(p|reel|reels|tv|watch|status|posts|photo|photos|video|videos|shorts|share|sharer|sharing|intent|hashtag|explore|pin)(\/|$)/i.test(path)) continue;
    socialByHost.set(net, u.origin + path);
  }
  const socialLinks = [...socialByHost.values()];
  const mail = anchors.find((a) => a.href.toLowerCase().startsWith("mailto:"))?.href.slice(7).split("?")[0] ?? "";
  const tel = anchors.find((a) => a.href.toLowerCase().startsWith("tel:"))?.href.slice(4) ?? "";
  const internal = anchors
    .map((a) => ({ u: absolute(a.href), label: a.label }))
    .filter(
      (a): a is { u: URL; label: string } =>
        !!a.u &&
        a.u.hostname === finalUrl.hostname &&
        a.u.pathname !== "/" &&
        a.label.length >= 3 &&
        a.label.length <= 40 &&
        !/\.(jpg|jpeg|png|webp|pdf|svg)$/i.test(a.u.pathname),
    );
  const localePrefixes = new Set(
    internal.map((a) => a.u.pathname.match(/^\/([a-z]{2})(?:-[a-z]{2})?\//i)?.[1]?.toLowerCase()).filter(Boolean),
  );
  const looksMultilingual = localePrefixes.size >= 2;

  const orgNode = nodes.find((n) =>
    typesOf(n).some((t) =>
      ["Organization", "LocalBusiness", "Corporation", "Store", "ProfessionalService", "OnlineStore", "Restaurant"].some(
        (k) => t.includes(k),
      ),
    ),
  );
  const ldText = JSON.stringify(nodes);
  const ldSameAs = /"sameAs"/.test(ldText);
  const ldAddress = /"address"/.test(ldText);
  const ldPhone = /"telephone"/.test(ldText);
  const hasFaq = types.some((t) => t === "FAQPage");
  const richTypes = [
    ...new Set(
      types.filter((t) =>
        ["Product", "Service", "Article", "BlogPosting", "NewsArticle", "Course", "Event", "Recipe", "HowTo", "Offer"].includes(t),
      ),
    ),
  ];
  const llmsOk = llms.ok && !llms.contentType.includes("html") && llms.text.trim().length > 20;
  const robotsOk = robots.ok && !robots.contentType.includes("html") && robots.text.length > 0;
  const { groups, sitemaps } = robotsOk ? parseRobots(robots.text) : { groups: new Map(), sitemaps: [] as string[] };
  const blockedAll = robotsOk && botBlocked(groups, "*") && !groups.has("googlebot");
  const blockedBots = robotsOk ? AI_BOTS.filter((b) => botBlocked(groups, b.token)) : [];
  const siteName =
    (ogSiteName && ogSiteName.trim()) ||
    (typeof orgNode?.name === "string" ? (orgNode.name as string) : "") ||
    title.split(/\s[|–\-:]\s|,\s/)[0]?.trim() ||
    finalUrl.hostname.replace(/^www\./, "");
  const firstParagraph =
    (html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/gi) ?? []).map(stripTags).find((p) => p.length >= 70) ?? "";

  /* ── Vérifications ─────────────────────────────────────────── */
  const checks: Check[] = [];
  const add = (c: Omit<Check, "status"> & { status: CheckStatus | null }) => {
    if (c.status) checks.push(c as Check);
  };

  // Technique
  const https = finalUrl.protocol === "https:";
  add({
    id: "https",
    cat: "technique",
    weight: 3,
    title: L("Connexion sécurisée (HTTPS)", "Secure connection (HTTPS)"),
    status: https ? "pass" : "fail",
    found: https
      ? L("Le site répond en HTTPS.", "The site answers over HTTPS.")
      : L("Le site répond en HTTP, sans chiffrement.", "The site answers over plain HTTP."),
    why: L(
      "Google le demande depuis longtemps, et les navigateurs affichent « Non sécurisé » sans HTTPS.",
      "Google has required it for years, and browsers show “Not secure” without it.",
    ),
    fix: L(
      "Activez un certificat (souvent gratuit chez l'hébergeur) et redirigez toutes les adresses HTTP vers HTTPS en 301.",
      "Turn on a certificate (often free at your host) and 301-redirect every HTTP address to HTTPS.",
    ),
  });
  add({
    id: "noindex",
    cat: "technique",
    weight: 5,
    title: L("Page autorisée dans Google", "Page allowed in Google"),
    status: noindex ? "fail" : "pass",
    found: noindex
      ? L("La page d'accueil porte une consigne noindex : Google ne la montre pas.", "The home page carries a noindex rule: Google will not show it.")
      : L("Aucune consigne noindex sur la page d'accueil.", "No noindex rule on the home page."),
    why: L(
      "Une consigne noindex retire la page des résultats. C'est souvent un oubli après une mise en ligne.",
      "A noindex rule removes the page from results. It is often left over from a launch.",
    ),
    fix: L(
      "Retirez « noindex » de la balise meta robots et de l'en-tête X-Robots-Tag, puis demandez l'indexation dans la Search Console.",
      "Remove “noindex” from the meta robots tag and the X-Robots-Tag header, then request indexing in Search Console.",
    ),
  });
  add({
    id: "viewport",
    cat: "technique",
    weight: 2,
    title: L("Affichage mobile (viewport)", "Mobile display (viewport)"),
    status: viewport ? "pass" : "fail",
    found: viewport
      ? L("La balise viewport est présente.", "The viewport tag is present.")
      : L("Pas de balise viewport : la page s'affiche en version ordinateur sur mobile.", "No viewport tag: phones get the desktop layout."),
    why: L(
      "Google indexe d'abord la version mobile des pages.",
      "Google indexes the mobile version of pages first.",
    ),
    fix: L(
      'Ajoutez dans le <head> : <meta name="viewport" content="width=device-width, initial-scale=1">.',
      'Add to the <head>: <meta name="viewport" content="width=device-width, initial-scale=1">.',
    ),
  });
  add({
    id: "lang",
    cat: "technique",
    weight: 2,
    title: L("Langue déclarée", "Declared language"),
    status: lang ? "pass" : "fail",
    found: lang
      ? L(`La page déclare la langue « ${lang} ».`, `The page declares the language “${lang}”.`)
      : L("Aucune langue déclarée sur la balise <html>.", "No language declared on the <html> tag."),
    why: L(
      "Les moteurs et les lecteurs d'écran s'en servent pour comprendre et lire le texte.",
      "Search engines and screen readers use it to understand and read the text.",
    ),
    fix: L('Écrivez <html lang="fr"> (ou la langue de la page).', 'Write <html lang="en"> (or the page language).'),
  });
  add({
    id: "canonical",
    cat: "technique",
    weight: 2,
    title: L("Adresse canonique", "Canonical address"),
    status: canonical ? "pass" : "warn",
    found: canonical
      ? L(`Canonique déclarée : ${canonical}`, `Canonical declared: ${canonical}`)
      : L("Aucune balise canonique sur la page d'accueil.", "No canonical tag on the home page."),
    why: L(
      "Elle indique à Google la bonne adresse quand une page existe sous plusieurs URL (avec ou sans www, paramètres).",
      "It tells Google the right address when a page exists under several URLs (with or without www, parameters).",
    ),
    fix: L(
      `Ajoutez <link rel="canonical" href="${finalUrl.origin}/"> dans le <head>, puis une canonique sur chaque page.`,
      `Add <link rel="canonical" href="${finalUrl.origin}/"> to the <head>, then a canonical on every page.`,
    ),
  });
  add({
    id: "robots",
    cat: "technique",
    weight: 2,
    title: L("Fichier robots.txt", "robots.txt file"),
    status: blockedAll ? "fail" : robotsOk ? "pass" : "warn",
    found: blockedAll
      ? L("robots.txt interdit tout le site à tous les robots.", "robots.txt blocks the whole site for every crawler.")
      : robotsOk
        ? L("Présent et lisible.", "Present and readable.")
        : L("Introuvable à la racine du site.", "Not found at the site root."),
    why: L(
      "C'est le premier fichier que lisent les robots. Il dit ce qu'ils peuvent visiter et où trouver le plan du site.",
      "It is the first file crawlers read. It says what they may visit and where the sitemap is.",
    ),
    fix: L(
      "Publiez un robots.txt qui autorise le site et indique le sitemap (exemple dans les correctifs ci-dessous).",
      "Publish a robots.txt that allows the site and points to the sitemap (example in the fixes below).",
    ),
  });
  add({
    id: "sitemap",
    cat: "technique",
    weight: 3,
    title: L("Plan du site (sitemap.xml)", "Sitemap (sitemap.xml)"),
    status: sitemapFound || sitemaps.length > 0 ? "pass" : "fail",
    found:
      sitemapFound || sitemaps.length > 0
        ? L("Un plan du site est accessible.", "A sitemap is reachable.")
        : L("Aucun sitemap.xml trouvé, ni déclaré dans robots.txt.", "No sitemap.xml found, nor declared in robots.txt."),
    why: L(
      "Le plan du site liste vos pages pour que Google les découvre toutes, vite.",
      "The sitemap lists your pages so Google finds all of them, quickly.",
    ),
    fix: L(
      "Générez un sitemap.xml (la plupart des CMS le font), déclarez-le dans robots.txt et dans la Search Console.",
      "Generate a sitemap.xml (most CMSs do), declare it in robots.txt and in Search Console.",
    ),
  });
  add({
    id: "hreflang",
    cat: "technique",
    weight: 2,
    title: L("Versions linguistiques (hreflang)", "Language versions (hreflang)"),
    status: hreflangs.length > 0 ? (hasXDefault ? "pass" : "warn") : looksMultilingual ? "fail" : null,
    found:
      hreflangs.length > 0
        ? hasXDefault
          ? L(`${hreflangs.length} versions déclarées, avec x-default.`, `${hreflangs.length} versions declared, with x-default.`)
          : L(`${hreflangs.length} versions déclarées, sans x-default.`, `${hreflangs.length} versions declared, without x-default.`)
        : L("Le site semble avoir plusieurs langues, mais aucune balise hreflang.", "The site seems to have several languages, but no hreflang tags."),
    why: L(
      "Sans hreflang, Google peut montrer la mauvaise langue, ou traiter les traductions comme des doublons.",
      "Without hreflang, Google may show the wrong language, or treat translations as duplicates.",
    ),
    fix: L(
      'Sur chaque page, listez ses versions : <link rel="alternate" hreflang="fr" href="…">, une par langue, plus hreflang="x-default".',
      'On every page, list its versions: <link rel="alternate" hreflang="en" href="…">, one per language, plus hreflang="x-default".',
    ),
  });

  // Contenu
  const tl = title.length;
  add({
    id: "title",
    cat: "contenu",
    weight: 4,
    title: L("Titre de la page", "Page title"),
    status: !title ? "fail" : tl >= 30 && tl <= 60 ? "pass" : "warn",
    found: !title
      ? L("La page n'a pas de balise <title>.", "The page has no <title> tag.")
      : L(`« ${title} » (${tl} caractères).`, `“${title}” (${tl} characters).`),
    why: L(
      "C'est la ligne cliquable dans Google. Au-delà de 60 caractères, elle est coupée. En dessous de 30, elle en dit trop peu.",
      "It is the clickable line in Google. Past 60 characters it gets cut. Under 30 it says too little.",
    ),
    fix: L(
      "Visez 30 à 60 caractères : ce que vous faites, puis votre nom. Une proposition est prête dans les correctifs.",
      "Aim for 30 to 60 characters: what you do, then your name. A proposal is ready in the fixes.",
    ),
  });
  const dl = desc?.length ?? 0;
  add({
    id: "description",
    cat: "contenu",
    weight: 3,
    title: L("Méta description", "Meta description"),
    status: !desc ? "fail" : dl >= 70 && dl <= 160 ? "pass" : "warn",
    found: !desc
      ? L("Aucune méta description : Google choisit lui-même un extrait.", "No meta description: Google picks its own snippet.")
      : L(`${dl} caractères.`, `${dl} characters.`),
    why: L(
      "C'est le texte sous le titre dans Google. Il ne fait pas monter la page, mais il décide du clic.",
      "It is the text under the title in Google. It does not lift rankings, but it wins the click.",
    ),
    fix: L(
      "Écrivez 70 à 160 caractères : pour qui, quoi, et pourquoi vous. Une proposition est prête dans les correctifs.",
      "Write 70 to 160 characters: for whom, what, and why you. A proposal is ready in the fixes.",
    ),
  });
  add({
    id: "h1",
    cat: "contenu",
    weight: 3,
    title: L("Un seul titre principal (H1)", "A single main heading (H1)"),
    status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn",
    found:
      h1s.length === 1
        ? L(`« ${cutAt(h1s[0], 90)} »`, `“${cutAt(h1s[0], 90)}”`)
        : h1s.length === 0
          ? L("Aucun H1 dans le HTML servi.", "No H1 in the served HTML.")
          : L(`${h1s.length} balises H1 sur la même page.`, `${h1s.length} H1 tags on the same page.`),
    why: L(
      "Le H1 dit de quoi parle la page. Un seul, clair, aide Google et les moteurs IA à la résumer.",
      "The H1 says what the page is about. One clear H1 helps Google and AI engines summarise it.",
    ),
    fix: L(
      "Gardez un seul H1 qui reprend votre activité principale. Les autres titres passent en H2.",
      "Keep one H1 that states your main activity. Other headings become H2.",
    ),
  });
  add({
    id: "structure",
    cat: "contenu",
    weight: 2,
    title: L("Sections titrées (H2)", "Titled sections (H2)"),
    status: h2s.length >= 3 ? "pass" : h2s.length >= 1 ? "warn" : "fail",
    found: L(`${h2s.length} titre${h2s.length > 1 ? "s" : ""} H2 sur la page d'accueil.`, `${h2s.length} H2 heading${h2s.length === 1 ? "" : "s"} on the home page.`),
    why: L(
      "Des sections bien titrées rendent le contenu facile à parcourir, et facile à reprendre par morceaux.",
      "Well-titled sections make content easy to scan, and easy to quote in parts.",
    ),
    fix: L(
      "Découpez la page en sections, chacune ouverte par un H2 qui dit ce qu'elle contient.",
      "Split the page into sections, each opened by an H2 that says what it holds.",
    ),
  });
  add({
    id: "alt",
    cat: "contenu",
    weight: 2,
    title: L("Textes alternatifs des images", "Image alt text"),
    status: imgs.length === 0 ? null : imgsWithAlt / imgs.length >= 0.9 ? "pass" : imgsWithAlt / imgs.length >= 0.6 ? "warn" : "fail",
    found: L(
      `${imgsWithAlt} image${imgsWithAlt > 1 ? "s" : ""} sur ${imgs.length} ont un attribut alt.`,
      `${imgsWithAlt} of ${imgs.length} images have an alt attribute.`,
    ),
    why: L(
      "Le texte alternatif décrit l'image à Google Images et aux personnes malvoyantes.",
      "Alt text describes the image to Google Images and to visually impaired people.",
    ),
    fix: L(
      "Décrivez chaque image utile en quelques mots. Pour une image décorative, laissez alt vide (alt=\"\").",
      "Describe each useful image in a few words. For a decorative image, leave alt empty (alt=\"\").",
    ),
  });
  const ogCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
  add({
    id: "og",
    cat: "contenu",
    weight: 2,
    title: L("Aperçu de partage (Open Graph)", "Share preview (Open Graph)"),
    status: ogCount === 3 ? "pass" : ogCount > 0 ? "warn" : "fail",
    found: L(
      `${ogCount} balise${ogCount > 1 ? "s" : ""} sur 3 (og:title, og:description, og:image).`,
      `${ogCount} of 3 tags (og:title, og:description, og:image).`,
    ),
    why: L(
      "Ces balises fabriquent l'aperçu quand votre lien est partagé sur LinkedIn, WhatsApp ou Slack.",
      "These tags build the preview when your link is shared on LinkedIn, WhatsApp or Slack.",
    ),
    fix: L(
      "Ajoutez og:title, og:description et og:image (1200 × 630 px) dans le <head>.",
      "Add og:title, og:description and og:image (1200 × 630 px) to the <head>.",
    ),
  });

  // Lisibilité IA
  add({
    id: "ai-bots",
    cat: "ia",
    weight: 4,
    title: L("Accès des robots IA", "AI crawler access"),
    status: blockedBots.length === 0 ? "pass" : blockedBots.length <= 2 ? "warn" : "fail",
    found:
      blockedBots.length === 0
        ? L(
            "GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot et Google-Extended peuvent lire le site.",
            "GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot and Google-Extended can read the site.",
          )
        : L(
            `Bloqués par robots.txt : ${blockedBots.map((b) => b.name).join(", ")}.`,
            `Blocked by robots.txt: ${blockedBots.map((b) => b.name).join(", ")}.`,
          ),
    why: L(
      "Un robot bloqué ne lit pas vos pages. L'outil qui l'utilise ne peut donc pas s'appuyer sur votre site pour répondre. Google-Extended ne concerne que Gemini, pas les résultats Google.",
      "A blocked crawler does not read your pages, so the tool behind it cannot rely on your site to answer. Google-Extended only concerns Gemini, not Google results.",
    ),
    fix: L(
      "Autorisez ces robots dans robots.txt, sauf choix délibéré. Le bloc prêt à coller est dans les correctifs.",
      "Allow these crawlers in robots.txt, unless it is a deliberate choice. The block to paste is in the fixes.",
    ),
  });
  const textLen = text.length;
  add({
    id: "no-js",
    cat: "ia",
    weight: 4,
    title: L("Contenu lisible sans JavaScript", "Content readable without JavaScript"),
    status: textLen >= 1500 ? "pass" : textLen >= 600 ? "warn" : "fail",
    found: L(
      `${fmt(textLen, en)} caractères de texte dans le HTML servi.`,
      `${fmt(textLen, en)} characters of text in the served HTML.`,
    ),
    why: L(
      "Beaucoup de robots IA n'exécutent pas JavaScript. Ce qui n'est pas dans le HTML initial, ils ne le voient pas.",
      "Many AI crawlers do not run JavaScript. What is not in the initial HTML, they do not see.",
    ),
    fix: L(
      "Servez le texte principal dans le HTML (rendu serveur ou génération statique), pas seulement après chargement du script.",
      "Serve the main text in the HTML (server rendering or static generation), not only after scripts load.",
    ),
  });
  add({
    id: "jsonld",
    cat: "ia",
    weight: 3,
    title: L("Entreprise déclarée en JSON\u2011LD", "Company declared in JSON\u2011LD"),
    status: orgNode ? "pass" : types.length > 0 ? "warn" : "fail",
    found: orgNode
      ? L(`Entité déclarée : ${typesOf(orgNode).join(", ")}.`, `Entity declared: ${typesOf(orgNode).join(", ")}.`)
      : types.length > 0
        ? L(
            `Du JSON-LD existe (${[...new Set(types)].slice(0, 5).join(", ")}), mais aucune Organization ni LocalBusiness.`,
            `JSON-LD exists (${[...new Set(types)].slice(0, 5).join(", ")}), but no Organization or LocalBusiness.`,
          )
        : L("Aucune donnée structurée JSON-LD.", "No JSON-LD structured data."),
    why: L(
      "Ce balisage dit aux moteurs, sans ambiguïté, qui vous êtes : nom, adresse, logo, profils.",
      "This markup tells engines, without ambiguity, who you are: name, address, logo, profiles.",
    ),
    fix: L(
      "Ajoutez un bloc Organization (ou LocalBusiness si vous recevez des clients). Le squelette rempli avec votre domaine est dans les correctifs.",
      "Add an Organization block (or LocalBusiness if you receive customers). The skeleton filled with your domain is in the fixes.",
    ),
  });
  const entity = [Boolean(siteName), Boolean(ldAddress || ldPhone || tel || mail), Boolean(ldSameAs || socialLinks.length > 0)];
  const entityCount = entity.filter(Boolean).length;
  add({
    id: "entity",
    cat: "ia",
    weight: 3,
    title: L("Signaux d'identité", "Identity signals"),
    status: entityCount === 3 ? "pass" : entityCount === 2 ? "warn" : "fail",
    found: L(
      `Nom : ${entity[0] ? "oui" : "non"}. Adresse ou contact : ${entity[1] ? "oui" : "non"}. Profils liés (sameAs, réseaux) : ${entity[2] ? "oui" : "non"}.`,
      `Name: ${entity[0] ? "yes" : "no"}. Address or contact: ${entity[1] ? "yes" : "no"}. Linked profiles (sameAs, social): ${entity[2] ? "yes" : "no"}.`,
    ),
    why: L(
      "Pour parler de vous, un moteur doit relier votre site à une entreprise réelle : un nom, un moyen de contact, des profils qui confirment.",
      "To talk about you, an engine must tie your site to a real company: a name, a way to reach you, profiles that confirm it.",
    ),
    fix: L(
      "Affichez vos coordonnées en texte, et listez vos profils (LinkedIn, Google, réseaux) dans le champ sameAs du JSON-LD.",
      "Show your contact details as text, and list your profiles (LinkedIn, Google, social) in the JSON-LD sameAs field.",
    ),
  });
  add({
    id: "faq",
    cat: "ia",
    weight: 2,
    title: L("Questions et réponses", "Questions and answers"),
    status: hasFaq ? "pass" : questions.length >= 2 ? "warn" : "fail",
    found: hasFaq
      ? L("Une FAQ balisée (FAQPage) est présente.", "A marked-up FAQ (FAQPage) is present.")
      : questions.length > 0
        ? L(
            `${questions.length} titre${questions.length > 1 ? "s" : ""} en forme de question, sans balisage FAQPage.`,
            `${questions.length} question-shaped heading${questions.length === 1 ? "" : "s"}, without FAQPage markup.`,
          )
        : L("Aucune question posée en titre sur la page.", "No question asked as a heading on the page."),
    why: L(
      "Vos clients posent des questions. Une page qui y répond clairement, question par question, est plus facile à reprendre dans une réponse.",
      "Your customers ask questions. A page that answers them clearly, one by one, is easier to use in an answer.",
    ),
    fix: L(
      "Ajoutez une courte FAQ avec les vraies questions de vos clients, et balisez-la en FAQPage.",
      "Add a short FAQ with your customers' real questions, and mark it up as FAQPage.",
    ),
  });
  add({
    id: "rich",
    cat: "ia",
    weight: 2,
    title: L("Offres balisées (produits, services, articles)", "Marked-up offers (products, services, articles)"),
    status: richTypes.length > 0 ? "pass" : "fail",
    found:
      richTypes.length > 0
        ? L(`Types présents : ${richTypes.join(", ")}.`, `Types present: ${richTypes.join(", ")}.`)
        : L("Aucun produit, service ou article balisé sur la page d'accueil.", "No product, service or article marked up on the home page."),
    why: L(
      "Ce balisage transforme vos offres en objets que les moteurs savent lire : un prix, une note, un auteur, une date.",
      "This markup turns your offers into objects engines can read: a price, a rating, an author, a date.",
    ),
    fix: L(
      "Balisez vos fiches en Product, vos prestations en Service, vos articles en Article avec leur date.",
      "Mark up product pages as Product, services as Service, articles as Article with their date.",
    ),
  });
  add({
    id: "llms",
    cat: "ia",
    weight: 2,
    title: L("Fichier llms.txt", "llms.txt file"),
    status: llmsOk ? "pass" : "fail",
    found: llmsOk
      ? L("Présent à la racine du site.", "Present at the site root.")
      : L("Absent à la racine du site.", "Missing at the site root."),
    why: L(
      "Un résumé de votre activité et de vos pages utiles, écrit pour les assistants. Simple à publier. Tous les outils ne le lisent pas encore.",
      "A summary of your business and useful pages, written for assistants. Simple to publish. Not every tool reads it yet.",
    ),
    fix: L(
      "Publiez /llms.txt. Un premier jet rédigé à partir de votre page d'accueil est dans les correctifs.",
      "Publish /llms.txt. A first draft written from your home page is in the fixes.",
    ),
  });

  // Performance
  const kb = Math.round(home.bytes / 1024);
  add({
    id: "ttfb",
    cat: "performance",
    weight: 3,
    title: L("Temps de réponse du HTML", "HTML response time"),
    status: home.ms <= 800 ? "pass" : home.ms <= 1800 ? "warn" : "fail",
    found: L(
      `${fmt(home.ms, en)} ms pour recevoir la page complète, mesuré depuis notre serveur.`,
      `${fmt(home.ms, en)} ms to receive the full page, measured from our server.`,
    ),
    why: L(
      "Une page lente à arriver retarde tout le reste. Google mesure la vitesse réelle chez vos visiteurs.",
      "A page that is slow to arrive delays everything else. Google measures real speed for your visitors.",
    ),
    fix: L(
      "Activez la mise en cache de la page, un CDN, et allégez ce que le serveur calcule à chaque visite.",
      "Turn on page caching and a CDN, and reduce what the server computes on each visit.",
    ),
  });
  add({
    id: "weight",
    cat: "performance",
    weight: 2,
    title: L("Poids du HTML", "HTML weight"),
    status: kb <= 200 ? "pass" : kb <= 500 ? "warn" : "fail",
    found: home.truncated
      ? L("Plus de 1,5 Mo de HTML : la lecture a été arrêtée.", "Over 1.5 MB of HTML: reading was stopped.")
      : L(`${fmt(kb, en)} Ko de HTML.`, `${fmt(kb, en)} KB of HTML.`),
    why: L(
      "Un HTML lourd est souvent gonflé de code inutile, que le téléphone doit télécharger et lire.",
      "Heavy HTML is often padded with unused code that phones must download and parse.",
    ),
    fix: L(
      "Retirez le code inline inutile (styles, données, constructeurs de pages) et visez moins de 200 Ko.",
      "Remove unused inline code (styles, data, page builders) and aim for under 200 KB.",
    ),
  });
  add({
    id: "scripts",
    cat: "performance",
    weight: 2,
    title: L("Nombre de scripts", "Number of scripts"),
    status: externalScripts <= 15 ? "pass" : externalScripts <= 30 ? "warn" : "fail",
    found: L(
      `${externalScripts} script${externalScripts > 1 ? "s" : ""} externe${externalScripts > 1 ? "s" : ""} chargé${externalScripts > 1 ? "s" : ""} par la page.`,
      `${externalScripts} external script${externalScripts === 1 ? "" : "s"} loaded by the page.`,
    ),
    why: L(
      "Chaque script se télécharge et s'exécute. Trop de scripts ralentissent la page sur mobile.",
      "Every script is downloaded and run. Too many scripts slow the page on phones.",
    ),
    fix: L(
      "Faites le tri dans les modules, widgets et traceurs. Chargez le reste en différé (defer).",
      "Prune plugins, widgets and trackers. Load the rest deferred (defer).",
    ),
  });
  add({
    id: "lazy",
    cat: "performance",
    weight: 1,
    title: L("Chargement différé des images", "Lazy-loaded images"),
    status: imgs.length < 6 ? null : imgsLazy / imgs.length >= 0.5 ? "pass" : imgsLazy > 0 ? "warn" : "fail",
    found: L(
      `${imgsLazy} image${imgsLazy > 1 ? "s" : ""} sur ${imgs.length} en loading="lazy".`,
      `${imgsLazy} of ${imgs.length} images use loading="lazy".`,
    ),
    why: L(
      "Les images hors écran n'ont pas à bloquer le premier affichage.",
      "Off-screen images should not hold up the first render.",
    ),
    fix: L(
      'Ajoutez loading="lazy" aux images sous la ligne de flottaison. Gardez la première grande image en chargement normal.',
      'Add loading="lazy" to images below the fold. Keep the first large image loading normally.',
    ),
  });

  /* ── Notes ─────────────────────────────────────────────────── */
  const LABELS: Record<CategoryId, string> = {
    technique: L("Technique", "Technical"),
    contenu: L("Contenu", "Content"),
    ia: L("Lisibilité IA", "AI readability"),
    performance: L("Performance", "Performance"),
  };
  const WEIGHTS: Record<CategoryId, number> = { technique: 0.25, contenu: 0.25, ia: 0.3, performance: 0.2 };
  const value = (s: CheckStatus) => (s === "pass" ? 1 : s === "warn" ? 0.5 : 0);
  const categories: CategoryScore[] = (Object.keys(LABELS) as CategoryId[]).map((id) => {
    const list = checks.filter((c) => c.cat === id);
    const max = list.reduce((s, c) => s + c.weight, 0);
    const pts = list.reduce((s, c) => s + c.weight * value(c.status), 0);
    return { id, label: LABELS[id], score: max ? Math.round((pts / max) * 100) : 100 };
  });
  const score = Math.round(categories.reduce((s, c) => s + c.score * WEIGHTS[c.id], 0));
  // Une page en noindex n'est pas « bonne », quel que soit le reste.
  const finalScore = noindex ? Math.min(score, 49) : score;

  // Deux notes en tête : SEO (Google) et GEO (moteurs IA). Le score global
  // reste dans les données pour la notification e-mail historique.
  const catScore = (id: CategoryId) => categories.find((c) => c.id === id)?.score ?? 0;
  const seoRaw = Math.round((catScore("technique") * 0.25 + catScore("contenu") * 0.25 + catScore("performance") * 0.2) / 0.7);
  // Le noindex bloque Google : la note SEO suit la même règle que le global.
  const seoScore = noindex ? Math.min(seoRaw, 49) : seoRaw;
  const geoScore = catScore("ia");
  const weakest: "seo" | "geo" = seoScore < geoScore ? "seo" : "geo";

  // Les trois priorités : d'abord du côté le plus faible, puis le reste.
  const severity = (c: Check) => c.weight * (c.status === "fail" ? 1 : 0.45);
  const onWeakSide = (c: Check) => (weakest === "geo" ? c.cat === "ia" : c.cat !== "ia");
  const failing = checks.filter((c) => c.status !== "pass").sort((a, b) => severity(b) - severity(a));
  const issues = [...failing.filter(onWeakSide), ...failing.filter((c) => !onWeakSide(c))]
    .slice(0, 3)
    .map((c) => ({ id: c.id, title: c.title, cat: c.cat, status: c.status }));
  onPhase?.("score");

  /* ── Correctifs pré-écrits ─────────────────────────────────── */
  const fixes: Fix[] = [];
  const statusOf = (id: string) => checks.find((c) => c.id === id)?.status;
  const brand = siteName;

  if (statusOf("title") !== "pass" || statusOf("description") !== "pass") {
    let t = title;
    if (!t) t = cutAt(`${h1s[0] ?? brand} | ${brand}`, 60);
    else if (t.length > 60) {
      const parts = t.split(/\s[|–\-]\s/);
      const tail = parts.length > 1 ? parts[parts.length - 1] : "";
      t = tail && tail.length < 25 ? `${cutAt(parts[0], 57 - tail.length - 3).replace(/…$/, "")} | ${tail}` : cutAt(t, 60).replace(/…$/, "");
    } else if (t.length < 30) {
      const extra = h1s[0] && !t.toLowerCase().includes(h1s[0].toLowerCase()) ? h1s[0] : "";
      t = extra ? cutAt(`${extra} | ${t}`, 60).replace(/…$/, "") : t;
    }
    let d = desc ?? "";
    if (d.length > 160) d = cutAt(d, 155);
    else if (d.length < 70) d = firstParagraph ? cutAt(firstParagraph, 155) : "";
    const placeholder = L(
      "Ce que vous faites, pour qui, où. Puis ce qui vous distingue, en une phrase.",
      "What you do, for whom, where. Then what sets you apart, in one sentence.",
    );
    fixes.push({
      id: "title-description",
      title: L("Titre et méta description", "Title and meta description"),
      intro: L(
        `Un point de départ calculé à partir de votre texte actuel : titre de ${t.length} caractères, description de ${(d || placeholder).length} caractères. Relisez-le avec vos mots clés avant de le publier.`,
        `A starting point computed from your current text: a ${t.length}-character title and a ${(d || placeholder).length}-character description. Review it with your keywords before publishing.`,
      ),
      file: L("<head> de la page d'accueil", "home page <head>"),
      code: `<title>${t}</title>\n<meta name="description" content="${(d || placeholder).replace(/"/g, "&quot;")}">`,
    });
  }

  if (statusOf("jsonld") !== "pass" || statusOf("entity") !== "pass") {
    const todo = L("À compléter", "To complete");
    const ld: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${finalUrl.origin}/#organization`,
      name: brand,
      url: `${finalUrl.origin}/`,
      logo: `${finalUrl.origin}/logo.png`,
      description: desc ? cutAt(desc, 200) : todo,
      email: mail || todo,
      telephone: tel || todo,
      address: {
        "@type": "PostalAddress",
        streetAddress: todo,
        postalCode: todo,
        addressLocality: todo,
        addressCountry: "FR",
      },
      sameAs: socialLinks.length > 0 ? socialLinks.slice(0, 6) : [`https://www.linkedin.com/company/${todo}`],
    };
    fixes.push({
      id: "jsonld",
      title: L("Bloc JSON-LD Organization", "Organization JSON-LD block"),
      intro: L(
        `Rempli avec votre domaine et ce que nous avons lu sur la page${socialLinks.length ? ` (${socialLinks.length} profil${socialLinks.length > 1 ? "s" : ""} trouvé${socialLinks.length > 1 ? "s" : ""})` : ""}. Complétez les champs marqués, vérifiez l'adresse du logo, puis collez-le dans le <head>.`,
        `Filled with your domain and what we read on the page${socialLinks.length ? ` (${socialLinks.length} profile${socialLinks.length === 1 ? "" : "s"} found)` : ""}. Complete the marked fields, check the logo address, then paste it in the <head>.`,
      ),
      file: "<head>",
      code: `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>`,
    });
  }

  if (blockedBots.length > 0 || !robotsOk || blockedAll) {
    const lines = [
      L("# Moteurs IA : accès autorisé", "# AI engines: access allowed"),
      ...AI_BOTS.flatMap((b) => [`User-agent: ${b.name}`, "Allow: /", ""]),
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${finalUrl.origin}/sitemap.xml`,
    ];
    fixes.push({
      id: "robots",
      title: L("Bloc robots.txt pour les robots IA", "robots.txt block for AI crawlers"),
      intro: L(
        "À placer en tête de /robots.txt. Supprimez les anciennes lignes Disallow qui visent ces robots, sinon elles restent en conflit.",
        "Place it at the top of /robots.txt. Delete the old Disallow lines that target these crawlers, or they stay in conflict.",
      ),
      file: "/robots.txt",
      code: lines.join("\n"),
    });
  }

  if (!llmsOk) {
    const seen = new Set<string>();
    const pages = internal
      .filter((a) => {
        const key = a.u.pathname.replace(/\/$/, "");
        if (seen.has(key) || /mentions|legal|cgv|cookie|privacy|confidentialit|panier|cart|account|compte|login/i.test(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 8);
    const llmsTxt = [
      `# ${brand}`,
      "",
      `> ${desc ? cutAt(desc, 240) : firstParagraph ? cutAt(firstParagraph, 240) : L("Une phrase qui dit ce que vous faites, pour qui et où.", "One sentence saying what you do, for whom and where.")}`,
      "",
      L("## Pages utiles", "## Useful pages"),
      "",
      `- [${L("Accueil", "Home")}](${finalUrl.origin}/)${title ? `: ${title}` : ""}`,
      ...pages.map((p) => `- [${p.label}](${p.u.origin}${p.u.pathname})`),
      "",
      "## Contact",
      "",
      ...(mail ? [`- ${L("E-mail", "Email")} : ${mail}`] : []),
      ...(tel ? [`- ${L("Téléphone", "Phone")} : ${tel}`] : []),
      ...(!mail && !tel ? [`- ${L("À compléter", "To complete")}`] : []),
    ];
    fixes.push({
      id: "llms",
      title: L("Premier jet de llms.txt", "First draft of llms.txt"),
      intro: L(
        `Rédigé à partir de votre page d'accueil (${pages.length} page${pages.length > 1 ? "s" : ""} reprise${pages.length > 1 ? "s" : ""} de votre menu). Ajoutez une ligne d'explication par page, puis publiez-le à la racine du site.`,
        `Written from your home page (${pages.length} page${pages.length === 1 ? "" : "s"} taken from your menu). Add one line of explanation per page, then publish it at the site root.`,
      ),
      file: "/llms.txt",
      code: llmsTxt.join("\n"),
    });
  }

  const full: AuditFull = {
    scanId: crypto.randomUUID(),
    url: finalUrl.origin + "/",
    host: finalUrl.hostname.replace(/^www\./, ""),
    score: finalScore,
    band: bandOf(finalScore),
    seoScore,
    seoBand: bandOf(seoScore),
    geoScore,
    geoBand: bandOf(geoScore),
    weakest,
    categories,
    issues,
    checks: checks.map((c) => ({ id: c.id, title: c.title, cat: c.cat, status: c.status })),
    counts: {
      pass: checks.filter((c) => c.status === "pass").length,
      warn: checks.filter((c) => c.status === "warn").length,
      fail: checks.filter((c) => c.status === "fail").length,
    },
    fixCount: fixes.length,
    durationMs: Date.now() - started,
    fetchedAt: new Date().toISOString(),
    details: checks,
    fixes,
  };
  remember(full, en);
  return full;
}
