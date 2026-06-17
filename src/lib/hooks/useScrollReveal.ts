"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useScrollReveal, applies a polished scroll-triggered reveal on a
 * container's children. Each direct child fades + slides up with a
 * stagger when the container scrolls into view.
 *
 * Free GSAP only, no SplitText, no DrawSVG required.
 */
type Options = {
  selector?: string; // CSS selector for children to animate, default :scope > *
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string; // ScrollTrigger start
};

export function useScrollReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const selector = opts.selector ?? ":scope > *";
    const targets = el.querySelectorAll(selector);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: opts.y ?? 32,
        duration: opts.duration ?? 0.9,
        ease: "power3.out",
        stagger: opts.stagger ?? 0.08,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? "top 78%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [opts.selector, opts.y, opts.duration, opts.stagger, opts.start]);

  return ref;
}
