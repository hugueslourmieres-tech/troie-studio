"use client";

import { useEffect, useRef, useState } from "react";

/**
 * « Comment ça se passe » (26/10/2026) : à l'entrée dans l'écran, une ligne
 * de progression avance de l'étape 1 à l'étape 3, chaque étape s'allume à
 * son tour. Une fois, 1,5 s environ, ease-out. La petite courbe « suivi
 * chaque mois » a été retirée le 26/10 (jugée sans valeur par Hugues).
 *
 * Le HTML serveur montre l'état final. L'état de départ (data-anim="ready")
 * n'est posé qu'après le montage, et seulement si la section n'a pas encore
 * été vue : sans JS ou en mouvement réduit, tout reste affiché.
 */
type Step = { t: string; b: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [anim, setAnim] = useState<"ready" | "run" | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Déjà passée (retour arrière, ancre plus bas) : on ne rejoue rien.
    if (el.getBoundingClientRect().bottom < 0) return;
    setAnim("ready");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // Deux images : l'état « ready » est peint avant que la transition parte.
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim("run")));
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
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

        </li>
      ))}
    </ol>
  );
}
