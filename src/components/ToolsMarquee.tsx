"use client";

/**
 * ToolsMarquee, infinite horizontal scroller of the apps & tools the
 * atelier uses. Each item = logo (monochrome SVG) + name in mono caps,
 * separated by an orange dot. Pauses on hover.
 *
 * Loop trick: the list is duplicated and the CSS animation translates the
 * track by -50%. Because the first half and second half are identical, the
 * jump back to 0% is invisible.
 *
 * Tools are filtered to the SVGs actually présent in /public/images/logos.
 * No name is displayed without its logo.
 */

type Tool = { name: string; logo: string };

const TOOLS: Tool[] = [
  // LLM & IA conversationnelle
  { name: "Claude", logo: "/images/logos/claude.svg" },
  { name: "ChatGPT", logo: "/images/logos/chatgpt.svg" },
  { name: "Gemini", logo: "/images/logos/gemini.svg" },
  { name: "Perplexity", logo: "/images/logos/perplexity.svg" },
  { name: "Copilot", logo: "/images/logos/copilot.svg" },
  // Image & vidéo IA
  { name: "Midjourney", logo: "/images/logos/midjourney.svg" },
  { name: "Runway", logo: "/images/logos/runway.svg" },
  // Création
  { name: "Adobe", logo: "/images/logos/adobe.svg" },
  { name: "DaVinci Resolve", logo: "/images/logos/davinci-resolve.svg" },
  { name: "Figma", logo: "/images/logos/figma.svg" },
  // Automatisation
  { name: "Make", logo: "/images/logos/make.svg" },
  // Stratégie & marketing
  { name: "Google Analytics", logo: "/images/logos/google-analytics.svg" },
  { name: "Google Ads", logo: "/images/logos/google-ads.svg" },
  { name: "Meta", logo: "/images/logos/meta.svg" },
  { name: "HubSpot", logo: "/images/logos/hubspot.svg" },
  { name: "Semrush", logo: "/images/logos/semrush.svg" },
];

export function ToolsMarquee({ ariaLabel }: { ariaLabel: string }) {
  // Duplicate for a seamless loop. The CSS keyframe goes from 0 to -50%.
  const doubled = [...TOOLS, ...TOOLS];

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="relative w-full overflow-hidden border-t border-b border-[#f5f0e6]/15 bg-[var(--ink)]"
    >
      {/* Edge fades, keep the marquee feeling boundless */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0f0b08] to-transparent md:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0f0b08] to-transparent md:w-32"
      />

      <div className="t-marquee flex w-max items-center gap-8 py-5 md:gap-12 md:py-6">
        {doubled.map((tool, i) => (
          <span
            key={`${tool.name}-${i}`}
            className="flex shrink-0 items-center gap-8 md:gap-12"
          >
            {/* Logo + name pair */}
            <span className="flex items-center gap-3 md:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-élément */}
              <img
                src={tool.logo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-4 w-auto opacity-90 md:h-5"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#f5f0e6]/90 whitespace-nowrap">
                {tool.name}
              </span>
            </span>
            {/* White dot separator */}
            <span
              aria-hidden="true"
              className="text-[#f5f0e6]/45 select-none"
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
