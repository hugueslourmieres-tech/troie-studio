"use client";

import { useEffect } from "react";

/**
 * Reflet du verre liquide (23/10/2026) : pose --mx et --my sur la surface
 * .liquid-sheen survolée, pour qu'un éclat de lumière suive la souris.
 * Un seul écouteur pour tout le site.
 */
export function LiquidSheen() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".liquid-sheen") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
