"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/** Courbe de sortie douce, commune à toutes les animations de résultats. */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_DRAW = [0.65, 0, 0.35, 1] as const;

/**
 * Compteur : affiche la valeur finale au rendu serveur (lisible sans
 * JavaScript et par les moteurs), puis compte depuis `from` quand il entre
 * à l'écran. Pas d'animation si l'utilisateur réduit les mouvements.
 */
export function CountUp({
  from = 0,
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  delay = 0,
  locale = "fr",
  className,
}: {
  from?: number;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    setValue(from);
    const tick = (now: number) => {
      if (start === null) start = now + delay * 1000;
      const t = Math.min(Math.max((now - start) / (duration * 1000), 0), 1);
      setValue(from + (to - from) * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, from, to, duration, delay]);

  const fmt = (n: number) =>
    n.toLocaleString(locale === "en" ? "en-GB" : "fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {prefix}
      {fmt(value)}
      {suffix}
    </span>
  );
}

/** Courbe lissée (Catmull-Rom vers Bézier) à travers des points. */
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

/**
 * Courbe de croissance qui se trace à l'écran : ligne, aire en dégradé,
 * repère de départ et point final pulsé. Les couleurs viennent des
 * variables CSS du conteneur (`currentColor` pour le texte, `stroke` pour
 * la ligne).
 */
export function GrowthChart({
  data,
  markerIndex,
  markerLabel,
  xTicks,
  yTicks,
  yPrefix = "",
  ySuffix = "",
  ariaLabel,
  stroke = "var(--accent)",
  className,
}: {
  data: number[];
  /** Point de départ mis en avant (ligne pointillée verticale). */
  markerIndex?: number;
  markerLabel?: string;
  /** Repères de l'axe horizontal : index du point et libellé. */
  xTicks: { index: number; label: string }[];
  /** Graduations horizontales (valeurs). */
  yTicks: number[];
  /** Texte autour des graduations (pas de fonction : composant client). */
  yPrefix?: string;
  ySuffix?: string;
  ariaLabel: string;
  stroke?: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");
  const show = inView || !!reduce;

  const W = 640;
  const H = 300;
  const pad = { l: 8, r: 18, t: 22, b: 30 };
  const max = Math.max(...yTicks, ...data) * 1.04;
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const pts = data.map((v, i) => [x(i), y(v)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L${x(data.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`;
  const last = pts[pts.length - 1];
  const draw = reduce ? 0 : 2.4;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`area-${gid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.34" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Graduations */}
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={pad.l}
            x2={W - pad.r}
            y1={y(t)}
            y2={y(t)}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={pad.l}
            y={y(t) - 7}
            fill="currentColor"
            fillOpacity="0.5"
            className="text-[24px] sm:text-[15px]"
            fontFamily="var(--font-mono)"
          >
            {`${yPrefix}${t}${ySuffix}`}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text
          key={t.label}
          x={x(t.index)}
          y={H - 6}
          fill="currentColor"
          fillOpacity="0.5"
          className="text-[24px] sm:text-[15px]"
          fontFamily="var(--font-mono)"
          textAnchor="middle"
        >
          {t.label}
        </text>
      ))}

      {/* Repère de départ */}
      {markerIndex !== undefined && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.2 }}
        >
          <line
            x1={pts[markerIndex][0]}
            x2={pts[markerIndex][0]}
            y1={pts[markerIndex][1]}
            y2={H - pad.b}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={pts[markerIndex][0]} cy={pts[markerIndex][1]} r="4" fill="currentColor" />
          {markerLabel && (
            <text
              x={pts[markerIndex][0] + 8}
              y={pts[markerIndex][1] - 10}
              fill="currentColor"
              fillOpacity="0.75"
              className="text-[24px] sm:text-[15px]"
              fontFamily="var(--font-mono)"
            >
              {markerLabel}
            </text>
          )}
        </motion.g>
      )}

      {/* Aire puis ligne */}
      <motion.path
        d={area}
        fill={`url(#area-${gid})`}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: reduce ? 0 : 1.1, ease: EASE_OUT }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: draw, ease: EASE_DRAW }}
      />

      {/* Point final */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: draw, ease: EASE_OUT }}
        style={{ transformOrigin: `${last[0]}px ${last[1]}px` }}
      >
        {!reduce && (
          <circle cx={last[0]} cy={last[1]} r="6" fill={stroke} className="results-pulse" />
        )}
        <circle cx={last[0]} cy={last[1]} r="6" fill={stroke} />
        <circle cx={last[0]} cy={last[1]} r="2.5" fill="var(--bg)" />
      </motion.g>
    </svg>
  );
}

/**
 * Barres verticales qui montent l'une après l'autre (commandes par année,
 * unités vendues...). La valeur s'affiche au-dessus de chaque barre.
 */
export function GrowBars({
  bars,
  ariaLabel,
  locale = "fr",
  className,
}: {
  /** `display` remplace la valeur affichée au-dessus de la barre. */
  bars: { label: string; value: number; display?: string }[];
  ariaLabel: string;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;
  const max = Math.max(...bars.map((b) => b.value));

  return (
    <div ref={ref} role="img" aria-label={ariaLabel} className={className}>
      <div className="flex h-full items-end gap-3">
        {bars.map((b, i) => {
          const h = Math.max((b.value / max) * 100, 4);
          const isLast = i === bars.length - 1;
          return (
            <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end">
              <span className="mb-2 font-mono text-xs tabular-nums text-[var(--fg-2)]">
                {b.display ?? b.value.toLocaleString(locale === "en" ? "en-GB" : "fr-FR")}
              </span>
              <motion.div
                className={`w-full origin-bottom rounded-t-md ${isLast ? "bg-[var(--accent)]" : "bg-[var(--fg)]/12"}`}
                style={{ height: `${h}%` }}
                initial={{ scaleY: reduce ? 1 : 0 }}
                animate={show ? { scaleY: 1 } : {}}
                transition={{ duration: 0.9, delay: reduce ? 0 : 0.15 * i, ease: EASE_OUT }}
              />
              <span className="mt-2 font-mono text-xs text-[var(--fg-2)]">{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Comparaison de deux montants en barres horizontales (investi contre
 * rapporté). La seconde barre part de la première.
 */
export function CompareBars({
  rows,
  ariaLabel,
  className,
}: {
  rows: { label: string; value: number; display: string; strong?: boolean }[];
  ariaLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;
  const max = Math.max(...rows.map((r) => r.value));

  return (
    <div ref={ref} role="img" aria-label={ariaLabel} className={`space-y-5 ${className ?? ""}`}>
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-[var(--fg-2)]">{r.label}</span>
            <span className="font-mono text-sm tabular-nums text-[var(--fg)]">{r.display}</span>
          </div>
          <div className="mt-2 h-2.5 w-full">
            <motion.div
              className={`h-full origin-left rounded-full ${r.strong ? "bg-[var(--accent)]" : "bg-[var(--fg)]/25"}`}
              style={{ width: `${Math.max((r.value / max) * 100, 1.2)}%` }}
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={show ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: reduce ? 0 : 0.3 + i * 0.35, ease: EASE_OUT }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
