import { setRequestLocale } from "next-intl/server";
import { Intro } from "@/components/Intro";
import { ClientsCloud } from "@/components/ClientsCloud";
import { HomeWebWorks } from "@/components/HomeWebWorks";
import { MediasSection } from "@/components/MediasSection";
import { ProofCase } from "@/components/ProofCase";
import { FounderBlock } from "@/components/FounderBlock";
import { AboutBlock } from "@/components/AboutBlock";
import { ContactCTA } from "@/components/ContactCTA";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Accueil « agence digitale » (21/10/2026, décision de Hugues). On vend le
 * service, pas la méthode : en arrivant, on comprend qu'on peut nous confier
 * tout son digital, puis on voit le travail. L'IA n'est ni un titre ni une
 * promesse. Pas de bloc AI Act, MCP, quiz ou campus sur cette page.
 *
 * Ordre : héros et 4 services, marques, sites et applications, photo et
 * vidéo, exemple Autajon, fondateur, équipe, contact.
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

      {/* HÉROS ET SERVICES, fond orange */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Intro asHero />
      </div>

      <ClientsCloud />

      <HomeWebWorks locale={locale} />

      <MediasSection locale={locale} />

      <ProofCase locale={locale} id="exemple" />

      <FounderBlock locale={locale} />

      <AboutBlock locale={locale} />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
