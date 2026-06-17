import Link from "next/link";
import {
  MOCK_COURSES,
  MOCK_TROPHIES,
  MOCK_UNLOCKED_TROPHIES,
  MOCK_COURSE_ACCESS,
  MOCK_MODULE_PROGRESS,
  MOCK_MODULES,
} from "@/lib/mock-data";
import { TrophyIcon } from "./TrophyIcon";

export const metadata = {
  title: "Vue d'ensemble · Espace membre TROIE",
  robots: { index: false, follow: false },
};

export default async function DashboardOverview() {
  const accessible = MOCK_COURSES.filter((c) => MOCK_COURSE_ACCESS.has(c.slug));
  const recentTrophies = MOCK_TROPHIES.filter((t) =>
    MOCK_UNLOCKED_TROPHIES.has(t.slug),
  ).slice(0, 3);
  const lockedTrophies = MOCK_TROPHIES.filter(
    (t) => !MOCK_UNLOCKED_TROPHIES.has(t.slug),
  ).slice(0, 3);

  // Continuer where left off : dernière module en started
  const inProgress = MOCK_MODULE_PROGRESS.find((p) => p.status === "started") ?? null;
  let continueModule = null;
  let continueCourse = null;
  if (inProgress) {
    for (const courseSlug of Object.keys(MOCK_MODULES)) {
      const m = MOCK_MODULES[courseSlug].find((m) => m.id === inProgress.module_id);
      if (m) {
        continueModule = m;
        continueCourse = MOCK_COURSES.find((c) => c.slug === courseSlug);
        break;
      }
    }
  }

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero greeting */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Espace membre · vue d'ensemble
        </p>
        <h1 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
          Bon retour.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          Voici où vous en êtes. Reprenez là où vous vous êtes
          arrêté ou explorez les trophées à débloquer.
        </p>
      </section>

      {/* Continue where left off */}
      {continueModule && continueCourse && inProgress && (
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
                  {inProgress.progress_pct} %
                </span>
              </div>
              <div className="mt-2 h-[3px] w-full overflow-hidden bg-[var(--fg)]/12">
                <div
                  className="h-full bg-[var(--accent)]"
                  style={{ width: `${inProgress.progress_pct}%` }}
                />
              </div>
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
          {accessible.map((c) => (
            <Link
              key={c.id}
              href={`/formations/dashboard/courses/${c.slug}`}
              className="group flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 transition-colors hover:border-[var(--accent)] md:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                {c.level === "free" ? "Gratuit" : c.level}
              </p>
              <h3 className="t-display mt-3 text-xl text-[var(--fg)] md:text-2xl">
                {c.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--fg-2)]">
                {c.subtitle}
              </p>
              <div className="mt-5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                <span>{c.modules_count} modules · {c.duration_min} min</span>
                <span className="text-[var(--accent)] transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trophies — récents + à débloquer */}
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
