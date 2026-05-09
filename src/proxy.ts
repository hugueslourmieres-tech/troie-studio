import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handle = createMiddleware(routing);

// Next.js 16 renamed `middleware` to `proxy`. We re-export the next-intl
// handler under the new name to stay aligned with the v16 convention while
// keeping next-intl's request handling intact.
export const proxy = handle;

export const config = {
  matcher: ["/((?!api|_next|_vercel|assets|.*\\..*).*)"],
};
