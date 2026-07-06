import { setRequestLocale } from "next-intl/server";
import { Intro } from "@/components/Intro";
import { ManagerSection } from "@/components/ManagerSection";
import { AudienceFork } from "@/components/AudienceFork";
import { AiUrgency } from "@/components/AiUrgency";
import { QcmSection } from "@/components/QcmSection";
import { ClientsCloud } from "@/components/ClientsCloud";
import { AboutBlock } from "@/components/AboutBlock";
import { McpSection } from "@/components/McpSection";
import { MediasSection } from "@/components/MediasSection";
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

      {/* MANAGER : l'angle "devenez manager, pas remplacé" tient la
          promesse du hero tout de suite (vidéo Mensch + article).
          Le Panthéon est mis de côté (code conservé, non affiché). */}
      <ManagerSection locale={locale} />

      {/* URGENCE IA : punchline FOMO + preuve video Mensch, renvoie vers le QCM */}
      <AiUrgency locale={locale} />

      {/* FORK Pro / Perso : oriente le visiteur.
          FormationLadder (grille de prix) retirée de la home : les prix
          restent hors des pages marketing (composant conservé). */}
      <AudienceFork locale={locale} />

      {/* QCM : situer son niveau IA (pour tous), juste sous le fork */}
      <QcmSection />

      {/* MÉDIAS : photo (réalisations) + vidéo, fusionnés */}
      <MediasSection locale={locale} />

      <AboutBlock />

      {/* JOURNAL : aimant SEO + pédagogie */}
      <JournalTeaser locale={locale} />

      {/* MCP : l'IA branchée sur vos outils (explication + schéma) */}
      <McpSection />

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
