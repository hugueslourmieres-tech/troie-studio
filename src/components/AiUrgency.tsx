import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { OfficialEmblems } from "./OfficialEmblems";
import { GreekMark } from "./GreekMark";

/** Les outils IA que les équipes utilisent déjà (donc : déployeur AI Act). */
const AI_TOOLS = [
  { src: "/images/logos/claude.svg", label: "Claude" },
  { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
  { src: "/images/logos/gemini.svg", label: "Gemini" },
  { src: "/images/logos/perplexity.svg", label: "Perplexity" },
  { src: "/images/logos/copilot.svg", label: "Copilot" },
];

/** Décryptage officiel (entreprises.gouv.fr) : qui est concerné par l'AI Act. */
const SOURCE_URL =
  "https://www.entreprises.gouv.fr/decryptages-de-nos-experts/le-reglement-europeen-sur-lintelligence-artificielle-publics-concernes";

const COPY = {
  fr: {
    eyebrow: "Conformité, échéance 2 août 2026",
    title: "AI Act : vous êtes concerné.",
    body: "Le règlement européen sur l'IA concerne toute organisation qui fournit, importe, distribue ou déploie des systèmes d'IA, même via des outils gratuits. Depuis février 2025, il demande d'agir sur les compétences IA des équipes. Le 2 août 2026, les autorités peuvent contrôler et sanctionner.",
    ctaPrimary: "Se former sur l'AI Act",
    ctaSecondary: "S'informer sur l'AI Act",
    meta: "Obligation en vigueur depuis février 2025",
    sourceLabel: "Le texte officiel",
    toolsLabel: "Vos équipes utilisent déjà ces outils",
    articleSlug: "ai-act-controlable-2-aout-2026",
  },
  en: {
    eyebrow: "Compliance, August 2, 2026",
    title: "The EU AI Act concerns you.",
    body: "The EU AI regulation applies to any organisation that provides, imports, distributes or deploys AI systems, even through free tools. Since February 2025, it asks organisations to act on their teams' AI literacy. On August 2, 2026, authorities can audit and sanction.",
    ctaPrimary: "Train on the AI Act",
    ctaSecondary: "Learn about the AI Act",
    meta: "In force since February 2025",
    sourceLabel: "The official regulation",
    toolsLabel: "Your teams already use these tools",
    articleSlug: "ai-act-controlable-2-aout-2026",
  },
} as const;

/**
 * Section "AI Act" : le hook conformité, fond noir dramatique. Rappelle
 * l'obligation de former les équipes à l'IA (échéance 2 août 2026) et
 * pousse à s'informer puis à se former. Ton TROIE : phrases courtes.
 */
export function AiUrgency({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--accent)] bg-[var(--ink)] text-[#f5f0e6]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          {/* Illustration */}
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#ece4d6]">
              <Image
                src="/images/ai-urgency-robot.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Texte */}
          <div className="md:col-span-7">
            <Reveal>
              <GreekMark
                letter="Α"
                label={c.eyebrow}
                letterClassName="text-[2.4rem] leading-[0.7] md:text-[2.9rem] text-[var(--accent)]"
                labelClassName="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-display mt-8 text-4xl leading-[1.05] text-[#f5f0e6] md:text-5xl lg:text-6xl">
                {c.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#f5f0e6]/70 md:text-lg">
                {c.body}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="https://troie.app/formation"
                  target="_blank"
                  rel="noopener"
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-[var(--accent)] py-4 pl-8 pr-16 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6]"
                >
                  {c.ctaPrimary}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/brand/certif-badge.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-9 w-auto -translate-y-1/2"
                  />
                </a>
                <Link
                  href={`/${locale}/blog/${c.articleSlug}`}
                  className="group inline-flex items-center gap-2.5 border-b border-[#f5f0e6]/40 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6]/85 transition-colors hover:border-[#f5f0e6] hover:text-[#f5f0e6]"
                >
                  {c.ctaSecondary}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
                <OfficialEmblems url={SOURCE_URL} />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/45">
                  {c.meta}
                  {", "}
                  <a
                    href={SOURCE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-[#f5f0e6]/30 underline-offset-2 transition-colors hover:text-[#f5f0e6] hover:decoration-[#f5f0e6]"
                  >
                    {c.sourceLabel} →
                  </a>
                </p>
              </div>
            </Reveal>

            {/* Les outils que les équipes utilisent déjà, logos blancs */}
            <Reveal delay={0.4}>
              <div className="mt-12 border-t border-[#f5f0e6]/12 pt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e6]/40">
                  {c.toolsLabel}
                </p>
                <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {AI_TOOLS.map((tool) => (
                    <li
                      key={tool.src}
                      title={tool.label}
                      className="flex h-6 items-center opacity-70 transition-opacity duration-300 hover:opacity-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tool.src}
                        alt={tool.label}
                        loading="lazy"
                        className="h-6 w-auto"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
