"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { GLOSSAIRE, type Locale, type TermId } from "@/lib/glossaire";

/** Marge minimale gardée entre l'infobulle et le bord de l'écran. */
const EDGE = 8;

/**
 * Un mot de jargon avec sa définition.
 *
 * Trois façons de l'ouvrir, parce qu'une seule ne suffit jamais :
 *  - survol souris (desktop) ;
 *  - TAP (mobile) : le survol n'existe pas au doigt, sans ça la moitié des
 *    visiteurs ne verraient jamais la définition ;
 *  - focus clavier, avec Échap pour fermer.
 *
 * L'infobulle est TOUJOURS dans le DOM (masquée visuellement, pas retirée) :
 * les moteurs et les IA de recherche lisent donc les définitions, et
 * aria-describedby reste valide en permanence.
 *
 * Aucune couleur en dur : tout passe par les variables de tone, donc le mot
 * reste lisible qu'il tombe sur la crème, sur le sombre ou sur l'orange plein.
 */
export function Term({
  id,
  children,
}: {
  id: TermId;
  children?: React.ReactNode;
}) {
  const locale = useLocale() as Locale;
  const entry = GLOSSAIRE[id]?.[locale];
  const [open, setOpen] = useState(false);
  /** Décalage horizontal appliqué quand la carte sortirait de l'écran. */
  const [shift, setShift] = useState(0);
  const tipId = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  /** Le dernier moyen de pointage utilisé : « mouse », « touch », « pen ». */
  const pointer = useRef<string>("");

  /**
   * L'infobulle est centrée sur le mot : un mot en début de ligne la pousse
   * donc hors de l'écran à gauche, un mot en fin de ligne à droite. On la
   * ramène juste assez pour qu'elle tienne, sans la décrocher du mot.
   */
  useEffect(() => {
    if (!open) {
      setShift(0);
      return;
    }
    /**
     * Calculé depuis le mot, jamais depuis la carte : le mot, lui, n'est pas
     * décalé. Le calcul donne donc le même résultat qu'on le relance une ou
     * dix fois, et reste juste après une rotation d'écran.
     */
    const place = () => {
      const anchor = ref.current;
      const tip = tipRef.current;
      if (!anchor || !tip) return;
      const a = anchor.getBoundingClientRect();
      const half = tip.offsetWidth / 2;
      const center = a.left + a.width / 2;
      const vw = document.documentElement.clientWidth;
      if (center - half < EDGE) setShift(EDGE - (center - half));
      else if (center + half > vw - EDGE) setShift(vw - EDGE - (center + half));
      else setShift(0);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!entry) return <>{children}</>;

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-describedby={tipId}
        aria-expanded={open}
        onPointerDown={(e) => {
          pointer.current = e.pointerType;
        }}
        onClick={(e) => {
          // Souris : le survol ouvre déjà, un clic ne ferait que refermer.
          // Clavier (detail === 0) : le focus ouvre déjà, Échap ferme.
          // Reste le doigt, le seul qui a vraiment besoin du clic.
          if (pointer.current === "mouse" || e.detail === 0) return;
          setOpen((o) => !o);
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setOpen(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="cursor-help border-b border-dashed border-[var(--accent)] font-medium text-inherit transition-colors hover:border-solid hover:text-[var(--accent-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        {children ?? entry.label}
      </button>

      <span
        role="tooltip"
        id={tipId}
        ref={tipRef}
        /* Le recentrage passe par `translate` et non `transform` : Tailwind v4
           pose déjà `translate` pour ses utilitaires, et les deux propriétés
           s'additionneraient au lieu de se remplacer. */
        style={{ translate: `calc(-50% + ${shift}px)` }}
        className={`pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-50 block w-[min(21rem,78vw)] border border-[var(--rule-strong)] bg-[var(--bg-2)] px-4 py-3 text-left shadow-[0_18px_44px_-18px_rgba(0,0,0,0.45)] transition-opacity duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--accent-2)]">
          {entry.label}
        </span>
        <span className="mt-1.5 block text-[12.5px] font-normal leading-relaxed text-[var(--fg-2)]">
          {entry.def}
        </span>
      </span>
    </span>
  );
}
