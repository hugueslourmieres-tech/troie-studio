import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ARTICLES, getArticle, isNoindexArticle, localizeArticle } from "../articles";
import { JsonLd, ORG_ID } from "@/components/JsonLd";
import Image from "next/image";
import { metaDescription, seoTitle } from "@/lib/seo";

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
    title: seoTitle(L.title),
    description: metaDescription(L.description),
    // Articles « formation-* » (23/10/2026) : hors index, toujours en ligne.
    // Le studio vend du conseil et de l'accompagnement, pas de la formation.
    // Ils sortent aussi du sitemap (src/app/sitemap.ts).
    ...(isNoindexArticle(slug) ? { robots: { index: false, follow: true } } : {}),
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

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Textes d'interface de la page article, par locale. Le bloc de fin
 * d'article reprend le contact de clôture du studio (deck du 1er/10/2026) :
 * « Réserver 30 min » en action principale, « Décrire mon projet » ensuite.
 * Le bloc ne pousse plus troie.app (son lien vit dans le pied de page), ni
 * l'ancienne promesse d'une attestation « qui met en règle » : l'article 4
 * de l'AI Act est une obligation de moyens, sans certificat.
 */
const UI = {
  fr: {
    back: "← Le Journal",
    ctaEyebrow: "Contact",
    ctaTitle: "Parlons de votre projet.",
    ctaBody:
      "Trente minutes pour comprendre où vous en êtes et ce que vous visez. Ensuite, nous vous envoyons une proposition écrite et un devis.",
    ctaBook: "Réserver 30 min",
    ctaProject: "Décrire mon projet",
  },
  en: {
    back: "← The Journal",
    ctaEyebrow: "Contact",
    ctaTitle: "Let's talk about your project.",
    ctaBody:
      "Thirty minutes to understand where you stand and what you aim for. Then we send you a written proposal and a quote.",
    ctaBook: "Book 30 min",
    ctaProject: "Describe my project",
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
    <article
      className="mx-auto max-w-3xl px-6 py-24 md:px-8 md:py-32"
      /* Article non traduit servi sous /en : le texte reste en français,
         on le déclare comme tel aux lecteurs d'écran et aux moteurs. */
      lang={locale === "en" && !L.hasEn ? "fr" : undefined}
    >
      <JsonLd data={jsonLd} />

      <Link
        href={`/${locale}/blog`}
        className="text-sm text-[var(--fg-2)]/70 transition hover:text-[var(--accent)] font-medium"
      >
        {ui.back}
      </Link>

      <header className="mt-8 border-b border-[var(--rule)] pb-10">
        <div className="text-sm flex items-center gap-3 text-[var(--accent)] font-medium">
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
        {/* next/image (24/09/2026) : l'image de tête était le plus grand
            élément affiché, servie en JPEG plein format. Elle part désormais
            en AVIF/WebP à la bonne largeur, en priorité (fetchPriority : `priority`
            est déprécié depuis Next 16). */}
        <Image
          src={a.cover}
          alt=""
          aria-hidden="true"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          style={a.cover.startsWith("/images/art/") ? undefined : { filter: "grayscale(1) contrast(1.1) brightness(0.92)" }}
        />
      </div>

      <div className="blog-prose mt-12">
        <Body />
      </div>

      {/* CTA de fin d'article */}
      <aside className="mt-16 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8 md:p-10">
        <p className="text-sm text-[var(--accent)] font-medium">
          {ui.ctaEyebrow}
        </p>
        <h2 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
          {ui.ctaTitle}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--fg-2)]">
          {ui.ctaBody}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm group inline-flex items-center justify-center gap-3 bg-[var(--ink)] px-7 py-4 text-white transition-colors hover:bg-[#2a2e37] font-medium"
          >
            {ui.ctaBook}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
          <Link
            href={`/${locale}/contact#projet`}
            className="text-sm group inline-flex items-center justify-center gap-3 border border-[var(--fg)] px-7 py-4 text-[var(--fg)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] font-medium"
          >
            {ui.ctaProject}
          </Link>
        </div>
      </aside>
    </article>
  );
}
