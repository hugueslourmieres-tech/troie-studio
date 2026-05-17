"use client";

import Image from "next/image";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * HeroSlideshow — infinite cross-fade carousel.
 *
 * - 7 slides stacked absolute, only one opacity-1 at a time.
 * - 2000ms ease cross-fade between slides.
 * - 6s on screen per slide, infinite loop.
 * - Tap / click on the slide area → next slide.
 * - Horizontal swipe on touch → next / previous.
 * - Pointer hover (mouse only) pauses the auto-advance.
 * - Click on the progress dots → jump to that slide.
 */

const SLIDES = [
  { src: "/images/slideshow/01.jpg", alt: "TROIE — slide 1" },
  { src: "/images/slideshow/03.jpg", alt: "TROIE — slide 2" },
  { src: "/images/slideshow/04.jpg", alt: "TROIE — slide 3" },
  { src: "/images/slideshow/06.jpg", alt: "TROIE — slide 4" },
  { src: "/images/slideshow/07.jpg", alt: "TROIE — slide 5" },
];

const SLIDE_MS = 6000;
const FADE_MS = 2000;
const SWIPE_THRESHOLD = 40;

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance loop
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  // Only pause on real mouse hover, not on touch
  const onPointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") setPaused(true);
  };
  const onPointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") setPaused(false);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    } else {
      // Tap (no swipe) → next slide
      next();
    }
  };

  const onClickArea = (e: React.MouseEvent<HTMLDivElement>) => {
    // Mouse click anywhere on the slide → next, ignoring clicks on dots
    if ((e.target as HTMLElement).closest("[data-no-advance]")) return;
    next();
  };

  return (
    <div
      className="group/slideshow relative h-full w-full cursor-pointer select-none overflow-hidden bg-[var(--bg-2)]"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClickArea}
      aria-label="TROIE, slideshow"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== current}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            zIndex: i === current ? 2 : 1,
          }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{
              filter: "grayscale(1) brightness(0.96) contrast(1.06)",
            }}
          />
        </div>
      ))}

      {/* Progress dots */}
      <div
        data-no-advance
        className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-1.5 md:bottom-6"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
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
      <div
        data-no-advance
        className="pointer-events-none absolute right-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]/70 md:right-6 md:top-6"
      >
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </div>
  );
}
