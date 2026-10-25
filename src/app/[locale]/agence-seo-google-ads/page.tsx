import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { JsonLd } from "@/components/JsonLd";
import {
  ArrowLink,
  Block,
  Body,
  Faq,
  PageHero,
  ProofGrid,
  Sentences,
  faqJsonLd,
  loc,
  pageAlternates,
  serviceJsonLd,
} from "@/components/SeoBlocks";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";
import { LinkList, breadcrumbJsonLd } from "../_local/blocks";

/**
 * Page de service « Agence SEO et Google Ads » (23/10/2026), FR et EN.
 * Aucun prix, aucune promesse de position : personne ne contrôle Google.
 *
 * 25/10/2026 : renforcée sur Nice, la Côte d'Azur et Monaco (titre, intro,
 * bloc local, FAQ) plutôt que de créer /agence-seo-google-ads-nice, pour
 * éviter deux pages sur la même requête. Aucun prix affiché (retirés le 9/10/2026).
 */
const PATH = "/agence-seo-google-ads";

const COPY = {
  fr: {
    metaTitle: "Agence SEO et Google Ads à Nice, pour PME et e-commerce",
    metaDesc:
      "Référencement naturel, Google Ads et Meta, suivi chaque mois. Agence basée à Nice, pour les PME de la Côte d'Azur, de Monaco et de toute la France.",
    crumb: "SEO et Google Ads",
    eyebrow: "SEO et Google Ads",
    title: "Agence SEO et Google Ads pour PME et e-commerce.",
    intro:
      "Vos clients cherchent sur Google. Nous faisons en sorte qu'ils vous trouvent, puis qu'ils achètent. Référencement naturel, campagnes payantes, suivi chaque mois. Depuis Nice, pour la Côte d'Azur, Monaco et toute la France.",
    whatTitle: "Ce que nous faisons.",
    what: [
      "Nous partons des recherches réelles de vos clients, mot par mot.",
      "Nous corrigeons la technique du site : vitesse, structure, balises, pages indexées.",
      "Nous rédigeons des pages claires, qui répondent à une vraie question.",
      "Nous créons et pilotons vos campagnes Google Ads, Google Shopping et Meta.",
      "Nous installons le suivi des conversions, pour savoir ce qui rapporte.",
      "Chaque mois, un point simple : ce qui marche, ce que nous coupons, ce que nous testons.",
    ],
    localTitle: "À Nice, sur la Côte d'Azur et à Monaco.",
    local: [
      "Une entreprise locale ne se cherche pas comme une marque nationale. Vos clients tapent « près de moi », le nom de leur ville ou de leur quartier. Votre fiche Google compte autant que votre site.",
      "Nous travaillons votre fiche Google, vos pages par ville et vos avis. Nous ciblons vos campagnes Google Ads sur les communes où sont vos clients : Nice, Cannes, Antibes, Sophia Antipolis, Monaco.",
      "À Monaco et sur le littoral, une partie de la clientèle cherche en anglais. Nous préparons les pages et les annonces dans les deux langues.",
    ],
    auditText:
      "Pour commencer, un audit : ce qui vous empêche d'être trouvé, et les corrections par priorité.",
    auditLink: "Demander l'audit",
    localLinks: [
      { href: "agence-web-nice", label: "Agence web à Nice" },
      { href: "agence-web-monaco", label: "Agence web à Monaco" },
      { href: "agence-web-cannes-antibes", label: "Agence web à Cannes et Antibes" },
    ],
    linksTitle: "Avec le reste de votre digital.",
    linksBody:
      "Le référencement commence avec le site. Une campagne vend mieux avec de bonnes images. Nous faisons les deux, avec la même équipe.",
    links: [
      { href: "creation-site-application", label: "Sites et applications" },
      { href: "agence-e-commerce-shopify", label: "Boutiques Shopify" },
      { href: "consultant-google-ads", label: "Consultant Google Ads : un senior sur votre compte" },
    ],
    proofTitle: "Des résultats mesurés chez nos clients.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Combien coûte une campagne Google Ads ?",
        a: "Il y a deux parts : le budget versé à Google et nos honoraires. Les deux se fixent ensemble, sur devis, après un appel de 30 minutes.",
      },
      {
        q: "En combien de temps voit-on les effets du SEO ?",
        a: "Le référencement naturel prend du temps. Il faut souvent plusieurs mois avant des effets nets. La publicité peut amener des visites dès son lancement. Nous combinons souvent les deux.",
      },
      {
        q: "Garantissez-vous la première place sur Google ?",
        a: "Non. Personne ne contrôle Google. Nous nous engageons sur la méthode, sur le travail fait et sur un suivi clair des résultats, chaque mois.",
      },
      {
        q: "Faites-vous aussi la publicité sur Meta et LinkedIn ?",
        a: "Oui. Google reste souvent le premier levier. Selon votre cible, nous ajoutons Meta (Facebook et Instagram) ou LinkedIn.",
      },
      {
        q: "Travaillez-vous avec des entreprises hors de Nice ?",
        a: "Oui. Nous sommes basés à Nice et nous travaillons partout en France, à distance. Les points se font en visio.",
      },
      {
        q: "Pouvez-vous améliorer ma visibilité locale à Nice ou à Monaco ?",
        a: "Oui. Nous travaillons votre fiche Google, vos avis et des pages pour chaque ville que vous servez. Nous pouvons aussi cibler vos annonces Google Ads sur quelques communes seulement.",
      },
      {
        q: "Par quoi commencer ?",
        a: "Par un audit. Il montre ce qui vous empêche d'être trouvé et ce qui coûte le moins cher à corriger. Vous décidez ensuite si nous continuons ensemble chaque mois.",
      },
    ],
    serviceType: "Référencement naturel (SEO) et publicité Google Ads",
  },
  en: {
    metaTitle: "SEO and Google Ads agency in Nice, for SMEs and e-commerce",
    metaDesc:
      "Organic search, Google Ads and Meta, reviewed every month. Agency based in Nice, France, for SMEs on the Riviera, in Monaco and across France.",
    crumb: "SEO and Google Ads",
    eyebrow: "SEO and Google Ads",
    title: "SEO and Google Ads agency for SMEs and e-commerce.",
    intro:
      "Your customers search on Google. We make sure they find you, then buy. Organic search, paid campaigns, a review every month. From Nice, for the Riviera, Monaco and all of France.",
    whatTitle: "What we do.",
    what: [
      "We start from your customers' real searches, word by word.",
      "We fix the technical side of the site: speed, structure, tags, indexed pages.",
      "We write clear pages that answer a real question.",
      "We build and run your Google Ads, Google Shopping and Meta campaigns.",
      "We set up conversion tracking, so you know what pays.",
      "Every month, a simple review: what works, what we cut, what we test.",
    ],
    localTitle: "In Nice, on the Riviera and in Monaco.",
    local: [
      "A local business is not searched for like a national brand. Your customers type \"near me\", their town or their neighbourhood. Your Google profile matters as much as your website.",
      "We work on your Google profile, your city pages and your reviews. We target your Google Ads campaigns on the towns where your customers are: Nice, Cannes, Antibes, Sophia Antipolis, Monaco.",
      "In Monaco and along the coast, part of the clientele searches in English. We prepare pages and ads in both languages.",
    ],
    auditText:
      "To start, an audit: what stops you from being found, and fixes by priority.",
    auditLink: "Request the audit",
    localLinks: [
      { href: "agence-web-nice", label: "Web agency in Nice" },
      { href: "agence-web-monaco", label: "Web agency for Monaco" },
      { href: "agence-web-cannes-antibes", label: "Web agency in Cannes and Antibes" },
    ],
    linksTitle: "With the rest of your digital work.",
    linksBody:
      "Search starts with the website. A campaign sells better with good images. We do both, with the same team.",
    links: [
      { href: "creation-site-application", label: "Websites and apps" },
      { href: "agence-e-commerce-shopify", label: "Shopify stores" },
      { href: "consultant-google-ads", label: "Google Ads consultant: a senior on your account" },
    ],
    proofTitle: "Measured results for our clients.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much does a Google Ads campaign cost?",
        a: "There are two parts: the budget paid to Google and our fees. Both are set together, in a quote, after a 30-minute call.",
      },
      {
        q: "How long before SEO shows results?",
        a: "Organic search takes time. It often takes several months before clear effects. Advertising can bring visits from launch day. We often combine both.",
      },
      {
        q: "Do you guarantee first place on Google?",
        a: "No. Nobody controls Google. We commit to the method, to the work done and to a clear monthly review of the results.",
      },
      {
        q: "Do you also run ads on Meta and LinkedIn?",
        a: "Yes. Google is often the first lever. Depending on your audience, we add Meta (Facebook and Instagram) or LinkedIn.",
      },
      {
        q: "Do you work with companies outside Nice?",
        a: "Yes. We are based in Nice and work across France, remotely. Meetings happen by video call.",
      },
      {
        q: "Can you improve my local visibility in Nice or Monaco?",
        a: "Yes. We work on your Google profile, your reviews and pages for each town you serve. We can also target your Google Ads on a few towns only.",
      },
      {
        q: "Where should I start?",
        a: "With an audit. It shows what stops you from being found and what is cheapest to fix. Then you decide whether we continue together every month.",
      },
    ],
    serviceType: "Search engine optimisation (SEO) and Google Ads advertising",
  },
} as const;

const AREA = [
  { "@type": "City", name: "Nice" },
  { "@type": "City", name: "Cannes" },
  { "@type": "City", name: "Antibes" },
  { "@type": "Place", name: "Sophia Antipolis" },
  { "@type": "Country", name: "Monaco" },
  { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
  { "@type": "AdministrativeArea", name: "Côte d'Azur" },
  { "@type": "Country", name: "France" },
];

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

export default async function SeoAdsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[loc(locale)];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd
        data={{
          ...serviceJsonLd({
            locale,
            path: PATH,
            name: c.metaTitle,
            serviceType: c.serviceType,
            description: c.metaDesc,
          }),
          areaServed: AREA,
        }}
      />
      <JsonLd data={faqJsonLd(locale, PATH, c.faq)} />
      <JsonLd data={breadcrumbJsonLd(locale, PATH, c.crumb)} />
      <div aria-hidden="true" className="h-16 md:h-20" />

      <PageHero locale={locale} art="sky" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="strategie" />

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block id="local" title={c.localTitle}>
        {c.local.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <Body>{c.auditText}</Body>
        <div className="mt-6">
          <ArrowLink href={`/${locale}/contact?besoin=strategie#projet`}>{c.auditLink}</ArrowLink>
        </div>
        <div className="mt-8">
          <LinkList locale={locale} items={c.localLinks} />
        </div>
      </Block>

      <ProofGrid locale={locale} title={c.proofTitle} />

      <Block title={c.linksTitle}>
        <Body>{c.linksBody}</Body>
        <div className="mt-6 flex flex-col items-start gap-1">
          {c.links.map((l) => (
            <ArrowLink key={l.href} href={`/${locale}/${l.href}`}>
              {l.label}
            </ArrowLink>
          ))}
        </div>
      </Block>

      <Faq title={c.faqTitle} items={c.faq} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
