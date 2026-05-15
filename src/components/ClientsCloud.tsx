"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

const CLIENTS = [
  "CHANEL",
  "X-RITE",
  "SOFITEL",
  "GS MONACO",
  "VEORIA",
  "RUTHERFORD",
  "TOP AKITA INU",
  "CAPEFRONT",
  "STUDIO DE LA ROCHE",
  "MEASURECOLOR",
];

/**
 * ClientsCloud — wordmarks de marques accompagnées dans un marquee
 * infini horizontal piloté par GSAP. Inspiration luxe / Hermès :
 * un seul "ruban" qui défile lentement sans coupure.
 */
export function ClientsCloud() {
  const t = useTranslations("home");
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // The track contains the list twice; we translate by -50% to loop
    // seamlessly. Slow speed for editorial feel (~30s per cycle).
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        ease: "none",
        duration: 32,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  // Duplicate the list so the marquee loops without seam.
  const loopList = [...CLIENTS, ...CLIENTS];

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        {/* Wax seal — signature of the brands worked with */}
        <div className="mx-auto mb-10 flex w-full max-w-[180px] justify-center md:max-w-[220px]">
          <Image
            src="/images/brand/emboss.png"
            alt=""
            width={2000}
            height={2000}
            sizes="(max-width: 768px) 180px, 220px"
            className="h-auto w-full"
          />
        </div>
        <p className="t-eyebrow text-center">{t("clientsTitle")}</p>
      </div>

      {/* Marquee — defiles infiniment, full width */}
      <div className="relative mt-2 overflow-hidden pb-20 md:pb-28">
        {/* Soft fade on the edges so the loop seam is invisible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-40"
        />

        <div
          ref={trackRef}
          className="flex w-max gap-12 will-change-transform md:gap-20"
        >
          {loopList.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.28em] text-[var(--fg-2)]/60 transition-colors hover:text-[var(--fg)] md:text-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
