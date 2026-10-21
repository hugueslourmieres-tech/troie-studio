"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Mot qui tourne dans le titre (21/10/2026) : « vos ventes. », « vos
 * commandes. »… Les lettres montent une à une en sortant d'un léger flou,
 * la largeur du mot s'ajuste en douceur pour que la ligne ne saute pas, et
 * un trait multicolore se dessine dessous à chaque changement. Pause quand
 * l'onglet est caché. Mouvement réduit : simple fondu. Décoratif : la phrase
 * complète est donnée aux lecteurs d'écran dans HomeHero (sr-only).
 */
const EASE = [0.23, 1, 0.32, 1] as const;

export function RotatingWord({ words, interval = 2600 }: { words: readonly string[]; interval?: number }) {
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

  const word = words[i];

  return (
    <motion.span
      aria-hidden="true"
      layout={!reduce}
      transition={{ layout: { duration: 0.5, ease: EASE } }}
      className="relative inline-flex whitespace-nowrap pb-[0.08em] align-baseline"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={word} className="inline-flex" exit={{ opacity: 0, transition: { duration: 0.18 } }}>
          {Array.from(word).map((ch, k) => (
            <motion.span
              key={k}
              className="inline-block"
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(0.35em)", filter: "blur(8px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0em)", filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.12 + k * 0.03 }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      {/* Trait multicolore qui se dessine sous le mot à chaque changement */}
      <motion.span
        key={`line-${word}`}
        aria-hidden="true"
        className="halo-line absolute right-0 bottom-0 left-0 h-[0.06em] origin-left rounded-full"
        initial={{ transform: "scaleX(0)", opacity: 1 }}
        animate={{ transform: "scaleX(1)", opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : 0.2 }}
      />
    </motion.span>
  );
}
