"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/**
 * AnimatedNumber — counts up from 0 to `value` when the element enters
 * the viewport. Designed for the IA landing stat band (5x, 60 %, 30 days…).
 *
 * Renders a single number with optional prefix / suffix. Uses
 * requestAnimationFrame, eased with a soft cubic-out so the count
 * snaps in fast then settles cleanly.
 */
export function AnimatedNumber({
  value,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // cubic-out
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  const formatted =
    decimals === 0
      ? Math.round(display).toLocaleString("fr-FR")
      : display.toLocaleString("fr-FR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
