/**
 * Slider infini des outils IA sur lesquels TROIE forme.
 * Logos monochromes + nom, défilement continu (pause au survol),
 * liste doublée pour la boucle sans couture. Réutilise .t-marquee
 * (globals.css), désactivé si prefers-reduced-motion.
 */

type Tool = { src: string; name: string };

const AI_TOOLS: Tool[] = [
  { src: "/images/logos/chatgpt.svg", name: "ChatGPT" },
  { src: "/images/logos/claude.svg", name: "Claude" },
  { src: "/images/logos/gemini.svg", name: "Gemini" },
  { src: "/images/logos/mistral.svg", name: "Mistral" },
  { src: "/images/logos/perplexity.svg", name: "Perplexity" },
  { src: "/images/logos/copilot.svg", name: "Copilot" },
  { src: "/images/logos/midjourney.svg", name: "Midjourney" },
  { src: "/images/logos/runway.svg", name: "Runway" },
  { src: "/images/logos/elevenlabs.svg", name: "ElevenLabs" },
  { src: "/images/logos/huggingface.svg", name: "Hugging Face" },
  { src: "/images/logos/make.svg", name: "Make" },
  { src: "/images/logos/notion.svg", name: "Notion" },
];

export function AiToolsMarquee({ label }: { label?: string }) {
  const loop = [...AI_TOOLS, ...AI_TOOLS];

  return (
    <div className="mt-16 md:mt-20">
      {label && (
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]/55">
          {label}
        </p>
      )}
      <div
        className="group/mq relative mt-6 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <ul
          className="t-marquee flex w-max items-center [animation-duration:38s] group-hover/mq:[animation-play-state:paused]"
          aria-label="Outils IA enseignés par TROIE"
        >
          {loop.map((tool, i) => (
            <li
              key={`${tool.name}-${i}`}
              className="mr-12 flex shrink-0 items-center gap-3 opacity-60 transition-opacity duration-300 hover:opacity-100 md:mr-16"
              aria-hidden={i >= AI_TOOLS.length}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.src}
                alt=""
                loading="lazy"
                className="h-6 w-auto md:h-7"
                style={{ filter: "brightness(0)" }}
              />
              <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg)] md:text-[12px]">
                {tool.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
