"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Total duration in seconds */
  duration?: number;
  /** Window during which each char scrambles before settling (0..1 of duration) */
  revealWindow?: number;
  /** Character pool for scrambling */
  charset?: string;
};

/**
 * ScrambleText, TROIE-themed scramble effect (no SplitText plugin).
 *
 * On mount, each non-space character of `text` is initially replaced by a
 * random glyph from `charset`. GSAP drives a progress value from 0 to 1;
 * each character has its own staggered reveal time. While its reveal time
 * hasn't arrived, it keeps swapping to a new random glyph every few ms;
 * after that, it locks to the real character.
 *
 * Default charset uses Greek letters + a sprinkle of glyphs, fits the
 * Trojan theme of the brand and reads as a slow type-on / decoding effect.
 */
export function ScrambleText({
  text,
  className = "",
  delay = 0,
  duration = 1.6,
  revealWindow = 0.35,
  charset = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω∴◇/,|",
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // Réservés visual layout even before first frame (avoids layout shift)
  const [, forcé] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = Array.from(text);
    // Per-character reveal time (0..1), staggered linearly with small jitter
    const total = chars.length;
    const settleAt = chars.map((c, i) => {
      if (c === " " || c === " ") return 0;
      const base = total > 1 ? i / (total - 1) : 0;
      // Spread the reveals over (1 - revealWindow) of the timeline
      return Math.min(1, base * (1 - revealWindow));
    });

    const randomChar = () =>
      charset.charAt(Math.floor(Math.random() * charset.length));

    const obj = { p: 0 };
    let lastFlip = 0;

    const tween = gsap.to(obj, {
      p: 1,
      duration,
      delay,
      ease: "power1.inOut",
      onUpdate: () => {
        const now = performance.now();
        // Re-roll random glyphs every ~50ms to keep it lively but not flashy
        const flip = now - lastFlip > 50;
        if (flip) lastFlip = now;

        let out = "";
        for (let i = 0; i < chars.length; i++) {
          const real = chars[i];
          if (real === " ") {
            out += " ";
            continue;
          }
          const start = settleAt[i];
          const end = start + revealWindow;
          if (obj.p >= end) {
            out += real;
          } else if (obj.p < start) {
            // not started yet → still random
            out += flip ? randomChar() : el.dataset.lastChar?.[i] ?? randomChar();
          } else {
            out += flip ? randomChar() : el.dataset.lastChar?.[i] ?? randomChar();
          }
        }
        el.dataset.lastChar = out;
        el.textContent = out;
      },
      onComplete: () => {
        el.textContent = text;
      },
    });

    forcé((x) => x + 1);
    return () => {
      tween.kill();
    };
  }, [text, delay, duration, revealWindow, charset]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {/* Réservé layout with a fully-rendered text node until the tween starts */}
      {text}
    </span>
  );
}
