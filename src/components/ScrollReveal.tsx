"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Auto-reveal au scroll : anime l'apparition des textes (titres, paragraphes,
 * listes...) au sein de <article> / <main> quand ils entrent dans le viewport.
 *
 * Sûr pour le SEO / sans JS : le contenu est rendu visible normalement ;
 * c'est le JS qui pose .reveal-init UNIQUEMENT sur les éléments hors-écran
 * (donc pas de flash au-dessus de la ligne de flottaison, et si le JS ne
 * tourne pas, tout reste lisible). Respecte prefers-reduced-motion.
 *
 * À monter une fois par layout (formations, ia). Se relance à chaque
 * changement de route.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const selector =
      "article :is(h1,h2,h3,h4,p,li,blockquote), main :is(h1,h2,h3,h4,p,li,blockquote)";

    // On laisse le layout se peindre une frame avant d'attacher l'observer.
    const raf = window.requestAnimationFrame(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );

      const els = Array.from(
        document.querySelectorAll<HTMLElement>(selector),
      );
      const vh = window.innerHeight;
      for (const el of els) {
        if (el.dataset.revealed === "1") continue;
        el.dataset.revealed = "1";
        const rect = el.getBoundingClientRect();
        // Déjà visible (ou presque) : on laisse tel quel, pas d'animation.
        if (rect.top < vh * 0.92 && rect.bottom > 0) continue;
        el.classList.add("reveal-init");
        io.observe(el);
      }

      cleanup = () => io.disconnect();
    });

    let cleanup = () => {};
    return () => {
      window.cancelAnimationFrame(raf);
      cleanup();
    };
  }, [pathname]);

  return null;
}
