import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ARTICLES_SORTED } from "./articles";

const TITLE = "Le Journal TROIE : comprendre et utiliser l'IA";
const DESCRIPTION =
  "Articles clairs et pédagogiques pour comprendre l'IA, l'utiliser vraiment et l'intégrer au quotidien. Pour les particuliers, les familles et les pros.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { fr: "/fr/blog", en: "/en/blog" },
    },
  };
}

export function generateStaticParams() {
  return ["fr", "en"].map((locale) => ({ locale }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-36">
      <header>
        <p className="t-eyebrow">/ Le Journal</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          Comprendre l&apos;IA.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">
          {DESCRIPTION}
        </p>
      </header>

      <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {ARTICLES_SORTED.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/${locale}/blog/${a.slug}`}
              className="group flex h-full flex-col"
            >
              {/* Aperçu : photo en duotone orange (traitement maison) */}
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
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent"
                />
                <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[#f6ead4]">
                  {a.category}
                </span>
              </div>

              <div className="mt-5 flex flex-1 flex-col">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  <span>{a.readingMinutes} min</span>
                  <span>{formatDate(a.date)}</span>
                </div>
                <h2 className="t-display mt-3 text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-[28px]">
                  {a.cardTitle ?? a.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--fg-2)]">
                  {a.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 transition-colors group-hover:text-[var(--accent)]">
                  Lire l&apos;article
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
