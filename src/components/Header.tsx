"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedWordmark } from "./AnimatedWordmark";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

export type NavItem = { href: string; label: string };

/**
 * Header, barre crème fixe, glassy au scroll.
 *
 * Refonte du 16/09/2026, un seul parcours : Expertises, Réalisations,
 * Le studio, puis le bouton « Décrire mon projet », avec FR / EN visible.
 * Plus de menus déroulants, plus de bandeau promotionnel sous la barre
 * (AiActBanner n'est plus monté) et plus de bouton troie.app, dont le lien
 * vit dans le pied de page.
 */
export function Header({
  locale,
  solid = false,
  showLang = true,
}: {
  locale: string;
  /** Barre crème pleine en permanence (au-dessus d'un hero sombre). */
  solid?: boolean;
  /** Affiche le sélecteur de langue (off hors des routes [locale]). */
  showLang?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barSolid = scrolled || solid;
  const en = locale === "en";
  const home = `/${en ? "en" : "fr"}`;
  const onHome = pathname === home || pathname === `${home}/`;

  const links: NavItem[] = [
    { href: `${home}#expertises`, label: en ? "Expertise" : "Expertises" },
    { href: `${home}/medias`, label: en ? "Our work" : "Réalisations" },
    { href: `${home}#studio`, label: en ? "The studio" : "Le studio" },
  ];
  // Sur l'accueil, le formulaire est sur la page : on y descend.
  const cta: NavItem = {
    href: onHome ? "#projet" : `${home}/contact`,
    label: en ? "Tell us about your project" : "Décrire mon projet",
  };

  return (
    <header
      className={`tone-light fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        barSolid ? "bg-[var(--bg)]/95 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link
          href={home}
          aria-label="TROIE, Studio France"
          className="block text-[var(--fg)] transition hover:text-[var(--accent)]"
        >
          <AnimatedWordmark className="text-[28px] md:text-[34px]" />
        </Link>

        <nav aria-label={en ? "Main" : "Principal"} className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <div className="hidden items-center gap-6 lg:flex">
            {showLang && <LangSwitch locale={locale} variant="inline" />}
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2.5 bg-[var(--ink)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[#1a1714]"
            >
              {cta.label}
            </Link>
          </div>

          {/* Mobile : burger (le bouton de projet vit dans le panneau, pas
              dans la barre, où il viendrait se coller au wordmark). */}
          <MobileMenu locale={locale} links={links} cta={cta} showLang={showLang} />
        </div>
      </div>
    </header>
  );
}
