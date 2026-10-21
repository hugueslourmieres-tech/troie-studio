"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { LangSwitch } from "./LangSwitch";
import type { NavGroup } from "./Header";

type Props = {
  locale: string;
  groups: NavGroup[];
  showLang?: boolean;
  /** Liens simples sous les groupes : Réalisations, Le studio, Journal. */
  extraLinks: { href: string; label: string }[];
  /** Les deux actions en tête du panneau. */
  ctas: { book: string; project: string; projectHref: string };
};

const BOOKING_URL = "https://cal.com/troiestudio/30min";
const LINKEDIN_URL = "https://www.linkedin.com/company/troiestudio";
const INSTAGRAM_URL = "https://www.instagram.com/troiestudio/";
const HUGUES_INSTAGRAM_URL = "https://www.instagram.com/hugueslourmieres/";

/**
 * MobileMenu, burger + overlay plein écran.
 *
 * L'overlay est rendu par createPortal directement dans document.body pour
 * sortir du contexte d'empilement fixe du Header (z-50). Sans le portail,
 * l'en-tête au défilement (95 % opaque + flou) transparaissait et le menu
 * paraissait transparent.
 *
 * z-[60] passe au-dessus de l'en-tête. Fond crème en dur, sans variable ni
 * opacité, pour ne jamais être teinté par un ton parent.
 *
 * De haut en bas : Réserver 30 min et Lancer un projet, puis les groupes
 * Stratégie, Création, Accompagnement (titres cliquables), puis Réalisations,
 * Le studio, Journal, puis les réseaux et la langue.
 */
export function MobileMenu({
  locale,
  groups,
  showLang = true,
  extraLinks,
  ctas,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isEn = locale === "en";
  const close = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="tone-light fixed inset-0 z-[60] lg:hidden"
          style={{ backgroundColor: "#fcfcfd" }}
        >
          {/* Bouton de fermeture, à la place du burger, en croix */}
          <button
            type="button"
            aria-label={isEn ? "Close menu" : "Fermer le menu"}
            onClick={close}
            className="absolute right-6 top-5 z-10 flex h-11 w-11 items-center justify-center text-[var(--fg)]"
          >
            <span className="absolute block h-px w-7 rotate-45 bg-[var(--ink)]" />
            <span className="absolute block h-px w-7 -rotate-45 bg-[var(--ink)]" />
          </button>

          <nav className="flex h-full flex-col overflow-y-auto px-6 pt-20 pb-8">
            {/* Ligne du haut */}
            <div className="absolute inset-x-6 top-[68px] h-px bg-[var(--rule-strong)]" />

            <div className="mx-auto flex min-h-full w-full max-w-xl flex-col">
              {/* Les deux actions, en tête du panneau */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3 pt-6"
              >
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--ink)] px-4 text-center text-[16px] font-medium text-white transition-colors hover:bg-[#2a2e37] hover:text-white"
                >
                  {ctas.book}
                </a>
                <Link
                  href={ctas.projectHref}
                  onClick={close}
                  className="flex h-14 w-full items-center justify-center rounded-full border border-[var(--rule-strong)] px-4 text-center text-[16px] font-medium text-[var(--fg)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
                >
                  {ctas.project}
                </Link>
              </motion.div>

              <ul className="mt-2 flex flex-col">
                {groups.map((group, i) => (
                  <motion.li
                    key={group.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-[var(--rule-strong)] py-6"
                  >
                    <Link
                      href={group.href}
                      onClick={close}
                      className="t-display -my-2 inline-block py-2 text-[26px] leading-none text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                    >
                      {group.label}
                    </Link>
                    <ul className="mt-3 flex flex-col">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="group/it -mx-3 flex items-center justify-between gap-4 rounded-lg px-3 py-4 transition-colors hover:bg-[var(--accent-soft)] active:bg-[var(--accent-soft)]"
                          >
                            <span className="text-[22px] font-medium tracking-[-0.02em] text-[var(--fg)] transition-colors group-hover/it:text-[var(--accent)]">
                              {item.label}
                            </span>
                            <ArrowRight />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ul>

              {/* Bas du panneau : Réalisations, Le studio, Journal, puis
                  réseaux et langue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.08 + groups.length * 0.05 + 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-auto pt-5"
              >
                <ul className="flex flex-col">
                  {extraLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={close}
                        className="group/ft flex items-center justify-between border-t border-[var(--rule-strong)] py-4"
                      >
                        <span className="text-[14px] font-medium text-[var(--fg)] transition-colors group-hover/ft:text-[var(--accent)]">
                          {l.label}
                        </span>
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Réseaux, photos de Hugues, langue. YouTube retiré tant que
                    la chaîne porte l'ancien nom du campus IA. */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-[var(--rule-strong)] pt-5">
                  <div className="flex items-center gap-1">
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn TROIE Studio"
                      className="-ml-3 flex h-11 w-11 items-center justify-center text-[var(--fg)] transition hover:text-[var(--accent)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
                      </svg>
                    </a>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram @troiestudio"
                      className="flex h-11 w-11 items-center justify-center text-[var(--fg)] transition hover:text-[var(--accent)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </a>
                    <a
                      href={HUGUES_INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 inline-flex min-h-11 items-center text-[14px] font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition hover:text-[var(--accent)]"
                    >
                      {isEn ? "Hugues's photos" : "Les photos de Hugues"}
                    </a>
                  </div>
                  {showLang && <LangSwitch locale={locale} />}
                </div>
              </motion.div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <BurgerButton
        open={open}
        locale={locale}
        onClick={() => setOpen((v) => !v)}
      />
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}

/** Flèche fine, glisse vers la droite au survol ou au toucher. */
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 text-[var(--fg-2)] transition-transform duration-300 group-hover/it:translate-x-0.5 group-hover/ft:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * BurgerButton, trois traits fins qui se replient en croix.
 */
function BurgerButton({
  open,
  locale,
  onClick,
}: {
  open: boolean;
  locale: string;
  onClick: () => void;
}) {
  const isEn = locale === "en";
  const label = open
    ? isEn
      ? "Close menu"
      : "Fermer le menu"
    : isEn
      ? "Open menu"
      : "Ouvrir le menu";
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={open}
      onClick={onClick}
      className="group relative z-50 h-11 w-11 lg:hidden"
    >
      <span
        className="absolute left-1/2 top-1/2 block h-px w-7 -translate-x-1/2 -translate-y-[6px] bg-[var(--ink)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open
            ? "translate(-50%, 0) rotate(45deg)"
            : "translate(-50%, -6px)",
        }}
      />
      <span
        className="absolute left-1/2 top-1/2 block h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-[var(--ink)] transition-opacity duration-300"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="absolute left-1/2 top-1/2 block h-px w-7 -translate-x-1/2 translate-y-[6px] bg-[var(--ink)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open
            ? "translate(-50%, 0) rotate(-45deg)"
            : "translate(-50%, 6px)",
        }}
      />
    </button>
  );
}
