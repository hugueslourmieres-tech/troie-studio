import type { ReactNode } from "react";

/**
 * Maquettes d'appareils dessinées en CSS (22/10/2026) : un MacBook Pro et
 * un iPhone récent (îlot dynamique, cadre titane). Nettes à toutes les
 * tailles, sans image à charger. Le contenu d'écran est passé en enfant et
 * doit remplir son parent (absolute inset-0). Sur iPhone, il démarre sous
 * la barre d'état pour que l'îlot ne cache rien.
 */

/** MacBook Pro : écran 16:10 dans un cadre noir à encoche, puis le socle. */
export function MacBook({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Couvercle */}
      <div className="relative mx-[5.5%] rounded-t-[3.2%_5%] bg-[#0c0c0e] p-[1.9%_1.9%_2.4%] shadow-[0_0_0_1px_#2a2b30,0_40px_80px_-40px_rgba(17,19,24,0.55)]">
        <div className="relative overflow-hidden rounded-[0.6%] bg-white" style={{ aspectRatio: "16 / 10" }}>
          {children}
          {/* Encoche de la caméra */}
          <span aria-hidden="true" className="absolute left-1/2 top-0 h-[2.4%] w-[8%] -translate-x-1/2 rounded-b-[35%] bg-[#0c0c0e]" />
        </div>
      </div>
      {/* Socle aluminium, avec l'encoche d'ouverture */}
      <div className="relative h-0 pb-[3.1%]">
        <div className="absolute inset-0 rounded-b-[40%_100%] bg-[linear-gradient(180deg,#e9eaee_0%,#c9cbd1_45%,#a9acb4_100%)] shadow-[inset_0_1px_0_#f8f9fb]" />
        <span aria-hidden="true" className="absolute left-1/2 top-0 h-[38%] w-[15%] -translate-x-1/2 rounded-b-[40%] bg-[#b3b6bd]" />
      </div>
    </div>
  );
}

/** iPhone récent : cadre titane, bord noir fin, îlot dynamique. */
export function IPhone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[17%/8%] bg-[linear-gradient(145deg,#d9dade,#8e9097_40%,#c7c8cc_70%,#7d7f86)] p-[2.2%] shadow-[0_30px_60px_-24px_rgba(17,19,24,0.55)] ${className}`}
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
