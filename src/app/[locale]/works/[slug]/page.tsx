import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

const VALID_SLUGS = [
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

type Slug = (typeof VALID_SLUGS)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug as Slug)) return {};
  const t = await getTranslations({ locale, namespace: "works" });
  return { title: t(`items.${slug}.title`) };
}

export function generateStaticParams() {
  return VALID_SLUGS.flatMap((slug) =>
    ["fr", "en"].map((locale) => ({ locale, slug })),
  );
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug as Slug)) notFound();
  setRequestLocale(locale);
  return <CaseView locale={locale} slug={slug as Slug} />;
}

function CaseView({ locale, slug }: { locale: string; slug: Slug }) {
  const t = useTranslations("works");

  return (
    <article className="mx-auto max-w-4xl px-6 py-24 md:px-10 md:py-36">
      <Link
        href={`/${locale}/works`}
        className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone-2)]/70 transition hover:text-[var(--color-ember)]"
      >
        ← {locale === "fr" ? "Retour aux réalisations" : "Back to all works"}
      </Link>

      <header className="mt-12">
        <p className="t-eyebrow">{t(`items.${slug}.year`)}</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--color-bone)] md:text-7xl">
          {t(`items.${slug}.title`)}
        </h1>
        <p className="mt-6 text-lg text-[var(--color-bone-2)]/80 md:text-xl">
          {t(`items.${slug}.scope`)}
        </p>
      </header>

      <div className="mt-20 rounded-2xl border border-dashed border-[var(--color-mist-strong)] p-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone-2)]/60">
          {locale === "fr"
            ? "Étude de cas détaillée — bientôt"
            : "Detailed case study — coming soon"}
        </p>
        <p className="mt-6 text-base text-[var(--color-bone-2)]/70">
          {locale === "fr"
            ? "Photos, vidéos, métriques et angle d'attaque seront publiés prochainement."
            : "Photos, videos, metrics and angle of attack will be published shortly."}
        </p>
      </div>

      <div className="mt-20 flex justify-center">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-3 rounded-full border border-[var(--color-bone)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-bone)] transition hover:bg-[var(--color-bone)] hover:text-[var(--color-ink)]"
        >
          {locale === "fr"
            ? "Discuter d'un projet similaire"
            : "Discuss a similar project"}{" "}
          →
        </Link>
      </div>
    </article>
  );
}
