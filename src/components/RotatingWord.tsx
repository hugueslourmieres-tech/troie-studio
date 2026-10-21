"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Mot qui tourne à la fin du titre (21/10/2026, demande de Hugues) :
 * « Nous faisons grandir vos ventes / commandes / visites… ». Le mot entre
 * par le bas en sortant d'un léger flou et sort par le haut. Pause quand
 * l'onglet est caché. Mouvement réduit : simple fondu, sans déplacement.
 * La phrase complète reste lisible par les lecteurs d'écran (sr-only dans
 * HomeHero), ce composant est décoratif.
 */
const EASE = [0.23, 1, 0.32, 1] as const;

export function RotatingWord({ words, interval = 2400 }: { words: readonly string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (!id) id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    };
    const stop = () => {
      if (id) clearInterval(id);
      id = null;
    };
    const onVis = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [words.length, interval]);

  return (
    <span aria-hidden="true" className="relative inline-flex overflow-hidden pb-[0.12em] align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="inline-block text-[var(--warm)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(0.55em)", filter: "blur(6px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0em)", filter: "blur(0px)" }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.15 } }
              : { opacity: 0, transform: "translateY(-0.4em)", filter: "blur(6px)", transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }
          }
          transition={{ duration: reduce ? 0.2 : 0.42, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
