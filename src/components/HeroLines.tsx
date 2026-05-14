"use client";

import { motion } from "motion/react";

/**
 * HeroLines — editorial layer for the hero.
 *
 * Three subtle ingredients on top of the cream/orange tone:
 *  1. A faint vertical column grid (5 hairlines) — evokes the underlying
 *     print grid of a magazine layout, makes the section feel "designed".
 *  2. Horizontal hairlines that draw themselves left-to-right or
 *     right-to-left, hold, then fade out. New lines appear continuously
 *     at different y-positions for slow, ambient motion.
 *  3. Two pulsing dot markers ("editorial pins") at fixed positions.
 *
 * Everything is pointer-events: none, low opacity, sits behind the
 * text content. Pure motion/react, no third-party canvas lib.
 */
type Line = {
  y: string;
  from: "left" | "right";
  width: number;
  delay: number;
  duration: number;
};

const COLUMNS = [12, 31, 50, 69, 88]; // editorial column rules (% from left)

const LINES: Line[] = [
  { y: "16%", from: "left",  width: 26, delay: 0,   duration: 7 },
  { y: "29%", from: "right", width: 18, delay: 1.8, duration: 6.5 },
  { y: "44%", from: "left",  width: 42, delay: 0.6, duration: 8 },
  { y: "57%", from: "right", width: 22, delay: 3.2, duration: 7.5 },
  { y: "72%", from: "left",  width: 14, delay: 1.4, duration: 6 },
  { y: "84%", from: "right", width: 34, delay: 2.6, duration: 8.5 },
];

const PINS = [
  { top: "22%", left: "12%", delay: 1.2 },
  { top: "68%", left: "69%", delay: 2.8 },
];

export function HeroLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Vertical column grid — static, almost invisible */}
      {COLUMNS.map((x, i) => (
        <div
          key={`col-${i}`}
          className="absolute top-0 h-full w-px bg-[var(--fg)]"
          style={{ left: `${x}%`, opacity: 0.05 }}
        />
      ))}

      {/* Horizontal animated hairlines — drawing themselves */}
      {LINES.map((l, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-[var(--fg)]"
          style={{
            top: l.y,
            ...(l.from === "left" ? { left: 0 } : { right: 0 }),
          }}
          initial={{ width: "0%", opacity: 0 }}
          animate={{
            width: ["0%", `${l.width}%`, `${l.width}%`, "0%"],
            opacity: [0, 0.22, 0.22, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.35, 0.65, 1],
          }}
        />
      ))}

      {/* Editorial pins — soft pulsing dots */}
      {PINS.map((p, i) => (
        <motion.span
          key={`pin-${i}`}
          className="absolute block h-1 w-1 rounded-full bg-[var(--fg)]"
          style={{ top: p.top, left: p.left }}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{
            scale: [0.7, 1.4, 0.7],
            opacity: [0, 0.45, 0],
          }}
          transition={{
            duration: 4.5,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
