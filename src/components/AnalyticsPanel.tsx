"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { LOIR_MONTHS, LOIR_ORDERS_PCT, LOIR_SALES_PCT, LOIR_VISITS_PCT } from "@/lib/results";

/**
 * Tableau de bord LOIR Paris (21/10/2026), dans l'esprit des rapports
 * Shopify : trois indicateurs en onglets, une courbe qui se trace, une
 * infobulle au survol. Données réelles, 12 mois glissants, septembre 2024
 * à septembre 2026 (src/lib/results.ts). UNIQUEMENT des évolutions en %,
 * jamais de montant ni de volume (décision de Hugues, 21/10/2026).
 */

type Metric = "sales" | "orders" | "visits";

const SERIES: Record<Metric, number[]> = {
  sales: LOIR_SALES_PCT,
  orders: LOIR_ORDERS_PCT,
  visits: LOIR_VISITS_PCT,
};

const COPY = {
  fr: {
    title: "LOIR Paris",
    subtitle: "Boutique de mode en ligne. Évolution depuis septembre 2024, sur 12 mois glissants.",
    period: "Sept. 2024 à sept. 2026",
    metrics: { sales: "Ventes nettes", orders: "Commandes", visits: "Visites" },
    vs: "en deux ans",
    source: "Données réelles, lues dans la boutique Shopify de LOIR Paris.",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  },
  en: {
    title: "LOIR Paris",
    subtitle: "Online fashion store. Change since September 2024, rolling 12 months.",
    period: "Sep 2024 to Sep 2026",
    metrics: { sales: "Net sales", orders: "Orders", visits: "Visits" },
    vs: "in two years",
    source: "Real data, read in the LOIR Paris Shopify store.",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
} as const;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function smoothPath(pts: [number, number][]) {
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

/** Graduation « ronde » au-dessus du maximum. */
function niceMax(v: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (const s of steps) if (s * pow >= v) return s * pow;
  return 10 * pow;
}

export function AnalyticsPanel({ locale }: { locale: string }) {
  const en = locale === "en";
  const c = COPY[en ? "en" : "fr"];
  const nf = useMemo(() => new Intl.NumberFormat(en ? "en-GB" : "fr-FR"), [en]);

  const [metric, setMetric] = useState<Metric>("sales");
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;

  /** « +132 % », signe toujours affiché, espace insécable en français. */
  const pct = (v: number) => {
    const n = Math.round(v);
    return `${n > 0 ? "+" : n < 0 ? "−" : ""}${nf.format(Math.abs(n))}${en ? "%" : "\u00a0%"}`;
  };
  const growth = (m: Metric) => SERIES[m][SERIES[m].length - 1];
  const monthLabel = (i: number) => {
    const [y, mo] = LOIR_MONTHS[i].split("-");
    return `${c.months[Number(mo) - 1]} ${y}`;
  };

  // Géométrie du graphique, en pixels réels du conteneur (texte net et
  // lisible sur téléphone comme sur ordinateur).
  const chartRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(1000);
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(Math.round(e.contentRect.width), 280)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 560 ? 220 : 290;
  const pad = { l: W < 560 ? 64 : 76, r: 12, t: 12, b: 30 };
  const data = SERIES[metric];
  const max = niceMax(Math.max(...data) * 1.05);
  const min = Math.min(0, ...data);
  const ticks = [0, max / 4, max / 2, (3 * max) / 4, max];
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const pts = data.map((v, i) => [x(i), y(v)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L${x(data.length - 1)},${y(min)} L${x(0)},${y(min)} Z`;
  const janIdx = LOIR_MONTHS.map((m, i) => (m.endsWith("-01") ? i : -1)).filter((i) => i >= 0);
  const active = hover ?? data.length - 1;

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * (W - pad.l - pad.r);
    const i = Math.round((px / (W - pad.l - pad.r)) * (data.length - 1));
    setHover(Math.min(Math.max(i, 0), data.length - 1));
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white shadow-[0_1px_2px_rgba(17,19,24,0.04),0_24px_60px_-32px_rgba(17,19,24,0.18)]"
    >
      {/* En-tête */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 pt-5 md:px-7 md:pt-6">
        <div>
          <p className="text-base font-medium text-[var(--fg)]">{c.title}</p>
          <p className="mt-0.5 text-sm text-[var(--fg-2)]">{c.subtitle}</p>
        </div>
        <p className="font-mono text-xs text-[var(--fg-2)]">{c.period}</p>
      </div>

      {/* Indicateurs en onglets */}
      <div role="tablist" className="mt-5 grid grid-cols-3 border-y border-[var(--rule)]">
        {(Object.keys(SERIES) as Metric[]).map((m) => {
          const selected = m === metric;
          return (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setMetric(m);
                setHover(null);
              }}
              className={`relative px-4 py-4 text-left transition-colors duration-200 md:px-7 md:py-5 ${
                selected ? "bg-white" : "bg-[var(--bg-2)]/60 hover:bg-[var(--bg-2)]"
              } ${m !== "visits" ? "border-r border-[var(--rule)]" : ""}`}
            >
              <span className="block text-xs text-[var(--fg-2)] md:text-sm">{c.metrics[m]}</span>
              <span className="mt-1 block font-mono text-lg font-medium tabular-nums text-[var(--accent)] md:text-3xl">
                {pct(growth(m))}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--fg-2)] md:text-sm">{c.vs}</span>
              {selected && (
                <motion.span
                  layoutId="analytics-tab"
                  className="absolute inset-x-0 top-0 h-0.5 bg-[var(--accent)]"
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Courbe */}
      <div ref={chartRef} className="relative mx-3 pt-4 pb-2 md:mx-5">
        {/* Infobulle */}
        <div
          className="pointer-events-none absolute top-3 z-10 rounded-lg border border-[var(--rule)] bg-white px-3 py-2 shadow-[0_8px_24px_-12px_rgba(17,19,24,0.3)] transition-[left,opacity] duration-150"
          style={{
            left: `${(x(active) / W) * 100}%`,
            // Bulle centrée sur le point, alignée à droite près du bord.
            transform: `translateX(${x(active) / W > 0.85 ? "-100%" : x(active) / W < 0.15 ? "0%" : "-50%"})`,
            opacity: show ? 1 : 0,
          }}
          aria-hidden="true"
        >
          <p className="whitespace-nowrap font-mono text-[11px] text-[var(--fg-2)]">{monthLabel(active)}</p>
          <p className="whitespace-nowrap font-mono text-sm font-medium tabular-nums text-[var(--fg)]">
            {pct(data[active])}
          </p>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-14 h-auto w-full"
          role="img"
          aria-label={`${c.title}, ${c.metrics[metric]} : ${pct(data[data.length - 1])} entre ${monthLabel(0)} et ${monthLabel(data.length - 1)}.`}
        >
          <defs>
            <linearGradient id="analytics-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--rule)" strokeWidth="1" />
              <text
                x={pad.l - 10}
                y={y(t) + 4}
                textAnchor="end"
                fill="var(--fg-2)"
                fontSize="11"
                fontFamily="var(--font-mono)"
              >
                {pct(t)}
              </text>
            </g>
          ))}
          {janIdx.map((i) => (
            <text
              key={i}
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              fill="var(--fg-2)"
              fontSize="11"
              fontFamily="var(--font-mono)"
            >
              {LOIR_MONTHS[i].slice(0, 4)}
            </text>
          ))}

          <motion.path
            key={`a-${metric}`}
            d={area}
            fill="url(#analytics-area)"
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.6 }}
          />
          <motion.path
            key={`l-${metric}`}
            d={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={show ? { pathLength: 1 } : {}}
            transition={{ duration: reduce ? 0 : 1.6, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Repère du point actif */}
          {show && (
            <g>
              <line
                x1={x(active)}
                x2={x(active)}
                y1={pad.t}
                y2={H - pad.b}
                stroke="var(--fg)"
                strokeOpacity="0.18"
                strokeDasharray="3 4"
              />
              <circle cx={x(active)} cy={y(data[active])} r="9" fill="var(--accent)" fillOpacity="0.14" />
              <circle cx={x(active)} cy={y(data[active])} r="4.5" fill="white" stroke="var(--accent)" strokeWidth="2.5" />
            </g>
          )}

          {/* Zone de survol */}
          <rect
            x={pad.l}
            y={pad.t}
            width={W - pad.l - pad.r}
            height={H - pad.t - pad.b}
            fill="transparent"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
            style={{ cursor: "crosshair", touchAction: "pan-y" }}
          />
        </svg>
      </div>

      <p className="border-t border-[var(--rule)] px-5 py-3 text-xs text-[var(--fg-2)] md:px-7">{c.source}</p>
    </div>
  );
}
