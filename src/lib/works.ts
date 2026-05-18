/**
 * Works data — single source of truth for case study covers, galleries
 * and metadata used by both the /works index and /works/[slug] pages.
 *
 * 12 projets, regroupés en marques clients + séries personnelles :
 *   - Clients luxe / event : CHANEL, Monaco
 *   - Clients corporate / industrie : Veoria, MIBI 2026, Cartonajes Pans,
 *     Wauters B'Pack, Capefront, Eshuis
 *   - Contenu & direction : Social Media, Formation IA
 *   - Séries personnelles : Valberg (Mercantour), Animaux (faune sauvage)
 */

export type WorkSlug =
  | "chanel"
  | "monaco"
  | "veoria"
  | "mibi-2026"
  | "cartonajes-pans"
  | "wauters-bpack"
  | "capefront"
  | "eshuis"
  | "social-media"
  | "formation-ia"
  | "valberg"
  | "animaux";

export type Work = {
  slug: WorkSlug;
  cover: string;
  gallery: string[];
};

const file = (folder: string, name: string) =>
  `/images/works/${folder}/${name}`;

export const WORKS: Work[] = [
  // ─────────────────────────────────────────────────────────────
  // Cas client corporate & industrie — mis en avant en premier
  {
    slug: "capefront",
    cover: file("Capefront", "cover.jpg"),
    gallery: [
      file("Capefront", "DSC_8104.jpg"),
      file("Capefront", "DSC_8111.jpg"),
      file("Capefront", "DSC_8137.jpg"),
      file("Capefront", "DSC_8345.jpg"),
      file("Capefront", "DSC_8504.jpg"),
      file("Capefront", "DSC_8513.jpg"),
      file("Capefront", "DSC_8526.jpg"),
      file("Capefront", "DSC_8570.jpg"),
      file("Capefront", "DSC_8610.jpg"),
    ],
  },
  {
    slug: "cartonajes-pans",
    cover: file("Cartonajes Pans", "cover.jpg"),
    // 16 photos in the folder; skip 15.jpg
    gallery: Array.from({ length: 16 }, (_, i) => i + 1)
      .filter((n) => n !== 15)
      .map((n) =>
        file("Cartonajes Pans", `${String(n).padStart(2, "0")}.jpg`),
      ),
  },
  {
    slug: "mibi-2026",
    cover: file("MIBI 2026", "cover.jpg"),
    gallery: Array.from({ length: 5 }, (_, i) =>
      file("MIBI 2026", `${String(i + 1).padStart(2, "0")}.jpg`),
    ),
  },
  {
    slug: "veoria",
    cover: file("Veoria", "cover.jpg"),
    gallery: Array.from({ length: 8 }, (_, i) =>
      file("Veoria", `${String(i + 1).padStart(2, "0")}.jpg`),
    ),
  },
  {
    slug: "wauters-bpack",
    cover: file("Wauters B'Pack", "cover.jpg"),
    gallery: [
      file("Wauters B'Pack", "DSC_2813.jpg"),
      file("Wauters B'Pack", "DSC_2866-5.jpg"),
      file("Wauters B'Pack", "IMG_0279-6.jpg"),
      file("Wauters B'Pack", "People on console offset pressDSC_2873-2.jpg"),
      file("Wauters B'Pack", "People on console offset pressDSC_2889.jpg"),
      file("Wauters B'Pack", "Social Media Pictures Rutherford1604335028710-4.jpg"),
      file("Wauters B'Pack", "Social Media Pictures RutherfordDSC_2930-2.jpg"),
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // Clients luxe & événementiel
  {
    slug: "chanel",
    cover: file("CHANEL", "cover.jpg"),
    gallery: [
      file("CHANEL", "DSC_5552-5.jpg"),
      file("CHANEL", "DSC_6477-5.jpg"),
      file("CHANEL", "DSC_8647-2.jpg"),
    ],
  },
  {
    slug: "monaco",
    cover: file("Monaco", "cover.jpg"),
    gallery: [
      file("Monaco", "01.jpg"),
      file("Monaco", "02.jpg"),
      file("Monaco", "03.jpg"),
      file("Monaco", "04.jpg"),
      file("Monaco", "IMG_8522.jpg"),
    ],
  },
  {
    slug: "eshuis",
    cover: file("Eshuis", "cover.jpg"),
    gallery: [
      file("Eshuis", "DSC_0691.jpg"),
      file("Eshuis", "DSC_0762.jpg"),
      file("Eshuis", "DSC_0777-3.jpg"),
      file("Eshuis", "DSC_0812-2.jpg"),
      file("Eshuis", "DSC_0846-2.jpg"),
      file("Eshuis", "DSC_0849.jpg"),
      file("Eshuis", "DSC_0860-2.jpg"),
      file("Eshuis", "DSC_0920.jpg"),
      file("Eshuis", "DSC_0955-2.jpg"),
      file("Eshuis", "DSC_0958.jpg"),
      file("Eshuis", "DSC_0997.jpg"),
      file("Eshuis", "DSC_0998-3.jpg"),
      file("Eshuis", "DSC_0999-2.jpg"),
      file("Eshuis", "DSC_1109-2.jpg"),
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // Contenu, direction artistique, formation
  {
    slug: "social-media",
    cover: file("Social Media", "cover.jpg"),
    gallery: [
      file("Social Media", "01.jpg"),
      file("Social Media", "02.jpg"),
      file("Social Media", "04.jpg"),
      file("Social Media", "DSC_6982-2.jpg"),
      file("Social Media", "DSC_7004.jpg"),
      file("Social Media", "GS Monaco Stories-0473-3.jpg"),
      file("Social Media", "IMG_8071.jpg"),
      file("Social Media", "IMG_8076.jpg"),
      file("Social Media", "IMG_8518.jpg"),
    ],
  },
  {
    slug: "formation-ia",
    cover: file("Formation IA", "cover.jpg"),
    gallery: [
      file("Formation IA", "01.jpg"),
      file("Formation IA", "02.jpg"),
      file("Formation IA", "04.jpg"),
      file("Formation IA", "05.jpg"),
      file("Formation IA", "06.jpg"),
      file("Formation IA", "07.jpg"),
      file("Formation IA", "08.jpg"),
      file("Formation IA", "10.jpg"),
      file("Formation IA", "11.jpg"),
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // Séries personnelles — nature
  {
    slug: "valberg",
    cover: file("Valberg", "cover.jpg"),
    gallery: Array.from({ length: 5 }, (_, i) =>
      file("Valberg", `${String(i + 1).padStart(2, "0")}.jpg`),
    ),
  },
  {
    slug: "animaux",
    cover: file("Animaux", "cover.jpg"),
    gallery: [
      file("Animaux", "01.jpg"),
      file("Animaux", "02.jpg"),
      file("Animaux", "04.jpg"),
      file("Animaux", "5AnimauxHuguesLourmieres.jpg"),
      file("Animaux", "8AnimauxHuguesLourmieres.jpg"),
      file("Animaux", "21AnimauxHuguesLourmieres.jpg"),
      file("Animaux", "29AnimauxHuguesLourmieres.jpg"),
      file("Animaux", "33AnimauxHuguesLourmieres.jpg"),
    ],
  },
];

export const findWork = (slug: string) => WORKS.find((w) => w.slug === slug);
