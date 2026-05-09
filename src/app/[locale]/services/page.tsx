import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Pillar = "comm" | "creation" | "training";

const PILLARS: { key: Pillar; index: string }[] = [
  { key: "comm", index: "01" },
  { key: "creation", index: "02" },
  { key: "training", index: "03" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("pageTitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesView />;
}

function ServicesView() {
  const t = useTranslations("services");

  return (
    <article className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <header className="max-w-3xl">
        <p className="t-eyebrow">/ Services</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--color-bone)] md:text-7xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
          {t("pageSubtitle")}
        </p>
      </header>

      <div className="mt-24 space-y-24">
        {PILLARS.map(({ key, index }) => {
          const items = t.raw(`${key}.items`) as string[];
          return (
            <section
              key={key}
              className="grid gap-10 border-t border-[var(--color-mist)] pt-16 md:grid-cols-12 md:gap-16"
            >
              <div className="md:col-span-4">
                <span className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {index} / {t(`${key}.label`)}
                </span>
                <h2 className="t-display mt-6 text-4xl text-[var(--color-bone)] md:text-5xl">
                  {t(`${key}.title`)}
                </h2>
              </div>
              <div className="md:col-span-8">
                <ul className="grid gap-4 md:grid-cols-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-mist)] bg-[var(--color-ink-2)] p-5 text-[var(--color-bone-2)] transition hover:border-[var(--color-ember)]"
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
            </section>
          );
        })}
      </div>
    </article>
  );
}
