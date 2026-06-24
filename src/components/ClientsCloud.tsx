"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Les outils IA sur lesquels on forme. Logos en silhouette, défilé infini. */
const TOOLS = [
  { name: "ChatGPT", logo: "/images/logos/chatgpt.svg" },
  { name: "Claude", logo: "/images/logos/claude.svg" },
  { name: "Gemini", logo: "/images/logos/gemini.svg" },
  { name: "Mistral", logo: "/images/logos/mistral.svg" },
  { name: "Copilot", logo: "/images/logos/copilot.svg" },
  { name: "Perplexity", logo: "/images/logos/perplexity.svg" },
  { name: "Midjourney", logo: "/images/logos/midjourney.svg" },
  { name: "Runway", logo: "/images/logos/runway.svg" },
  { name: "ElevenLabs", logo: "/images/logos/elevenlabs.svg" },
  { name: "Hugging Face", logo: "/images/logos/huggingface.svg" },
  { name: "DaVinci Resolve", logo: "/images/logos/davinci-resolve.svg" },
  { name: "Figma", logo: "/images/logos/figma.svg" },
  { name: "Make", logo: "/images/logos/make.svg" },
];

/**
 * Défilé infini des outils IA sur lesquels on forme. Marquee GSAP, un seul
 * ruban qui boucle sans couture. Logos en silhouette sombre.
 */
export function ClientsCloud() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, { xPercent: -50, ease: "none", duration: 36, repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const loopList = [...TOOLS, ...TOOLS];

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-12 md:pt-28">
        <p className="t-eyebrow text-center">Les outils sur lesquels on forme</p>
      </div>

      <div className="relative mt-12 overflow-hidden pb-20 md:mt-14 md:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-40"
        />

        <div
          ref={trackRef}
          className="flex w-max items-center gap-14 will-change-transform md:gap-20"
        >
          {loopList.map((tool, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${tool.name}-${i}`}
              src={tool.logo}
              alt={tool.name}
              className="h-7 w-auto shrink-0 object-contain transition-opacity hover:opacity-100 md:h-8"
              style={{ filter: "brightness(0)", opacity: 0.72 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
