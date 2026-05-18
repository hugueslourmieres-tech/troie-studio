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
              className="w-44 text-[var(--fg)]"
            />
            <p className="mt-16 max-w-md text-sm leading-relaxed text-[var(--fg-2)]/70">
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
            <ul className="mt-6 flex items-center gap-5">
              <li>
                <a
                  href="https://www.linkedin.com/in/hugueslourmieres/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hugueslourmieres/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/hugueslourmie3"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Behance"
                  className="flex h-9 w-9 items-center justify-center transition hover:opacity-70"
                >
                  {/* Real Behance PNG asset (the SVG path I had was off) */}
                  <img
                    src="/images/brand/behance.png"
                    alt=""
                    className="h-[18px] w-auto"
                  />
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
            © {year}TROIE.studio, {t("rights")}
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

/** LinkedIn — square with "in" mark, single-color. */
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

/** Instagram — rounded square + lens. */
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

