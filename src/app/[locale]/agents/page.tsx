import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import {
  AGENTS,
  PDF_BRIEF,
  formatSetup,
  formatMonthly,
  sectorLabel,
  type Agent,
} from "@/lib/data/agents";

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
  const t = await getTranslations({ locale, namespace: "agents" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/agents`,
      languages: { fr: "/fr/agents", en: "/en/agents" },
    },
    openGraph: {
      type: "website",
      url: `${SITE}/${locale}/agents`,
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function AgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  return <AgentsView locale={locale} lang={lang} />;
}

function AgentsView({ locale, lang }: { locale: string; lang: "fr" | "en" }) {
  const t = useTranslations("agents");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const tableHeaders = t.raw("tableHeaders") as {
    agent: string;
    mission: string;
    bestFor: string;
    stack: string;
    price: string;
  };
  const methodSteps = t.raw("methodSteps") as Array<{
    title: string;
    body: string;
  }>;
  const faqItems = t.raw("faqItems") as Array<{ q: string; a: string }>;

  // JSON-LD : a Service for the whole offer + a Product per agent.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: t("metaTitle"),
        description: t("metaDescription"),
        provider: {
          "@type": "Organization",
          name: "TROIE Atelier Digital",
          url: SITE,
        },
        areaServed: "FR",
        serviceType: "AI agent deployment",
      },
      ...AGENTS.map((a) => ({
        "@type": "Product",
        name: `${a.name[lang]} — ${a.title[lang]}`,
        description: a.mission[lang],
        brand: {
          "@type": "Organization",
          name: "TROIE Atelier Digital",
          url: SITE,
        },
        url: `${SITE}/${locale}/agents#${a.slug}`,
        category: "AI Agent",
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          ...(a.setupFrom !== null && { price: String(a.setupFrom) }),
        },
      })),
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — fond gravure classique + voile cream pour lisibilité.
          L'image est fixée en cover, semi-fanée, le texte ink se lit
          parfaitement par dessus. */}
      <header className="relative isolate overflow-hidden border-t border-[var(--accent)] scroll-mt-24">
        {/* Background engraving */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/agents/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ filter: "grayscale(1) brightness(1.02) contrast(0.94)" }}
        />
        {/* Cream veil + soft right fade so the body copy stays readable */}
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
                href={`/${locale}/contact?subject=agent-hermes`}
                className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {t("ctaPrimary")}
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
                {t("ctaAudit")} →
              </a>
              {PDF_BRIEF && (
                <a
                  href={PDF_BRIEF}
                  download
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)]"
                >
                  {t("downloadBrief")} ↓
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

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

      {/* Intro */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="t-eyebrow">{t("introEyebrow")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {t("introTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              {t("introBody")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 packs — uniform cream tone, perfectly aligned columns.
          No featured scale, no variant swap : c'est la galerie de trois
          gravures de la même série, vu de face. */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 pb-20 md:px-12 md:pb-28">
          {/* Pas de Reveal wrapper sur la grille — la grille mobile
              est plus haute que le viewport et l'observer pouvait ne
              jamais tirer, laissant les cards a opacity:0. */}
          <div className="mt-10 grid items-stretch gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
            {AGENTS.map((a) => (
              <AgentCard
                key={a.slug}
                a={a}
                lang={lang}
                locale={locale}
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

      {/* Méthode — 4 étapes */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="t-eyebrow">{t("methodEyebrow")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {t("methodTitle")}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <ol className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-4">
              {methodSteps.map((step) => (
                <li key={step.title} className="border-t border-[var(--rule)] pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {step.title}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Comparatif */}
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
                      {tableHeaders.agent}
                    </th>
                    <th className="py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.mission}
                    </th>
                    <th className="py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.bestFor}
                    </th>
                    <th className="py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.stack}
                    </th>
                    <th className="py-5 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {tableHeaders.price}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AGENTS.map((a) => (
                    <tr
                      key={a.slug}
                      className="border-b border-[var(--rule)] align-top"
                    >
                      <td className="py-6 pr-6">
                        <div className="flex items-center gap-5">
                          {/* Orange close-up portrait — 80x100 frame in the
                              brand passe-partout cream, gives the comparison
                              table the look of a museum catalogue. */}
                          <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-[#f5f0e6] md:h-24 md:w-20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={a.portrait.src}
                              alt={a.portrait.alt}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="t-display text-xl text-[var(--fg)] md:text-2xl">
                            <span className="text-[var(--accent)]">
                              {a.index}.{" "}
                            </span>
                            {a.name[lang]}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 pr-4 text-sm text-[var(--fg-2)] md:text-base">
                        {a.subtitle[lang]}
                      </td>
                      <td className="py-6 pr-4 text-sm text-[var(--fg-2)] md:text-base">
                        {a.bestFor.map((s) => sectorLabel(s, lang)).join(" · ")}
                      </td>
                      <td className="py-6 pr-4 text-sm text-[var(--fg-2)] md:text-base">
                        {a.stack.join(" · ")}
                      </td>
                      <td className="py-6 text-right text-sm text-[var(--fg-2)] md:text-base">
                        {formatSetup(a.setupFrom, lang)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobile stacked */}
          <Reveal delay={0.2}>
            <ul className="mt-10 space-y-6 md:hidden">
              {AGENTS.map((a) => (
                <li
                  key={a.slug}
                  className="border-t border-[var(--rule)] pt-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-[#f5f0e6]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.portrait.src}
                        alt={a.portrait.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="t-display text-2xl text-[var(--fg)]">
                      <span className="text-[var(--accent)]">{a.index}. </span>
                      {a.name[lang]}
                    </p>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[var(--fg-2)]">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.mission}
                    </dt>
                    <dd>{a.subtitle[lang]}</dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.bestFor}
                    </dt>
                    <dd>
                      {a.bestFor.map((s) => sectorLabel(s, lang)).join(" · ")}
                    </dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.stack}
                    </dt>
                    <dd>{a.stack.join(" · ")}</dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                      {tableHeaders.price}
                    </dt>
                    <dd>{formatSetup(a.setupFrom, lang)}</dd>
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
                  href={`/${locale}/contact?subject=agent-custom`}
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
                  href={`/${locale}/contact?subject=agent-hermes`}
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

/**
 * AgentCard — single beige tone for all 3 columns, perfectly aligned.
 *
 * Alignment trick: every block uses a fixed-baseline structure (portrait at
 * the top with the same aspect, identical paragraph order). The flex column
 * + `flex-1` spacer pushes the signature + price + CTA to a shared bottom
 * baseline regardless of variable text length above. `items-stretch` on
 * the parent grid forces equal column heights.
 */
function AgentCard({
  a,
  lang,
  locale,
}: {
  a: Agent;
  lang: "fr" | "en";
  locale: string;
}) {
  const tCard = useTranslations("agents");
  const href = `/${locale}/contact?subject=agent-${a.slug}`;
  const priceMain = formatSetup(a.setupFrom, lang);
  const monthlyMain =
    a.monthlyFrom !== null ? formatMonthly(a.monthlyFrom, lang) : null;

  // No card background — the cards sit directly on the section cream tone.
  // Visual rhythm comes from internal rules, typography and aligned baselines.
  return (
    <Link
      id={a.slug}
      href={href}
      aria-label={`${a.name[lang]}, ${a.title[lang]}`}
      className="group relative flex h-full scroll-mt-24 flex-col transition-all duration-500 hover:-translate-y-1"
    >
      {/* Portrait — full 4/5 engraving, edge-to-edge, no frame, no overlay */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.photo.src}
          alt={a.photo.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ filter: "grayscale(1) brightness(0.99) contrast(1.02)" }}
        />
      </div>

      {/* Name + title + subtitle */}
      <h3 className="t-display mt-8 text-3xl text-[#1a1714] md:text-4xl">
        {a.name[lang]}
      </h3>
      <p className="mt-3 text-base italic text-[#4a4239]/85 md:text-lg">
        {a.title[lang]}
      </p>
      <p className="mt-2 text-sm text-[#4a4239] md:text-base">
        {a.subtitle[lang]}
      </p>

      {/* Mythology */}
      <div className="mt-8 border-t border-[#1a17141a] pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4239]/60">
          {tCard("packMythLabel")}
        </p>
        <p className="mt-3 text-sm italic leading-relaxed text-[#4a4239]/80 md:text-[15px]">
          {a.myth[lang]}
        </p>
      </div>

      {/* Mission */}
      <div className="mt-6 space-y-2 border-t border-[#1a17141a] pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4239]/60">
          {tCard("packMissionLabel")}
        </p>
        <p className="text-sm leading-relaxed text-[#4a4239] md:text-base">
          {a.mission[lang]}
        </p>
      </div>

      {/* Tools row */}
      {a.tools && a.tools.length > 0 && (
        <div className="mt-6 border-t border-[#1a17141a] pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4239]/60">
            {tCard("packStackLabel")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {a.tools.map((tool) => (
              <li
                key={tool.src}
                title={tool.label}
                className="flex h-10 w-10 items-center justify-center bg-[#1a17140a]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.src}
                  alt={tool.label}
                  loading="lazy"
                  className="h-5 w-auto"
                  style={{ filter: "brightness(0)" }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      <div className="mt-6 space-y-3 border-t border-[#1a17141a] pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4239]/60">
          {tCard("packSkillsLabel")}
        </p>
        <ul className="space-y-3">
          {a.skills[lang].map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 text-sm leading-relaxed text-[#4a4239] md:text-base"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#f37b22]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-2.5 w-2.5 text-[#fdfaf3]"
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

      {/* KPIs */}
      <div className="mt-6 space-y-2 border-t border-[#1a17141a] pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4239]/60">
          {tCard("packKpisLabel")}
        </p>
        <ul className="mt-3 space-y-2">
          {a.kpis[lang].map((k) => (
            <li
              key={k}
              className="flex items-start gap-3 text-sm leading-relaxed text-[#4a4239] md:text-base"
            >
              <span aria-hidden="true" className="mt-1.5 inline-block h-[3px] w-3 bg-[#f37b22]" />
              <span>{k}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best for chips */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {a.bestFor.map((sector) => (
          <li
            key={sector}
            className="inline-flex items-center border border-[#1a171433] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4239]"
          >
            {sectorLabel(sector, lang)}
          </li>
        ))}
      </ul>

      {/* Spacer pushes signature + price + CTA to a shared baseline */}
      <div className="flex-1" />

      {/* Signature italic */}
      <p className="t-display-italic mt-10 text-lg italic text-[#1a1714] md:text-xl">
        « {a.signature[lang]} »
      </p>

      {/* Price + filled CTA */}
      <div className="mt-8 border-t border-[#1a17141a] pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4239]/60">
          {tCard("packSetupLabel")}
        </p>
        <p className="t-display mt-1 text-3xl text-[#1a1714] md:text-4xl">
          {priceMain}
        </p>
        {monthlyMain && (
          <p className="mt-2 text-sm text-[#4a4239] md:text-base">
            {tCard("packMonthlyLabel")} : {monthlyMain}
          </p>
        )}

        <span className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#1a1714] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#fdfaf3] transition-all duration-300 group-hover:bg-[#f37b22]">
          {tCard("packCtaPrimary")}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
