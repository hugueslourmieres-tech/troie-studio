"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { HeroVideo } from "./HeroVideo";
import { ToolsMarquee } from "./ToolsMarquee";
import { useMagnetic } from "@/lib/hooks/useMagnetic";

/**
 * Hero — cream / orange tone, single supporting slideshow on the right.
 * GSAP signature work: title reveal (word-by-word from below), magnetic
 * CTAs, and a soft scroll-driven parallax that lifts the slideshow up
 * as the visitor leaves the hero.
 */
export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("home");

  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.3);
  const secondaryCtaRef = useMagnetic<HTMLAnchorElement>(0.22);
  const slideshowRef = useRef<HTMLDivElement | null>(null);

  // Parallax: slideshow lifts up softly as you scroll past the hero.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = slideshowRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const lines = t("heroTitle").split("\n");

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg)]">
      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 gap-12 px-6 pt-36 pb-24 md:grid-cols-12 md:gap-16 md:px-12 md:pt-44 md:pb-32">
        {/* Text column */}
        <div className="flex flex-col justify-end md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="t-eyebrow"
          >
            {t("heroEyebrow")}
          </motion.p>

          <h1 className="t-display mt-10 text-5xl text-[var(--fg)] md:text-7xl lg:text-[104px]">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            <Link
              ref={primaryCtaRef}
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] will-change-transform"
            >
              {t("heroCtaPrimary")}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              ref={secondaryCtaRef}
              href="#works"
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)] will-change-transform"
            >
              {t("heroCtaSecondary")}
            </Link>
          </motion.div>
        </div>

        {/* Video column — single editorial frame in the same `--rule` ink
            hairline as the "Le studio" boxes : border outside, horizontal
            divider between the video and the CTA row, no fill. Parallax
            on scroll still lifts the whole frame. */}
        <div className="flex md:col-span-5">
          <motion.div
            ref={slideshowRef}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full flex-col border border-[var(--rule)]"
          >
            {/* Video — fills frame edge-to-edge, no padding */}
            <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden md:h-[560px]">
              <HeroVideo />
            </div>

            {/* CTA + meta inside the same frame, separated by a thin rule */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] px-5 py-4 md:px-7 md:py-5">
              <Link
                href={`/${locale}#works`}
                className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:opacity-70"
              >
                {t("heroVideoCta")}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg)]/55">
                {t("heroVideoMeta")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tools marquee — infinite ribbon of the apps & tools the atelier uses */}
      <ToolsMarquee ariaLabel={t("heroToolsAriaLabel")} />
    </section>
  );
}
