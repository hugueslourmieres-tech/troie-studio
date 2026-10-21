"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "./Reveal";
import { LetterReveal } from "./LetterReveal";
import { Parallax } from "./Parallax";
import { Fragment } from "react";

const CAL_URL = "https://cal.com/troiestudio/30min";

type Metier = {
  /** Suffixe des clés i18n : card{key}Eyebrow, card{key}Title... */
  key: "Web" | "Media" | "Com" | "Seo";
  image: string;
  /** Page dédiée du service (sous /[locale]). */
  path: string;
};

/**
 * Les quatre services (21/10/2026, décision de Hugues) : on vend le service,
 * pas la méthode. Photos en couleur.
 */
const METIERS: Metier[] = [
  { key: "Web", image: "/images/creation/web/colorguesser-desktop.jpg", path: "creation/web" },
  { key: "Media", image: "/images/works/Cartonajes Pans/cover.jpg", path: "medias" },
  { key: "Com", image: "/images/works/MIBI 2026/cover.jpg", path: "strategie" },
  { key: "Seo", image: "/images/corpo/montpellier/DSC_7604.jpg", path: "strategie#acquisition" },
];

/**
 * Héros de l'accueil et les trois métiers (stratégie, création,
 * accompagnement). Les textes FR et EN sont dans fr.json et en.json
 * (espace « home »).
 */
export function Intro({
  asHero = false,
  servicesOnly = false,
}: {
  asHero?: boolean;
  /** Seulement la grille des services (l'accueil a son propre héros). */
  servicesOnly?: boolean;
}) {
  const t = useTranslations("home");
  const locale = useLocale();
  const HeroWrap = asHero ? Fragment : Reveal;

  return (
    <section className="relative">
      <div
        className={`mx-auto max-w-7xl px-6 md:px-12 ${
          asHero ? "pt-24 pb-20 md:pt-44 md:pb-32" : servicesOnly ? "py-20 md:py-28" : "py-28 md:py-40"
        }`}
      >
        {/* Header centré, intro éditoriale. En héros, pas de fondu d'entrée
            (24/09/2026) : peint à opacité 0 puis révélé après le chargement
            du JavaScript, le texte d'accroche retardait le plus grand
            élément affiché (LCP) à 6,4 s sur mobile. */}
        {!servicesOnly && (
        <HeroWrap>
          <div className="mx-auto max-w-3xl text-center">
            {/* Sceau en relief, ton sur ton, réduit sur mobile pour que les
                deux boutons restent visibles à 375 x 812. */}
            <Parallax
              strength={28}
              className="mx-auto mb-6 flex w-full max-w-[110px] justify-center md:mb-12 md:max-w-[260px]"
            >
              <Image
                src="/images/brand/emboss.png"
                alt=""
                width={1140}
                height={1370}
                sizes="(max-width: 768px) 110px, 260px"
                className="h-auto w-full"
              />
            </Parallax>
            {/* Titre : deux lignes fixes, séparées par « | » dans les messages.
                Clamp calé pour un rendu net sur ordinateur et téléphone. */}
            {asHero ? (
              <h1
                className="t-display mx-auto mt-8 leading-[1.06] text-[var(--fg)] text-[clamp(1.75rem,8.5vw,3.3rem)] md:text-[clamp(3.3rem,5.2vw,5.9rem)]"
                aria-label={t("introTitle").replace(/\|/g, " ")}
              >
                {t("introTitle")
                  .split("|")
                  .map((line, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="block text-balance md:whitespace-nowrap"
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

            {asHero && (
              <>
                <div className="mt-10 flex flex-col items-center gap-4">
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 text-[var(--bg)] transition-colors hover:bg-[var(--bg-2)] hover:text-[var(--fg)] font-medium"
                  >
                    {t("heroBook")}
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </a>
                  <Link
                    href="#realisations"
                    className="text-sm group inline-flex items-center gap-2.5 border-b-2 border-[var(--fg)] pt-3 pb-1.5 text-[var(--fg)] transition hover:opacity-70 font-medium"
                  >
                    {t("heroProject")}
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
                <p className="mt-6 text-sm text-[var(--fg-2)]">{t("heroNote")}</p>

                {/* Signature : le visage de celui qui pilote, en noir et blanc */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <Image
                    src="/images/about/hugues-2025.jpg"
                    alt=""
                    aria-hidden="true"
                    width={44}
                    height={44}
                    className="h-11 w-11 flex-none rounded-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                  <p className="text-left text-xs leading-snug text-[var(--fg-2)] md:text-sm">
                    {t("heroSignature")}
                  </p>
                </div>
              </>
            )}
          </div>
        </HeroWrap>
        )}

        {/* Les trois métiers. h2 au style surtitre, en texte simple pour
            WriteOnScroll. */}
        <h2 id="services" className={`t-eyebrow scroll-mt-28 text-center ${servicesOnly ? "" : "mt-16 md:mt-24"}`}>{t("metiersTitle")}</h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-10 md:grid-cols-2 xl:grid-cols-4">
          {METIERS.map((m, i) => (
            <MetierBox key={m.key} metier={m} index={i} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--fg-2)] md:text-base">
          {t("servicesTraining")}{" "}
          <Link
            href={`/${locale}/accompagnement`}
            className="border-b border-[var(--fg)] pb-0.5 text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {t("servicesTrainingCta")} →
          </Link>
        </p>
      </div>
    </section>
  );
}

function MetierBox({ metier, index }: { metier: Metier; index: number }) {
  const t = useTranslations("home");
  const locale = useLocale();
  const k = metier.key;

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
        href={`/${locale}/${metier.path}`}
        className="group relative flex h-full flex-col bg-[var(--bg)] p-8 transition-colors hover:bg-[var(--bg-2)] md:p-10"
      >
        {/* Surtitre numéroté, déjà dans les messages (« 01, Stratégie ») */}
        <span className="text-sm text-[var(--fg)]/60 font-medium">
          {t(`card${k}Eyebrow`)}
        </span>

        {/* Photo fixe, noir et blanc */}
        <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden bg-[var(--bg-2)]">
          <Image
            src={metier.image}
            alt={t(`card${k}ImageAlt`)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        {/* Texte */}
        <div className="mt-8 flex flex-1 flex-col">
          <h3 className="t-display text-balance text-3xl text-[var(--fg)]">
            {t(`card${k}Title`)}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
            {t(`card${k}Body`)}
          </p>

          <span className="text-sm mt-auto pt-8 text-[var(--fg)] transition group-hover:text-[var(--accent)] font-medium">
            <span className="border-b border-[var(--rule-strong)] pb-0.5 group-hover:border-[var(--accent)]">
              {t(`card${k}Cta`)}
            </span>{" "}
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
