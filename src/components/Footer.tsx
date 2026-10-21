import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AnimatedWordmark } from "./AnimatedWordmark";

const BOOKING_URL = "https://cal.com/troiestudio/30min";

const linkClass =
  "inline-block py-1.5 text-[var(--fg-2)] transition hover:text-[var(--accent)]";

/**
 * Pied de page du studio. Trois colonnes : Studio (les pages du studio),
 * Ressources (diagnostic, scan, pages AI Act et accessibilité, troie.app),
 * Contact (les deux actions, les réseaux, l'adresse). troie.app n'a plus
 * qu'un lien, ici. YouTube retiré tant que la chaîne porte l'ancien nom du
 * campus IA.
 */
export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const year = new Date().getFullYear();

  // Pied de page (21/10/2026) : les services, puis les réalisations et le
  // Journal. Plus de liens vers les pages IA.
  const en = locale === "en";
  const studioLinks = [
    { href: `/${locale}/creation/web`, label: en ? "Websites and apps" : "Sites et applications" },
    { href: `/${locale}/medias`, label: en ? "Photo and video" : "Photo et vidéo" },
    { href: `/${locale}/strategie`, label: en ? "Communication" : "Communication" },
    { href: `/${locale}/strategie#acquisition`, label: en ? "SEO and advertising" : "SEO et publicité" },
    { href: `/${locale}/accompagnement`, label: en ? "Team support" : "Accompagnement des équipes" },
  ];

  const resourceLinks = [
    { href: `/${locale}/creation`, label: tNav("works") },
    { href: `/${locale}#about`, label: tNav("about") },
    { href: `/${locale}/blog`, label: tNav("journal") },
  ];

  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-12 md:py-20">
        <div className="grid gap-14 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
          <div className="sm:col-span-2 lg:col-span-3">
            <AnimatedWordmark className="text-[30px] text-[var(--fg)]" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--fg-2)]">
              {tBrand("tagline")}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="t-eyebrow">{t("studio")}</p>
            <ul className="mt-5 space-y-1 text-sm">
              {studioLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="t-eyebrow">{t("resources")}</p>
            <ul className="mt-5 space-y-1 text-sm">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://troie.app"
                  target="_blank"
                  rel="noopener"
                  className={linkClass}
                >
                  {t("app")}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="t-eyebrow">{t("contact")}</p>
            <ul className="mt-5 space-y-1 text-sm">
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  {tNav("book")}
                </a>
              </li>
              <li>
                <Link href={`/${locale}/contact#projet`} className={linkClass}>
                  {tNav("project")}
                </Link>
              </li>
            </ul>
            <ul className="mt-4 flex items-center gap-2">
              <li>
                <a
                  href="https://www.linkedin.com/company/troiestudio"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn TROIE Studio"
                  className="-ml-3 flex h-11 w-11 items-center justify-center text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/troiestudio/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram @troiestudio"
                  className="flex h-11 w-11 items-center justify-center text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  <InstagramIcon />
                </a>
              </li>
            </ul>
            <p className="text-sm mt-6 text-[var(--fg-2)]/60 font-medium">
              {t("based")}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 py-6 text-[11px] text-[var(--fg-2)]/60 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="font-medium">
            © {year} TROIE Studio. {t("rights")}
          </p>
          <div className="flex gap-6 font-medium">
            <Link
              href={`/${locale}/privacy`}
              className="inline-block py-2 hover:text-[var(--fg)]"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="inline-block py-2 hover:text-[var(--fg)]"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** LinkedIn, carré avec la marque « in », une seule couleur. */
function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

/** Instagram, carré arrondi et objectif. */
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
