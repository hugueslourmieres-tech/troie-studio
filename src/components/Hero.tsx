"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { HeroSlideshow } from "./HeroSlideshow";

/**
 * Hero — full cream, clean editorial type, single supporting B&W photo
 * on the right. Hermès-style: very few elements, very generous space.
 * Subtle parallax on the photo at scroll-down.
 */
export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg)]">
      <div className="mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 gap-12 px-6 pt-36 pb-24 md:grid-cols-12 md:gap-16 md:px-12 md:pt-44 md:pb-32">
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

          <h1 className="t-display-hero mt-10 text-6xl text-[var(--fg)] md:text-[88px] lg:text-[120px]">
            {t("heroTitle")
              .split("\n")
              .map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("heroCtaPrimary")}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="#works"
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              {t("heroCtaSecondary")}
            </Link>
          </motion.div>
        </div>

        {/* Slideshow column — infinite, drag-friendly, B&W. */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-full md:min-h-[560px]"
          >
            <HeroSlideshow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
