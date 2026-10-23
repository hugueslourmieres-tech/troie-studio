"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  LOIR_MONTHS,
  LOIR_ORDERS_PCT,
  LOIR_SALES_PCT,
  LOIR_VISITS_PCT,
  RUTHERFORD_INSTAGRAM_PCT,
  RUTHERFORD_LINKEDIN_RATE_INDEX,
  RUTHERFORD_SOCIAL_PCT,
  RUTHERFORD_TIKTOK_PCT,
  RUTHERFORD_YOUTUBE_PCT,
} from "@/lib/results";

/**
 * Tableau de bord des clients (21/10/2026), dans l'esprit des rapports
 * Shopify : un client à choisir sur le côté, ses indicateurs en onglets,
 * une courbe datée qui se trace, une infobulle au survol. UNIQUEMENT des
 * évolutions en %, jamais de montant ni de volume (décision de Hugues).
 * Données et sources : src/lib/results.ts. Une série clairsemée (relevés
 * ponctuels) est tracée en segments droits avec un point par relevé, pour
 * ne pas inventer de courbe entre deux mesures.
 */

export type Point = { d: string; v: number };
export type LineData = { kind: "line"; points: Point[] };
export type BarsData = { kind: "bars"; bars: { label: string; v: number; display: string }[] };
export type Metric = {
  id: string;
  label: string;
  headline: number;
  sub: string;
  data: LineData | BarsData;
  /** « count » : valeurs brutes (nombre de leads), sinon évolution en %. */
  unit?: "pct" | "count";
};
export type Client = {
  id: string;
  name: string;
  sector: string;
  note: string;
  source: string;
  metrics: Metric[];
  /** Brouillon : chiffres d'exemple, jamais affichés en production. */
  draft?: boolean;
};

const MONTHS = {
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const UI = {
  fr: { clients: "Clients", base: "réf.", before: "Avant", after: "Après" },
  en: { clients: "Clients", base: "base", before: "Before", after: "After" },
};

function buildClients(en: boolean): Client[] {
  const u = UI[en ? "en" : "fr"];
  const pctTxt = (n: number) => `+${Math.round(n)}${en ? "%" : " %"}`;
  const monthly = (vals: number[]): LineData => ({
    kind: "line",
    points: vals.map((v, i) => ({ d: `${LOIR_MONTHS[i]}-15`, v })),
  });
  const beforeAfter = (
    idx: { before: number; after: number },
    labels: [string, string] = [u.before, u.after],
  ): BarsData => ({
    kind: "bars",
    bars: [
      { label: labels[0], v: idx.before, display: u.base },
      { label: labels[1], v: idx.after, display: pctTxt(idx.after - idx.before) },
    ],
  });
  const last = (p: Point[]) => p[p.length - 1].v;
  const twoYears = en ? "in two years" : "en deux ans";

  const all: Client[] = [
    {
      id: "loir",
      name: "LOIR Paris",
      sector: "E-commerce",
      note: en
        ? "Change since September 2024, rolling 12 months."
        : "Évolution depuis septembre 2024, sur 12 mois glissants.",
      source: en
        ? "Real data, read in the LOIR Paris Shopify store."
        : "Données réelles, lues dans la boutique Shopify de LOIR Paris.",
      metrics: [
        { id: "sales", label: en ? "Net sales" : "Ventes nettes", headline: last(monthly(LOIR_SALES_PCT).points), sub: twoYears, data: monthly(LOIR_SALES_PCT) },
        { id: "orders", label: en ? "Orders" : "Commandes", headline: last(monthly(LOIR_ORDERS_PCT).points), sub: twoYears, data: monthly(LOIR_ORDERS_PCT) },
        { id: "visits", label: en ? "Visits" : "Visites", headline: last(monthly(LOIR_VISITS_PCT).points), sub: twoYears, data: monthly(LOIR_VISITS_PCT) },
      ],
    },
    {
      id: "rutherford",
      name: "Rutherford",
      sector: en ? "Industrial SME, B2B" : "PME industrielle, B2B",
      note: en
        ? "Printing and packaging. Social media growth, network by network."
        : "Imprimerie et emballage. L'évolution des réseaux sociaux, réseau par réseau.",
      source: en
        ? "Dated readings from TikTok, LinkedIn, Meta and YouTube exports and public pages."
        : "Relevés datés des exports TikTok, LinkedIn, Meta et YouTube, et des pages publiques.",
      metrics: [
        { id: "social", label: en ? "All networks" : "Tous réseaux", headline: last(RUTHERFORD_SOCIAL_PCT), sub: en ? "followers since Feb. 2025" : "abonnés depuis févr. 2025", data: { kind: "line", points: RUTHERFORD_SOCIAL_PCT } },
        { id: "tiktok", label: "TikTok", headline: last(RUTHERFORD_TIKTOK_PCT), sub: en ? "followers since March 2025" : "abonnés depuis mars 2025", data: { kind: "line", points: RUTHERFORD_TIKTOK_PCT } },
        { id: "linkedin", label: "LinkedIn", headline: RUTHERFORD_LINKEDIN_RATE_INDEX.after - 100, sub: en ? "new followers per month" : "nouveaux abonnés par mois", data: beforeAfter(RUTHERFORD_LINKEDIN_RATE_INDEX, en ? ["Mar 2024 to Jan 2025", "Feb to Aug 2025"] : ["mars 2024 à janv. 2025", "févr. à août 2025"]) },
        { id: "instagram", label: "Instagram", headline: last(RUTHERFORD_INSTAGRAM_PCT), sub: en ? "followers since Feb. 2025" : "abonnés depuis févr. 2025", data: { kind: "line", points: RUTHERFORD_INSTAGRAM_PCT } },
        { id: "youtube", label: "YouTube", headline: last(RUTHERFORD_YOUTUBE_PCT), sub: en ? "subscribers since April 2022" : "abonnés depuis avril 2022", data: { kind: "line", points: RUTHERFORD_YOUTUBE_PCT } },
      ],
    },
  ];
  return all;
}

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

function straightPath(pts: [number, number][]) {
  return pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
}

/** Graduation « ronde » au-dessus du maximum. */
function niceMax(v: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (const s of steps) if (s * pow >= v) return s * pow;
  return 10 * pow;
}

const ts = (d: string) => new Date(`${d}T00:00:00Z`).getTime();

const NO_CLIENTS: Client[] = [];

export function AnalyticsPanel({
  locale,
  extraClients = NO_CLIENTS,
}: {
  locale: string;
  /** Clients en brouillon, fournis par le serveur hors production. */
  extraClients?: Client[];
}) {
  const en = locale === "en";
  const ui = UI[en ? "en" : "fr"];
  const clients = useMemo(() => [...buildClients(en), ...extraClients], [en, extraClients]);
  const nf = useMemo(() => new Intl.NumberFormat(en ? "en-GB" : "fr-FR"), [en]);

  const [clientId, setClientId] = useState(clients[0].id);
  const client = clients.find((c) => c.id === clientId) ?? clients[0];
  const [metricId, setMetricId] = useState(client.metrics[0].id);
  const metric = client.metrics.find((m) => m.id === metricId) ?? client.metrics[0];
  const [hover, setHover] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;

  /** « +132 % », signe toujours affiché, espace insécable en français. */
  const pct = (v: number) => {
    const n = Math.round(v);
    return `${n > 0 ? "+" : n < 0 ? "−" : ""}${nf.format(Math.abs(n))}${en ? "%" : " %"}`;
  };
  /** Valeur selon l'unité de l'indicateur : évolution en % ou nombre brut. */
  const val = (m: Metric, v: number) => (m.unit === "count" ? nf.format(Math.round(v)) : pct(v));
  const dateLabel = (d: string) => {
    const [y, mo] = d.split("-");
    return `${MONTHS[en ? "en" : "fr"][Number(mo) - 1]} ${y}`;
  };

  // Géométrie en pixels réels du conteneur (texte net sur téléphone).
  const chartRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(900);
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(Math.round(e.contentRect.width), 260)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 560 ? 220 : 280;
  const pad = { l: W < 560 ? 60 : 72, r: 14, t: 14, b: 30 };

  const pickClient = (id: string) => {
    const c = clients.find((x) => x.id === id) ?? clients[0];
    setClientId(c.id);
    setMetricId(c.metrics[0].id);
    setHover(null);
  };

  // Les cartes du premier écran ouvrent le tableau sur leur client.
  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (clients.some((c) => c.id === id)) pickClient(id);
    };
    window.addEventListener("troie:client", onPick);
    return () => window.removeEventListener("troie:client", onPick);
  });

  // ---- Courbe datée ----
  let lineView: React.ReactNode = null;
  let tooltip: { left: number; label: string; value: string } | null = null;
  let ariaLabel = `${client.name}, ${metric.label} : ${val(metric, metric.headline)}.`;

  if (metric.data.kind === "line") {
    const pts = metric.data.points;
    const sparse = pts.length < 12;
    const t0 = ts(pts[0].d);
    const t1 = ts(pts[pts.length - 1].d);
    const max = niceMax(Math.max(...pts.map((p) => p.v)) * 1.05);
    const min = Math.min(0, ...pts.map((p) => p.v));
    const ticks = [0, max / 4, max / 2, (3 * max) / 4, max];
    const x = (d: string) => pad.l + ((ts(d) - t0) / (t1 - t0)) * (W - pad.l - pad.r);
    const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
    const xy = pts.map((p) => [x(p.d), y(p.v)] as [number, number]);
    const line = sparse ? straightPath(xy) : smoothPath(xy);
    const area = `${line} L${xy[xy.length - 1][0]},${y(min)} L${xy[0][0]},${y(min)} Z`;
    const years: string[] = [];
    for (let yy = Number(pts[0].d.slice(0, 4)) + 1; yy <= Number(pts[pts.length - 1].d.slice(0, 4)); yy++) {
      years.push(`${yy}-01-01`);
    }
    const active = hover ?? pts.length - 1;

    tooltip = { left: x(pts[active].d) / W, label: dateLabel(pts[active].d), value: val(metric, pts[active].v) };
    ariaLabel = `${client.name}, ${metric.label} : ${val(metric, pts[pts.length - 1].v)}, ${dateLabel(pts[0].d)} à ${dateLabel(pts[pts.length - 1].d)}.`;

    const onMove = (e: React.PointerEvent<SVGRectElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const px = pad.l + ((e.clientX - r.left) / r.width) * (W - pad.l - pad.r);
      let best = 0;
      xy.forEach((p, i) => {
        if (Math.abs(p[0] - px) < Math.abs(xy[best][0] - px)) best = i;
      });
      setHover(best);
    };

    lineView = (
      <>
        <defs>
          <linearGradient id="analytics-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="var(--rule)" strokeWidth="1" />
            <text x={pad.l - 10} y={y(v) + 4} textAnchor="end" fill="var(--fg-2)" fontSize="11" fontFamily="var(--font-mono)">
              {val(metric, v)}
            </text>
          </g>
        ))}
        {years.map((d) => (
          <text key={d} x={x(d)} y={H - 8} textAnchor="middle" fill="var(--fg-2)" fontSize="11" fontFamily="var(--font-mono)">
            {d.slice(0, 4)}
          </text>
        ))}
        <motion.path
          key={`a-${client.id}-${metric.id}`}
          d={area}
          fill="url(#analytics-area)"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.6 }}
        />
        <motion.path
          key={`l-${client.id}-${metric.id}`}
          d={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.65, 0, 0.35, 1] }}
        />
        {sparse &&
          xy.map((p, i) => (
            <circle key={`${metric.id}-${i}`} cx={p[0]} cy={p[1]} r="3.5" fill="white" stroke="var(--accent)" strokeWidth="2" />
          ))}
        {show && (
          <g>
            <line x1={xy[active][0]} x2={xy[active][0]} y1={pad.t} y2={H - pad.b} stroke="var(--fg)" strokeOpacity="0.18" strokeDasharray="3 4" />
            <circle cx={xy[active][0]} cy={xy[active][1]} r="9" fill="var(--accent)" fillOpacity="0.14" />
            <circle cx={xy[active][0]} cy={xy[active][1]} r="4.5" fill="white" stroke="var(--accent)" strokeWidth="2.5" />
          </g>
        )}
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
      </>
    );
  }

  // ---- Avant / après ----
  let barsView: React.ReactNode = null;
  if (metric.data.kind === "bars") {
    const bars = metric.data.bars;
    const max = Math.max(...bars.map((b) => b.v));
    const slot = (W - pad.l - pad.r) / bars.length;
    const bw = Math.min(slot * 0.42, 140);
    const base = H - pad.b;
    barsView = (
      <>
        <line x1={pad.l} x2={W - pad.r} y1={base} y2={base} stroke="var(--rule)" strokeWidth="1" />
        {bars.map((b, i) => {
          const h = (b.v / max) * (H - pad.t - pad.b - 28);
          const cx = pad.l + slot * i + slot / 2;
          const isLast = i === bars.length - 1;
          return (
            <g key={`${client.id}-${metric.id}-${b.label}`}>
              <motion.rect
                x={cx - bw / 2}
                y={base - h}
                width={bw}
                height={h}
                rx="6"
                fill={isLast ? "var(--accent)" : "var(--fg)"}
                fillOpacity={isLast ? 1 : 0.12}
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                initial={{ scaleY: reduce ? 1 : 0 }}
                animate={show ? { scaleY: 1 } : {}}
                transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15 * i, ease: EASE_OUT }}
              />
              <text x={cx} y={base - h - 10} textAnchor="middle" fill={isLast ? "var(--accent)" : "var(--fg-2)"} fontSize="13" fontWeight="500" fontFamily="var(--font-mono)">
                {b.display}
              </text>
              <text x={cx} y={H - 8} textAnchor="middle" fill="var(--fg-2)" fontSize="11" fontFamily="var(--font-mono)">
                {b.label}
              </text>
            </g>
          );
        })}
      </>
    );
  }

  const tipShift = tooltip ? (tooltip.left > 0.85 ? "-100%" : tooltip.left < 0.15 ? "0%" : "-50%") : "-50%";

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white lg:grid lg:grid-cols-[220px_1fr]"
    >
      {/* Clients : colonne sur ordinateur, rangée sur téléphone */}
      <nav
        aria-label={ui.clients}
        className="flex gap-2 overflow-x-auto border-b border-[var(--rule)] bg-[var(--bg-2)]/50 p-3 lg:flex-col lg:gap-1 lg:border-r lg:border-b-0 lg:p-4"
      >
        <p className="hidden px-3 pt-1 pb-2 text-xs text-[var(--fg-2)] lg:block">{ui.clients}</p>
        {clients.map((c) => {
          const selected = c.id === client.id;
          return (
            <div key={c.id} className="shrink-0 lg:w-full">
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => pickClient(c.id)}
              className={`relative shrink-0 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 lg:w-full ${
                selected ? "bg-white shadow-[0_1px_2px_rgba(17,19,24,0.06)] ring-1 ring-[var(--rule)]" : "hover:bg-white/70"
              }`}
            >
              <span className="block text-sm font-medium text-[var(--fg)]">{c.name}</span>
              <span className="block text-xs text-[var(--fg-2)]">{c.sector}</span>
            </button>
            {/* Ordinateur : les indicateurs du client choisi, sous son nom. */}
            {selected && (
              <ul className="mb-2 mt-1 hidden border-l border-[var(--rule)] pl-3 lg:ml-3 lg:block">
                {c.metrics.map((m) => {
                  const on = m.id === metric.id;
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setMetricId(m.id)}
                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors duration-200 ${
                          on ? "font-medium text-[var(--fg)]" : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                        }`}
                      >
                        <span className="truncate">{m.label}</span>
                        <span className={`shrink-0 tabular-nums ${on ? "text-[var(--accent)]" : ""}`}>{val(m, m.headline)}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            </div>
          );
        })}
      </nav>

      <div className="min-w-0">
        {/* En-tête du client */}
        <div className="px-5 pt-5 md:px-7 md:pt-6">
          <p className="text-base font-medium text-[var(--fg)]">{client.name}</p>
          <p className="mt-0.5 text-sm text-[var(--fg-2)]">{client.note}</p>
        </div>

        {/* Indicateurs en onglets */}
        <div role="tablist" className="mt-5 flex overflow-x-auto border-y border-[var(--rule)]">
          {client.metrics.map((m, i) => {
            const selected = m.id === metric.id;
            return (
              <button
                key={`${client.id}-${m.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setMetricId(m.id);
                  setHover(null);
                }}
                className={`relative min-w-[132px] flex-1 px-4 py-4 text-left transition-colors duration-200 md:px-6 ${
                  selected ? "bg-white" : "bg-[var(--bg-2)]/60 hover:bg-[var(--bg-2)]"
                } ${i < client.metrics.length - 1 ? "border-r border-[var(--rule)]" : ""}`}
              >
                <span className="block truncate text-xs text-[var(--fg-2)] md:text-sm">{m.label}</span>
                <span className="mt-1 block text-xl font-medium tracking-[-0.02em] tabular-nums text-[var(--accent)] md:text-[1.75rem]">
                  {val(m, m.headline)}
                </span>
                <span className="mt-0.5 block truncate text-xs text-[var(--fg-2)]">{m.sub}</span>
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

        {/* Graphique */}
        <div ref={chartRef} className="relative mx-3 pt-4 pb-2 md:mx-5">
          {tooltip && (
            <div
              className="pointer-events-none absolute top-3 z-10 rounded-lg border border-[var(--rule)] bg-white px-3 py-2 shadow-[0_8px_24px_-12px_rgba(17,19,24,0.3)] transition-[left,opacity] duration-150"
              style={{ left: `${tooltip.left * 100}%`, transform: `translateX(${tipShift})`, opacity: show ? 1 : 0 }}
              aria-hidden="true"
            >
              <p className="whitespace-nowrap font-mono text-[11px] text-[var(--fg-2)]">{tooltip.label}</p>
              <p className="whitespace-nowrap font-mono text-sm font-medium tabular-nums text-[var(--fg)]">{tooltip.value}</p>
            </div>
          )}
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-14 h-auto w-full" role="img" aria-label={ariaLabel}>
            {lineView}
            {barsView}
          </svg>
        </div>

        <p className="border-t border-[var(--rule)] px-5 py-3 text-xs text-[var(--fg-2)] md:px-7">{client.source}</p>
      </div>
    </div>
  );
}
