import Link from "next/link";
import { useTranslations } from "next-intl";

type Pillar = "comm" | "creation" | "training";

const PILLARS: { key: Pillar; index: string }[] = [
  { key: "comm", index: "01" },
  { key: "creation", index: "02" },
  { key: "training", index: "03" },
];

export function ServicesGrid({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const ts = useTranslations("services");

  return (
    <section className="border-t border-[var(--color-mist)]">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-eyebrow">/ Services</p>
            <h2 className="t-display mt-6 text-4xl text-[var(--color-bone)] md:text-5xl lg:text-6xl">
              {t("servicesTitle")}
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-10">
            <p className="text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
              {t("servicesIntro")}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-mist)] bg-[var(--color-mist)] md:grid-cols-3">
          {PILLARS.map(({ key, index }) => {
            const items = ts.raw(`${key}.items`) as string[];
            return (
              <article
                key={key}
                className="bg-[var(--color-ink-2)] p-8 transition hover:bg-[var(--color-ink)] md:p-10"
              >
                <header className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
                    {index}
                  </span>
                  <span className="t-eyebrow">{ts(`${key}.label`)}</span>
                </header>
                <h3 className="t-display mt-8 text-3xl text-[var(--color-bone)] md:text-4xl">
                  {ts(`${key}.title`)}
                </h3>
                <ul className="mt-8 space-y-2.5 text-sm text-[var(--color-bone-2)]/80">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-1 w-3 flex-shrink-0 bg-[var(--color-ember)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/services`}
                  className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:text-[var(--color-ember)]"
                >
                  →
                  <span className="border-b border-[var(--color-mist-strong)] pb-0.5">
                    Voir / View
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
