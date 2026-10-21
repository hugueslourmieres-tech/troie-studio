import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/HomeHero";
import { ClientsCloud } from "@/components/ClientsCloud";
import { HomeFilms } from "@/components/HomeFilms";
import { HomeWebWorks } from "@/components/HomeWebWorks";
import { HomeDashboard } from "@/components/HomeDashboard";
import { HomeServices } from "@/components/HomeServices";
import { AboutBlock } from "@/components/AboutBlock";
import { ContactCTA } from "@/components/ContactCTA";

/**
 * Accueil (21/10/2026). Contrat de direction : .impeccable/surfaces/
 * src-app-locale-page-tsx.md (structure « les résultats en trois cartes »,
 * choisie par Hugues). Ordre : titre et trois résultats, marques, films,
 * sites, tableau de bord, services, équipe, appel.
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
      <HomeFilms locale={locale} />
      <HomeWebWorks locale={locale} />
      <HomeDashboard locale={locale} />
      <HomeServices locale={locale} />
      <AboutBlock locale={locale} />
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
