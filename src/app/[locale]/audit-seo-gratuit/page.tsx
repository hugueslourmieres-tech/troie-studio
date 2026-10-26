import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { ArrowLink, Faq, faqJsonLd, loc, pageAlternates, serviceJsonLd } from "@/components/SeoBlocks";
import { SeoAudit } from "@/components/audit/SeoAudit";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";
import { breadcrumbJsonLd } from "../_local/blocks";

/**
 * Audit SEO et GEO gratuit (26/10/2026), FR et EN. Remplace /scan-ia
 * (redirigé ici). Requêtes visées : « audit seo », « audit site internet »,
 * « audit seo gratuit », « geo seo ».
 *
 * Règles : aucun prix, aucune promesse de citation par une IA, rien
 * d'inventé (chaque ligne du rapport découle d'un fait lu sur le site).
 * Une seule suite : la page contact (décision du 26/10/2026, plus de lien
 * Cal sur cette page). ?site=exemple.fr lance l'audit tout seul.
 */
const PATH = "/audit-seo-gratuit";

const COPY = {
  fr: {
    metaTitle: "Audit SEO et GEO gratuit de votre site",
    metaDesc:
      "Audit gratuit de votre site internet, avec deux scores sur 100 : le SEO pour Google, le GEO pour ChatGPT, Gemini, Perplexity et les AI Overviews. Puis les points à corriger.",
    crumb: "Audit SEO gratuit",
    scopeTitle: "Ce que l'audit vérifie.",
    scopeIntro:
      "Jusqu'à vingt-cinq vérifications sur votre page d'accueil, votre robots.txt, votre plan du site et votre llms.txt. Elles donnent deux scores. Le score SEO, pour Google, réunit la technique, le contenu et la performance. Le score GEO, pour les moteurs IA, mesure la lisibilité IA.",
    families: [
      {
        name: "Technique",
        body: "HTTPS, consigne noindex, affichage mobile, langue déclarée, adresse canonique, robots.txt, plan du site, versions linguistiques.",
      },
      {
        name: "Contenu",
        body: "Titre et méta description, titre H1 unique, sections H2, textes alternatifs des images, aperçu de partage sur les réseaux.",
      },
      {
        name: "Lisibilité IA (score GEO)",
        body: "Accès de GPTBot, ClaudeBot, PerplexityBot et des autres robots IA, texte servi sans JavaScript, données structurées, signaux d'identité, questions-réponses, llms.txt.",
      },
      {
        name: "Performance",
        body: "Temps de réponse du HTML, poids de la page, nombre de scripts, chargement différé des images.",
      },
    ],
    honestTitle: "Ce que l'audit ne dit pas.",
    honest: [
      "L'audit lit votre page d'accueil comme le font les robots de Google et des moteurs IA. Il mesure ce qui se vérifie : balises, fichiers, données structurées, vitesse de réponse.",
      "Il ne dit pas si ChatGPT, Gemini ou Perplexity citent votre entreprise. Personne ne peut le mesurer de façon fiable, ni le garantir. Ce que l'audit relève, en revanche, se corrige et se vérifie.",
      "Il regarde la page d'accueil seulement. Un audit complet couvre toutes les pages, la Search Console et vos concurrents. C'est le travail que nous faisons avec vous.",
    ],
    contactLink: "Décrire mon projet",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Qu'est-ce qu'un audit SEO ?",
        a: "Un audit SEO vérifie ce qui aide ou freine votre site dans Google : technique, contenu, structure, vitesse. Il se termine par une liste de corrections classées par priorité.",
      },
      {
        q: "L'audit est-il vraiment gratuit ?",
        a: "Oui. Les scores SEO et GEO, leur détail et les trois points prioritaires s'affichent sans inscription. Le rapport détaillé vous est envoyé par e-mail, sans engagement.",
      },
      {
        q: "Quelle différence entre SEO et GEO ?",
        a: "Le SEO vise une place dans les résultats de Google. Le GEO vise une mention dans les réponses rédigées par ChatGPT, Gemini, Perplexity ou les AI Overviews de Google. Les deux reposent sur un site clair et bien balisé.",
      },
      {
        q: "Pourquoi mon score diffère-t-il d'un autre outil ?",
        a: "Chaque outil choisit ses critères et leur poids. Le nôtre donne une vraie place à la lisibilité par les moteurs IA, que les outils SEO classiques notent peu. Le détail de chaque vérification est dans le rapport.",
      },
      {
        q: "Que faites-vous de mon adresse e-mail ?",
        a: "Elle sert à vous envoyer le rapport. TROIE Studio peut vous recontacter à son sujet. Vous pouvez vous désinscrire à tout moment, en répondant à l'e-mail.",
      },
      {
        q: "Pouvez-vous corriger les points relevés ?",
        a: "Oui. Nous corrigeons le site avec vous, puis nous relançons l'audit pour comparer. Décrivez votre projet depuis la page contact.",
      },
    ],
    serviceType: "Audit SEO et GEO de site internet",
  },
  en: {
    metaTitle: "Free SEO and GEO audit of your website",
    metaDesc:
      "Free audit of your website with two scores out of 100: SEO for Google, GEO for ChatGPT, Gemini, Perplexity and AI Overviews. Then the points to fix.",
    crumb: "Free SEO audit",
    scopeTitle: "What the audit checks.",
    scopeIntro:
      "Up to twenty-five checks on your home page, your robots.txt, your sitemap and your llms.txt. They give two scores. The SEO score, for Google, combines technical setup, content and performance. The GEO score, for AI engines, measures AI readability.",
    families: [
      {
        name: "Technical",
        body: "HTTPS, noindex rule, mobile display, declared language, canonical address, robots.txt, sitemap, language versions.",
      },
      {
        name: "Content",
        body: "Title and meta description, a single H1, H2 sections, image alt text, social share preview.",
      },
      {
        name: "AI readability (GEO score)",
        body: "Access for GPTBot, ClaudeBot, PerplexityBot and other AI crawlers, text served without JavaScript, structured data, identity signals, questions and answers, llms.txt.",
      },
      {
        name: "Performance",
        body: "HTML response time, page weight, number of scripts, lazy-loaded images.",
      },
    ],
    honestTitle: "What the audit does not say.",
    honest: [
      "The audit reads your home page the way Google's and AI engines' crawlers do. It measures what can be checked: tags, files, structured data, response speed.",
      "It does not say whether ChatGPT, Gemini or Perplexity cite your company. Nobody can measure that reliably, or guarantee it. What the audit flags, however, can be fixed and checked.",
      "It looks at the home page only. A full audit covers every page, Search Console and your competitors. That is the work we do with you.",
    ],
    contactLink: "Describe my project",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What is an SEO audit?",
        a: "An SEO audit checks what helps or holds back your site in Google: technical setup, content, structure, speed. It ends with a list of fixes ranked by priority.",
      },
      {
        q: "Is the audit really free?",
        a: "Yes. The SEO and GEO scores, their breakdown and the three priority points show without sign-up. The detailed report is sent to you by email, with no commitment.",
      },
      {
        q: "What is the difference between SEO and GEO?",
        a: "SEO aims for a place in Google's results. GEO aims for a mention in the answers written by ChatGPT, Gemini, Perplexity or Google's AI Overviews. Both rely on a clear, well-marked-up site.",
      },
      {
        q: "Why does my score differ from another tool?",
        a: "Each tool picks its criteria and their weight. Ours gives real weight to readability by AI engines, which classic SEO tools barely score. The detail of each check is in the report.",
      },
      {
        q: "What do you do with my email address?",
        a: "It is used to send you the report. TROIE Studio may contact you about it. You can unsubscribe at any time by replying to the email.",
      },
      {
        q: "Can you fix the points found?",
        a: "Yes. We fix the site with you, then run the audit again to compare. Describe your project from the contact page.",
      },
    ],
    serviceType: "Website SEO and GEO audit",
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

export default async function AuditSeoPage({ params }: { params: Promise<{ locale: string }> }) {
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
      <JsonLd data={breadcrumbJsonLd(locale, PATH, c.crumb)} />
      <div aria-hidden="true" className="h-16 md:h-20" />

      <SeoAudit locale={locale} />

      <section id="verifications" className="scroll-mt-24 border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="t-display text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--fg)] md:text-5xl">
                {c.scopeTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--fg-2)]">{c.scopeIntro}</p>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {c.families.map((f) => (
                <li key={f.name} className="border-t border-[var(--rule)] py-7">
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">{f.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="limites" className="scroll-mt-24 border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <h2 className="t-display text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--fg)] md:text-4xl">
                {c.honestTitle}
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              {c.honest.map((p) => (
                <p key={p} className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg [&+p]:mt-5">
                  {p}
                </p>
              ))}
              <div className="mt-6">
                <ArrowLink href={`/${locale}/contact#projet`}>{c.contactLink}</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq title={c.faqTitle} items={c.faq} />
    </div>
  );
}
