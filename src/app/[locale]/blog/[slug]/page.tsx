import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ARTICLES, getArticle, localizeArticle } from "../articles";
import { JsonLd, ORG_ID } from "@/components/JsonLd";

const BASE = "https://troiestudio.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const L = localizeArticle(a, locale);
  // Avec une vraie traduction EN : canonique par locale + hreflang.
  // Sans traduction : la version /en sert le contenu FR, donc
  // canonique unique vers /fr (sinon Google signale un duplicata).
  const canonicalLocale = L.hasEn ? locale : "fr";
  return {
    title: L.title,
    description: L.description,
    alternates: {
      canonical: `/${canonicalLocale}/blog/${slug}`,
      ...(L.hasEn
        ? { languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` } }
        : {}),
    },
    openGraph: {
      type: "article",
      url: `${BASE}/${canonicalLocale}/blog/${slug}`,
      title: L.title,
      description: L.description,
      publishedTime: a.date,
      authors: ["Hugues Lourmieres"],
      images: [{ url: `${BASE}${a.cover}` }],
    },
  };
}

export function generateStaticParams() {
  return ARTICLES.flatMap((a) =>
    ["fr", "en"].map((locale) => ({ locale, slug: a.slug })),
  );
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Textes d'interface de la page article, par locale. */
const UI = {
  fr: {
    back: "← Le Journal",
    ctaEyebrow: "Passez à l'action",
    ctaTitle: "Devenez le manager, pas le remplacé.",
    ctaBody:
      "Commencez par le QCM gratuit pour situer vos réflexes, ou parlons de votre projet en 30 minutes.",
    ctaQuiz: "Lancer le QCM gratuit",
    ctaCall: "Réserver un appel",
  },
  en: {
    back: "← The Journal",
    ctaEyebrow: "Take action",
    ctaTitle: "Become the manager, not the replaced.",
    ctaBody:
      "Start with the free quiz to see where you stand, or let's talk about your project for 30 minutes.",
    ctaQuiz: "Start the free quiz",
    ctaCall: "Book a call",
  },
} as const;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  setRequestLocale(locale);

  const L = localizeArticle(a, locale);
  const Body = L.Body;
  const ui = UI[locale === "en" && L.hasEn ? "en" : "fr"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: L.title,
    description: L.description,
    datePublished: a.date,
    dateModified: a.date,
    image: `${BASE}${a.cover}`,
    inLanguage: locale === "en" && L.hasEn ? "en" : "fr-FR",
    mainEntityOfPage: `${BASE}/${locale}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: "Hugues Lourmieres",
      url: BASE,
    },
    publisher: { "@id": ORG_ID },
    ...(a.keywords?.length ? { keywords: a.keywords.join(", ") } : {}),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32">
      <JsonLd data={jsonLd} />

      <Link
        href={`/${locale}/blog`}
        className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
      >
        {ui.back}
      </Link>

      <header className="mt-8 border-b border-[var(--rule)] pb-10">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          <span>{L.category}</span>
          <span className="text-[var(--fg-2)]/45">{a.readingMinutes} min</span>
          <span className="text-[var(--fg-2)]/45">{formatDate(a.date, locale)}</span>
        </div>
        <h1 className="t-display mt-5 text-4xl leading-[1.08] text-[var(--fg)] md:text-5xl lg:text-6xl">
          {L.title}
        </h1>
      </header>

      {/* Bannière : photo en duotone orange (traitement maison) */}
      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm bg-[#1a0f08]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.cover}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.1) brightness(0.92)" }}
        />
      </div>

      <div className="blog-prose mt-12">
        <Body />
      </div>

      {/* CTA de fin d'article */}
      <aside className="mt-16 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          {ui.ctaEyebrow}
        </p>
        <h2 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
          {ui.ctaTitle}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--fg-2)]">
          {ui.ctaBody}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/formations/quiz"
            className="group inline-flex items-center justify-center gap-3 bg-[var(--accent)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#ff8c33]"
          >
            {ui.ctaQuiz}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center justify-center gap-3 border border-[var(--fg)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
          >
            {ui.ctaCall}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </aside>
    </article>
  );
}
