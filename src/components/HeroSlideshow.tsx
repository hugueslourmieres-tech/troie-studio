"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/**
 * HeroSlideshow — cross-fade between full-frame photos.
 *
 * - All slides are stacked absolute; only one is opacity-1 at a time.
 * - 1100ms ease fade transition between slides.
 * - 5s on screen per slide, paused on hover (desktop).
 * - Progress dots + slide counter overlay.
 */

const SLIDES = [
  { src: "/images/slideshow/01.jpg", alt: "TROIE — slide 1" },
  { src: "/images/slideshow/02.jpg", alt: "TROIE — slide 2" },
  { src: "/images/slideshow/03.jpg", alt: "TROIE — slide 3" },
  { src: "/images/slideshow/04.jpg", alt: "TROIE — slide 4" },
  { src: "/images/slideshow/05.jpg", alt: "TROIE — slide 5" },
  { src: "/images/slideshow/06.jpg", alt: "TROIE — slide 6" },
  { src: "/images/slideshow/07.jpg", alt: "TROIE — slide 7" },
];

const SLIDE_MS = 5000;

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => setCurrent(((i % SLIDES.length) + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[var(--bg-2)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="TROIE, slideshow"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Progress dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5 md:bottom-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="pointer-events-auto h-px transition-all duration-500"
            style={{
              width: i === current ? 28 : 12,
              backgroundColor:
                i === current ? "var(--fg)" : "rgba(245,240,230,0.45)",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]/70 md:right-6 md:top-6">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </div>
  );
}
