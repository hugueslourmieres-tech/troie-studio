import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { VideoCarousel } from "./VideoCarousel";

/**
 * VideoSection, bibliothèque vidéo corporate.
 * Carrousel 3-visibles (1 sur mobile), 6 films à parcourir.
 * `embedded` : rendu sans <section> ni gros header (utilisé dans la section
 * "Médias").
 * `label` : surtitre du header embedded. `exclude` : identifiants YouTube à
 * masquer, transmis au carrousel.
 */
export function VideoSection({
  locale,
  embedded = false,
  label,
  exclude,
}: {
  locale: string;
  embedded?: boolean;
  label?: string;
  exclude?: string[];
}) {
  const t = useTranslations("home");

  const header = embedded ? (
    <p className="t-eyebrow">{label ?? t("videosEyebrow")}</p>
  ) : (
    <Reveal>
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-20 lg:gap-x-20">
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
  );

  const body = (
    <>
      {header}
      <div className={embedded ? "mt-10" : "mt-20"}>
        <VideoCarousel locale={locale} exclude={exclude} />
      </div>
    </>
  );

  if (embedded) {
    return <div>{body}</div>;
  }

  return (
    <section id="videos" className="relative border-t border-[var(--rule)] scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">{body}</div>
    </section>
  );
}
