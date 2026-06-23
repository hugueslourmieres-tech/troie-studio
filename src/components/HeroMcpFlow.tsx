/**
 * HeroMcpFlow : schéma "arborescence" animé du hero.
 * En haut, les LLM. Les lignes convergent vers un noeud central MCP, puis se
 * ramifient par catégorie : chaque hub (Google, Meta, CRM, Web) se développe
 * en ses applications (Google -> Gmail, GA4, Ads, Drive, etc.). Un flux animé
 * descend des LLM vers les apps. Desktop large + mobile empilé.
 */

const LLMS = [
  { name: "Claude", logo: "/images/logos/claude.svg" },
  { name: "ChatGPT", logo: "/images/logos/chatgpt.svg" },
  { name: "Gemini", logo: "/images/logos/gemini.svg" },
  { name: "Copilot", logo: "/images/logos/copilot.svg" },
  { name: "Perplexity", logo: "/images/logos/perplexity.svg" },
];

type Cat = { label: string; apps: { name: string; logo: string }[] };

const CATS: Cat[] = [
  {
    label: "Google",
    apps: [
      { name: "Gmail", logo: "/images/logos/gmail.svg" },
      { name: "Google Analytics", logo: "/images/logos/googleanalytics.svg" },
      { name: "Google Ads", logo: "/images/logos/google-ads.svg" },
      { name: "Google Drive", logo: "/images/logos/googledrive.svg" },
    ],
  },
  {
    label: "Meta",
    apps: [
      { name: "Facebook", logo: "/images/logos/facebook.svg" },
      { name: "Instagram", logo: "/images/logos/instagram.svg" },
      { name: "WhatsApp", logo: "/images/logos/whatsapp.svg" },
    ],
  },
  {
    label: "CRM & ventes",
    apps: [
      { name: "HubSpot", logo: "/images/logos/hubspot.svg" },
      { name: "Salesforce", logo: "/images/logos/salesforce.svg" },
      { name: "LinkedIn", logo: "/images/logos/linkedin.svg" },
    ],
  },
  {
    label: "Web & contenu",
    apps: [
      { name: "WordPress", logo: "/images/logos/wordpress.svg" },
      { name: "Shopify", logo: "/images/logos/shopify.svg" },
      { name: "Notion", logo: "/images/logos/notion.svg" },
    ],
  },
];

const INK = "#1a1714";
const CREAM = "#f6efe1";
const ARIA =
  "Les LLM (Claude, ChatGPT, Gemini, Copilot, Perplexity) pilotent, via le connecteur MCP, vos outils par catégorie : Google (Gmail, Analytics, Ads, Drive), Meta (Facebook, Instagram, WhatsApp), CRM (HubSpot, Salesforce, LinkedIn), Web et contenu (WordPress, Shopify, Notion).";

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

function curve(x1: number, y1: number, x2: number, y2: number) {
  const my = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}

/* ── Desktop : LLM -> MCP -> 4 catégories en colonnes -> apps ── */
function Desktop() {
  const W = 1240;
  const H = 700;
  const cx = W / 2;
  const llmY = 64;
  const topY = 196;
  const mcpY = 248;
  const botY = 300;
  const catY = 404; // label catégorie
  const appY = 540;
  const llmX = (i: number) => (W * (i + 0.5)) / LLMS.length;
  const colX = (i: number) => (W * (i + 0.5)) / CATS.length;

  const lines: string[] = [];
  LLMS.forEach((_, i) => lines.push(curve(llmX(i), llmY + 28, cx, topY)));
  CATS.forEach((cat, i) => {
    const cX = colX(i);
    lines.push(curve(cx, botY, cX, catY - 34));
    const n = cat.apps.length;
    const gap = 74;
    cat.apps.forEach((_, j) => {
      const ax = cX + (j - (n - 1) / 2) * gap;
      lines.push(curve(cX, catY + 16, ax, appY - 26));
    });
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ARIA}>
      <g fill="none" stroke={INK} strokeLinecap="round">
        <g strokeOpacity={0.18} strokeWidth={1.3}>
          {lines.map((d, i) => (<path key={i} d={d} />))}
          <line x1={cx} y1={topY} x2={cx} y2={botY} />
        </g>
        <g strokeOpacity={0.8} strokeWidth={1.6} className="mcp-flow">
          {lines.map((d, i) => (<path key={i} d={d} />))}
          <line x1={cx} y1={topY} x2={cx} y2={botY} />
        </g>
      </g>

      <circle cx={cx} cy={topY} r={4} fill={INK} />
      <circle cx={cx} cy={botY} r={4} fill={INK} />

      {LLMS.map((l, i) => (<Logo key={l.name} x={llmX(i)} y={llmY} logo={l.logo} s={36} />))}

      {/* Pastille MCP */}
      <g className="mcp-pulse">
        <rect x={cx - 56} y={mcpY - 22} width={112} height={44} rx={22} fill={INK} />
        <text x={cx} y={mcpY} textAnchor="middle" dominantBaseline="central" fill={CREAM}
          style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "19px", letterSpacing: "0.22em", fontWeight: 600 }}>MCP</text>
      </g>

      {/* Catégories + apps */}
      {CATS.map((cat, i) => {
        const cX = colX(i);
        const n = cat.apps.length;
        const gap = 74;
        return (
          <g key={cat.label}>
            <circle cx={cX} cy={catY - 34} r={3} fill={INK} />
            <text x={cX} y={catY} textAnchor="middle" fill={INK}
              style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "12px", letterSpacing: "0.26em", fontWeight: 600, textTransform: "uppercase" }}>
              {cat.label}
            </text>
            {cat.apps.map((app, j) => (
              <Logo key={app.name} x={cX + (j - (n - 1) / 2) * gap} y={appY} logo={app.logo} s={32} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Mobile : LLM -> MCP -> 4 catégories empilées (label + apps) ── */
function Mobile() {
  const W = 384;
  const cx = W / 2;
  const llmY = 56;
  const topY = 172;
  const mcpY = 222;
  const botY = 272;
  const bandTop = 372;
  const bandH = 196;
  const llmX = (i: number) => (W * (i + 0.5)) / LLMS.length;
  const labelY = (i: number) => bandTop + i * bandH;
  const appY = (i: number) => labelY(i) + 86;
  const H = labelY(CATS.length - 1) + 86 + 60;

  const lines: string[] = [];
  LLMS.forEach((_, i) => lines.push(curve(llmX(i), llmY + 24, cx, topY)));
  CATS.forEach((cat, i) => {
    const ly = labelY(i);
    const prevY = i === 0 ? botY : labelY(i - 1) + 16;
    lines.push(`M ${cx} ${prevY} L ${cx} ${ly - 30}`); // trunk vertical
    const n = cat.apps.length;
    const gap = 82;
    cat.apps.forEach((_, j) => {
      const ax = cx + (j - (n - 1) / 2) * gap;
      lines.push(curve(cx, ly + 14, ax, appY(i) - 26));
    });
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ARIA}>
      <g fill="none" stroke={INK} strokeLinecap="round">
        <g strokeOpacity={0.18} strokeWidth={1.3}>
          {lines.map((d, i) => (<path key={i} d={d} />))}
          <line x1={cx} y1={topY} x2={cx} y2={botY} />
        </g>
        <g strokeOpacity={0.8} strokeWidth={1.6} className="mcp-flow">
          {lines.map((d, i) => (<path key={i} d={d} />))}
          <line x1={cx} y1={topY} x2={cx} y2={botY} />
        </g>
      </g>

      <circle cx={cx} cy={topY} r={4} fill={INK} />
      <circle cx={cx} cy={botY} r={4} fill={INK} />
      {LLMS.map((l, i) => (<Logo key={l.name} x={llmX(i)} y={llmY} logo={l.logo} s={34} />))}

      <g className="mcp-pulse">
        <rect x={cx - 52} y={mcpY - 20} width={104} height={40} rx={20} fill={INK} />
        <text x={cx} y={mcpY} textAnchor="middle" dominantBaseline="central" fill={CREAM}
          style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "17px", letterSpacing: "0.22em", fontWeight: 600 }}>MCP</text>
      </g>

      {CATS.map((cat, i) => {
        const ly = labelY(i);
        const n = cat.apps.length;
        const gap = 82;
        return (
          <g key={cat.label}>
            <circle cx={cx} cy={ly - 30} r={3} fill={INK} />
            <text x={cx} y={ly} textAnchor="middle" fill={INK}
              style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "12px", letterSpacing: "0.26em", fontWeight: 600, textTransform: "uppercase" }}>
              {cat.label}
            </text>
            {cat.apps.map((app, j) => (
              <Logo key={app.name} x={cx + (j - (n - 1) / 2) * gap} y={appY(i)} logo={app.logo} s={36} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function HeroMcpFlow() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="hidden md:block"><Desktop /></div>
      <div className="md:hidden"><Mobile /></div>
    </div>
  );
}
