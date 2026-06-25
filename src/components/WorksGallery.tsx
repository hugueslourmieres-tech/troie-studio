"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { WORKS } from "@/lib/works";

/**
 * WorksGallery, carrousel des réalisations photo.
 * Carrousel 3-visibles (desktop), drag/swipe + flèches.
 * `embedded` : rendu sans <section> ni gros header (utilisé dans la section
 * "Médias" qui chapeaute photo + vidéo).
 */
export function WorksGallery({
  locale,
  embedded = false,
}: {
  locale: string;
  embedded?: boolean;
}) {
  const t = useTranslations("home");
  const tw = useTranslations("works");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const header = embedded ? (
    <p className="t-eyebrow">Photographie</p>
  ) : (
    <Reveal>
      <div className="max-w-3xl">
        <p className="t-eyebrow">{t("worksEyebrow")}</p>
        <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
          {t("worksTitle")}
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
          {t("worksIntro")}
        </p>
      </div>
    </Reveal>
  );

  const carousel = (
    <div className={embedded ? "mt-10" : "mt-20"}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-6">
          {WORKS.map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: Math.min(i, 2) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <Link href={`/${locale}/works/${w.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-2)]">
                  <Image
                    src={w.cover}
                    alt={tw(`items.${w.slug}.title`)}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                    className="t-photo object-cover transition duration-700 group-hover:scale-[1.02]"
                    style={{ objectPosition: w.coverPosition ?? "center" }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="t-display text-2xl text-[var(--fg)]">
                    {tw(`items.${w.slug}.title`)}
                  </h3>
                  <p className="mt-2 text-sm italic text-[var(--fg-2)]/70">
                    {tw(`items.${w.slug}.subtitle`)}
                  </p>
                  <p className="mt-2 text-sm text-[var(--fg-2)]/60">
                    {tw(`items.${w.slug}.scope`)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer row: hint label + arrows */}
      <div className="mt-10 flex items-end justify-between">
        <Link
          href={`/${locale}/works`}
          className="inline-flex items-center gap-3 border-b border-[var(--rule-strong)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {t("worksCta")} →
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={scrollNext}
            disabled={!canNext}
            className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div>
        {header}
        {carousel}
      </div>
    );
  }

  return (
    <section id="works" className="border-t border-[var(--accent)] scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        {header}
        {carousel}
      </div>
    </section>
  );
}
