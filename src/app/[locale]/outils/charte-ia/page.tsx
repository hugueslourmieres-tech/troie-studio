import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import {
  ArtBand,
  ArrowLink,
  LegalNote,
  ToolClosing,
  ToolHero,
  ToolSection,
  ToolShell,
  isEn,
  toolMetadata,
} from "@/components/outils/ToolsUI";
import { CharteForm } from "./CharteForm";

/**
 * Outil gratuit : la charte d'usage de l'IA, personnalisée et livrée en PDF
 * (portée depuis troie.app le 23/10/2026). Un document daté au nom de
 * l'entreprise vaut mieux qu'un formulaire de capture : il circule, et il
 * porte le nom de l'agence en pied de page.
 */

const PATH = "/outils/charte-ia";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return toolMetadata({
    locale,
    path: PATH,
    fr: {
      title: "Charte d'usage de l'IA en entreprise : modèle gratuit en PDF",
      description:
        "Générez en deux minutes la charte d'usage de l'IA de votre organisation : dix règles, vos outils, votre référent. PDF daté, gratuit, sans inscription.",
    },
    en: {
      title: "AI use policy generator for companies, free PDF",
      description:
        "Generate your company's AI use policy in two minutes: ten rules, your tools, your contact person. Dated PDF, free, no sign-up. Document in French.",
    },
  });
}

const POINTS = [
  { t: "Deux minutes", d: "Quelques champs, et le PDF se télécharge. Aucun compte, aucune adresse email demandée." },
  {
    t: "Dix règles qui tiennent",
    d: "Périmètre, outils, données interdites, relecture humaine, transparence, décisions réservées, référent, registre, maîtrise de l'IA, révision.",
  },
  {
    t: "Le bon cadre juridique",
    d: "L'article 4 impose une obligation de moyens, pas un certificat. La charte le dit correctement, et rappelle la procédure si vous y mettez des sanctions.",
  },
];

export default async function ChartePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ld = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Rédiger la charte d'usage de l'IA de son entreprise",
    inLanguage: "fr-FR",
    url: `https://troiestudio.fr/fr${PATH}`,
    description:
      "Générer une charte d'usage de l'intelligence artificielle en entreprise, personnalisée et datée, au titre de l'article 4 du règlement (UE) 2024/1689.",
    totalTime: "PT2M",
    step: [
      { "@type": "HowToStep", name: "Nommer l'organisation", text: "Le nom figure sur le document : une charte anonyme ne prouve rien." },
      { "@type": "HowToStep", name: "Lister les outils autorisés", text: "Nommez les outils validés et leur offre : les garanties diffèrent entre une offre gratuite et une offre professionnelle." },
      { "@type": "HowToStep", name: "Choisir le niveau d'exigence", text: "Souple, standard ou strict : le niveau ajuste les règles sur les données interdites et les décisions réservées à l'humain." },
      { "@type": "HowToStep", name: "Désigner un référent", text: "Un nom et une adresse de signalement, pas un service." },
      { "@type": "HowToStep", name: "Dater, diffuser, conserver", text: "La charte se range avec le registre des usages et la trace des ateliers suivis." },
    ],
  };

  return (
    <ToolShell>
      <JsonLd data={ld} />
      <ToolHero
        locale={locale}
        title="La charte d'usage de l'IA de votre entreprise, en deux minutes."
        enLine={
          isEn(locale)
            ? "Generate a dated AI use policy in your company's name, as a PDF. The form and the document are in French."
            : undefined
        }
        intro={
          <p>
            Aucun texte n&apos;impose de charte. Mais c&apos;est la mesure la plus simple à produire au
            titre de l&apos;article 4 du règlement européen sur l&apos;IA, qui demande depuis le 2
            février 2025 de garantir un niveau suffisant de maîtrise de l&apos;IA. Remplissez,
            téléchargez, signez, diffusez.
          </p>
        }
      />

      <section lang="fr" className="mx-auto max-w-7xl px-6 pb-20 md:px-12 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white lg:col-span-8">
            <ArtBand art="sky" className="h-16" />
            <div className="p-6 md:p-10">
              <CharteForm />
            </div>
          </div>
          <ul className="flex flex-col gap-8 lg:col-span-4 lg:pt-4">
            {POINTS.map((p) => (
              <li key={p.t} className="border-t border-[var(--rule-strong)] pt-4">
                <p className="text-[16px] font-medium text-[var(--fg)]">{p.t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ToolSection
        title="Les deux pièces qui complètent votre charte"
        aside="La charte pose la règle. Le registre en garde la trace, et vos équipes la font vivre."
        tone="panel"
      >
        <ul className="grid gap-5 sm:grid-cols-2">
          <li className="flex flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-white">
            <ArtBand art="meadow" />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="text-[17px] font-medium text-[var(--fg)]">Le registre des usages</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
                Outils validés, usages, données saisies, personnes concernées. Modèle vierge en PDF.
              </p>
              <div className="mt-4">
                <ArrowLink href={`/${locale}/outils/registre-usages-ia`}>Voir le registre</ArrowLink>
              </div>
            </div>
          </li>
          <li className="flex flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-white">
            <ArtBand art="orchid" />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="text-[17px] font-medium text-[var(--fg)]">Des ateliers avec vos équipes</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
                Sur vos cas réels, avec une trace datée par personne. C&apos;est ce qui rend la charte
                vivante.
              </p>
              <div className="mt-4">
                <ArrowLink href={`/${locale}/accompagnement#ia`}>Voir l&apos;accompagnement</ArrowLink>
              </div>
            </div>
          </li>
        </ul>
        <LegalNote>
          Modèle fondé sur le règlement (UE) 2024/1689 et le code du travail, à adapter à votre
          organisation. Il ne constitue pas un conseil juridique.
        </LegalNote>
      </ToolSection>

      <ToolClosing locale={locale} />
    </ToolShell>
  );
}
