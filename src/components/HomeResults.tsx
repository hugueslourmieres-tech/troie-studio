import { CompareBars, CountUp, GrowBars } from "./ResultsMotion";
import { LOIR_ORDERS_YEARLY_PCT } from "@/lib/results";

/**
 * Résultats clients (21/10/2026) : une boutique en ligne, une PME
 * industrielle, un grand groupe. Chaque cas a son graphique animé et ses
 * chiffres réels (sources dans src/lib/results.ts).
 */
const COPY = {
  fr: {
    eyebrow: "Résultats",
    title: "Trois clients, des résultats mesurés.",
    intro: "Des chiffres réels, lus dans les outils de nos clients. Pas d'estimation, pas de promesse.",
    cases: {
      loir: {
        kind: "E-commerce",
        name: "LOIR Paris",
        lead: "Un site e-commerce de mode. Évolution des commandes par année, par rapport à 2023.",
        big: { from: 0, to: 133, decimals: 0, prefix: "+", suffix: "\u00a0%" },
        bigLabel: "de commandes entre 2023 et 2025",
        base: "réf.",
        chart: "Commandes de LOIR Paris par rapport à 2023 : +80 % en 2024, +133 % en 2025.",
      },
      rutherford: {
        kind: "PME industrielle, B2B",
        name: "Rutherford",
        lead: "Des solutions pour l'imprimerie et l'emballage. Nous faisons vivre leurs réseaux sociaux : contenus, vidéos, publications.",
        big: { from: 0, to: 87, decimals: 0, prefix: "+", suffix: "\u00a0%" },
        bigLabel: "d'abonnés sur LinkedIn, Instagram et TikTok depuis février 2025",
        kpis: [
          { to: 711, prefix: "+", suffix: "\u00a0%", label: "d'abonnés TikTok depuis mars 2024" },
          { to: 202, prefix: "+", suffix: "\u00a0%", label: "de nouveaux abonnés LinkedIn par mois" },
        ],
        bars: [
          { label: "févr. 2025", value: 100, display: "réf." },
          { label: "juin 2026", value: 166, display: "+66\u00a0%" },
          { label: "sept. 2026", value: 187, display: "+87\u00a0%" },
        ],
        chart: "Abonnés de Rutherford sur LinkedIn, Instagram et TikTok par rapport à février 2025 : +66 % en juin 2026, +87 % en septembre 2026.",
      },
      autajon: {
        kind: "Grand groupe, emballage",
        name: "Autajon, Italie",
        lead: "Un film client tourné et monté par l'équipe pour le groupe Rutherford. Le groupe estime qu'il a rapporté environ 35 fois son budget.",
        big: { from: 1, to: 35, decimals: 0, prefix: "×", suffix: "" },
        bigLabel: "le budget investi",
        rows: [
          { label: "Budget du film", value: 1, display: "réf." },
          { label: "Ventes estimées par le groupe", value: 35, display: "×35", strong: true },
        ],
        chart: "Ventes estimées par le groupe : 35 fois le budget du film.",
      },
    },
  },
  en: {
    eyebrow: "Results",
    title: "Three clients, measured results.",
    intro: "Real numbers, read in our clients' own tools. No estimates, no promises.",
    cases: {
      loir: {
        kind: "E-commerce",
        name: "LOIR Paris",
        lead: "A fashion e-commerce store. Change in yearly orders compared with 2023.",
        big: { from: 0, to: 133, decimals: 0, prefix: "+", suffix: "%" },
        bigLabel: "orders between 2023 and 2025",
        base: "base",
        chart: "LOIR Paris orders compared with 2023: +80% in 2024, +133% in 2025.",
      },
      rutherford: {
        kind: "Industrial SME, B2B",
        name: "Rutherford",
        lead: "Solutions for printing and packaging. We run their social media: content, videos, posts.",
        big: { from: 0, to: 87, decimals: 0, prefix: "+", suffix: "%" },
        bigLabel: "followers on LinkedIn, Instagram and TikTok since February 2025",
        kpis: [
          { to: 711, prefix: "+", suffix: "%", label: "TikTok followers since March 2024" },
          { to: 202, prefix: "+", suffix: "%", label: "new LinkedIn followers per month" },
        ],
        bars: [
          { label: "Feb 2025", value: 100, display: "base" },
          { label: "Jun 2026", value: 166, display: "+66%" },
          { label: "Sep 2026", value: 187, display: "+87%" },
        ],
        chart: "Rutherford followers on LinkedIn, Instagram and TikTok compared with February 2025: +66% in June 2026, +87% in September 2026.",
      },
      autajon: {
        kind: "Large group, packaging",
        name: "Autajon, Italy",
        lead: "A customer film shot and edited by the team for the Rutherford group. The group estimates it brought in around 35 times its budget.",
        big: { from: 1, to: 35, decimals: 0, prefix: "×", suffix: "" },
        bigLabel: "the budget invested",
        rows: [
          { label: "Film budget", value: 1, display: "base" },
          { label: "Sales estimated by the group", value: 35, display: "×35", strong: true },
        ],
        chart: "Sales estimated by the group: 35 times the film budget.",
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
              bars={LOIR_ORDERS_YEARLY_PCT.map((o) => ({
                label: o.year,
                value: 100 + o.pct,
                display: o.pct === 0 ? loir.base : `+${o.pct}${en ? "%" : "\u00a0%"}`,
              }))}
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
