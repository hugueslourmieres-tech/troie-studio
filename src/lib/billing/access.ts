import { createClient } from "@/lib/supabase/server";
import { SUBSCRIPTION_ACCESS_SLUG } from "./catalog";

export type CourseAccess =
  | { state: "demo" }
  | { state: "anonymous" }
  | { state: "locked"; userId: string }
  | { state: "granted"; userId: string; via: "purchase" | "subscription" };

/**
 * Vérifie l'accès de l'utilisateur courant à un cours.
 *
 * - "demo" : Supabase non configuré (dev local), tout est ouvert.
 * - "anonymous" : pas de session, proposer la connexion.
 * - "locked" : connecté mais ni achat du cours ni abonnement actif.
 * - "granted" : achat one-shot (à vie) ou abonnement en cours.
 *
 * Un accès direct au cours n'expire que si expires_at est posé ;
 * l'abonnement n'est valable que si expires_at est dans le futur.
 */
export async function getCourseAccess(courseSlug: string): Promise<CourseAccess> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { state: "demo" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { state: "anonymous" };

  const now = new Date().toISOString();
  const { data: rows } = await supabase
    .from("user_course_access")
    .select("course_slug, expires_at")
    .eq("user_id", user.id)
    .in("course_slug", [courseSlug, SUBSCRIPTION_ACCESS_SLUG]);

  const valid = (rows ?? []).filter(
    (r) => r.expires_at === null || r.expires_at > now,
  );

  if (valid.some((r) => r.course_slug === courseSlug)) {
    return { state: "granted", userId: user.id, via: "purchase" };
  }
  if (valid.some((r) => r.course_slug === SUBSCRIPTION_ACCESS_SLUG)) {
    return { state: "granted", userId: user.id, via: "subscription" };
  }
  return { state: "locked", userId: user.id };
}
