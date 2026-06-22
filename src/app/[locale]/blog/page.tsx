import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ARTICLES_SORTED } from "./articles";

const TITLE = "Le Journal TROIE : comprendre et utiliser l'IA, sans bullshit";
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
          Comprendre l&apos;IA, sans bullshit.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">
          {DESCRIPTION}
        </p>
      </header>

      <ul className="mt-16 divide-y divide-[var(--rule)] border-t border-[var(--rule)]">
        {ARTICLES_SORTED.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/${locale}/blog/${a.slug}`}
              className="group flex flex-col gap-4 py-10 transition-colors md:flex-row md:items-baseline md:justify-between md:gap-12"
            >
              <div className="md:max-w-2xl">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  <span>{a.category}</span>
                  <span className="text-[var(--fg-2)]/45">
                    {a.readingMinutes} min
                  </span>
                </div>
                <h2 className="t-display mt-3 text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                  {a.cardTitle ?? a.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--fg-2)]">
                  {a.description}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                {formatDate(a.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
