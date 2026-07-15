import Link from "next/link";
import { Reveal } from "./Reveal";
import { HeroMcpFlow } from "./HeroMcpFlow";
import { GreekMark } from "./GreekMark";
import { Term } from "./Term";

/**
 * Section MCP : explique le Model Context Protocol (à quoi ça sert) et montre
 * le schéma "LLM → MCP → vos outils". Fond beige (comme les sections au-dessus),
 * CTA orange.
 */
export function McpSection() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <GreekMark letter="Γ" label="Le protocole MCP" />
            <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              L&apos;IA, branchée sur vos outils.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              Le <Term id="mcp">MCP</Term> (Model Context Protocol) est le
              standard qui relie les intelligences artificielles à vos outils.
              Vos IA (ChatGPT, Claude, Gemini, Copilot, Perplexity) ne répondent
              plus dans le vide : elles lisent et agissent directement dans
              Google, Meta, HubSpot, Notion, Shopify, WordPress.
            </p>
            <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              Concrètement, elles passent du conseil à l&apos;action : créer, mettre
              à jour, relancer, publier, le tout en sécurité et sous votre
              supervision. C&apos;est ce qui transforme un assistant en véritable
              collaborateur.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/ia"
                className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
              >
                Déployer l&apos;IA dans vos outils
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="https://troie.app/formation"
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2.5 border-b border-[var(--fg-2)]/40 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
              >
                Se former aux agents IA
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
