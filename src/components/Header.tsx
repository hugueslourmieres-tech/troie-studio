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
    { href: `/${locale}#training`, label: t("training") },
    { href: `/${locale}/works`, label: t("works") },
    { href: `/${locale}/contact`, label: t("contact") },
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
          <Logo variant="wordmark-emblem" className="h-8 md:h-10" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.slice(0, 5).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {/* Desktop : lang + Get in touch */}
          <div className="hidden items-center gap-6 md:flex">
            <LangSwitch locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("letsTalk")}
            </Link>
          </div>

          {/* Mobile : burger */}
          <MobileMenu locale={locale} links={links} />
        </div>
      </div>
    </header>
  );
}
