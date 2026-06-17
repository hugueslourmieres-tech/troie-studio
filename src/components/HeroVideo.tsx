"use client";

import { useEffect, useRef } from "react";

/**
 * HeroVideo — fullbleed looping cover vidéo, B&W.
 *
 * autoplay layered defence:
 *   1. HTML attributes  : autoPlay loop muted playsInline preload="auto"
 *   2. On mount         : forcé muted then call .play() immediately.
 *   3. On loadeddata    : call .play() again (some browsers only allow it then).
 *   4. On canplay       : same.
 *   5. On document        first scroll / click / touch / keydown → play().
 *      Catches strict-autoplay browsers (Safari Low Power, Chrome Data Saver).
 *   6. On ended         : reset currentTime to 0 and play() (old Safari loop bug).
 *   7. On visibilitychange: résumé when tab becomes visible.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryPlay = () => {
      el.muted = true;
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* Will retry on next interaction */
        });
      }
    };

    // Immediate attempts
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("ended", () => {
      el.currentTime = 0;
      tryPlay();
    });

    // Fallback: first user gesture unlocks autoplay everywhere
    const unlock = () => {
      tryPlay();
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("scroll", unlock, { once: true, passive: true });
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true });

    // Résumé when tab refocuses
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
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--bg-2)]">
      <video
        ref={ref}
        src="/images/hero/hero-troie.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="TROIE, film d'introduction"
        className="h-full w-full object-cover"
        style={{
          filter: "grayscale(1) brightness(0.96) contrast(1.06)",
        }}
      />
    </div>
  );
}
