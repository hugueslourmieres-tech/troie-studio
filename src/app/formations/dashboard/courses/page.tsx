import Link from "next/link";
import { MOCK_COURSES, MOCK_COURSE_ACCESS } from "@/lib/mock-data";

export const metadata = {
  title: "Mes cours · Espace membre TROIE",
  robots: { index: false, follow: false },
};

export default function CoursesPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Mes cours
        </p>
        <h1 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-5xl">
          Catalogue & progression.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          Vos cours débloqués sont en orange. Les autres sont
          disponibles à l'achat.
        </p>
      </section>

      <section>
        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
          {MOCK_COURSES.map((c) => {
            const unlocked = MOCK_COURSE_ACCESS.has(c.slug);
            return (
              <li key={c.id}>
                <Link
                  href={
                    unlocked
                      ? `/formations/dashboard/courses/${c.slug}`
                      : `/formations/${c.slug === "module-0" ? "module-0" : c.slug}`
                  }
                  className={`group flex h-full flex-col rounded-sm border p-6 transition-colors md:p-8 ${
                    unlocked
                      ? "border-[var(--accent)] bg-[var(--accent)]/5 hover:bg-[var(--accent)]/10"
                      : "border-[var(--rule)] bg-[var(--bg-2)] hover:border-[var(--accent)]"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                      {c.level === "free" ? "Gratuit" : c.level}
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {unlocked ? "✓ Débloqué" : c.price_cents === 0 ? "Gratuit" : `${(c.price_cents / 100).toFixed(0)} €`}
                    </span>
                  </div>
                  <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {c.subtitle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]/80">
                    {c.description}
                  </p>
                  <div className="mt-auto flex items-baseline justify-between pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    <span>{c.modules_count} modules · {c.duration_min} min</span>
                    <span className="text-[var(--accent)] transition-transform group-hover:translate-x-1">
                      {unlocked ? "Continuer →" : "Voir →"}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
