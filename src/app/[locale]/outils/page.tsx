import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import {
  ArtBand,
  ArrowLink,
  ToolClosing,
  ToolHero,
  ToolSection,
  ToolShell,
  isEn,
  toolMetadata,
  type Art,
} from "@/components/outils/ToolsUI";

/**
 * Index des outils IA gratuits (23/10/2026). Les outils B2B de troie.app
 * passent sur le site de l'agence : ils servent tout de suite, prouvent la
 * compétence et mènent à l'accompagnement. troie.app garde les 12 quiz.
 */

const PATH = "/outils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return toolMetadata({
    locale,
    path: PATH,
    fr: {
      title: "Outils IA gratuits pour les entreprises",
      description:
        "Charte d'usage de l'IA en PDF, registre des usages, checklist AI Act, diagnostic en sept questions et calendrier à jour. Gratuit, sans inscription.",
    },
    en: {
      title: "Free AI tools for companies",
      description:
        "AI use policy generator, register of uses, AI Act checklist, seven-question diagnostic and up-to-date calendar. Free, no sign-up. Content in French.",
    },
  });
}

type Tool = { href: string; art: Art; t: string; d: string; cta: string; meta: string };

function tools(locale: string): Tool[] {
  const b = `/${locale}`;
  return [
    {
      href: `${b}/outils/charte-ia`,
      art: "sky",
      meta: "PDF à votre nom",
      t: "La charte d'usage de l'IA",
      d: "Dix règles, vos outils, votre référent, votre niveau d'exigence. Un PDF daté à votre nom, prêt à diffuser.",
      cta: "Générer ma charte",
    },
    {
      href: `${b}/outils/diagnostic-ai-act`,
      art: "orchid",
      meta: "Sept questions",
      t: "Le diagnostic AI Act",
      d: "Ce que le règlement vous demande vraiment, et ce qui ne vous concerne pas. Résultat immédiat, sans inscription.",
      cta: "Faire le diagnostic",
    },
    {
      href: `${b}/outils/registre-usages-ia`,
      art: "meadow",
      meta: "PDF à remplir",
      t: "Le registre des usages",
      d: "La trace qui reste : outils validés, usages, données, personnes concernées. Un modèle vierge en trois pages.",
      cta: "Voir le registre",
    },
    {
      href: `${b}/outils/checklist-ai-act`,
      art: "dusk",
      meta: "PDF à cocher",
      t: "La checklist AI Act",
      d: "Les sept étapes d'une PME, dans l'ordre, avec ce qui est exigé et ce qui ne l'est pas.",
      cta: "Voir la checklist",
    },
  ];
}

export default async function OutilsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const list = tools(locale);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://troiestudio.fr/${locale}${PATH}#page`,
    name: "Outils IA gratuits pour les entreprises",
    inLanguage: "fr-FR",
    url: `https://troiestudio.fr/fr${PATH}`,
    publisher: { "@id": "https://troiestudio.fr/#organization" },
    hasPart: list.map((t) => ({
      "@type": "WebPage",
      name: t.t,
      url: `https://troiestudio.fr${t.href.replace(/^\/en\//, "/fr/")}`,
    })),
  };

  return (
    <ToolShell>
      <JsonLd data={ld} />
      <ToolHero
        locale={locale}
        crumb={false}
        title="Les outils qui posent le cadre de l'IA."
        enLine={
          isEn(locale)
            ? "Free tools to frame the use of AI in a company: a policy generator, a register, a checklist and an AI Act diagnostic. They are written in French, for French and European companies."
            : undefined
        }
        intro={
          <p>
            Cadrer l&apos;IA dans une entreprise tient en quelques documents et deux ou trois
            décisions. Ils sont ici, gratuits, sans compte à créer. Prenez ce dont vous avez besoin.
          </p>
        }
      />

      <section lang="fr" className="mx-auto max-w-7xl px-6 pb-20 md:px-12 md:pb-28">
        <ul className="grid gap-5 sm:grid-cols-2">
          {list.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--rule-strong)] hover:shadow-[0_12px_32px_-18px_rgba(17,19,24,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <ArtBand art={t.art} className="h-28 md:h-36" />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h2 className="t-display text-2xl leading-tight text-[var(--fg)] md:text-3xl">{t.t}</h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--fg-2)]">{t.d}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <span className="inline-flex items-center gap-2 text-[15px] font-medium text-[var(--fg)]">
                      {t.cta}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                    <span className="text-sm text-[var(--accent)]">{t.meta}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ToolSection
        title="Et pour s'y retrouver"
        aside="Les dates qui comptent, et un entraînement pour garder le réflexe entre deux ateliers."
      >
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
          <li className="bg-white p-6 md:p-8">
            <h3 className="text-[17px] font-medium text-[var(--fg)]">Le calendrier de l&apos;AI Act</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
              Ce qui s&apos;applique aujourd&apos;hui, ce qui a été reporté par le règlement 2026/1744,
              et à quelle date.
            </p>
            <div className="mt-4">
              <ArrowLink href={`/${locale}/ai-act-calendrier`}>Voir le calendrier</ArrowLink>
            </div>
          </li>
          <li className="bg-white p-6 md:p-8">
            <h3 className="text-[17px] font-medium text-[var(--fg)]">Les 12 quiz gratuits</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
              Deux minutes chacun, sans compte, sur troie.app.
            </p>
            <div className="mt-4">
              <ArrowLink href="https://troie.app">Essayer un quiz</ArrowLink>
            </div>
          </li>
        </ul>
      </ToolSection>

      <ToolClosing locale={locale} />
    </ToolShell>
  );
}
