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
 * Page de service « Agence GEO » (25/10/2026), FR et EN, nationale.
 * Requêtes visées : « agence geo », « geo seo », « référencement chatgpt »,
 * « référencement ia ». Aucune promesse de résultat : personne ne contrôle
 * les réponses des assistants. Aucun prix (retirés le 9/10/2026).
 * L'article de blog lié n'existe qu'en français.
 */
const PATH = "/agence-geo";
const BLOG = "/fr/blog/geo-apparaitre-chatgpt-gemini-ai-overviews";

const COPY = {
  fr: {
    metaTitle: "Agence GEO : être cité par ChatGPT et Google IA",
    metaDesc:
      "Agence GEO : nous auditons ce que ChatGPT, Gemini, Perplexity et les AI Overviews disent de votre marque, puis nous corrigeons votre site et vos sources. Sur devis.",
    crumb: "Agence GEO",
    eyebrow: "Agence GEO",
    title: "Agence GEO : être cité par ChatGPT, Gemini et Google.",
    intro:
      "Vos clients posent leurs questions à ChatGPT, à Gemini ou à Perplexity. Google affiche aussi des réponses rédigées en haut de ses résultats. Le GEO rend votre entreprise facile à comprendre et à citer par ces outils. Nous commençons par un audit, puis nous corrigeons.",
    defTitle: "Le GEO, en clair.",
    def: [
      "GEO veut dire Generative Engine Optimization. En français : le référencement dans les moteurs qui rédigent une réponse.",
      "Google affiche une liste de liens. ChatGPT, Gemini, Perplexity et les AI Overviews de Google rédigent une réponse, et citent parfois leurs sources. Si votre site est flou, ils parlent de vos concurrents, ou disent des choses fausses sur vous.",
      "Le GEO ne remplace pas le SEO. Il s'appuie dessus. Un site bien référencé, avec des informations nettes et les mêmes partout, a plus de chances d'être repris dans ces réponses.",
    ],
    whatTitle: "Ce que nous faisons.",
    what: [
      "Nous posons à ChatGPT, Gemini, Perplexity et Google les questions de vos clients, et nous notons ce qui sort sur vous.",
      "Nous ajoutons des données structurées à votre site : qui vous êtes, ce que vous vendez, où vous travaillez.",
      "Nous alignons votre identité partout : nom, activité, adresse et dirigeants, sur le site, la fiche Google, LinkedIn et les annuaires.",
      "Nous rédigeons des pages qui répondent à une vraie question, avec des faits datés et sourcés.",
      "Nous vous inscrivons dans les annuaires et les sources que ces outils lisent dans votre secteur.",
      "Nous publions un fichier llms.txt : un résumé de votre entreprise, écrit pour les assistants.",
    ],
    deliverTitle: "Ce que vous recevez.",
    deliver: [
      "Un relevé des réponses actuelles : les questions testées, ce que chaque outil dit de vous, les sources qu'il cite.",
      "La liste des erreurs et des oublis : informations fausses, concurrents cités à votre place, pages que personne ne trouve.",
      "Un plan de corrections, classé par priorité et par effort.",
      "Les corrections faites, si vous nous les confiez : données structurées, pages, fiches, llms.txt.",
      "Un nouveau relevé sur les mêmes questions, pour comparer avant et après.",
    ],
    howTitle: "Comment ça se passe.",
    how: [
      "Un appel de 30 minutes pour lister vos services, vos clients et les questions qu'ils posent.",
      "L'audit : les questions testées dans chaque outil, l'état de votre site et de vos fiches.",
      "Un rendu écrit, avec le plan de corrections et un devis.",
      "Les corrections, sur votre site et vos fiches, avec vous.",
      "Un suivi chaque mois si vous le souhaitez : les mêmes questions, et ce qui a changé.",
    ],
    auditLink: "Demander l'audit",
    honestTitle: "Ce que nous ne promettons pas.",
    honest: [
      "Personne ne contrôle les réponses de ChatGPT ou de Google. Elles changent d'un jour à l'autre, et d'un utilisateur à l'autre.",
      "Nous nous engageons sur la méthode, sur le travail fait et sur un relevé clair, avant et après. Vous voyez ce qui a bougé, question par question.",
    ],
    readTitle: "Pour aller plus loin.",
    readBody:
      "Notre article explique comment ces outils choisissent leurs sources, et ce que vous pouvez faire vous-même.",
    readLink: "Lire l'article : apparaître dans ChatGPT, Gemini et les AI Overviews",
    links: [
      { href: "agence-seo-google-ads", label: "Agence SEO et Google Ads" },
      { href: "consultant-google-ads", label: "Consultant Google Ads" },
      { href: "etudes-de-cas", label: "Études de cas" },
    ],
    proofTitle: "Des résultats mesurés chez nos clients.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Qu'est-ce que le GEO ?",
        a: "Le GEO (Generative Engine Optimization) est le travail qui rend votre entreprise facile à comprendre et à citer par les outils qui rédigent une réponse : ChatGPT, Gemini, Perplexity et les AI Overviews de Google.",
      },
      {
        q: "Quelle différence entre GEO et SEO ?",
        a: "Le SEO vise une place dans la liste des résultats de Google. Le GEO vise une mention dans une réponse rédigée. Les deux se complètent : ces outils s'appuient beaucoup sur les pages déjà bien référencées.",
      },
      {
        q: "Comment marche le référencement sur ChatGPT ?",
        a: "ChatGPT répond avec ce qu'il a appris et, souvent, avec une recherche sur le web. Il reprend des pages claires, à jour et confirmées par d'autres sources. Nous travaillons ces trois points : votre site, la cohérence de vos informations et les sources tierces.",
      },
      {
        q: "Pouvez-vous promettre que ChatGPT parlera de nous ?",
        a: "Non. Personne ne contrôle ces réponses. Nous vous montrons ce qu'elles disent aujourd'hui, nous corrigeons ce qui dépend de vous, puis nous mesurons à nouveau.",
      },
      {
        q: "Qu'est-ce qu'un fichier llms.txt ?",
        a: "Un fichier texte placé à la racine de votre site. Il résume votre activité et liste vos pages utiles, pour les assistants qui le lisent. Il est simple à publier. Tous les outils ne le lisent pas encore.",
      },
      {
        q: "Combien coûte un audit GEO ?",
        a: "C'est sur devis, selon le nombre de services, de marchés et de langues. Nous commençons toujours par un audit, après un appel de 30 minutes.",
      },
      {
        q: "Travaillez-vous partout en France ?",
        a: "Oui. Nous sommes basés à Nice et nous travaillons à distance avec des entreprises de toute la France. Les points se font en visio.",
      },
    ],
    serviceType: "Optimisation pour les moteurs génératifs (GEO)",
  },
  en: {
    metaTitle: "GEO agency: get cited by ChatGPT and Google AI",
    metaDesc:
      "GEO agency: we audit what ChatGPT, Gemini, Perplexity and AI Overviews say about your brand, then fix your site and your sources. Quoted on request.",
    crumb: "GEO agency",
    eyebrow: "GEO agency",
    title: "GEO agency: get cited by ChatGPT, Gemini and Google.",
    intro:
      "Your customers ask ChatGPT, Gemini or Perplexity. Google also shows written answers at the top of its results. GEO makes your company easy for these tools to understand and cite. We start with an audit, then we fix.",
    defTitle: "GEO, in plain words.",
    def: [
      "GEO stands for Generative Engine Optimization: search optimisation for engines that write an answer.",
      "Google shows a list of links. ChatGPT, Gemini, Perplexity and Google's AI Overviews write an answer, and sometimes cite their sources. If your site is vague, they talk about your competitors, or say wrong things about you.",
      "GEO does not replace SEO. It builds on it. A well-ranked site, with clear information that is the same everywhere, is more likely to be used in these answers.",
    ],
    whatTitle: "What we do.",
    what: [
      "We ask ChatGPT, Gemini, Perplexity and Google your customers' questions, and we record what comes up about you.",
      "We add structured data to your site: who you are, what you sell, where you work.",
      "We align your identity everywhere: name, activity, address and managers, on the site, the Google profile, LinkedIn and directories.",
      "We write pages that answer a real question, with dated and sourced facts.",
      "We list you in the directories and sources these tools read in your sector.",
      "We publish an llms.txt file: a summary of your company, written for assistants.",
    ],
    deliverTitle: "What you get.",
    deliver: [
      "A record of current answers: the questions tested, what each tool says about you, the sources it cites.",
      "The list of errors and gaps: wrong information, competitors cited instead of you, pages nobody finds.",
      "A plan of fixes, ranked by priority and effort.",
      "The fixes done, if you hand them to us: structured data, pages, profiles, llms.txt.",
      "A new record on the same questions, to compare before and after.",
    ],
    howTitle: "How it works.",
    how: [
      "A 30-minute call to list your services, your customers and the questions they ask.",
      "The audit: questions tested in each tool, the state of your site and your profiles.",
      "A written report, with the plan of fixes and a quote.",
      "The fixes, on your site and your profiles, with you.",
      "A monthly follow-up if you wish: the same questions, and what changed.",
    ],
    auditLink: "Request the audit",
    honestTitle: "What we do not promise.",
    honest: [
      "Nobody controls the answers of ChatGPT or Google. They change from day to day, and from one user to another.",
      "We commit to the method, to the work done and to a clear record, before and after. You see what moved, question by question.",
    ],
    readTitle: "Read more.",
    readBody:
      "Our article explains how these tools pick their sources, and what you can do yourself.",
    readLink: "Read the article (in French): appearing in ChatGPT, Gemini and AI Overviews",
    links: [
      { href: "agence-seo-google-ads", label: "SEO and Google Ads agency" },
      { href: "consultant-google-ads", label: "Google Ads consultant" },
      { href: "etudes-de-cas", label: "Case studies" },
    ],
    proofTitle: "Measured results for our clients.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What is GEO?",
        a: "GEO (Generative Engine Optimization) is the work that makes your company easy to understand and cite for tools that write an answer: ChatGPT, Gemini, Perplexity and Google's AI Overviews.",
      },
      {
        q: "What is the difference between GEO and SEO?",
        a: "SEO aims for a place in Google's list of results. GEO aims for a mention in a written answer. The two work together: these tools rely heavily on pages that already rank well.",
      },
      {
        q: "How does ranking on ChatGPT work?",
        a: "ChatGPT answers with what it has learned and, often, with a web search. It uses pages that are clear, up to date and confirmed by other sources. We work on these three points: your site, the consistency of your information and third-party sources.",
      },
      {
        q: "Can you promise that ChatGPT will mention us?",
        a: "No. Nobody controls these answers. We show you what they say today, we fix what depends on you, then we measure again.",
      },
      {
        q: "What is an llms.txt file?",
        a: "A text file at the root of your site. It summarises your business and lists your useful pages, for the assistants that read it. It is simple to publish. Not every tool reads it yet.",
      },
      {
        q: "How much does a GEO audit cost?",
        a: "It is quoted, based on the number of services, markets and languages. We always start with an audit, after a 30-minute call.",
      },
      {
        q: "Do you work across France?",
        a: "Yes. We are based in Nice and work remotely with companies across France. Meetings happen by video call.",
      },
    ],
    serviceType: "Generative Engine Optimization (GEO)",
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

export default async function AgenceGeoPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <PageHero locale={locale} art="sky-b" eyebrow={c.eyebrow} title={c.title} intro={c.intro} need="strategie" />

      <Block id="definition" title={c.defTitle}>
        {c.def.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <Block id="services" title={c.whatTitle}>
        <Sentences items={c.what} />
      </Block>

      <Block id="livrables" title={c.deliverTitle}>
        <Sentences items={c.deliver} />
      </Block>

      <Block id="methode" title={c.howTitle}>
        <Sentences items={c.how} />
        <div className="mt-6">
          <ArrowLink href={`/${locale}/contact?besoin=strategie#projet`}>{c.auditLink}</ArrowLink>
        </div>
      </Block>

      <Block id="engagement" title={c.honestTitle}>
        {c.honest.map((p) => (
          <Body key={p}>{p}</Body>
        ))}
      </Block>

      <ProofGrid locale={locale} title={c.proofTitle} ids={["loir", "autajon"]} />

      <Block id="liens" title={c.readTitle}>
        <Body>{c.readBody}</Body>
        <div className="mt-6">
          <ArrowLink href={BLOG}>{c.readLink}</ArrowLink>
        </div>
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
