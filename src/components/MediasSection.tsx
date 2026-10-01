import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { WorksGallery } from "./WorksGallery";
import { VideoSection } from "./VideoSection";
import { GreekMark } from "./GreekMark";

const HUGUES_INSTAGRAM = "https://www.instagram.com/hugueslourmieres/";

/**
 * Réalisations photo et vidéo. Le cœur créatif du studio, après la preuve
 * Autajon.
 *
 * La galerie photo masque la fiche formation-ia (filtre sans effet une fois
 * la fiche retirée de WORKS). Le carrousel vidéo masque Autajon, déjà
 * montrée plus haut par ProofCase.
 */
export function MediasSection({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section id="medias" className="border-t border-[var(--accent)] scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <div className="max-w-3xl">
            <GreekMark label={t("mediasEyebrow")} />
            <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {t("mediasTitle")}
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              {t("mediasBody")}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {/* Galerie photo, puis la mention des séries personnelles juste
              dessous (Valberg et Animaux). */}
          <div>
            <WorksGallery
              locale={locale}
              embedded
              label={t("mediasPhoto")}
              exclude={["formation-ia"]}
            />
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-[var(--fg-2)]/80">
              {t("mediasPersonal")}{" "}
              <a
                href={HUGUES_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="border-b border-[var(--fg)] pb-0.5 hover:text-[var(--accent)]"
              >
                {t("mediasPersonalLink")}
              </a>
              .
            </p>
          </div>
          <VideoSection
            locale={locale}
            embedded
            label={t("mediasVideo")}
            exclude={["FTjkGK2K-wI"]}
          />
        </div>
      </div>
    </section>
  );
}
