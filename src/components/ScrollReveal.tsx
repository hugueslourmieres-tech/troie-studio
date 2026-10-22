"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Apparitions au défilement (22/10/2026) : tout élément [data-reveal] monte
 * de 24px en fondu quand il entre à l'écran, une seule fois. Les enfants
 * d'un [data-reveal-stagger] arrivent l'un après l'autre (70ms d'écart).
 * Ce qui est déjà visible au chargement reste affiché, sans clignement.
 * Rien ne bouge si l'utilisateur réduit les animations (voir globals.css).
 */
export function ScrollReveal() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((g) =>
      Array.from(g.children).forEach((c, i) => {
        (c as HTMLElement).dataset.reveal = "";
        (c as HTMLElement).style.setProperty("--d", `${Math.min(i, 8) * 70}ms`);
      }),
    );
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
    });
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.filter((el) => !el.classList.contains("is-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
