import type { ReactNode } from "react";

/**
 * Maquettes d'appareils dessinées en CSS (22/10/2026) : un MacBook Pro et
 * un iPhone récent (îlot dynamique, cadre titane). Nettes à toutes les
 * tailles, sans image à charger. Le contenu d'écran est passé en enfant et
 * doit remplir son parent (absolute inset-0). Sur iPhone, il démarre sous
 * la barre d'état pour que l'îlot ne cache rien.
 */

/**
 * MacBook Pro, space black, vue de face (22/10/2026) : vraie maquette
 * Adobe Stock n° 757477558 (licence gratuite prise sur le compte Adobe de
 * Hugues), détourée, écran rendu transparent. Le site s'affiche dessous, à
 * la position exacte de la dalle (mesurée au pixel), et l'encoche passe
 * par-dessus comme sur le vrai.
 */
export function MacBook({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "2000 / 1283" }}>
      <div
        className="absolute overflow-hidden rounded-t-[0.6%] bg-white"
        style={{ left: "7.7%", top: "2.17%", width: "84.6%", height: "84.68%" }}
      >
        {children}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/mockups/macbook-pro-space-black.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
    </div>
  );
}

/** iPhone récent : cadre titane gris sidéral foncé, bord noir fin, îlot dynamique. */
export function IPhone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[17%/8%] bg-[linear-gradient(145deg,#5a5c62,#2a2b30_38%,#3d3f45_68%,#1d1e22)] ring-1 ring-black/40 p-[2.2%] shadow-[0_30px_60px_-24px_rgba(17,19,24,0.55)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[15%/7%] bg-[#0c0c0e] p-[3.2%]">
        <div className="relative overflow-hidden rounded-[12.5%/5.8%] bg-white" style={{ aspectRatio: "9 / 19.5" }}>
          {/* Barre d'état : l'écran du site commence sous l'îlot dynamique */}
          <div className="absolute inset-x-0 bottom-0 top-[6.5%]">{children}</div>
          <span aria-hidden="true" className="absolute left-1/2 top-[1.6%] h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-[#0c0c0e]" />
        </div>
      </div>
    </div>
  );
}
