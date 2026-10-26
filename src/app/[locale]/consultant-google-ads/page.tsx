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
 * Page « Consultant Google Ads » (25/10/2026), FR et EN, nationale.
 * Requêtes visées : « consultant google ads », « freelance google ads »,
 * « expert google ads ». Angle : la personne (Hugues Lourmieres, fondateur)
 * qui pilote le compte, pour ne pas cannibaliser /agence-seo-google-ads
 * (angle agence, SEO et Ads). Les deux pages se lient. Aucun prix, aucun
 * chiffre Google Ads (aucun n'est publiable), aucun résultat Rutherford.
 * L'article sur le budget n'existe qu'en français.
 */
const PATH = "/consultant-google-ads";
const BLOG = "/fr/blog/budget-google-ads-pme";

const COPY = {
  fr: {
    metaTitle: "Consultant Google Ads : un senior sur votre compte",
    metaDesc:
      "Consultant Google Ads senior : un consultant senior de l'équipe TROIE Studio pilote votre compte. Pas de junior, un suivi mensuel et un tableau de bord partagé.",
    crumb: "Consultant Google Ads",
    eyebrow: "Consultant Google Ads",
    title: "Un consultant Google Ads senior sur votre compte.",
    intro:
      "Vous parlez à la personne qui fait le travail. Un consultant senior de l'équipe audite, construit et pilote vos campagnes. Votre compte n'est pas confié à un junior. Chaque mois, un point et un tableau de bord partagé. Basé à Nice, pour toute la France.",
    modelTitle: "Un seul interlocuteur, senior.",
    model: [
      "La personne que vous avez au téléphone est celle qui travaille dans votre compte Google Ads. Pas de relais, pas de compte transmis à quelqu'un que vous ne connaissez pas.",
      "Vous gardez le même interlocuteur dans la durée. Il connaît vos marges, vos saisons et vos clients. Vous n'avez pas à tout réexpliquer.",
      "Vous cherchez un freelance Google Ads ? Vous avez la souplesse d'un indépendant, avec une agence derrière pour le site, les visuels et le référencement naturel quand il le faut.",
    ],
    agencyLink: "Voir l'offre agence SEO et Google Ads",
    auditTitle: "Ce que nous auditons.",
    audit: [
      "La structure du compte : campagnes, groupes d'annonces, mots-clés et types de correspondance.",
      "Les recherches réelles qui déclenchent vos annonces, et celles qui coûtent sans rien rapporter.",
      "Le suivi des conversions : ce qui est mesuré, ce qui manque, ce qui est compté deux fois.",
      "Les annonces, les extensions et les pages d'arrivée.",
      "Les enchères, la répartition du budget et le ciblage géographique.",
      "Les campagnes Performance Max et Shopping, si vous en avez.",
    ],
    firstTitle: "Les 30 premiers jours.",
    first: [
      "Un premier échange pour comprendre votre activité, vos marges et vos objectifs.",
      "Les accès à votre compte Google Ads, à Google Analytics et à votre site. Le compte reste à votre nom.",
      "L'audit et un rendu écrit : ce qui marche, ce qui coûte trop, les corrections par priorité.",
      "La vérification du suivi des conversions, avant de toucher aux enchères.",
      "Les premières corrections : mots-clés négatifs, annonces, budget, ciblage.",
      "Le tableau de bord partagé, et la date du premier point mensuel.",
    ],
    auditLink: "Demander l'audit du compte",
    followTitle: "Le suivi, chaque mois.",
    follow: [
      "Un tableau de bord partagé, relié à vos données : dépenses, clics, conversions, coût par demande ou par vente. Vous l'ouvrez quand vous voulez.",
      "Un point mensuel en visio : ce qui a marché, ce que nous coupons, ce que nous testons le mois suivant.",
      "Le compte, les données et l'historique restent à vous. Si nous arrêtons, vous gardez tout.",
    ],
    budgetTitle: "Quel budget prévoir ?",
    budget: [
      "Il y a deux parts : le budget versé à Google et nos honoraires, sur devis. Le bon budget dépend de votre secteur, du prix des clics et de votre objectif.",
    ],
    budgetLink: "Lire l'article : combien investir en Google Ads quand on est une PME",
    whoTitle: "Qui pilote votre compte.",
    who: [
      "Un consultant senior de l'équipe pilote votre compte, de l'audit au point mensuel. L'équipe a travaillé avec des marques comme CHANEL, Sofitel et X-Rite Pantone.",
      "Nous accompagnons aussi des e-commerces. Chez LOIR Paris, les ventes en ligne ont progressé de 164 % et les commandes de 121 %, selon les données Shopify de la marque.",
    ],
    whoLink: "Lire le parcours du fondateur",
    whereTitle: "Basé à Nice, pour toute la France.",
    where: [
      "Nous sommes à Nice. Les points se font en visio, ou sur place sur la Côte d'Azur et à Monaco. Nous travaillons avec des entreprises de toute la France.",
    ],
    links: [
      { href: "agence-seo-google-ads", label: "Agence SEO et Google Ads" },
      { href: "agence-geo", label: "Agence GEO" },
      { href: "etudes-de-cas/loir-paris", label: "Étude de cas : LOIR Paris" },
    ],
    proofTitle: "Des résultats mesurés chez nos clients.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Qui travaille sur mon compte Google Ads ?",
        a: "Un consultant senior de l'équipe TROIE Studio. Il fait l'audit, construit les campagnes et anime le point mensuel. Vous gardez le même interlocuteur.",
      },
      {
        q: "Quel budget prévoir pour Google Ads ?",
        a: "Il y a deux parts : le budget versé à Google et nos honoraires, sur devis. Le bon budget dépend de votre secteur, du prix des clics et de votre objectif. Notre article sur le budget Google Ads des PME détaille la méthode.",
      },
      {
        q: "Freelance ou agence Google Ads, quelle différence ?",
        a: "Un freelance offre un interlocuteur unique. Une agence couvre plus de métiers. Ici, vous avez les deux : un consultant senior sur votre compte, et l'équipe TROIE Studio pour le site, les visuels et le SEO si besoin.",
      },
      {
        q: "Le compte Google Ads reste-t-il à moi ?",
        a: "Oui. Nous travaillons dans votre compte, à votre nom. Si nous arrêtons, vous gardez les campagnes, les données et l'historique.",
      },
      {
        q: "Pouvez-vous reprendre un compte qui existe déjà ?",
        a: "Oui. Nous commençons par un audit du compte, puis nous corrigeons par priorité. Rien n'est supprimé sans votre accord.",
      },
      {
        q: "Pouvez-vous promettre un nombre de ventes ?",
        a: "Non. Personne ne contrôle Google ni votre marché. Nous nous engageons sur le travail fait et sur un suivi clair des chiffres, chaque mois.",
      },
      {
        q: "Travaillez-vous avec des entreprises hors de Nice ?",
        a: "Oui. Nous sommes basés à Nice et nous travaillons à distance avec des entreprises de toute la France.",
      },
    ],
    serviceType: "Conseil et gestion de campagnes Google Ads",
  },
  en: {
    metaTitle: "Google Ads consultant: a senior on your account",
    metaDesc:
      "Senior Google Ads consultant: a senior consultant from the TROIE Studio team runs your account. No junior, a monthly review and a shared dashboard.",
    crumb: "Google Ads consultant",
    eyebrow: "Google Ads consultant",
    title: "A senior Google Ads consultant on your account.",
    intro:
      "You talk to the person who does the work. A senior consultant from our team audits, builds and runs your campaigns. Your account is not handed to a junior. Every month, a review and a shared dashboard. Based in Nice, for all of France.",
    modelTitle: "One senior contact.",
    model: [
      "The person you speak to on the phone is the one who works in your Google Ads account. No hand-off, no account passed to someone you have never met.",
      "You keep the same contact over time. He knows your margins, your seasons and your customers. You do not have to explain everything again.",
      "Looking for a freelance Google Ads expert? You get the flexibility of an independent, with an agency behind him for the website, visuals and organic search when needed.",
    ],
    agencyLink: "See the SEO and Google Ads agency offer",
    auditTitle: "What we audit.",
    audit: [
      "The account structure: campaigns, ad groups, keywords and match types.",
      "The real searches that trigger your ads, and the ones that cost money without paying back.",
      "Conversion tracking: what is measured, what is missing, what is counted twice.",
      "Ads, assets and landing pages.",
      "Bids, budget split and location targeting.",
      "Performance Max and Shopping campaigns, if you run them.",
    ],
    firstTitle: "The first 30 days.",
    first: [
      "A first exchange to understand your business, your margins and your goals.",
      "Access to your Google Ads account, Google Analytics and your site. The account stays in your name.",
      "The audit and a written report: what works, what costs too much, fixes by priority.",
      "A check of conversion tracking, before touching bids.",
      "The first fixes: negative keywords, ads, budget, targeting.",
      "The shared dashboard, and the date of the first monthly review.",
    ],
    auditLink: "Request the account audit",
    followTitle: "The monthly follow-up.",
    follow: [
      "A shared dashboard, connected to your data: spend, clicks, conversions, cost per lead or per sale. You open it whenever you want.",
      "A monthly video call: what worked, what we cut, what we test next month.",
      "The account, the data and the history stay yours. If we stop, you keep everything.",
    ],
    budgetTitle: "What budget should you plan?",
    budget: [
      "There are two parts: the budget paid to Google and our fees, quoted on request. The right budget depends on your sector, the price of clicks and your goal.",
    ],
    budgetLink: "Read the article (in French): how much an SME should invest in Google Ads",
    whoTitle: "Who runs your account.",
    who: [
      "A senior consultant from our team runs your account, from the audit to the monthly review. The team has worked with brands such as CHANEL, Sofitel and X-Rite Pantone.",
      "We also support e-commerce brands. At LOIR Paris, online sales grew by 164% and orders by 121%, according to the brand's Shopify data.",
    ],
    whoLink: "Read the founder's background",
    whereTitle: "Based in Nice, for all of France.",
    where: [
      "We are in Nice. Reviews happen by video call, or on site on the French Riviera and in Monaco. We work with companies across France.",
    ],
    links: [
      { href: "agence-seo-google-ads", label: "SEO and Google Ads agency" },
      { href: "agence-geo", label: "GEO agency" },
      { href: "etudes-de-cas/loir-paris", label: "Case study: LOIR Paris" },
    ],
    proofTitle: "Measured results for our clients.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Who works on my Google Ads account?",
        a: "A senior consultant from the TROIE Studio team. They run the audit, build the campaigns and lead the monthly review. You keep the same contact.",
      },
      {
        q: "What budget should I plan for Google Ads?",
        a: "There are two parts: the budget paid to Google and our fees, quoted on request. The right budget depends on your sector, the price of clicks and your goal. Our article on Google Ads budgets for SMEs explains the method.",
      },
      {
        q: "Freelance or Google Ads agency, what is the difference?",
        a: "A freelancer offers a single contact. An agency covers more skills. Here you get both: a senior consultant on your account, and the TROIE Studio team for the website, visuals and SEO if needed.",
      },
      {
        q: "Does the Google Ads account stay mine?",
        a: "Yes. We work in your account, in your name. If we stop, you keep the campaigns, the data and the history.",
      },
      {
        q: "Can you take over an existing account?",
        a: "Yes. We start with an audit of the account, then fix by priority. Nothing is deleted without your approval.",
      },
      {
        q: "Can you promise a number of sales?",
        a: "No. Nobody controls Google or your market. We commit to the work done and to a clear monthly review of the numbers.",
      },
      {
        q: "Do you work with companies outside Nice?",
        a: "Yes. We are based in Nice and work remotely with companies across France.",
      },
    ],
    serviceType: "Google Ads consulting and campaign management",
  },
} as const;

const AREA = [
  { "@type": "City", name: "Nice" },
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

export default async function ConsultantGoogleAdsPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} art="meadow-b" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="referencement" />

      <Block id="modele" title={c.modelTitle}>
        {c.model.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6">
          <ArrowLink href={`/${locale}/agence-seo-google-ads`}>{c.agencyLink}</ArrowLink>
        </div>
      </Block>

      <Block id="audit" title={c.auditTitle}>
        <Sentences items={c.audit} />
      </Block>

      <Block id="trente-jours" title={c.firstTitle}>
        <Sentences items={c.first} />
        <div className="mt-6">
          <ArrowLink href={`/${locale}/contact?besoin=referencement#projet`}>{c.auditLink}</ArrowLink>
        </div>
      </Block>

      <Block id="suivi" title={c.followTitle}>
        {c.follow.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="budget" title={c.budgetTitle}>
        {c.budget.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6">
          <ArrowLink href={BLOG}>{c.budgetLink}</ArrowLink>
        </div>
      </Block>

      <Block id="hugues" title={c.whoTitle}>
        {c.who.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6">
          <ArrowLink href={`/${locale}/hugues`}>{c.whoLink}</ArrowLink>
        </div>
      </Block>

      <ProofGrid locale={locale} title={c.proofTitle} ids={["loir", "autajon"]} />

      <Block id="france" title={c.whereTitle}>
        {c.where.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-8">
          <LinkList locale={locale} items={c.links} />
        </div>
      </Block>

      <Faq title={c.faqTitle} items={c.faq} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
