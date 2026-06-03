import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { AGENTS } from "@/lib/data/agents";

/**
 * AgentsTeaser — home block introducing the 3 agents of antiquity.
 *
 * Layout mirrors the /agents hero exactly : eyebrow → big Bodoni title →
 * description paragraph → secondary link. Below that a 3-column grid of
 * cream boxes (each = one agent : portrait, name, title, mission, filled
 * CTA). The whole section sits on orange Hermès — the cream cards pop
 * against it like a Hermès gift box on a paper bag.
 *
 * The wrapping <div tone-accent /> in app/[locale]/page.tsx flips
 * --bg, --fg and --accent so every utility inside this component
 * (t-eyebrow, border-[var(--accent)], hover:text-[var(--accent)])
 * resolves to ink on orange automatically.
 */
export function AgentsTeaser({
  locale,
  lang,
}: {
  locale: string;
  lang: "fr" | "en";
}) {
  const t = useTranslations("home");

  const tCardMission = (slug: "hermes" | "achille" | "hestia") => {
    const map = {
      hermes: t("agentsCard01Mission"),
      achille: t("agentsCard02Mission"),
      hestia: t("agentsCard03Mission"),
    };
    return map[slug];
  };
  const tCardTitle = (slug: "hermes" | "achille" | "hestia") => {
    const map = {
      hermes: t("agentsCard01Title"),
      achille: t("agentsCard02Title"),
      hestia: t("agentsCard03Title"),
    };
    return map[slug];
  };

  return (
    <section
      id="agents"
      className="border-t border-[var(--accent)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        {/* Header — single column, same baseline as /agents hero */}
        <Reveal>
          <p className="t-eyebrow">{t("agentsEyebrow")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="t-display mt-8 max-w-4xl text-5xl text-[var(--fg)] md:text-7xl lg:text-[88px]">
            {t("agentsTitle")}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg">
            {t("agentsIntro")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            href={`/${locale}/agents`}
            className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:opacity-70"
          >
            {t("agentsCta")}
            <span
              aria-hidden="true"
              className="transition group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        {/* 3 transparent boxes, séparées par des filets ink 1px (gap-px sur
            fond rule-color), exactly the same grammar as the "Le studio"
            section. The box bg matches the section bg so the boxes "disappear"
            into the orange — only the hairline dividers and the content
            structure remain. */}
        <Reveal delay={0.4}>
          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-3">
            {AGENTS.map((a) => (
              <Link
                key={a.slug}
                href={`/${locale}/agents#${a.slug}`}
                aria-label={`${a.name[lang]}, ${a.title[lang]}`}
                className="group relative flex h-full flex-col bg-[var(--bg)] p-8 transition-colors hover:bg-[var(--bg-2)] md:p-10"
              >
                {/* Photo edge-to-edge inside the box, hover reveals
                    an editorial "CHOISIR [NAME] →" overlay centred on
                    the engraving. */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.photo.src}
                    alt={a.photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{
                      filter:
                        "grayscale(1) brightness(0.97) contrast(1.04)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-[var(--fg)]/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] md:text-[12px]">
                      {t("agentsCardCta")} {a.name[lang]}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>

                {/* Name + title + mission + inline CTA */}
                <div className="mt-8 flex flex-1 flex-col">
                  <h3 className="t-display text-3xl text-[var(--fg)] md:text-4xl">
                    {a.name[lang]}
                  </h3>
                  <p className="mt-3 text-base italic text-[var(--fg-2)]/85 md:text-lg">
                    {tCardTitle(a.slug)}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {tCardMission(a.slug)}
                  </p>

                  {/* CTA inline mono caps with underline — same as Le studio */}
                  <span className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition">
                    <span className="border-b border-[var(--rule-strong)] pb-0.5">
                      {t("agentsCardCta")} {a.name[lang]}
                    </span>{" "}
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
