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
 * Fin de titre qui tourne (21/10/2026) : « vos ventes. », « vos
 * commandes. »… Toute la fin se régénère, « vos » compris, lettre par
 * lettre et sur place, sans glisser (demandes de Hugues). Le pictogramme
 * du mot (Phosphor, trait fin) suit, à droite, dans une pastille bleutée.
 * La largeur s'ajuste en douceur.
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

export function RotatingWord({
  prefix,
  items,
  interval = 2600,
  index,
  art,
}: {
  prefix?: string;
  items: readonly RotatingItem[];
  interval?: number;
  /** Index piloté de l'extérieur (le diaporama du héros) : plus de minuterie. */
  index?: number;
  /** Fond granuleux derrière la fin du titre, à la couleur de la carte active. */
  art?: "meadow" | "sky" | "dusk";
}) {
  const [own, setI] = useState(0);
  const i = index ?? own;
  const reduce = useReducedMotion();

  useEffect(() => {
    if (index !== undefined) return;
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
  }, [items.length, interval, index]);

  const { word, icon } = items[i];
  const text = prefix ? `${prefix}\u00a0${word}` : word;
  const Glyph = ICONS[icon];

  return (
    <motion.span
      aria-hidden="true"
      layout={!reduce}
      transition={{ layout: { duration: 0.45, ease: EASE } }}
      className={`relative inline-flex items-center whitespace-nowrap align-baseline `}
    >
      {art && (
        /* Soulignement à la couleur de la carte active (23/10/2026 : la
           capsule derrière le mot faisait trop, sur téléphone surtout). */
        <span aria-hidden="true" className="absolute! left-0 right-[1.04em] -bottom-[0.02em] h-[0.08em] overflow-hidden rounded-full">
          {(["meadow", "sky", "dusk"] as const).map((a) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={a} src={`/images/art/${a}.jpg`} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${a === art ? "opacity-100" : "opacity-0"}`} />
          ))}
        </span>
      )}
      {/* La fin du titre : lettres qui apparaissent sur place */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={text} className="inline-flex" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
          {Array.from(text).map((ch, k) => (
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
      {/* Pastille du pictogramme */}
      <span className={`relative ml-[0.22em] inline-flex h-[0.82em] w-[0.82em] shrink-0 items-center justify-center rounded-[0.2em] translate-y-[0.04em] bg-[var(--accent-soft)] text-[var(--accent)]`}>
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

    </motion.span>
  );
}
