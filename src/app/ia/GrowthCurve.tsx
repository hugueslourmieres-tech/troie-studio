"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { AnimatedNumber } from "./AnimatedNumber";

/**
 * GrowthCurve, visual "before vs after" pour le hero.
 *
 * Compose quatre couches sur fond TRANSPARENT pour laisser respirer
 * la vidéo du hero :
 *  1. Une ligne d'outils IA (logos SVG du repo)
 *  2. Un mini-graphique SVG avec deux courbes animees à l'apparition :
 *     - "Sans IA" : ligne plate pointillee, beige fonce
 *     - "Avec IA" : courbe exponentielle orange Hermes
 *  3. Une ligne compacte "Chiffres vérifiés, etudes 2026" qui consolide
 *     les 4 stats macro (x2 impact, +60 % capacite, 21 h libérées, -70 %
 *     production créatifs).
 */

const TOOLS = [
  { src: "/images/logos/chatgpt.svg", alt: "ChatGPT" },
  { src: "/images/logos/claude.svg", alt: "Claude" },
  { src: "/images/logos/gemini.svg", alt: "Gemini" },
  { src: "/images/logos/perplexity.svg", alt: "Perplexity" },
  { src: "/images/logos/midjourney.svg", alt: "Midjourney" },
  { src: "/images/logos/runway.svg", alt: "Runway" },
  { src: "/images/logos/make.svg", alt: "Make" },
  { src: "/images/logos/figma.svg", alt: "Figma" },
];

const VERIFIED = [
  { value: 2, prefix: "× ", suffix: "", label: "Impact / collaborateur" },
  { value: 60, prefix: "+", suffix: " %", label: "Capacite équipe" },
  { value: 21, prefix: "", suffix: " h", label: "Libérées / sem / poste" },
  { value: -70, prefix: "", suffix: " %", label: "Production créatifs" },
];

export function GrowthCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div
      ref={ref}
      className="relative rounded-sm border border-[var(--fg)]/15 p-6 md:p-8"
    >
      {/* Eyebrow */}
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
        Avec les meilleurs outils
      </p>

      {/* Logos line */}
      <div className="mt-5 grid grid-cols-4 gap-x-4 gap-y-5 md:grid-cols-8">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.alt}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-élément */}
            <img
              src={tool.src}
              alt={tool.alt}
              className="h-7 w-auto opacity-90"
              style={{ filter: "grayscale(1)" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Growth curve SVG */}
      <div className="mt-8 border-t border-[var(--fg)]/15 pt-6">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80">
          <span>Sans IA / Avec IA · 12 mois</span>
          <span className="text-[var(--accent)]">+ 156 % bénéfices</span>
        </div>

        <svg
          viewBox="0 0 400 180"
          className="mt-4 h-auto w-full"
          aria-hidden="true"
        >
          {/* Background grid */}
          <g stroke="var(--fg)" strokeOpacity="0.15" strokeWidth="0.5">
            <line x1="20" y1="20" x2="20" y2="160" />
            <line x1="20" y1="160" x2="380" y2="160" />
            <line x1="20" y1="120" x2="380" y2="120" strokeDasharray="2 4" opacity="0.6" />
            <line x1="20" y1="80" x2="380" y2="80" strokeDasharray="2 4" opacity="0.6" />
            <line x1="20" y1="40" x2="380" y2="40" strokeDasharray="2 4" opacity="0.6" />
          </g>

          {/* Sans IA, flat dashed */}
          <motion.path
            d="M 20 145 Q 100 142 200 138 T 380 130"
            fill="none"
            stroke="var(--fg)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          {/* Avec IA, exponential orange */}
          <motion.path
            d="M 20 145 C 80 140 140 110 200 75 S 320 30 380 18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          />

          {/* End dot avec IA */}
          <motion.circle
            cx="380"
            cy="18"
            r="4.5"
            fill="var(--accent)"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.8, ease: "easeOut" }}
          />

          {/* Labels */}
          <motion.text
            x="372"
            y="35"
            textAnchor="end"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fill="var(--accent)"
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.9 }}
          >
            AVEC IA
          </motion.text>
          <motion.text
            x="372"
            y="125"
            textAnchor="end"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fill="var(--fg)"
            fillOpacity="0.5"
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            SANS IA
          </motion.text>
        </svg>
      </div>

      {/* Verified study stats, consolides */}
      <div className="mt-6 border-t border-[var(--fg)]/15 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Chiffres vérifiés · etudes 2026
        </p>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
          {VERIFIED.map((v) => (
            <div key={v.label} className="flex flex-col">
              <span className="t-display text-2xl text-[var(--fg)] md:text-[28px]">
                <AnimatedNumber
                  value={v.value}
                  prefix={v.prefix}
                  suffix={v.suffix}
                  duration={1600}
                />
              </span>
              <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
