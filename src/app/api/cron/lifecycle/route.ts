import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendLifecycleEmail,
  type LifecycleEmailType,
} from "@/lib/emails/lifecycle";

export const maxDuration = 60;

/**
 * GET /api/cron/lifecycle : appelé une fois par jour (vercel.json).
 *
 * - welcome (backstop) : comptes créés depuis < 48 h sans bienvenue
 *   (au cas où le callback n'a pas tourné, ex. connexion par mot de
 *   passe sans lien email).
 * - trial_j2 / trial_j5 : abonnements (essai 7 j) démarrés il y a
 *   2 à 3 jours / 5 à 6 jours.
 * - inactive_j3 / inactive_j14 : dernière activité (progression, sinon
 *   création du compte) il y a 3 à 4 jours / 14 à 15 jours.
 *
 * Chaque type d'email ne part qu'une fois par compte (email_log).
 * Sécurité : header x-vercel-cron (posé par Vercel, non usurpable)
 * ou Authorization: Bearer CRON_SECRET si la variable existe.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const isVercelCron = request.headers.get("x-vercel-cron") !== null;
  if (secret ? auth !== `Bearer ${secret}` : !isVercelCron) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "supabase_not_configured" }, { status: 503 });
  }

  const now = Date.now();
  const DAY = 86_400_000;
  const between = (iso: string, minDays: number, maxDays: number) => {
    const age = now - new Date(iso).getTime();
    return age >= minDays * DAY && age < maxDays * DAY;
  };

  const [{ data: profiles }, { data: subs }, { data: progress }] =
    await Promise.all([
      admin.from("profiles").select("id, email, created_at"),
      admin
        .from("user_course_access")
        .select("user_id, granted_at")
        .eq("course_slug", "abonnement")
        .eq("source", "subscription"),
      admin
        .from("learning_progress")
        .select("user_id, updated_at")
        .order("updated_at", { ascending: false }),
    ]);

  const emailById = new Map(
    (profiles ?? []).map((p) => [p.id, { email: p.email, created: p.created_at }]),
  );
  const lastActivity = new Map<string, string>();
  for (const row of progress ?? []) {
    if (!lastActivity.has(row.user_id)) lastActivity.set(row.user_id, row.updated_at);
  }

  const queue: { userId: string; email: string; type: LifecycleEmailType }[] = [];

  // Bienvenue (backstop) : comptes récents.
  for (const p of profiles ?? []) {
    if (p.email && between(p.created_at, 0, 2)) {
      queue.push({ userId: p.id, email: p.email, type: "welcome" });
    }
  }

  // Essai gratuit : J2 et J5.
  for (const s of subs ?? []) {
    const u = emailById.get(s.user_id);
    if (!u?.email) continue;
    if (between(s.granted_at, 2, 3)) queue.push({ userId: s.user_id, email: u.email, type: "trial_j2" });
    if (between(s.granted_at, 5, 6)) queue.push({ userId: s.user_id, email: u.email, type: "trial_j5" });
  }

  // Inactivité : J+3 et J+14 depuis la dernière activité.
  for (const p of profiles ?? []) {
    if (!p.email) continue;
    const ref = lastActivity.get(p.id) ?? p.created_at;
    if (between(ref, 3, 4)) queue.push({ userId: p.id, email: p.email, type: "inactive_j3" });
    if (between(ref, 14, 15)) queue.push({ userId: p.id, email: p.email, type: "inactive_j14" });
  }

  const results = { sent: 0, duplicate: 0, skipped: 0 };
  for (const job of queue) {
    const r = await sendLifecycleEmail(job.userId, job.email, job.type);
    results[r] += 1;
  }

  return NextResponse.json({ ok: true, candidates: queue.length, ...results });
}
