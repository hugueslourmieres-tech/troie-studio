"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

/**
 * Header — fixed cream bar, signature Hermès. Reste toujours dans le tone
 * light, simplement glassy + bordure douce qui apparaît au scroll.
 *
 * Nav style : pagination éditoriale (01. — 02. — ...) façon revue,
 * + lien Instagram externe sur la droite.
 */
export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}#creation`, label: t("creation") },
    { href: `/${locale}#strategy`, label: t("strategy") },
    { href: `/${locale}/formations`, label: t("training") },
    { href: `/${locale}/agents`, label: t("agents") },
    { href: `/${locale}/works`, label: t("works") },
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
          <Logo variant="wordmark-emblem" className="h-10 md:h-12" />
        </Link>

        {/* Editorial nav — 01. Creation, 02. Strategy, ... */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l, i) => (
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
          {/* Desktop right cluster: langswitch dropdown + CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <LangSwitch locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Mobile : burger */}
          <MobileMenu locale={locale} links={links} />
        </div>
      </div>
    </header>
  );
}

/**
 * Simple Instagram glyph — single-color, scales with currentColor.
 */
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
