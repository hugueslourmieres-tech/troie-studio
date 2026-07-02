import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_COURSES, MOCK_MODULES } from "@/lib/mock-data";
import { getLearnState } from "@/lib/learn/data";
import { getModuleContent } from "@/lib/learn/content";
import { LessonMarkdown } from "@/components/LessonMarkdown";
import { CompleteModuleButton } from "@/components/CompleteModuleButton";

type Params = Promise<{ slug: string; moduleSlug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, moduleSlug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  const mod = MOCK_MODULES[slug]?.find((m) => m.slug === moduleSlug);
  return {
    title: mod ? `${mod.title} · ${course?.title}` : "Module · TROIE",
    robots: { index: false, follow: false },
  };
}

export default async function ModuleViewerPage({ params }: { params: Params }) {
  const { slug, moduleSlug } = await params;
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();
  const modules = MOCK_MODULES[slug] ?? [];
  const mod = modules.find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const state = await getLearnState();
  const canAccess = state.access.has(slug) || mod.is_free;
  const moduleCompleted =
    state.progress.get(`${slug}/${mod.slug}`)?.status === "completed";
  const content = canAccess ? await getModuleContent(slug, mod.slug) : null;

  if (!canAccess) {
    return (
      <div className="space-y-8">
        <Link
          href={`/formations/dashboard/courses/${slug}`}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 hover:text-[var(--accent)]"
        >
          ← {course.title}
        </Link>
        <div className="rounded-sm border border-[var(--accent)] bg-[var(--bg-2)] p-8 md:p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Locked
          </p>
          <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
            Ce module nécessite l'achat du cours
          </h2>
          <Link
            href={`/formations/${slug}`}
            className="mt-6 inline-flex items-center gap-3 bg-[var(--fg)] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
          >
            Voir le cours
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    );
  }

  const idx = modules.findIndex((m) => m.id === mod.id);
  const prev = idx > 0 ? modules[idx - 1] : null;
  const next = idx < modules.length - 1 ? modules[idx + 1] : null;

  return (
    <div className="space-y-10 md:space-y-14">
      <section>
        <Link
          href={`/formations/dashboard/courses/${slug}`}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 hover:text-[var(--accent)]"
        >
          ← {course.title}
        </Link>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Module {String(idx + 1).padStart(2, "0")} · {mod.duration_min} min
        </p>
        <h1 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-5xl">
          {mod.title}
        </h1>
        {mod.subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {mod.subtitle}
          </p>
        )}
      </section>

      {/* Vidéo placeholder */}
      <section>
        <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-[#0e0a07]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--accent)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-16 w-16"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
              Vidéo · à venir
            </p>
          </div>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
          La version vidéo arrive bientôt. Le contenu écrit ci-dessous est complet.
        </p>
      </section>

      {/* Contenu écrit du module */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Contenu écrit
        </p>
        {content ? (
          <LessonMarkdown markdown={content} />
        ) : (
          <div className="mt-4 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-8">
            <p className="text-base leading-relaxed text-[var(--fg-2)]">
              {mod.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--fg-2)]">
              Le contenu écrit de ce module arrive très prochainement.
            </p>
          </div>
        )}
      </section>

      {/* Marquer comme terminé (persiste la progression) */}
      <section>
        <CompleteModuleButton
          courseSlug={slug}
          moduleSlug={mod.slug}
          initiallyCompleted={moduleCompleted}
        />
      </section>

      {/* Nav prev/next */}
      <section className="flex items-center justify-between border-t border-[var(--rule)] pt-8">
        {prev ? (
          <Link
            href={`/formations/dashboard/courses/${slug}/${prev.slug}`}
            className="group font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 hover:text-[var(--accent)]"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/formations/dashboard/courses/${slug}/${next.slug}`}
            className="group font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            href={`/formations/dashboard/courses/${slug}`}
            className="group font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            Retour au cours ✓
          </Link>
        )}
      </section>
    </div>
  );
}
