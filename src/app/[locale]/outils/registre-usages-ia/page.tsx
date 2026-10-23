import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import {

  ArtBand,
  ArrowLink,
  BTN_DARK,
  LegalNote,
  ToolClosing,
  ToolHero,
  ToolSection,
  ToolShell,
  isEn,
  toolMetadata,
} from "@/components/outils/ToolsUI";

/**
 * Le registre des usages de l'IA (porté depuis troie.app le 23/10/2026) :
 * un modèle vierge en PDF, servi par /api/outils/registre. Le règlement
 * n'impose aucun modèle, celui-ci reprend ce qu'un contrôle demanderait.
 */

const PATH = "/outils/registre-usages-ia";
const PDF = "/api/outils/registre";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return toolMetadata({
    locale,
    path: PATH,
    fr: {
      title: "Registre des usages de l'IA : modèle gratuit en PDF",
      description:
        "Le registre qui garde la trace de vos usages de l'IA : outils validés, usages, données saisies, personnes concernées. Modèle vierge en PDF, gratuit.",
    },
    en: {
      title: "Register of AI uses: free PDF template",
      description:
        "A blank register to record your company's AI tools, uses, data and the people concerned. Free PDF template, in French.",
    },
  });
}

const PAGES = [
  {
    art: "meadow" as const,
    t: "Les outils et leurs usages",
    d: "Chaque outil, son offre, l'usage qui en est fait, par qui, avec quelles données. Avec la date de validation et la date de dernière revue.",
  },
  {
    art: "sky" as const,
    t: "La maîtrise de l'IA, personne par personne",
    d: "Qui utilise quoi, quel atelier ou quelle sensibilisation a été suivi, quand, et la trace qui l'atteste.",
  },
  {
    art: "orchid" as const,
    t: "Le mode d'emploi",
    d: "Ce qu'il faut mettre dans chaque colonne, et ce que le registre prouve, ou ne prouve pas.",
  },
];

export default async function RegistrePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ld = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "Registre des usages de l'intelligence artificielle",
    inLanguage: "fr-FR",
    encodingFormat: "application/pdf",
    url: `https://troiestudio.fr${PDF}`,
    isAccessibleForFree: true,
    publisher: { "@id": "https://troiestudio.fr/#organization" },
  };

  return (
    <ToolShell>
      <JsonLd data={ld} />
      <ToolHero
        locale={locale}
        title="Le registre des usages de l'IA."
        enLine={
          isEn(locale)
            ? "A blank register to record which AI tools your company uses, for what, and who has been made aware. Free PDF template, in French."
            : undefined
        }
        intro={
          <p>
            La charte pose la règle, le registre en garde la trace. Un modèle vierge de trois pages, à
            imprimer ou à remplir, à tenir à jour à chaque nouvel outil et au moins une fois par
            trimestre.
          </p>
        }
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a href={PDF} download className={BTN_DARK}>
            Télécharger le registre
            <span aria-hidden="true">↓</span>
          </a>
          <span className="text-sm text-[var(--fg-2)]">PDF, trois pages A4, gratuit</span>
        </div>
      </ToolHero>

      <ToolSection title="Ce qu'il contient">
        <ol className="grid gap-5 md:grid-cols-3">
          {PAGES.map((p, i) => (
            <li key={p.t} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-white">
              <ArtBand art={p.art} />
              <div className="p-6">
                <p className="text-sm tabular-nums text-[var(--accent)]">Page {i + 1}</p>
                <h3 className="mt-2 text-[17px] font-medium leading-snug text-[var(--fg)]">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </ToolSection>

      <ToolSection
        title="Ce qu'il prouve, et ce qu'il ne prouve pas"
        tone="panel"
        aside={
          <>
            <p>
              L&apos;article 4 du règlement (UE) 2024/1689 est une obligation de moyens : prendre des
              mesures pour garantir un niveau suffisant de maîtrise de l&apos;IA. Aucun certificat
              n&apos;est exigé. Le registre ne vous rend donc pas conforme à lui seul : il documente
              votre effort, et c&apos;est ce qu&apos;on vous demandera de montrer.
            </p>
            <p className="mt-4">Depuis le 2 août 2026, les autorités nationales peuvent contrôler.</p>
          </>
        }
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <ArrowLink href={`/${locale}/outils/charte-ia`}>Générer la charte qui va avec</ArrowLink>
          <ArrowLink href={`/${locale}/outils/checklist-ai-act`}>La checklist en sept étapes</ArrowLink>
        </div>
        <LegalNote>Document pratique, pas un avis juridique.</LegalNote>
      </ToolSection>

      <ToolClosing locale={locale} />
    </ToolShell>
  );
}

