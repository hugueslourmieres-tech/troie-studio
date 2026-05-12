"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/**
 * HeroSlideshow — vidéo en plein cadre, auto-défilement infini.
 *
 * Chaque slide est une <video> qui joue en boucle, muet, plein écran cover.
 * Embla avance toutes les 6 s (assez pour laisser la vidéo respirer).
 * Drag/swipe possible + indicateurs en bas + compteur en haut.
 */

const SLIDES = [
  { src: "/images/videos-local/01.mp4", alt: "GS Monaco, vidéo de présentation" },
  { src: "/images/videos-local/03.mp4", alt: "Reels GS Monaco" },
  { src: "/images/videos-local/04.mp4", alt: "Ferrari Auctions, reels" },
  { src: "/images/videos-local/05.mp4", alt: "X-Rite eXact 2, Paris" },
  { src: "/images/videos-local/02.mp4", alt: "Top Akita Inu, interview" },
  { src: "/images/videos-local/06.mp4", alt: "eXact 2, unboxing" },
];

export function HeroSlideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false, align: "center", duration: 32 },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(SLIDES.length);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelected(idx);

      // Restart the new slide's video from the start, pause others for perf
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        if (i === idx) {
          v.currentTime = 0;
          v.play().catch(() => {
            /* iOS autoplay restriction, ignore */
          });
        } else {
          v.pause();
        }
      });
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <div className="relative h-full w-full">
      <div
        ref={emblaRef}
        className="h-full overflow-hidden"
        aria-label="TROIE, films"
      >
        <div className="flex h-full touch-pan-y">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden bg-[var(--bg-2)]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={s.src}
                autoPlay={i === 0}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={s.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5 md:bottom-6">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className="pointer-events-auto h-px transition-all duration-500"
            style={{
              width: i === selected ? 28 : 12,
              backgroundColor:
                i === selected ? "var(--fg)" : "rgba(245,240,230,0.45)",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]/70 md:right-6 md:top-6">
        {String(selected + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </div>
    </div>
  );
}
