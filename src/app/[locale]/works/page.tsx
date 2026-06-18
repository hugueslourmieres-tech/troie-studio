import Image from "next/image";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { WORKS } from "@/lib/works";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "works" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: `/${locale}/works`,
      languages: { fr: "/fr/works", en: "/en/works" },
    },
  };
}

export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorksView locale={locale} />;
}

function WorksView({ locale }: { locale: string }) {
  const t = useTranslations("works");

  return (
    <article className="mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-44">
      <header className="max-w-3xl">
        <p className="t-eyebrow">/ Works</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">
          {t("pageSubtitle")}
        </p>
      </header>

      <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3">
        {WORKS.map((w, i) => (
          <Link
            key={w.slug}
            href={`/${locale}/works/${w.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-2)]">
              <Image
                src={w.cover}
                alt={t(`items.${w.slug}.title`)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="t-photo object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]/80">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-5">
              <h2 className="t-display text-2xl text-[var(--fg)]">
                {t(`items.${w.slug}.title`)}
              </h2>
              <p className="mt-2 text-sm italic text-[var(--fg-2)]/70">
                {t(`items.${w.slug}.subtitle`)}
              </p>
              <p className="mt-2 text-sm text-[var(--fg-2)]/60">
                {t(`items.${w.slug}.scope`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
