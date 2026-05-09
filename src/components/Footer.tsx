import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "./Logo";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-[var(--color-mist)] bg-[var(--color-ink-2)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <Logo className="h-7 w-auto text-[var(--color-bone)]" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--color-bone-2)]/70">
            {tBrand("tagline")}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-mist-strong)]">
            {t("based")}
          </p>
        </div>

        <div>
          <p className="t-eyebrow">Site</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href={`/${locale}/services`}
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                {tNav("services")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/works`}
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                {tNav("works")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/formations`}
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                {tNav("formations")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/about`}
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/contact`}
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                {tNav("contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="t-eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="mailto:contact@troie.studio"
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                contact@troie.studio
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/hugueslourmieres/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/hugueslourmieres/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-bone-2)] transition hover:text-[var(--color-ember)]"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-mist)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 py-6 text-xs text-[var(--color-mist-strong)] md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-mono uppercase tracking-[0.18em]">
            © {year} TROIE.studio — {t("rights")}
          </p>
          <div className="flex gap-6 font-mono uppercase tracking-[0.18em]">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-[var(--color-bone)]"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-[var(--color-bone)]"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
