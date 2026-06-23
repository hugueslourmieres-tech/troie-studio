/**
 * HeroMcpFlow : schéma "arborescence" animé du hero.
 * En haut, les LLM ; les lignes convergent vers un noeud central étiqueté MCP,
 * puis se ramifient (flux animé qui descend) vers les outils digitaux les plus
 * utilisés. Tout ne passe pas par un connecteur MCP natif : ce qui n'en a pas
 * (GA4, LinkedIn, TikTok...) est piloté par Claude via Chrome. Deux rangées
 * d'outils en quinconce. Géométrie desktop large + mobile compacte.
 */

const LLMS = [
  { name: "Claude", logo: "/images/logos/claude.svg" },
  { name: "ChatGPT", logo: "/images/logos/chatgpt.svg" },
  { name: "Gemini", logo: "/images/logos/gemini.svg" },
  { name: "Copilot", logo: "/images/logos/copilot.svg" },
  { name: "Perplexity", logo: "/images/logos/perplexity.svg" },
];

// Rangée avant (6) + rangée arrière en quinconce (5) = les outils les plus
// utilisés, toutes catégories (Google, social, CRM, e-commerce, CMS, no-code).
const TOOLS_A = [
  { name: "Gmail", logo: "/images/logos/gmail.svg" },
  { name: "Google Analytics", logo: "/images/logos/googleanalytics.svg" },
  { name: "Meta", logo: "/images/logos/meta.svg" },
  { name: "LinkedIn", logo: "/images/logos/linkedin.svg" },
  { name: "Shopify", logo: "/images/logos/shopify.svg" },
  { name: "WordPress", logo: "/images/logos/wordpress.svg" },
];
const TOOLS_B = [
  { name: "Instagram", logo: "/images/logos/instagram.svg" },
  { name: "TikTok", logo: "/images/logos/tiktok.svg" },
  { name: "HubSpot", logo: "/images/logos/hubspot.svg" },
  { name: "Notion", logo: "/images/logos/notion.svg" },
  { name: "Slack", logo: "/images/logos/slack.svg" },
];

const INK = "#1a1714";
const CREAM = "#f6efe1";
const ARIA =
  "Les LLM (Claude, ChatGPT, Gemini, Copilot, Perplexity) pilotent, via le connecteur MCP et Chrome, vos outils digitaux : Gmail, Google Analytics, Meta, Instagram, LinkedIn, TikTok, HubSpot, Notion, Slack, Shopify, WordPress.";

type Geo = {
  W: number;
  H: number;
  llmY: number;
  topY: number;
  botY: number;
  mcpY: number;
  toolAY: number;
  toolBY: number;
  logo: number;
  gap: number;
  mcpW: number;
  mcpH: number;
  font: number;
};

const DESKTOP: Geo = { W: 1120, H: 740, llmY: 80, topY: 250, botY: 342, mcpY: 296, toolAY: 540, toolBY: 670, logo: 38, gap: 28, mcpW: 112, mcpH: 44, font: 19 };
const MOBILE: Geo = { W: 384, H: 880, llmY: 64, topY: 244, botY: 404, mcpY: 324, toolAY: 620, toolBY: 800, logo: 40, gap: 26, mcpW: 100, mcpH: 40, font: 18 };

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
  const aX = (i: number) => (g.W * (i + 0.5)) / TOOLS_A.length; // 6 colonnes
  const bX = (i: number) => (g.W * (i + 1)) / TOOLS_A.length; // 5 intervalles (quinconce)

  const converge = (i: number) => {
    const sx = llmX(i);
    const sy = g.llmY + g.gap;
    const mid = (sy + g.topY) / 2;
    return `M ${sx} ${sy} C ${sx} ${mid}, ${cx} ${mid}, ${cx} ${g.topY}`;
  };
  const diverge = (x: number, y: number) => {
    const ey = y - g.gap;
    const mid = (g.botY + ey) / 2;
    return `M ${cx} ${g.botY} C ${cx} ${mid}, ${x} ${mid}, ${x} ${ey}`;
  };

  const Lines = () => (
    <>
      {LLMS.map((_, i) => (
        <path key={`l${i}`} d={converge(i)} />
      ))}
      <line x1={cx} y1={g.topY} x2={cx} y2={g.botY} />
      {TOOLS_A.map((_, i) => (
        <path key={`a${i}`} d={diverge(aX(i), g.toolAY)} />
      ))}
      {TOOLS_B.map((_, i) => (
        <path key={`b${i}`} d={diverge(bX(i), g.toolBY)} />
      ))}
    </>
  );

  return (
    <svg viewBox={`0 0 ${g.W} ${g.H}`} className="h-auto w-full" role="img" aria-label={ARIA}>
      <g fill="none" stroke={INK} strokeLinecap="round">
        <g strokeOpacity={0.2} strokeWidth={1.4}>
          <Lines />
        </g>
        <g strokeOpacity={0.82} strokeWidth={1.7} className="mcp-flow">
          <Lines />
        </g>
      </g>

      <circle cx={cx} cy={g.topY} r={4} fill={INK} />
      <circle cx={cx} cy={g.botY} r={4} fill={INK} />

      {LLMS.map((l, i) => (
        <Logo key={l.name} x={llmX(i)} y={g.llmY} logo={l.logo} s={g.logo} />
      ))}
      {TOOLS_A.map((tl, i) => (
        <Logo key={tl.name} x={aX(i)} y={g.toolAY} logo={tl.logo} s={g.logo} />
      ))}
      {TOOLS_B.map((tl, i) => (
        <Logo key={tl.name} x={bX(i)} y={g.toolBY} logo={tl.logo} s={g.logo} />
      ))}

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
