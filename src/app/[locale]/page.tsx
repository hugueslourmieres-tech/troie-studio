import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/HomeHero";
import { ClientsCloud } from "@/components/ClientsCloud";
import { HomeResults } from "@/components/HomeResults";
import { HomeWebWorks } from "@/components/HomeWebWorks";
import { MediasSection } from "@/components/MediasSection";
import { HomeServices } from "@/components/HomeServices";
import { AboutBlock } from "@/components/AboutBlock";
import { ContactCTA } from "@/components/ContactCTA";

/**
 * Accueil, refonte du 21/10/2026 (« l'agence qui fait vendre ») : une seule
 * DA, fond blanc, neutres froids, un seul accent bleu réservé aux données.
 * On voit d'abord un vrai tableau de bord client (LOIR Paris), puis les
 * marques, trois cas chiffrés, le design des sites, la photo et la vidéo,
 * les services, l'équipe et le contact. Pas d'IA, pas d'ancrage « à Nice ».
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
      <HomeHero locale={locale} />
      <ClientsCloud />
      <HomeResults locale={locale} />
      <HomeWebWorks locale={locale} />
      <MediasSection locale={locale} />
      <HomeServices locale={locale} />
      <AboutBlock locale={locale} />
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
