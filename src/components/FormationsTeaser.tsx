import Link from "next/link";
import { useTranslations } from "next-intl";

type Level = "level1" | "level2" | "level3";

const LEVELS: Level[] = ["level1", "level2", "level3"];

export function FormationsTeaser({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const tf = useTranslations("formations");

  return (
    <section className="border-t border-[var(--color-mist)]">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-eyebrow">/ Training</p>
            <h2 className="t-display mt-6 text-4xl text-[var(--color-bone)] md:text-5xl lg:text-6xl">
              {t("formationsTitle")}
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-10">
            <p className="text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
              {t("formationsIntro")}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {LEVELS.map((lv, i) => (
            <article
              key={lv}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-mist)] bg-[var(--color-ink-2)] p-8 transition hover:border-[var(--color-ember)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-eyebrow">{tf(`${lv}.duration`)}</span>
              </div>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone-2)]/70">
                {tf(`${lv}.label`)}
              </p>
              <h3 className="t-display mt-3 text-2xl text-[var(--color-bone)] md:text-3xl">
                {tf(`${lv}.title`)}
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-[var(--color-bone-2)]/80">
                {tf(`${lv}.deliverable`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href={`/${locale}/formations`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:text-[var(--color-ember)]"
          >
            <span className="border-b border-[var(--color-mist-strong)] pb-0.5">
              {locale === "fr" ? "Voir les programmes" : "See all programs"}
            </span>
            →
          </Link>
        </div>
      </div>
    </section>
  );
}
