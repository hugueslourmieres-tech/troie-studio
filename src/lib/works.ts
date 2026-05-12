/**
 * Works data — single source of truth for case study covers, galleries
 * and metadata used by both the /works index and /works/[slug] pages.
 *
 * Sources :
 *  - 6 catégories métier reprises de hlstudio.webflow.io/works
 *    (event / shooting / video / social / nature / wild-life)
 *  - 4 cas client récents : VEORIA 2025, MIBI 2026, Montpellier 2026,
 *    Printing industry Barcelona
 */

export type WorkSlug =
  | "event"
  | "shooting"
  | "video"
  | "social"
  | "nature"
  | "wild-life"
  | "veoria"
  | "mibi"
  | "montpellier"
  | "barcelona";

export type Work = {
  slug: WorkSlug;
  cover: string;
  gallery: string[];
};

const dir = (slug: WorkSlug) => `/images/works/${slug}`;

// Helper: build a gallery [01..NN].jpg from a slug + count
const seq = (slug: WorkSlug, n: number) =>
  Array.from({ length: n }, (_, i) => `${dir(slug)}/${String(i + 1).padStart(2, "0")}.jpg`);

export const WORKS: Work[] = [
  {
    slug: "event",
    cover: `${dir("event")}/cover.jpg`,
    gallery: seq("event", 4),
  },
  {
    slug: "shooting",
    cover: `${dir("shooting")}/cover.jpg`,
    gallery: seq("shooting", 5),
  },
  {
    slug: "video",
    cover: `${dir("video")}/cover.jpg`,
    gallery: seq("video", 2),
  },
  {
    slug: "social",
    cover: `${dir("social")}/cover.jpg`,
    gallery: seq("social", 4),
  },
  {
    slug: "nature",
    cover: `${dir("nature")}/cover.jpg`,
    gallery: seq("nature", 5),
  },
  {
    slug: "wild-life",
    cover: `${dir("wild-life")}/cover.jpg`,
    gallery: seq("wild-life", 5),
  },
  // ─────────────────────────────────────────────────────────────
  // 4 cas client récents
  {
    slug: "veoria",
    cover: `${dir("veoria")}/cover.jpg`,
    gallery: seq("veoria", 8),
  },
  {
    slug: "mibi",
    cover: `${dir("mibi")}/cover.jpg`,
    gallery: seq("mibi", 5),
  },
  {
    slug: "montpellier",
    cover: `${dir("montpellier")}/cover.jpg`,
    gallery: seq("montpellier", 11),
  },
  {
    slug: "barcelona",
    cover: `${dir("barcelona")}/cover.jpg`,
    gallery: seq("barcelona", 16),
  },
];

export const findWork = (slug: string) => WORKS.find((w) => w.slug === slug);
