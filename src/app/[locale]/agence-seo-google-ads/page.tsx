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

/**
 * Page de service « Agence SEO et Google Ads » (23/10/2026), FR et EN.
 * Aucun prix, aucune promesse de position : personne ne contrôle Google.
 */
const PATH = "/agence-seo-google-ads";

const COPY = {
  fr: {
    metaTitle: "Agence SEO et Google Ads pour PME et e-commerce",
    metaDesc:
      "Référencement naturel, campagnes Google Ads et Meta, suivi chaque mois. Une agence basée à Nice, pour les PME et les e-commerces de toute la France.",
    eyebrow: "SEO et Google Ads",
    title: "Agence SEO et Google Ads pour PME et e-commerce.",
    intro:
      "Vos clients cherchent sur Google. Nous faisons en sorte qu'ils vous trouvent, puis qu'ils achètent. Référencement naturel, campagnes payantes, suivi chaque mois.",
    whatTitle: "Ce que nous faisons.",
    what: [
      "Nous partons des recherches réelles de vos clients, mot par mot.",
      "Nous corrigeons la technique du site : vitesse, structure, balises, pages indexées.",
      "Nous rédigeons des pages claires, qui répondent à une vraie question.",
      "Nous créons et pilotons vos campagnes Google Ads, Google Shopping et Meta.",
      "Nous installons le suivi des conversions, pour savoir ce qui rapporte.",
      "Chaque mois, un point simple : ce qui marche, ce que nous coupons, ce que nous testons.",
    ],
    linksTitle: "Avec le reste de votre digital.",
    linksBody:
      "Le référencement commence avec le site. Une campagne vend mieux avec de bonnes images. Nous faisons les deux, avec la même équipe.",
    links: [
      { href: "creation-site-application", label: "Sites et applications" },
      { href: "agence-e-commerce-shopify", label: "Boutiques Shopify" },
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
    ],
    serviceType: "Référencement naturel (SEO) et publicité Google Ads",
  },
  en: {
    metaTitle: "SEO and Google Ads agency for SMEs and e-commerce",
    metaDesc:
      "Organic search, Google Ads and Meta campaigns, reviewed every month. An agency based in Nice, France, working with SMEs and online stores across France.",
    eyebrow: "SEO and Google Ads",
    title: "SEO and Google Ads agency for SMEs and e-commerce.",
    intro:
      "Your customers search on Google. We make sure they find you, then buy. Organic search, paid campaigns, a review every month.",
    whatTitle: "What we do.",
    what: [
      "We start from your customers' real searches, word by word.",
      "We fix the technical side of the site: speed, structure, tags, indexed pages.",
      "We write clear pages that answer a real question.",
      "We build and run your Google Ads, Google Shopping and Meta campaigns.",
      "We set up conversion tracking, so you know what pays.",
      "Every month, a simple review: what works, what we cut, what we test.",
    ],
    linksTitle: "With the rest of your digital work.",
    linksBody:
      "Search starts with the website. A campaign sells better with good images. We do both, with the same team.",
    links: [
      { href: "creation-site-application", label: "Websites and apps" },
      { href: "agence-e-commerce-shopify", label: "Shopify stores" },
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
    ],
    serviceType: "Search engine optimisation (SEO) and Google Ads advertising",
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

export default async function SeoAdsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[loc(locale)];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd
        data={serviceJsonLd({
          locale,
          path: PATH,
          name: c.metaTitle,
          serviceType: c.serviceType,
          description: c.metaDesc,
        })}
      />
      <JsonLd data={faqJsonLd(locale, PATH, c.faq)} />
      <div aria-hidden="true" className="h-16 md:h-20" />

      <PageHero locale={locale} eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="strategie" />

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
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
