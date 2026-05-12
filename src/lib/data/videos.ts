/**
 * Vidéos corporate hébergées localement (au lieu d'iframes YouTube).
 * Sources : public/images/videos-local/01.mp4 → 06.mp4
 *
 * Pourquoi local plutôt que YouTube :
 *   - pas de tracking cookie tiers
 *   - rendu instantané dans le slideshow (pas de chargement iframe)
 *   - cohérence visuelle (filtre N&B applicable directement)
 */

export type VideoItem = {
  src: string;
  poster?: string;
  title: { fr: string; en: string };
  client: string;
};

export const VIDEOS: VideoItem[] = [
  {
    src: "/images/videos-local/01.mp4",
    client: "GS Monaco",
    title: {
      fr: "GS Monaco — vidéo de présentation",
      en: "GS Monaco — Presentation film",
    },
  },
  {
    src: "/images/videos-local/02.mp4",
    client: "Top Akita Inu",
    title: {
      fr: "Top Akita Inu — interview Mickaël Bedouet",
      en: "Top Akita Inu — Mickaël Bedouet interview",
    },
  },
  {
    src: "/images/videos-local/03.mp4",
    client: "GS Monaco",
    title: { fr: "Reels GS Monaco", en: "GS Monaco — Reels" },
  },
  {
    src: "/images/videos-local/04.mp4",
    client: "Ferrari Auctions",
    title: {
      fr: "Reels Ferrari Auctions",
      en: "Ferrari Auctions — Reels",
    },
  },
  {
    src: "/images/videos-local/05.mp4",
    client: "X-Rite — eXact 2",
    title: {
      fr: "eXact 2 — shorts reels Paris",
      en: "eXact 2 — Paris shorts reels",
    },
  },
  {
    src: "/images/videos-local/06.mp4",
    client: "X-Rite — eXact 2",
    title: { fr: "eXact 2 — unbox", en: "eXact 2 — unboxing" },
  },
];
