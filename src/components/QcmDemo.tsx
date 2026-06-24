/**
 * Démo animée d'un QCM TROIE (HTML + CSS en boucle, aucune dépendance).
 * Un curseur choisit la bonne réponse, elle passe au vert, un « Bravo ! »
 * apparaît et Troyie saute de joie. Montre que les QCM sont interactifs et
 * ludiques. Animations désactivées si prefers-reduced-motion. DA TROIE.
 */
export function QcmDemo() {
  return (
    <div className="qcm-demo relative mx-auto w-full max-w-md select-none">
      {/* Carte QCM */}
      <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 shadow-[0_30px_60px_-30px_rgba(26,23,20,0.35)] md:p-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg-2)]/60">
          <span>QCM · Comprendre l&apos;IA</span>
          <span>Question 3 / 10</span>
        </div>

        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[var(--rule)]">
          <span className="qcm-demo-progress block h-full rounded-full bg-[var(--accent)]" style={{ width: "22%" }} />
        </div>

        <p className="t-display mt-6 text-2xl text-[var(--fg)] md:text-[26px]">
          Que fait un «&nbsp;prompt&nbsp;»&nbsp;?
        </p>

        <ul className="mt-6 space-y-3 font-mono text-[12px] tracking-[0.02em]">
          <li className="rounded-sm border border-[var(--rule)] px-4 py-3 text-[var(--fg-2)]">
            Il colore l&apos;image
          </li>
          <li className="qcm-demo-answer relative flex items-center justify-between gap-3 rounded-sm border px-4 py-3 text-[var(--fg)]">
            <span>Il donne la consigne à l&apos;IA</span>
            <span
              aria-hidden="true"
              className="qcm-demo-check flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ backgroundColor: "#2f9e5f", opacity: 0 }}
            >
              ✓
            </span>
          </li>
          <li className="rounded-sm border border-[var(--rule)] px-4 py-3 text-[var(--fg-2)]">
            Il éteint l&apos;ordinateur
          </li>
        </ul>
      </div>

      {/* Curseur qui clique la bonne réponse */}
      <span
        aria-hidden="true"
        className="qcm-demo-cursor pointer-events-none absolute left-[58%] top-[58%] z-20"
        style={{ opacity: 0 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]">
          <path d="M5 3l14 8-6 1.6 3.4 6.4-2.6 1.4L13 14l-4 4z" fill="#1a1714" stroke="#f5f0e6" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </span>

      {/* Badge victoire */}
      <div
        aria-hidden="true"
        className="qcm-demo-bravo absolute -right-2 top-6 z-20 rounded-full bg-[var(--accent)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1714] shadow-lg md:-right-4"
        style={{ opacity: 0 }}
      >
        Bravo ! +1
      </div>

    </div>
  );
}
