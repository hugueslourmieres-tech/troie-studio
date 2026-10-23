"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Signature de la DA « Prisme » (23/10/2026) : une toile abstraite qui couvre
 * tout le spectre (rouge, orange, jaune, vert, cyan, bleu, violet, magenta).
 * Elle tourne lentement sur la roue des couleurs (un tour par minute), deux
 * couches dérivent l'une sur l'autre et suivent la souris en sens contraires.
 * `scrim` assombrit légèrement la toile pour poser du texte blanc dessus.
 * Immobile si l'utilisateur réduit les animations.
 */
export function SpectrumBackdrop({
  className = "",
  scrim = false,
  children,
}: {
  className?: string;
  scrim?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--sx", x.toFixed(4));
      el.style.setProperty("--sy", y.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`relative isolate overflow-hidden ${className}`}>
      <div aria-hidden="true" className="spectrum-hue absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/art/spectrum-1.jpg" alt="" className="spectrum-layer-a absolute inset-[-15%] h-[130%] w-[130%] max-w-none object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/art/spectrum-2.jpg" alt="" className="spectrum-layer-b absolute inset-[-15%] h-[130%] w-[130%] max-w-none object-cover" />
        {scrim && <div className="absolute inset-0 bg-[#0d0e12]/30" />}
      </div>
      {children}
    </div>
  );
}
