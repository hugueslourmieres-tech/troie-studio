import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import {
  PROGRAMMES,
  SESSIONS,
  FINANCEMENT,
  PDF_PROGRAMME,
  formatPrice,
  formatLabel,
  type Programme,
} from "@/lib/data/formations";

const SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "formations" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/formations`,
      languages: {
        fr: "/fr/formations",
        en: "/en/formations",
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE}/${locale}/formations`,
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: "/images/brand/og-image.png",
          width: 1200,
          height: 630,
          alt: t("metaTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/images/brand/og-image.png"],
    },
  };
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  return <FormationsView locale={locale} lang={lang} />;
}

function FormationsView({ locale, lang }: { locale: string; lang: "fr" | "en" }) {
  const t = useTranslations("formations");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const tableHeaders = t.raw("tableHeaders") as {
    programme: string;
    duration: string;
    audience: string;
    formats: string;
    price: string;
  };
  const faqItems = t.raw("faqItems") as Array<{ q: string; a: string }>;

  // JSON-LD : a Service for the whole offer + a Course per programme.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: t("metaTitle"),
        description: t("metaDescription"),
        provider: { "@id": "https://troiestudio.fr/#organization" },
        areaServed: "FR",
        serviceType: "AI training",
      },
      ...PROGRAMMES.map((p) => ({
        "@type": "Course",
        name: p.title[lang],
        description: p.objective[lang],
        provider: { "@id": "https://troiestudio.fr/#organization" },
        timeRequired: p.duration[lang],
        educationalLevel:
          p.slug === "decouverte"
            ? "Beginner"
            : p.slug === "pratique"
              ? "Intermediate"
              : "Advanced",
        url: `${SITE}/${locale}/formations#${p.slug}`,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: p.formats.includes("remote") ? "online" : "onsite",
          courseWorkload: p.duration[lang],
        },
      })),
      // FAQPage, chance d'apparaître en featured snippet / accordeon SERP
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.a,
          },
        })),
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero, fond gravure classique (Diane chasseresse + Cupidon)
          + voile crème pour lisibilité, mêmes tokens que /agents pour
          cohérence visuelle entre les deux pages d'offre. */}
      <header className="relative isolate overflow-hidden border-t border-[var(--accent)] scroll-mt-24">
        {/* Background engraving */}
        {/* eslint-disable-next-line @next/next/no-img-élément */}
        <img
          src="/images/formations/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ filter: "grayscale(1) brightness(1.02) contrast(0.94)" }}
        />
        {/* Cream veil + left-to-right fade so the body copy stays readable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[var(--bg)]/72"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/70 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24">
          <Reveal>
            <p className="t-eyebrow">{t("heroEyebrow")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="t-display mt-8 max-w-4xl text-5xl text-[var(--fg)] md:text-7xl lg:text-[88px]">
              {t("heroTitle")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg">
              {t("heroSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <Link
                href={`/${locale}/contact?subject=formation-intra`}
                className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {t("ctaPrimary")}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href={`/${locale}/contact?subject=formation-inter`}
                className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)]"
              >
                {t("ctaSecondary")}
              </Link>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)]"
              >
                {t("ctaAudit")} →
              </a>
              {PDF_PROGRAMME && (
                <a
                  href={PDF_PROGRAMME}
                  download
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)]"
                >
                  {t("downloadProgramme")} ↓
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Banner B2C cross-link · vers les cours en ligne (/formations) */}
      <section className="border-t border-[var(--accent)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-12 md:py-7">
          <a
            href="/formations"
            className="group flex flex-wrap items-end justify-between gap-4"
          >
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Vous cherchez quelque chose pour vous ?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                Cours en ligne (solo &amp; équipe), packs de system prompts à partir de 29 €, Module 0 gratuit.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-[11px]">
              Voir les cours en ligne
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>
      </section>

      {/* Stat band */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <Reveal>
            <ul className="grid gap-10 md:grid-cols-3 md:gap-16">
              {stats.map((s) => (
                <li key={s.label} className="flex flex-col">
                  <span className="t-display text-4xl text-[var(--fg)] md:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Programmes intro */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="t-eyebrow">{t("programmesEyebrow")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {t("programmesTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              {t("programmesIntro")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 packs cliquables, pricing cards colorées.
          Pas de Reveal wrapper sur la grille : on garantit la
          visibilite des packs sur mobile ou la grille est plus
          haute que le viewport et l'IntersectionObserver pouvait
          ne jamais tirer. */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 pb-20 md:px-12 md:pb-28">
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
            {PROGRAMMES.map((p, i) => (
              <PackCard
                key={p.slug}
                p={p}
                lang={lang}
                locale={locale}
                variant={i === 1 ? "accent" : i === 2 ? "dark" : "cream"}
                featured={i === 1}
              />
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-[var(--fg-2)]/70 md:text-base">
              {t("packPriceQuoteHint")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sessions inter (only when SESSIONS is non-empty) */}
      {SESSIONS.length > 0 && (
        <section className="border-t border-[var(--accent)]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
            <Reveal>
              <p className="t-eyebrow">{t("sessionsEyebrow")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 divide-y divide-[var(--rule)] border-t border-[var(--rule)]">
                {SESSIONS.map((s, idx) => {
                  const prog = PROGRAMMES.find(
                    (p) => p.slug === s.programmeSlug,
                  );
                  if (!prog) return null;
                  const dateLabel = new Date(s.date).toLocaleDateString(
                    lang === "fr" ? "fr-FR" : "en-GB",
                    { day: "2-digit", month: "long", year: "numeric" },
                  );
                  return (
                    <li
                      key={`${s.programmeSlug}-${idx}`}
                      className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10"
                    >
                      <div>
                        <p className="t-display text-2xl text-[var(--fg)] md:text-3xl">
                          {prog.title[lang]}
                        </p>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                          {dateLabel} · {s.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                          {s.spots} {t("spotsLeft")}
                        </span>
                        <Link
                          href={`/${locale}/contact?subject=formation-inter-${s.programmeSlug}-${s.date}`}
                          className="group inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                          {t("ctaSecondary")} →
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Comparatif format / durée / public / prix */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="t-eyebrow">{t("tableEyebrow")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl">
              {t("tableTitle")}
            </h2>
          </Reveal>

          {/* Desktop table */}
          <Reveal delay={0.2}>
            <div className="mt-12 hidden md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-y border-[var(--rule)]">
                    <th className="py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.programme}
                    </th>
                    <th className="py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.duration}
                    </th>
                    <th className="py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.audience}
                    </th>
                    <th className="py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.formats}
                    </th>
                    <th className="py-5 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.price}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PROGRAMMES.map((p) => (
                    <tr
                      key={p.slug}
                      className="border-b border-[var(--rule)] align-top"
                    >
                      <td className="py-6 pr-4">
                        <span className="t-display text-xl text-[var(--fg)] md:text-2xl">
                          <span className="text-[var(--accent)]">
                            {p.index}.{" "}
                          </span>
                          {p.title[lang]}
                        </span>
                      </td>
                      <td className="py-6 pr-4 text-sm text-[var(--fg-2)] md:text-base">
                        {p.duration[lang]}
                      </td>
                      <td className="py-6 pr-4 text-sm text-[var(--fg-2)] md:text-base">
                        {p.audience[lang]}
                      </td>
                      <td className="py-6 pr-4 text-sm text-[var(--fg-2)] md:text-base">
                        {p.formats
                          .map((f) => formatLabel(f, lang))
                          .join(" · ")}
                      </td>
                      <td className="py-6 text-right text-sm text-[var(--fg-2)] md:text-base">
                        {formatPrice(p.priceFrom, lang)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobile: stacked cards */}
          <Reveal delay={0.2}>
            <ul className="mt-10 space-y-6 md:hidden">
              {PROGRAMMES.map((p) => (
                <li
                  key={p.slug}
                  className="border-t border-[var(--rule)] pt-6"
                >
                  <p className="t-display text-2xl text-[var(--fg)]">
                    <span className="text-[var(--accent)]">{p.index}. </span>
                    {p.title[lang]}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[var(--fg-2)]">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.duration}
                    </dt>
                    <dd>{p.duration[lang]}</dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.audience}
                    </dt>
                    <dd>{p.audience[lang]}</dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.formats}
                    </dt>
                    <dd>
                      {p.formats.map((f) => formatLabel(f, lang)).join(" · ")}
                    </dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.price}
                    </dt>
                    <dd>{formatPrice(p.priceFrom, lang)}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Sur-mesure */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <Reveal>
                <p className="t-eyebrow">{t("customEyebrow")}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl">
                  {t("customTitle")}
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.15}>
                <p className="max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                  {t("customBody")}
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <Link
                  href={`/${locale}/contact?subject=audit-ia`}
                  className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {t("customCta")}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Financement */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <Reveal>
                <p className="t-eyebrow">{t("financementEyebrow")}</p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <p className="max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                  {FINANCEMENT.qualiopi
                    ? t("financementQualiopiBody")
                    : t("financementBody")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Audit gratuit band */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="t-eyebrow">{t("auditBandEyebrow")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {t("auditBandTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              {t("auditBandSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("auditBandCta")}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <Reveal>
                <p className="t-eyebrow">{t("faqEyebrow")}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl">
                  {t("faqTitle")}
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.15}>
                <ul className="space-y-2 border-t border-[var(--rule)]">
                  {faqItems.map((item) => (
                    <li
                      key={item.q}
                      className="border-b border-[var(--rule)]"
                    >
                      <details className="group py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--accent)]">
                          <span>{item.q}</span>
                          <span
                            aria-hidden="true"
                            className="font-sans text-base text-[var(--fg-2)] transition-transform duration-300 group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                          {item.a}
                        </p>
                      </details>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-7">
              <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">
                {t("finalCtaTitle")}
              </h2>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
                {t("finalCtaSubtitle")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Link
                  href={`/${locale}/contact?subject=formation-intra`}
                  className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {t("finalCtaPrimary")}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)]"
                >
                  {t("finalCtaSecondary")} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

type PackVariant = "cream" | "accent" | "dark";

/**
 * Theme tokens per pack variant. cream = entry, accent = orange Hermès
 * (featured), dark = ink premium. All three keep the same internal
 * rhythm so the prices and CTAs sit on the same baseline.
 */
const VARIANT_STYLES: Record<
  PackVariant,
  {
    card: string;
    title: string;
    sub: string;
    label: string;
    body: string;
    bullet: string;
    bulletCheckBg: string;
    bulletCheckColor: string;
    rule: string;
    chip: string;
    priceLabel: string;
    price: string;
    cta: string;
    iconFilter: string;
    toolBg: string;
  }
> = {
  cream: {
    card: "bg-[#fdfaf3] hover:bg-[#f5f0e6]",
    title: "text-[#1a1714]",
    sub: "text-[#4a4239]/85",
    label: "text-[#4a4239]/60",
    body: "text-[#4a4239]",
    bullet: "text-[#4a4239]",
    bulletCheckBg: "bg-[#f37b22]",
    bulletCheckColor: "text-[#fdfaf3]",
    rule: "border-[#1a17141a]",
    chip: "border-[#1a171433] text-[#4a4239]",
    priceLabel: "text-[#4a4239]/60",
    price: "text-[#1a1714]",
    cta: "bg-[#1a1714] text-[#fdfaf3] hover:bg-[#f37b22]",
    iconFilter: "brightness(0)",
    toolBg: "bg-[#1a17140a]",
  },
  accent: {
    card: "bg-[#f37b22] hover:bg-[#d96100] shadow-[0_30px_60px_-30px_rgba(243,123,34,0.55)]",
    title: "text-[#1a1714]",
    sub: "text-[#1a1714]/85",
    label: "text-[#1a1714]/70",
    body: "text-[#1a1714]",
    bullet: "text-[#1a1714]",
    bulletCheckBg: "bg-[#1a1714]",
    bulletCheckColor: "text-[#f37b22]",
    rule: "border-[#1a171433]",
    chip: "border-[#1a171466] text-[#1a1714]",
    priceLabel: "text-[#1a1714]/70",
    price: "text-[#1a1714]",
    cta: "bg-[#1a1714] text-[#fdfaf3] hover:bg-[#fdfaf3] hover:text-[#1a1714]",
    iconFilter: "brightness(0)",
    toolBg: "bg-[#1a17141a]",
  },
  dark: {
    card: "bg-[#1a1714] hover:bg-[#2d2218]",
    title: "text-[#f4ead0]",
    sub: "text-[#ddd1b0]",
    label: "text-[#f4ead0]/55",
    body: "text-[#ddd1b0]",
    bullet: "text-[#f4ead0]",
    bulletCheckBg: "bg-[#f37b22]",
    bulletCheckColor: "text-[#1a1714]",
    rule: "border-[#f4ead01a]",
    chip: "border-[#f4ead033] text-[#f4ead0]",
    priceLabel: "text-[#f4ead0]/55",
    price: "text-[#f4ead0]",
    cta: "bg-[#f37b22] text-[#1a1714] hover:bg-[#fdfaf3]",
    iconFilter: "brightness(0) invert(1)",
    toolBg: "bg-[#f4ead00d]",
  },
};

/**
 * PackCard, pricing-card style cliquable.
 * Toute la carte est un Link vers le formulaire de devis pré-rempli ; un
 * CTA bouton fillé en bas renforce l'invitation à passer à l'action.
 * Variant `accent` met en avant le pack le plus demandé (badge).
 */
function PackCard({
  p,
  lang,
  locale,
  variant,
  featured,
}: {
  p: Programme;
  lang: "fr" | "en";
  locale: string;
  variant: PackVariant;
  featured?: boolean;
}) {
  const tCard = useTranslations("formations");
  const s = VARIANT_STYLES[variant];
  const href = `/${locale}/contact?subject=formation-${p.slug}`;
  const priceMain =
    p.priceFrom !== null
      ? formatPrice(p.priceFrom, lang)
      : tCard("packPriceQuoted");

  return (
    <Link
      id={p.slug}
      href={href}
      aria-label={`${p.title[lang]}, ${p.subtitle[lang]}`}
      className={`group relative flex h-full scroll-mt-24 flex-col overflow-hidden p-8 transition-all duration-500 hover:-translate-y-1 md:p-10 ${s.card} ${
        featured ? "md:scale-[1.03]" : ""
      }`}
    >
      {/* Featured badge */}
      {featured && (
        <span className="absolute right-6 top-6 inline-flex items-center bg-[#1a1714] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-[#f4ead0] md:right-8 md:top-8">
          ★ {tCard("packBadgePopular")}
        </span>
      )}

      {/* Top row: index + duration badge */}
      <div className="flex items-baseline justify-between">
        <span className={`t-display text-5xl ${s.title} md:text-6xl`}>
          {p.index}
        </span>
        <span
          className={`inline-flex items-center border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${s.chip}`}
        >
          {p.duration[lang]}
        </span>
      </div>

      {/* Title + subtitle */}
      <h3 className={`t-display mt-10 text-3xl md:text-4xl ${s.title}`}>
        {p.title[lang]}
      </h3>
      <p className={`mt-3 text-base italic md:text-lg ${s.sub}`}>
        {p.subtitle[lang]}
      </p>

      {/* Tools row */}
      {p.tools && p.tools.length > 0 && (
        <div className="mt-8">
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${s.label}`}
          >
            {tCard("packToolsLabel")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tools.map((tool) => (
              <li
                key={tool.src}
                title={tool.label}
                className={`flex h-10 w-10 items-center justify-center ${s.toolBg}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-élément */}
                <img
                  src={tool.src}
                  alt={tool.label}
                  loading="lazy"
                  className="h-5 w-auto"
                  style={{ filter: s.iconFilter }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Audience */}
      <div className={`mt-8 space-y-2 border-t pt-6 ${s.rule}`}>
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${s.label}`}
        >
          {tCard("audienceLabel")}
        </p>
        <p className={`text-sm leading-relaxed md:text-base ${s.body}`}>
          {p.audience[lang]}
        </p>
      </div>

      {/* Bullets, "au programme" */}
      <div className={`mt-6 space-y-3 border-t pt-6 ${s.rule}`}>
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${s.label}`}
        >
          {tCard("packProgrammeLabel")}
        </p>
        <ul className="space-y-3">
          {p.bullets[lang].map((b) => (
            <li
              key={b}
              className={`flex items-start gap-3 text-sm leading-relaxed md:text-base ${s.bullet}`}
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${s.bulletCheckBg}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-2.5 w-2.5 ${s.bulletCheckColor}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Deliverables */}
      <div className={`mt-6 space-y-2 border-t pt-6 ${s.rule}`}>
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${s.label}`}
        >
          {tCard("packDeliverablesShort")}
        </p>
        <p className={`text-sm leading-relaxed md:text-base ${s.body}`}>
          {p.deliverables[lang]}
        </p>
      </div>

      {/* Formats chips */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {p.formats.map((f) => (
          <li
            key={f}
            className={`inline-flex items-center border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${s.chip}`}
          >
            {formatLabel(f, lang)}
          </li>
        ))}
      </ul>

      {/* Spacer pushes price + CTA to the bottom for an even baseline */}
      <div className="flex-1" />

      {/* Price + filled CTA button */}
      <div className={`mt-10 border-t pt-6 ${s.rule}`}>
        {p.priceFrom !== null && (
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${s.priceLabel}`}
          >
            {tCard("packPriceFromLabel")}
          </p>
        )}
        <p className={`t-display mt-1 text-4xl md:text-5xl ${s.price}`}>
          {priceMain}
        </p>

        <span
          className={`mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-all duration-300 ${s.cta}`}
        >
          {tCard("packCtaPrimary")}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
