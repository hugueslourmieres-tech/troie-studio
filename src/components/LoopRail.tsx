"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

/**
 * Rangée qui avance seule, une carte à la fois, en boucle (photos et films de
 * l'accueil). 26/10/2026, demande de Hugues : plus de défilement continu
 * (on ne lisait plus les titres), la rangée reste immobile `interval` ms,
 * puis glisse d'un cran.
 *
 * Le contenu est rendu deux fois : arrivé au début de la copie, on revient
 * sans transition au même endroit dans l'original, ce qui ne se voit pas.
 *
 * - Pause au survol (souris), au focus clavier, au toucher, hors écran et
 *   onglet caché.
 * - Glisser au doigt ou à la souris : un cran en avant ou en arrière.
 * - Au clavier, l'élément qui reçoit le focus vient au bord gauche.
 * - La copie est aria-hidden et inerte (jamais focalisable).
 * - Sous la rangée, comme sous les résultats du hero : flèches aux deux
 *   bords, points au centre (le point actif s'allonge), clic sur un point
 *   pour y aller.
 * - prefers-reduced-motion : pas d'avance automatique, une rangée normale
 *   qui se fait glisser, sans la copie (CSS, globals.css).
 */
export function LoopRail({
  label,
  interval = 2000,
  gapClass = "gap-4 pr-4 md:gap-5 md:pr-5",
  className = "",
  render,
  count: total,
  prevLabel,
  nextLabel,
}: {
  label: string;
  /** Nombre d'éléments, pour les points. */
  count: number;
  prevLabel: string;
  nextLabel: string;
  /** Temps d'arrêt sur chaque position, en millisecondes. */
  interval?: number;
  /** Espacement : le même gap en marge droite de chaque copie. */
  gapClass?: string;
  className?: string;
  render: (copy: boolean) => ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const idx = useRef(0);
  const [cur, setCur] = useState(0);
  const [offscreen, setOffscreen] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [held, setHeld] = useState(false);
  const drag = useRef<{ x: number; id: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const resume = useRef<number | undefined>(undefined);

  const items = () => Array.from(track.current?.querySelectorAll<HTMLLIElement>(":scope > ul > li") ?? []);
  const count = () => track.current?.querySelector(":scope > ul")?.children.length ?? 0;
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Place la piste sur l'élément i, avec ou sans glissement. */
  const place = useCallback((i: number, animate: boolean) => {
    const el = track.current;
    const li = items()[i];
    if (!el || !li) return;
    idx.current = i;
    const n = el.querySelector(":scope > ul")?.children.length ?? 0;
    if (n) setCur(i % n);
    el.style.transition = animate ? "" : "none";
    el.style.transform = `translate3d(${-li.offsetLeft}px,0,0)`;
    if (!animate) void el.offsetWidth; // fige la position avant de rendre la transition
    if (!animate) el.style.transition = "";
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const n = count();
      if (!n) return;
      let i = idx.current;
      // Recul depuis le premier : on saute d'abord sur sa copie.
      if (dir === -1 && i === 0) {
        place(n, false);
        i = n;
      }
      place(i + dir, true);
    },
    [place],
  );

  // Fin du glissement : passé dans la copie, on revient dans l'original.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el || e.propertyName !== "transform") return;
      const n = count();
      if (n && idx.current >= n) place(idx.current - n, false);
    };
    el.addEventListener("transitionend", onEnd);
    const ro = new ResizeObserver(() => place(idx.current, false));
    ro.observe(el);
    return () => {
      el.removeEventListener("transitionend", onEnd);
      ro.disconnect();
    };
  }, [place]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.clearTimeout(resume.current);
    };
  }, []);

  const paused = offscreen || hidden || hover || focused || held;

  useEffect(() => {
    if (paused || reduced()) return;
    const t = window.setInterval(() => step(1), interval);
    return () => window.clearInterval(t);
  }, [paused, interval, step]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced() || (e.pointerType === "mouse" && e.button !== 0)) return;
    window.clearTimeout(resume.current);
    drag.current = { x: e.clientX, id: e.pointerId, moved: false };
    suppressClick.current = false;
    if (e.pointerType !== "mouse") setHeld(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d && d.id === e.pointerId && Math.abs(e.clientX - d.x) > 6) d.moved = true;
  };
  const end = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    suppressClick.current = d.moved;
    drag.current = null;
    // Au doigt : petite pause avant de repartir, le temps de lire.
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => setHeld(false), e.pointerType === "mouse" ? 0 : 2400);
  };

  // Clavier : l'élément focalisé vient au bord gauche.
  const onFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (!target.matches(":focus-visible")) return;
    setFocused(true);
    const i = items().findIndex((li) => li.contains(target));
    if (i >= 0 && !reduced()) place(i, true);
  };

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform] duration-200 hover:text-[var(--fg)] active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
  const goTo = (i: number) => {
    if (i === cur) return;
    place(i, !reduced());
  };

  return (
    <>
    <div
      ref={root}
      className={`t-loop ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        setHover(false);
        end(e);
      }}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
      onFocus={onFocus}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
    >
      <div ref={track} className="t-loop-track">
        <ul aria-label={label} className={`t-loop-copy ${gapClass}`}>
          {render(false)}
        </ul>
        <ul aria-hidden="true" inert className={`t-loop-copy ${gapClass}`}>
          {render(true)}
        </ul>
      </div>
    </div>

    <div
      className="mt-4 flex items-center justify-between"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
    >
      <button type="button" className={btn} onClick={() => step(-1)} aria-label={prevLabel}>
        <CaretLeft weight="bold" className="h-5 w-5" />
      </button>
      <div className="flex items-center">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${i + 1} / ${total}`}
            aria-current={i === cur ? "true" : undefined}
            className="group flex h-8 items-center px-[3px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]"
          >
            <span
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === cur ? "w-6 bg-[var(--fg)]" : "w-1.5 bg-[var(--rule-strong)] group-hover:bg-[var(--fg-2)]"}`}
            />
          </button>
        ))}
      </div>
      <button type="button" className={btn} onClick={() => step(1)} aria-label={nextLabel}>
        <CaretRight weight="bold" className="h-5 w-5" />
      </button>
    </div>
    </>
  );
}
