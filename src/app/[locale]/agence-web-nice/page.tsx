import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { JsonLd, ORG_ID } from "@/components/JsonLd";
import {
  ArrowLink,
  BASE,
  Block,
  Body,
  Faq,
  GBP_URL,
  PageHero,
  ProofGrid,
  faqJsonLd,
  loc,
  pageAlternates,
} from "@/components/SeoBlocks";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

/**
 * Page locale « Agence web à Nice » (23/10/2026), FR et EN (même slug, comme
 * le reste du site). Pas d'adresse postale précise (audit données
 * personnelles du 17/09/2026) : ville et code postal seulement. La fiche
 * Google est liée par son Place ID, jamais par le lien d'avis.
 */
const PATH = "/agence-web-nice";

const COPY = {
  fr: {
    metaTitle: "Agence web à Nice et sur la Côte d'Azur",
    metaDesc:
      "Agence web basée à Nice : sites, e-commerce, photo et vidéo, réseaux sociaux, SEO et Google Ads. Pour les entreprises de la Côte d'Azur et de toute la France.",
    eyebrow: "Agence web à Nice",
    title: "Votre agence web à Nice, pour vendre partout en France.",
    intro:
      "TROIE Studio est basé à Nice. Nous travaillons avec des entreprises des Alpes-Maritimes et de toute la France. Sur place quand il le faut, à distance le reste du temps.",
    localTitle: "Sur la Côte d'Azur.",
    local: [
      "De Nice à Monaco, de Cannes à Antibes, jusqu'à Sophia Antipolis, nous venons chez vous. Pour un rendez-vous, un atelier, un tournage ou une séance photo.",
      "Le reste avance à distance, avec un seul interlocuteur. Vous savez toujours qui fait quoi.",
    ],
    franceTitle: "Partout en France.",
    france: [
      "Être à Nice ne limite pas notre terrain. Nous travaillons aussi avec des entreprises ailleurs en France, à distance. Les points se font en visio, les livrables se partagent en ligne.",
    ],
    servicesTitle: "Ce que nous faisons.",
    services: [
      { href: "creation-site-application", label: "Sites et applications" },
      { href: "agence-e-commerce-shopify", label: "E-commerce Shopify" },
      { href: "medias", label: "Photo et vidéo" },
      { href: "strategie", label: "Communication et réseaux sociaux" },
      { href: "agence-seo-google-ads", label: "SEO et Google Ads" },
      { href: "accompagnement", label: "Accompagnement des équipes" },
    ],
    googleTitle: "Notre fiche Google.",
    googleBody: "Retrouvez TROIE Studio sur Google Maps.",
    googleLink: "Voir la fiche Google",
    proofTitle: "Des résultats mesurés chez nos clients.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Où êtes-vous situés ?",
        a: "Nous sommes basés à Nice, dans les Alpes-Maritimes. Nous nous déplaçons sur la Côte d'Azur pour les rendez-vous, les ateliers et les tournages.",
      },
      {
        q: "Travaillez-vous seulement avec des entreprises de Nice ?",
        a: "Non. Nous travaillons partout en France et à distance. Être à Nice nous permet de venir vite chez nos clients de la région.",
      },
      {
        q: "Pouvez-vous venir tourner une vidéo à Monaco ou à Cannes ?",
        a: "Oui. Les photos et les vidéos se font sur place, partout sur la Côte d'Azur. Au-delà, nous en parlons ensemble.",
      },
      {
        q: "Comment se passe le premier rendez-vous ?",
        a: "Un appel de 30 minutes, en visio ou par téléphone. Nous comprenons votre besoin. Ensuite, nous vous envoyons une proposition écrite et un devis.",
      },
    ],
  },
  en: {
    metaTitle: "Web agency in Nice and on the French Riviera",
    metaDesc:
      "Web agency based in Nice, France: websites, e-commerce, photo and video, social media, SEO and Google Ads. For companies on the Riviera and across France.",
    eyebrow: "Web agency in Nice",
    title: "Your web agency in Nice, to sell across France.",
    intro:
      "TROIE Studio is based in Nice. We work with companies in the Alpes-Maritimes and across France. On site when needed, remotely the rest of the time.",
    localTitle: "On the French Riviera.",
    local: [
      "From Nice to Monaco, from Cannes to Antibes, up to Sophia Antipolis, we come to you. For a meeting, a workshop, a shoot or a photo session.",
      "The rest moves forward remotely, with a single contact. You always know who does what.",
    ],
    franceTitle: "Across France.",
    france: [
      "Being in Nice does not limit where we work. We also work with companies elsewhere in France, remotely. Meetings happen by video call, deliverables are shared online.",
    ],
    servicesTitle: "What we do.",
    services: [
      { href: "creation-site-application", label: "Websites and apps" },
      { href: "agence-e-commerce-shopify", label: "Shopify e-commerce" },
      { href: "medias", label: "Photo and video" },
      { href: "strategie", label: "Communication and social media" },
      { href: "agence-seo-google-ads", label: "SEO and Google Ads" },
      { href: "accompagnement", label: "Team support" },
    ],
    googleTitle: "Our Google profile.",
    googleBody: "Find TROIE Studio on Google Maps.",
    googleLink: "See the Google profile",
    proofTitle: "Measured results for our clients.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Where are you located?",
        a: "We are based in Nice, in the Alpes-Maritimes. We travel across the French Riviera for meetings, workshops and shoots.",
      },
      {
        q: "Do you only work with companies in Nice?",
        a: "No. We work across France and remotely. Being in Nice lets us reach our clients in the region quickly.",
      },
      {
        q: "Can you come and shoot a video in Monaco or Cannes?",
        a: "Yes. Photos and videos are shot on site, anywhere on the French Riviera. Further away, we discuss it together.",
      },
      {
        q: "How does the first meeting work?",
        a: "A 30-minute call, by video or phone. We understand your need. Then we send you a written proposal and a quote.",
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = COPY[loc(locale)];
  return {
    title: seoTitle(c.metaTitle),
    description: metaDescription(c.metaDesc),
    alternates: pageAlternates(locale, PATH),
    ...pageSocial({ locale, path: PATH, title: c.metaTitle, description: c.metaDesc }),
  };
}

export default async function AgenceWebNicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[loc(locale)];

  // Même @id que l'organisation du layout : Google fusionne les deux nœuds.
  const localJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": ORG_ID,
    name: "TROIE Studio",
    url: `${BASE}/${locale}${PATH}`,
    image: `${BASE}/images/brand/og-image.png`,
    description: c.metaDesc,
    priceRange: "Sur devis",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nice",
      postalCode: "06000",
      addressRegion: "Provence-Alpes-Côte d'Azur",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 43.7102, longitude: 7.262 },
    hasMap: GBP_URL,
    sameAs: [
      GBP_URL,
      "https://www.linkedin.com/company/troiestudio",
      "https://www.instagram.com/troiestudio",
    ],
    areaServed: [
      { "@type": "City", name: "Nice" },
      { "@type": "City", name: "Cannes" },
      { "@type": "City", name: "Antibes" },
      { "@type": "Place", name: "Sophia Antipolis" },
      { "@type": "Country", name: "Monaco" },
      { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
      { "@type": "AdministrativeArea", name: "Côte d'Azur" },
      { "@type": "Country", name: "France" },
    ],
  };

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd data={localJsonLd} />
      <JsonLd data={faqJsonLd(locale, PATH, c.faq)} />
      <div aria-hidden="true" className="h-16 md:h-20" />

      <PageHero locale={locale} art="dusk" eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <Block id="cote-d-azur" title={c.localTitle}>
        {c.local.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="france" title={c.franceTitle}>
        {c.france.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="services" title={c.servicesTitle}>
        <ul className="border-t border-[var(--rule)]">
          {c.services.map((s) => (
            <li key={s.href} className="border-b border-[var(--rule)]">
              <Link
                href={`/${locale}/${s.href}`}
                className="group flex min-h-14 items-center justify-between gap-6 py-4 text-base font-medium text-[var(--fg)] transition-colors hover:text-[var(--accent)] md:text-lg"
              >
                {s.label}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <ProofGrid locale={locale} title={c.proofTitle} />

      <Block id="google" title={c.googleTitle}>
        <Body>{c.googleBody}</Body>
        <div className="mt-6">
          <ArrowLink href={GBP_URL}>{c.googleLink}</ArrowLink>
        </div>
      </Block>

      <Faq title={c.faqTitle} items={c.faq} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
