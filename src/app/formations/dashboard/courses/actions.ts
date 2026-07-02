"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getLearnState } from "@/lib/learn/data";
import { MOCK_MODULES } from "@/lib/mock-data";

/** Trophée débloqué quand un cours est terminé à 100 % (voir schema.sql). */
const COURSE_TROPHY: Record<string, string> = {
  "module-0": "premier-pas",
  "cours-01": "etudiant",
  "cours-02": "boss-niveau",
};

/**
 * Marque un module comme terminé pour l'utilisateur courant.
 * Vérifie l'accès au cours, upsert la progression, et si le cours est
 * complet, débloque le trophée associé (RPC unlock_trophy, idempotent,
 * qui crédite aussi l'XP).
 */
export async function markModuleComplete(
  courseSlug: string,
  moduleSlug: string,
): Promise<{ ok: boolean; courseCompleted?: boolean; error?: string }> {
  const modules = MOCK_MODULES[courseSlug] ?? [];
  if (!modules.some((m) => m.slug === moduleSlug)) {
    return { ok: false, error: "unknown_module" };
  }

  const state = await getLearnState();
  if (state.mode === "demo") {
    // Pas de persistance en mode démo, on fait comme si.
    return { ok: true };
  }
  if (state.mode === "anonymous" || !state.userId) {
    return { ok: false, error: "auth_required" };
  }
  if (!state.access.has(courseSlug)) {
    return { ok: false, error: "course_locked" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("learning_progress").upsert(
    {
      user_id: state.userId,
      course_slug: courseSlug,
      module_slug: moduleSlug,
      status: "completed",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,course_slug,module_slug" },
  );
  if (error) return { ok: false, error: "db_error" };

  // Cours complet ? (la progression fraîche + le module qu'on vient de finir)
  const done = new Set(
    [...state.progress.entries()]
      .filter(([k, v]) => k.startsWith(`${courseSlug}/`) && v.status === "completed")
      .map(([k]) => k.split("/")[1]),
  );
  done.add(moduleSlug);
  const courseCompleted = modules.every((m) => done.has(m.slug));

  if (courseCompleted && COURSE_TROPHY[courseSlug]) {
    await supabase.rpc("unlock_trophy", {
      p_user_id: state.userId,
      p_trophy_slug: COURSE_TROPHY[courseSlug],
    });
  }

  revalidatePath(`/formations/dashboard/courses/${courseSlug}`);
  revalidatePath("/formations/dashboard");
  return { ok: true, courseCompleted };
}
