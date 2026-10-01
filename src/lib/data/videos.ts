/**
 * Corporate video library, mixes local mp4 reels and YouTube testimonials.
 *
 * - Local clips (kind: "local") autoplay muted B&W as a preview and switch
 *   to colour + sound on click. Files live in /public/images/videos-local.
 * - YouTube clips (kind: "youtube") show the YouTube thumbnail in B&W and
 *   load the youtube-nocookie iframe (autoplay + sound) on click, starting
 *   at the configured timestamp (10s by default).
 */

export type LocalVideo = {
  kind: "local";
  src: string;
  client: string;
  title: { fr: string; en: string };
};

export type YouTubeVideo = {
  kind: "youtube";
  youtubeId: string;
  start?: number;
  client: string;
  title: { fr: string; en: string };
};

export type VideoItem = LocalVideo | YouTubeVideo;

export const VIDEOS: VideoItem[] = [
  // ─────────────────────────────────────────────────────────────
  // Reels / brand films, hosted locally, B&W muted preview loop
  {
    kind: "local",
    src: "/images/videos-local/01.mp4",
    client: "GS Monaco",
    title: {
      fr: "GS Monaco, vidéo de présentation",
      en: "GS Monaco, presentation film",
    },
  },
  {
    kind: "local",
    src: "/images/videos-local/02.mp4",
    client: "Top Akita Inu",
    title: {
      fr: "Top Akita Inu, interview Mickaël Bedouet",
      en: "Top Akita Inu, Mickaël Bedouet interview",
    },
  },
  {
    kind: "local",
    src: "/images/videos-local/03.mp4",
    client: "GS Monaco",
    title: { fr: "GS Monaco, reels", en: "GS Monaco, reels" },
  },
  {
    kind: "local",
    src: "/images/videos-local/04.mp4",
    client: "Ferrari Auctions",
    title: {
      fr: "Ferrari Auctions, reels",
      en: "Ferrari Auctions, reels",
    },
  },
  {
    kind: "local",
    src: "/images/videos-local/05.mp4",
    client: "X-Rite, eXact 2",
    title: {
      fr: "eXact 2, shorts reels Paris",
      en: "eXact 2, Paris shorts reels",
    },
  },
  {
    kind: "local",
    src: "/images/videos-local/06.mp4",
    client: "X-Rite, eXact 2",
    title: { fr: "eXact 2, unbox", en: "eXact 2, unboxing" },
  },

  // ─────────────────────────────────────────────────────────────
  // YouTube testimonials, playlist PLr1x4-E5afOkvOVTLw5iidVcos_-MN7NB
  // Titres revérifiés le 1er/10/2026 via l'oEmbed YouTube : les libellés
  // étaient décalés d'une vidéo (Autajon était posé sur la vidéo Viappiani,
  // GS Monaco sur LEFRANCQ, etc.). Toujours vérifier l'identifiant avant de
  // changer un libellé.
  {
    kind: "youtube",
    youtubeId: "78a006Kulok",
    client: "LEFRANCQ Packaging",
    title: {
      fr: "LEFRANCQ Packaging, « We can't run the press without it »",
      en: "LEFRANCQ Packaging, “We can't run the press without it”",
    },
  },
  {
    kind: "youtube",
    youtubeId: "yAZbtKzN_j0",
    client: "Wauters B'Pack",
    title: {
      fr: "Wauters B'Pack, précision colorimétrique en imprimerie",
      en: "Wauters B'Pack, advancing color precision in printing",
    },
  },
  {
    kind: "youtube",
    youtubeId: "r7_4EdplcdE",
    client: "Viappiani Printing",
    title: {
      fr: "Viappiani Printing, précision, vitesse et moins de gâche",
      en: "Viappiani Printing, precision, speed and less waste",
    },
  },
  {
    kind: "youtube",
    youtubeId: "FTjkGK2K-wI",
    client: "Autajon Packaging Milan",
    title: {
      fr: "Autajon Packaging Milan, régularité des couleurs et efficacité",
      en: "Autajon Packaging Milan, colour consistency and efficiency",
    },
  },
  {
    kind: "youtube",
    youtubeId: "XjgKPUguTfw",
    client: "GS Monaco × Forbes",
    title: {
      fr: "Témoignage, GS Monaco & Forbes Monaco",
      en: "Testimonial, GS Monaco & Forbes Monaco",
    },
  },
  {
    kind: "youtube",
    youtubeId: "vYN1mjCK9VU",
    client: "Moderna Printing",
    title: {
      fr: "Moderna Printing, moins de gâche, mises en route plus rapides",
      en: "Moderna Printing, reduced waste, smarter startups",
    },
  },
  {
    kind: "youtube",
    youtubeId: "w4sA1QzEvOs",
    client: "ColorConsulting Italy",
    title: {
      fr: "Témoignage, ColorConsulting Italy",
      en: "Testimonial, ColorConsulting Italy",
    },
  },
  {
    kind: "youtube",
    youtubeId: "ut247z4ren8",
    client: "Printwell USA",
    title: {
      fr: "Témoignage, Printwell USA",
      en: "Testimonial, Printwell USA",
    },
  },
];

export const DEFAULT_START = 10;

export const thumbnailUrl = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const embedUrl = (id: string, start = DEFAULT_START) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&start=${start}&rel=0&modestbranding=1&playsinline=1`;
