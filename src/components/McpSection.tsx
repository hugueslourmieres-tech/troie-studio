import Link from "next/link";
import { Reveal } from "./Reveal";
import { HeroMcpFlow } from "./HeroMcpFlow";
import { GreekMark } from "./GreekMark";
import { Term } from "./Term";

/* La section était monolingue : tout son texte partait en français sur /en.
   L'infobulle du glossaire (Term) suit d'elle-même la langue de la page. */
const COPY = {
  fr: {
    label: "Le protocole MCP",
    title: "L'IA, branchée sur vos outils.",
    p1a: "Le ",
    p1b: " (Model Context Protocol) est le standard qui relie les intelligences artificielles à vos outils. Vos IA (ChatGPT, Claude, Gemini, Copilot, Perplexity) ne répondent plus dans le vide : elles lisent et agissent directement dans Google, Meta, HubSpot, Notion, Shopify, WordPress.",
    p2: "Concrètement, elles passent du conseil à l'action : créer, mettre à jour, relancer, publier, le tout en sécurité et sous votre supervision. C'est ce qui transforme un assistant en véritable collaborateur.",
    ctaPrimary: "Déployer l'IA dans vos outils",
    ctaSecondary: "Se former aux agents IA",
  },
  en: {
    label: "The MCP protocol",
    title: "AI, plugged into your tools.",
    p1a: "",
    p1b: " (Model Context Protocol) is the standard that connects AI to your tools. Your AIs (ChatGPT, Claude, Gemini, Copilot, Perplexity) no longer answer in a vacuum: they read and act directly in Google, Meta, HubSpot, Notion, Shopify, WordPress.",
    p2: "Concretely, they go from advice to action: create, update, follow up, publish, all of it safely and under your supervision. That is what turns an assistant into a real coworker.",
    ctaPrimary: "Deploy AI into your tools",
    ctaSecondary: "Learn AI agents",
  },
} as const;

/**
 * Section MCP : explique le Model Context Protocol (à quoi ça sert) et montre
 * le schéma "LLM → MCP → vos outils". Fond beige (comme les sections au-dessus),
 * CTA orange.
 */
export function McpSection({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <GreekMark label={c.label} />
            <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {c.title}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {c.p1a}
              <Term id="mcp">MCP</Term>
              {c.p1b}
            </p>
            <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {c.p2}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/ia"
                className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
              >
                {c.ctaPrimary}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="https://troie.app/formation"
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2.5 border-b border-[var(--fg-2)]/40 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
              >
                {c.ctaSecondary}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Schéma : des LLM aux outils digitaux, via le connecteur MCP */}
        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-20">
            <HeroMcpFlow />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
