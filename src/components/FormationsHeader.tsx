"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

/**
 * FormationsHeader, navbar dediee à la plateforme /formations/*.
 *
 * Reprend exactement le style de la Header principale du site
 * (troiestudio.fr) : fixed top, glass-on-scroll, logo wordmark-emblem,
 * nav éditoriale "01., 02.,", CTA contact a droite, mobile burger.
 *
 * Mais avec ses propres links centres sur la plateforme cours en ligne :
 * Cours · Boutique · Mastermind · Module 0 gratuit.
 *
 * FR-only pour l'instant (next-intl n'est pas wrapped autour de
 * /formations qui vit hors du segment [locale]).
 */

const LINKS = [
  { href: "/formations#start", label: "Parcours" },
  { href: "/formations/prompts", label: "Boutique" },
  { href: "/formations/mastermind", label: "Mastermind" },
  { href: "/formations/module-0", label: "Module 0 · gratuit" },
];

export function FormationsHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`tone-light fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-[var(--rule)] bg-[var(--bg)]/95 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            aria-label="TROIE Studio, retour au site principal"
            className="block text-[var(--fg)] transition hover:text-[var(--accent)]"
          >
            <Logo variant="wordmark-emblem" className="h-10 md:h-12" />
          </Link>

          {/* Éditorial nav, 01. Parcours, 02. Boutique, ... */}
          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="group inline-flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
              >
                <span className="text-[var(--accent)] transition group-hover:opacity-70">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span>{l.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            {/* Desktop right cluster : Espace membre + CTA Contact */}
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/formations/dashboard"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition hover:text-[var(--accent)]"
              >
                Espace membre
              </Link>
              <Link
                href="/fr/contact"
                className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Contact
              </Link>
            </div>

            {/* Mobile : burger */}
            <button
              type="button"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center text-[var(--fg)] transition hover:text-[var(--accent)] md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[var(--bg)] pt-24 md:hidden">
          <nav className="flex flex-1 flex-col gap-1 px-6 pb-12">
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-3 border-b border-[var(--rule)] py-5 font-mono text-[13px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
              >
                <span className="text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span>{l.label}</span>
              </Link>
            ))}
            <Link
              href="/formations/dashboard"
              onClick={() => setMenuOpen(false)}
              className="mt-8 border-b border-[var(--rule)] py-5 font-mono text-[13px] uppercase tracking-[0.22em] text-[var(--fg-2)]"
            >
              Espace membre →
            </Link>
            <Link
              href="/fr/contact"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[var(--rule)] py-5 font-mono text-[13px] uppercase tracking-[0.22em] text-[var(--fg-2)]"
            >
              Contact →
            </Link>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="mt-auto py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70"
            >
              ← Retour au site principal
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
