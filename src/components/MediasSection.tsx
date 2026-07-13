import { Reveal } from "./Reveal";
import { WorksGallery } from "./WorksGallery";
import { VideoSection } from "./VideoSection";
import { GreekMark } from "./GreekMark";

/**
 * Section "Médias" : fusionne la photographie (réalisations) et la vidéo
 * (films corporate) sous un même chapeau. Deux carrousels, un par média.
 */
export function MediasSection({ locale }: { locale: string }) {
  return (
    <section id="medias" className="border-t border-[var(--accent)] scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <div className="max-w-3xl">
            <GreekMark letter="Δ" label="Atelier" />
            <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              Création.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              Réalisations photo et productions vidéo : maisons de luxe,
              hôtellerie, sport, industrie et nature. Le détail des projets sur
              demande.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          <WorksGallery locale={locale} embedded />
          <VideoSection locale={locale} embedded />
        </div>
      </div>
    </section>
  );
}
