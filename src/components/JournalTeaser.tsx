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
 * Le Journal sur la home : les 5 derniers articles avec aperçu image (1 en
 * vedette + 4 en grille), covers N&B, catégorie en overlay. Le reste est sur
 * /blog. Aimant SEO + pédagogie. DA TROIE.
 */
export function JournalTeaser({ locale }: { locale: string }) {
  const [featured, ...rest] = ARTICLES_SORTED.slice(0, 5);

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

        {/* Article en vedette */}
        <Reveal>
          <Link
            href={`/${locale}/blog/${featured.slug}`}
            className="group mt-14 grid gap-8 md:mt-16 md:grid-cols-2 md:items-center md:gap-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#1a1714]">
              <Cover src={featured.cover} />
              <CategoryTag>{featured.category}</CategoryTag>
            </div>
            <div>
              <Meta minutes={featured.readingMinutes} date={featured.date} />
              <h3 className="t-display mt-4 text-3xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-4xl">
                {featured.cardTitle ?? featured.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--fg-2)]">
                {featured.description}
              </p>
              <ReadMore />
            </div>
          </Link>
        </Reveal>

        {/* 4 autres en grille */}
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 md:gap-x-12 md:gap-y-14 lg:grid-cols-4">
          {rest.map((a, i) => (
            <li key={a.slug}>
              <Reveal delay={i * 0.05}>
                <Link
                  href={`/${locale}/blog/${a.slug}`}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#1a1714]">
                    <Cover src={a.cover} />
                    <CategoryTag>{a.category}</CategoryTag>
                  </div>
                  <div className="mt-5 flex flex-1 flex-col">
                    <Meta minutes={a.readingMinutes} date={a.date} />
                    <h3 className="t-display mt-3 text-xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                      {a.cardTitle ?? a.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-2)]">
                      {a.description}
                    </p>
                    <ReadMore />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* eslint-disable-next-line @next/next/no-img-element */
function Cover({ src }: { src: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "grayscale(1) contrast(1.05) brightness(0.95)" }}
        loading="lazy"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
    </>
  );
}

function CategoryTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e6]">
      {children}
    </span>
  );
}

function Meta({ minutes, date }: { minutes: number; date: string }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
      {minutes} min · {formatDate(date)}
    </p>
  );
}

function ReadMore() {
  return (
    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
      Lire l&apos;article
      <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
    </span>
  );
}
