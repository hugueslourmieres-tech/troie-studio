import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { FounderBlock } from "@/components/FounderBlock";
import { JsonLd } from "@/components/JsonLd";
import { ProofCase } from "@/components/ProofCase";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Page « Stratégie » (1er/10/2026). Page dédiée, elle ne recycle plus la
 * section de l'accueil (ServiceSection reste dans le dépôt, sans appel ici).
 *
 * Retirés : le numéro « 02 », la mosaïque de trois photos (personnes
 * reconnaissables, marques tierces), la rangée « Outils utilisés », le
 * glossaire au survol et le lien « Demander un audit stratégique ».
 *
 * L'IA n'apparaît ni dans le H1, ni dans le titre, ni dans la description,
 * ni dans un bouton. Elle n'est citée que dans la FAQ, comme un outil.
 *
 * Boutons (règle du 1er/10/2026, fond crème) : « Réserver 30 min » en orange
 * plein, « Lancer un projet » en lien souligné, avec le besoin « stratégie »
 * présélectionné dans le formulaire.
 */

const COPY = {
  fr: {
    metaTitle: "Communication, SEO et Google Ads à Nice",
    metaDesc:
      "Positionnement, réseaux sociaux, référencement Google, campagnes Google Ads et Meta. Nous clarifions votre message, puis nous vous rendons visible auprès des bons clients.",
    eyebrow: "Communication et visibilité",
    title: "Le bon message, puis les bons clients.",
    intro:
      "Hugues Lourmieres exerce la direction marketing depuis 2018, aujourd'hui dans l'industrie des arts graphiques. Avec l'équipe TROIE, il vous aide à choisir quoi dire, à qui, et où investir. Puis il reste à vos côtés pour la mise en œuvre.",
    book: "Réserver 30 min",
    project: "Lancer un projet",
    problemsTitle: "Ce que nous réglons avec vous.",
    problems: [
      {
        q: "Votre positionnement est flou.",
        a: "Nous clarifions ce qui vous distingue et la façon de le dire.",
        d: "Livrable : une plateforme de marque courte, utilisable par toute l'équipe.",
      },
      {
        q: "Vous ne savez pas où investir.",
        a: "Nous choisissons avec vous les canaux et la répartition de l'effort.",
        d: "Livrable : un plan média daté.",
      },
      {
        q: "Vos campagnes coûtent sans rapporter.",
        a: "Nous reprenons vos campagnes Google, Meta ou LinkedIn et la façon d'en lire les résultats.",
        d: "Livrable : un tableau de suivi et un point régulier.",
      },
      {
        q: "Vos prestataires tirent chacun de leur côté.",
        a: "Nous tenons le cap et coordonnons agence, freelances et équipe interne.",
        d: "Livrable : une feuille de route commune.",
      },
    ],
    acqTitle: "Être trouvé par vos clients.",
    acqIntro:
      "Vos clients cherchent sur Google, voient vos publicités et posent aussi leurs questions à des assistants comme ChatGPT. Nous regardons où ils cherchent, puis nous rendons votre site clair et lisible partout.",
    acq: [
      {
        title: "Référencement naturel (SEO)",
        body: "Des pages claires pour Google, construites sur les recherches réelles de vos clients.",
      },
      {
        title: "Publicité en ligne (SEA)",
        body: "Des campagnes Google, Meta ou LinkedIn structurées, suivies et ajustées avec vous.",
      },
      {
        title: "Assistants de recherche (GEO)",
        body: "Un site lisible par ChatGPT, Claude ou Perplexity. Personne ne peut garantir une citation, nous ne la promettons pas.",
      },
    ],
    scan: "Scanner votre site",
    methodTitle: "Comment nous travaillons.",
    method: [
      {
        title: "Comprendre",
        body: "Nous écoutons votre histoire, vos clients et vos chiffres. Nous regardons votre marché et vos concurrents.",
      },
      {
        title: "Décider",
        body: "Nous vous proposons des choix clairs, avec leurs raisons. Vous décidez avec nous. Tout est écrit dans une proposition et un devis.",
      },
      {
        title: "Faire",
        body: "L'équipe met en œuvre : contenus, images, site, campagnes. Ou nous accompagnons vos équipes et vos prestataires.",
      },
      {
        title: "Suivre",
        body: "Nous regardons les résultats avec vous, nous ajustons et nous préparons la suite.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Comment démarre-t-on ?",
        a: "Par un appel de 30 minutes. Ensuite, nous vous envoyons une proposition écrite et un devis.",
      },
      {
        q: "Faut-il avoir une équipe marketing ?",
        a: "Non. Nous travaillons avec votre équipe, avec vos prestataires, ou nous tenons le rôle de direction marketing à temps partagé.",
      },
      {
        q: "Utilisez-vous l'IA ?",
        a: "Oui, comme un outil. Elle accélère la recherche et la fabrication. Les analyses, les choix et la relation avec vous restent humains.",
      },
    ],
  },
  en: {
    metaTitle: "Communication, SEO and Google Ads in Nice",
    metaDesc:
      "Positioning, social media, Google search, Google Ads and Meta campaigns. We make your message clear, then get you in front of the right customers.",
    eyebrow: "Communication and visibility",
    title: "The right message, then the right customers.",
    intro:
      "Hugues Lourmieres has worked as a marketing director since 2018, today in the graphic arts industry. With the TROIE team, he helps you choose what to say, to whom, and where to invest. Then he stays with you to make it happen.",
    book: "Book 30 min",
    project: "Start a project",
    problemsTitle: "What we solve with you.",
    problems: [
      {
        q: "Your positioning is unclear.",
        a: "We clarify what sets you apart and how to say it.",
        d: "Deliverable: a short brand platform the whole team can use.",
      },
      {
        q: "You don't know where to invest.",
        a: "We choose the channels with you and how to split the effort.",
        d: "Deliverable: a dated media plan.",
      },
      {
        q: "Your campaigns cost more than they bring in.",
        a: "We take over your Google, Meta or LinkedIn campaigns and how you read their results.",
        d: "Deliverable: a tracking dashboard and a regular review.",
      },
      {
        q: "Your suppliers pull in different directions.",
        a: "We hold the course and coordinate agency, freelancers and in-house team.",
        d: "Deliverable: a shared roadmap.",
      },
    ],
    acqTitle: "Being found by your customers.",
    acqIntro:
      "Your customers search on Google, see your ads and also ask assistants like ChatGPT. We look at where they search, then make your site clear and readable everywhere.",
    acq: [
      {
        title: "Search engine optimisation (SEO)",
        body: "Clear pages for Google, built on what your customers actually search for.",
      },
      {
        title: "Online advertising (SEA)",
        body: "Google, Meta or LinkedIn campaigns, structured, tracked and adjusted with you.",
      },
      {
        title: "Search assistants (GEO)",
        body: "A site that ChatGPT, Claude or Perplexity can read. Nobody can guarantee a citation, and we don't promise one.",
      },
    ],
    scan: "Scan your website",
    methodTitle: "How we work.",
    method: [
      {
        title: "Understand",
        body: "We listen to your story, your customers and your numbers. We look at your market and your competitors.",
      },
      {
        title: "Decide",
        body: "We give you clear options, with the reasons behind them. You decide with us. Everything is written down in a proposal and a quote.",
      },
      {
        title: "Do",
        body: "The team delivers: content, images, website, campaigns. Or we support your teams and suppliers.",
      },
      {
        title: "Follow up",
        body: "We review the results with you, adjust and prepare what comes next.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How do we start?",
        a: "With a 30-minute call. Then we send you a written proposal and a quote.",
      },
      {
        q: "Do I need a marketing team?",
        a: "No. We work with your team, with your suppliers, or we take on the role of fractional marketing director.",
      },
      {
        q: "Do you use AI?",
        a: "Yes, as a tool. It speeds up research and production. The analysis, the choices and our relationship with you stay human.",
      },
    ],
  },
} as const;

/* Classes des boutons (fond crème). La zone cliquable du lien souligné
   garde 48 px de haut pour le pouce, le trait reste collé au texte. */
const BTN_BOOK =
  "group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#2a2e37] hover:text-white";
const BTN_LINK =
  "group inline-flex min-h-[48px] items-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = COPY[locale === "en" ? "en" : "fr"];
  return {
    title: seoTitle(c.metaTitle),
    description: metaDescription(c.metaDesc),
    alternates: {
      canonical: `/${locale}/strategie`,
      languages: { fr: "/fr/strategie", en: "/en/strategie" },
    },
    ...pageSocial({
      locale,
      path: "/strategie",
      title: c.metaTitle,
      description: c.metaDesc,
    }),
  };
}

export default async function StrategiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale === "en" ? "en" : "fr"];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://troiestudio.fr/${locale}/strategie#faq`,
    inLanguage: locale === "en" ? "en" : "fr",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd data={faqJsonLd} />
      <div aria-hidden="true" className="h-16 md:h-20" />

      {/* En-tête */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-16 md:px-12 md:pt-24">
        <p className="t-eyebrow">{c.eyebrow}</p>
        <h1 className="t-display mt-6 max-w-4xl text-4xl leading-[1.05] text-[var(--fg)] md:text-6xl">
          {c.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">
          {c.intro}
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_BOOK}>
            {c.book}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </a>
          <Link href={`/${locale}/contact?besoin=strategie#projet`} className={BTN_LINK}>
            <span className="inline-flex items-center gap-2.5 border-b-2 border-current pb-1.5">
              {c.project}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* Ce que nous réglons avec vous */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="t-display max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            {c.problemsTitle}
          </h2>
          <ul className="mt-12 grid gap-px border border-[var(--rule)] bg-[var(--rule)] md:mt-16 md:grid-cols-2">
            {c.problems.map((p) => (
              <li key={p.q} className="flex flex-col bg-[var(--bg)] p-8">
                <h3 className="t-display text-2xl text-[var(--fg)] md:text-3xl">{p.q}</h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--fg-2)]">{p.a}</p>
                <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-[var(--accent)]">
                  {p.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Être trouvé par vos clients */}
      <section id="acquisition" className="scroll-mt-24 border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="t-display max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            {c.acqTitle}
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.acqIntro}
          </p>
          <ul className="mt-12 grid gap-px border border-[var(--rule)] bg-[var(--rule)] md:mt-16 md:grid-cols-3">
            {c.acq.map((a) => (
              <li key={a.title} className="flex flex-col bg-[var(--bg)] p-8">
                <h3 className="t-display text-2xl text-[var(--fg)]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {a.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Un exemple : la vidéo Autajon (même bloc que l'accueil) */}
      <ProofCase locale={locale} id="exemple" />

      {/* Qui vous accompagne */}
      <FounderBlock locale={locale} compact />

      {/* Questions fréquentes (même tableau que le JSON-LD FAQPage). Le padding
          est porté par le summary : toute la ligne de la question se touche. */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 lg:gap-x-16">
            <div className="md:col-span-5">
              <h2 className="t-display text-3xl text-[var(--fg)] md:text-5xl">{c.faqTitle}</h2>
            </div>
            <div className="md:col-span-7">
              <ul className="border-t border-[var(--rule)]">
                {c.faq.map((item) => (
                  <li key={item.q} className="border-b border-[var(--rule)]">
                    <details className="group">
                      <summary className="flex min-h-[48px] cursor-pointer list-none items-start justify-between gap-6 py-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--accent)]">
                        <span>{item.q}</span>
                        <span
                          aria-hidden="true"
                          className="font-sans text-base text-[var(--fg-2)] transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="-mt-1 max-w-2xl pb-5 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                        {item.a}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
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
