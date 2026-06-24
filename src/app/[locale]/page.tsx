import { setRequestLocale } from "next-intl/server";
import { Intro } from "@/components/Intro";
import { AudienceFork } from "@/components/AudienceFork";
import { AiUrgency } from "@/components/AiUrgency";
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
      <WriteOnScroll selector="h2" />

      {/* HERO = le studio et ses trois métiers, full orange Hermès */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Intro asHero />
      </div>

      {/* FORK Pro / Perso : oriente le visiteur */}
      <AudienceFork locale={locale} />

      {/* URGENCE IA : punchline FOMO, renvoie vers le QCM de niveau */}
      <AiUrgency />

      {/* QCM : situer son niveau IA (pour tous), juste au-dessus des projets */}
      <QcmSection />

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
