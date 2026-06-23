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
 * Le Journal sur la home : un slideshow automatique des derniers articles.
 * Les cartes défilent en continu (pause au survol, clic actif). DA TROIE.
 */
export function JournalTeaser({ locale }: { locale: string }) {
  const items = ARTICLES_SORTED.slice(0, 8);
  // Doublé pour une boucle sans couture (translateX -50%).
  const loop = [...items, ...items];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-12 md:pt-32">
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
      </div>

      {/* Slideshow auto, pleine largeur, fondu sur les bords */}
      <div className="journal-marquee mt-14 overflow-hidden pb-24 md:mt-16 md:pb-32 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <ul className="journal-track flex w-max gap-6 px-6 md:px-12">
          {loop.map((a, i) => {
            const dup = i >= items.length;
            return (
              <li key={`${a.slug}-${i}`} className="w-[300px] shrink-0 sm:w-[340px]">
                <Link
                  href={`/${locale}/blog/${a.slug}`}
                  aria-hidden={dup || undefined}
                  tabIndex={dup ? -1 : undefined}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#1a1714]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.cover}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.05) brightness(0.95)" }}
                      loading="lazy"
                    />
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
                    <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e6]">
                      {a.category}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                      {a.readingMinutes} min · {formatDate(a.date)}
                    </p>
                    <h3 className="t-display mt-2 text-xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                      {a.cardTitle ?? a.title}
                    </h3>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
