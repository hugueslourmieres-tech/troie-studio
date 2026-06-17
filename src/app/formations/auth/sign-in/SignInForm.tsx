"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignInForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

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
    <form onSubmit={handleSubmit} className="mt-10 space-y-4">
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
        className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] disabled:opacity-60"
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
  );
}
