/**
 * Corporate video library — mixes local mp4 reels and YouTube testimonials.
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
  // Reels / brand films — hosted locally, B&W muted preview loop
  {
    kind: "local",
    src: "/images/videos-local/01.mp4",
    client: "GS Monaco",
    title: {
      fr: "GS Monaco, vidéo de présentation",
      en: "GS Monaco, présentation film",
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
  // YouTube testimonials — playlist PLr1x4-E5afOkvOVTLw5iidVcos_-MN7NB
  // Titles aligned with the actual YouTube titles.
  {
    kind: "youtube",
    youtubeId: "78a006Kulok",
    client: "GS Monaco × Forbes",
    title: {
      fr: "Témoignage — GS Monaco & Forbes Monaco",
      en: "Testimonial — GS Monaco & Forbes Monaco",
    },
  },
  {
    kind: "youtube",
    youtubeId: "yAZbtKzN_j0",
    client: "Wauters B'Pack",
    title: {
      fr: "Wauters B'Pack — précision colorimétrique en imprimerie",
      en: "Wauters B'Pack — advancing color précision in printing",
    },
  },
  {
    kind: "youtube",
    youtubeId: "r7_4EdplcdE",
    client: "Autajon × Rutherford",
    title: {
      fr: "Autajon Packaging × Rutherford",
      en: "Autajon Packaging × Rutherford",
    },
  },
  {
    kind: "youtube",
    youtubeId: "FTjkGK2K-wI",
    client: "LEFRANCQ Packaging",
    title: {
      fr: "LEFRANCQ Packaging — « We can't run the press without it »",
      en: "LEFRANCQ Packaging — “We can't run the press without it”",
    },
  },
  {
    kind: "youtube",
    youtubeId: "XjgKPUguTfw",
    client: "Moderna Printing × Rutherford",
    title: {
      fr: "Moderna Printing — moins de gâche, mises en route plus rapides",
      en: "Moderna Printing — reduced waste, smarter startups with Rutherford",
    },
  },
  {
    kind: "youtube",
    youtubeId: "vYN1mjCK9VU",
    client: "ColorConsulting Italy",
    title: {
      fr: "Témoignage — ColorConsulting Italy",
      en: "Testimonial — ColorConsulting Italy",
    },
  },
  {
    kind: "youtube",
    youtubeId: "w4sA1QzEvOs",
    client: "Printwell USA",
    title: {
      fr: "Témoignage — Printwell USA",
      en: "Testimonial — Printwell USA",
    },
  },
  {
    kind: "youtube",
    youtubeId: "ut247z4ren8",
    client: "Avery Dennison Querétaro",
    title: {
      fr: "Témoignage — Avery Dennison, Querétaro",
      en: "Testimonial — Avery Dennison, Querétaro",
    },
  },
];

export const DEFAULT_START = 10;

export const thumbnailUrl = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const embedUrl = (id: string, start = DEFAULT_START) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&start=${start}&rel=0&modestbranding=1&playsinline=1`;
