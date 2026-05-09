import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("pageTitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutView />;
}

function AboutView() {
  const t = useTranslations("about");
  const values = t.raw("values") as { title: string; body: string }[];

  return (
    <article className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-36">
      <header>
        <p className="t-eyebrow">/ About</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--color-bone)] md:text-7xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
          {t("pageSubtitle")}
        </p>
      </header>

      <p className="mt-16 max-w-3xl text-lg leading-relaxed text-[var(--color-bone-2)] md:text-xl">
        {t("intro")}
      </p>

      <section className="mt-24 border-t border-[var(--color-mist)] pt-16">
        <h2 className="t-display text-3xl text-[var(--color-bone)] md:text-5xl">
          {t("valuesTitle")}
        </h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {values.map((v) => (
            <li
              key={v.title}
              className="rounded-2xl border border-[var(--color-mist)] bg-[var(--color-ink-2)] p-8"
            >
              <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-ember)]">
                {v.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-bone-2)]/85">
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
