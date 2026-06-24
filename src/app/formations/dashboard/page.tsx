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
import { STARTER_QUIZZES } from "../quizzes";
import { Mascot } from "@/components/Mascot";

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
      <section className="flex items-start justify-between gap-6">
        <div>
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
        </div>
        <Mascot
          src="/images/mascot/troyie-face.png"
          alt="Troyie, l'assistant IA de TROIE Studio"
          className="hidden h-32 w-32 shrink-0 object-contain md:block lg:h-36 lg:w-36"
        />
      </section>

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
              <div className="relative aspect-[16/9] overflow-hidden bg-[#1a0f08]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={q.cover}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "grayscale(1) contrast(1.1) brightness(0.92)" }}
                  loading="lazy"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[var(--accent)] opacity-55 mix-blend-multiply" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f08]/70">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#f6ead4]" aria-hidden="true">
                    <path d={q.icon} />
                  </svg>
                </div>
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
