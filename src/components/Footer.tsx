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
                  href="https://www.behance.net/hugueslourmieres"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Behance"
                  className="flex h-9 w-9 items-center justify-center text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  <BehanceIcon />
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

/** Behance — official "Bē" mark (simpleicons.org). */
function BehanceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.488.102.9.273 1.252.507.349.235.62.547.813.938.187.387.286.871.286 1.443 0 .619-.142 1.135-.421 1.545-.284.41-.7.746-1.255 1.005.755.218 1.318.6 1.69 1.146.374.549.557 1.205.557 1.975 0 .622-.12 1.16-.359 1.612-.241.453-.566.816-.973 1.1-.41.284-.875.494-1.413.628-.534.13-1.086.193-1.661.193H0V5.7h7.799v-.002zm-.35 5.251c.48 0 .878-.114 1.188-.345.308-.23.46-.609.46-1.139 0-.297-.054-.534-.158-.728a1.235 1.235 0 0 0-.426-.46 1.785 1.785 0 0 0-.61-.235 3.876 3.876 0 0 0-.722-.066H3.49v2.97h3.96v.003zm.231 5.652c.265 0 .521-.025.769-.078.246-.053.466-.143.66-.263.193-.122.346-.291.463-.502.116-.211.175-.488.175-.831 0-.673-.179-1.155-.554-1.444-.376-.287-.882-.43-1.522-.43H3.49v3.548h4.19zm10.625-9.22c.852 0 1.62.137 2.305.413.682.275 1.265.665 1.748 1.166.481.504.851 1.103 1.108 1.797.255.692.378 1.46.378 2.291 0 .054-.005.13-.011.219l-.005.058-.001.011-.001.052h-7.999c0 .823.288 1.488.864 1.991.575.501 1.265.752 2.062.752.546 0 1.043-.131 1.479-.394.434-.262.692-.539.766-.84h2.802c-.434 1.343-1.101 2.297-1.989 2.876-.886.575-1.969.864-3.226.864-.864 0-1.654-.137-2.366-.412-.713-.272-1.318-.665-1.814-1.183-.5-.512-.886-1.121-1.16-1.825-.272-.706-.408-1.486-.408-2.341 0-.823.143-1.594.422-2.311.276-.719.673-1.338 1.184-1.864.512-.522 1.116-.94 1.821-1.247.706-.302 1.488-.456 2.34-.456zm.135 2.176c-.328 0-.6.057-.819.173a1.752 1.752 0 0 0-.526.42 1.518 1.518 0 0 0-.286.529 2.625 2.625 0 0 0-.105.488l-.011.066h3.524c-.05-.62-.27-1.075-.654-1.378-.386-.302-.756-.298-1.123-.298zm-2.522-3.504h6.073v1.467h-6.073V5.053z" />
    </svg>
  );
}
