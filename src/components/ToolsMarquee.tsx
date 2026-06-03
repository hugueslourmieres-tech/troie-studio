"use client";

/**
 * ToolsMarquee — infinite horizontal scroller of the apps & tools the
 * atelier uses. Editorial mono caps, faded dot separators, pauses on hover.
 *
 * Loop trick: the list is duplicated and the CSS animation translates the
 * track by -50%. Because the first half and second half are identical, the
 * jump back to 0% is invisible.
 */

const TOOLS: string[] = [
  // LLM & IA conversationnelle
  "Claude",
  "ChatGPT",
  "Mistral",
  "Gemini",
  "Perplexity",
  // Image & vidéo IA
  "Midjourney",
  "Sora",
  "Veo",
  "Runway",
  // Création
  "Adobe Photoshop",
  "Adobe Premiere",
  "Adobe Lightroom",
  "DaVinci Resolve",
  "Capture One",
  "Figma",
  // Automatisation & agents
  "Make",
  "n8n",
  "Zapier",
  // Stratégie & marketing
  "Google Analytics",
  "Meta Business",
  "HubSpot",
  "Pipedrive",
  "Semrush",
  "Ahrefs",
  // Production & ops
  "Notion",
  "Shopify",
  "Stripe",
  "Vercel",
  "Resend",
  "Cal.com",
];

export function ToolsMarquee({ ariaLabel }: { ariaLabel: string }) {
  // Duplicate for a seamless loop. The CSS keyframe goes from 0 to -50%.
  const doubled = [...TOOLS, ...TOOLS];

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="relative w-full overflow-hidden border-t border-b border-[var(--fg)]/15 bg-[var(--bg)]"
    >
      {/* Edge fades — keep the marquee feeling boundless */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-32"
      />

      <div className="t-marquee flex w-max items-center gap-10 py-5 md:gap-14 md:py-6">
        {doubled.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="flex shrink-0 items-center gap-10 font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg-2)]/80 md:gap-14"
          >
            <span>{tool}</span>
            <span aria-hidden="true" className="text-[var(--accent)]/70">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
