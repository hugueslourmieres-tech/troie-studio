import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendLifecycleEmail } from "@/lib/emails/lifecycle";

/**
 * /formations/auth/callback?code=xxx&next=/somewhere
 * Échange le code Supabase OTP contre une session puis redirige.
 * Au passage : email de bienvenue (une seule fois par compte,
 * idempotent via email_log, best-effort).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/formations/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const user = data?.user ?? data?.session?.user ?? null;
      if (user?.email) {
        // Best-effort : un échec d'email ne bloque jamais la connexion.
        try {
          await sendLifecycleEmail(user.id, user.email, "welcome");
        } catch {
          /* noop */
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Échec d'auth, retour sign-in avec erreur
  return NextResponse.redirect(
    `${origin}/formations/auth/sign-in?error=auth_failed`,
  );
}
