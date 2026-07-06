"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "./Reveal";

/** Compétences listées sous l'aperçu. */
const CAPABILITIES = [
  "Sites vitrines & e-commerce",
  "Web apps & SaaS",
  "Applications mobiles",
  "Design system & UI sur mesure",
];

/** Projets web/app présentés dans le slideshow. */
const PROJECTS = [
  { img: "/images/creation/web/rutherford.jpg", url: "rutherford.fr" },
  { img: "/images/creation/web/playcolorguesser.jpg", url: "playcolorguesser.com" },
  { img: "/images/creation/web/perpost.jpg", url: "perpost.app" },
];

/**
 * Section "Site web & application" : un slideshow simple des projets, chaque
 * aperçu posé dans un mockup navigateur. Fond crème, DA TROIE.
 */
export function WebAppSection({ locale }: { locale: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => setSelected(emblaApi.selectedScrollSnap());
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section id="web-app" className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <div className="max-w-3xl">
            <p className="t-eyebrow">Site web &amp; application</p>
            <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              Des produits digitaux qui convertissent.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              Sites vitrines, e-commerce, web apps et applications mobiles. Design
              sur mesure, performance et conversion : de la maquette au
              déploiement.
            </p>
          </div>
        </Reveal>

        {/* Slideshow des projets */}
        <Reveal delay={0.1}>
          <div className="mt-16 md:mt-24">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex touch-pan-y gap-6">
                {PROJECTS.map((p) => (
                  <div
                    key={p.url}
                    className="min-w-0 flex-[0_0_90%] sm:flex-[0_0_78%] lg:flex-[0_0_64%]"
                  >
                    {/* Mockup navigateur */}
                    <div className="overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--bg-2)] shadow-[0_40px_90px_-40px_rgba(26,23,20,0.45)]">
                      <div className="flex items-center gap-2 border-b border-[var(--rule)] bg-[var(--bg)] px-4 py-3">
                        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28c840]" />
                        <span className="mx-auto flex h-6 w-1/2 max-w-xs items-center justify-center rounded-full bg-[var(--bg-2)] font-mono text-[10px] tracking-[0.12em] text-[var(--fg-2)]/55">
                          {p.url}
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                        <Image
                          src={p.img}
                          alt={`Aperçu du projet ${p.url}`}
                          fill
                          sizes="(max-width: 768px) 90vw, 64vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination + flèches */}
            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {PROJECTS.map((p, i) => (
                  <span
                    key={p.url}
                    aria-hidden="true"
                    className={`h-1.5 rounded-full transition-all ${
                      i === selected ? "w-7 bg-[var(--accent)]" : "w-1.5 bg-[var(--ink)]/25"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Précédent"
                  onClick={scrollPrev}
                  className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Suivant"
                  onClick={scrollNext}
                  className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Compétences + CTA */}
        <Reveal delay={0.2}>
          <div className="mt-20 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
            <ul className="grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base"
                >
                  <span aria-hidden="true" className="inline-block h-px w-3.5 flex-shrink-0 bg-[var(--accent)]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/creation/web`}
              className="inline-flex shrink-0 items-center gap-3 border-b border-[var(--rule-strong)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Voir nos sites &amp; apps →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
