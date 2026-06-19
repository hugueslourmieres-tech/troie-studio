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
};

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
export function MobileMenu({ locale, groups }: Props) {
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
          className="tone-light fixed inset-0 z-[60] md:hidden"
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

          <nav className="flex h-full flex-col px-6 pt-20 pb-8">
            {/* Top hairline */}
            <div className="absolute inset-x-6 top-[68px] h-px bg-[var(--rule-strong)]" />

            <ul className="flex flex-1 flex-col justify-center gap-1">
              {groups.map((group, i) => (
                <motion.li
                  key={group.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-[var(--rule-strong)] py-3.5"
                >
                  <p className="t-display text-[26px] leading-tight text-[var(--fg)]">
                    {group.label}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                        >
                          {item.meta && (
                            <span className="text-[9px] text-[var(--accent)]">{item.meta}</span>
                          )}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ul>

            {/* Footer of menu, lang + Se connecter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + groups.length * 0.05 + 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-5 flex flex-col gap-4 pt-5"
            >

              <div className="flex items-center justify-between border-t border-[var(--rule-strong)] pt-6">
                <LangSwitch locale={locale} />
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
      className="group relative z-50 h-10 w-10 md:hidden"
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
