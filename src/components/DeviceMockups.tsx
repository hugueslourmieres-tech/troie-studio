import type { ReactNode } from "react";

/**
 * Maquettes d'appareils dessinées en CSS (22/10/2026) : un MacBook Pro et
 * un iPhone récent (îlot dynamique, cadre titane). Nettes à toutes les
 * tailles, sans image à charger. Le contenu d'écran est passé en enfant et
 * doit remplir son parent (absolute inset-0). Sur iPhone, il démarre sous
 * la barre d'état pour que l'îlot ne cache rien.
 */

/**
 * MacBook Pro 16 pouces, argent (22/10/2026, refait : la première version
 * ressemblait à un MacBook Air). Écran à bord noir fin et encoche, liseré
 * aluminium autour du couvercle, charnière sombre, châssis épais à face
 * avant droite avec l'encoche d'ouverture, ombre portée au sol.
 */
export function MacBook({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Couvercle : liseré aluminium, puis le bord noir de l'écran */}
      <div className="relative mx-[7.2%] rounded-t-[2.6%_4%] bg-[linear-gradient(180deg,#d7d9de,#9fa2a9_60%,#b9bcc2)] p-[0.42%] shadow-[0_40px_70px_-45px_rgba(17,19,24,0.6)]">
        <div className="relative rounded-t-[2.3%_3.6%] bg-[#060607] p-[1.55%_1.55%_2.5%]">
          <div className="relative overflow-hidden rounded-[0.55%] bg-white" style={{ aspectRatio: "16 / 10" }}>
            {children}
            {/* Encoche de la caméra */}
            <span aria-hidden="true" className="absolute left-1/2 top-0 h-[3.3%] w-[9.5%] -translate-x-1/2 rounded-b-[22%] bg-[#060607]" />
            {/* Reflet de la dalle */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0)_38%)]" />
          </div>
        </div>
      </div>
      {/* Charnière */}
      <div className="mx-[8.4%] h-0 rounded-b-[30%] bg-[linear-gradient(180deg,#2c2d31,#55575c)] pb-[0.55%]" />
      {/* Châssis : arête du plateau, face avant, encoche d'ouverture */}
      <div className="relative h-0 pb-[3.2%]">
        <div className="absolute inset-x-0 top-0 h-[26%] rounded-t-[0.6%_30%] bg-[linear-gradient(180deg,#f4f5f7,#d5d7dc)]" />
        <div className="absolute inset-x-0 bottom-0 top-[26%] rounded-b-[1.4%_60%] bg-[linear-gradient(180deg,#c4c6cb_0%,#a3a6ac_55%,#7f8289_100%)] shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)]" />
        <span aria-hidden="true" className="absolute left-1/2 top-[26%] h-[40%] w-[12%] -translate-x-1/2 rounded-b-[50%] bg-[linear-gradient(180deg,#9b9ea5,#b7babf)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]" />
      </div>
      {/* Ombre au sol */}
      <div aria-hidden="true" className="absolute inset-x-[5%] -bottom-[1.6%] -z-10 h-[3%] rounded-[50%] bg-[rgba(17,19,24,0.35)] blur-[10px]" />
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
