import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { JsonLd } from "@/components/JsonLd";
import {
  ArrowLink,
  Block,
  Body,
  Faq,
  PageHero,
  ProofChart,
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
 * Page de service « Agence e-commerce Shopify » (23/10/2026), FR et EN.
 * La page s'ouvre sur LOIR Paris : +164 % de ventes en ligne en deux ans
 * (src/lib/results.ts). Accord écrit du client à obtenir avant la mise en
 * production (voir /etudes-de-cas/loir-paris).
 */
const PATH = "/agence-e-commerce-shopify";

const COPY = {
  fr: {
    metaTitle: "Agence e-commerce Shopify qui fait vendre",
    metaDesc:
      "Création et refonte de boutiques Shopify, fiches produits, photo et vidéo, Google Shopping et Meta. LOIR Paris : +164 % de ventes en ligne en deux ans.",
    eyebrow: "Agence e-commerce Shopify",
    title: "Une boutique Shopify qui vend.",
    intro:
      "Nous créons votre boutique, ou nous reprenons celle que vous avez. Puis nous amenons les bons clients jusqu'au paiement.",
    leadValue: "+164 %",
    leadLabel: "de ventes en ligne en deux ans pour LOIR Paris, lues dans Shopify.",
    leadLink: "Lire l'étude de cas",
    whatTitle: "Ce que nous faisons.",
    what: [
      "Nous créons votre boutique Shopify, ou nous reprenons celle que vous avez.",
      "Nous soignons les fiches produits : photos, textes, informations utiles.",
      "Nous simplifions le parcours d'achat, du panier au paiement.",
      "Nous produisons les photos et les vidéos de vos produits.",
      "Nous amenons les visites : référencement Google, Google Shopping, campagnes Meta.",
      "Nous suivons les ventes chaque mois, dans Shopify, avec vous.",
    ],
    linksTitle: "Une seule équipe, du site aux ventes.",
    linksBody:
      "Une boutique sans visites ne vend pas. Des visites sans bonne boutique coûtent cher. Nous travaillons les deux ensemble.",
    links: [
      { href: "agence-seo-google-ads", label: "SEO et Google Ads" },
      { href: "medias", label: "Photo et vidéo" },
    ],
    proofTitle: "Des résultats mesurés chez nos clients.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Pourquoi Shopify ?",
        a: "Shopify est fiable, complet et simple à prendre en main. Vos équipes gèrent seules les produits et les commandes. Si un autre outil vous convient mieux, nous vous le disons.",
      },
      {
        q: "Pouvez-vous reprendre une boutique existante ?",
        a: "Oui. Nous commençons par un état des lieux : ce qui freine la vente, ce qui manque, ce qui marche déjà. Puis nous corrigeons par priorité.",
      },
      {
        q: "Combien coûte une boutique Shopify ?",
        a: "C'est sur devis, après un appel de 30 minutes. Le prix dépend du nombre de produits, du design et des fonctions voulues. L'abonnement Shopify se paie à part, directement à Shopify.",
      },
      {
        q: "D'où vient le chiffre de LOIR Paris ?",
        a: "Des données de la boutique Shopify de LOIR Paris. Il compare les ventes nettes sur 12 mois glissants, de septembre 2024 à septembre 2026.",
      },
      {
        q: "Vous occupez-vous aussi de la publicité ?",
        a: "Oui. Google Shopping, Google Ads et Meta. Nous suivons les ventes qu'elles apportent, pas seulement les clics.",
      },
    ],
    serviceType: "Création et développement de boutiques Shopify",
  },
  en: {
    metaTitle: "Shopify e-commerce agency that drives sales",
    metaDesc:
      "Shopify store builds and redesigns, product pages, photo and video, Google Shopping and Meta. LOIR Paris: +164% online sales in two years.",
    eyebrow: "Shopify e-commerce agency",
    title: "A Shopify store that sells.",
    intro:
      "We build your store, or take over the one you have. Then we bring the right customers all the way to checkout.",
    leadValue: "+164%",
    leadLabel: "online sales in two years for LOIR Paris, read in Shopify.",
    leadLink: "Read the case study",
    whatTitle: "What we do.",
    what: [
      "We build your Shopify store, or take over the one you have.",
      "We polish product pages: photos, copy, useful information.",
      "We simplify the buying journey, from cart to payment.",
      "We produce photos and videos of your products.",
      "We bring visits: Google search, Google Shopping, Meta campaigns.",
      "We track sales every month, in Shopify, with you.",
    ],
    linksTitle: "One team, from the store to the sales.",
    linksBody:
      "A store without visits does not sell. Visits without a good store cost a lot. We work on both together.",
    links: [
      { href: "agence-seo-google-ads", label: "SEO and Google Ads" },
      { href: "medias", label: "Photo and video" },
    ],
    proofTitle: "Measured results for our clients.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Why Shopify?",
        a: "Shopify is reliable, complete and easy to use. Your teams manage products and orders on their own. If another tool suits you better, we tell you.",
      },
      {
        q: "Can you take over an existing store?",
        a: "Yes. We start with an audit: what slows sales, what is missing, what already works. Then we fix things by priority.",
      },
      {
        q: "How much does a Shopify store cost?",
        a: "It is quoted after a 30-minute call. The price depends on the number of products, the design and the features you need. The Shopify subscription is paid separately, directly to Shopify.",
      },
      {
        q: "Where does the LOIR Paris figure come from?",
        a: "From the LOIR Paris Shopify store data. It compares net sales over rolling 12 months, from September 2024 to September 2026.",
      },
      {
        q: "Do you also handle advertising?",
        a: "Yes. Google Shopping, Google Ads and Meta. We track the sales they bring, not only the clicks.",
      },
    ],
    serviceType: "Shopify store design and development",
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

export default async function ShopifyPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="site">
        {/* La preuve d'abord : LOIR Paris, avant les actions. */}
        <Link
          href={`/${locale}/etudes-de-cas/loir-paris`}
          className="group mt-10 block max-w-md overflow-hidden rounded-2xl border border-[var(--rule)] bg-white transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(17,19,24,0.3)]"
        >
          <div className="px-6 pt-6">
            <p className="text-[3.25rem] font-medium leading-none tracking-[-0.045em] text-[var(--accent)] tabular-nums">
              {c.leadValue}
            </p>
            <p className="mt-2 text-[15px] text-[var(--fg-2)]">{c.leadLabel}</p>
            <p className="mt-4 text-sm font-medium text-[var(--accent)]">{c.leadLink}</p>
          </div>
          <div className="mt-4 h-20">
            <ProofChart id="loir" />
          </div>
        </Link>
      </PageHero>

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

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

      <ProofGrid locale={locale} title={c.proofTitle} />

      <Faq title={c.faqTitle} items={c.faq} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
