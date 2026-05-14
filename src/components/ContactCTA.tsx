import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ContactCTA({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="relative border-t border-[var(--rule)] overflow-hidden">
      {/* Greek pottery scene — woman with fan & warrior, transparent PNG */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 hidden w-[42%] max-w-[640px] opacity-90 md:block lg:w-[40%]"
      >
        <Image
          src="/images/brand/troie femme eventail.png"
          alt=""
          width={1500}
          height={1180}
          sizes="(max-width: 1024px) 42vw, 640px"
          className="h-auto w-full mix-blend-multiply"
          priority={false}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-7">
            <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
              {t("ctaSubtitle")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("ctaButton")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
