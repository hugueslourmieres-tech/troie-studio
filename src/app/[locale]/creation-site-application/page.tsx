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
 * Page de service « Sites et applications » (23/10/2026), FR et EN.
 * Les réalisations restent sur /creation/web : cette page dit ce que nous
 * faisons et renvoie vers elles. Color Guesser et Bilber sont des produits
 * maison (page /hugues).
 */
const PATH = "/creation-site-application";

const COPY = {
  fr: {
    metaTitle: "Création de sites et d'applications sur mesure",
    metaDesc:
      "Sites vitrines, boutiques en ligne, applications web et mobiles. Conçus, développés et mis en ligne par une agence basée à Nice, pour toute la France.",
    eyebrow: "Création de sites et d'applications",
    title: "Sites et applications.",
    intro:
      "Un site vitrine, une boutique, une application web ou mobile. Nous les concevons, nous les développons et nous les mettons en ligne. Avec un seul but : qu'ils vous apportent des clients.",
    whatTitle: "Ce que nous faisons.",
    what: [
      "Nous partons de vos objectifs : demandes de devis, ventes, inscriptions.",
      "Nous écrivons les textes avec vous, avant le design.",
      "Nous dessinons des pages claires, pensées d'abord pour le téléphone.",
      "Nous développons des sites rapides, prêts pour Google dès la mise en ligne.",
      "Nous construisons aussi des applications web et mobiles, des outils internes et des jeux.",
      "Nous relions vos formulaires à votre CRM et à des relances automatiques.",
      "Après la mise en ligne, nous restons là pour mesurer et faire évoluer.",
    ],
    worksTitle: "Nos sites sont en ligne.",
    worksBody:
      "Sites vitrines, e-commerce, applications web et jeux. Vous pouvez tous les essayer.",
    worksLink: "Voir les réalisations",
    shopLink: "Boutiques Shopify",
    proofTitle: "Des résultats mesurés chez nos clients.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Combien coûte un site ?",
        a: "C'est sur devis, après un appel de 30 minutes. Le prix dépend du nombre de pages, des fonctions voulues et des contenus à produire.",
      },
      {
        q: "Quels outils utilisez-vous ?",
        a: "Cela dépend du projet. Shopify pour une boutique. Un développement sur mesure pour un site ou une application qui doit aller vite et évoluer. Nous vous expliquons le choix avant de commencer.",
      },
      {
        q: "Pourrai-je modifier mon site moi-même ?",
        a: "Oui, si vous le souhaitez. Nous prévoyons ce qu'il faut pour mettre à jour les textes, les photos et les produits. Nous vous montrons comment faire.",
      },
      {
        q: "Faites-vous aussi des applications mobiles ?",
        a: "Oui. Applications web et mobiles, outils internes, jeux. Color Guesser et Bilber sont deux de nos produits maison, en ligne.",
      },
      {
        q: "Le référencement est-il compris ?",
        a: "Les bases, oui : structure, vitesse, balises, données structurées. Le travail de fond sur le référencement se fait ensuite, dans la durée.",
      },
    ],
    serviceType: "Création de sites web et d'applications",
  },
  en: {
    metaTitle: "Custom websites and apps",
    metaDesc:
      "Showcase websites, online stores, web and mobile apps. Designed, built and launched by an agency based in Nice, France, for clients across France.",
    eyebrow: "Websites and apps",
    title: "Websites and apps.",
    intro:
      "A showcase site, a store, a web or mobile app. We design, build and launch them. With one goal: bringing you customers.",
    whatTitle: "What we do.",
    what: [
      "We start from your goals: quote requests, sales, sign-ups.",
      "We write the copy with you, before the design.",
      "We design clear pages, made for phones first.",
      "We build fast websites, ready for Google from launch day.",
      "We also build web and mobile apps, internal tools and games.",
      "We connect your forms to your CRM and to automated follow-ups.",
      "After launch, we stay on to measure and improve.",
    ],
    worksTitle: "Our websites are live.",
    worksBody: "Showcase sites, e-commerce, web apps and games. You can try them all.",
    worksLink: "See our work",
    shopLink: "Shopify stores",
    proofTitle: "Measured results for our clients.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much does a website cost?",
        a: "It is quoted after a 30-minute call. The price depends on the number of pages, the features you need and the content to produce.",
      },
      {
        q: "Which tools do you use?",
        a: "It depends on the project. Shopify for a store. Custom development for a site or app that must be fast and keep evolving. We explain the choice before we start.",
      },
      {
        q: "Will I be able to edit my site myself?",
        a: "Yes, if you wish. We set things up so you can update copy, photos and products. We show you how.",
      },
      {
        q: "Do you also build mobile apps?",
        a: "Yes. Web and mobile apps, internal tools, games. Color Guesser and Bilber are two of our own products, live online.",
      },
      {
        q: "Is SEO included?",
        a: "The basics, yes: structure, speed, tags, structured data. In-depth search work comes next, over time.",
      },
    ],
    serviceType: "Website and app development",
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

export default async function SitesAppsPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} art="orchid" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="site" />

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block title={c.worksTitle}>
        <Body>{c.worksBody}</Body>
        <div className="mt-6 flex flex-col items-start gap-1">
          <ArrowLink href={`/${locale}/creation/web`}>{c.worksLink}</ArrowLink>
          <ArrowLink href={`/${locale}/agence-e-commerce-shopify`}>{c.shopLink}</ArrowLink>
        </div>
      </Block>

      <ProofGrid locale={locale} title={c.proofTitle} />

      <Faq title={c.faqTitle} items={c.faq} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
