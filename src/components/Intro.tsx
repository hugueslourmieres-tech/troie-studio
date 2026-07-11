"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "./Reveal";
import { LetterReveal } from "./LetterReveal";
import { AiToolsMarquee } from "./AiToolsMarquee";
import { Parallax } from "./Parallax";

type Tool = { src: string; label: string };

type Métier = {
  index: string;
  slug: "creation" | "strategy" | "training";
  video: string;
  videoAlt: string;
  /** Page dédiée du métier (sous /[locale]). */
  path: string;
  tools: Tool[];
};

// Vidéos + outils sourcés depuis /public/images/{vidéos,logos}.
// Les logos sont en SVG monochrome, posés avec un filtre brightness(0)
// pour rester noirs en tout cas, et une opacité réduite pour rester discrets.
// Ordre arbitré (juillet 2026) : la formation IA d'abord, la création en
// cross-sell. Les numéros affichés vivent dans les eyebrows i18n.
const METIERS: Métier[] = [
  {
    index: "01",
    slug: "training",
    video: "/images/videos/formation.mp4",
    videoAlt: "Formation, vidéo d'illustration",
    path: "/formations",
    tools: [
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/gemini.svg", label: "Gemini" },
      { src: "/images/logos/perplexity.svg", label: "Perplexity" },
      { src: "/images/logos/make.svg", label: "Make" },
      { src: "/images/logos/copilot.svg", label: "Copilot" },
    ],
  },
  {
    index: "02",
    slug: "strategy",
    video: "/images/videos/strategy.mp4",
    videoAlt: "Stratégie, vidéo d'illustration",
    path: "strategie",
    tools: [
      { src: "/images/logos/google-analytics.svg", label: "Google Analytics" },
      { src: "/images/logos/google-ads.svg", label: "Google Ads" },
      { src: "/images/logos/meta.svg", label: "Meta" },
      { src: "/images/logos/hubspot.svg", label: "HubSpot" },
      { src: "/images/logos/semrush.svg", label: "Semrush" },
    ],
  },
  {
    index: "03",
    slug: "creation",
    video: "/images/videos/creation.mp4",
    videoAlt: "Création, vidéo d'illustration",
    path: "creation",
    tools: [
      { src: "/images/logos/adobe.svg", label: "Adobe" },
      { src: "/images/logos/figma.svg", label: "Figma" },
      { src: "/images/logos/davinci-resolve.svg", label: "DaVinci Resolve" },
      { src: "/images/logos/midjourney.svg", label: "Midjourney" },
      { src: "/images/logos/runway.svg", label: "Runway" },
    ],
  },
];

/**
 * Intro, section "Un studio. Trois métiers."
 * Fond orange Hermès, 3 boxes encadrant un guerrier illustrant chaque metier.
 * Chaque box est cliquable et ancre vers la section détaillée plus bas.
 */
export function Intro({ asHero = false }: { asHero?: boolean }) {
  const t = useTranslations("home");

  return (
    <section className="relative">
      <div
        className={`mx-auto max-w-7xl px-6 md:px-12 ${
          asHero ? "pt-36 pb-28 md:pt-52 md:pb-40" : "py-28 md:py-40"
        }`}
      >
        {/* Header centré, intro éditoriale */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            {/* Embossed Greek warrior relief, tone-on-tone seal at the top */}
            <Parallax strength={28} className="mx-auto mb-12 flex w-full max-w-[220px] justify-center md:max-w-[260px]">
              <Image
                src="/images/brand/emboss.png"
                alt=""
                width={1140}
                height={1370}
                priority={false}
                sizes="(max-width: 768px) 220px, 260px"
                className="h-auto w-full"
              />
            </Parallax>
            <p className="t-eyebrow">{t("introEyebrow")}</p>
            {/* Titre : revient à la ligne mot par mot selon la largeur.
                Clamp calé pour un rendu net sur ordinateur et téléphone. */}
            {asHero ? (
              <h1
                className="t-display mx-auto mt-8 leading-[1.06] text-[var(--fg)] text-[clamp(1.3rem,6.3vw,3.4rem)] md:text-[clamp(3.3rem,5.2vw,5.9rem)]"
                aria-label={t("introTitle").replace(/\|/g, " ")}
              >
                {t("introTitle")
                  .split("|")
                  .map((line, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="block whitespace-nowrap"
                    >
                      <LetterReveal text={line} />
                    </span>
                  ))}
              </h1>
            ) : (
              <h2
                className="t-display mx-auto mt-8 max-w-[15ch] text-balance leading-[1.05] text-[var(--fg)] text-[clamp(2.4rem,8vw,4rem)] md:text-[clamp(3.4rem,5.4vw,5.9rem)]"
              >
                {t("introTitle").replace(/\|/g, " ")}
              </h2>
            )}
            <p className="mt-10 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {t("introBody")}
            </p>

            {/* CTA hero : audit gratuit (studio) + attestation AI Act (troie.app) */}
            {asHero && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <a
                  href="https://cal.com/troiestudio/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--bg-2)] hover:text-[var(--fg)]"
                >
                  {t("heroCtaAudit")}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="https://troie.app"
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-2.5 border-b-2 border-[var(--fg)] pb-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:opacity-70"
                >
                  {t("heroCtaAttestation")}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
              </div>
            )}
          </div>
        </Reveal>

        {/* Slider infini : les outils IA sur lesquels on forme */}
        {asHero && <AiToolsMarquee label="On vous forme sur ces outils" />}

        {/* 3 boxes, un guerrier par metier */}
        <div className="mt-20 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-28 md:grid-cols-3">
          {METIERS.map((m, i) => (
            <MetierBox key={m.slug} metier={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetierBox({ metier, index }: { metier: Métier; index: number }) {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      <Link
        href={metier.path.startsWith("/") ? metier.path : `/${locale}/${metier.path}`}
        className="group relative flex h-full flex-col bg-[var(--bg)] p-8 transition-colors hover:bg-[var(--bg-2)] md:p-10"
      >
        {/* Index + label (re-using the eyebrow which already reads "01 · Création") */}
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)]/60">
          {t(`${metier.slug}Eyebrow`)}
        </span>

        {/* Vidéo, autoplay loop muted, N&B */}
        <div className="relative mt-8 aspect-square w-full overflow-hidden bg-[var(--bg-2)]">
          <video
            src={metier.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={metier.videoAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ filter: "grayscale(1) brightness(0.96) contrast(1.06)" }}
          />
        </div>

        {/* Text */}
        <div className="mt-8 flex flex-1 flex-col">
          <h3 className="t-display text-3xl text-[var(--fg)] md:text-4xl">
            {t(`${metier.slug}Title`)}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
            {t(`${metier.slug}Body`)}
          </p>

          {/* Tool logos, monochrome, discrete, evenly sized */}
          <ToolsRow tools={metier.tools} />

          <span className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition group-hover:text-[var(--accent)]">
            <span className="border-b border-[var(--rule-strong)] pb-0.5 group-hover:border-[var(--accent)]">
              {t("introMore")}
            </span>{" "}
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * ToolsRow, rangée discrète de logos sur fond orange.
 * - Monochrome via filter brightness(0) (forcé noir pur même si le SVG
 *   est multicolore)
 * - Opacité 50 % par défaut, monte à 80 % au survol de la card
 * - Hauteur homogène 20 px, gap responsive
 * - Wrap si la rangée déborde sur mobile
 */
function ToolsRow({ tools }: { tools: Tool[] }) {
  return (
    <ul
      aria-label="Outils utilisés"
      className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--rule)] pt-6"
    >
      {tools.map((t) => (
        <li
          key={t.src}
          title={t.label}
          className="flex h-5 items-center opacity-50 transition-opacity duration-300 group-hover:opacity-80"
        >
          <img
            src={t.src}
            alt={t.label}
            loading="lazy"
            className="h-5 w-auto"
            style={{ filter: "brightness(0)" }}
          />
        </li>
      ))}
    </ul>
  );
}
