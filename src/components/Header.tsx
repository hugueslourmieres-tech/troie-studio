"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedWordmark } from "./AnimatedWordmark";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; href: string; items: NavItem[] };

/** Prise de rendez-vous : action principale du site, partout. */
const BOOKING_URL = "https://cal.com/troiestudio/30min";

/**
 * Barre fixe crème. Menu : Services (déroulant), Réalisations, Studio,
 * Journal (21/10/2026). À droite : langue, Lancer un projet (à partir
 * de xl), Réserver 30 min. Ordre du 1er/10/2026 : le savoir-faire d'abord,
 * l'IA est un moyen. Plus de bandeau ni de bouton troie.app (lien dans le
 * pied de page).
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barSolid = scrolled || solid;
  const isEn = locale === "en";

  // Libellés bilingues du menu, posés ici (composant client) pour ne pas
  // dépendre des messages côté serveur.
  const nav = isEn
    ? {
        services: "Services",
        web: "Websites and apps",
        media: "Photo and video",
        com: "Communication",
        seo: "SEO and advertising",
        training: "Team support",
        works: "Work",
        studio: "Studio",
        journal: "Journal",
        book: "Book 30 min",
        project: "Start a project",
      }
    : {
        services: "Services",
        web: "Sites et applications",
        media: "Photo et vidéo",
        com: "Communication",
        seo: "SEO et publicité",
        training: "Accompagnement des équipes",
        works: "Réalisations",
        studio: "Studio",
        journal: "Journal",
        book: "Réserver 30 min",
        project: "Lancer un projet",
      };

  // Un seul menu déroulant (21/10/2026) : les services. Puis des liens
  // simples. On vend le service, pas la méthode.
  const groups: NavGroup[] = [
    {
      label: nav.services,
      href: `/${locale}#services`,
      items: [
        { href: `/${locale}/creation/web`, label: nav.web },
        { href: `/${locale}/medias`, label: nav.media },
        { href: `/${locale}/strategie`, label: nav.com },
        { href: `/${locale}/strategie#acquisition`, label: nav.seo },
        { href: `/${locale}/accompagnement`, label: nav.training },
      ],
    },
  ];

  const links: NavItem[] = [
    { href: `/${locale}/creation`, label: nav.works },
    { href: `/${locale}#about`, label: nav.studio },
    { href: `/${locale}/blog`, label: nav.journal },
  ];

  const projectHref = `/${locale}/contact#projet`;

  return (
    <header
      className={`tone-light fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        barSolid
          ? "bg-[var(--bg)]/95 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link
          href={`/${locale}`}
          aria-label="TROIE, Studio France"
          className="block text-[var(--fg)] transition hover:text-[var(--accent)]"
        >
          {/* Logo un peu plus petit entre 1024 et 1279 px : ouvert au scroll, il
              touchait « Stratégie » à 1024 px (1er/10/2026). */}
          <AnimatedWordmark className="text-[28px] md:text-[34px] lg:text-[28px] xl:text-[30px] 2xl:text-[34px]" />
        </Link>

        {/* Menus déroulants (ordinateur, lg et plus) puis Journal */}
        <nav className="hidden items-center gap-4 lg:flex xl:gap-7 2xl:gap-9">
          {groups.map((group) => (
            <NavDropdown
              key={group.href}
              group={group}
              toggleLabel={
                isEn
                  ? `Open the ${group.label} submenu`
                  : `Ouvrir le sous-menu ${group.label}`
              }
            />
          ))}
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
          {/* Bloc de droite (ordinateur) : langue, Lancer un projet (xl),
              Réserver 30 min. */}
          <div className="hidden items-center gap-4 lg:flex">
            {showLang && <LangSwitch locale={locale} />}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap border border-[var(--ink)] bg-[var(--ink)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-[#2a2e37] hover:bg-[#2a2e37] hover:text-white"
            >
              {nav.book}
            </a>
          </div>

          {/* Pas de bouton dans la barre sous `lg` : à 375 px le wordmark
              occupe 178 px et un bouton venait se coller au « E » de TROIE.
              Les deux actions sont en tête du panneau du burger. */}

          {/* Mobile : burger */}
          <MobileMenu
            locale={locale}
            groups={groups}
            showLang={showLang}
            extraLinks={links}
            ctas={{ book: nav.book, project: nav.project, projectHref }}
          />
        </div>
      </div>
    </header>
  );
}

/**
 * NavDropdown : le libellé est un lien vers la page du groupe, le chevron
 * à côté ouvre le panneau. Ouverture aussi au survol. Fermeture au
 * mouseleave, Escape, ou clic à l'extérieur.
 */
function NavDropdown({
  group,
  toggleLabel,
}: {
  group: NavGroup;
  toggleLabel: string;
}) {
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
      className="relative flex items-center"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <Link
        href={group.href}
        onClick={() => setOpen(false)}
        className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
      >
        {group.label}
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={toggleLabel}
        onClick={() => setOpen((v) => !v)}
        className="-my-2 ml-0.5 inline-flex h-8 w-6 items-center justify-center text-[var(--fg)] transition hover:text-[var(--accent)]"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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

      {/* Panneau. Fermé, il est aussi invisible pour les lecteurs d'écran
          (visibility), en plus de l'opacité et du tabIndex des liens. */}
      <div
        className={`absolute left-0 top-full pt-4 transition-all duration-300 ${
          open
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-[248px] border border-[var(--rule)] bg-[var(--bg)] p-2 shadow-[0_24px_60px_-24px_rgba(26,23,20,0.35)]">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="group/item flex items-baseline px-4 py-3 transition-colors hover:bg-[var(--accent-soft)]"
            >
              <span className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--fg)] transition-colors group-hover/item:text-[var(--accent)]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
