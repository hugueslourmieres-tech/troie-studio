import Link from "next/link";
import { MOCK_COURSES, MOCK_TROPHIES, MOCK_MODULES } from "@/lib/mock-data";
import { getLearnState, getUnlockedTrophySlugs } from "@/lib/learn/data";
import { createClient } from "@/lib/supabase/server";
import { TrophyIcon } from "./TrophyIcon";
import { STARTER_QUIZZES } from "../quizzes";
import { Mascot } from "@/components/Mascot";

export const metadata = {
  title: "Vue d'ensemble · Espace membre TROIE",
  robots: { index: false, follow: false },
};

export default async function DashboardOverview() {
  const [state, unlockedTrophySlugs] = await Promise.all([
    getLearnState(),
    getUnlockedTrophySlugs(),
  ]);

  // Prénom pour l'accueil (métadonnées OAuth, sinon neutre).
  let firstName: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
    const fullName =
      (meta.full_name as string | undefined) ??
      (meta.name as string | undefined) ??
      null;
    firstName = fullName?.split(" ")[0] ?? null;
  } catch {
    /* mode démo */
  }

  const accessible = MOCK_COURSES.filter((c) => state.access.has(c.slug));
  const recentTrophies = MOCK_TROPHIES.filter((t) =>
    unlockedTrophySlugs.has(t.slug),
  ).slice(0, 3);
  const lockedTrophies = MOCK_TROPHIES.filter(
    (t) => !unlockedTrophySlugs.has(t.slug),
  ).slice(0, 3);

  // Progression par cours : modules complétés / total.
  const courseProgress = new Map<string, { done: number; total: number }>();
  for (const course of accessible) {
    const mods = MOCK_MODULES[course.slug] ?? [];
    const done = mods.filter(
      (m) => state.progress.get(`${course.slug}/${m.slug}`)?.status === "completed",
    ).length;
    courseProgress.set(course.slug, { done, total: mods.length });
  }

  // Reprendre : premier cours accessible entamé mais pas terminé,
  // on pointe son premier module non complété.
  let continueModule = null;
  let continueCourse = null;
  let continuePct = 0;
  for (const course of accessible) {
    const mods = MOCK_MODULES[course.slug] ?? [];
    if (mods.length === 0) continue;
    const { done } = courseProgress.get(course.slug) ?? { done: 0 };
    if (done > 0 && done < mods.length) {
      continueCourse = course;
      continueModule =
        mods.find(
          (m) => state.progress.get(`${course.slug}/${m.slug}`)?.status !== "completed",
        ) ?? null;
      continuePct = Math.round((done / mods.length) * 100);
      break;
    }
  }

  // Aucune progression nulle part : proposer le point de départ
  // (premier module du premier cours accessible, Module 0 gratuit).
  const hasAnyProgress = state.progress.size > 0;
  const startCourse = !hasAnyProgress
    ? accessible.find((c) => (MOCK_MODULES[c.slug] ?? []).length > 0) ?? null
    : null;
  const startModule = startCourse
    ? (MOCK_MODULES[startCourse.slug] ?? [])[0] ?? null
    : null;

  const showUpsell = state.mode === "user" && !state.hasSubscription;

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero greeting */}
      <section className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Espace membre · vue d'ensemble
          </p>
          <h1 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            {firstName ? `Bon retour, ${firstName}.` : "Bon retour."}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Voici où vous en êtes. Reprenez là où vous vous êtes
            arrêté ou explorez les trophées à débloquer.
          </p>
        </div>
        <Mascot
          src="/images/mascot/troyie-face.png"
          alt="Troyie, l'assistant IA de TROIE Studio"
          className="hidden h-32 w-32 shrink-0 object-contain md:block lg:h-36 lg:w-36"
        />
      </section>

      {/* Continue where left off */}
      {continueModule && continueCourse && (
        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Reprendre
          </p>
          <Link
            href={`/formations/dashboard/courses/${continueCourse.slug}/${continueModule.slug}`}
            className="group mt-4 block rounded-sm border border-[var(--accent)] bg-[var(--bg-2)] p-6 transition-colors hover:bg-[var(--accent)]/8 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                  {continueCourse.title}
                </p>
                <h2 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
                  {continueModule.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {continueModule.subtitle}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Reprendre
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  Progression
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {continuePct} %
                </span>
              </div>
              <div className="mt-2 h-[3px] w-full overflow-hidden bg-[var(--ink)]/12">
                <div
                  className="h-full bg-[var(--accent)]"
                  style={{ width: `${continuePct}%` }}
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Premier pas : rien d'entamé, on pointe le Module 0 gratuit */}
      {startCourse && startModule && (
        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Par où commencer
          </p>
          <Link
            href={`/formations/dashboard/courses/${startCourse.slug}/${startModule.slug}`}
            className="group mt-4 block rounded-sm border border-[var(--accent)] bg-[var(--accent)]/8 p-6 transition-colors hover:bg-[var(--accent)]/15 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                  {startCourse.title} · {startCourse.price_cents === 0 ? "gratuit" : "inclus"}
                </p>
                <h2 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
                  {startModule.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  Votre première leçon fait 10 minutes. Terminez-la et
                  votre premier trophée tombe.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Commencer
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* My courses */}
      <section>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Mes cours · {accessible.length} actifs
          </p>
          <Link
            href="/formations/dashboard/courses"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 hover:text-[var(--accent)]"
          >
            Voir tout →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
          {accessible.map((c) => {
            const prog = courseProgress.get(c.slug) ?? { done: 0, total: 0 };
            const pct = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0;
            return (
              <Link
                key={c.id}
                href={`/formations/dashboard/courses/${c.slug}`}
                className="group flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 transition-colors hover:border-[var(--accent)] md:p-7"
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                    {c.level === "free" ? "Gratuit" : c.level}
                  </p>
                  {pct === 100 && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      ✓ terminé
                    </span>
                  )}
                </div>
                <h3 className="t-display mt-3 text-xl text-[var(--fg)] md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--fg-2)]">
                  {c.subtitle}
                </p>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    <span>
                      {prog.done}/{prog.total} modules · {c.duration_min} min
                    </span>
                    <span className="text-[var(--accent)]">{pct} %</span>
                  </div>
                  <div className="mt-2 h-[3px] w-full overflow-hidden bg-[var(--ink)]/12">
                    <div
                      className="h-full bg-[var(--accent)] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Upsell abonnement, seulement sans abonnement actif */}
      {showUpsell && (
        <section className="rounded-sm bg-[var(--ink)] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                7 jours gratuits
              </p>
              <h2 className="t-display mt-3 text-2xl text-[#f5f0e6] md:text-3xl">
                Débloquez tous les cours.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f0e6]/70 md:text-base">
                Tous les cours actuels et à venir, les QCM, les prompts
                métier. Essai gratuit 7 jours, puis 29 € par mois,
                annulable en un clic.
              </p>
            </div>
            <Link
              href="/formations/tarifs"
              className="group inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6]"
            >
              Essayer gratuitement
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* Vos QCM gratuits, image duotone + picto, cliquables */}
      <section>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Vos QCM · débloqués
          </p>
          <Link
            href="/formations/quiz"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 hover:text-[var(--accent)]"
          >
            Voir tout →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {STARTER_QUIZZES.map((q) => (
            <Link
              key={q.slug}
              href={`/formations/quiz/${q.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--rule)] bg-[var(--bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={q.cover}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="t-display text-lg text-[var(--fg)] md:text-xl">
                  {q.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--fg-2)] md:text-sm">
                  {q.tagline}
                </p>
                <span className="mt-auto pt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  Lancer →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trophies, récents + à débloquer */}
      <section>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Trophées · {recentTrophies.length} / 10 débloqués
          </p>
          <Link
            href="/formations/dashboard/trophies"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 hover:text-[var(--accent)]"
          >
            Voir tout →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {recentTrophies.map((t) => (
            <TrophyCardInline key={t.id} trophy={t} unlocked />
          ))}
          {lockedTrophies.slice(0, 3 - recentTrophies.length).map((t) => (
            <TrophyCardInline key={t.id} trophy={t} unlocked={false} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TrophyCardInline({
  trophy,
  unlocked,
}: {
  trophy: { slug: string; title: string; description: string | null; icon_slug: string; tier: string; xp_reward: number };
  unlocked: boolean;
}) {
  return (
    <div
      className={`rounded-sm border p-5 transition-colors md:p-6 ${
        unlocked
          ? "border-[var(--accent)] bg-[var(--accent)]/8"
          : "border-[var(--rule)] bg-[var(--bg-2)] opacity-70"
      }`}
    >
      <TrophyIcon name={trophy.icon_slug} className="h-10 w-10 text-[var(--accent)]" />
      <h3 className={`t-display mt-4 text-lg text-[var(--fg)] md:text-xl ${unlocked ? "" : "opacity-60"}`}>
        {trophy.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-[var(--fg-2)] md:text-sm">
        {trophy.description}
      </p>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
        {trophy.tier} · {trophy.xp_reward} XP {unlocked ? "✓ obtenu" : ""}
      </p>
    </div>
  );
}
