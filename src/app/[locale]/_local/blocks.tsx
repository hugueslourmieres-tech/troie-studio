import Link from "next/link";
import { BASE, loc } from "@/components/SeoBlocks";

/**
 * Aides partagées des pages locales et de services (25/10/2026) :
 * fil d'Ariane JSON-LD et liste de liens à filets (grammaire de
 * /agence-web-nice). Dossier privé (« _local ») : aucune route.
 */

export type NavLink = { href: string; label: string };

/** BreadcrumbList : Accueil, puis la page. */
export function breadcrumbJsonLd(locale: string, path: string, name: string) {
  const home = loc(locale) === "en" ? "Home" : "Accueil";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE}/${locale}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: `${BASE}/${locale}` },
      { "@type": "ListItem", position: 2, name, item: `${BASE}/${locale}${path}` },
    ],
  };
}

/** Liste de liens internes, une ligne par lien, flèche à droite. */
export function LinkList({ locale, items }: { locale: string; items: readonly NavLink[] }) {
  return (
    <ul className="border-t border-[var(--rule)]">
      {items.map((s) => (
        <li key={s.href} className="border-b border-[var(--rule)]">
          <Link
            href={`/${locale}/${s.href}`}
            className="group flex min-h-14 items-center justify-between gap-6 py-4 text-base font-medium text-[var(--fg)] transition-colors hover:text-[var(--accent)] md:text-lg"
          >
            {s.label}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
