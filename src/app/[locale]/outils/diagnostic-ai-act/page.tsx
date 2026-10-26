import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { ToolHero, ToolShell, isEn, toolMetadata } from "@/components/outils/ToolsUI";
import { DiagnosticQuiz } from "./DiagnosticQuiz";

/**
 * Le diagnostic AI Act en sept questions (porté depuis troie.app le
 * 23/10/2026). Le résultat renvoie vers l'accompagnement des équipes
 * (/accompagnement#ia) et la page contact.
 */

const PATH = "/outils/diagnostic-ai-act";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return toolMetadata({
    locale,
    path: PATH,
    fr: {
      title: "Diagnostic AI Act gratuit : suis-je concerné, et par quoi ?",
      description:
        "Sept questions, trois minutes, sans inscription : ce que l'AI Act vous demande vraiment, et ce qui ne vous concerne pas. Calendrier de juillet 2026 inclus.",
    },
    en: {
      title: "Free AI Act diagnostic: does it apply to you?",
      description:
        "Seven questions, three minutes, no sign-up: what the EU AI Act really asks of your company. Questions in French.",
    },
  });
}

export default async function DiagnosticPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Diagnostic AI Act",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    url: `https://troiestudio.fr/fr${PATH}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@id": "https://troiestudio.fr/#organization" },
  };

  return (
    <ToolShell>
      <JsonLd data={ld} />
      <ToolHero
        locale={locale}
        title="Où en êtes-vous vraiment avec l'AI Act ?"
        enLine={
          isEn(locale)
            ? "Seven yes or no questions to see what the EU AI Act asks of your company, and what it does not. The questions and the result are in French."
            : undefined
        }
        intro={
          <p>
            Sept questions, trois minutes, aucune inscription. Vous saurez ce qui s&apos;applique à
            vous, et surtout ce qui ne s&apos;applique pas, calendrier de juillet 2026 inclus.
          </p>
        }
      />
      <section lang="fr" className="mx-auto max-w-4xl px-6 pb-20 md:px-12 md:pb-28">
        <DiagnosticQuiz locale={locale} />
      </section>
    </ToolShell>
  );
}
