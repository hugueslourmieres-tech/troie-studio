"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedWordmark } from "./AnimatedWordmark";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

const LINKEDIN_URL = "https://www.linkedin.com/in/hugueslourmieres/";
const INSTAGRAM_URL = "https://www.instagram.com/hugueslourmieres/";

export type NavItem = { href: string; label: string; meta?: string };
export type NavGroup = { label: string; href?: string; items: NavItem[] };

/**
 * Header, fixed cream bar, signature Hermès. Reste toujours dans le tone
 * light, simplement glassy + bordure douce qui apparaît au scroll.
 *
 * Nav éditoriale avec menus déroulants :
 *   Création   ▾  Création · Réalisation (film & vidéo)
 *   Stratégie  ▾  Marketing · IA · Communication
 *   Formations ▾  Agents IA · Formation perso · Formation entreprise
 *
 * À droite : login + LinkedIn.
 */
export function Header({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const groups: NavGroup[] = [
    {
      label: "Création",
      href: `/${locale}#création`,
      items: [
        { href: `/${locale}#création`, label: "Création", meta: "01" },
        { href: `/${locale}/works`, label: "Réalisation", meta: "02" },
        { href: `/${locale}#vidéos`, label: "Vidéos", meta: "03" },
      ],
    },
    {
      label: "Stratégie",
      href: `/${locale}#strategy`,
      items: [
        { href: `/${locale}#strategy`, label: "Stratégie marketing", meta: "01" },
        { href: `/ia`, label: "Stratégie IA", meta: "02" },
      ],
    },
    {
      label: "IA",
      href: `/formations`,
      items: [
        { href: `/ia`, label: "Professionnel", meta: "01" },
        { href: `/formations`, label: "Particulier", meta: "02" },
        { href: `/${locale}/agents`, label: "Agent", meta: "03" },
      ],
    },
  ];

  return (
    <header
      className={`tone-light fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-[var(--rule)] bg-[var(--bg)]/95 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link
          href={`/${locale}`}
          aria-label="TROIE, Studio France"
          className="block text-[var(--fg)] transition hover:text-[var(--accent)]"
        >
          <AnimatedWordmark className="text-[28px] md:text-[34px]" />
        </Link>

        {/* Éditorial nav avec menus déroulants */}
        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {groups.map((group, i) => (
            <NavDropdown key={group.label} group={group} index={i} />
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          {/* Desktop right cluster : langswitch + login + réseaux */}
          <div className="hidden items-center gap-4 md:flex">
            <LangSwitch locale={locale} />
            <span className="h-4 w-px bg-[var(--rule-strong)]" aria-hidden="true" />
            <Link
              href="/formations/auth/sign-in"
              aria-label="Se connecter"
              className="flex h-8 w-8 items-center justify-center text-[var(--fg)] transition hover:text-[var(--accent)]"
            >
              <LoginIcon />
            </Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center text-[var(--fg)] transition hover:text-[var(--accent)]"
            >
              <LinkedInIcon />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center text-[var(--fg)] transition hover:text-[var(--accent)]"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Mobile : burger */}
          <MobileMenu locale={locale} groups={groups} />
        </div>
      </div>
    </header>
  );
}

/**
 * NavDropdown, top-level label + panneau déroulant éditorial.
 * Ouvre au survol (desktop) et au clic/clavier. Ferme au mouseleave,
 * Escape, ou clic à l'extérieur.
 */
function NavDropdown({ group, index }: { group: NavGroup; index: number }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
      >
        <span className="text-[var(--accent)] transition group-hover:opacity-70">
          {String(index + 1).padStart(2, "0")}.
        </span>
        <span>{group.label}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-3 w-3 translate-y-px transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Panneau */}
      <div
        className={`absolute left-0 top-full pt-4 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-[248px] border border-[var(--rule)] bg-[var(--bg)] p-2 shadow-[0_24px_60px_-24px_rgba(26,23,20,0.35)]">
          {group.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group/item flex items-baseline gap-3 px-4 py-3 transition-colors hover:bg-[var(--accent-soft)]"
            >
              {item.meta && (
                <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--accent)]">
                  {item.meta}
                </span>
              )}
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--fg)] transition-colors group-hover/item:text-[var(--accent)]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Login / compte, silhouette simple. */
function LoginIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  );
}

/** LinkedIn, glyphe plein. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

/** Instagram, contour, scale avec currentColor. */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
