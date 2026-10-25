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
 * Page locale « Agence web à Monaco » (25/10/2026), FR et EN.
 * Requêtes visées : « agence web Monaco », « agence communication digitale
 * Monaco ». Références : CHANEL (reportage photo interne, boutiques du Sud),
 * Sofitel (logo client), événements privés à Monaco (/works/monaco). Aucun
 * chiffre hors src/lib/results.ts, aucun résultat Rutherford.
 */
const PATH = "/agence-web-monaco";

const COPY = {
  fr: {
    metaTitle: "Agence web et communication digitale à Monaco",
    metaDesc:
      "Sites bilingues, boutiques Shopify, SEO et Google Ads pour les entreprises de Monaco. Agence basée à Nice. Références : CHANEL, Sofitel, LOIR Paris.",
    crumb: "Agence web à Monaco",
    eyebrow: "Agence web à Monaco",
    title: "Votre agence web à Monaco.",
    intro:
      "Sites, boutiques en ligne et acquisition pour les entreprises de la Principauté. Nous sommes basés à Nice, à quelques kilomètres. Nous venons chez vous pour les rendez-vous et les tournages.",
    whatTitle: "Ce que nous faisons pour les entreprises de Monaco.",
    what: [
      "Nous créons des sites vitrines en français et en anglais, rapides sur téléphone.",
      "Nous créons ou reprenons des boutiques Shopify, pour vendre en France et à l'étranger.",
      "Nous développons des applications web : espaces clients, réservation, outils internes.",
      "Nous travaillons votre référencement sur Google, en français et en anglais.",
      "Nous lançons et pilotons vos campagnes Google Ads, Meta et LinkedIn.",
      "Nous produisons les photos et les vidéos, sur place à Monaco.",
    ],
    bilingualTitle: "Un site en français et en anglais.",
    bilingual: [
      "À Monaco, une bonne partie de vos clients ne lit pas le français. Votre site doit leur parler dans leur langue, sans perdre la clientèle locale.",
      "Nous prévoyons les deux langues dès le départ. Chaque page a sa version française et sa version anglaise, avec sa propre adresse. Google sait laquelle montrer à qui.",
      "Les textes anglais sont écrits pour être lus, pas traduits mot à mot. Nous les relisons avec vous avant la mise en ligne.",
    ],
    luxuryTitle: "Le luxe et l'hôtellerie, nous connaissons.",
    luxury: [
      "Nous avons réalisé un reportage photo interne pour CHANEL, dans les boutiques du Sud. Nous avons aussi travaillé pour Sofitel, et couvert des événements privés à Monaco : galas, lancements, soirées.",
      "Ces marques attendent des images justes, des délais tenus et une grande réserve. Nous appliquons les mêmes règles à votre site et à vos campagnes.",
    ],
    luxuryLinks: [
      { href: "works/chanel", label: "Voir le reportage CHANEL" },
      { href: "works/monaco", label: "Voir les événements à Monaco" },
    ],
    discretionTitle: "La discrétion, par défaut.",
    discretion: [
      "Nous ne citons jamais un client, un chiffre ou un projet sans son accord écrit. C'est la règle pour toutes nos études de cas.",
      "Vos accès, vos données de vente et vos fichiers clients restent chez vous. Nous travaillons sur vos propres comptes Shopify, Google et Meta. Vous en gardez la propriété.",
      "Si vous le souhaitez, nous signons un accord de confidentialité avant d'entrer dans le détail du projet.",
    ],
    howTitle: "Comment nous travaillons.",
    how: [
      "Un appel de 30 minutes, en visio ou à Monaco, pour comprendre votre besoin.",
      "Une proposition écrite et un devis, avec un délai ferme.",
      "Si votre site existe déjà, un audit : ce qui freine les demandes et les ventes, et les corrections par priorité.",
      "La création ou la refonte, avec un seul interlocuteur du début à la fin.",
      "Ensuite, un suivi chaque mois : visites, demandes, ventes, et ce que nous changeons.",
    ],
    auditLink: "Demander l'audit",
    proofTitle: "Des résultats mesurés chez nos clients.",
    nearTitle: "Aussi sur la Côte d'Azur.",
    near: [
      { href: "agence-web-nice", label: "Agence web à Nice" },
      { href: "agence-web-cannes-antibes", label: "Agence web à Cannes et Antibes" },
      { href: "creation-application-nice", label: "Création d'applications" },
      { href: "agence-e-commerce-shopify", label: "Agence Shopify" },
      { href: "agence-seo-google-ads", label: "SEO et Google Ads" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Êtes-vous installés à Monaco ?",
        a: "Non. Nous sommes basés à Nice, à quelques kilomètres. Nous venons à Monaco pour les rendez-vous, les ateliers, les photos et les vidéos. Le reste avance à distance.",
      },
      {
        q: "Pouvez-vous faire un site en français et en anglais ?",
        a: "Oui, c'est le cas le plus courant à Monaco. Chaque langue a ses propres pages, ses propres adresses et son référencement. D'autres langues sont possibles, nous en parlons au devis.",
      },
      {
        q: "Combien coûte un site pour une entreprise monégasque ?",
        a: "Un site, une boutique ou une application sont sur devis, après un appel de 30 minutes.",
      },
      {
        q: "Travaillez-vous avec des marques de luxe ?",
        a: "Oui. Nous avons travaillé pour CHANEL et pour Sofitel, et couvert des événements privés à Monaco. Nous appliquons la même réserve à chaque client.",
      },
      {
        q: "Pouvez-vous reprendre un site existant sans tout refaire ?",
        a: "Oui. Nous commençons par un audit. Vous savez ce qui bloque et ce qui coûte le moins cher à corriger. Vous décidez ensuite de la suite.",
      },
    ],
    serviceType: "Agence web et communication digitale",
  },
  en: {
    metaTitle: "Web and digital agency for Monaco",
    metaDesc:
      "Bilingual websites, Shopify stores, SEO and Google Ads for companies in Monaco. Agency based in Nice, France. References: CHANEL, Sofitel, LOIR Paris.",
    crumb: "Web agency in Monaco",
    eyebrow: "Web agency in Monaco",
    title: "Your web agency for Monaco.",
    intro:
      "Websites, online stores and customer acquisition for companies in the Principality. We are based in Nice, a few kilometres away. We come to you for meetings and shoots.",
    whatTitle: "What we do for Monaco companies.",
    what: [
      "We build showcase websites in French and English, fast on phones.",
      "We build or take over Shopify stores, to sell in France and abroad.",
      "We develop web apps: client portals, booking, internal tools.",
      "We work on your Google ranking, in French and in English.",
      "We launch and run your Google Ads, Meta and LinkedIn campaigns.",
      "We produce photos and videos, on site in Monaco.",
    ],
    bilingualTitle: "A website in French and English.",
    bilingual: [
      "In Monaco, many of your customers do not read French. Your site must speak their language without losing local clients.",
      "We plan both languages from the start. Each page has a French and an English version, each with its own address. Google knows which one to show to whom.",
      "English copy is written to be read, not translated word for word. We review it with you before launch.",
    ],
    luxuryTitle: "Luxury and hospitality, we know them.",
    luxury: [
      "We produced an internal photo series for CHANEL, in its boutiques in the South of France. We have also worked for Sofitel, and covered private events in Monaco: galas, launches, evenings.",
      "These brands expect accurate images, kept deadlines and great discretion. We apply the same rules to your website and campaigns.",
    ],
    luxuryLinks: [
      { href: "works/chanel", label: "See the CHANEL series" },
      { href: "works/monaco", label: "See the Monaco events" },
    ],
    discretionTitle: "Discretion, by default.",
    discretion: [
      "We never name a client, a figure or a project without written consent. That is the rule for all our case studies.",
      "Your access, sales data and customer files stay with you. We work on your own Shopify, Google and Meta accounts. You keep ownership.",
      "If you wish, we sign a non-disclosure agreement before going into project details.",
    ],
    howTitle: "How we work.",
    how: [
      "A 30-minute call, by video or in Monaco, to understand your need.",
      "A written proposal and a quote, with a firm timeline.",
      "If your site already exists, an audit: what holds back enquiries and sales, and fixes by priority.",
      "The build or redesign, with a single contact from start to finish.",
      "Then a monthly review: visits, enquiries, sales, and what we change.",
    ],
    auditLink: "Request the audit",
    proofTitle: "Measured results for our clients.",
    nearTitle: "Also on the French Riviera.",
    near: [
      { href: "agence-web-nice", label: "Web agency in Nice" },
      { href: "agence-web-cannes-antibes", label: "Web agency in Cannes and Antibes" },
      { href: "creation-application-nice", label: "App development" },
      { href: "agence-e-commerce-shopify", label: "Shopify agency" },
      { href: "agence-seo-google-ads", label: "SEO and Google Ads" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Are you based in Monaco?",
        a: "No. We are based in Nice, a few kilometres away. We come to Monaco for meetings, workshops, photos and videos. The rest moves forward remotely.",
      },
      {
        q: "Can you build a site in French and English?",
        a: "Yes, it is the most common case in Monaco. Each language has its own pages, addresses and search setup. Other languages are possible, we discuss them in the quote.",
      },
      {
        q: "How much does a website cost for a Monaco company?",
        a: "A website, a store or an app is quoted after a 30-minute call.",
      },
      {
        q: "Do you work with luxury brands?",
        a: "Yes. We have worked for CHANEL and Sofitel, and covered private events in Monaco. We apply the same discretion to every client.",
      },
      {
        q: "Can you improve an existing site without rebuilding it?",
        a: "Yes. We start with an audit. You know what blocks and what is cheapest to fix. Then you decide what comes next.",
      },
    ],
    serviceType: "Web and digital communication agency",
  },
} as const;

const AREA = [
  { "@type": "Country", name: "Monaco" },
  { "@type": "City", name: "Monte-Carlo" },
  { "@type": "City", name: "Beausoleil" },
  { "@type": "City", name: "Menton" },
  { "@type": "City", name: "Nice" },
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

export default async function AgenceWebMonacoPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} art="dusk" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="site" />

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block id="bilingue" title={c.bilingualTitle}>
        {c.bilingual.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="luxe" title={c.luxuryTitle}>
        {c.luxury.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6 flex flex-col items-start gap-1">
          {c.luxuryLinks.map((l) => (
            <ArrowLink key={l.href} href={`/${locale}/${l.href}`}>
              {l.label}
            </ArrowLink>
          ))}
        </div>
      </Block>

      <Block id="discretion" title={c.discretionTitle}>
        {c.discretion.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="methode" title={c.howTitle}>
        <Sentences items={c.how} />
        <div className="mt-6">
          <ArrowLink href={`/${locale}/contact?besoin=strategie#projet`}>{c.auditLink}</ArrowLink>
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
