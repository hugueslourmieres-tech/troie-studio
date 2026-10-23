"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { LOIR_SALES_PCT, RUTHERFORD_TIKTOK_PCT } from "@/lib/results";

/**
 * Les trois résultats du premier écran (21/10/2026, structure « les
 * résultats en trois cartes » choisie par Hugues). Chaque carte porte son
 * chiffre et sa courbe réelle, tracée à l'arrivée, l'une après l'autre.
 * Un clic ouvre le tableau de bord sur ce client (événement troie:client)
 * ou descend vers les films pour Autajon.
 */

type Card = {
  id: string;
  client: string;
  sector: string;
  value: string;
  label: string;
  target: string;
  /** Points de la courbe [x, y], de 0 à 1, x placé à la vraie date. */
  curve?: [number, number][];
  /** Comparaison en deux barres (budget, ventes). */
  bars?: [number, number];
  more: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Ramène une série à [0, 1] sur les deux axes. */
function norm(points: { x: number; v: number }[]): [number, number][] {
  const xs = points.map((p) => p.x);
  const vs = points.map((p) => p.v);
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  const [v0, v1] = [Math.min(...vs), Math.max(...vs)];
  return points.map((p) => [(p.x - x0) / (x1 - x0 || 1), (p.v - v0) / (v1 - v0 || 1)]);
}

const time = (d: string) => new Date(`${d}T00:00:00Z`).getTime();

function linePath(points: [number, number][], w: number, h: number) {
  return points
    .map(([px, py], i) => `${i ? "L" : "M"}${(px * w).toFixed(1)},${(h - 6 - py * (h - 12)).toFixed(1)}`)
    .join(" ");
}

/**
 * Un chiffre dessiné : le nombre en grand, l'unité (%) plus petite et
 * levée, le signe × et + plus légers. Lecture d'un coup d'œil.
 */
function Figure({ value }: { value: string }) {
  const m = value.match(/^([+×]?)([\d\s\u00a0.,]+?)\s*(%?)$/u);
  if (!m) return <>{value}</>;
  const [, sign, num, unit] = m;
  return (
    <>
      {sign && <span className="mr-[0.04em] font-normal opacity-70">{sign}</span>}
      {num.trim()}
      {unit && <span className="ml-[0.06em] align-[0.62em] text-[0.42em] font-medium tracking-normal">{unit}</span>}
    </>
  );
}

export function ResultCards({ locale }: { locale: string }) {
  const en = locale === "en";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;

  const cards: Card[] = [
    {
      id: "loir",
      client: "LOIR Paris",
      sector: "E-commerce",
      value: en ? "+164%" : "+164 %",
      label: en ? "online sales in two years" : "de ventes en ligne en deux ans",
      target: "#chiffres",
      curve: norm(LOIR_SALES_PCT.map((v, i) => ({ x: i, v }))),
      more: en ? "Explore the curve" : "Voir la courbe",
    },
    {
      id: "rutherford",
      client: "Rutherford",
      sector: en ? "Industrial SME, B2B" : "PME industrielle, B2B",
      value: en ? "+193%" : "+193 %",
      label: en ? "TikTok followers since March 2025" : "d'abonnés TikTok depuis mars 2025",
      target: "#chiffres",
      curve: norm(RUTHERFORD_TIKTOK_PCT.map((p) => ({ x: time(p.d), v: p.v }))),
      more: en ? "Explore the curve" : "Voir la courbe",
    },
    {
      id: "autajon",
      client: "Autajon",
      sector: en ? "Large group, packaging" : "Grand groupe, emballage",
      value: "×35",
      label: en ? "a customer film's budget, in sales" : "le budget d'un film client, en ventes",
      target: `/${locale}/medias#exemple`,
      bars: [1, 35],
      more: en ? "See the films" : "Voir les films",
    },
  ];

  const open = (c: Card) => {
    if (c.target === "#chiffres") {
      window.dispatchEvent(new CustomEvent("troie:client", { detail: c.id }));
    }
  };

  const W = 400;
  const H = 96;

  return (
    <div ref={ref} className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
      {cards.map((c, i) => (
        <motion.a
          key={c.id}
          href={c.target}
          onClick={() => open(c)}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.1 * i, ease }}
          className="group relative flex w-[82%] shrink-0 snap-start flex-col rounded-2xl md:w-auto border border-[var(--rule)] bg-white transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(17,19,24,0.3)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <div className="px-6 pt-6 md:px-7 md:pt-7">
            <p className="text-lg font-medium tracking-[-0.01em] text-[var(--fg)]">{c.client}</p>
            <p className="mt-0.5 text-sm text-[var(--fg-2)]">{c.sector}</p>
            <p className="mt-8 text-[3.25rem] font-medium leading-none tracking-[-0.045em] text-[var(--accent)] tabular-nums md:text-[3.75rem]">
              <Figure value={c.value} />
            </p>
            <p className="mt-2 text-[15px] text-[var(--fg-2)]">{c.label}</p>
          </div>

          {/* Courbe ou barres, bord à bord en bas de la carte */}
          <div className="mt-6 h-[96px] overflow-hidden rounded-b-2xl" aria-hidden="true">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={c.bars ? "xMidYMid meet" : "none"} className="h-full w-full">
              {c.curve && (
                <>
                  <motion.path
                    d={`${linePath(c.curve, W, H)} L${W},${H} L0,${H} Z`}
                    fill="var(--accent)"
                    initial={{ opacity: 0 }}
                    animate={show ? { opacity: 0.08 } : {}}
                    transition={{ duration: 0.8, delay: reduce ? 0 : 0.5 + 0.35 * i }}
                  />
                  <motion.path
                    d={linePath(c.curve, W, H)}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={show ? { pathLength: 1 } : {}}
                    transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.3 + 0.35 * i, ease: [0.65, 0, 0.35, 1] }}
                  />
                </>
              )}
              {c.bars &&
                Array.from({ length: c.bars[1] + 1 }, (_, k) => {
                  const cols = 12;
                  const size = 14;
                  const gap = (W - 48 - cols * size) / (cols - 1);
                  const col = k % cols;
                  const row = Math.floor(k / cols);
                  return (
                    <motion.rect
                      key={k}
                      x={24 + col * (size + gap)}
                      y={H - 10 - (row + 1) * (size + 8) + 8}
                      width={size}
                      height={size}
                      rx={3}
                      fill={k === 0 ? "var(--fg)" : "var(--accent)"}
                      fillOpacity={k === 0 ? 0.2 : 0.9}
                      initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
                      animate={show ? { opacity: 1, scale: 1 } : {}}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      transition={{ duration: 0.35, delay: reduce ? 0 : 0.5 + 0.35 * i + k * 0.025, ease }}
                    />
                  );
                })}
            </svg>
          </div>

          <span className="absolute top-6 right-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--fg)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:top-7 md:right-7">
            {c.more}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
