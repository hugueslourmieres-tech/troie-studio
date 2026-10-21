import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/HomeHero";
import { HomeResults } from "@/components/HomeResults";
import { Intro } from "@/components/Intro";
import { ClientsCloud } from "@/components/ClientsCloud";
import { HomeWebWorks } from "@/components/HomeWebWorks";
import { MediasSection } from "@/components/MediasSection";
import { FounderBlock } from "@/components/FounderBlock";
import { AboutBlock } from "@/components/AboutBlock";
import { ContactCTA } from "@/components/ContactCTA";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Accueil « agence qui fait vendre » (21/10/2026, décision de Hugues). On
 * vend du résultat : en arrivant, une vraie courbe de ventes se trace, puis
 * trois cas chiffrés (boutique en ligne, PME, grand groupe). Ensuite les
 * services, puis le travail. Pas de bloc IA, AI Act, MCP ou quiz. Pas
 * d'ancrage « à Nice » dans la promesse : l'agence travaille partout.
 *
 * Ordre : héros et tableau de bord, résultats, services, marques, sites et
 * applications, photo et vidéo, fondateur, équipe, contact.
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
      <WriteOnScroll selector="h2" />

      {/* HÉROS, fond orange : la promesse et la courbe LOIR Paris */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <HomeHero locale={locale} />
      </div>

      <HomeResults locale={locale} />

      <div className="border-t border-[var(--rule)]">
        <Intro servicesOnly />
      </div>

      <ClientsCloud />

      <HomeWebWorks locale={locale} />

      <MediasSection locale={locale} />

      <FounderBlock locale={locale} />

      <AboutBlock locale={locale} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
