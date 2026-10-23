import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { CHECKLIST_STEPS } from "@/lib/outils/checklist";
import {
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
 * La checklist AI Act PME (portée depuis troie.app le 23/10/2026) : la même
 * liste en page et en PDF à cocher (/api/outils/checklist), une seule source
 * de données (src/lib/outils/checklist.ts).
 */

const PATH = "/outils/checklist-ai-act";
const PDF = "/api/outils/checklist";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return toolMetadata({
    locale,
    path: PATH,
    fr: {
      title: "Checklist AI Act pour PME : les 7 étapes, en PDF",
      description:
        "Les sept étapes d'une PME pour répondre à l'article 4 de l'AI Act, dans l'ordre, avec ce qui est exigé et ce qui ne l'est pas. PDF gratuit à cocher.",
    },
    en: {
      title: "AI Act checklist for SMEs: 7 steps, free PDF",
      description:
        "The seven steps for an SME to meet article 4 of the AI Act, in order. Free printable PDF checklist, in French.",
    },
  });
}

export default async function ChecklistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ld = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Mettre une PME en règle avec l'article 4 de l'AI Act",
    inLanguage: "fr-FR",
    url: `https://troiestudio.fr/fr${PATH}`,
    step: CHECKLIST_STEPS.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.body })),
  };

  return (
    <ToolShell>
      <JsonLd data={ld} />
      <ToolHero
        locale={locale}
        title="En règle avec l'AI Act, en sept étapes."
        enLine={
          isEn(locale)
            ? "The seven steps for an SME to meet article 4 of the EU AI Act, as a page and as a printable PDF. Content in French."
            : undefined
        }
        intro={
          <p>
            L&apos;article 4 s&apos;applique depuis le 2 février 2025 : une obligation de moyens,
            garantir un niveau suffisant de maîtrise de l&apos;IA, sans certificat requis. Depuis le 2
            août 2026, contrôles et sanctions sont possibles. Voici l&apos;ordre dans lequel avancer.
          </p>
        }
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a href={PDF} download className={BTN_DARK}>
            Télécharger la checklist
            <span aria-hidden="true">↓</span>
          </a>
          <span className="text-sm text-[var(--fg-2)]">PDF, une page A4 à cocher</span>
        </div>
      </ToolHero>

      <section lang="fr" className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <ol className="grid gap-x-10 md:grid-cols-2">
            {CHECKLIST_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5 border-t border-[var(--rule)] py-7">
                <span className="t-display w-8 shrink-0 text-2xl tabular-nums text-[var(--accent)]">{i + 1}</span>
                <div>
                  <h2 className="text-[18px] font-medium leading-snug text-[var(--fg)]">{s.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ToolSection
        title="Les outils pour chaque étape"
        tone="panel"
        aside="L'inventaire et le tri tiennent dans le diagnostic. Les règles, dans la charte. La trace, dans le registre."
      >
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
          <ArrowLink href={`/${locale}/outils/diagnostic-ai-act`}>Le diagnostic, étapes 1 et 2</ArrowLink>
          <ArrowLink href={`/${locale}/outils/charte-ia`}>La charte, étape 3</ArrowLink>
          <ArrowLink href={`/${locale}/outils/registre-usages-ia`}>Le registre, étapes 5 et 7</ArrowLink>
        </div>
        <LegalNote>
          Synthèse pratique, pas un avis juridique. Règlement (UE) 2024/1689, modifié par le règlement
          (UE) 2026/1744.
        </LegalNote>
      </ToolSection>

      <ToolClosing locale={locale} />
    </ToolShell>
  );
}
