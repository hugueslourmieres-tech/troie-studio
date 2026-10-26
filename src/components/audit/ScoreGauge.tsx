"use client";

import { useEffect, useId } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import type { Band } from "@/lib/audit/types";

/**
 * Le cadran du score (audit SEO et GEO, 26/10/2026).
 *
 * Arc de 270° à extrémités arrondies, sur une piste discrète. Le tracé
 * reçoit un dégradé de la famille du bleu cobalt, plus clair au départ,
 * et la texture granuleuse de /images/art/sky-b.jpg en surimpression : la
 * même matière que les bandes de couleur du site. Plus le score est bas,
 * la couleur suit le code vert, jaune, orange, rouge (BAND_TONES).
 *
 * Deux cadrans côte à côte (SEO puis GEO) : le second part avec un léger
 * décalage (prop delay). Un seul moment animé : l'arc balaie jusqu'à la note avec une sortie
 * exponentielle forte, le chiffre compte en même temps (même valeur
 * animée, donc toujours synchrones), un point de lumière suit la pointe.
 * Interruptible : une nouvelle cible repart de la valeur courante.
 * Animations réduites : état final immédiat.
 */

export const BAND_TONES: Record<Band, { from: string; to: string; text: string }> = {
  // 26/10/2026, demande de Hugues : un vrai code couleur, lisible et
  // marquant quand on partage son score. Vert à 85 et plus, jaune de 70
  // à 84, orange de 50 à 69, rouge sous 50. Teintes travaillées, pas criardes.
  excellent: { from: "#6fd69a", to: "#1f9d5a", text: "#178a4c" },
  bon: { from: "#f6d872", to: "#e2a614", text: "#b78207" },
  renforcer: { from: "#f8b878", to: "#e5702a", text: "#c25a17" },
  fragile: { from: "#f4948b", to: "#d6363b", text: "#c22f33" },
};

const SIZE = 240;
const C = SIZE / 2;
const R = 96;
const START = 135; // degrés, sens horaire depuis l'axe x
const SWEEP = 270;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function point(deg: number, r = R) {
  const a = (deg * Math.PI) / 180;
  // Arrondi : le serveur et le navigateur n'écrivent pas les flottants à
  // l'identique, ce qui casse l'hydratation des attributs SVG.
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return { x: round(C + r * Math.cos(a)), y: round(C + r * Math.sin(a)) };
}

const s = point(START);
const e = point(START + SWEEP);
const ARC = `M ${s.x} ${s.y} A ${R} ${R} 0 1 1 ${e.x} ${e.y}`;

export type GaugeState = "idle" | "scanning" | "done";

export function ScoreGauge({
  state,
  score,
  band,
  label,
  gradeLabel,
  idleLabel,
  scanningLabel,
  delay = 0.15,
}: {
  state: GaugeState;
  score: number;
  band: Band;
  /** Petit libellé au-dessus du chiffre. Vide : rien. */
  label?: string;
  gradeLabel: string;
  idleLabel: string;
  scanningLabel: string;
  /** Départ du balayage, en secondes (décalage entre deux cadrans). */
  delay?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const dash = useTransform(value, (v) => 100 - v);
  const arcOpacity = useTransform(value, (v) => (v < 0.6 ? 0 : 1));
  const shown = useTransform(value, (v) => Math.round(v));
  const tipX = useTransform(value, (v) => point(START + (SWEEP * v) / 100).x);
  const tipY = useTransform(value, (v) => point(START + (SWEEP * v) / 100).y);
  const tone = BAND_TONES[band];

  useEffect(() => {
    const target = state === "done" ? score : 0;
    if (reduce) {
      value.set(target);
      return;
    }
    const controls = animate(value, target, {
      duration: state === "done" ? 1.9 : 0.35,
      ease: state === "done" ? EASE_OUT_EXPO : [0.23, 1, 0.32, 1],
      delay: state === "done" ? delay : 0,
    });
    return () => controls.stop();
  }, [state, score, reduce, value, delay]);

  const ticks = Array.from({ length: 41 }, (_, i) => {
    const deg = START + (SWEEP * i) / 40;
    const major = i % 10 === 0;
    const a = point(deg, R + 15);
    const b = point(deg, R + (major ? 21 : 18));
    return { a, b, major, i };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px] select-none">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`g-${uid}`} gradientUnits="userSpaceOnUse" x1="24" y1="200" x2="216" y2="200">
            <stop offset="0" stopColor={tone.from} />
            <stop offset="1" stopColor={tone.to} />
          </linearGradient>
          <pattern id={`t-${uid}`} patternUnits="userSpaceOnUse" width={SIZE} height={SIZE}>
            <image href="/images/art/sky-b.jpg" width={SIZE * 1.333} height={SIZE} x={-40} preserveAspectRatio="xMidYMid slice" />
          </pattern>
          <radialGradient id={`h-${uid}`}>
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Graduations : un repère tous les 2,5 points, appuyé tous les 25. */}
        <g>
          {ticks.map((t) => (
            <line
              key={t.i}
              x1={t.a.x}
              y1={t.a.y}
              x2={t.b.x}
              y2={t.b.y}
              stroke="var(--fg)"
              strokeOpacity={t.major ? 0.28 : 0.1}
              strokeWidth={t.major ? 1.25 : 1}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Piste */}
        <path d={ARC} fill="none" stroke="var(--fg)" strokeOpacity="0.07" strokeWidth="16" strokeLinecap="round" />

        {/* Recherche en cours : une comète qui tourne sur la piste. */}
        {state === "scanning" && !reduce && (
          <path
            d={ARC}
            pathLength={100}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.55"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="10 90"
            className="audit-comet"
          />
        )}

        {/* L'arc du score, puis sa texture granuleuse en surimpression. */}
        <motion.g style={{ opacity: arcOpacity }}>
          <motion.path
            d={ARC}
            pathLength={100}
            fill="none"
            stroke={`url(#g-${uid})`}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="100 100"
            style={{ strokeDashoffset: dash }}
          />
          <motion.path
            d={ARC}
            pathLength={100}
            fill="none"
            stroke={`url(#t-${uid})`}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="100 100"
            style={{ strokeDashoffset: dash, mixBlendMode: "soft-light", opacity: 0.7 }}
          />
          <motion.circle cx={tipX} cy={tipY} r="9" fill={`url(#h-${uid})`} opacity="0.55" />
          <motion.circle cx={tipX} cy={tipY} r="2.6" fill="#fff" />
        </motion.g>

        <text x={point(START, R + 2).x - 2} y={point(START).y + 28} className="fill-[var(--fg-2)] font-mono text-[9px]" textAnchor="middle">
          0
        </text>
        <text x={point(START + SWEEP, R + 2).x + 2} y={point(START + SWEEP).y + 28} className="fill-[var(--fg-2)] font-mono text-[9px]" textAnchor="middle">
          100
        </text>
      </svg>

      {/* Le chiffre, au centre : grand, serré, à chasse fixe. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
        {label ? <span className="text-[13px] font-medium text-[var(--fg-2)]">{label}</span> : null}
        <span
          className="mt-1 text-[68px] leading-[0.95] font-medium tracking-[-0.045em] tabular-nums transition-colors duration-500 sm:text-[72px]"
          style={{ color: state === "done" ? tone.text : "color-mix(in oklab, var(--fg) 14%, transparent)" }}
        >
          <motion.span>{shown}</motion.span>
        </span>
        <span className="mt-1 text-[13px] text-[var(--fg-2)] tabular-nums">/ 100</span>
      </div>

      {/* Le mot du verdict, logé dans l'ouverture du cadran. */}
      <div className="absolute inset-x-0 bottom-[5%] flex h-7 items-center justify-center">
        {state === "done" ? (
          <motion.span
            key={`${band}-${score}`}
            initial={reduce ? false : { opacity: 0, filter: "blur(6px)", transform: "translateY(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
            transition={{ duration: 0.5, delay: reduce ? 0 : delay + 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-[17px] font-medium tracking-[-0.01em]"
            style={{ color: tone.text }}
          >
            {gradeLabel}
          </motion.span>
        ) : (
          <span className="text-[13px] text-[var(--fg-2)]">{state === "scanning" ? scanningLabel : idleLabel}</span>
        )}
      </div>
    </div>
  );
}
