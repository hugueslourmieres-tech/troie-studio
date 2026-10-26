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
 * Page nationale « Agence de développement d'applications » (25/10/2026),
 * FR et EN. Requêtes visées : « agence développement application »,
 * « développement application mobile », « création d'application ».
 * Distincte de /creation-application-nice (angle local) : angle France,
 * méthode, web, mobile et PWA expliqués simplement. Preuves : Bien en règle,
 * Color Guesser, Bilber (produits maison) et PerPost. Aucun prix ni délai
 * chiffré. L'article de blog lié n'existe qu'en français.
 */
const PATH = "/agence-developpement-application";
const BLOG = "/fr/blog/developpement-application-sur-mesure-etapes-delais";

type Project = { name: string; url: string; body: string };

const COPY = {
  fr: {
    metaTitle: "Agence de développement d'applications web et mobiles",
    metaDesc:
      "Agence de développement d'application pour toute la France : application web, mobile ou PWA, de la maquette à la mise en ligne. Le code est à votre nom. Sur devis.",
    crumb: "Développement d'applications",
    eyebrow: "Développement d'applications",
    title: "Agence de développement d'applications web et mobiles.",
    intro:
      "Vous avez une idée d'application, ou un outil qui ne suit plus. Nous la concevons, la développons et la mettons en ligne. Une seule équipe, du cadrage au suivi, pour des entreprises de toute la France.",
    whatTitle: "Ce que nous développons.",
    what: [
      "Des applications métier : suivi de commandes, de dossiers, de stocks ou d'interventions.",
      "Des espaces clients et des portails pour vos partenaires.",
      "Des plateformes SaaS, avec comptes, abonnements et paiement en ligne.",
      "Des applications mobiles pour iPhone et Android.",
      "Des outils internes qui remplacent les tableurs et les échanges de mails.",
      "Des jeux et des expériences web, pour une marque ou un événement.",
    ],
    kindsTitle: "Web, mobile ou PWA : la différence, simplement.",
    kinds: [
      "Une application web s'ouvre dans le navigateur, sur ordinateur comme sur téléphone. Il n'y a qu'une version à développer et à maintenir. Les mises à jour arrivent tout de suite chez tous les utilisateurs.",
      "Une PWA (progressive web app) est une application web qui s'installe sur l'écran d'accueil du téléphone. Elle s'ouvre comme une application, sans passer par l'App Store ni Google Play. Elle peut marcher en partie hors ligne.",
      "Une application mobile native est publiée sur l'App Store et sur Google Play. Elle se justifie si vous avez besoin d'un accès poussé au téléphone (capteurs, Bluetooth, tâches en arrière-plan) ou d'une présence dans les stores. Elle demande de suivre deux plateformes et de passer la validation d'Apple et de Google.",
      "Nous vous conseillons avant de chiffrer. Souvent, une application web ou une PWA suffit pour démarrer.",
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
      "Un premier échange, par écrit ou en visio : le besoin, les utilisateurs, les contraintes.",
      "Un cadrage écrit : les écrans, les fonctions, ce qui entre dans la première version et ce qui attend.",
      "Un devis avec un prix et un délai fermes, selon le périmètre.",
      "Des maquettes à valider avant le code, pour éviter les surprises.",
      "Le développement par étapes, avec une version de test que vous ouvrez quand vous voulez.",
      "La mise en ligne, puis le suivi : corrections, évolutions, mesures d'usage.",
    ],
    blogLink: "Lire l'article : les étapes d'un développement sur mesure",
    remoteTitle: "Partout en France, à distance.",
    remote: [
      "Nous sommes basés à Nice. Les ateliers et les points se font en visio, avec un lien de test partagé. Vous voyez l'application avancer, où que vous soyez.",
      "Vous êtes sur la Côte d'Azur ? Nous venons aussi chez vous.",
    ],
    localLink: "Création d'application à Nice",
    codeTitle: "Le code est à vous.",
    code: [
      "Nous développons sur des outils solides et répandus : Next.js et React pour l'interface, une base Postgres pour les données, Stripe pour les paiements, un hébergement Vercel. D'autres équipes savent les reprendre.",
      "Le code, les données et les comptes sont à votre nom. Si vous changez de prestataire un jour, vous partez avec tout.",
    ],
    auditTitle: "Vous avez déjà une application ?",
    auditBody:
      "Nous pouvons commencer par un audit. Vous saurez ce qui marche, ce qui bloque vos utilisateurs et ce qu'il faut refaire en premier.",
    auditLink: "Demander l'audit",
    linksTitle: "Une application, et des clients pour l'utiliser.",
    linksBody:
      "Une application doit être trouvée. Nous travaillons aussi le site qui la présente, le référencement et les campagnes qui amènent les premiers utilisateurs.",
    links: [
      { href: "creation-site-application", label: "Sites et applications" },
      { href: "agence-seo-google-ads", label: "SEO et Google Ads" },
      { href: "agence-geo", label: "Agence GEO" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Combien coûte le développement d'une application ?",
        a: "C'est sur devis. Le prix dépend du nombre d'écrans, des fonctions, des comptes utilisateurs et des liens avec vos autres outils. Après un premier échange et un cadrage, vous recevez un prix ferme.",
      },
      {
        q: "Combien de temps faut-il pour créer une application ?",
        a: "Selon le périmètre, nous vous donnons un délai ferme dans le devis. Une première version simple sort plus vite. Nous ajoutons ensuite les fonctions par étapes.",
      },
      {
        q: "Application web, PWA ou application mobile : que choisir ?",
        a: "Une application web marche partout. Une PWA s'installe en plus sur le téléphone, sans passer par les stores. Une application native se justifie si vous avez besoin d'un accès poussé au téléphone ou d'une présence dans les stores. Nous vous conseillons avant de commencer.",
      },
      {
        q: "Qui est propriétaire du code ?",
        a: "Vous. Le code, les données et les comptes sont à votre nom. Vous pouvez reprendre le projet avec une autre équipe à tout moment.",
      },
      {
        q: "Pouvez-vous reprendre une application existante ?",
        a: "Oui. Nous commençons par un audit du code et de l'usage. Ensuite, nous vous proposons de corriger, de faire évoluer ou de refaire.",
      },
      {
        q: "Assurez-vous la maintenance après la mise en ligne ?",
        a: "Oui. Nous proposons un suivi mensuel : corrections, mises à jour de sécurité et petites évolutions. Il se fixe dans le devis.",
      },
      {
        q: "Travaillez-vous avec des entreprises hors de Nice ?",
        a: "Oui. Nous travaillons à distance avec des entreprises de toute la France. Les points se font en visio.",
      },
    ],
    serviceType: "Développement d'applications web et mobiles",
  },
  en: {
    metaTitle: "Web and mobile app development agency in France",
    metaDesc:
      "App development agency for all of France: web app, mobile app or PWA, from mock-up to launch. The code is in your name. Quoted on request.",
    crumb: "App development",
    eyebrow: "App development",
    title: "Web and mobile app development agency.",
    intro:
      "You have an app idea, or a tool that no longer keeps up. We design, build and launch it. One team, from scoping to follow-up, for companies across France.",
    whatTitle: "What we build.",
    what: [
      "Business apps: tracking orders, files, stock or field work.",
      "Client portals and portals for your partners.",
      "SaaS platforms, with accounts, subscriptions and online payment.",
      "Mobile apps for iPhone and Android.",
      "Internal tools that replace spreadsheets and email threads.",
      "Web games and experiences, for a brand or an event.",
    ],
    kindsTitle: "Web, mobile or PWA: the difference, simply.",
    kinds: [
      "A web app opens in the browser, on a computer or a phone. There is only one version to build and maintain. Updates reach every user right away.",
      "A PWA (progressive web app) is a web app that installs on the phone's home screen. It opens like an app, without going through the App Store or Google Play. It can partly work offline.",
      "A native mobile app is published on the App Store and Google Play. It makes sense if you need deep access to the phone (sensors, Bluetooth, background tasks) or a presence in the stores. It means following two platforms and passing Apple's and Google's review.",
      "We advise you before we quote. Often, a web app or a PWA is enough to start.",
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
      "A first exchange, in writing or by video: the need, the users, the constraints.",
      "A written scope: screens, features, what goes in the first version and what waits.",
      "A quote with a firm price and timeline, based on the scope.",
      "Mock-ups to approve before code, to avoid surprises.",
      "Development in stages, with a test version you open whenever you want.",
      "Launch, then follow-up: fixes, improvements, usage tracking.",
    ],
    blogLink: "Read the article (in French): the steps of a custom build",
    remoteTitle: "Across France, remotely.",
    remote: [
      "We are based in Nice. Workshops and reviews happen by video call, with a shared test link. You see the app progress, wherever you are.",
      "On the French Riviera? We also come to you.",
    ],
    localLink: "App development in Nice",
    codeTitle: "The code is yours.",
    code: [
      "We build on solid, widely used tools: Next.js and React for the interface, a Postgres database for the data, Stripe for payments, Vercel hosting. Other teams know how to take them over.",
      "The code, the data and the accounts are in your name. If you ever change provider, you leave with everything.",
    ],
    auditTitle: "Already have an app?",
    auditBody:
      "We can start with an audit. You will know what works, what blocks your users and what to rebuild first.",
    auditLink: "Request the audit",
    linksTitle: "An app, and customers to use it.",
    linksBody:
      "An app must be found. We also work on the site that presents it, on search and on the campaigns that bring the first users.",
    links: [
      { href: "creation-site-application", label: "Websites and apps" },
      { href: "agence-seo-google-ads", label: "SEO and Google Ads" },
      { href: "agence-geo", label: "GEO agency" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much does app development cost?",
        a: "It is quoted. The price depends on the number of screens, the features, user accounts and links with your other tools. After a first exchange and a scoping step, you get a firm price.",
      },
      {
        q: "How long does it take to build an app?",
        a: "Based on the scope, we give you a firm timeline in the quote. A simple first version ships sooner. We then add features in stages.",
      },
      {
        q: "Web app, PWA or mobile app: which one?",
        a: "A web app works everywhere. A PWA also installs on the phone, without the stores. A native app makes sense if you need deep access to the phone or a presence in the stores. We advise you before we start.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The code, the data and the accounts are in your name. You can hand the project to another team at any time.",
      },
      {
        q: "Can you take over an existing app?",
        a: "Yes. We start with an audit of the code and of usage. Then we suggest fixing, improving or rebuilding.",
      },
      {
        q: "Do you handle maintenance after launch?",
        a: "Yes. We offer a monthly follow-up: fixes, security updates and small improvements. It is set in the quote.",
      },
      {
        q: "Do you work with companies outside Nice?",
        a: "Yes. We work remotely with companies across France. Meetings happen by video call.",
      },
    ],
    serviceType: "Web and mobile app development",
  },
} as const;

const AREA = [{ "@type": "Country", name: "France" }];

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

export default async function AgenceDeveloppementApplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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

      <PageHero locale={locale} art="orchid-b" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="application" />

      <Block id="applications" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block id="web-mobile-pwa" title={c.kindsTitle}>
        {c.kinds.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
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
        <div className="mt-6">
          <ArrowLink href={BLOG}>{c.blogLink}</ArrowLink>
        </div>
      </Block>

      <Block id="france" title={c.remoteTitle}>
        {c.remote.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
        <div className="mt-6">
          <ArrowLink href={`/${locale}/creation-application-nice`}>{c.localLink}</ArrowLink>
        </div>
      </Block>

      <Block id="code" title={c.codeTitle}>
        {c.code.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="audit" title={c.auditTitle}>
        <Body>{c.auditBody}</Body>
        <div className="mt-6">
          <ArrowLink href={`/${locale}/contact?besoin=application#projet`}>{c.auditLink}</ArrowLink>
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
