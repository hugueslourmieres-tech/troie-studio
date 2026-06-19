"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { HeroVideo } from "./HeroVideo";
import { ToolsMarquee } from "./ToolsMarquee";
import { RollText } from "./RollText";
import { WriteHeadline } from "./WriteHeadline";
import { useMagnetic } from "@/lib/hooks/useMagnetic";

/**
 * Hero : la vidéo de l'atelier en fond plein cadre, teintée orange Hermès
 * (même traitement gravure que le reste du site), avec le titre qui s'écrit
 * mot par mot et deux parcours de formation IA (particuliers / pros).
 */
export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg)]">
      {/* Vidéo de fond, teintée orange + dégradés pour la lisibilité */}
      <div className="absolute inset-0 -z-10">
        <HeroVideo />
        <div
          className="absolute inset-0 bg-[#f37b22] mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#f37b22] via-[#f37b22]/65 to-[#f37b22]/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#f37b22]/85 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pt-36 pb-24 md:px-12 md:pt-44 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="t-eyebrow"
        >
          {t("heroEyebrow")}
        </motion.p>

        <WriteHeadline
          text={t("heroTitle")}
          className="t-display mt-8 max-w-4xl text-5xl leading-[1.04] text-[var(--fg)] md:text-7xl lg:text-[92px]"
        />

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
          <p className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#1a1714]">
            {t("heroLead")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              ref={primaryCtaRef}
              href="/formations"
              className="group inline-flex items-center justify-center gap-3 bg-[#1a1714] px-8 py-5 font-mono text-[12px] uppercase tracking-[0.22em] text-[#f5f0e6] transition-colors will-change-transform"
            >
              <RollText
                top={<>{t("heroCtaIndividuals")}</>}
                bottom={
                  <span className="text-[#f37b22]">
                    {t("heroCtaIndividuals")}
                  </span>
                }
              />
              <span aria-hidden="true" className="transition group-hover:translate-x-1 group-hover:text-[#f37b22]">
                →
              </span>
            </Link>
            <Link
              href="/ia"
              className="group inline-flex items-center justify-center gap-3 border border-[#1a1714] px-8 py-5 font-mono text-[12px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#1a1714]"
            >
              <RollText
                top={<>{t("heroCtaPros")}</>}
                bottom={
                  <span className="text-[#f5f0e6]">{t("heroCtaPros")}</span>
                }
              />
              <span aria-hidden="true" className="transition group-hover:translate-x-1 group-hover:text-[#f5f0e6]">
                →
              </span>
            </Link>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1a1714]/70">
            {t("heroMicro")}
          </p>
        </motion.div>
      </div>

      {/* Tools marquee, infinite ribbon of the apps & tools the atelier uses */}
      <ToolsMarquee ariaLabel={t("heroToolsAriaLabel")} />
    </section>
  );
}
