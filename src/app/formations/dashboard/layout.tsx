import { DashboardSidebar } from "./DashboardSidebar";
import { createClient } from "@/lib/supabase/server";
import { SUBSCRIPTION_ACCESS_SLUG } from "@/lib/billing/catalog";
import { MOCK_PROFILE, MOCK_UNLOCKED_TROPHIES, isSupabaseConfigured } from "@/lib/mock-data";

/**
 * Layout dashboard avec sidebar fixé a gauche (desktop) et menu bottom
 * (mobile). Affiche le profil + XP + niveau en sticky top de la sidebar.
 *
 * Charge le profil côté serveur :
 *  - Supabase si configuré et user connecté
 *  - Mock data en fallback (demo mode)
 *
 * Au passage, complète le profil avec les infos du fournisseur OAuth
 * (nom complet, avatar Google) si elles manquent, et calcule le streak
 * réel (jours consécutifs avec progression).
 */

/** Jours consécutifs d'activité, en remontant depuis aujourd'hui. */
function computeStreak(isoDates: string[]): number {
  const days = new Set(isoDates.map((d) => d.slice(0, 10)));
  const today = new Date();
  const key = (d: Date) => d.toISOString().slice(0, 10);

  // Le streak tient si la dernière activité date d'aujourd'hui ou d'hier.
  const cursor = new Date(today);
  if (!days.has(key(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  if (!days.has(key(cursor))) return 1; // connecté aujourd'hui = jour 1

  let streak = 0;
  while (days.has(key(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return Math.max(streak, 1);
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile = MOCK_PROFILE;
  let unlockedTrophyCount = MOCK_UNLOCKED_TROPHIES.size;
  let streak = 1;
  let plan: "subscription" | "lifetime" | "free" = "free";

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const [{ data }, { count }, { data: accessRows }, { data: progressRows }] =
          await Promise.all([
            supabase.from("profiles").select("*").eq("id", user.id).single(),
            supabase
              .from("user_trophies")
              .select("*", { count: "exact", head: true })
              .eq("user_id", user.id),
            supabase
              .from("user_course_access")
              .select("course_slug, source, expires_at")
              .eq("user_id", user.id),
            supabase
              .from("learning_progress")
              .select("updated_at")
              .eq("user_id", user.id),
          ]);

        if (data) profile = data;
        unlockedTrophyCount = count ?? 0;

        // Complète le profil avec les infos OAuth (Google) si absentes.
        const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
        const metaName =
          (meta.full_name as string | undefined) ??
          (meta.name as string | undefined) ??
          "";
        const metaAvatar =
          (meta.avatar_url as string | undefined) ??
          (meta.picture as string | undefined) ??
          null;
        if (data && ((!data.full_name && metaName) || (!data.avatar_url && metaAvatar))) {
          const patch: { full_name?: string; avatar_url?: string } = {};
          if (!data.full_name && metaName) patch.full_name = metaName;
          if (!data.avatar_url && metaAvatar) patch.avatar_url = metaAvatar;
          await supabase.from("profiles").update(patch).eq("id", user.id);
          profile = { ...data, ...patch };
        }

        const now = new Date().toISOString();
        const valid = (accessRows ?? []).filter(
          (r) => r.expires_at === null || r.expires_at > now,
        );
        if (valid.some((r) => r.course_slug === SUBSCRIPTION_ACCESS_SLUG)) {
          plan = "subscription";
        } else if (valid.length > 0) {
          plan = "lifetime";
        }

        streak = computeStreak((progressRows ?? []).map((r) => r.updated_at));
      }
    } catch {
      // Fallback to mock
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20 md:pt-24">
      <div className="mx-auto grid max-w-7xl gap-0 px-6 pb-32 md:grid-cols-[280px_1fr] md:gap-10 md:px-12">
        <aside className="md:sticky md:top-28 md:h-[calc(100vh-7rem)] md:overflow-y-auto md:border-r md:border-[var(--rule)] md:pr-8">
          <DashboardSidebar
            profile={profile}
            unlockedTrophyCount={unlockedTrophyCount}
            streak={streak}
            plan={plan}
          />
        </aside>
        <main className="min-w-0 md:pt-4">{children}</main>
      </div>
    </div>
  );
}
