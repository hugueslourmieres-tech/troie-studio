import { Reveal } from "./Reveal";
import { HeroMcpFlow } from "./HeroMcpFlow";

/**
 * Section MCP : explique le Model Context Protocol (à quoi ça sert) et montre
 * le schéma "LLM → MCP → vos outils". Placée juste avant la preuve clients.
 */
export function McpSection() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <p className="t-eyebrow">Le protocole MCP</p>
            <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              L&apos;IA, branchée sur vos outils.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              Le MCP (Model Context Protocol) est le standard qui relie les
              intelligences artificielles à vos outils. Vos IA (ChatGPT, Claude,
              Gemini, Copilot, Perplexity) ne répondent plus dans le vide : elles
              lisent et agissent directement dans Google, Meta, HubSpot, Notion,
              Shopify, WordPress.
            </p>
            <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              Concrètement, elles passent du conseil à l&apos;action : créer, mettre
              à jour, relancer, publier, le tout en sécurité et sous votre
              supervision. C&apos;est ce qui transforme un assistant en véritable
              collaborateur.
            </p>
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
