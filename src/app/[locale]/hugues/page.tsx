import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

const CAL_URL = "https://cal.com/troiestudio/30min";
const LINKEDIN_URL = "https://www.linkedin.com/in/hugueslourmieres";

/**
 * Page « Hugues » (21/10/2026), pour les recruteurs et les clients qui
 * veulent savoir qui pilote. Chiffres repris du CV 2026 de Hugues, tous
 * obtenus chez Rutherford (son poste de directeur marketing) : ils sont
 * présentés comme son parcours, jamais comme des clients du studio. Pas
 * d'adresse ni de téléphone sur cette page (audit données personnelles).
 */
const COPY = {
  fr: {
    metaTitle: "Hugues Lourmieres, directeur marketing et fondateur",
    metaDesc:
      "Directeur marketing depuis 2018, fondateur de TROIE Studio à Nice. Ventes B2B multipliées par cinq, trafic organique doublé, 175 000 € de commandes pour 5 000 € de contenus.",
    eyebrow: "Le fondateur",
    title: "Hugues Lourmieres.",
    intro:
      "Directeur marketing depuis 2018, fondateur de TROIE Studio. Photographe et vidéaste. Je pilote la marque, l'acquisition et les contenus, et je fabrique aussi : sites, photos, films.",
    alt: "Hugues Lourmieres, portrait",
    resultsTitle: "Ses résultats.",
    resultsNote: "Chez Rutherford, une PME de l'impression et de l'emballage (B2B).",
    results: [
      { value: "×5", label: "Ventes B2B, de 2 à 10 unités par an" },
      { value: "175 000 €", label: "De commandes pour 5 000 € de contenus" },
      { value: "+100 %", label: "De trafic organique en 6 mois" },
      { value: "+40 %", label: "De demandes entrantes via le nouveau site" },
    ],
    pathTitle: "Parcours.",
    path: [
      {
        years: "2024 à aujourd'hui",
        role: "Fondateur",
        org: "TROIE Studio, Nice",
        body: "Agence digitale : sites et applications, photo et vidéo, communication, SEO et publicité. Produits maison en ligne : Color Guesser et Bilber.",
      },
      {
        years: "2018 à aujourd'hui",
        role: "Directeur marketing, à temps partagé",
        org: "Rutherford",
        body: "Marketing B2B complet : site multilingue, SEO, SEA, publicité sur les réseaux, CRM et automatisation, marque, contenus et vidéo. Lancement d'Offset 360 avec X-Rite.",
      },
      {
        years: "2023 à 2024",
        role: "Responsable marketing",
        org: "GS Monaco",
        body: "Direction d'une équipe créative de cinq graphistes. Refonte du site, conversion, SEO et SEA, digital, print et marque.",
      },
      {
        years: "2015 à 2018",
        role: "Conseiller de vente, ambassadeur horlogerie",
        org: "CHANEL",
        body: "Expertise produit, clientèle internationale, lancements et événements en boutique. Photographies réalisées en interne pour la Maison.",
      },
    ],
    eduTitle: "Formation et langues.",
    edu: [
      "Master 2 Marketing digital et vente, Université Côte d'Azur",
      "Certification RGPD, Actis Formation, Monaco",
      "Français natif, anglais C1, espagnol B2, italien B1",
    ],
    linkedin: "Profil LinkedIn",
    book: "Réserver 30 min",
    works: "Voir les réalisations",
  },
  en: {
    metaTitle: "Hugues Lourmieres, marketing director and founder",
    metaDesc:
      "Marketing director since 2018, founder of TROIE Studio in Nice. B2B sales up five times, organic traffic doubled, €175,000 in orders from €5,000 of content.",
    eyebrow: "The founder",
    title: "Hugues Lourmieres.",
    intro:
      "Marketing director since 2018, founder of TROIE Studio. Photographer and filmmaker. I run brand, acquisition and content, and I also make things: websites, photos, films.",
    alt: "Hugues Lourmieres, portrait",
    resultsTitle: "His results.",
    resultsNote: "At Rutherford, a printing and packaging SME (B2B).",
    results: [
      { value: "×5", label: "B2B sales, from 2 to 10 units a year" },
      { value: "€175,000", label: "In orders from €5,000 of content" },
      { value: "+100%", label: "Organic traffic in 6 months" },
      { value: "+40%", label: "Inbound leads from the new website" },
    ],
    pathTitle: "Career.",
    path: [
      {
        years: "2024 to today",
        role: "Founder",
        org: "TROIE Studio, Nice",
        body: "Digital agency: websites and apps, photo and video, communication, SEO and advertising. Own products live: Color Guesser and Bilber.",
      },
      {
        years: "2018 to today",
        role: "Fractional marketing director",
        org: "Rutherford",
        body: "Full B2B marketing: multilingual website, SEO, SEA, social ads, CRM and automation, brand, content and video. Launch of Offset 360 with X-Rite.",
      },
      {
        years: "2023 to 2024",
        role: "Marketing manager",
        org: "GS Monaco",
        body: "Led a creative team of five designers. Website redesign, conversion, SEO and SEA, digital, print and brand.",
      },
      {
        years: "2015 to 2018",
        role: "Sales advisor, watch ambassador",
        org: "CHANEL",
        body: "Product expertise, international clientele, launches and in-store events. Photographs made in-house for the Maison.",
      },
    ],
    eduTitle: "Education and languages.",
    edu: [
      "Master's degree in Digital Marketing and Sales, Université Côte d'Azur",
      "GDPR certification, Actis Formation, Monaco",
      "French native, English C1, Spanish B2, Italian B1",
    ],
    linkedin: "LinkedIn profile",
    book: "Book 30 min",
    works: "See the work",
  },
} as const;

const BTN_BOOK =
  "group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#1a1714] transition hover:bg-[var(--ink)] hover:text-[#f5f0e6]";
const BTN_LINK =
  "group inline-flex min-h-[48px] items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]";

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
      canonical: `/${locale}/hugues`,
      languages: { fr: "/fr/hugues", en: "/en/hugues" },
    },
    ...pageSocial({
      locale,
      path: "/hugues",
      title: c.metaTitle,
      description: c.metaDesc,
    }),
  };
}

export default async function HuguesPage({
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

      {/* En-tête : portrait et accroche */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:px-12 md:pt-24 md:pb-28">
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-[var(--bg-2)]">
              <Image
                src="/images/about/hugues-studio.jpg"
                alt={c.alt}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
                style={{ objectPosition: "center 14%" }}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="t-eyebrow">{c.eyebrow}</p>
            <h1 className="t-display mt-6 text-5xl leading-[1.02] text-[var(--fg)] md:text-7xl">
              {c.title}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl">
              {c.intro}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_BOOK}>
                {c.book}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={BTN_LINK}>
                <span className="border-b-2 border-current pb-1.5">{c.linkedin} ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats chiffrés */}
      <section className="border-t border-[var(--accent)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="t-display text-3xl text-[var(--fg)] md:text-5xl">{c.resultsTitle}</h2>
          <p className="mt-4 text-sm text-[var(--fg-2)] md:text-base">{c.resultsNote}</p>
          <ul className="mt-12 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
            {c.results.map((r) => (
              <li key={r.label} className="bg-[var(--bg)] p-8">
                <p className="t-display text-4xl text-[var(--fg)] tabular-nums md:text-5xl">
                  {r.value}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)]">{r.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Parcours */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="t-display text-3xl text-[var(--fg)] md:text-5xl">{c.pathTitle}</h2>
          <ol className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {c.path.map((p) => (
              <li key={p.org} className="grid gap-3 py-8 md:grid-cols-12 md:gap-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)] md:col-span-3 md:pt-2">
                  {p.years}
                </p>
                <div className="md:col-span-9">
                  <h3 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
                    {p.role}, {p.org}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Formation et langues */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
          <h2 className="t-display text-3xl text-[var(--fg)] md:text-5xl">{c.eduTitle}</h2>
          <ul className="mt-10 space-y-3 text-base text-[var(--fg-2)] md:text-lg">
            {c.edu.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <Link href={`/${locale}/creation`} className={`${BTN_LINK} mt-12`}>
            <span className="border-b-2 border-current pb-1.5">{c.works} →</span>
          </Link>
        </div>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
