"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

/**
 * Nos photos (23/10/2026) : une rangée à hauteur fixe qui défile, chaque
 * photo à ses vraies proportions (rien n'est rogné). Les entreprises
 * d'abord, la montagne et les animaux à la fin (demande de Hugues). Noir et blanc au repos, couleur au
 * survol, comme les films.
 *
 * Toutes prises au Nikon Z 6 de Hugues (EXIF vérifié le 23/10/2026). Les
 * séries signées par un autre photographe (CHANEL, Monaco, Wauters) et les
 * photos de Pierre Appert n'y vont jamais.
 */
type Photo = { src: string; w: number; h: number; fr: string; en: string };

const W = "/images/works";
const PHOTOS: Photo[] = [
  { src: `${W}/Capefront/DSC_8137.jpg`, w: 2048, h: 1638, fr: "Capefront Energies, l'équipe", en: "Capefront Energies, the team" },
  { src: `${W}/Cartonajes Pans/04.jpg`, w: 1363, h: 1290, fr: "Cartonajes Pans, l'atelier", en: "Cartonajes Pans, the plant" },
  { src: `${W}/Eshuis/DSC_0762.jpg`, w: 2048, h: 1363, fr: "Eshuis, l'imprimerie", en: "Eshuis, the print plant" },
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
  fr: { title: "Nos photos.", body: "Entreprises, ateliers, équipes. Et la montagne, pour garder l'œil.", more: "Toutes les photos", rail: "Nos photos", prev: "Photo précédente", next: "Photo suivante" },
  en: { title: "Our photos.", body: "Companies, plants, teams. And the mountains, to keep a sharp eye.", more: "All photos", rail: "Our photos", prev: "Previous photo", next: "Next photo" },
};

export function HomePhotos({ locale }: { locale: string }) {
  const L = locale === "en" ? "en" : "fr";
  const c = COPY[L];
  const rail = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const slide = (n: number) => {
    const el = rail.current;
    const items = Array.from(el?.children ?? []) as HTMLElement[];
    if (!el || !items.length) return;
    const k = ((n % items.length) + items.length) % items.length;
    el.scrollTo({ left: items[k].offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => {
      const items = Array.from(el.children) as HTMLElement[];
      let best = 0, dist = Infinity;
      items.forEach((it, k) => {
        const d = Math.abs(it.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (d < dist) { dist = d; best = k; }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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

        <ul
          ref={rail}
          aria-label={c.rail}
          className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:-mx-12 md:scroll-pl-12 md:gap-5 md:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {PHOTOS.map((p) => (
            <li key={p.src} className="shrink-0 snap-start">
              <figure className="group">
                <div className="relative h-[240px] overflow-hidden rounded-2xl bg-[var(--bg-2)] sm:h-[320px] md:h-[440px]" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                  <Image
                    src={p.src}
                    alt={p[L]}
                    fill
                    sizes="(min-width: 768px) 660px, 450px"
                    className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-[var(--fg-2)]">{p[L]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={() => slide(active - 1)} aria-label={c.prev} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform] duration-200 hover:text-[var(--fg)] active:scale-[0.92]">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {PHOTOS.map((p, i) => (
              <span key={p.src} className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? "w-6 bg-[var(--fg)]" : "w-1.5 bg-[var(--rule-strong)]"}`} />
            ))}
          </div>
          <button type="button" onClick={() => slide(active + 1)} aria-label={c.next} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform] duration-200 hover:text-[var(--fg)] active:scale-[0.92]">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
