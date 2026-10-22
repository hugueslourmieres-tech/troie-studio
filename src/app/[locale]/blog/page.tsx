import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { setRequestLocale } from "next-intl/server";
import { ARTICLES_SORTED, localizeArticle } from "./articles";
import { pageSocial } from "@/lib/og";

const META = {
  fr: {
    title: "Le Journal TROIE : comprendre et utiliser l'IA",
    description:
      "Articles clairs et pédagogiques pour comprendre l'IA, l'utiliser vraiment et l'intégrer au quotidien. Pour les particuliers, les familles et les pros.",
    eyebrow: "/ Le Journal",
    heading: "Le journal.",
    read: "Lire l'article",
  },
  en: {
    title: "The TROIE Journal: understanding and using AI",
    description:
      "Clear, practical articles to understand AI, actually use it, and make it part of your day. For individuals, families and professionals.",
    eyebrow: "/ The Journal",
    heading: "The journal.",
    read: "Read the article",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = META[locale === "en" ? "en" : "fr"];
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { fr: "/fr/blog", en: "/en/blog" },
    },
    // Partage social propre au Journal (sinon il hérite du titre et de
    // l'URL de l'accueil).
    ...pageSocial({
      locale,
      path: "/blog",
      title: m.title,
      description: m.description,
    }),
  };
}

export function generateStaticParams() {
  return ["fr", "en"].map((locale) => ({ locale }));
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
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
  const m = META[locale === "en" ? "en" : "fr"];

  return (
    <article className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-36">
      <header>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          {m.heading}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">
          {m.description}
        </p>
      </header>

      {/* Le journal en liste (22/10/2026) : une ligne cliquable par article,
          tout ce qui a été publié se lit d'un coup d'œil. */}
      <ul data-reveal-stagger className="mt-16 border-t border-[var(--rule)]">
        {ARTICLES_SORTED.map((a) => {
          const L = localizeArticle(a, locale);
          return (
            <li key={a.slug} className="border-b border-[var(--rule)]">
              <Link
                href={`/${locale}/blog/${a.slug}`}
                className="group -mx-4 grid grid-cols-[96px_1fr] items-center gap-4 rounded-xl px-4 py-5 transition-colors duration-200 hover:bg-[var(--bg-2)] sm:grid-cols-[168px_1fr_auto] sm:gap-7 md:py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[var(--bg-2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.cover}
                    alt=""
                    aria-hidden="true"
                    className="t-photo h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-3 text-sm text-[var(--fg-2)]">
                    <span className="font-medium text-[var(--fg)]">{L.category}</span>
                    <span>{formatDate(a.date, locale)}</span>
                    <span className="hidden sm:inline">{a.readingMinutes} min</span>
                  </p>
                  <h2 className="mt-1.5 text-lg font-medium leading-snug tracking-[-0.015em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-xl">
                    {L.cardTitle}
                  </h2>
                  <p className="mt-1.5 hidden text-[15px] leading-relaxed text-[var(--fg-2)] sm:block">
                    <span className="line-clamp-2">{L.description}</span>
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--fg)] transition-[transform,background-color,color] duration-200 group-hover:translate-x-1 group-hover:bg-[#111318] group-hover:text-white sm:inline-flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
