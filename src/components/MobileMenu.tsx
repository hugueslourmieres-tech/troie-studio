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
 * MobileMenu — burger + plein écran liquid glass.
 *
 * Liquid glass : fond translucide (var --bg à 55 %) + backdrop-blur fort,
 * saturate boost. Le contenu derrière transparaît, on lit l'environnement.
 *
 * Chaque entrée de nav est séparée par une ligne hairline (cohérence avec
 * le reste du site qui utilise --rule partout).
 */
export function MobileMenu({ locale, links }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

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
            className="tone-light fixed inset-0 z-40"
            style={{ backgroundColor: "#f5f0e6" }}
          >
            <nav className="flex h-full flex-col px-6 pt-28 pb-12">
              {/* Top hairline (sits just under the header) */}
              <div className="absolute inset-x-6 top-[88px] h-px bg-[var(--rule-strong)]" />

              {/* Main links — each separated by a horizontal line */}
              <ul className="flex-1 pt-2">
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
                    className="border-b border-[var(--rule-strong)]"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="t-display block py-5 text-5xl text-[var(--fg)] transition hover:opacity-70 sm:text-6xl"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Footer of menu — social icons + language + CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + links.length * 0.06 + 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-8 flex flex-col gap-6 pt-8"
              >
                {/* Social icons row */}
                <ul className="flex items-center gap-5">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/hugueslourmieres/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-9 w-9 items-center justify-center text-[var(--fg)] transition hover:opacity-70"
                    >
                      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor" aria-hidden="true">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/hugueslourmieres/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="flex h-9 w-9 items-center justify-center text-[var(--fg)] transition hover:opacity-70"
                    >
                      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.behance.net/hugueslourmieres"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Behance"
                      className="flex h-9 w-9 items-center justify-center transition hover:opacity-70"
                    >
                      <img src="/images/brand/behance.png" alt="" className="h-[20px] w-auto" />
                    </a>
                  </li>
                </ul>

                <div className="flex items-center justify-between border-t border-[var(--rule-strong)] pt-6">
                  <LangSwitch locale={locale} />
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setOpen(false)}
                    className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:opacity-70"
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
