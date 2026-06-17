import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlHandle = createMiddleware(routing);

/**
 * Next.js 16 renamed `middleware` to `proxy`. Responsibilities:
 *
 *   1. `ia.troiestudio.fr` subdomain → rewrite to /ia/* and skip i18n,
 *      so the dedicated B2B AI landing is served at the subdomain root
 *      without forcing a /fr or /en prefix.
 *   2. Main domain → delegate to next-intl for locale handling, then
 *      upgrade any 307 redirect to 308 so social crawlers (WhatsApp,
 *      iMessage, Slack, Discord) actually follow the locale redirect
 *      and pick up the Open Graph tags. WhatsApp specifically refuses
 *      to follow 307.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();

  // ── IA subdomain ──────────────────────────────────────────────────
  // `ia.troiestudio.fr` (and previews like `ia.troiestudio-xxx.vercel.app`
  // matter only when production cuts a preview; we keep the check on the
  // literal `ia.` prefix which covers both).
  if (host.startsWith("ia.")) {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/ia")) {
      url.pathname = url.pathname === "/" ? "/ia" : `/ia${url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // ── Main domain, `/ia*` path : bypass next-intl too ───────────────
  // The IA landing must work at troiestudio.fr/ia as well — without
  // this guard, next-intl would 308-redirect to /fr/ia which doesn't
  // exist as a localized route.
  if (request.nextUrl.pathname.startsWith("/ia")) {
    return NextResponse.next();
  }

  // ── Main domain : delegate to next-intl ───────────────────────────
  const response = intlHandle(request);

  if (response && response.status === 307) {
    const location = response.headers.get("location");
    if (location) {
      return NextResponse.redirect(new URL(location, request.url), 308);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|assets|.*\\..*).*)"],
};
