import Link from "next/link";
import { Reveal } from "./Reveal";
import { ARTICLES_SORTED } from "@/app/[locale]/blog/articles";

/**
 * Teaser du Journal sur la home : 3 derniers articles, mêmes cartes
 * duotone que le hub. Aimant SEO + preuve pédagogique.
 */
export function JournalTeaser({ locale }: { locale: string }) {
  const articles = ARTICLES_SORTED.slice(0, 3);

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
              Tout le Journal
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-12 md:mt-16 md:grid-cols-3">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Reveal delay={i * 0.06}>
                <Link
                  href={`/${locale}/blog/${a.slug}`}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#1a0f08]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.cover}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.1) brightness(0.92)" }}
                      loading="lazy"
                    />
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
                    <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[#f6ead4]">
                      {a.category}
                    </span>
                  </div>
                  <h3 className="t-display mt-5 text-xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                    {a.cardTitle ?? a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">
                    {a.description}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
