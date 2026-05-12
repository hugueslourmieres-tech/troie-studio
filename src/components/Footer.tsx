import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "./Logo";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <Logo
              variant="stack"
              className="h-16 w-auto text-[var(--fg)]"
            />
            <p className="mt-10 max-w-md text-sm leading-relaxed text-[var(--fg-2)]/70">
              {tBrand("tagline")}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="t-eyebrow">Studio</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}#creation`}
                  className="text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  {tNav("creation")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#strategy`}
                  className="text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  {tNav("strategy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#training`}
                  className="text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  {tNav("training")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/works`}
                  className="text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  {tNav("works")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="t-eyebrow">Contact</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact@troie.studio"
                  className="text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  contact@troie.studio
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/hugueslourmieres/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hugueslourmieres/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  Instagram
                </a>
              </li>
            </ul>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
              {t("based")}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 py-6 text-[11px] text-[var(--fg-2)]/60 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="font-mono uppercase tracking-[0.22em]">
            © {year} TROIE.studio — {t("rights")}
          </p>
          <div className="flex gap-6 font-mono uppercase tracking-[0.22em]">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-[var(--fg)]"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-[var(--fg)]"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
