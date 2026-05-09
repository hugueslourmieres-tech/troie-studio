import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Level = "level1" | "level2" | "level3";
const LEVELS: Level[] = ["level1", "level2", "level3"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "formations" });
  return { title: t("pageTitle") };
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FormationsView locale={locale} />;
}

function FormationsView({ locale }: { locale: string }) {
  const t = useTranslations("formations");

  return (
    <article className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <header className="max-w-3xl">
        <p className="t-eyebrow">/ Training</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--color-bone)] md:text-7xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
          {t("pageSubtitle")}
        </p>
      </header>

      <div className="mt-24 space-y-10">
        {LEVELS.map((lv, i) => {
          const items = t.raw(`${lv}.items`) as string[];
          return (
            <article
              key={lv}
              className="grid gap-10 rounded-2xl border border-[var(--color-mist)] bg-[var(--color-ink-2)] p-8 transition hover:border-[var(--color-ember)] md:grid-cols-12 md:gap-16 md:p-12"
            >
              <div className="md:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-eyebrow">{t(`${lv}.duration`)}</span>
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone-2)]/70">
                  {t(`${lv}.label`)}
                </p>
                <h2 className="t-display mt-3 text-3xl text-[var(--color-bone)] md:text-4xl">
                  {t(`${lv}.title`)}
                </h2>
              </div>

              <div className="md:col-span-8">
                <p className="rounded-xl border border-[var(--color-ember)]/40 bg-[var(--color-ember)]/5 p-5 text-sm text-[var(--color-bone)]">
                  {t(`${lv}.deliverable`)}
                </p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-[var(--color-bone-2)]/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-1 w-3 flex-shrink-0 bg-[var(--color-ember)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}

        <article className="rounded-2xl border border-dashed border-[var(--color-mist-strong)] p-8 md:p-12">
          <p className="t-eyebrow">/ {t("custom.label")}</p>
          <h3 className="t-display mt-4 text-3xl text-[var(--color-bone)] md:text-4xl">
            {t("custom.title")}
          </h3>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-bone-2)]/80 md:text-lg">
            {t("custom.body")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--color-ember)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:bg-[#c93d20]"
          >
            {locale === "fr" ? "Demander un audit" : "Request an audit"} →
          </Link>
        </article>
      </div>
    </article>
  );
}
