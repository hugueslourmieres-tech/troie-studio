import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ContactCTA({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        {/* Three Greek warriors under a temple — opening visual */}
        <div className="mx-auto mb-16 flex w-full max-w-[640px] justify-center md:mb-20 md:max-w-[820px]">
          <Image
            src="/images/brand/Troie 3 guys.png"
            alt=""
            width={1600}
            height={1066}
            sizes="(max-width: 768px) 90vw, 820px"
            className="h-auto w-full"
            priority={false}
          />
        </div>

        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-7">
            <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              {t("ctaSubtitle")}
            </p>
          </div>
          <div className="flex items-end md:col-span-5 md:justify-end">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("ctaButton")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
