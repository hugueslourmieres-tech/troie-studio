import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refresh the Supabase session on every request.
 * Called from src/proxy.ts (Next.js 16 renamed middleware -> proxy).
 *
 * Also enforces auth on protected routes :
 *   /formations/dashboard/* requires a logged-in user.
 *   If not -> redirect to /formations/auth/sign-in?next=<path>
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Demo mode : env vars manquantes — on laisse passer sans auth.
  // Le dashboard tournera sur les mock data.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and getUser.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtected = pathname.startsWith("/formations/dashboard");
  const isAuthPage = pathname.startsWith("/formations/auth");

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/formations/auth/sign-in";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && user && !pathname.includes("/callback")) {
    const url = request.nextUrl.clone();
    url.pathname = "/formations/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
