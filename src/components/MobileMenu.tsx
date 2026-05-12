"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LangSwitch } from "./LangSwitch";

type LinkItem = { href: string; label: string };

type Props = {
  locale: string;
  links: LinkItem[];
};

/**
 * MobileMenu — burger + plein écran cream, signature Hermès.
 *
 * - 3 fines lignes horizontales (pas un emoji burger) qui pivotent en X
 * - Panneau plein écran fade-in 600 ms easeOutExpo
 * - Liens en Bodoni Moda capitales, stagger 60 ms par item
 * - LangSwitch + contact en bas
 * - Body scroll lock pendant ouverture, fermeture sur Escape ou lien cliqué
 */
export function MobileMenu({ locale, links }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  // Body scroll lock + Escape listener
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

  return (
    <>
      <BurgerButton open={open} onClick={() => setOpen((v) => !v)} />

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="tone-light fixed inset-0 z-40 bg-[var(--bg)]"
          >
            <nav className="flex h-full flex-col px-6 pt-28 pb-12">
              {/* Top border line (sits just below the header) */}
              <div className="absolute inset-x-6 top-[88px] h-px bg-[var(--rule)]" />

              {/* Main links — generous serif */}
              <ul className="flex-1 space-y-3 pt-12">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="t-display block py-2 text-5xl text-[var(--fg)] transition hover:text-[var(--accent)] sm:text-6xl"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Footer of menu — language + direct contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + links.length * 0.06 + 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-8 flex flex-col gap-6 border-t border-[var(--rule)] pt-8"
              >
                <a
                  href="mailto:contact@troie.studio"
                  className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  contact@troie.studio
                </a>
                <div className="flex items-center justify-between">
                  <LangSwitch locale={locale} />
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setOpen(false)}
                    className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {t("letsTalk")}
                  </Link>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * BurgerButton — 3 fines lignes qui pivotent en croix.
 * Hauteur de ligne 1 px (luxe — pas 2-3 px du burger générique).
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
      {/* 3 lines that morph into an X */}
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
