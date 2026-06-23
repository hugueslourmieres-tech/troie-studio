/**
 * HeroMcpFlow : schéma "arborescence" animé du hero.
 * En haut, les LLM ; les lignes convergent vers un noeud central étiqueté MCP,
 * puis se ramifient vers les outils digitaux pilotés. Un flux animé (pointillé
 * qui descend) montre que tout passe par le connecteur MCP.
 * Deux géométries : desktop (large) et mobile (compacte, plus verticale).
 */

const LLMS = [
  { name: "Claude", logo: "/images/logos/claude.svg" },
  { name: "ChatGPT", logo: "/images/logos/chatgpt.svg" },
  { name: "Gemini", logo: "/images/logos/gemini.svg" },
  { name: "Copilot", logo: "/images/logos/copilot.svg" },
  { name: "Perplexity", logo: "/images/logos/perplexity.svg" },
];

const TOOLS = [
  { name: "Google", logo: "/images/logos/google.svg" },
  { name: "Meta", logo: "/images/logos/meta.svg" },
  { name: "CRM", logo: "/images/logos/hubspot.svg" },
  { name: "Planning éditorial", logo: "/images/logos/notion.svg" },
  { name: "Shopify", logo: "/images/logos/shopify.svg" },
  { name: "WordPress", logo: "/images/logos/wordpress.svg" },
];

const INK = "#1a1714";
const CREAM = "#f6efe1";
const ARIA =
  "Avec les LLM (Claude, ChatGPT, Gemini, Copilot, Perplexity) et le connecteur MCP, TROIE pilote et automatise vos outils digitaux : Google, Meta, CRM, planning éditorial, Shopify, WordPress.";

type Geo = {
  W: number;
  H: number;
  llmY: number;
  toolY: number;
  topY: number;
  botY: number;
  mcpY: number;
  logo: number;
  gap: number; // distance logo-centre -> départ de ligne
  mcpW: number;
  mcpH: number;
  font: number;
};

const DESKTOP: Geo = { W: 1120, H: 600, llmY: 80, toolY: 520, topY: 252, botY: 348, mcpY: 300, logo: 40, gap: 30, mcpW: 112, mcpH: 44, font: 19 };
const MOBILE: Geo = { W: 384, H: 660, llmY: 66, toolY: 594, topY: 250, botY: 410, mcpY: 330, logo: 42, gap: 30, mcpW: 100, mcpH: 40, font: 18 };

function Logo({ x, y, logo, s }: { x: number; y: number; logo: string; s: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <image
      href={logo}
      x={x - s / 2}
      y={y - s / 2}
      width={s}
      height={s}
      style={{ filter: "brightness(0)", opacity: 0.82 }}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}

function Diagram(g: Geo) {
  const cx = g.W / 2;
  const llmX = (i: number) => (g.W * (i + 0.5)) / LLMS.length;
  const toolX = (i: number) => (g.W * (i + 0.5)) / TOOLS.length;

  const converge = (i: number) => {
    const sx = llmX(i);
    const sy = g.llmY + g.gap;
    const mid = (sy + g.topY) / 2;
    return `M ${sx} ${sy} C ${sx} ${mid}, ${cx} ${mid}, ${cx} ${g.topY}`;
  };
  const diverge = (i: number) => {
    const ex = toolX(i);
    const ey = g.toolY - g.gap;
    const mid = (g.botY + ey) / 2;
    return `M ${cx} ${g.botY} C ${cx} ${mid}, ${ex} ${mid}, ${ex} ${ey}`;
  };

  const Lines = () => (
    <>
      {LLMS.map((_, i) => (
        <path key={`l${i}`} d={converge(i)} />
      ))}
      <line x1={cx} y1={g.topY} x2={cx} y2={g.botY} />
      {TOOLS.map((_, i) => (
        <path key={`t${i}`} d={diverge(i)} />
      ))}
    </>
  );

  return (
    <svg viewBox={`0 0 ${g.W} ${g.H}`} className="h-auto w-full" role="img" aria-label={ARIA}>
      <g fill="none" stroke={INK} strokeLinecap="round">
        {/* Trace de fond, toujours visible */}
        <g strokeOpacity={0.22} strokeWidth={1.4}>
          <Lines />
        </g>
        {/* Flux animé (pointillé qui descend des LLM vers MCP puis les outils) */}
        <g strokeOpacity={0.85} strokeWidth={1.7} className="mcp-flow">
          <Lines />
        </g>
      </g>

      {/* Noeuds du tronc */}
      <circle cx={cx} cy={g.topY} r={4} fill={INK} />
      <circle cx={cx} cy={g.botY} r={4} fill={INK} />

      {/* Logos */}
      {LLMS.map((l, i) => (
        <Logo key={l.name} x={llmX(i)} y={g.llmY} logo={l.logo} s={g.logo} />
      ))}
      {TOOLS.map((tl, i) => (
        <Logo key={tl.name} x={toolX(i)} y={g.toolY} logo={tl.logo} s={g.logo} />
      ))}

      {/* Pastille MCP, pulse doux */}
      <g className="mcp-pulse">
        <rect x={cx - g.mcpW / 2} y={g.mcpY - g.mcpH / 2} width={g.mcpW} height={g.mcpH} rx={g.mcpH / 2} fill={INK} />
        <text
          x={cx}
          y={g.mcpY}
          textAnchor="middle"
          dominantBaseline="central"
          fill={CREAM}
          style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: `${g.font}px`, letterSpacing: "0.22em", fontWeight: 600 }}
        >
          MCP
        </text>
      </g>
    </svg>
  );
}

export function HeroMcpFlow() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="hidden md:block">{Diagram(DESKTOP)}</div>
      <div className="md:hidden">{Diagram(MOBILE)}</div>
    </div>
  );
}
