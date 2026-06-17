import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MOCK_COURSES,
  MOCK_MODULES,
  MOCK_COURSE_ACCESS,
  MOCK_MODULE_PROGRESS,
} from "@/lib/mock-data";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return MOCK_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  return {
    title: course ? `${course.title} · Espace membre` : "Cours · Espace membre",
    robots: { index: false, follow: false },
  };
}

export default async function CourseDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const unlocked = MOCK_COURSE_ACCESS.has(slug);
  const modules = MOCK_MODULES[slug] ?? [];
  const progressById = Object.fromEntries(
    MOCK_MODULE_PROGRESS.map((p) => [p.module_id, p]),
  );

  return (
    <div className="space-y-12 md:space-y-16">
      <section>
        <Link
          href="/formations/dashboard/courses"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 hover:text-[var(--accent)]"
        >
          ← Tous les cours
        </Link>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          {course.level === "free" ? "Gratuit" : course.level} · {course.modules_count} modules · {course.duration_min} min
        </p>
        <h1 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
          {course.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          {course.description}
        </p>
        {!unlocked && (
          <Link
            href={`/formations/${slug === "module-0" ? "module-0" : slug}`}
            className="mt-8 inline-flex items-center gap-3 bg-[var(--fg)] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
          >
            Débloquer · {(course.price_cents / 100).toFixed(0)} €
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </section>

      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Modules · {modules.length}
        </p>
        <ol className="mt-6 space-y-3">
          {modules.map((m, i) => {
            const progress = progressById[m.id];
            const completed = progress?.status === "completed";
            const started = progress?.status === "started";
            const canAccess = unlocked || m.is_free;
            return (
              <li key={m.id}>
                {canAccess ? (
                  <Link
                    href={`/formations/dashboard/courses/${slug}/${m.slug}`}
                    className="group flex flex-wrap items-start justify-between gap-4 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-5 transition-colors hover:border-[var(--accent)] md:p-6"
                  >
                    <ModuleHeader
                      i={i}
                      title={m.title}
                      subtitle={m.subtitle}
                      duration={m.duration_min}
                      completed={completed}
                      started={started}
                      progressPct={progress?.progress_pct ?? 0}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-transform group-hover:translate-x-1">
                      {completed ? "Revoir" : started ? "Reprendre" : "Commencer"} →
                    </span>
                  </Link>
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-4 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-5 opacity-60 md:p-6">
                    <ModuleHeader
                      i={i}
                      title={m.title}
                      subtitle={m.subtitle}
                      duration={m.duration_min}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                      🔒 Locked
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

function ModuleHeader({
  i,
  title,
  subtitle,
  duration,
  completed,
  started,
  progressPct,
}: {
  i: number;
  title: string;
  subtitle: string | null;
  duration: number;
  completed?: boolean;
  started?: boolean;
  progressPct?: number;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          {String(i + 1).padStart(2, "0")}
        </span>
        {completed && (
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
            ✓ Terminé
          </span>
        )}
        {started && !completed && (
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
            En cours · {progressPct} %
          </span>
        )}
      </div>
      <h3 className="t-display mt-3 text-lg text-[var(--fg)] md:text-xl">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
          {subtitle}
        </p>
      )}
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
        {duration} min
      </p>
    </div>
  );
}
