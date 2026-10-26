"use client";

import { useEffect, useId, useRef, useState } from "react";
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
 *
 * Variante d'accueil (props facultatives, défaut inchangé pour l'audit réel) :
 *   - tone="brand" : arc dans le bleu d'origine du site (#7193ee vers
 *     #2b55cc), sans code couleur de verdict.
 *   - idleMode="suspense" : à l'état idle, l'aiguille ne sait pas encore. Elle
 *     monte et redescend entre 20 et 95, une nouvelle cible toutes les 0,9 à
 *     1,4 s, poursuivie par un ressort (la vitesse se conserve d'une cible à
 *     l'autre : jamais d'à-coup). Rendu serveur déterministe (suspenseFrom),
 *     départ après le montage, pause hors écran et onglet caché. Animations
 *     réduites : arc immobile et « ? » à la place du chiffre.
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

const BRAND_TONE = { from: "#7193ee", to: "#2b55cc", text: "#2b55cc" };
const SUSPENSE_SPRING = { type: "spring", stiffness: 34, damping: 10.5, mass: 1 } as const;

export function ScoreGauge({
  state,
  score,
  band,
  label,
  gradeLabel,
  idleLabel,
  scanningLabel,
  delay = 0.15,
  tone: toneMode = "band",
  idleMode = "still",
  suspenseFrom = 58,
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
  /** "band" (défaut) : code couleur du verdict. "brand" : bleu du site. */
  tone?: "band" | "brand";
  /** "still" (défaut) : cadran vide à l'état idle. "suspense" : il cherche. */
  idleMode?: "still" | "suspense";
  /** Valeur de départ du mode suspense, identique serveur et navigateur. */
  suspenseFrom?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const suspense = idleMode === "suspense" && state === "idle";
  const rootRef = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false); // suspense + animations réduites
  const value = useMotionValue(suspense ? suspenseFrom : 0);
  const dash = useTransform(value, (v) => 100 - v);
  const arcOpacity = useTransform(value, (v) => (v < 0.6 ? 0 : 1));
  const shown = useTransform(value, (v) => Math.round(v));
  const tipX = useTransform(value, (v) => point(START + (SWEEP * v) / 100).x);
  const tipY = useTransform(value, (v) => point(START + (SWEEP * v) / 100).y);
  const tone = toneMode === "brand" ? BRAND_TONE : BAND_TONES[band];

  // Mode suspense : une cible au hasard, poursuivie par un ressort, puis la
  // suivante. Tout part après le montage (le rendu serveur reste fixe).
  useEffect(() => {
    if (!suspense) return;
    const el = rootRef.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controls: ReturnType<typeof animate> | undefined;
    let first = true;

    const halt = () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
      controls?.stop();
    };
    const step = () => {
      const cur = value.get();
      let next = 20 + Math.random() * 75;
      // Un vrai mouvement à chaque fois : au moins 18 points d'écart.
      if (Math.abs(next - cur) < 18) next = cur > 57 ? cur - 18 - Math.random() * 20 : cur + 18 + Math.random() * 20;
      next = Math.min(95, Math.max(20, next));
      controls = animate(value, next, SUSPENSE_SPRING);
      timer = setTimeout(step, 900 + Math.random() * 500);
    };
    const sync = () => {
      setStill(mq.matches);
      const run = onScreen && !document.hidden && !mq.matches;
      if (!run) {
        halt();
        if (mq.matches) value.set(suspenseFrom);
        return;
      }
      if (timer) return;
      // Premier départ décalé (delay) : deux cadrans voisins restent déphasés.
      timer = setTimeout(step, first ? delay * 1000 : 0);
      first = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    if (el) io.observe(el);
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", sync);
    sync();
    return () => {
      halt();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", sync);
    };
  }, [suspense, value, delay, suspenseFrom]);

  useEffect(() => {
    if (suspense) return;
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
  }, [state, score, reduce, value, delay, suspense]);

  const ticks = Array.from({ length: 41 }, (_, i) => {
    const deg = START + (SWEEP * i) / 40;
    const major = i % 10 === 0;
    const a = point(deg, R + 15);
    const b = point(deg, R + (major ? 21 : 18));
    return { a, b, major, i };
  });

  return (
    <div ref={rootRef} className="relative mx-auto aspect-square w-full max-w-[260px] select-none">
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

        <text data-gauge-scale="" x={point(START, R + 2).x - 2} y={point(START).y + 28} className="fill-[var(--fg-2)] font-mono text-[9px]" textAnchor="middle">
          0
        </text>
        <text data-gauge-scale="" x={point(START + SWEEP, R + 2).x + 2} y={point(START + SWEEP).y + 28} className="fill-[var(--fg-2)] font-mono text-[9px]" textAnchor="middle">
          100
        </text>
      </svg>

      {/* Le chiffre, au centre : grand, serré, à chasse fixe. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
        {label ? <span className="text-[13px] font-medium text-[var(--fg-2)]">{label}</span> : null}
        <span
          className="mt-1 text-[68px] leading-[0.95] font-medium tracking-[-0.045em] tabular-nums transition-colors duration-500 sm:text-[72px]"
          style={{
            color:
              state === "done" || suspense ? tone.text : "color-mix(in oklab, var(--fg) 14%, transparent)",
          }}
        >
          {suspense && still ? "?" : <motion.span>{shown}</motion.span>}
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
          <span data-gauge-idle="" className="text-[13px] text-[var(--fg-2)]">
            {state === "scanning" ? scanningLabel : idleLabel}
          </span>
        )}
      </div>
    </div>
  );
}
