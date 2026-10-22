import type { ReactNode } from "react";

/**
 * Maquettes d'appareils (22/10/2026) : un MacBook Pro et un iPhone, tirés de
 * vraies photos Adobe Stock détourées. Le contenu d'écran est passé en enfant et
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
        className="absolute overflow-hidden rounded-t-[0.6%] bg-[#060607]"
        style={{ left: "7.7%", top: "2.17%", width: "84.6%", height: "84.68%" }}
      >
        {/* Le site commence sous l'encoche (bande noire, comme en plein écran
            sur macOS) : l'encoche ne mord plus sur la barre de navigation. */}
        <div className="absolute inset-x-0 bottom-0 top-[2.9%] overflow-hidden bg-white">{children}</div>
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

/**
 * iPhone noir tout simple, vue de face (22/10/2026, choix de Hugues) :
 * maquette Adobe Stock n° 1030134880 (licence gratuite), détourée,
 * écran rendu transparent. Le site s'affiche dessous, sous la barre d'état,
 * pour que l'encoche ne cache rien.
 */
export function IPhone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "900 / 1828" }}>
      <div
        className="absolute overflow-hidden bg-white"
        style={{ left: "5.45%", top: "2.48%", width: "89.21%", height: "94.74%" }}
      >
        <div className="absolute inset-x-0 bottom-0 top-[5%] overflow-hidden">{children}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/mockups/iphone-black.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
    </div>
  );
}
