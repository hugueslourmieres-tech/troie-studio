"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarCheck,
  ChartLineUp,
  ChatCircleText,
  Eye,
  Package,
  Target,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";

/**
 * Mot qui tourne dans le titre (21/10/2026) : « vos ventes. », « vos
 * commandes. »… Chaque mot a son pictogramme (Phosphor, trait fin) dans une
 * pastille bleutée. Les lettres apparaissent sur place, l'une après
 * l'autre, sans glisser (demande de Hugues). La largeur s'ajuste en douceur.
 * Pause quand l'onglet est caché, simple fondu si le mouvement est réduit.
 * Décoratif : la phrase complète est donnée aux lecteurs d'écran (sr-only).
 */
export const ICONS = {
  chart: ChartLineUp,
  package: Package,
  eye: Eye,
  target: Target,
  users: UsersThree,
  chat: ChatCircleText,
  calendar: CalendarCheck,
} satisfies Record<string, Icon>;

export type RotatingItem = { word: string; icon: keyof typeof ICONS };

const EASE = [0.23, 1, 0.32, 1] as const;

export function RotatingWord({ items, interval = 2600 }: { items: readonly RotatingItem[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (!id) id = setInterval(() => setI((n) => (n + 1) % items.length), interval);
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
  }, [items.length, interval]);

  const { word, icon } = items[i];
  const Glyph = ICONS[icon];

  return (
    <motion.span
      aria-hidden="true"
      layout={!reduce}
      transition={{ layout: { duration: 0.45, ease: EASE } }}
      className="inline-flex items-center whitespace-nowrap align-baseline"
    >
      {/* Pastille du pictogramme */}
      <span className="relative mr-[0.2em] inline-flex h-[0.82em] w-[0.82em] shrink-0 items-center justify-center rounded-[0.2em] bg-[var(--accent-soft)] text-[var(--accent)] translate-y-[0.04em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={icon}
            className="inline-flex"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Glyph weight="regular" className="h-[0.5em] w-[0.5em]" />
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Le mot : lettres qui apparaissent sur place */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={word} className="inline-flex" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
          {Array.from(word).map((ch, k) => (
            <motion.span
              key={k}
              className="inline-block"
              initial={{ opacity: 0, filter: reduce ? "none" : "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.08 + k * 0.035 }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
