"use client";

import { useEffect, useRef } from "react";

/**
 * HeroVideo — fullbleed looping cover video, B&W. autoPlay + loop +
 * muted is enough for browsers; we also wire a JS fallback that calls
 * .play() once the metadata loads, in case a strict mobile browser
 * blocked the initial autoplay. ended handler nudges the loop back to
 * start if the native loop attribute was ignored (very old Safari).
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const startLoop = () => {
      el.muted = true;
      el.play().catch(() => {
        /* iOS strict autoplay rules — first interaction will start it */
      });
    };
    const onEnded = () => {
      el.currentTime = 0;
      el.play().catch(() => {});
    };
    el.addEventListener("loadeddata", startLoop);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("loadeddata", startLoop);
      el.removeEventListener("ended", onEnded);
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
