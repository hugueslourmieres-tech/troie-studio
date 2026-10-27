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
import { LinkList, breadcrumbJsonLd } from "../_local/blocks";

/**
 * Page locale « Agence web à Nice » (23/10/2026), FR et EN (même slug, comme
 * le reste du site). Pas d'adresse postale précise (audit données
 * personnelles du 17/09/2026) : ville et code postal seulement. La fiche
 * Google est liée par son Place ID, jamais par le lien d'avis.
 *
 * 25/10/2026 : bloc « Nous intervenons aussi à » vers les pages Monaco,
 * Cannes et Antibes, et création d'applications. FAQ enrichie, fil d'Ariane.
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
    alsoTitle: "Nous intervenons aussi à Monaco, Cannes et Antibes.",
    alsoBody:
      "Chaque ville a ses clients et ses recherches. Nous avons une page pour chacune.",
    also: [
      { href: "agence-web-monaco", label: "Monaco" },
      { href: "agence-web-cannes-antibes", label: "Cannes, Antibes et Sophia Antipolis" },
      { href: "creation-application-nice", label: "Création d'applications à Nice" },
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
        a: "Un premier échange, par écrit ou en visio. Nous comprenons votre besoin. Ensuite, nous vous envoyons une proposition écrite et un devis.",
      },
      {
        q: "Combien coûte un site internet à Nice ?",
        a: "Un site, une boutique ou une application sont sur devis, avec un prix et un délai fermes.",
      },
      {
        q: "Mon site existe déjà. Par où commencer ?",
        a: "Par un audit. Vous savez ce qui freine les demandes et les ventes, et ce qu'il faut corriger en premier. Vous décidez ensuite de la suite.",
      },
      {
        q: "Développez-vous aussi des applications ?",
        a: "Oui. Applications web et mobiles, espaces clients, outils de réservation et outils internes. Nos produits Bien en règle, Color Guesser et Bilber sont en ligne.",
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
    alsoTitle: "We also work in Monaco, Cannes and Antibes.",
    alsoBody: "Each town has its own customers and searches. We have a page for each.",
    also: [
      { href: "agence-web-monaco", label: "Monaco" },
      { href: "agence-web-cannes-antibes", label: "Cannes, Antibes and Sophia Antipolis" },
      { href: "creation-application-nice", label: "App development in Nice" },
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
        a: "A first exchange, in writing or by video. We understand your need. Then we send you a written proposal and a quote.",
      },
      {
        q: "How much does a website cost in Nice?",
        a: "A website, a store or an app is quoted, with a firm price and timeline.",
      },
      {
        q: "My site already exists. Where do I start?",
        a: "With an audit. You know what holds back enquiries and sales, and what to fix first. Then you decide what comes next.",
      },
      {
        q: "Do you also build apps?",
        a: "Yes. Web and mobile apps, client portals, booking tools and internal tools. Our products Bien en règle, Color Guesser and Bilber are live.",
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
    image: `${BASE}/images/brand/og-troie-2026.png`,
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
      <JsonLd data={breadcrumbJsonLd(locale, PATH, c.eyebrow)} />
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

      <Block id="aussi" title={c.alsoTitle}>
        <Body>{c.alsoBody}</Body>
        <div className="mt-8">
          <LinkList locale={locale} items={c.also} />
        </div>
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
