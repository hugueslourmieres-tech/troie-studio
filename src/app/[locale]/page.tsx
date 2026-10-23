import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/HomeHero";
import { HomeAudience, HomeCtaBand, HomeProcess, HomeFaq } from "@/components/HomeConversion";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { ClientsCloud } from "@/components/ClientsCloud";
import { HomeFilms } from "@/components/HomeFilms";
import { HomePhotos } from "@/components/HomePhotos";
import { HomeWebWorks } from "@/components/HomeWebWorks";
import { HomeDashboard } from "@/components/HomeDashboard";
import { HomeServices } from "@/components/HomeServices";
import { AboutBlock } from "@/components/AboutBlock";
import { ContactCTA } from "@/components/ContactCTA";

/**
 * Accueil (21/10/2026). Contrat de direction : .impeccable/surfaces/
 * src-app-locale-page-tsx.md (structure « les résultats en trois cartes »,
 * choisie par Hugues). Ordre : titre et trois résultats, tableau de bord,
 * sites, films, services, marques, équipe, appel.
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
      <HomeServices locale={locale} />
      <HomeAudience locale={locale} />
      <HomeWebWorks locale={locale} />
      <HomeCtaBand locale={locale} />
      <HomeFilms locale={locale} />
      <HomePhotos locale={locale} />
      <HomeProcess locale={locale} />
      <HomeDashboard locale={locale} />
      <AboutBlock locale={locale} />
      <HomeFaq locale={locale} />
      <div id="contact-final">
        <ContactCTA locale={locale} />
      </div>
      <StickyMobileCta locale={locale} />
    </div>
  );
}
