import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

const WORKS = [
  "chanel",
  "pantone",
  "rutherford",
  "gsmonaco",
  "sofitel",
  "veoria",
  "heidelberg",
  "topakita",
  "capefront",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "works" });
  return { title: t("pageTitle") };
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
    <article className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <header className="max-w-3xl">
        <p className="t-eyebrow">/ Works</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--color-bone)] md:text-7xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
          {t("pageSubtitle")}
        </p>
      </header>

      <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-mist)] bg-[var(--color-mist)] md:grid-cols-2 lg:grid-cols-3">
        {WORKS.map((slug, i) => (
          <article
            key={slug}
            className="group relative aspect-[4/5] overflow-hidden bg-[var(--color-ink-2)] p-8 transition hover:bg-[var(--color-ink)] md:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(228,72,39,0.18),transparent_70%)] opacity-0 transition group-hover:opacity-100"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-eyebrow">
                  {t(`items.${slug}.year`)}
                </span>
              </div>
              <h2 className="t-display mt-auto text-4xl text-[var(--color-bone)] md:text-5xl">
                {t(`items.${slug}.title`)}
              </h2>
              <p className="mt-4 text-sm text-[var(--color-bone-2)]/70">
                {t(`items.${slug}.scope`)}
              </p>
              <Link
                href={`/${locale}/works/${slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:text-[var(--color-ember)]"
              >
                <span className="border-b border-[var(--color-mist-strong)] pb-0.5">
                  {t("viewProject")}
                </span>
                →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
