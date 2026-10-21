import Image from "next/image";
import { CountUp, GrowthChart } from "./ResultsMotion";
import { LOIR_ROLLING_K, LOIR_SEP_2023 } from "@/lib/results";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Héros de l'accueil (21/10/2026, décision de Hugues) : on vend du
 * résultat. À gauche la promesse, à droite un vrai tableau de bord, les
 * ventes en ligne de LOIR Paris lues dans Shopify, qui se tracent à
 * l'écran. Aucun chiffre inventé : voir src/lib/results.ts.
 */
const COPY = {
  fr: {
    eyebrow: "Agence digitale, en France et à distance",
    title: ["Nous faisons", "grandir vos ventes."],
    body: "Sites et e-commerce, contenus, SEO et publicité, pilotés par une seule équipe et mesurés en chiffre d'affaires. Pour les boutiques en ligne, les PME et les grands groupes.",
    book: "Réserver 30 min",
    results: "Voir les résultats",
    note: "Un premier échange de 30 minutes, puis une proposition écrite et un devis.",
    signature: "Hugues Lourmieres, fondateur. Directeur marketing depuis 2018.",
    card: {
      client: "LOIR Paris, mode en ligne",
      source: "Données Shopify réelles",
      multiplierLabel: "de ventes en ligne en trois ans",
      chartLabel:
        "Ventes nettes de LOIR Paris sur 12 mois glissants : 140 000 euros en septembre 2023, 494 000 euros en septembre 2026.",
      marker: "sept. 2023",
      kpis: [
        { to: 494, decimals: 0, prefix: "", suffix: "\u00a0k€", label: "de ventes sur 12 mois" },
        { to: 7.6, decimals: 1, prefix: "×", suffix: "", label: "visites, 2022 à 2025" },
        { to: 20, decimals: 0, prefix: "+", suffix: "\u00a0%", label: "panier moyen, 2022 à 2025" },
      ],
    },
  },
  en: {
    eyebrow: "Digital agency, across France and remotely",
    title: ["We grow", "your sales."],
    body: "Websites and e-commerce, content, SEO and advertising, run by one team and measured in revenue. For online shops, SMEs and large groups.",
    book: "Book 30 min",
    results: "See the results",
    note: "A first 30-minute call, then a written proposal and a quote.",
    signature: "Hugues Lourmieres, founder. Marketing director since 2018.",
    card: {
      client: "LOIR Paris, online fashion",
      source: "Real Shopify data",
      multiplierLabel: "online sales in three years",
      chartLabel:
        "LOIR Paris net sales over a rolling 12 months: 140,000 euros in September 2023, 494,000 euros in September 2026.",
      marker: "Sep 2023",
      kpis: [
        { to: 494, decimals: 0, prefix: "€", suffix: "k", label: "sales over 12 months" },
        { to: 7.6, decimals: 1, prefix: "×", suffix: "", label: "visits, 2022 to 2025" },
        { to: 20, decimals: 0, prefix: "+", suffix: "%", label: "average order, 2022 to 2025" },
      ],
    },
  },
} as const;

export function HomeHero({ locale }: { locale: string }) {
  const en = locale === "en";
  const c = COPY[en ? "en" : "fr"];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-28 pb-20 md:px-12 md:pt-40 md:pb-28 lg:grid-cols-12 lg:gap-12">
        {/* Promesse */}
        <div className="lg:col-span-6">
          <p className="t-eyebrow">{c.eyebrow}</p>
          <h1 className="t-display mt-7 text-[clamp(2.6rem,10vw,3.6rem)] leading-[1.02] text-[var(--fg)] md:text-[clamp(3.4rem,4.4vw,4.3rem)]">
            {c.title.map((l) => (
              <span key={l} className="block xl:whitespace-nowrap">
                {l}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[34rem] text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6] transition-[background-color,transform] duration-200 hover:bg-[#2a2420] active:scale-[0.98]"
            >
              {c.book}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#resultats"
              className="group inline-flex items-center gap-2.5 border-b-2 border-[var(--fg)] pb-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-opacity hover:opacity-70"
            >
              {c.results}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--fg-2)]">{c.note}</p>
          <div className="mt-8 flex items-center gap-3">
            <Image
              src="/images/about/hugues-2025.jpg"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="h-11 w-11 flex-none rounded-full object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <p className="text-xs leading-snug text-[var(--fg-2)] md:text-sm">{c.signature}</p>
          </div>
        </div>

        {/* Tableau de bord LOIR Paris */}
        <div className="lg:col-span-6">
          <figure className="tone-dark relative bg-[var(--bg)] p-6 text-[var(--fg)] shadow-[0_40px_90px_-40px_rgba(26,23,20,0.75)] md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]/70">
                {c.card.client}
              </figcaption>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/55">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#5fd68a]" />
                {c.card.source}
              </span>
            </div>

            <div className="mt-7 flex items-end gap-4">
              <CountUp
                from={1}
                to={3.5}
                decimals={1}
                prefix="×"
                duration={2.2}
                delay={0.3}
                locale={locale}
                className="t-display text-7xl leading-none text-[var(--accent)] md:text-8xl"
              />
              <p className="max-w-[11rem] pb-2 text-sm leading-snug text-[var(--fg)]/80">
                {c.card.multiplierLabel}
              </p>
            </div>

            <GrowthChart
              data={[...LOIR_ROLLING_K]}
              markerIndex={LOIR_SEP_2023}
              markerLabel={c.card.marker}
              xTicks={[
                { index: 1, label: "2023" },
                { index: 13, label: "2024" },
                { index: 25, label: "2025" },
                { index: 37, label: "2026" },
              ]}
              yTicks={[100, 300, 500]}
              yPrefix={en ? "€" : ""}
              ySuffix={en ? "k" : "\u00a0k€"}
              ariaLabel={c.card.chartLabel}
              className="mt-6 h-auto w-full text-[var(--fg)]"
            />

            <dl className="mt-7 grid grid-cols-3 gap-px border-t border-[var(--rule)] pt-6">
              {c.card.kpis.map((k, i) => (
                <div key={k.label} className="pr-2">
                  <dt className="sr-only">{k.label}</dt>
                  <dd>
                    <CountUp
                      to={k.to}
                      decimals={k.decimals}
                      prefix={k.prefix}
                      suffix={k.suffix}
                      duration={1.6}
                      delay={1 + i * 0.2}
                      locale={locale}
                      className="t-display whitespace-nowrap text-[1.7rem] text-[var(--fg)] sm:text-3xl md:text-4xl"
                    />
                    <p className="mt-2 text-xs leading-snug text-[var(--fg)]/60">{k.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </div>
    </section>
  );
}
