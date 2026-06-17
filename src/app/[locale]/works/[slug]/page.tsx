import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { WORKS, findWork } from "@/lib/works";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!findWork(slug)) return {};
  const t = await getTranslations({ locale, namespace: "works" });
  return {
    title: t(`items.${slug}.title`),
    alternates: {
      canonical: `/${locale}/works/${slug}`,
      languages: {
        fr: `/fr/works/${slug}`,
        en: `/en/works/${slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  return WORKS.flatMap((w) =>
    ["fr", "en"].map((locale) => ({ locale, slug: w.slug })),
  );
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const work = findWork(slug);
  if (!work) notFound();
  setRequestLocale(locale);

  // Project that comes next in the WORKS array (wraps around to first)
  const index = WORKS.findIndex((w) => w.slug === work.slug);
  const next = WORKS[(index + 1) % WORKS.length];

  return (
    <CaseView
      locale={locale}
      slug={work.slug}
      cover={work.cover}
      gallery={work.gallery}
      nextSlug={next.slug}
      nextCover={next.cover}
    />
  );
}

function CaseView({
  locale,
  slug,
  cover,
  gallery,
  nextSlug,
  nextCover,
}: {
  locale: string;
  slug: string;
  cover: string;
  gallery: string[];
  nextSlug: string;
  nextCover: string;
}) {
  const t = useTranslations("works");

  return (
    <article>
      {/* Cover, mobile: full image, title below; desktop: full bleed with title overlaid */}
      <header className="group relative isolate">
        {/* Mobile cover, natural aspect ratio, complète image */}
        <div className="relative w-full overflow-hidden bg-[var(--bg-2)] md:hidden">
          <Image
            src={cover}
            alt={t(`items.${slug}.title`)}
            width={1600}
            height={2000}
            priority
            sizes="100vw"
            className="t-photo h-auto w-full"
          />
        </div>

        {/* Mobile text block */}
        <div className="mx-auto mt-10 max-w-7xl px-6 pb-16 md:hidden">
          <Link
            href={`/${locale}/works`}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
          >
            ← {locale === "fr" ? "Retour" : "Back"}
          </Link>

          <p className="t-eyebrow mt-8">{t(`items.${slug}.scope`)}</p>
          <h1 className="t-display mt-6 max-w-5xl break-words text-5xl text-[var(--fg)] sm:text-6xl">
            {t(`items.${slug}.title`)}
          </h1>
          <p className="t-display-italic mt-6 max-w-3xl text-xl text-[var(--fg-2)] sm:text-2xl">
            {t(`items.${slug}.subtitle`)}
          </p>
        </div>

        {/* Desktop cover, full bleed 90vh with title overlaid IN FRONT */}
        <div className="relative hidden h-[90vh] min-h-[640px] w-full overflow-hidden bg-[var(--bg-2)] md:block">
          <Image
            src={cover}
            alt={t(`items.${slug}.title`)}
            fill
            priority
            sizes="100vw"
            className="t-photo object-cover"
          />
          {/* Strong gradient at the bottom for title readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          {/* Back link, top-left of the cover */}
          <div className="absolute inset-x-0 top-0 z-10">
            <div className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-36">
              <Link
                href={`/${locale}/works`}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/85 transition hover:text-[var(--accent)]"
              >
                ← {locale === "fr" ? "Retour" : "Back"}
              </Link>
            </div>
          </div>

          {/* Title block, bottom of the cover, overlaying the photo */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                {t(`items.${slug}.scope`)}
              </p>
              <h1 className="t-display mt-6 max-w-5xl break-words text-white md:text-8xl lg:text-9xl">
                {t(`items.${slug}.title`)}
              </h1>
              <p className="t-display-italic mt-6 max-w-3xl text-white/85 md:text-3xl">
                {t(`items.${slug}.subtitle`)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Éditorial intro paragraph */}
      <section className="border-y border-[var(--rule)]">
        <div className="mx-auto max-w-4xl px-6 py-20 md:px-12 md:py-28">
          <p className="text-xl leading-relaxed text-[var(--fg)] md:text-2xl">
            {t(`items.${slug}.description`)}
          </p>
        </div>
      </section>

      {/* Gallery, éditorial mosaic, varied aspect ratios */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
          <Mosaic photos={gallery} alt={t(`items.${slug}.title`)} />
        </section>
      )}

      {/* Next project, keeps visitors deep in the work */}
      <NextProject locale={locale} nextSlug={nextSlug} nextCover={nextCover} />

      {/* Closing CTA, Book a call */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-12 md:py-28">
          <p className="t-eyebrow">
            {locale === "fr" ? "Un projet similaire ?" : "Similar project?"}
          </p>
          <h2 className="t-display mt-6 text-3xl text-[var(--fg)] md:text-5xl">
            {locale === "fr"
              ? "Parlons-en pendant trente minutes."
              : "Let's talk for thirty minutes."}
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {locale === "fr" ? "Prendre rendez-vous" : "Book a call"} →
          </Link>
        </div>
      </section>
    </article>
  );
}

/**
 * NextProject, invites the visitor to jump straight to the next case
 * study. Shows the upcoming cover in a wide aspect ratio, label, title
 * and italic subtitle pulled from the translations.
 */
function NextProject({
  locale,
  nextSlug,
  nextCover,
}: {
  locale: string;
  nextSlug: string;
  nextCover: string;
}) {
  const t = useTranslations("works");
  return (
    <section className="border-t border-[var(--rule)]">
      <Link href={`/${locale}/works/${nextSlug}`} className="group block">
        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-12 md:pt-24">
          <div className="flex items-baseline justify-between">
            <p className="t-eyebrow">
              {locale === "fr" ? "Projet suivant" : "Next project"}
            </p>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60 transition group-hover:text-[var(--accent)]">
              {locale === "fr" ? "Voir" : "View"} →
            </span>
          </div>
        </div>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-[var(--bg-2)] md:mt-12 md:aspect-[21/9]">
          <Image
            src={nextCover}
            alt={t(`items.${nextSlug}.title`)}
            fill
            sizes="100vw"
            className="t-photo object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/55 via-transparent to-transparent" />

          {/* Title overlay */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-6 pb-10 md:px-12 md:pb-16">
              <h3 className="t-display text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                {t(`items.${nextSlug}.title`)}
              </h3>
              <p className="t-display-italic mt-3 text-lg text-[var(--fg-2)] md:text-2xl">
                {t(`items.${nextSlug}.subtitle`)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

/**
 * Mosaic, éditorial masonry : chaque photo s'affiche dans son ratio
 * natif (paysage, portrait, carré) sans crop. CSS columns garantit le
 * flux magazine, 1 colonne mobile, 2 colonnes desktop.
 *
 * `break-inside-avoid` empêche une photo d'être coupée entre 2 colonnes.
 * `width/height` sur next/image permettent à Next de connaître le ratio
 * avant de fetch, pas de saut de layout au chargement.
 */
function Mosaic({ photos, alt }: { photos: string[]; alt: string }) {
  if (photos.length === 0) return null;

  return (
    <div className="columns-1 gap-6 md:columns-2 md:gap-8">
      {photos.map((src) => (
        <div
          key={src}
          className="mb-6 break-inside-avoid overflow-hidden bg-[var(--bg-2)] md:mb-8"
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1067}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="t-photo h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}

