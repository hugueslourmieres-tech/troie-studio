import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { GreekMark } from "@/components/GreekMark";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Page offre « Diagnostic IA ».
 *
 * ⚠️ CADRE JURIDIQUE, À NE PAS CASSER (13/08/2026).
 *
 * Cette page vend du CONSEIL, jamais de la « formation ». TROIE Studio n'a
 * ni numéro de déclaration d'activité ni certification Qualiopi : employer
 * le mot « formation » ferait entrer la prestation dans le champ du code du
 * travail (L.6353-1 et suivants) et rendrait la facturation irrégulière.
 * Les termes autorisés ici : diagnostic, conseil, accompagnement, atelier,
 * sensibilisation, mise en œuvre.
 *
 * De même, on n'écrit NULLE PART que la prestation est financée par la
 * Région. Le dispositif « Mon assistant IA » est réalisé par un prestataire
 * retenu par la Région, ce que TROIE n'est pas à ce jour. La page se borne à
 * dire qu'on oriente le client vers les dispositifs auxquels il est éligible,
 * ce qui est exact et suffit à lever l'objection prix.
 *
 * Copie portée en dur (FR/EN) plutôt qu'en namespace next-intl : même parti
 * que AiActBanner, la page est autonome et n'a pas vocation à être éditée
 * depuis les fichiers de messages.
 */

const COPY = {
  fr: {
    eyebrow: "Diagnostic IA",
    title: "Savoir où vous en êtes avec l'IA, en une journée.",
    intro:
      "Vos équipes utilisent déjà des outils d'intelligence artificielle, souvent plus que vous ne le pensez. Depuis le 2 août 2026, cet usage vous engage. Le diagnostic répond à trois questions concrètes : ce qui tourne vraiment chez vous, ce que vous risquez, et le premier chantier qui vous fera gagner du temps.",
    offersEyebrow: "Trois formats",
    offers: [
      {
        name: "Le diagnostic",
        duration: "1 journée sur site",
        price: "900 €",
        net: "soit 675 € après déduction, à titre indicatif",
        body: "L'état des lieux complet. On cartographie les outils utilisés, officiels et officieux, on regarde vos données, et on repart avec un plan d'action chiffré et un premier cas d'usage identifié.",
        items: [
          "Cartographie des usages réels, service par service",
          "État des lieux des données : disponibilité, sécurisation",
          "Un cas d'usage prioritaire, chiffré en temps gagné",
          "Le point de conformité au règlement européen",
        ],
      },
      {
        name: "La mise en œuvre",
        duration: "5 jours, étalés sur 6 semaines",
        price: "4 200 €",
        net: "soit 3 150 € après déduction, à titre indicatif",
        body: "Le cas d'usage identifié au diagnostic est construit, mis en service et pris en main par vos équipes. Vous ne repartez pas avec un rapport, vous repartez avec quelque chose qui tourne.",
        items: [
          "Le cas d'usage prioritaire livré et en service",
          "La prise en main par vos équipes, en atelier",
          "La charte d'usage interne, rédigée",
          "La trace écrite qui vous protège en cas de contrôle",
        ],
        featured: true,
      },
      {
        name: "L'accompagnement",
        duration: "2 jours par mois, engagement 6 mois",
        price: "1 700 € / mois",
        net: "soit 1 275 € après déduction, à titre indicatif",
        body: "Une direction marketing et IA à temps partagé. Le format qui s'est imposé en 2026 pour les PME qui veulent un profil senior sans en porter le salaire.",
        items: [
          "Pilotage des chantiers IA et acquisition",
          "Montée en compétence continue des équipes",
          "Veille réglementaire et mise à jour des usages",
          "Un interlocuteur unique, joignable",
        ],
      },
    ],
    costEyebrow: "Ce que ça coûte vraiment",
    costTitle: "Une charge déductible, pas un investissement à fonds perdus.",
    costBody:
      "Une prestation de conseil engagée dans l'intérêt de l'entreprise est intégralement déductible du résultat imposable. Pour une société à l'impôt sur les sociétés, une facture de 4 200 € pèse réellement 3 150 € au taux normal de 25 %, et 3 570 € au taux réduit de 15 % applicable sur les premiers 42 500 € de bénéfice. Les montants indiqués sur cette page le sont à titre indicatif : votre expert-comptable reste seul juge de votre situation.",
    aidEyebrow: "Financements publics",
    aidTitle: "Vous êtes peut-être éligible à des aides. On vous le dit.",
    aidBody:
      "La Région Sud, Bpifrance et les OPCO portent plusieurs dispositifs destinés aux PME qui intègrent l'IA, certains couvrant tout ou partie d'une prestation de conseil. Les critères changent au fil des votes de budget et tous ne sont pas cumulables. Nous ne sommes pas prescripteurs de ces aides et nous ne les instruisons pas : lors du premier échange, nous vous indiquons ceux auxquels votre entreprise semble éligible et vers qui vous tourner. C'est gratuit et ça ne vous engage à rien.",
    aidNote:
      "TROIE Studio délivre du conseil et de l'accompagnement. Nous ne sommes pas un organisme de formation déclaré et nos prestations n'entrent pas dans le champ de la formation professionnelle continue.",
    ctaLabel: "Réserver 30 minutes, gratuitement",
    ctaBack: "Voir tous les services",
  },
  en: {
    eyebrow: "AI assessment",
    title: "Know exactly where you stand with AI, in a single day.",
    intro:
      "Your teams already use AI tools, usually more than you think. Since 2 August 2026, that use carries obligations. The assessment answers three concrete questions: what is actually running in your company, what you are exposed to, and the first project that will save you real time.",
    offersEyebrow: "Three formats",
    offers: [
      {
        name: "The assessment",
        duration: "One day on site",
        price: "€900",
        net: "roughly €675 after tax deduction, indicative",
        body: "The full picture. We map the tools in use, sanctioned and unsanctioned, review your data, and leave you with a costed action plan and a first use case identified.",
        items: [
          "A map of actual usage, team by team",
          "Data review: availability, security",
          "One priority use case, costed in time saved",
          "Where you stand against the EU regulation",
        ],
      },
      {
        name: "The build",
        duration: "Five days across six weeks",
        price: "€4,200",
        net: "roughly €3,150 after tax deduction, indicative",
        body: "The use case identified during the assessment gets built, shipped and handed over to your teams. You do not leave with a report, you leave with something that runs.",
        items: [
          "The priority use case, live and in service",
          "Hands-on handover to your teams, in workshops",
          "Your internal AI usage policy, written",
          "The written record that protects you if audited",
        ],
        featured: true,
      },
      {
        name: "Ongoing support",
        duration: "Two days a month, six-month term",
        price: "€1,700 / month",
        net: "roughly €1,275 after tax deduction, indicative",
        body: "A fractional marketing and AI director. The format that became standard in 2026 for SMEs who want a senior profile without carrying the salary.",
        items: [
          "Running your AI and acquisition projects",
          "Continuous upskilling for your teams",
          "Regulatory watch and policy updates",
          "One person to call, who answers",
        ],
      },
    ],
    costEyebrow: "What it actually costs",
    costTitle: "A deductible expense, not money out the window.",
    costBody:
      "Consulting engaged in the company's interest is fully deductible from taxable profit. For a company subject to French corporate tax, a €4,200 invoice really costs €3,150 at the standard 25 % rate, and €3,570 at the reduced 15 % rate applying to the first €42,500 of profit. Figures on this page are indicative: your accountant remains the only judge of your situation.",
    aidEyebrow: "Public funding",
    aidTitle: "You may be eligible for public support. We will tell you.",
    aidBody:
      "Région Sud, Bpifrance and the OPCOs run several schemes for SMEs adopting AI, some covering all or part of a consulting engagement. Criteria shift with each budget vote and not all of them combine. We are not an approved provider for these schemes and we do not process applications: during the first conversation we tell you which ones your company appears eligible for, and who to contact. It is free and commits you to nothing.",
    aidNote:
      "TROIE Studio delivers consulting and advisory work. We are not a registered training body and our services fall outside the scope of French regulated vocational training.",
    ctaLabel: "Book 30 minutes, free",
    ctaBack: "See all services",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = COPY[locale === "en" ? "en" : "fr"];
  return {
    title: c.title.replace(/\.$/, ""),
    description: c.intro,
    alternates: {
      canonical: `/${locale}/diagnostic-ia`,
      languages: { fr: "/fr/diagnostic-ia", en: "/en/diagnostic-ia" },
    },
  };
}

export default async function DiagnosticIaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <div aria-hidden="true" className="h-16 md:h-20" />

      {/* Accroche */}
      {/* `pt` généreux : l'en-tête fixe et la banderole AI Act occupent déjà
          le haut de l'écran, l'eyebrow passait sous la banderole sans ça. */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 md:px-12 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <GreekMark
            label={c.eyebrow}
            labelClassName="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg-2)]/60"
          />
          <h1 className="t-display mt-6 text-4xl leading-[1.05] md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.intro}
          </p>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e6] transition hover:opacity-90"
          >
            {c.ctaLabel}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Les trois formats */}
      <section className="border-t border-[var(--fg)]/10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg-2)]/60">
            {c.offersEyebrow}
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {c.offers.map((o) => {
              const featured = "featured" in o && o.featured;
              return (
                <div
                  key={o.name}
                  className={`flex flex-col rounded-2xl border p-8 ${
                    featured
                      ? "border-[var(--accent)] bg-[var(--accent)]/5"
                      : "border-[var(--fg)]/12"
                  }`}
                >
                  <h2 className="t-display text-2xl md:text-3xl">{o.name}</h2>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
                    {o.duration}
                  </p>

                  <p className="mt-6 text-3xl font-semibold tabular-nums md:text-4xl">
                    {o.price}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-[var(--fg-2)]/70">
                    {o.net}
                  </p>

                  <p className="mt-6 text-[15px] leading-relaxed text-[var(--fg-2)]">
                    {o.body}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--fg)]/10 pt-6">
                    {o.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] leading-snug">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Déductibilité */}
      <section className="border-t border-[var(--fg)]/10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg-2)]/60">
                {c.costEyebrow}
              </p>
              <h2 className="t-display mt-5 text-3xl leading-tight md:text-4xl">
                {c.costTitle}
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                {c.costBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financements publics */}
      <section className="border-t border-[var(--fg)]/10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg-2)]/60">
                {c.aidEyebrow}
              </p>
              <h2 className="t-display mt-5 text-3xl leading-tight md:text-4xl">
                {c.aidTitle}
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                {c.aidBody}
              </p>
              <p className="mt-8 border-l-2 border-[var(--fg)]/15 pl-5 text-[13px] leading-relaxed text-[var(--fg-2)]/70">
                {c.aidNote}
              </p>
              <Link
                href={`/${locale}`}
                className="mt-8 inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70 underline-offset-4 hover:underline"
              >
                {c.ctaBack}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
