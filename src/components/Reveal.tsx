"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const distance: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  /** When true, only animate once when entering viewport (default true). */
  once?: boolean;
  /** Margin offset for the in-view trigger. Default kicks earlier. */
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition" | "whileInView" | "viewport">;

/**
 * Reveal — fade + slide entrance when the element enters the viewport.
 * Coupled to Lenis, the easing keeps everything coherent.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  className,
  once = true,
  amount = 0.2,
  ...rest
}: Props) {
  const offset = distance[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
