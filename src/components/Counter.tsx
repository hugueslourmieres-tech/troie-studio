"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counter — animation count-up qui se déclenche une fois
 * quand l'élément entre dans le viewport. Eased.
 */
export function Counter({ to, suffix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = (now - start) / 1000;
      const t = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOut(t) * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {value}
      {suffix}
    </motion.span>
  );
}
