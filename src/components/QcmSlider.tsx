"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export type QcmSlideItem = {
  slug: string;
  cover: string;
  tagline: string;
  title: string;
  description: string;
};

/**
 * Slider des QCM gratuits : on fait défiler (drag / swipe + flèches) et on
 * choisit. Cartes claires (illustration au trait sur crème). DA TROIE.
 */
export function QcmSlider({
  items,
  moreHref,
  moreLabel,
}: {
  items: QcmSlideItem[];
  moreHref?: string;
  moreLabel?: string;
}) {
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
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-4 md:gap-6">
          {items.map((q) => (
            <div
              key={q.slug}
              className="min-w-0 flex-[0_0_82%] sm:flex-[0_0_48%] lg:flex-[0_0_31%]"
            >
              <Link
                href={`/formations/quiz/${q.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--rule)] bg-[#f4f1e5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={q.cover}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--bg)]/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-[#1a1714]/65 backdrop-blur-sm">
                    Gratuit
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                    {q.tagline}
                  </p>
                  <h4 className="t-display mt-3 text-xl text-[var(--fg)]">
                    {q.title}
                  </h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-2)]">
                    {q.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 transition-colors group-hover:text-[var(--accent)]">
                    Lancer le QCM
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        {moreHref ? (
          <Link
            href={moreHref}
            className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {moreLabel}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        <div className="flex items-center gap-3">
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
  );
}
