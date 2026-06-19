"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Write-on automatique : découpe les titres (h2 par défaut) en mots et les
 * « écrit » en cascade quand ils entrent à l'écran. À monter une fois sur
 * une page ; cible uniquement les titres en texte simple (ceux qui
 * contiennent du JSX imbriqué, comme le hero, sont ignorés).
 *
 * Sûr SEO : le texte est rendu normalement côté serveur ; le découpage en
 * <span> se fait après hydratation et conserve le même texte. Respecte
 * prefers-reduced-motion.
 */
export function WriteOnScroll({
  selector = "h2",
  stagger = 0.05,
}: {
  selector?: string;
  stagger?: number;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const writeIn = (el: HTMLElement) => {
      el.querySelectorAll<HTMLElement>(".writeon-word").forEach((w, i) => {
        if (!reduce) w.style.transitionDelay = `${i * stagger}s`;
        w.classList.add("is-in");
      });
    };

    const raf = window.requestAnimationFrame(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            writeIn(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
      );

      const els = Array.from(
        document.querySelectorAll<HTMLElement>(selector),
      );
      const vh = window.innerHeight;

      for (const el of els) {
        if (el.dataset.writeon) continue;
        // Uniquement les titres en texte simple (pas de JSX imbriqué).
        const onlyText = Array.from(el.childNodes).every(
          (n) => n.nodeType === Node.TEXT_NODE,
        );
        const text = (el.textContent || "").trim();
        if (!onlyText || !text) continue;

        el.dataset.writeon = "1";
        // Reconstruit le titre : un span par mot, espaces préservés.
        el.textContent = "";
        for (const token of text.split(/(\s+)/)) {
          if (token === "") continue;
          if (/^\s+$/.test(token)) {
            el.appendChild(document.createTextNode(token));
          } else {
            const span = document.createElement("span");
            span.className = "writeon-word";
            span.textContent = token;
            el.appendChild(span);
          }
        }

        if (reduce) {
          writeIn(el);
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          writeIn(el); // déjà visible : on écrit tout de suite
        } else {
          io.observe(el);
        }
      }

      cleanup = () => io.disconnect();
    });

    let cleanup = () => {};
    return () => {
      window.cancelAnimationFrame(raf);
      cleanup();
    };
  }, [pathname, selector, stagger]);

  return null;
}
