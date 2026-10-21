import { CompareBars, CountUp, GrowBars } from "./ResultsMotion";
import { LOIR_ORDERS } from "@/lib/results";

/**
 * Résultats clients (21/10/2026) : une boutique en ligne, une PME
 * industrielle, un grand groupe. Chaque cas a son graphique animé et ses
 * chiffres réels (sources dans src/lib/results.ts).
 */
const COPY = {
  fr: {
    eyebrow: "Résultats",
    title: "Trois clients, des ventes mesurées.",
    intro: "Des chiffres réels, lus dans les outils de nos clients. Pas d'estimation, pas de promesse.",
    cases: {
      loir: {
        kind: "E-commerce",
        name: "LOIR Paris",
        lead: "Une marque de mode qui vend en ligne. Commandes par année, de 2022 à 2025.",
        big: { from: 1, to: 2.7, decimals: 1, prefix: "×", suffix: "" },
        bigLabel: "de commandes en trois ans",
        chart: "Commandes de LOIR Paris par année : 1 542 en 2022, 1 767 en 2023, 3 181 en 2024, 4 124 en 2025.",
      },
      rutherford: {
        kind: "PME industrielle, B2B",
        name: "Rutherford",
        lead: "Des solutions pour l'imprimerie et l'emballage. Nous avons fait le site multilingue, le SEO, la publicité, les contenus et le CRM.",
        big: { from: 1, to: 5, decimals: 0, prefix: "×", suffix: "" },
        bigLabel: "de ventes, de 2 à 10 unités par an",
        kpis: [
          { to: 100, prefix: "+", suffix: "\u00a0%", label: "de trafic naturel en 6 mois" },
          { to: 40, prefix: "+", suffix: "\u00a0%", label: "de demandes entrantes via le nouveau site" },
        ],
        bars: [
          { label: "Avant", value: 2 },
          { label: "Après", value: 10 },
        ],
        chart: "Unités vendues par an chez Rutherford : 2 avant, 10 après.",
      },
      autajon: {
        kind: "Grand groupe, emballage",
        name: "Autajon, Italie",
        lead: "Un film client tourné et monté par l'équipe pour le groupe Rutherford. Le groupe estime les ventes obtenues grâce à lui à environ 175 000 €.",
        big: { from: 1, to: 35, decimals: 0, prefix: "×", suffix: "" },
        bigLabel: "le budget investi",
        rows: [
          { label: "Budget du film", value: 5000, display: "5 000 €" },
          { label: "Ventes estimées par le groupe", value: 175000, display: "175 000 €", strong: true },
        ],
        chart: "Budget du film : 5 000 euros. Ventes estimées : 175 000 euros.",
      },
    },
  },
  en: {
    eyebrow: "Results",
    title: "Three clients, measured sales.",
    intro: "Real numbers, read in our clients' own tools. No estimates, no promises.",
    cases: {
      loir: {
        kind: "E-commerce",
        name: "LOIR Paris",
        lead: "A fashion brand selling online. Orders per year, from 2022 to 2025.",
        big: { from: 1, to: 2.7, decimals: 1, prefix: "×", suffix: "" },
        bigLabel: "orders in three years",
        chart: "LOIR Paris orders per year: 1,542 in 2022, 1,767 in 2023, 3,181 in 2024, 4,124 in 2025.",
      },
      rutherford: {
        kind: "Industrial SME, B2B",
        name: "Rutherford",
        lead: "Solutions for printing and packaging. We built the multilingual website, SEO, advertising, content and CRM.",
        big: { from: 1, to: 5, decimals: 0, prefix: "×", suffix: "" },
        bigLabel: "sales, from 2 to 10 units a year",
        kpis: [
          { to: 100, prefix: "+", suffix: "%", label: "organic traffic in 6 months" },
          { to: 40, prefix: "+", suffix: "%", label: "inbound leads from the new website" },
        ],
        bars: [
          { label: "Before", value: 2 },
          { label: "After", value: 10 },
        ],
        chart: "Units sold per year at Rutherford: 2 before, 10 after.",
      },
      autajon: {
        kind: "Large group, packaging",
        name: "Autajon, Italy",
        lead: "A customer film shot and edited by the team for the Rutherford group. The group estimates the sales it brought at around €175,000.",
        big: { from: 1, to: 35, decimals: 0, prefix: "×", suffix: "" },
        bigLabel: "the budget invested",
        rows: [
          { label: "Film budget", value: 5000, display: "€5,000" },
          { label: "Sales estimated by the group", value: 175000, display: "€175,000", strong: true },
        ],
        chart: "Film budget: 5,000 euros. Estimated sales: 175,000 euros.",
      },
    },
  },
} as const;

function CaseHead({
  kind,
  name,
  lead,
}: {
  kind: string;
  name: string;
  lead: string;
}) {
  return (
    <>
      <p className="text-sm text-[var(--fg-2)]">{kind}</p>
      <h3 className="t-display mt-1 text-2xl text-[var(--fg)] md:text-3xl">{name}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--fg-2)]">{lead}</p>
    </>
  );
}

function Big({
  big,
  label,
  locale,
}: {
  big: { from: number; to: number; decimals: number; prefix: string; suffix: string };
  label: string;
  locale: string;
}) {
  return (
    <div className="mt-8 flex items-end gap-4">
      <CountUp
        from={big.from}
        to={big.to}
        decimals={big.decimals}
        prefix={big.prefix}
        suffix={big.suffix}
        duration={2}
        locale={locale}
        className="t-display text-6xl leading-none text-[var(--accent)] md:text-7xl"
      />
      <p className="max-w-[12rem] pb-1.5 text-sm leading-snug text-[var(--fg-2)]">{label}</p>
    </div>
  );
}

export function HomeResults({ locale }: { locale: string }) {
  const en = locale === "en";
  const c = COPY[en ? "en" : "fr"];
  const { loir, rutherford, autajon } = c.cases;

  return (
    <section id="resultats" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <h2 className="t-display max-w-[18ch] text-balance text-4xl text-[var(--fg)] md:text-6xl">
          {c.title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.intro}</p>

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {/* E-commerce */}
          <article className="flex flex-col rounded-2xl border border-[var(--rule)] bg-white p-7 md:p-9">
            <CaseHead kind={loir.kind} name={loir.name} lead={loir.lead} />
            <Big big={loir.big} label={loir.bigLabel} locale={locale} />
            <GrowBars
              bars={LOIR_ORDERS.map((o) => ({ label: o.year, value: o.value }))}
              ariaLabel={loir.chart}
              locale={locale}
              className="mt-auto h-48 pt-10"
            />
          </article>

          {/* PME industrielle */}
          <article className="flex flex-col rounded-2xl border border-[var(--rule)] bg-white p-7 md:p-9">
            <CaseHead kind={rutherford.kind} name={rutherford.name} lead={rutherford.lead} />
            <Big big={rutherford.big} label={rutherford.bigLabel} locale={locale} />
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {rutherford.kpis.map((k) => (
                <div key={k.label}>
                  <dt className="sr-only">{k.label}</dt>
                  <dd>
                    <CountUp
                      to={k.to}
                      prefix={k.prefix}
                      suffix={k.suffix}
                      duration={1.6}
                      locale={locale}
                      className="t-display text-3xl text-[var(--fg)]"
                    />
                    <p className="mt-1 text-xs leading-snug text-[var(--fg-2)]">{k.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
            <GrowBars
              bars={[...rutherford.bars]}
              ariaLabel={rutherford.chart}
              locale={locale}
              className="mt-auto h-40 pt-10"
            />
          </article>

          {/* Grand groupe */}
          <article className="flex flex-col rounded-2xl border border-[var(--rule)] bg-white p-7 md:p-9">
            <CaseHead kind={autajon.kind} name={autajon.name} lead={autajon.lead} />
            <Big big={autajon.big} label={autajon.bigLabel} locale={locale} />
            <CompareBars rows={[...autajon.rows]} ariaLabel={autajon.chart} className="mt-auto pt-12" />
          </article>
        </div>
      </div>
    </section>
  );
}
