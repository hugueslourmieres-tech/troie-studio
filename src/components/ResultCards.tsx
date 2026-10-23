"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  LOIR_ORDERS_PCT,
  LOIR_SALES_PCT,
  LOIR_VISITS_PCT,
  RUTHERFORD_INSTAGRAM_PCT,
  RUTHERFORD_LINKEDIN_RATE_INDEX,
  RUTHERFORD_TIKTOK_PCT,
  RUTHERFORD_YOUTUBE_PCT,
} from "@/lib/results";

/**
 * Les résultats du premier écran en diaporama (24/10/2026, demande de
 * Hugues) : huit résultats réels tirés de src/lib/results.ts, chacun avec un
 * bandeau de couleur filé et granuleux (esprit ElevenLabs), le chiffre en
 * bleu et sa courbe. Défilement automatique toutes les 4,5 s, arrêté au
 * survol, au focus, au toucher et si l'utilisateur réduit les animations.
 * Chaque carte ouvre l'étude de cas du client.
 */

type Card = {
  id: string;
  client: string;
  sector: string;
  value: string;
  label: string;
  target: string;
  art: string;
  /** Points de la courbe [x, y], de 0 à 1. */
  curve?: [number, number][];
  /** Carrés : 1 budget, n fois en ventes. */
  squares?: number;
  /** Deux barres avant et après. */
  pair?: [number, number];
};

const ease = [0.16, 1, 0.3, 1] as const;
const W = 400;
const H = 96;

function norm(points: { x: number; v: number }[]): [number, number][] {
  const xs = points.map((p) => p.x);
  const vs = points.map((p) => p.v);
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  const [v0, v1] = [Math.min(...vs), Math.max(...vs)];
  return points.map((p) => [(p.x - x0) / (x1 - x0 || 1), (p.v - v0) / (v1 - v0 || 1)]);
}
const time = (d: string) => new Date(`${d}T00:00:00Z`).getTime();
const monthly = (arr: number[]) => norm(arr.map((v, i) => ({ x: i, v })));
const dated = (arr: { d: string; v: number }[]) => norm(arr.map((p) => ({ x: time(p.d), v: p.v })));
const last = (arr: number[] | { v: number }[]) => {
  const l = arr[arr.length - 1];
  return Math.round(typeof l === "number" ? l : l.v);
};

function linePath(points: [number, number][]) {
  return points
    .map(([px, py], i) => `${i ? "L" : "M"}${(px * W).toFixed(1)},${(H - 6 - py * (H - 12)).toFixed(1)}`)
    .join(" ");
}

/** Le chiffre : nombre en grand, signe plus léger, unité % plus petite et levée. */
function Figure({ value }: { value: string }) {
  const m = value.match(/^([+×]?)([\d\s .,]+?)\s*(%?)$/u);
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
  const pct = (n: number) => (en ? `+${n}%` : `+${n} %`);
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const L = `/${locale}/etudes-de-cas/`;
  const cards: Card[] = [
    { id: "loir-sales", client: "LOIR Paris", sector: "E-commerce", value: pct(last(LOIR_SALES_PCT)), label: en ? "online sales in two years" : "de ventes en ligne en deux ans", target: `${L}loir-paris`, art: "meadow", curve: monthly(LOIR_SALES_PCT) },
    { id: "ruth-tiktok", client: "Rutherford", sector: en ? "Industrial SME, B2B" : "PME industrielle, B2B", value: pct(last(RUTHERFORD_TIKTOK_PCT)), label: en ? "TikTok followers since March 2025" : "d'abonnés TikTok depuis mars 2025", target: `${L}rutherford`, art: "sky", curve: dated(RUTHERFORD_TIKTOK_PCT) },
    { id: "autajon", client: "Autajon", sector: en ? "Large group, packaging" : "Grand groupe, emballage", value: "×35", label: en ? "in sales for a film's budget" : "de ventes pour le budget d'un film", target: `${L}autajon`, art: "dusk", squares: 35 },
    { id: "loir-orders", client: "LOIR Paris", sector: "E-commerce", value: pct(last(LOIR_ORDERS_PCT)), label: en ? "orders in two years" : "de commandes en deux ans", target: `${L}loir-paris`, art: "meadow", curve: monthly(LOIR_ORDERS_PCT) },
    { id: "ruth-linkedin", client: "Rutherford", sector: en ? "Industrial SME, B2B" : "PME industrielle, B2B", value: pct(RUTHERFORD_LINKEDIN_RATE_INDEX.after - RUTHERFORD_LINKEDIN_RATE_INDEX.before), label: en ? "new LinkedIn followers per month" : "de nouveaux abonnés LinkedIn par mois", target: `${L}rutherford`, art: "orchid", pair: [RUTHERFORD_LINKEDIN_RATE_INDEX.before, RUTHERFORD_LINKEDIN_RATE_INDEX.after] },
    { id: "loir-visits", client: "LOIR Paris", sector: "E-commerce", value: pct(last(LOIR_VISITS_PCT)), label: en ? "site visits in two years" : "de visites du site en deux ans", target: `${L}loir-paris`, art: "dusk", curve: monthly(LOIR_VISITS_PCT) },
    { id: "ruth-youtube", client: "Rutherford", sector: en ? "Industrial SME, B2B" : "PME industrielle, B2B", value: pct(last(RUTHERFORD_YOUTUBE_PCT)), label: en ? "YouTube subscribers since April 2022" : "d'abonnés YouTube depuis avril 2022", target: `${L}rutherford`, art: "orchid", curve: dated(RUTHERFORD_YOUTUBE_PCT) },
    { id: "ruth-insta", client: "Rutherford", sector: en ? "Industrial SME, B2B" : "PME industrielle, B2B", value: pct(last(RUTHERFORD_INSTAGRAM_PCT)), label: en ? "Instagram followers since Feb. 2025" : "d'abonnés Instagram depuis févr. 2025", target: `${L}rutherford`, art: "sky", curve: dated(RUTHERFORD_INSTAGRAM_PCT) },
  ];

  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];
  const go = useCallback((i: number) => {
    const el = track.current;
    const list = Array.from(el?.children ?? []) as HTMLElement[];
    if (!el || !list.length) return;
    const n = ((i % list.length) + list.length) % list.length;
    el.scrollTo({ left: list[n].offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  // Carte active = celle dont le bord gauche est le plus proche du début.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let best = 0;
        let dist = Infinity;
        slides().forEach((s, i) => {
          const d = Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft);
          if (d < dist) { dist = d; best = i; }
        });
        setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Défilement automatique : revient au début après la dernière carte visible.
  useEffect(() => {
    if (reduce || paused || !show) return;
    const id = setInterval(() => {
      const el = track.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      go(atEnd ? 0 : active + 1);
    }, 4500);
    return () => clearInterval(id);
  }, [active, paused, reduce, show, go]);

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform] duration-200 hover:text-[var(--fg)] active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <ul
        ref={track}
        aria-label={en ? "Client results" : "Résultats clients"}
        className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:-mx-12 md:scroll-pl-12 md:gap-5 md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <li key={c.id} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
            <motion.a
              href={c.target}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.1 * Math.min(i, 3), ease }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--bg-2)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {/* Essai du 23/10/2026 : la couleur en grand, comme « Pour qui »,
                  la courbe en blanc dessus, le chiffre et la marque en dessous. */}
              <span aria-hidden="true" className="grain relative block aspect-[16/10] shrink-0 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/art/${c.art}.jpg`} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={c.curve ? "none" : "xMidYMid meet"} className="absolute inset-x-0 bottom-0 h-[42%] w-full">
                  {c.curve && (
                    <>
                      <path d={`${linePath(c.curve)} L${W},${H} L0,${H} Z`} fill="#ffffff" opacity={0.22} />
                      <motion.path
                        d={linePath(c.curve)}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                        initial={{ pathLength: reduce ? 1 : 0 }}
                        animate={show ? { pathLength: 1 } : {}}
                        transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.3 + 0.25 * Math.min(i, 3), ease: [0.65, 0, 0.35, 1] }}
                      />
                    </>
                  )}
                  {c.squares &&
                    Array.from({ length: c.squares + 1 }, (_, k) => {
                      const cols = 12;
                      const size = 14;
                      const gap = (W - 48 - cols * size) / (cols - 1);
                      return (
                        <rect
                          key={k}
                          x={24 + (k % cols) * (size + gap)}
                          y={H - 10 - (Math.floor(k / cols) + 1) * (size + 8) + 8}
                          width={size}
                          height={size}
                          rx={3}
                          fill="#ffffff"
                          fillOpacity={k === 0 ? 0.35 : 0.95}
                        />
                      );
                    })}
                  {c.pair && (
                    <>
                      <rect x={140} y={H - (c.pair[0] / c.pair[1]) * (H - 10)} width={44} height={(c.pair[0] / c.pair[1]) * (H - 10)} rx={4} fill="#ffffff" fillOpacity={0.4} />
                      <rect x={216} y={10} width={44} height={H - 10} rx={4} fill="#ffffff" />
                    </>
                  )}
                </svg>
              </span>
              <div className="flex flex-1 items-end justify-between gap-4 px-6 pb-6 pt-5">
                <div className="min-w-0">
                  <p className="text-base font-medium tracking-[-0.01em] text-[var(--fg)]">{c.client}</p>
                  <p className="mt-1 text-sm leading-snug text-[var(--fg-2)]">{c.label}</p>
                </div>
                <p className="shrink-0 text-[2.25rem] font-medium leading-none tracking-[-0.04em] text-[var(--accent)] tabular-nums">
                  <Figure value={c.value} />
                </p>
              </div>
            </motion.a>
          </li>
        ))}
      </ul>

      {/* Flèches sans cercle aux deux bords, points au centre. */}
      <div className="mt-6 flex items-center justify-between">
        <button type="button" className={btn} onClick={() => go(active - 1)} aria-label={en ? "Previous result" : "Résultat précédent"}>
          <CaretLeft weight="bold" className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {cards.map((c, i) => (
            <span
              key={c.id}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? "w-6 bg-[var(--fg)]" : "w-1.5 bg-[var(--rule-strong)]"}`}
            />
          ))}
        </div>
        <button type="button" className={btn} onClick={() => go(active + 1)} aria-label={en ? "Next result" : "Résultat suivant"}>
          <CaretRight weight="bold" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
