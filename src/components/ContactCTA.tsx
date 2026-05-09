import Link from "next/link";
import { useTranslations } from "next-intl";

export function ContactCTA({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[var(--color-mist)] bg-[var(--color-ember)] text-[var(--color-bone)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <h2 className="t-display text-4xl md:text-6xl">{t("ctaTitle")}</h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
              {t("ctaSubtitle")}
            </p>
          </div>
          <div className="flex items-end md:col-span-5 md:justify-end">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:bg-[var(--color-ink-2)]"
            >
              {t("ctaButton")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
