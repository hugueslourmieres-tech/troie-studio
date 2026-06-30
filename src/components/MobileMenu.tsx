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
};

const LINKEDIN_URL = "https://www.linkedin.com/in/hugueslourmieres/";
const INSTAGRAM_URL = "https://www.instagram.com/hugueslourmieres/";

/**
 * MobileMenu, burger + full-screen overlay.
 *
 * The overlay is rendered via createPortal directly to document.body so it
 * escapes the Header's z-50 fixed stacking context. Without the portal the
 * overlay was trapped inside Header and the scrolled header (95% opaque +
 * backdrop blur) bled through, making the menu look transparent.
 *
 * z-[60] sits above the header. Background is hard-coded cream, no
 * variable, no opacity, so it cannot ever be tinted by parent tones.
 */
export function MobileMenu({ locale, groups, showLang = true }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
          style={{ backgroundColor: "#f5f0e6" }}
        >
          {/* Close button, overlays burger, same position, X icon */}
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-5 z-10 flex h-10 w-10 items-center justify-center text-[var(--fg)]"
          >
            <span className="absolute block h-px w-7 rotate-45 bg-[var(--fg)]" />
            <span className="absolute block h-px w-7 -rotate-45 bg-[var(--fg)]" />
          </button>

          <nav className="flex h-full flex-col overflow-y-auto px-6 pt-20 pb-8">
            {/* Top hairline */}
            <div className="absolute inset-x-6 top-[68px] h-px bg-[var(--rule-strong)]" />

            <div className="mx-auto flex min-h-full w-full max-w-xl flex-col">
              <ul className="flex flex-col">
                {groups.map((group, i) => (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-[var(--rule-strong)] py-5"
                  >
                    <p className="t-display text-[22px] leading-none text-[var(--fg)]">
                      {group.label}
                    </p>
                    <ul className="mt-2.5 flex flex-col">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group/it -mx-3 flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--accent-soft)] active:bg-[var(--accent-soft)]"
                          >
                            <span className="flex items-baseline gap-3">
                              {item.meta && (
                                <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--accent)]">
                                  {item.meta}
                                </span>
                              )}
                              <span className="text-[17px] tracking-[0.01em] text-[var(--fg)] transition-colors group-hover/it:text-[var(--accent)]">
                                {item.label}
                              </span>
                            </span>
                            <ArrowRight />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ul>

              {/* Footer : Blog, Contact, puis réseaux + langue + se connecter */}
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
                  {[
                    { href: `/${locale}/blog`, label: "Blog" },
                    { href: `/${locale}/contact`, label: "Contact" },
                  ].map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="group/ft flex items-center justify-between border-t border-[var(--rule-strong)] py-4"
                      >
                        <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors group-hover/ft:text-[var(--accent)]">
                          {l.label}
                        </span>
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>

              {/* Réseaux + langue + se connecter */}
              <div className="mt-5 flex items-center justify-between border-t border-[var(--rule-strong)] pt-5">
                <div className="flex items-center gap-4">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="text-[var(--fg)] transition hover:text-[var(--accent)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
                    </svg>
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="text-[var(--fg)] transition hover:text-[var(--accent)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  {showLang && <LangSwitch locale={locale} />}
                </div>
                <Link
                  href="/formations/auth/sign-in"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:opacity-70"
                >
                  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
                  </svg>
                  Se connecter
                </Link>
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
      <BurgerButton open={open} onClick={() => setOpen((v) => !v)} />
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}

/** Flèche fine, glisse vers la droite au survol/contact. */
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-[var(--fg-2)] transition-transform duration-300 group-hover/it:translate-x-0.5 group-hover/ft:translate-x-0.5"
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
 * BurgerButton, 3 thin lines that fold into a cross.
 */
function BurgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={open}
      onClick={onClick}
      className="group relative z-50 h-10 w-10 lg:hidden"
    >
      <span
        className="absolute left-1/2 top-1/2 block h-px w-7 -translate-x-1/2 -translate-y-[6px] bg-[var(--fg)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open
            ? "translate(-50%, 0) rotate(45deg)"
            : "translate(-50%, -6px)",
        }}
      />
      <span
        className="absolute left-1/2 top-1/2 block h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-[var(--fg)] transition-opacity duration-300"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="absolute left-1/2 top-1/2 block h-px w-7 -translate-x-1/2 translate-y-[6px] bg-[var(--fg)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open
            ? "translate(-50%, 0) rotate(-45deg)"
            : "translate(-50%, 6px)",
        }}
      />
    </button>
  );
}
