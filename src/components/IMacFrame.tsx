"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * iMac 24 pouces bleu, vue de face (23/10/2026) : maquette Adobe Stock
 * n° 509051654 (licence gratuite, compte Adobe de Hugues). Le contenu est
 * mis en page sur un écran virtuel de 1180 × 665 px (le ratio de la dalle,
 * mesuré au pixel), puis réduit pour remplir exactement l'écran de l'iMac.
 * Il reste interactif : le survol des courbes se calcule en proportions.
 */
const STAGE_W = 1180;
const STAGE_H = 665;

export function IMacFrame({ children }: { children: ReactNode }) {
  const screen = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = screen.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / STAGE_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "2400 / 1527" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/mockups/imac-24-blue.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
      <div
        ref={screen}
        className="absolute overflow-hidden bg-white"
        style={{ left: "19.25%", top: "4.58%", width: "64.21%", height: "56.73%" }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left px-6 pt-5"
          style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
