"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

/**
 * LevelBar — barre de progression "RPG" animee a l'entree du viewport.
 *
 * Utilisee pour les stats des "personnages IA" sur la page formations :
 *  - Label a gauche
 *  - Track gris faible en background
 *  - Fill orange Hermes anime de 0 % a `value`
 *  - Valeur chiffree affichee a droite
 *
 * `tone` = "light" sur fond clair, "dark" sur fond noir.
 */
export function LevelBar({
  label,
  value,
  tone = "light",
  delay = 0,
}: {
  label: string;
  value: number;
  tone?: "light" | "dark";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const labelColor = tone === "dark" ? "text-[#f5f0e6]/85" : "text-[var(--fg-2)]/80";
  const valueColor = tone === "dark" ? "text-[#f5f0e6]" : "text-[var(--fg)]";
  const trackColor = tone === "dark" ? "bg-[#f5f0e6]/15" : "bg-[var(--fg)]/12";

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${labelColor}`}>
          {label}
        </span>
        <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${valueColor}`}>
          {value}
        </span>
      </div>
      <div className={`relative mt-2 h-[3px] w-full overflow-hidden ${trackColor}`}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-[var(--accent)]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
