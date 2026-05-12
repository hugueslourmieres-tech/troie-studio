"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { VIDEOS, type VideoItem } from "@/lib/data/videos";

/**
 * VideoCarousel — slideshow vidéo corporate.
 *
 * - 3 vidéos visibles à la fois (1 sur mobile), reste scrollable / draggable
 * - Preview muet en N&B (loop sur les 2 premières secondes)
 * - Au clic, la card passe en plein son couleur (le filtre s'efface)
 * - Une seule card peut être active à la fois
 * - Drag/swipe pour parcourir les 6 vidéos
 */
export function VideoCarousel({ locale }: { locale: string }) {
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
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
    <div className="relative">
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-6">
          {VIDEOS.map((v, i) => (
            <div
              key={v.src}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <VideoCardLocal
                video={v}
                index={i}
                lang={lang}
                active={activeIdx === i}
                onActivate={() => setActiveIdx(i)}
                onDeactivate={() => setActiveIdx(null)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <div className="mt-10 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={scrollPrev}
          disabled={!canPrev}
          className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={scrollNext}
          disabled={!canNext}
          className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
        >
          →
        </button>
      </div>
    </div>
  );
}

function VideoCardLocal({
  video,
  index,
  lang,
  active,
  onActivate,
  onDeactivate,
}: {
  video: VideoItem;
  index: number;
  lang: "fr" | "en";
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // When the card becomes active, switch to color + sound, otherwise back to muted B&W loop preview.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      el.muted = false;
      el.loop = false;
      el.currentTime = 0;
      el.play().catch(() => {
        /* iOS autoplay rules — ignored */
      });
    } else {
      el.muted = true;
      el.loop = true;
      if (!el.paused) el.pause();
      // Don't reset currentTime — preview keeps looping from preview position
    }
  }, [active]);

  return (
    <article className="flex flex-col">
      <div
        className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-[var(--bg-2)]"
        onClick={() => (active ? onDeactivate() : onActivate())}
        role="button"
        tabIndex={0}
        aria-label={video.title[lang]}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            active ? onDeactivate() : onActivate();
          }
        }}
      >
        <video
          ref={ref}
          src={video.src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-[filter] duration-700"
          style={{
            filter: active
              ? "none"
              : "grayscale(1) brightness(0.96) contrast(1.06)",
          }}
        />
        {active && (
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onDeactivate();
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-[var(--bg)]/90 font-mono text-xs text-[var(--fg)] transition hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            ✕
          </button>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="t-display text-xl text-[var(--fg)] md:text-2xl">
          {video.client}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 max-w-md text-sm text-[var(--fg-2)]/70">
        {video.title[lang]}
      </p>
    </article>
  );
}
