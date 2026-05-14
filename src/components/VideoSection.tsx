import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { VideoCarousel } from "./VideoCarousel";

/**
 * VideoSection — bibliothèque vidéo corporate.
 * Carrousel 3-visibles (1 sur mobile), 6 films à parcourir.
 * Preview muet en N&B, click pour passer en couleur + son.
 */
export function VideoSection({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section
      id="videos"
      className="relative border-t-2 border-[var(--accent)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-4">
              <p className="t-eyebrow">{t("videosEyebrow")}</p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                {t("videosTitle")}
              </h2>
            </div>
            <div className="md:col-span-8 md:pt-6">
              <p className="max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
                {t("videosIntro")}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-20">
          <VideoCarousel locale={locale} />
        </div>
      </div>
    </section>
  );
}
