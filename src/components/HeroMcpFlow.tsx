/**
 * HeroMcpFlow : schéma "arborescence" du hero.
 * En haut, les LLM (Claude, ChatGPT, Gemini, Copilot, Perplexity). Les lignes
 * convergent vers un noeud central étiqueté MCP, puis se ramifient vers tous
 * les outils digitaux pilotés (Google, Meta, CRM, planning édito, Shopify,
 * WordPress). Que des logos. SVG unique pour un alignement parfait.
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

const W = 1120;
const H = 600;
const LLM_Y = 78;
const TOOL_Y = 522;
const TOP = { x: W / 2, y: 252 };
const BOT = { x: W / 2, y: 348 };
const COIN = 30; // rayon du jeton
const INK = "#1a1714";
const CREAM = "#f6efe1";

const llmX = (i: number) => (W * (i + 0.5)) / LLMS.length;
const toolX = (i: number) => (W * (i + 0.5)) / TOOLS.length;

function Coin({ x, y, logo, s = 30 }: { x: number; y: number; logo: string; s?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={COIN} fill={INK} stroke={CREAM} strokeOpacity={0.16} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image
        href={logo}
        x={x - s / 2}
        y={y - s / 2}
        width={s}
        height={s}
        style={{ filter: "brightness(0) invert(1)" }}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}

export function HeroMcpFlow() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Avec les LLM (Claude, ChatGPT, Gemini, Copilot, Perplexity) et le connecteur MCP, TROIE pilote et automatise vos outils digitaux : Google, Meta, CRM, planning éditorial, Shopify, WordPress."
      >
        {/* Lignes : LLM -> noeud haut */}
        <g fill="none" stroke={INK} strokeOpacity={0.4} strokeWidth={1.6} strokeLinecap="round">
          {LLMS.map((_, i) => (
            <path
              key={`u${i}`}
              d={`M ${llmX(i)} ${LLM_Y + COIN} C ${llmX(i)} ${LLM_Y + 110}, ${TOP.x} ${TOP.y - 78}, ${TOP.x} ${TOP.y}`}
            />
          ))}
          {/* Tronc */}
          <line x1={TOP.x} y1={TOP.y} x2={BOT.x} y2={BOT.y} strokeOpacity={0.55} />
          {/* Noeud bas -> outils */}
          {TOOLS.map((_, i) => (
            <path
              key={`d${i}`}
              d={`M ${BOT.x} ${BOT.y} C ${BOT.x} ${BOT.y + 78}, ${toolX(i)} ${TOOL_Y - 110}, ${toolX(i)} ${TOOL_Y - COIN}`}
            />
          ))}
        </g>

        {/* Noeuds */}
        <circle cx={TOP.x} cy={TOP.y} r={4.5} fill={INK} />
        <circle cx={BOT.x} cy={BOT.y} r={4.5} fill={INK} />

        {/* Jetons LLM */}
        {LLMS.map((l, i) => (
          <Coin key={l.name} x={llmX(i)} y={LLM_Y} logo={l.logo} />
        ))}
        {/* Jetons outils */}
        {TOOLS.map((tl, i) => (
          <Coin key={tl.name} x={toolX(i)} y={TOOL_Y} logo={tl.logo} s={tl.name === "Planning éditorial" ? 30 : 34} />
        ))}

        {/* Pastille MCP sur le tronc */}
        <g>
          <rect x={W / 2 - 56} y={300 - 22} width={112} height={44} rx={22} fill={INK} />
          <text
            x={W / 2}
            y={300}
            textAnchor="middle"
            dominantBaseline="central"
            fill={CREAM}
            style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "19px", letterSpacing: "0.22em", fontWeight: 600 }}
          >
            MCP
          </text>
        </g>
      </svg>
    </div>
  );
}
