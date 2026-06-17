import { MOCK_PROFILE, isSupabaseConfigured } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export const metadata = {
  title: "Profil · Espace membre TROIE",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  let profile: Profile = MOCK_PROFILE;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) profile = data;
      }
    } catch {
      // mock fallback
    }
  }

  const memberSinceDays = Math.floor(
    (Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="space-y-12 md:space-y-16">
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Profil
        </p>
        <h1 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-5xl">
          Votre compte.
        </h1>
      </section>

      <section className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
              Nom
            </p>
            <p className="mt-2 text-base text-[var(--fg)] md:text-lg">
              {profile.full_name || "—"}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
              Email
            </p>
            <p className="mt-2 font-mono text-sm text-[var(--fg)] md:text-base">
              {profile.email}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
              Membre depuis
            </p>
            <p className="mt-2 text-base text-[var(--fg)] md:text-lg">
              {memberSinceDays} jour{memberSinceDays > 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
              XP total
            </p>
            <p className="mt-2 t-display text-2xl text-[var(--accent)] md:text-3xl">
              {profile.xp_total}{" "}
              <span className="text-[var(--fg-2)]/55 text-sm">
                · Niveau {profile.level}
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled
          className="mt-8 inline-flex items-center gap-3 border border-[var(--rule)] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60 disabled:cursor-not-allowed"
        >
          Modifier mon profil · bientôt
        </button>
      </section>

      {/* Preferences / privacy */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Préférences & confidentialité
        </p>
        <ul className="mt-6 space-y-3">
          <li className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
              Newsletter mensuelle
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
              3 prompts utiles + 1 update produit. Désinscription en 1 clic.
            </p>
          </li>
          <li className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
              Export RGPD
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
              Téléchargez vos données personnelles. Disponible sur demande
              à <a href="mailto:contact@troiestudio.fr" className="text-[var(--accent)] hover:underline">contact@troiestudio.fr</a>.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
