import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden">
      {/* Decorative grain + ember glow background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[var(--color-ember)] opacity-[0.07] blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(184,146,84,0.12),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-28 pb-32 md:px-10 md:pt-40 md:pb-44">
        <p className="t-eyebrow t-rise">{t("heroEyebrow")}</p>
        <h1 className="t-display t-rise t-rise-delay-1 mt-8 max-w-5xl text-5xl text-[var(--color-bone)] md:text-7xl lg:text-[88px]">
          {t("heroTitle")
            .split("\n")
            .map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
        </h1>
        <p className="t-rise t-rise-delay-2 mt-10 max-w-2xl text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
          {t("heroSubtitle")}
        </p>
        <div className="t-rise t-rise-delay-3 mt-12 flex flex-wrap items-center gap-4">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ember)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:bg-[#c93d20]"
          >
            {t("heroCtaPrimary")}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href={`/${locale}/works`}
            className="inline-flex items-center gap-3 rounded-full border border-[var(--color-mist-strong)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:border-[var(--color-bone)]"
          >
            {t("heroCtaSecondary")}
          </Link>
        </div>

        {/* Stats strip */}
        <div className="t-rise t-rise-delay-4 mt-24 grid grid-cols-3 gap-8 border-t border-[var(--color-mist)] pt-10 md:gap-16 md:pt-14">
          <Stat n="50+" label={t("statsClients")} />
          <Stat n="200+" label={t("statsTrained")} />
          <Stat n="10" label={t("statsYears")} />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="t-display text-5xl text-[var(--color-bone)] md:text-6xl">
        {n}
      </p>
      <p className="mt-3 max-w-[16ch] text-xs leading-snug text-[var(--color-bone-2)]/70 md:text-sm">
        {label}
      </p>
    </div>
  );
}
