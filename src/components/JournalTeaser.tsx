import Link from "next/link";
import { Reveal } from "./Reveal";
import { ARTICLES_SORTED } from "@/app/[locale]/blog/articles";

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* Les articles du Journal sont ecrits en francais : sur /en, on le DIT au
   lieu de laisser le clic surprendre (pas de lien anglais qui tombe sur du
   francais sans prevenir). */
const COPY = {
  fr: { eyebrow: "Le Journal", title: "Comprendre l'IA, sans jargon.", open: "Ouvrir le Journal", read: "Lire l'article", frOnly: "" },
  en: { eyebrow: "The Journal", title: "Understand AI, without the jargon.", open: "Open the Journal", read: "Read the article", frOnly: " (in French)" },
} as const;

/**
 * Le Journal sur la home : trois articles en aperçu, image à gauche et texte
 * à droite (desktop), avec catégorie, date et lien de lecture. DA TROIE.
 */
export function JournalTeaser({ locale }: { locale: string }) {
  const items = ARTICLES_SORTED.slice(0, 3);
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow">{c.eyebrow}</p>
              <h2 className="t-display mt-6 max-w-2xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                {c.title}
              </h2>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {c.open}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 md:mt-16">
          {items.map((a, i) => (
            <li key={a.slug} className="border-t border-[var(--rule)] first:border-t-0">
              <Reveal delay={i * 0.05}>
                <Link
                  href={`/${locale}/blog/${a.slug}`}
                  className="group grid gap-6 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-12 md:py-10"
                >
                  {/* Image à gauche */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[var(--ink)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.cover}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.03)" }}
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e6]">
                      {a.category}
                    </span>
                  </div>

                  {/* Texte à droite */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                      {a.readingMinutes} min · {formatDate(a.date, locale)}{c.frOnly}
                    </p>
                    <h3 className="t-display mt-3 text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-3xl lg:text-[34px]">
                      {a.cardTitle ?? a.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                      {a.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                      {c.read}
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <Link
            href={`/${locale}/blog`}
            className="group mt-12 inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] md:mt-14"
          >
            Voir plus d&apos;articles
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
