import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { setRequestLocale } from "next-intl/server";
import { ARTICLES_SORTED, localizeArticle } from "./articles";
import { pageSocial } from "@/lib/og";

const META = {
  fr: {
    title: "Le Journal TROIE : comprendre et utiliser l'IA",
    description:
      "Vendre en ligne, référencement Google, publicité, réseaux sociaux et IA au service des ventes. Des articles clairs et sourcés, pour les PME et les e-commerces.",
    eyebrow: "/ Le Journal",
    heading: "Le journal.",
    read: "Lire l'article",
  },
  en: {
    title: "The TROIE Journal: understanding and using AI",
    description:
      "Selling online, Google search, advertising, social media and AI that serves sales. Clear, sourced articles for SMEs and online stores.",
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

  const [first, ...rest] = ARTICLES_SORTED;
  const F = localizeArticle(first, locale);
  const img = (cover: string) => `${cover.startsWith("/images/art/") ? "" : "t-photo "}h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]`;
  const meta = (cat: string, date: string, min: number) => (
    <p className="flex flex-wrap items-center gap-x-3 text-sm text-[var(--fg-2)]">
      <span className="font-medium text-[var(--fg)]">{cat}</span>
      <span>{formatDate(date, locale)}</span>
      <span>{min} min</span>
    </p>
  );

  return (
    <article className="mx-auto max-w-7xl px-5 py-24 md:px-12 md:py-32">
      <header>
        <h1 className="t-display text-5xl text-[var(--fg)] md:text-7xl">{m.heading}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">{m.description}</p>
      </header>

      {/* 26/10/2026, demande de Hugues : un vrai blog. L'article le plus
          récent à la une, puis une grille de cartes avec de grandes photos,
          des titres courts (cardTitle) et pas de résumé sur les cartes. */}
      <Link
        href={`/${locale}/blog/${first.slug}`}
        className="group mt-14 grid gap-6 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] md:mt-20 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--bg-2)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={first.cover} alt="" aria-hidden="true" className={img(first.cover)} />
        </div>
        <div>
          {meta(F.category, first.date, first.readingMinutes)}
          <h2 className="t-display mt-3 text-balance text-3xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-5xl">
            {F.cardTitle}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--fg-2)]">
            <span className="line-clamp-3">{F.description}</span>
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
            {locale === "en" ? "Read the article" : "Lire l'article"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      <ul data-reveal-stagger className="mt-16 grid gap-x-6 gap-y-12 border-t border-[var(--rule)] pt-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-3 lg:gap-x-8">
        {rest.map((a) => {
          const L = localizeArticle(a, locale);
          return (
            <li key={a.slug}>
              <Link
                href={`/${locale}/blog/${a.slug}`}
                className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--bg-2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.cover} alt="" aria-hidden="true" className={img(a.cover)} loading="lazy" />
                </div>
                <div className="mt-4">{meta(L.category, a.date, a.readingMinutes)}</div>
                <h2 className="mt-2 text-balance text-xl font-medium leading-snug tracking-[-0.015em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                  {L.cardTitle}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
