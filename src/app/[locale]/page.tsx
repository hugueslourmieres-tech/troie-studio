import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeWorks } from "@/components/home/HomeWorks";
import { HomeMethod } from "@/components/home/HomeMethod";
import { HomeTeam } from "@/components/home/HomeTeam";
import { HomeProject } from "@/components/home/HomeProject";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Accueil, refonte du 16/09/2026 : un seul parcours, « voici mon besoin,
 * voici votre proposition adaptée ». Cinq blocs, dans cet ordre :
 *
 *   1. la promesse et les quatre besoins (exemple + réalisation chacun) ;
 *   2. trois réalisations qui montrent la capacité à livrer ;
 *   3. la méthode : échange, proposition, réalisation ;
 *   4. l'équipe et le rôle de chacun ;
 *   5. le formulaire de projet.
 *
 * Retirés de l'accueil : les bandeaux promotionnels, les longues listes
 * d'outils, les appels répétés à l'audit ou à la formation. Les anciens
 * composants (Intro, AiUrgency, CampusBridge, AudienceFork, ClientsCloud,
 * McpSection, ManagerSection, MediasSection, AboutBlock, JournalTeaser,
 * ContactCTA) restent dans le dépôt, non montés ici.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      {/* Écriture au scroll des titres de section (h2 en texte simple). */}
      <WriteOnScroll selector="h2" />
      <HomeHero locale={locale} />
      <HomeWorks locale={locale} />
      <HomeMethod locale={locale} />
      <HomeTeam locale={locale} />
      <HomeProject locale={locale} />
    </div>
  );
}
