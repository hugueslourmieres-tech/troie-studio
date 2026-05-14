/**
 * Corporate video library — embedded from YouTube.
 * Source playlist: https://youtube.com/playlist?list=PLr1x4-E5afOkvOVTLw5iidVcos_-MN7NB
 *
 * Each entry holds the YouTube ID; the embed URL is built with
 * autoplay=1 and start=10 so playback skips the first 10s of each clip.
 * Thumbnails are pulled from i.ytimg.com directly (no lib needed).
 */

export type VideoItem = {
  youtubeId: string;
  /** Seconds to skip at the start of each video */
  start?: number;
  title: { fr: string; en: string };
  client: string;
};

export const VIDEOS: VideoItem[] = [
  {
    youtubeId: "78a006Kulok",
    client: "GS Monaco × Forbes",
    title: {
      fr: "Témoignage — GS Monaco & Forbes Monaco",
      en: "Testimonial — GS Monaco & Forbes Monaco",
    },
  },
  {
    youtubeId: "yAZbtKzN_j0",
    client: "Wauters B'Pack",
    title: {
      fr: "Témoignage — Wauters B'Pack, précision colorimétrique",
      en: "Testimonial — Wauters B'Pack, color precision",
    },
  },
  {
    youtubeId: "r7_4EdplcdE",
    client: "Autajon × Rutherford",
    title: {
      fr: "Autajon Packaging × Rutherford",
      en: "Autajon Packaging × Rutherford",
    },
  },
  {
    youtubeId: "FTjkGK2K-wI",
    client: "LEFRANCQ Packaging",
    title: {
      fr: "Témoignage — LEFRANCQ Packaging",
      en: "Testimonial — LEFRANCQ Packaging",
    },
  },
  {
    youtubeId: "XjgKPUguTfw",
    client: "Moderna Printing",
    title: {
      fr: "Témoignage — Moderna Printing × Rutherford",
      en: "Testimonial — Moderna Printing × Rutherford",
    },
  },
  {
    youtubeId: "vYN1mjCK9VU",
    client: "ColorConsulting Italy",
    title: {
      fr: "Témoignage — ColorConsulting Italy",
      en: "Testimonial — ColorConsulting Italy",
    },
  },
  {
    youtubeId: "w4sA1QzEvOs",
    client: "Printwell USA",
    title: {
      fr: "Témoignage — Printwell USA",
      en: "Testimonial — Printwell USA",
    },
  },
  {
    youtubeId: "ut247z4ren8",
    client: "Avery Dennison Queretaro",
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
