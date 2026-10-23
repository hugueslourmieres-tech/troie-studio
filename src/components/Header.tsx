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
 * Journal (21/10/2026). À droite : langue, Décrire mon projet (à partir
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
        project: "Describe my project",
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
        project: "Décrire mon projet",
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
              locale={locale}
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
              className="text-[14px] font-medium text-[var(--fg)] transition hover:text-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          {/* Bloc de droite (ordinateur) : langue, Décrire mon projet (xl),
              Réserver 30 min. */}
          <div className="hidden items-center gap-4 lg:flex">
            {showLang && <LangSwitch locale={locale} />}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-[var(--ink)] px-5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#2a2e37]"
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
  locale,
}: {
  group: NavGroup;
  toggleLabel: string;
  locale: string;
}) {
  const en = locale === "en";
  const t = en
    ? {
        services: "Our services",
        resources: "Resources",
        res: [
          { href: `/${locale}/creation`, label: "Work" },
          { href: `/${locale}#chiffres`, label: "Explore the numbers" },
          { href: `/${locale}/blog`, label: "Journal" },
          { href: `/${locale}#about`, label: "Our team" },
          { href: `/${locale}/contact`, label: "Contact" },
        ],
        cards: [
          { href: `/${locale}#realisations`, img: "/images/art/art-1.jpg", title: "The design of our websites", kind: "Work" },
          { href: `/${locale}#chiffres`, img: "/images/art/art-3.jpg", title: "Our clients' real curves", kind: "Results" },
        ],
      }
    : {
        services: "Nos services",
        resources: "Ressources",
        res: [
          { href: `/${locale}/creation`, label: "Réalisations" },
          { href: `/${locale}#chiffres`, label: "Explorez les chiffres" },
          { href: `/${locale}/blog`, label: "Le journal" },
          { href: `/${locale}#about`, label: "Notre équipe" },
          { href: `/${locale}/contact`, label: "Contact" },
        ],
        cards: [
          { href: `/${locale}#realisations`, img: "/images/art/art-1.jpg", title: "Le design de nos sites", kind: "Réalisations" },
          { href: `/${locale}#chiffres`, img: "/images/art/art-3.jpg", title: "Les vraies courbes de nos clients", kind: "Résultats" },
        ],
      };
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
      className="flex items-center"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <Link
        href={group.href}
        onClick={() => setOpen(false)}
        className="whitespace-nowrap text-[14px] font-medium text-[var(--fg)] transition hover:text-[var(--accent)]"
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

      {/* Panneau pleine largeur façon OpenAI (23/10/2026) : les services en
          grand, les ressources en petit, deux cartes aux dégradés tirés de la
          bannière LinkedIn de Hugues. Fermé, il est aussi invisible pour les
          lecteurs d'écran (visibility), en plus de l'opacité et du tabIndex. */}
      <div
        className={`absolute left-1/2 top-full w-screen -translate-x-1/2 transition-[opacity,visibility] duration-200 ${
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="border-b border-[var(--rule)] bg-[var(--bg)] shadow-[0_30px_60px_-40px_rgba(17,19,24,0.35)]">
          <div
            className={`mx-auto grid max-w-7xl grid-cols-12 gap-10 px-6 pb-12 pt-8 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:px-12 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            <div className="col-span-5">
              <p className="text-sm text-[var(--fg-2)]">{t.services}</p>
              <ul className="mt-4 space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? 0 : -1}
                      className="t-display inline-block text-[32px] leading-[1.25] text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[var(--fg-2)]">{t.resources}</p>
              <ul className="mt-5 space-y-3">
                {t.res.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? 0 : -1}
                      className="text-[15px] font-medium text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-5 grid grid-cols-2 gap-5">
              {t.cards.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="group/card block"
                >
                  <span className="block aspect-square overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
                    />
                  </span>
                  <span className="mt-3 block text-[15px] font-medium leading-snug text-[var(--fg)]">{c.title}</span>
                  <span className="mt-1 block text-sm text-[var(--fg-2)]">{c.kind}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
