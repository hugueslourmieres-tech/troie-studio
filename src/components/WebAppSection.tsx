import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

/** Compétences listées sous l'aperçu. */
const CAPABILITIES = [
  "Sites vitrines & e-commerce",
  "Web apps & SaaS",
  "Applications mobiles",
  "Design system & UI sur mesure",
];

/**
 * Section "Site web & application" : aperçu produit dans un mockup navigateur
 * (site) + un mockup téléphone (app). Les visuels sont des placeholders à
 * affiner. Fond crème, DA TROIE.
 */
export function WebAppSection({ locale }: { locale: string }) {
  return (
    <section id="web-app" className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <div className="max-w-3xl">
            <p className="t-eyebrow">Site web &amp; application</p>
            <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              Des produits digitaux qui convertissent.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              Sites vitrines, e-commerce, web apps et applications mobiles. Design
              sur mesure, performance et conversion : de la maquette au
              déploiement.
            </p>
          </div>
        </Reveal>

        {/* Aperçu : mockup navigateur + téléphone */}
        <Reveal delay={0.1}>
          <div className="relative mt-16 md:mt-24">
            {/* Mockup navigateur (site) */}
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--bg-2)] shadow-[0_40px_90px_-40px_rgba(26,23,20,0.45)]">
              <div className="flex items-center gap-2 border-b border-[var(--rule)] bg-[var(--bg)] px-4 py-3">
                <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="mx-auto flex h-6 w-1/2 max-w-xs items-center justify-center rounded-full bg-[var(--bg-2)] font-mono text-[10px] tracking-[0.12em] text-[var(--fg-2)]/55">
                  rutherford.fr
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                <Image
                  src="/images/creation/web/rutherford.jpg"
                  alt="Aperçu d'un site web réalisé par TROIE"
                  fill
                  sizes="(max-width: 768px) 100vw, 56rem"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Mockup téléphone (app), en chevauchement */}
            <div className="absolute -bottom-6 right-2 hidden w-[150px] overflow-hidden rounded-[1.8rem] border-[6px] border-[#1a1714] bg-[#1a1714] shadow-[0_30px_60px_-28px_rgba(26,23,20,0.6)] sm:block md:right-8 md:-bottom-10 md:w-[190px]">
              <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.3rem] bg-white">
                <Image
                  src="/images/creation/web/perpost.jpg"
                  alt="Aperçu d'une application réalisée par TROIE"
                  fill
                  sizes="190px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Compétences + CTA */}
        <Reveal delay={0.2}>
          <div className="mt-20 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
            <ul className="grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base"
                >
                  <span aria-hidden="true" className="inline-block h-px w-3.5 flex-shrink-0 bg-[var(--accent)]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/creation/web`}
              className="inline-flex shrink-0 items-center gap-3 border-b border-[var(--rule-strong)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Voir nos sites &amp; apps →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
