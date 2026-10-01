import { setRequestLocale } from "next-intl/server";
import { Intro } from "@/components/Intro";
import { ClientsCloud } from "@/components/ClientsCloud";
import { FounderBlock } from "@/components/FounderBlock";
import { ProofCase } from "@/components/ProofCase";
import { AboutBlock } from "@/components/AboutBlock";
import { MediasSection } from "@/components/MediasSection";
import { ContactCTA } from "@/components/ContactCTA";
import { ContactBand } from "@/components/ContactBand";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Accueil, positionnement « le partenaire stratégique » (1er/10/2026,
 * décision de Hugues). On vend d'abord la tête : la stratégie, puis la
 * fabrication par l'équipe, puis l'accompagnement. L'IA est un moyen, jamais
 * un titre ni une promesse : elle n'est citée que dans la carte Création et
 * dans la liste des prestations de l'équipe. troie.app vit à part, dans le
 * pied de page. Ne pas remettre de bloc IA, AI Act ou campus sur cette page
 * sans décision de Hugues.
 *
 * Ordre : héros et métiers, marques, fondateur, exemple Autajon, bande de
 * contact, réalisations, équipe, contact.
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

      {/* HÉROS : le studio et ses trois métiers, fond orange */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Intro asHero />
      </div>

      {/* MARQUES : fond crème, juste sous le héros */}
      <ClientsCloud />

      {/* FONDATEUR : qui pilote les projets */}
      <FounderBlock locale={locale} />

      {/* UN EXEMPLE : la vidéo Autajon, seule preuve chiffrée */}
      <ProofCase locale={locale} id="exemple" />

      {/* BANDE DE CONTACT : la sortie, juste après la preuve */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactBand />
      </div>

      {/* RÉALISATIONS : photo puis vidéo */}
      <MediasSection locale={locale} />

      {/* L'ÉQUIPE */}
      <AboutBlock locale={locale} />

      {/* CONTACT DE CLÔTURE, fond orange */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
