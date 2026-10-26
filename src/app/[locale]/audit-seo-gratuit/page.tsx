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
    scopeIntro: "Jusqu'à vingt-cinq vérifications sur votre page d'accueil et vos fichiers. Elles donnent deux scores : SEO et GEO.",
    families: [
      {
        name: "Technique",
        body: "HTTPS, noindex, mobile, langue, adresse canonique, robots.txt, plan du site.",
      },
      {
        name: "Contenu",
        body: "Titre, méta description, H1 et H2, textes alternatifs, aperçu de partage.",
      },
      {
        name: "Lisibilité IA (score GEO)",
        body: "Accès des robots IA, texte sans JavaScript, données structurées, llms.txt.",
      },
      {
        name: "Performance",
        body: "Temps de réponse, poids de la page, scripts, images différées.",
      },
    ],
    honestTitle: "Ce que l'audit ne dit pas.",
    honest: [
      "L'audit mesure ce qui se vérifie sur votre page d'accueil, pas si ChatGPT ou Gemini vous citent : personne ne peut le garantir.",
      "Un audit complet couvre toutes les pages et vos concurrents. C'est le travail que nous faisons avec vous.",
    ],
    contactLink: "Décrire mon projet",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Qu'est-ce qu'un audit SEO ?",
        a: "La vérification de ce qui aide ou freine votre site dans Google, avec les corrections classées par priorité.",
      },
      {
        q: "L'audit est-il vraiment gratuit ?",
        a: "Oui. Les scores s'affichent sans inscription. Le rapport détaillé arrive par e-mail, sans engagement.",
      },
      {
        q: "Quelle différence entre SEO et GEO ?",
        a: "Le SEO vise une place dans Google. Le GEO vise une mention dans les réponses de ChatGPT, Gemini ou des IA de Google.",
      },
      {
        q: "Pourquoi mon score diffère-t-il d'un autre outil ?",
        a: "Chaque outil a ses critères. Le nôtre pèse aussi la lisibilité par les IA, que les outils classiques notent peu.",
      },
      {
        q: "Que faites-vous de mon adresse e-mail ?",
        a: "Elle sert à envoyer le rapport. Nous pouvons vous recontacter à son sujet. Désinscription à tout moment, en répondant à l'e-mail.",
      },
      {
        q: "Pouvez-vous corriger les points relevés ?",
        a: "Oui. Nous corrigeons avec vous, puis nous relançons l'audit pour comparer.",
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
    scopeIntro: "Up to twenty-five checks on your home page and your files. They give two scores: SEO and GEO.",
    families: [
      {
        name: "Technical",
        body: "HTTPS, noindex, mobile, language, canonical address, robots.txt, sitemap.",
      },
      {
        name: "Content",
        body: "Title, meta description, H1 and H2, alt text, share preview.",
      },
      {
        name: "AI readability (GEO score)",
        body: "AI crawler access, text without JavaScript, structured data, llms.txt.",
      },
      {
        name: "Performance",
        body: "Response time, page weight, scripts, lazy images.",
      },
    ],
    honestTitle: "What the audit does not say.",
    honest: [
      "The audit measures what can be checked on your home page, not whether ChatGPT or Gemini cite you: nobody can guarantee that.",
      "A full audit covers every page and your competitors. That is the work we do with you.",
    ],
    contactLink: "Describe my project",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What is an SEO audit?",
        a: "A check of what helps or holds back your site in Google, with fixes ranked by priority.",
      },
      {
        q: "Is the audit really free?",
        a: "Yes. The scores show without sign-up. The detailed report arrives by email, with no commitment.",
      },
      {
        q: "What is the difference between SEO and GEO?",
        a: "SEO aims for a place in Google. GEO aims for a mention in answers from ChatGPT, Gemini or Google's AI.",
      },
      {
        q: "Why does my score differ from another tool?",
        a: "Each tool has its criteria. Ours also weighs readability by AI, which classic tools barely score.",
      },
      {
        q: "What do you do with my email address?",
        a: "It is used to send the report. We may contact you about it. Unsubscribe at any time by replying to the email.",
      },
      {
        q: "Can you fix the points found?",
        a: "Yes. We fix it with you, then run the audit again to compare.",
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
