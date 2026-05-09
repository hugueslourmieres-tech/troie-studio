import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });

  const links = [
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/works`, label: t("works") },
    { href: `/${locale}/formations`, label: t("formations") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-mist)] bg-[var(--color-ink)]/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href={`/${locale}`}
          aria-label="TROIE"
          className="block text-[var(--color-bone)] transition hover:text-[var(--color-bone-2)]"
        >
          <Logo className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <LangSwitch locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-full border border-[var(--color-bone)] px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:bg-[var(--color-bone)] hover:text-[var(--color-ink)] md:inline-flex"
          >
            {t("letsTalk")}
          </Link>
        </div>
      </div>
    </header>
  );
}
