import { DashboardSidebar } from "./DashboardSidebar";
import { createClient } from "@/lib/supabase/server";
import { MOCK_PROFILE, MOCK_UNLOCKED_TROPHIES, isSupabaseConfigured } from "@/lib/mock-data";

/**
 * Layout dashboard avec sidebar fixé a gauche (desktop) et menu bottom
 * (mobile). Affiche le profil + XP + niveau en sticky top de la sidebar.
 *
 * Charge le profil côté serveur :
 *  - Supabase si configuré et user connecté
 *  - Mock data en fallback (demo mode)
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile = MOCK_PROFILE;
  let unlockedTrophyCount = MOCK_UNLOCKED_TROPHIES.size;

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

        const { count } = await supabase
          .from("user_trophies")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);
        unlockedTrophyCount = count ?? 0;
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
          />
        </aside>
        <main className="min-w-0 md:pt-4">{children}</main>
      </div>
    </div>
  );
}
