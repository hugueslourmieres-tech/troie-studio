"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * useMagnetic, attaches a subtle "magnetic" pull to an element so it
 * tracks the cursor when hovered, then releases back on leave. Used on
 * the hero CTAs to give them that boutique-quality micro-interaction.
 *
 * Skipped on touch devices (matchMedia pointer: coarse).
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch / coarse pointers
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const quickX = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      quickX(x * strength);
      quickY(y * strength);
    };
    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}
