"use client";

import { useEffect, useState } from "react";

/**
 * Wordmark "TROIE" piloté par le scroll : resserré en haut de page, il
 * s'ouvre (letter-spacing) au fur et à mesure du scroll. Rendu en HTML
 * (et non en SVG) pour pouvoir animer l'espacement des lettres en douceur.
 * Hérite la couleur (currentColor) et la taille via className.
 */
export function AnimatedWordmark({ className = "" }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setProgress(Math.min(1, window.scrollY / 240));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resserré (0.04em) en haut -> largement ouvert (0.8em) au scroll,
  // pour retrouver l'écartement du wordmark d'avant l'animation.
  const ls = 0.04 + progress * 0.76;

  return (
    <span
      aria-label="TROIE"
      className={`block whitespace-nowrap leading-none ${className}`}
      style={{
        fontFamily: "var(--font-bodoni, ui-serif, Georgia, serif)",
        fontWeight: 400,
        letterSpacing: `${ls}em`,
        // on compense l'espace ajouté après le E pour que la boîte ne pousse
        // pas la nav vers la droite quand le logo s'ouvre.
        marginRight: `-${ls}em`,
        transition: "letter-spacing 250ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      TROIE
    </span>
  );
}
