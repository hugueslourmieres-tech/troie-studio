"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignInForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleGoogle() {
    setError(null);

    const isConfigured =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!isConfigured) {
      // Demo mode : pas d'OAuth configuré, on entre directement
      window.location.href = next;
      return;
    }

    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/formations/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (oauthError) throw oauthError;
      // Supabase redirige vers Google, puis vers /auth/callback
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const isConfigured =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!isConfigured) {
      // Demo mode : aller direct au dashboard sans envoyer de mail
      window.location.href = next;
      return;
    }

    setStatus("sending");
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/formations/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (signInError) throw signInError;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-10 rounded-sm border border-[var(--accent)] bg-[var(--bg-2)] p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Lien envoyé
        </p>
        <h2 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
          Vérifiez votre boîte mail
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
          Un lien de connexion a été envoyé à{" "}
          <span className="font-mono text-[12px] text-[var(--accent)]">
            {email}
          </span>
          . Ouvrez-le pour entrer dans votre espace membre.
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
          Pas reçu ? Vérifiez les spams ou{" "}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-[var(--accent)] hover:underline"
          >
            renvoyer
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-5">
      {/* Connexion Google en 1 clic */}
      <button
        type="button"
        onClick={handleGoogle}
        className="group flex w-full items-center justify-center gap-3 border border-[var(--rule-strong)] bg-[var(--bg-2)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
        Continuer avec Google
      </button>

      {/* Séparateur */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[var(--rule)]" aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
          ou
        </span>
        <span className="h-px flex-1 bg-[var(--rule)]" aria-hidden="true" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]"
        >
          Votre email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          className="mt-2 w-full border border-[var(--rule)] bg-[var(--bg)] px-4 py-3 text-base text-[var(--fg)] placeholder:text-[var(--fg-2)]/55 focus:border-[var(--accent)] focus:outline-none"
        />
      </div>

      {error && (
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          ⚠ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours..." : "Recevoir le lien magique"}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          →
        </span>
      </button>

      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
        Pas de mot de passe. Pas de spam. Vous êtes connecté en 1 clic.
      </p>
      </form>
    </div>
  );
}
