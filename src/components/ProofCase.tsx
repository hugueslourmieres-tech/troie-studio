import Link from "next/link";
import { VideoFacade } from "./VideoFacade";
import { thumbnailUrl } from "@/lib/data/videos";

/*
 * Seule preuve chiffrée vérifiée (donnée par Hugues). Avant publication :
 * accord écrit de Rutherford pour le chiffre de ventes, le budget et le nom
 * Autajon. Lien Offset 360 à ajouter quand il sera fourni. Le chiffre 5 000 €
 * reste dans la phrase, jamais en gros caractères (il se lirait comme un
 * tarif).
 *
 * Partagé entre l'accueil (#exemple), /medias et /strategie.
 */

const YOUTUBE_ID = "FTjkGK2K-wI";
const YOUTUBE_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&playsinline=1`;
const VIDEO_TITLE = "Autajon Packaging × Rutherford";

// Espaces insécables dans les montants : le chiffre ne se coupe jamais en deux.
const COPY = {
  fr: {
    eyebrow: "Un exemple",
    title: "Une vidéo qui a fait vendre.",
    body: "Une vidéo réalisée pour Autajon, en Italie, avec le groupe Rutherford. Hugues l'a montée avec son équipe, qui l'a aussi filmée. Le groupe estime qu'elle lui a rapporté environ 35 fois son budget.",
    bigFigure: "×35",
    bigLabel: "le budget, en ventes estimées par le groupe",
    credit: "Vidéo réalisée pour le groupe Rutherford, diffusée avec son accord.",
    // [À COMPLÉTER : lien de la vidéo Offset 360]
    offset: "Hugues a aussi dirigé la vidéo Offset 360.",
    more: "Voir les autres vidéos",
    playLabel: "Lire la vidéo",
    ariaLabel: `Lire la vidéo : ${VIDEO_TITLE}`,
  },
  en: {
    eyebrow: "An example",
    title: "A video that drove sales.",
    body: "A video made for Autajon, in Italy, with the Rutherford group. Hugues edited it with his team, who also shot it. The group estimates it brought in around 35 times its budget.",
    bigFigure: "×35",
    bigLabel: "the budget, in sales estimated by the group",
    credit: "Video made for the Rutherford group, shared with its agreement.",
    // [À COMPLÉTER : lien de la vidéo Offset 360, même lien qu'en français]
    offset: "Hugues also directed the Offset 360 video.",
    more: "See the other videos",
    playLabel: "Play the video",
    ariaLabel: `Play the video: ${VIDEO_TITLE}`,
  },
} as const;

/**
 * Un exemple : la vidéo Autajon. Texte et chiffre à gauche, lecteur à droite
 * (lecture au clic, youtube-nocookie, vignette en noir et blanc).
 */
export function ProofCase({
  locale,
  id = "exemple",
  showMoreLink = true,
}: {
  locale: string;
  id?: string;
  showMoreLink?: boolean;
}) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section id={id} className="border-t border-[var(--rule)] scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-5">
            <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl">
              {c.title}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {c.body}
            </p>
            <div className="mt-10 border-t border-[var(--rule)] pt-8">
              <p className="t-display text-4xl text-[var(--fg)] md:text-5xl">{c.bigFigure}</p>
              <p className="text-sm mt-2 text-[var(--fg-2)]/70 font-medium">
                {c.bigLabel}
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <VideoFacade
              youtubeSrc={YOUTUBE_SRC}
              poster={thumbnailUrl(YOUTUBE_ID)}
              title={VIDEO_TITLE}
              zoom={false}
              playLabel={c.playLabel}
              ariaLabel={c.ariaLabel}
            />
            <p className="mt-4 text-xs text-[var(--fg-2)]/70">{c.credit}</p>
            <p className="mt-2 text-sm text-[var(--fg-2)]">{c.offset}</p>
            {showMoreLink && (
              <Link
                href={`/${locale}/medias#video`}
                className="text-sm group/link mt-4 inline-flex w-fit items-center gap-2 border-b border-[var(--fg)] pt-2 pb-1 text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium"
              >
                {c.more}
                <span aria-hidden="true" className="transition group-hover/link:translate-x-1">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
