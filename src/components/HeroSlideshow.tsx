"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/**
 * HeroSlideshow — photos plein cadre, auto-défilement infini.
 *
 * - Embla Carousel (loop infini, drag/swipe, easing 28 frames)
 * - Autoplay 4.5 s par slide, pause au survol desktop
 * - Indicateurs de progression en bas + compteur en haut
 * - Photos en couleur (pas de filtre N&B)
 */

// Sourced from /public/images/slideshow/, ordre du dossier respecté.
const SLIDES = [
  { src: "/images/slideshow/01-flower.webp", alt: "Création IA, fleur" },
  { src: "/images/slideshow/02-chanel.jpg", alt: "Chanel, direction artistique" },
  { src: "/images/slideshow/03-veoria-7.jpg", alt: "Veoria, équipe 2025" },
  { src: "/images/slideshow/04-veoria-8.jpg", alt: "Veoria, équipe 2025" },
];

export function HeroSlideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false, align: "center", duration: 28 },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(SLIDES.length);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
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
        aria-label="TROIE, slideshow"
      >
        <div className="flex h-full touch-pan-y">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden bg-[var(--bg-2)]"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
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
