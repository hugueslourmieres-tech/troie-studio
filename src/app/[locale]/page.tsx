import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { AudienceFork } from "@/components/AudienceFork";
import { QcmSection } from "@/components/QcmSection";
import { WorksGallery } from "@/components/WorksGallery";
import { ClientsCloud } from "@/components/ClientsCloud";
import { AboutBlock } from "@/components/AboutBlock";
import { JournalTeaser } from "@/components/JournalTeaser";
import { ContactCTA } from "@/components/ContactCTA";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Home, positionnement "IA d'abord". On entre par les QCM (perso) puis le fork
 * Pro/Perso, la formation IA est mise en avant, et création / stratégie /
 * réalisations reviennent comme preuve du studio. DA Hermès (orange / cream).
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
      {/* Écriture au scroll : les titres de section s'écrivent mot par mot */}
      <WriteOnScroll />

      {/* HERO, full orange Hermès, opening statement */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Hero locale={locale} />
      </div>

      {/* INTRO, fond orange Hermès, le studio et ses métiers */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Intro />
      </div>

      {/* PARTICULIERS : les QCM gratuits, cartes cliquables */}
      <QcmSection />

      {/* FORK Pro / Perso : oriente le visiteur */}
      <AudienceFork locale={locale} />

      {/* WORKS, réalisations = preuve (Création / Stratégie / Formation ont
          leurs pages dédiées, accessibles depuis la nav) */}
      <WorksGallery locale={locale} />

      <AboutBlock />

      {/* JOURNAL : aimant SEO + pédagogie */}
      <JournalTeaser locale={locale} />

      {/* CLIENTS, ORANGE, juste au-dessus du CTA contact */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ClientsCloud />
      </div>

      {/* CTA, closing orange section */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
