"use client";

/**
 * HeroVideo — fullbleed looping cover video for the hero, in B&W to
 * match the rest of the editorial palette. No controls, muted, plays
 * inline on iOS, loops infinitely.
 */
export function HeroVideo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--bg-2)]">
      <video
        src="/images/hero/hero-troie.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="TROIE, film d'introduction"
        className="h-full w-full object-cover"
        style={{
          filter: "grayscale(1) brightness(0.96) contrast(1.06)",
        }}
      />
    </div>
  );
}
