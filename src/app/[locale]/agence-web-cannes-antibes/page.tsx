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
 * Page locale « Agence web à Cannes et Antibes » (25/10/2026), FR et EN.
 * Requêtes visées : « agence web Cannes », « agence web Antibes »,
 * « création site internet Cannes ». Zone : Cannes, Antibes, Juan-les-Pins,
 * Sophia Antipolis, Mougins, Grasse. Aucun résultat Rutherford.
 */
const PATH = "/agence-web-cannes-antibes";

const COPY = {
  fr: {
    metaTitle: "Agence web à Cannes et Antibes",
    metaDesc:
      "Création de site internet à Cannes, Antibes, Sophia Antipolis, Mougins et Grasse. Sites, boutiques Shopify, applications, SEO et Google Ads. Agence basée à Nice.",
    crumb: "Agence web à Cannes et Antibes",
    eyebrow: "Agence web à Cannes et Antibes",
    title: "Votre agence web à Cannes et Antibes.",
    intro:
      "Création de site internet, boutique en ligne, application et acquisition. Pour les entreprises de Cannes, d'Antibes et de l'ouest des Alpes-Maritimes. Nous sommes basés à Nice et nous venons chez vous.",
    areaTitle: "De Cannes à Sophia Antipolis.",
    area: [
      "Nous travaillons à Cannes, Antibes et Juan-les-Pins. Mais aussi à Sophia Antipolis, Mougins, Grasse, Vallauris et Mandelieu.",
      "Pour un rendez-vous, un atelier, une séance photo ou un tournage, nous nous déplaçons. Le reste avance à distance, avec un seul interlocuteur.",
    ],
    whatTitle: "Ce que nous faisons.",
    what: [
      "Nous créons des sites vitrines clairs, rapides sur téléphone, prêts pour Google.",
      "Nous créons ou reprenons des boutiques Shopify.",
      "Nous développons des applications web et mobiles : réservation, espace client, outil interne.",
      "Nous travaillons votre référencement local et votre fiche Google.",
      "Nous lançons et pilotons vos campagnes Google Ads et Meta.",
      "Nous produisons les photos et les vidéos, sur place.",
    ],
    whoTitle: "Pour qui ?",
    who: [
      "À Cannes et à Antibes, beaucoup d'entreprises vivent du tourisme, de l'événementiel et du commerce. Leur site doit être clair en français comme en anglais, et facile à utiliser sur téléphone.",
      "À Sophia Antipolis, ce sont plutôt des sociétés tech et des PME B2B. Elles ont besoin d'un site qui explique une offre complexe simplement, et qui apporte des demandes qualifiées.",
      "À Grasse et à Mougins, il y a des marques et des artisans qui veulent vendre en ligne. Une boutique Shopify bien faite leur ouvre toute la France.",
    ],
    localTitle: "Être trouvé à Cannes et à Antibes.",
    local: [
      "Vos clients tapent « près de moi », le nom de leur ville ou de leur quartier. Votre fiche Google et vos avis comptent autant que votre site.",
      "Nous écrivons une page claire pour chaque service et chaque zone que vous servez. Nous soignons votre fiche Google. Si vous voulez des résultats rapides, nous ciblons des annonces Google Ads sur quelques communes seulement.",
      "Chaque mois, vous recevez un point simple : les visites, les appels, les demandes, et ce que nous changeons.",
    ],
    howTitle: "Comment nous travaillons.",
    how: [
      "Un appel de 30 minutes, en visio ou chez vous, pour comprendre votre besoin.",
      "Une proposition écrite et un devis, avec un prix et un délai fermes.",
      "Les textes d'abord, puis le design, pensé pour le téléphone.",
      "La mise en ligne, avec les bases du référencement déjà en place.",
      "Un seul interlocuteur, du premier appel au suivi.",
    ],
    priceTitle: "Combien coûte un site internet ?",
    price: [
      "Une page d'atterrissage, pour une offre ou une campagne, se chiffre sur devis comme le reste.",
      "Un site complet, une boutique ou une application sont sur devis. Le prix dépend du nombre de pages, des fonctions et des contenus à produire. Vous recevez un devis écrit après un appel de 30 minutes.",
      "Votre site existe déjà ? Commencez par un audit. Vous saurez ce qui freine les demandes et les ventes, et ce qu'il faut corriger en premier.",
    ],
    auditLink: "Demander l'audit",
    shopifyTitle: "Une boutique qui vend, preuve à l'appui.",
    shopify: [
      "Pour LOIR Paris, marque de mode sur Shopify, les ventes en ligne ont progressé de 164 % en deux ans. Le chiffre est lu dans Shopify, l'étude de cas explique comment.",
    ],
    shopifyLinks: [
      { href: "etudes-de-cas/loir-paris", label: "Lire l'étude de cas LOIR Paris" },
      { href: "agence-e-commerce-shopify", label: "Notre offre Shopify" },
    ],
    proofTitle: "Des résultats mesurés chez nos clients.",
    nearTitle: "Aussi sur la Côte d'Azur.",
    near: [
      { href: "agence-web-nice", label: "Agence web à Nice" },
      { href: "agence-web-monaco", label: "Agence web à Monaco" },
      { href: "creation-application-nice", label: "Création d'applications" },
      { href: "agence-seo-google-ads", label: "SEO et Google Ads" },
      { href: "creation-site-application", label: "Sites et applications" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Vous déplacez-vous à Cannes et à Antibes ?",
        a: "Oui. Nous sommes basés à Nice. Nous venons à Cannes, Antibes, Sophia Antipolis, Mougins et Grasse pour les rendez-vous, les ateliers et les tournages.",
      },
      {
        q: "Combien coûte la création d'un site internet à Cannes ?",
        a: "Chaque projet est sur devis, après un appel de 30 minutes. Le devis fixe le prix et le délai.",
      },
      {
        q: "Combien de temps faut-il pour créer un site ?",
        a: "Cela dépend du périmètre. Nous vous donnons un délai ferme dans le devis.",
      },
      {
        q: "Pouvez-vous améliorer le référencement de mon site actuel ?",
        a: "Oui. Nous commençons par un audit. Puis nous corrigeons la technique, les pages et la fiche Google, par priorité.",
      },
      {
        q: "Faites-vous des sites en anglais pour la clientèle internationale ?",
        a: "Oui. Nous créons des sites en français et en anglais, avec une adresse par langue. Google montre la bonne version à chaque visiteur.",
      },
    ],
    serviceType: "Création de site internet et agence web",
  },
  en: {
    metaTitle: "Web agency in Cannes and Antibes",
    metaDesc:
      "Website design in Cannes, Antibes, Sophia Antipolis, Mougins and Grasse. Websites, Shopify stores, apps, SEO and Google Ads. Agency based in Nice, France.",
    crumb: "Web agency in Cannes and Antibes",
    eyebrow: "Web agency in Cannes and Antibes",
    title: "Your web agency in Cannes and Antibes.",
    intro:
      "Websites, online stores, apps and customer acquisition. For companies in Cannes, Antibes and the west of the Alpes-Maritimes. We are based in Nice and we come to you.",
    areaTitle: "From Cannes to Sophia Antipolis.",
    area: [
      "We work in Cannes, Antibes and Juan-les-Pins. Also in Sophia Antipolis, Mougins, Grasse, Vallauris and Mandelieu.",
      "For a meeting, a workshop, a photo session or a shoot, we travel. The rest moves forward remotely, with a single contact.",
    ],
    whatTitle: "What we do.",
    what: [
      "We build clear showcase websites, fast on phones, ready for Google.",
      "We build or take over Shopify stores.",
      "We develop web and mobile apps: booking, client portal, internal tool.",
      "We work on your local search ranking and your Google profile.",
      "We launch and run your Google Ads and Meta campaigns.",
      "We produce photos and videos, on site.",
    ],
    whoTitle: "Who is it for?",
    who: [
      "In Cannes and Antibes, many companies live from tourism, events and retail. Their site must be clear in French and English, and easy to use on a phone.",
      "In Sophia Antipolis, they are mostly tech companies and B2B SMEs. They need a site that explains a complex offer simply and brings qualified enquiries.",
      "In Grasse and Mougins, brands and craftspeople want to sell online. A well-built Shopify store opens all of France to them.",
    ],
    localTitle: "Being found in Cannes and Antibes.",
    local: [
      "Your customers type \"near me\", their town or their neighbourhood. Your Google profile and reviews matter as much as your website.",
      "We write a clear page for each service and each area you serve. We polish your Google profile. If you want fast results, we target Google Ads on a few towns only.",
      "Every month, you get a simple review: visits, calls, enquiries, and what we change.",
    ],
    howTitle: "How we work.",
    how: [
      "A 30-minute call, by video or at your place, to understand your need.",
      "A written proposal and a quote, with a firm price and timeline.",
      "Copy first, then design, made for phones.",
      "Launch, with search basics already in place.",
      "A single contact, from the first call to the follow-up.",
    ],
    priceTitle: "How much does a website cost?",
    price: [
      "A landing page, for an offer or a campaign, is quoted like the rest.",
      "A full website, a store or an app is quoted. The price depends on the number of pages, the features and the content to produce. You get a written quote after a 30-minute call.",
      "Already have a site? Start with an audit. You will know what holds back enquiries and sales, and what to fix first.",
    ],
    auditLink: "Request the audit",
    shopifyTitle: "A store that sells, with proof.",
    shopify: [
      "For LOIR Paris, a fashion brand on Shopify, online sales grew by 164% in two years. The figure is read in Shopify, the case study explains how.",
    ],
    shopifyLinks: [
      { href: "etudes-de-cas/loir-paris", label: "Read the LOIR Paris case study" },
      { href: "agence-e-commerce-shopify", label: "Our Shopify offer" },
    ],
    proofTitle: "Measured results for our clients.",
    nearTitle: "Also on the French Riviera.",
    near: [
      { href: "agence-web-nice", label: "Web agency in Nice" },
      { href: "agence-web-monaco", label: "Web agency for Monaco" },
      { href: "creation-application-nice", label: "App development" },
      { href: "agence-seo-google-ads", label: "SEO and Google Ads" },
      { href: "creation-site-application", label: "Websites and apps" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Do you travel to Cannes and Antibes?",
        a: "Yes. We are based in Nice. We come to Cannes, Antibes, Sophia Antipolis, Mougins and Grasse for meetings, workshops and shoots.",
      },
      {
        q: "How much does a website cost in Cannes?",
        a: "Every project is quoted after a 30-minute call. The quote sets the price and the timeline.",
      },
      {
        q: "How long does it take to build a website?",
        a: "It depends on the scope. We give you a firm timeline in the quote.",
      },
      {
        q: "Can you improve the ranking of my current site?",
        a: "Yes. We start with an audit. Then we fix the technical side, the pages and the Google profile, by priority.",
      },
      {
        q: "Do you build English sites for international customers?",
        a: "Yes. We build sites in French and English, with one address per language. Google shows the right version to each visitor.",
      },
    ],
    serviceType: "Website design and web agency",
  },
} as const;

const AREA = [
  { "@type": "City", name: "Cannes" },
  { "@type": "City", name: "Antibes" },
  { "@type": "City", name: "Juan-les-Pins" },
  { "@type": "Place", name: "Sophia Antipolis" },
  { "@type": "City", name: "Mougins" },
  { "@type": "City", name: "Grasse" },
  { "@type": "City", name: "Vallauris" },
  { "@type": "City", name: "Mandelieu-la-Napoule" },
  { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
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

export default async function AgenceWebCannesAntibesPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} art="sky" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="site" />

      <Block id="zone" title={c.areaTitle}>
        {c.area.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block id="pour-qui" title={c.whoTitle}>
        {c.who.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="referencement-local" title={c.localTitle}>
        {c.local.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="methode" title={c.howTitle}>
        <Sentences items={c.how} />
      </Block>

      <Block id="prix" title={c.priceTitle}>
        {c.price.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6">
          <ArrowLink href={`/${locale}/contact?besoin=strategie#projet`}>{c.auditLink}</ArrowLink>
        </div>
      </Block>

      <Block id="shopify" title={c.shopifyTitle}>
        {c.shopify.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6 flex flex-col items-start gap-1">
          {c.shopifyLinks.map((l) => (
            <ArrowLink key={l.href} href={`/${locale}/${l.href}`}>
              {l.label}
            </ArrowLink>
          ))}
        </div>
      </Block>

      <ProofGrid locale={locale} title={c.proofTitle} ids={["loir", "autajon"]} />

      <Block id="cote-d-azur" title={c.nearTitle}>
        <LinkList locale={locale} items={c.near} />
      </Block>

      <Faq title={c.faqTitle} items={c.faq} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
