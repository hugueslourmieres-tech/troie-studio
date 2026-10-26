"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Rangée qui défile seule, en boucle infinie (26/10/2026, photos et films de
 * l'accueil). Le contenu est rendu deux fois et la piste glisse de 0 à -50 %
 * en animation CSS linéaire (transform seulement, hors du fil principal) :
 * la fin de la première copie rejoint le début de la seconde sans saut.
 *
 * - Pause au survol (souris), au focus clavier, au toucher, hors écran et
 *   onglet caché.
 * - On peut tirer la rangée au doigt ou à la souris : on avance alors
 *   l'animation elle-même (currentTime), elle repart de là au relâcher.
 * - Au clavier, l'élément qui reçoit le focus est ramené au bord gauche.
 * - La copie est aria-hidden et inerte (jamais focalisable).
 * - prefers-reduced-motion : pas de défilement automatique, une rangée
 *   normale qui se fait glisser, sans la copie (tout en CSS, globals.css).
 */
export function LoopRail({
  label,
  speed = 32,
  gapClass = "gap-4 pr-4 md:gap-5 md:pr-5",
  className = "",
  render,
}: {
  label: string;
  /** Vitesse en pixels par seconde. */
  speed?: number;
  /** Espacement : le même gap en marge droite de chaque copie, pour un -50 % exact. */
  gapClass?: string;
  className?: string;
  render: (copy: boolean) => ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [held, setHeld] = useState(false);
  const drag = useRef<{ x: number; t: number; moved: boolean; id: number } | null>(null);
  const suppressClick = useRef(false);
  const resume = useRef<number | undefined>(undefined);

  const anim = () => track.current?.getAnimations()[0] as Animation | undefined;
  const loop = () => {
    const el = track.current;
    const a = anim();
    if (!el || !a) return null;
    const timing = a.effect?.getComputedTiming();
    const T = Number(timing?.duration) || 0;
    const D = el.scrollWidth / 2;
    return T && D ? { a, T, D } : null;
  };
  const wrap = (t: number, T: number) => ((t % T) + T) % T;

  // Durée réglée sur la largeur réelle : vitesse constante quel que soit l'écran.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const set = () => el.style.setProperty("--loop-dur", `${Math.max(el.scrollWidth / 2 / speed, 10).toFixed(1)}s`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [speed]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(el);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.clearTimeout(resume.current);
    };
  }, []);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced() || (e.pointerType === "mouse" && e.button !== 0)) return;
    const l = loop();
    if (!l) return;
    window.clearTimeout(resume.current);
    drag.current = { x: e.clientX, t: Number(l.a.currentTime) || 0, moved: false, id: e.pointerId };
    suppressClick.current = false;
    if (e.pointerType !== "mouse") setHeld(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 6) return;
    if (!d.moved) {
      d.moved = true;
      setHeld(true);
    }
    const l = loop();
    if (l) l.a.currentTime = wrap(d.t - (dx / l.D) * l.T, l.T);
  };
  const end = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    suppressClick.current = d.moved;
    drag.current = null;
    // Au doigt : petite pause avant de repartir, le temps de lire.
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => setHeld(false), e.pointerType === "mouse" ? 0 : 1600);
  };

  // Clavier : l'élément focalisé vient au bord gauche (la piste est en pause
  // tant que le focus clavier est dedans, voir globals.css).
  const onFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (!target.matches(":focus-visible")) return;
    const item = target.closest("li");
    const l = loop();
    if (!item || !l || !track.current?.contains(item)) return;
    l.a.currentTime = wrap((item.offsetLeft / l.D) * l.T, l.T);
  };

  const paused = offscreen || hidden || held;

  return (
    <div
      ref={root}
      className={`t-loop ${className}`}
      data-paused={paused ? "" : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onPointerLeave={(e) => e.pointerType === "mouse" && end(e)}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
      onFocus={onFocus}
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
