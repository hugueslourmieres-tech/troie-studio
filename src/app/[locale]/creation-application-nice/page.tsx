import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { JsonLd } from "@/components/JsonLd";
import {
  ArrowLink,
  Block,
  Body,
  Faq,
  PageHero,
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
 * Page « Création d'application à Nice » (25/10/2026), FR et EN.
 * Requêtes visées : « création application Nice », « développement
 * application web Nice », « agence développement application mobile Côte
 * d'Azur ». Preuves : Bien en règle, Color Guesser et Bilber (produits
 * maison, en ligne), PerPost (site et application). Aucun délai ni prix
 * chiffré : tout est au devis. Pile technique réelle (Next.js, React,
 * Postgres via Supabase, Stripe, Vercel).
 */
const PATH = "/creation-application-nice";

type Project = { name: string; url: string; body: string };

const COPY = {
  fr: {
    metaTitle: "Création d'application web et mobile à Nice",
    metaDesc:
      "Développement d'applications web et mobiles à Nice et sur la Côte d'Azur : espaces clients, réservation, outils internes, SaaS. Prix et délai fermes au devis.",
    crumb: "Création d'application à Nice",
    eyebrow: "Création d'application à Nice",
    title: "Création d'applications à Nice.",
    intro:
      "Espace client, outil de réservation, logiciel interne ou application mobile. Nous la concevons, la développons et la mettons en ligne. Depuis Nice, pour les entreprises de la Côte d'Azur et de toute la France.",
    whatTitle: "Ce que nous développons.",
    what: [
      "Des espaces clients : suivi de commande, documents, factures, messages.",
      "Des outils de réservation et de prise de rendez-vous, reliés à votre agenda.",
      "Des outils internes qui remplacent les tableurs et les échanges de mails.",
      "Des plateformes SaaS, avec comptes, abonnements et paiement en ligne.",
      "Des applications mobiles, installables sur iPhone et Android.",
      "Des jeux et des expériences web, pour une marque ou un événement.",
    ],
    proofTitle: "Nos applications sont en ligne.",
    proofIntro:
      "Ce sont nos preuves. Vous pouvez les ouvrir et les essayer. Bien en règle, Color Guesser et Bilber sont nos produits maison : nous les avons conçus, construits et lancés nous-mêmes.",
    projects: [
      {
        name: "Bien en règle",
        url: "https://bienenregle.com",
        body: "Une application web sur la conformité des locations de vacances, ville par ville. Diagnostic en ligne, rapport en PDF, paiement intégré.",
      },
      {
        name: "Color Guesser",
        url: "https://playcolorguesser.com",
        body: "Un jeu web traduit en 7 langues. Rapide sur téléphone, jouable sans compte.",
      },
      {
        name: "Bilber",
        url: "https://bilber.app",
        body: "Une plateforme SaaS pour créer le passeport numérique des produits.",
      },
      {
        name: "PerPost",
        url: "https://perpost-web.vercel.app",
        body: "Un site web et son application.",
      },
    ] satisfies Project[],
    worksLink: "Voir toutes les réalisations",
    howTitle: "Comment se passe un projet.",
    how: [
      "Un appel de 30 minutes pour comprendre le besoin, les utilisateurs et les contraintes.",
      "Un cadrage écrit : les écrans, les fonctions, ce qui est dans la première version et ce qui attend.",
      "Un devis avec un prix et un délai fermes, selon le périmètre.",
      "Des maquettes à valider avant le code, pour éviter les surprises.",
      "Le développement par étapes, avec une version à tester régulièrement.",
      "La mise en ligne, puis le suivi : corrections, évolutions, mesures d'usage.",
    ],
    stackTitle: "La technique, en clair.",
    stack: [
      "Nous développons sur des outils solides et répandus. Next.js et React pour l'interface. Une base de données Postgres pour vos données. Stripe pour les paiements. Un hébergement Vercel, rapide partout en Europe.",
      "Pour le mobile, nous partons souvent d'une application web installable sur le téléphone. Elle coûte moins cher et se met à jour sans passer par les stores. Si vous avez besoin des notifications, de l'appareil photo ou du mode hors ligne, nous développons une application iOS et Android.",
      "Le code vous appartient. Il vit sur vos comptes. Si vous changez de prestataire un jour, vous partez avec tout.",
    ],
    linksTitle: "Une application, et des clients pour l'utiliser.",
    linksBody:
      "Une application doit être trouvée. Nous travaillons aussi le site qui la présente, le référencement et les campagnes qui amènent les premiers utilisateurs.",
    links: [
      { href: "creation-site-application", label: "Sites et applications" },
      { href: "agence-seo-google-ads", label: "SEO et Google Ads" },
      { href: "agence-web-nice", label: "Agence web à Nice" },
      { href: "agence-web-monaco", label: "Agence web à Monaco" },
      { href: "agence-web-cannes-antibes", label: "Agence web à Cannes et Antibes" },
      { href: "etudes-de-cas/loir-paris", label: "Étude de cas : LOIR Paris" },
    ],
    auditTitle: "Vous avez déjà un outil ?",
    auditBody:
      "Si une application ou un site existe déjà, nous pouvons commencer par un audit. Vous saurez ce qui marche, ce qui bloque vos utilisateurs et ce qu'il faut refaire en premier.",
    auditLink: "Demander l'audit",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Combien coûte une application ?",
        a: "C'est sur devis. Le prix dépend du nombre d'écrans, des fonctions, des comptes utilisateurs et des liens avec vos autres outils. Après un appel de 30 minutes et un cadrage, vous recevez un prix ferme.",
      },
      {
        q: "Combien de temps faut-il pour la développer ?",
        a: "Selon le périmètre, nous vous donnons un délai ferme dans le devis. Une première version simple sort plus vite. Nous ajoutons ensuite les fonctions par étapes.",
      },
      {
        q: "Application web ou application mobile ?",
        a: "Une application web marche sur tous les appareils et s'installe sur le téléphone. C'est souvent le bon départ. Une application native se justifie si vous avez besoin des notifications, de l'appareil photo ou du mode hors ligne. Nous vous conseillons avant de commencer.",
      },
      {
        q: "Qui est propriétaire du code ?",
        a: "Vous. Le code, les données et les comptes sont à votre nom. Vous pouvez reprendre le projet avec une autre équipe à tout moment.",
      },
      {
        q: "Assurez-vous la maintenance après la mise en ligne ?",
        a: "Oui. Nous proposons un suivi mensuel : corrections, mises à jour de sécurité et petites évolutions. Il se fixe dans le devis.",
      },
      {
        q: "Travaillez-vous uniquement avec des entreprises de Nice ?",
        a: "Non. Nous sommes basés à Nice et nous venons chez nos clients de la Côte d'Azur. Nous travaillons aussi à distance avec des entreprises de toute la France.",
      },
    ],
    serviceType: "Développement d'applications web et mobiles",
  },
  en: {
    metaTitle: "Web and mobile app development in Nice",
    metaDesc:
      "Web and mobile app development in Nice, France and on the Riviera: client portals, booking, internal tools, SaaS. Firm price and timeline in the quote.",
    crumb: "App development in Nice",
    eyebrow: "App development in Nice",
    title: "App development in Nice.",
    intro:
      "Client portal, booking tool, internal software or mobile app. We design, build and launch it. From Nice, for companies on the French Riviera and across France.",
    whatTitle: "What we build.",
    what: [
      "Client portals: order tracking, documents, invoices, messages.",
      "Booking and appointment tools, connected to your calendar.",
      "Internal tools that replace spreadsheets and email threads.",
      "SaaS platforms, with accounts, subscriptions and online payment.",
      "Mobile apps, installable on iPhone and Android.",
      "Web games and experiences, for a brand or an event.",
    ],
    proofTitle: "Our apps are live.",
    proofIntro:
      "They are our proof. You can open and try them. Bien en règle, Color Guesser and Bilber are our own products: we designed, built and launched them ourselves.",
    projects: [
      {
        name: "Bien en règle",
        url: "https://bienenregle.com",
        body: "A web app on holiday rental compliance, city by city. Online check, PDF report, built-in payment.",
      },
      {
        name: "Color Guesser",
        url: "https://playcolorguesser.com",
        body: "A web game translated into 7 languages. Fast on phones, playable without an account.",
      },
      {
        name: "Bilber",
        url: "https://bilber.app",
        body: "A SaaS platform to create digital product passports.",
      },
      {
        name: "PerPost",
        url: "https://perpost-web.vercel.app",
        body: "A website and its app.",
      },
    ] satisfies Project[],
    worksLink: "See all our work",
    howTitle: "How a project runs.",
    how: [
      "A 30-minute call to understand the need, the users and the constraints.",
      "A written scope: screens, features, what goes in the first version and what waits.",
      "A quote with a firm price and timeline, based on the scope.",
      "Mock-ups to approve before code, to avoid surprises.",
      "Development in stages, with a version to test regularly.",
      "Launch, then follow-up: fixes, improvements, usage tracking.",
    ],
    stackTitle: "The tech, in plain words.",
    stack: [
      "We build on solid, widely used tools. Next.js and React for the interface. A Postgres database for your data. Stripe for payments. Vercel hosting, fast across Europe.",
      "For mobile, we often start with a web app that installs on the phone. It costs less and updates without going through the stores. If you need notifications, the camera or offline mode, we build an iOS and Android app.",
      "The code is yours. It lives on your accounts. If you ever change provider, you leave with everything.",
    ],
    linksTitle: "An app, and customers to use it.",
    linksBody:
      "An app must be found. We also work on the site that presents it, on search and on the campaigns that bring the first users.",
    links: [
      { href: "creation-site-application", label: "Websites and apps" },
      { href: "agence-seo-google-ads", label: "SEO and Google Ads" },
      { href: "agence-web-nice", label: "Web agency in Nice" },
      { href: "agence-web-monaco", label: "Web agency for Monaco" },
      { href: "agence-web-cannes-antibes", label: "Web agency in Cannes and Antibes" },
      { href: "etudes-de-cas/loir-paris", label: "Case study: LOIR Paris" },
    ],
    auditTitle: "Already have a tool?",
    auditBody:
      "If an app or a site already exists, we can start with an audit. You will know what works, what blocks your users and what to rebuild first.",
    auditLink: "Request the audit",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much does an app cost?",
        a: "It is quoted. The price depends on the number of screens, the features, user accounts and links with your other tools. After a 30-minute call and a scoping step, you get a firm price.",
      },
      {
        q: "How long does development take?",
        a: "Based on the scope, we give you a firm timeline in the quote. A simple first version ships sooner. We then add features in stages.",
      },
      {
        q: "Web app or mobile app?",
        a: "A web app works on every device and installs on the phone. It is often the right start. A native app makes sense if you need notifications, the camera or offline mode. We advise you before we start.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The code, the data and the accounts are in your name. You can hand the project to another team at any time.",
      },
      {
        q: "Do you handle maintenance after launch?",
        a: "Yes. We offer a monthly follow-up: fixes, security updates and small improvements. It is set in the quote.",
      },
      {
        q: "Do you only work with companies in Nice?",
        a: "No. We are based in Nice and visit our clients on the French Riviera. We also work remotely with companies across France.",
      },
    ],
    serviceType: "Web and mobile app development",
  },
} as const;

const AREA = [
  { "@type": "City", name: "Nice" },
  { "@type": "Place", name: "Sophia Antipolis" },
  { "@type": "City", name: "Cannes" },
  { "@type": "City", name: "Antibes" },
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

export default async function CreationApplicationNicePage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} art="orchid" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="site" />

      <Block id="applications" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block id="preuves" title={c.proofTitle}>
        <Body>{c.proofIntro}</Body>
        <ul className="mt-8 border-t border-[var(--rule)]">
          {c.projects.map((p) => (
            <li key={p.name} className="border-b border-[var(--rule)] py-5">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 text-lg font-medium text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
              >
                {p.name}
                <span className="text-sm font-normal text-[var(--fg-2)]">
                  {p.url.replace(/^https:\/\//, "")}
                </span>
              </a>
              <p className="mt-1 text-base leading-relaxed text-[var(--fg-2)]">{p.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <ArrowLink href={`/${locale}/creation/web`}>{c.worksLink}</ArrowLink>
        </div>
      </Block>

      <Block id="methode" title={c.howTitle}>
        <Sentences items={c.how} />
      </Block>

      <Block id="technique" title={c.stackTitle}>
        {c.stack.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="audit" title={c.auditTitle}>
        <Body>{c.auditBody}</Body>
        <div className="mt-6">
          <ArrowLink href={`/${locale}/contact?besoin=site#projet`}>{c.auditLink}</ArrowLink>
        </div>
      </Block>

      <Block id="liens" title={c.linksTitle}>
        <Body>{c.linksBody}</Body>
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
