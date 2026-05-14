import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlHandle = createMiddleware(routing);

/**
 * Next.js 16 renamed `middleware` to `proxy`. We delegate to next-intl for
 * locale handling, then upgrade any redirect from 307 (temporary) to 308
 * (permanent) so that social crawlers (WhatsApp, iMessage, Slack, Discord…)
 * actually follow the locale redirect and pick up the Open Graph tags.
 *
 * WhatsApp's link previewer specifically refuses to follow 307 redirects.
 */
export function proxy(request: NextRequest) {
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
