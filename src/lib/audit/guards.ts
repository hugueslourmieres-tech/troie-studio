/**
 * Garde-fous partagés de l'audit SEO et GEO (/api/scan-ia et
 * /api/scan-ia/report). Repris du scan IA du 17/08/2026, sans changement de
 * fond :
 *   - Origin : un POST dont l'Origin n'est pas le site est rejeté.
 *   - Limite par IP : mémoire d'instance, best-effort en serverless.
 *   - Garde SSRF : cibles http(s) publiques uniquement, jamais d'adresse
 *     privée, de localhost, d'IP littérale ni de port exotique.
 *   - Taille et durée bornées : 1,5 Mo par ressource, 8 s par fetch.
 */

/* ── Origin ────────────────────────────────────────────────────── */

export function originAllowed(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return (
      host === "troiestudio.fr" ||
      host === "www.troiestudio.fr" ||
      host === "localhost" ||
      // Lien de relecture (projet Vercel séparé), comme /api/contact.
      host.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

/* ── Limite par IP ─────────────────────────────────────────────── */

/** Fenêtre fixe par IP. Une instance par route, pour des quotas séparés. */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; reset: number }>();
  return function rateLimited(ip: string) {
    const now = Date.now();
    if (hits.size > 2000) {
      for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
    }
    const entry = hits.get(ip);
    if (!entry || now > entry.reset) {
      hits.set(ip, { count: 1, reset: now + windowMs });
      return false;
    }
    entry.count += 1;
    return entry.count > limit;
  };
}

/* ── Garde SSRF ────────────────────────────────────────────────── */

/** Toute IP littérale est refusée : on scanne des noms de domaine publics. */
function isIpv4Literal(host: string) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
}

export function normalizeTarget(raw: string): URL | null {
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
  // On audite toujours la page d'accueil, pas une page profonde.
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

/** Une redirection ne doit pas emmener le robot vers une cible interdite. */
export function finalUrlAllowed(finalUrl: string) {
  try {
    return normalizeTarget(finalUrl) !== null;
  } catch {
    return false;
  }
}

/* ── Fetch borné ───────────────────────────────────────────────── */

const UA =
  "Mozilla/5.0 (compatible; TROIE-Audit/2.0; +https://troiestudio.fr/fr/audit-seo-gratuit)";
const MAX_BYTES = 1_500_000;
const FETCH_TIMEOUT_MS = 8_000;

export type Fetched = {
  ok: boolean;
  status: number;
  finalUrl: string;
  contentType: string;
  robotsHeader: string;
  /** Octets reçus (bornés à MAX_BYTES). */
  bytes: number;
  /** Durée de la requête, du départ à la fin du corps, en ms. */
  ms: number;
  truncated: boolean;
  text: string;
};

export async function fetchCapped(url: string): Promise<Fetched> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml,text/plain,*/*",
        "accept-language": "fr-FR,fr;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      signal: controller.signal,
      cache: "no-store",
    });
    if (res.url && !finalUrlAllowed(res.url)) {
      controller.abort();
      return empty(url, Date.now() - t0);
    }
    const reader = res.body?.getReader();
    let received = 0;
    let truncated = false;
    const chunks: Uint8Array[] = [];
    if (reader) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        chunks.push(value);
        if (received >= MAX_BYTES) {
          truncated = true;
          controller.abort();
          break;
        }
      }
    }
    const buf = new Uint8Array(Math.min(received, MAX_BYTES));
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
      finalUrl: res.url || url,
      contentType: res.headers.get("content-type") ?? "",
      robotsHeader: res.headers.get("x-robots-tag") ?? "",
      bytes: received,
      ms: Date.now() - t0,
      truncated,
      text: new TextDecoder("utf-8", { fatal: false }).decode(buf),
    };
  } catch {
    return empty(url, Date.now() - t0);
  } finally {
    clearTimeout(timer);
  }
}

function empty(url: string, ms: number): Fetched {
  return {
    ok: false,
    status: 0,
    finalUrl: url,
    contentType: "",
    robotsHeader: "",
    bytes: 0,
    ms,
    truncated: false,
    text: "",
  };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
