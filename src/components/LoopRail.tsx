"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

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
 * - prefers-reduced-motion : pas d'avance automatique, une rangée normale
 *   qui se fait glisser, sans la copie (CSS, globals.css).
 */
export function LoopRail({
  label,
  interval = 2000,
  gapClass = "gap-4 pr-4 md:gap-5 md:pr-5",
  className = "",
  render,
}: {
  label: string;
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

  return (
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
  );
}
