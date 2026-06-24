"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "./Reveal";
import { ARTICLES_SORTED } from "@/app/[locale]/blog/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Le Journal sur la home : les derniers articles en carrousel manuel
 * (drag / swipe + flèches). DA TROIE.
 */
export function JournalTeaser({ locale }: { locale: string }) {
  const items = ARTICLES_SORTED.slice(0, 8);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow">Le Journal</p>
              <h2 className="t-display mt-6 max-w-2xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                Comprendre l&apos;IA, sans jargon.
              </h2>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ouvrir le Journal
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        {/* Carrousel manuel : drag / swipe + flèches */}
        <div className="mt-12 md:mt-16">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y gap-6">
              {items.map((a) => (
                <div
                  key={a.slug}
                  className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_31%]"
                >
                  <Link href={`/${locale}/blog/${a.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#1a1714]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.cover}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: "grayscale(1) contrast(1.05) brightness(0.95)" }}
                        loading="lazy"
                      />
                      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
                      <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e6]">
                        {a.category}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                        {a.readingMinutes} min · {formatDate(a.date)}
                      </p>
                      <h3 className="t-display mt-2 text-xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                        {a.cardTitle ?? a.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Flèches */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              aria-label="Précédent"
              onClick={scrollPrev}
              disabled={!canPrev}
              className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Suivant"
              onClick={scrollNext}
              disabled={!canNext}
              className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
