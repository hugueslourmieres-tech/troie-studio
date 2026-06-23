import Link from "next/link";
import { Reveal } from "./Reveal";
import { ARTICLES_SORTED } from "@/app/[locale]/blog/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Le Journal sur la home : la liste complète des articles (rangées
 * éditoriales), pas un teaser. Aimant SEO + pédagogie. DA TROIE.
 */
export function JournalTeaser({ locale }: { locale: string }) {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow">Le Journal</p>
              <h2 className="t-display mt-6 max-w-2xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                Comprendre l&apos;IA, sans jargon.
              </h2>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ouvrir le Journal
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 border-t border-[var(--rule)] md:mt-14">
          {ARTICLES_SORTED.map((a) => (
            <li key={a.slug} className="border-b border-[var(--rule)]">
              <Link
                href={`/${locale}/blog/${a.slug}`}
                className="group flex flex-col gap-2 py-6 transition-colors md:flex-row md:items-baseline md:gap-10"
              >
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] md:w-44">
                  {a.category}
                </span>
                <span className="flex-1">
                  <span className="t-display text-xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                    {a.cardTitle ?? a.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--fg-2)]">
                    {a.description}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  {a.readingMinutes} min
                  <span aria-hidden="true" className="text-[var(--fg-2)]/35">
                    {formatDate(a.date)}
                  </span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1 group-hover:text-[var(--accent)]">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
