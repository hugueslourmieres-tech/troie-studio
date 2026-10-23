"use client";

import { useEffect, useState } from "react";

/**
 * Barre de progression de lecture fixée en haut, au-dessus du header.
 * Spectre complet depuis le 23/10/2026 (DA « Prisme ») : du rouge au magenta,
 * le dégradé se dévoile au défilement.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]"
    >
      <div
        className="h-full bg-[linear-gradient(90deg,#ff3b30_0%,#ff9500_14%,#ffd60a_28%,#34c759_42%,#00c7be_56%,#0a84ff_70%,#5e5ce6_82%,#bf5af2_91%,#ff2d92_100%)]"
        style={{ clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)` }}
      />
    </div>
  );
}
