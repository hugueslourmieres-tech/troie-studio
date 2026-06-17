"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { LevelBar } from "./LevelBar";
import { AnimatedNumber } from "../ia/AnimatedNumber";

/**
 * HeroHeroes — slideshow Embla autoplay des 4 personnages IA du hero
 * de /formations. Cycle Claude > ChatGPT+Codex > Gemini > Copilot,
 * 1 slide toutes les 5 secondes. Pause au hover. Dots de progression
 * en bas, sobre.
 *
 * Reuses le pattern de "character card" deja en place : logo +
 * nom + role + LV.X / MAX + 3 stat bars + loadout grid (prompts /
 * MCPs / skills / preset).
 */

type Hero = {
  name: string;
  role: string;
  logo: string;
  stats: { label: string; value: number }[];
  loadout: { prompts: number; mcps: number; skills: number };
};

const HEROES: Hero[] = [
  {
    name: "Claude",
    role: "Le strategiste",
    logo: "/images/logos/claude.svg",
    stats: [
      { label: "Strategie", value: 96 },
      { label: "Redaction", value: 94 },
      { label: "Code (Claude Code)", value: 92 },
    ],
    loadout: { prompts: 32, mcps: 8, skills: 5 },
  },
  {
    name: "ChatGPT + Codex",
    role: "Le polyvalent",
    logo: "/images/logos/chatgpt.svg",
    stats: [
      { label: "Polyvalence", value: 95 },
      { label: "GPTs custom", value: 90 },
      { label: "Codex dev", value: 88 },
    ],
    loadout: { prompts: 28, mcps: 6, skills: 4 },
  },
  {
    name: "Gemini",
    role: "Le natif Workspace",
    logo: "/images/logos/gemini.svg",
    stats: [
      { label: "Workspace", value: 97 },
      { label: "Analyse data", value: 91 },
      { label: "Multimodal", value: 89 },
    ],
    loadout: { prompts: 22, mcps: 5, skills: 3 },
  },
  {
    name: "Copilot",
    role: "Le pair-programmer",
    logo: "/images/logos/copilot.svg",
    stats: [
      { label: "Code completion", value: 93 },
      { label: "Refactor", value: 87 },
      { label: "Tests auto", value: 85 },
    ],
    loadout: { prompts: 18, mcps: 4, skills: 3 },
  },
];

export function HeroHeroes() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="rounded-sm border border-[var(--fg)]/15 bg-[var(--bg)]/40 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Vos 4 heros · slideshow
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
          {String(selectedIndex + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <div ref={emblaRef} className="mt-6 overflow-hidden">
        <div className="flex">
          {HEROES.map((h) => (
            <div
              key={h.name}
              className="min-w-0 flex-[0_0_100%]"
            >
              <motion.div
                key={`${h.name}-content`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={h.logo}
                    alt={h.name}
                    className="h-16 w-auto opacity-90"
                    style={{ filter: "grayscale(1)" }}
                  />
                  <div>
                    <p className="t-display text-3xl text-[var(--fg)] md:text-4xl">
                      {h.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                      {h.role}
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]">
                    LV. {h.stats[0].value} / MAX
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {h.stats.map((s, i) => (
                    <LevelBar
                      key={s.label}
                      label={s.label}
                      value={s.value}
                      delay={0.1 + i * 0.12}
                    />
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-4 gap-3 border-t border-[var(--fg)]/15 pt-6">
                  {[
                    { v: h.loadout.prompts, l: "Prompts" },
                    { v: h.loadout.mcps, l: "MCPs" },
                    { v: h.loadout.skills, l: "Skills" },
                    { v: 1, l: "Preset" },
                  ].map((it) => (
                    <div key={it.l} className="text-center">
                      <p className="t-display text-2xl text-[var(--accent)]">
                        <AnimatedNumber value={it.v} duration={1200} />
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                        {it.l}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots progression */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {HEROES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Voir le héros ${i + 1}`}
            className={`h-[3px] w-8 transition-colors ${
              i === selectedIndex
                ? "bg-[var(--accent)]"
                : "bg-[var(--fg)]/15 hover:bg-[var(--fg)]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
