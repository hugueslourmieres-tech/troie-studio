// Serveur uniquement (createClient lit les cookies Next).
import { createClient } from "@/lib/supabase/server";
import { SUBSCRIPTION_ACCESS_SLUG } from "@/lib/billing/catalog";
import {
  MOCK_COURSES,
  MOCK_MODULES,
  MOCK_COURSE_ACCESS,
  MOCK_MODULE_PROGRESS,
  MOCK_UNLOCKED_TROPHIES,
} from "@/lib/mock-data";

export type ModuleState = { status: string; progress_pct: number };

export type LearnState = {
  /** demo = Supabase absent ; anonymous = pas de session ; user = connecté. */
  mode: "demo" | "anonymous" | "user";
  userId: string | null;
  /** Slugs de cours accessibles (gratuits, achetés, ou via abonnement). */
  access: Set<string>;
  /** `${courseSlug}/${moduleSlug}` → progression. */
  progress: Map<string, ModuleState>;
  /** Abonnement actif (accès plateforme complet). */
  hasSubscription: boolean;
};

const FREE_COURSE_SLUGS = MOCK_COURSES.filter((c) => c.price_cents === 0).map(
  (c) => c.slug,
);

/** Progression mock (module_id → slugs) pour le mode démo. */
function demoProgress(): Map<string, ModuleState> {
  const map = new Map<string, ModuleState>();
  for (const p of MOCK_MODULE_PROGRESS) {
    for (const [courseSlug, mods] of Object.entries(MOCK_MODULES)) {
      const mod = mods.find((m) => m.id === p.module_id);
      if (mod) {
        map.set(`${courseSlug}/${mod.slug}`, {
          status: p.status,
          progress_pct: p.progress_pct,
        });
      }
    }
  }
  return map;
}

/**
 * État d'apprentissage de l'utilisateur courant : accès aux cours
 * (achats one-shot, abonnement actif, cours gratuits) + progression.
 * En mode démo (Supabase non configuré), renvoie les mocks historiques.
 */
export async function getLearnState(): Promise<LearnState> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return {
      mode: "demo",
      userId: null,
      access: new Set(MOCK_COURSE_ACCESS),
      progress: demoProgress(),
      hasSubscription: false,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      mode: "anonymous",
      userId: null,
      access: new Set(FREE_COURSE_SLUGS),
      progress: new Map(),
      hasSubscription: false,
    };
  }

  const now = new Date().toISOString();
  const [{ data: accessRows }, { data: progressRows }] = await Promise.all([
    supabase
      .from("user_course_access")
      .select("course_slug, expires_at")
      .eq("user_id", user.id),
    supabase
      .from("learning_progress")
      .select("course_slug, module_slug, status")
      .eq("user_id", user.id),
  ]);

  const access = new Set<string>(FREE_COURSE_SLUGS);
  const valid = (accessRows ?? []).filter(
    (r) => r.expires_at === null || r.expires_at > now,
  );
  const hasSubscription = valid.some(
    (r) => r.course_slug === SUBSCRIPTION_ACCESS_SLUG,
  );
  if (hasSubscription) {
    for (const c of MOCK_COURSES) access.add(c.slug);
  }
  for (const r of valid) {
    if (r.course_slug !== SUBSCRIPTION_ACCESS_SLUG) access.add(r.course_slug);
  }

  const progress = new Map<string, ModuleState>();
  for (const r of progressRows ?? []) {
    progress.set(`${r.course_slug}/${r.module_slug}`, {
      status: r.status,
      progress_pct: r.status === "completed" ? 100 : 0,
    });
  }

  return { mode: "user", userId: user.id, access, progress, hasSubscription };
}

/**
 * Slugs des trophées débloqués par l'utilisateur courant.
 * Mode démo : mocks. Anonyme : aucun.
 */
export async function getUnlockedTrophySlugs(): Promise<Set<string>> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return new Set(MOCK_UNLOCKED_TROPHIES);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data } = await supabase
    .from("user_trophies")
    .select("trophies(slug)")
    .eq("user_id", user.id);

  const slugs = new Set<string>();
  for (const row of data ?? []) {
    const t = row.trophies as unknown as { slug: string } | null;
    if (t?.slug) slugs.add(t.slug);
  }
  return slugs;
}
