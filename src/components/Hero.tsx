"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { HeroVideo } from "./HeroVideo";
import { ToolsMarquee } from "./ToolsMarquee";
import { RollText } from "./RollText";
import { useMagnetic } from "@/lib/hooks/useMagnetic";

/**
 * Hero : texte à gauche (titre qui s'écrit + deux parcours formation IA),
 * cadre vidéo éditorial à droite avec parallax au scroll.
 */
export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.3);
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

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg)]">
      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 gap-12 px-6 pt-36 pb-24 md:grid-cols-12 md:gap-16 md:px-12 md:pt-44 md:pb-32">
        {/* Text column */}
        <div className="flex flex-col justify-center md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="t-eyebrow"
          >
            {t("heroEyebrow")}
          </motion.p>

          <h1 className="t-display mt-8 text-balance text-[58px] leading-[1.04] text-[var(--fg)] md:text-[72px] lg:text-[86px]">
            {"Stratégie, Création & Formation."}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col gap-4"
          >
            {/* Amorce + deux parcours formation IA */}
            <p className="text-sm text-[#111318] font-medium">
              {t("heroLead")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                ref={primaryCtaRef}
                href="/formations"
                className="text-sm group inline-flex items-center justify-center gap-3 bg-[var(--ink)] px-8 py-5 text-[#fcfcfd] transition-colors will-change-transform font-medium"
              >
                <RollText
                  top={<>{t("heroCtaProject")}</>}
                  bottom={
                    <span className="text-[#2f5bd3]">
                      {t("heroCtaProject")}
                    </span>
                  }
                />
                <span aria-hidden="true" className="transition group-hover:translate-x-1 group-hover:text-[#2f5bd3]">
                  →
                </span>
              </Link>
              <Link
                href="/ia"
                className="text-sm group inline-flex items-center justify-center gap-3 border border-[#111318] px-8 py-5 text-[#111318] transition-colors hover:bg-[var(--ink)] font-medium"
              >
                <RollText
                  top={<>{t("heroCtaCourses")}</>}
                  bottom={
                    <span className="text-[#fcfcfd]">{t("heroCtaCourses")}</span>
                  }
                />
                <span aria-hidden="true" className="transition group-hover:translate-x-1 group-hover:text-[#fcfcfd]">
                  →
                </span>
              </Link>
            </div>
            <p className="text-sm text-[#111318]/70 font-medium">
              {t("heroMicro")}
            </p>
          </motion.div>
        </div>

        {/* Vidéo column, single éditorial frame in the same `--rule` ink
            hairline as the "Le studio" boxes : border outside, horizontal
            divider between the vidéo and the CTA row, no fill. Parallax
            on scroll still lifts the whole frame. */}
        <div className="flex items-center md:col-span-5">
          <motion.div
            ref={slideshowRef}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full flex-col border border-[var(--rule)]"
          >
            {/* Vidéo, fills frame edge-to-edge, no padding */}
            <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden md:h-[560px]">
              <HeroVideo />
            </div>

            {/* CTA + meta inside the same frame, separated by a thin rule */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] px-5 py-4 md:px-7 md:py-5">
              <Link
                href={`/${locale}#works`}
                className="text-sm group inline-flex items-center gap-3 text-[var(--fg)] transition-colors hover:opacity-70 font-medium"
              >
                {t("heroVideoCta")}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <span className="text-sm text-[var(--fg)]/55 font-medium">
                {t("heroVideoMeta")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tools marquee, infinite ribbon of the apps & tools the atelier uses */}
      <ToolsMarquee ariaLabel={t("heroToolsAriaLabel")} />
    </section>
  );
}
