"use client";

import Image from "next/image";
import { LoopRail } from "./LoopRail";

/**
 * Nos photos (23/10/2026) : une rangée à hauteur fixe qui défile, chaque
 * photo à ses vraies proportions (rien n'est rogné). Les entreprises
 * d'abord, la montagne et les animaux à la fin (demande de Hugues). Noir et blanc au repos, couleur au
 * survol, comme les films.
 *
 * Toutes prises au Nikon Z 6 de Hugues (EXIF vérifié le 23/10/2026). Les
 * séries signées par un autre photographe (CHANEL, Monaco, Wauters) et les
 * photos de Pierre Appert n'y vont jamais.
 *
 * 26/10/2026 : la rangée avance seule, une carte toutes les 2 s (LoopRail), sans flèches.
 */
type Photo = { src: string; w: number; h: number; fr: string; en: string };

const W = "/images/works";
const PHOTOS: Photo[] = [
  { src: `${W}/Cartonajes Pans/04.jpg`, w: 1363, h: 1290, fr: "Cartonajes Pans, l'atelier", en: "Cartonajes Pans, the plant" },
  { src: `${W}/Eshuis/DSC_0762.jpg`, w: 2048, h: 1363, fr: "Eshuis, l'imprimerie", en: "Eshuis, the print plant" },
  { src: `${W}/Capefront/DSC_8137.jpg`, w: 2048, h: 1638, fr: "Capefront Energies, l'équipe", en: "Capefront Energies, the team" },
  { src: `${W}/MIBI 2026/cover.jpg`, w: 2048, h: 1363, fr: "MIBI 2026, portrait d'équipe", en: "MIBI 2026, team portrait" },
  { src: `${W}/Capefront/DSC_8610.jpg`, w: 2048, h: 1638, fr: "Capefront Energies, en réunion", en: "Capefront Energies, in a meeting" },
  { src: `${W}/Eshuis/DSC_0690.jpg`, w: 2048, h: 1363, fr: "Eshuis, détail machine", en: "Eshuis, machine detail" },
  { src: `${W}/Eshuis/DSC_0955-2.jpg`, w: 1363, h: 2048, fr: "Eshuis, la ligne", en: "Eshuis, the line" },
  { src: `${W}/MIBI 2026/02.jpg`, w: 2048, h: 1363, fr: "MIBI 2026, au travail", en: "MIBI 2026, at work" },
  { src: `${W}/Valberg/03.jpg`, w: 1363, h: 2048, fr: "Valberg, les crêtes", en: "Valberg, the ridges" },
  { src: `${W}/Valberg/cover.jpg`, w: 1363, h: 2048, fr: "Valberg, le sommet", en: "Valberg, the summit" },
  { src: `${W}/Animaux/cover.jpg`, w: 2048, h: 1365, fr: "Rapace en vol, Mercantour", en: "Bird of prey, Mercantour" },
  { src: `${W}/Animaux/33AnimauxHuguesLourmieres.jpg`, w: 1365, h: 2048, fr: "Écureuil roux", en: "Red squirrel" },
  { src: `${W}/Animaux/02.jpg`, w: 2048, h: 1363, fr: "Chevreuil, Mercantour", en: "Roe deer, Mercantour" },
];

const COPY = {
  fr: { title: "Nos photos.", body: "Entreprises, ateliers, équipes, et un peu de montagne.", more: "Toutes les photos", rail: "Nos photos" },
  en: { title: "Our photos.", body: "Companies, plants, teams, and some mountains.", more: "All photos", rail: "Our photos" },
};

export function HomePhotos({ locale }: { locale: string }) {
  const L = locale === "en" ? "en" : "fr";
  const c = COPY[L];

  return (
    <section id="photos" className="scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-20 md:px-12 md:pb-28">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">{c.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.body}</p>
          </div>
          <a href={`/${locale}/medias#photo`} className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
            {c.more}
          </a>
        </div>

        <LoopRail
          label={c.rail}
          count={PHOTOS.length}
          prevLabel={L === "en" ? "Previous photo" : "Photo précédente"}
          nextLabel={L === "en" ? "Next photo" : "Photo suivante"}
          className="mx-[calc(50%-50vw)] mt-12 scroll-pl-[calc(50vw-50%)] px-[calc(50vw-50%)] pb-3 "
          render={(copy) =>
            PHOTOS.map((p) => (
              <li key={p.src} className="shrink-0">
                <figure className="group">
                  <div className="relative h-[240px] overflow-hidden rounded-2xl bg-[var(--bg-2)] sm:h-[320px] md:h-[440px]" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                    <Image
                      src={p.src}
                      alt={copy ? "" : p[L]}
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 660px, 450px"
                      className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-[var(--fg-2)]">{p[L]}</figcaption>
                </figure>
              </li>
            ))
          }
        />
      </div>
    </section>
  );
}
