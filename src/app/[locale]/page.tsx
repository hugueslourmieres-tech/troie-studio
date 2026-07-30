import { setRequestLocale } from "next-intl/server";
import { Intro } from "@/components/Intro";
import { ManagerSection } from "@/components/ManagerSection";
import { AudienceFork } from "@/components/AudienceFork";
import { AiUrgency } from "@/components/AiUrgency";
import { CampusBridge } from "@/components/CampusBridge";
import { ClientsCloud } from "@/components/ClientsCloud";
import { AboutBlock } from "@/components/AboutBlock";
import { McpSection } from "@/components/McpSection";
import { MediasSection } from "@/components/MediasSection";
import { JournalTeaser } from "@/components/JournalTeaser";
import { ContactCTA } from "@/components/ContactCTA";
import { ContactBand } from "@/components/ContactBand";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Home, positionnement « IA d'abord ».
 *
 * Ordre réorganisé le 29/07/2026. L'ancien enchaînement plaçait la création
 * (12 projets photo, 14 vidéos) au milieu de la page, les logos clients et
 * l'unique point de contact tout en bas, à plus de 20 000 px. Résultat : le
 * portfolio parlait plus fort que l'IA, et la preuve comme la sortie
 * arrivaient trop tard.
 *
 * Séquence actuelle : on pose le studio (héros), on ouvre par l'urgence AI Act,
 * on montre le campus, on oriente (fork), PUIS on prouve (clients) et on offre
 * la sortie (bande de contact). Le reste du bloc IA suit (MCP, Mensch), et
 * l'atelier création vient ensuite comme preuve de fabrication, avant l'équipe,
 * le journal et le contact de clôture.
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

      {/* AI ACT : le hook conformité (échéance 2 août 2026), pousse à
          s'informer puis à se former. */}
      <AiUrgency locale={locale} />

      {/* LE CAMPUS : la passerelle décisive vers troie.app. Après le hook AI
          Act, on explique ce qu'est le campus et à quoi il sert (2 heures,
          attestation, gratuit pour commencer), capture produit à l'appui. */}
      <CampusBridge locale={locale} />

      {/* FORK Pro / Perso : oriente le visiteur. Le volet Particuliers
          (apprentissage) renvoie vers troie.app ; le volet Pro reste sur
          les services agence (audit, IA Pro). Remonté juste après le campus :
          c'est la décision d'orientation, elle suit l'offre, elle ne se
          découvre pas après le portfolio. */}
      <AudienceFork locale={locale} />

      {/* PREUVE PUIS SORTIE. Les logos clients étaient tout en bas, à 20 000 px,
          donc après le portfolio et l'équipe : la preuve arrivait quand la
          décision était déjà prise ou abandonnée. Elle remonte ici, juste après
          l'offre, et la bande de contact la suit immédiatement, pour que le
          visiteur convaincu n'ait pas à traverser la création pour nous
          parler. */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ClientsCloud />
        <ContactBand />
      </div>

      {/* MCP : l'IA branchée sur vos outils (explication + schéma) */}
      <McpSection locale={locale} />

      {/* MANAGER : le propos de Mensch (Mistral) sur la valeur ajoutée,
          l'IA exécute, vous pilotez (vidéo + article). Il ferme le bloc IA
          avant que la page ne bascule sur l'atelier.
          Le Panthéon est mis de côté (code conservé, non affiché). */}
      <ManagerSection locale={locale} />

      {/* MÉDIAS : photo (réalisations) + vidéo, fusionnés.
          ⚠️ NE PAS LE REMONTER AU-DESSUS DU BLOC IA. Le portfolio création
          (CHANEL, Ferrari, Monaco) est le contenu le plus spectaculaire de la
          page : placé avant, il disait « agence photo » plus fort que la page
          ne disait « IA », à rebours du positionnement 2026 où l'IA et l'AI Act
          sont la porte d'entrée et la création le cross-sell. */}
      <MediasSection locale={locale} />

      <AboutBlock locale={locale} />

      {/* JOURNAL : aimant SEO + pédagogie */}
      <JournalTeaser locale={locale} />

      {/* CTA, closing orange section */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
