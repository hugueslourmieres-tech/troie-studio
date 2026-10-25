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
import { LinkList, breadcrumbJsonLd } from "../_local/blocks";

/**
 * Page de service « Agence e-commerce Shopify » (23/10/2026), FR et EN.
 * La page s'ouvre sur LOIR Paris : +164 % de ventes en ligne en deux ans
 * (src/lib/results.ts). Accord écrit du client à obtenir avant la mise en
 * production (voir /etudes-de-cas/loir-paris).
 *
 * 25/10/2026 : titre et H1 visent « agence Shopify » au niveau national
 * (la requête ne se tape pas avec Nice), Nice et Monaco cités dans l'intro.
 * Ajouts : bloc LOIR (+121 % de commandes, LOIR_ORDERS_PCT), bloc
 * migration WooCommerce, PrestaShop, Magento vers Shopify, FAQ migration.
 */
const PATH = "/agence-e-commerce-shopify";

const COPY = {
  fr: {
    metaTitle: "Agence Shopify : création, refonte et migration",
    metaDesc:
      "Agence Shopify pour toute la France, basée à Nice : création, refonte, migration depuis WooCommerce, PrestaShop ou Magento. LOIR Paris : +164 % de ventes.",
    crumb: "Agence Shopify",
    eyebrow: "Agence e-commerce Shopify",
    title: "Agence Shopify, pour une boutique qui vend.",
    intro:
      "Nous créons votre boutique, nous reprenons celle que vous avez, ou nous la migrons vers Shopify. Puis nous amenons les bons clients jusqu'au paiement. Depuis Nice, pour Monaco, la Côte d'Azur et toute la France.",
    leadValue: "+164 %",
    leadLabel: "de ventes en ligne en deux ans pour LOIR Paris, lues dans Shopify.",
    leadLink: "Lire l'étude de cas",
    caseTitle: "LOIR Paris, deux ans de croissance.",
    case: [
      "LOIR Paris est une marque de mode qui vend sur sa propre boutique, construite sur Shopify. Nous travaillons sur cette boutique.",
      "Entre septembre 2024 et septembre 2026, les ventes nettes en ligne ont progressé de 164 % et les commandes de 121 %. Les deux chiffres sont lus dans Shopify, sur 12 mois glissants.",
    ],
    caseLink: "Lire l'étude de cas complète",
    whatTitle: "Ce que nous faisons.",
    what: [
      "Nous créons votre boutique Shopify, ou nous reprenons celle que vous avez.",
      "Nous soignons les fiches produits : photos, textes, informations utiles.",
      "Nous simplifions le parcours d'achat, du panier au paiement.",
      "Nous produisons les photos et les vidéos de vos produits.",
      "Nous amenons les visites : référencement Google, Google Shopping, campagnes Meta.",
      "Nous suivons les ventes chaque mois, dans Shopify, avec vous.",
    ],
    migrationTitle: "Passer à Shopify sans perdre vos ventes.",
    migrationIntro:
      "Beaucoup de boutiques, sur la Côte d'Azur comme ailleurs, tournent encore sur WooCommerce, PrestaShop ou Magento. Les mises à jour coûtent cher, les extensions se cassent, le site ralentit. Shopify règle une grande partie de ces soucis. Mais une migration mal faite peut coûter votre référencement.",
    migration: [
      "Nous faisons l'inventaire : produits, variantes, clients, commandes, pages, avis.",
      "Nous reprenons les données dans Shopify, puis nous les vérifions ligne à ligne.",
      "Nous redirigeons chaque ancienne adresse vers la nouvelle, pour garder vos positions sur Google.",
      "Les comptes clients sont repris. Les mots de passe ne peuvent pas l'être : vos clients reçoivent une invitation à réactiver leur compte.",
      "Nous testons le paiement, la livraison et les e-mails avant la bascule.",
      "Après la bascule, nous suivons les ventes, les erreurs et les positions Google pendant plusieurs semaines.",
    ],
    migrationAudit:
      "Pas sûr que la migration vaille le coup ? Un audit compare votre boutique actuelle et Shopify, et chiffre le chantier.",
    auditLink: "Demander l'audit",
    nearTitle: "Près de chez vous, ou à distance.",
    nearBody:
      "Nous sommes basés à Nice et nous travaillons avec des marques de toute la France. Sur la Côte d'Azur et à Monaco, nous venons aussi sur place pour les photos produits.",
    near: [
      { href: "agence-web-nice", label: "Agence web à Nice" },
      { href: "agence-web-monaco", label: "Agence web à Monaco" },
      { href: "agence-web-cannes-antibes", label: "Agence web à Cannes et Antibes" },
      { href: "creation-application-nice", label: "Création d'applications" },
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
      {
        q: "Vais-je perdre mon référencement en passant à Shopify ?",
        a: "Pas si la migration est bien faite. Nous redirigeons chaque ancienne adresse vers la nouvelle et nous gardons les textes qui se positionnent. Puis nous suivons vos positions après la bascule.",
      },
      {
        q: "Combien de temps dure une migration vers Shopify ?",
        a: "Cela dépend du nombre de produits, des données à reprendre et du design. Selon le périmètre, nous vous donnons un délai ferme dans le devis.",
      },
      {
        q: "Travaillez-vous seulement à Nice ?",
        a: "Non. Nous sommes une agence Shopify basée à Nice, et nous travaillons avec des marques de toute la France, à distance. À Monaco et sur la Côte d'Azur, nous venons aussi sur place.",
      },
    ],
    serviceType: "Création et développement de boutiques Shopify",
  },
  en: {
    metaTitle: "Shopify agency: builds, redesigns and migrations",
    metaDesc:
      "Shopify agency for all of France, based in Nice: builds, redesigns, migration from WooCommerce, PrestaShop or Magento. LOIR Paris: +164% online sales.",
    crumb: "Shopify agency",
    eyebrow: "Shopify e-commerce agency",
    title: "A Shopify agency, for a store that sells.",
    intro:
      "We build your store, take over the one you have, or migrate it to Shopify. Then we bring the right customers all the way to checkout. From Nice, for Monaco, the Riviera and all of France.",
    leadValue: "+164%",
    leadLabel: "online sales in two years for LOIR Paris, read in Shopify.",
    leadLink: "Read the case study",
    caseTitle: "LOIR Paris, two years of growth.",
    case: [
      "LOIR Paris is a fashion brand that sells on its own store, built on Shopify. We work on that store.",
      "Between September 2024 and September 2026, net online sales grew by 164% and orders by 121%. Both figures are read in Shopify, over rolling 12 months.",
    ],
    caseLink: "Read the full case study",
    whatTitle: "What we do.",
    what: [
      "We build your Shopify store, or take over the one you have.",
      "We polish product pages: photos, copy, useful information.",
      "We simplify the buying journey, from cart to payment.",
      "We produce photos and videos of your products.",
      "We bring visits: Google search, Google Shopping, Meta campaigns.",
      "We track sales every month, in Shopify, with you.",
    ],
    migrationTitle: "Move to Shopify without losing sales.",
    migrationIntro:
      "Many stores, on the Riviera and elsewhere, still run on WooCommerce, PrestaShop or Magento. Updates are costly, plugins break, the site slows down. Shopify solves much of this. But a poor migration can cost you your search ranking.",
    migration: [
      "We take inventory: products, variants, customers, orders, pages, reviews.",
      "We move the data into Shopify, then check it line by line.",
      "We redirect every old address to the new one, to keep your Google positions.",
      "Customer accounts are moved. Passwords cannot be: your customers get an invitation to reactivate their account.",
      "We test payment, shipping and emails before the switch.",
      "After the switch, we track sales, errors and Google positions for several weeks.",
    ],
    migrationAudit:
      "Not sure the migration is worth it? An audit compares your current store with Shopify and prices the work.",
    auditLink: "Request the audit",
    nearTitle: "Close by, or remote.",
    nearBody:
      "We are based in Nice and work with brands across France. On the Riviera and in Monaco, we also come on site for product photos.",
    near: [
      { href: "agence-web-nice", label: "Web agency in Nice" },
      { href: "agence-web-monaco", label: "Web agency for Monaco" },
      { href: "agence-web-cannes-antibes", label: "Web agency in Cannes and Antibes" },
      { href: "creation-application-nice", label: "App development" },
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
      {
        q: "Will I lose my search ranking by moving to Shopify?",
        a: "Not if the migration is done well. We redirect every old address to the new one and keep the copy that ranks. Then we track your positions after the switch.",
      },
      {
        q: "How long does a migration to Shopify take?",
        a: "It depends on the number of products, the data to move and the design. Based on the scope, we give you a firm timeline in the quote.",
      },
      {
        q: "Do you only work in Nice?",
        a: "No. We are a Shopify agency based in Nice, and we work with brands across France, remotely. In Monaco and on the Riviera, we also come on site.",
      },
    ],
    serviceType: "Shopify store design and development",
  },
} as const;

const AREA = [
  { "@type": "Country", name: "France" },
  { "@type": "City", name: "Nice" },
  { "@type": "Country", name: "Monaco" },
  { "@type": "AdministrativeArea", name: "Côte d'Azur" },
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

export default async function ShopifyPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} art="meadow" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="site">
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

      <Block id="loir-paris" title={c.caseTitle}>
        {c.case.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6">
          <ArrowLink href={`/${locale}/etudes-de-cas/loir-paris`}>{c.caseLink}</ArrowLink>
        </div>
      </Block>

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block id="migration" title={c.migrationTitle}>
        <Body>{c.migrationIntro}</Body>
        <div className="mt-8">
          <Sentences items={c.migration} />
        </div>
        <div className="mt-8">
          <Body>{c.migrationAudit}</Body>
        </div>
        <div className="mt-4">
          <ArrowLink href={`/${locale}/contact?besoin=site#projet`}>{c.auditLink}</ArrowLink>
        </div>
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

      <Block id="ou" title={c.nearTitle}>
        <Body>{c.nearBody}</Body>
        <div className="mt-8">
          <LinkList locale={locale} items={c.near} />
        </div>
      </Block>

      <Faq title={c.faqTitle} items={c.faq} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
