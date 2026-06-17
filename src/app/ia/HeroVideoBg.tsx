"use client";

import { useEffect, useRef } from "react";

/**
 * HeroVideoBg — fullbleed looping cover video used as ambient hero
 * background on the IA landing. Filtered to B&W and softened so the
 * editorial title above stays the reading focus.
 *
 * Same autoplay defence pattern as the main HeroVideo (force muted,
 * retry on loadeddata/canplay, unlock on first user gesture, resume
 * on visibilitychange).
 */
export function HeroVideoBg() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryPlay = () => {
      el.muted = true;
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    };

    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("ended", () => {
      el.currentTime = 0;
      tryPlay();
    });

    const unlock = () => {
      tryPlay();
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("scroll", unlock, { once: true, passive: true });
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    const onVisibility = () => {
      if (document.visibilityState === "visible" && el.paused) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      src="/images/hero/hero-troie.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
      style={{ filter: "grayscale(1) brightness(0.98) contrast(1.04)" }}
    />
  );
}
