"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
};

/**
 * SplitTextReveal — DIY word-by-word reveal (no SplitText plugin).
 *
 * Wraps each word in an overflow-hidden span, then animates the inner
 * span from translateY(110%) to 0 with a stagger. Drives the SAME
 * Hermès / Loewe entrance you see on luxury sites without the paid
 * SplitText addon.
 */
export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  duration = 1.0,
  stagger = 0.07,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll("[data-word-inner]");
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 110,
        duration,
        delay,
        ease: "power3.out",
        stagger,
      });
    }, el);

    return () => ctx.revert();
  }, [text, delay, duration, stagger]);

  // Split into words; keep a non-breaking space between words via inline-block.
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(/(\s+)/).map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={i}> </span>;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden="true"
          >
            <span data-word-inner className="inline-block">
              {token}
            </span>
          </span>
        );
      })}
    </span>
  );
}
