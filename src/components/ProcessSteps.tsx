"use client";

import { useEffect, useRef, useState } from "react";

/**
 * « Comment ça se passe » (26/10/2026) : à l'entrée dans l'écran, une ligne
 * de progression avance de l'étape 1 à l'étape 3, chaque étape s'allume à
 * son tour, puis une petite courbe monte sous « On lance » pendant que les
 * mois défilent (M1 à M6). Une fois, 2,5 s environ, ease-out.
 *
 * Courbe illustrative : aucun chiffre, aucune unité, aucun résultat client.
 *
 * Le HTML serveur montre l'état final. L'état de départ (data-anim="ready")
 * n'est posé qu'après le montage, et seulement si la section n'a pas encore
 * été vue : sans JS ou en mouvement réduit, tout reste affiché.
 */
type Step = { t: string; b: string };

const MONTHS = 6;
/** Moment où la courbe commence à se tracer (ms), aligné sur globals.css. */
const CURVE_AT = 1500;
const CURVE_MS = 900;

export function ProcessSteps({ steps, curveLabel }: { steps: Step[]; curveLabel: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [anim, setAnim] = useState<"ready" | "run" | undefined>(undefined);
  const [month, setMonth] = useState(MONTHS);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Déjà passée (retour arrière, ancre plus bas) : on ne rejoue rien.
    if (el.getBoundingClientRect().bottom < 0) return;
    setAnim("ready");
    setMonth(1);
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // Deux images : l'état « ready » est peint avant que la transition parte.
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim("run")));
        const start = performance.now();
        const tick = () => {
          const t = performance.now() - start - CURVE_AT;
          const n = Math.min(MONTHS, Math.max(1, 1 + Math.floor((t / CURVE_MS) * MONTHS)));
          setMonth(n);
          if (n < MONTHS) timer = window.setTimeout(tick, 60);
        };
        timer = window.setTimeout(tick, CURVE_AT);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <ol ref={ref} data-anim={anim} className="t-process mt-12 grid gap-8 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.t} className="t-process-step relative pt-6" style={{ ["--i" as string]: i }}>
          {/* Le filet : gris de fond, l'encre avance par-dessus. */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--rule)]" />
          <span aria-hidden="true" className="t-process-bar absolute inset-x-0 top-0 h-px origin-left bg-[var(--fg)]" />
          <span className="t-process-num relative inline-flex items-center gap-2 font-mono text-sm tabular-nums text-[var(--accent)]">
            <span aria-hidden="true" className="t-process-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {i + 1}
          </span>
          <h3 className="t-process-text mt-3 text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">{s.t}</h3>
          <p className="t-process-text mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{s.b}</p>

          {i === steps.length - 1 && (
            <div aria-hidden="true" className="t-process-curve grain mt-6 overflow-hidden rounded-xl bg-[var(--bg-2)] px-4 pt-4 pb-3">
              <svg viewBox="0 0 240 64" className="block h-16 w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="process-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" x2="240" y1="62" y2="62" stroke="var(--rule-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <path className="t-process-area" d="M2,58 C50,56 80,50 120,38 C160,26 200,14 236,6 L236,62 L2,62 Z" fill="url(#process-area)" />
                <path
                  className="t-process-line"
                  d="M2,58 C50,56 80,50 120,38 C160,26 200,14 236,6"
                  pathLength={1}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-2 flex items-center justify-between font-mono text-[11px] tabular-nums text-[var(--fg-2)]">
                <span>M1</span>
                <span className="text-[var(--fg-2)]">{curveLabel}</span>
                <span className="t-process-month text-[var(--accent)]">M{month}</span>
              </div>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
