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
  return { title: t(`items.${slug}.title`) };
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
      {/* Cover — mobile: full image, no crop; desktop: immersive 80vh */}
      <header className="group relative isolate">
        {/* Mobile cover — natural aspect ratio, complete image */}
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

        {/* Desktop cover — full bleed 80vh with gradient overlay */}
        <div className="relative hidden h-[80vh] min-h-[560px] w-full overflow-hidden bg-[var(--bg-2)] md:block">
          <Image
            src={cover}
            alt={t(`items.${slug}.title`)}
            fill
            priority
            sizes="100vw"
            className="t-photo object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-6 pb-16 md:-mt-56 md:px-12">
          <Link
            href={`/${locale}/works`}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
          >
            ← {locale === "fr" ? "Retour" : "Back"}
          </Link>

          <p className="t-eyebrow mt-8 md:mt-12">{t(`items.${slug}.scope`)}</p>
          <h1 className="t-display mt-6 max-w-5xl break-words text-5xl text-[var(--fg)] sm:text-6xl md:text-8xl lg:text-9xl">
            {t(`items.${slug}.title`)}
          </h1>
          <p className="t-display-italic mt-6 max-w-3xl text-xl text-[var(--fg-2)] sm:text-2xl md:text-3xl">
            {t(`items.${slug}.subtitle`)}
          </p>
        </div>
      </header>

      {/* Editorial intro paragraph */}
      <section className="border-y border-[var(--rule)]">
        <div className="mx-auto max-w-4xl px-6 py-20 md:px-12 md:py-28">
          <p className="text-xl leading-relaxed text-[var(--fg)] md:text-2xl">
            {t(`items.${slug}.description`)}
          </p>
        </div>
      </section>

      {/* Gallery — editorial mosaic, varied aspect ratios */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
          <Mosaic photos={gallery} alt={t(`items.${slug}.title`)} />
        </section>
      )}

      {/* Next project — keeps visitors deep in the work */}
      <NextProject locale={locale} nextSlug={nextSlug} nextCover={nextCover} />

      {/* Closing CTA — Book a call */}
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
 * NextProject — invites the visitor to jump straight to the next case
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
 * Mosaic — éditorial luxe, supporte N photos.
 * Pattern de 5 visuels qui se répète pour absorber n'importe quelle longueur :
 *   1. Wide landscape (16/9 plein écran)
 *   2-3. Split asymétrique 7/5 (deux portraits)
 *   4. Wide landscape (16/10)
 *   5-6. Two equal columns (4/5)
 * Au-delà de 6, on relance le cycle. Le rythme magazine est conservé.
 */
function Mosaic({ photos, alt }: { photos: string[]; alt: string }) {
  if (photos.length === 0) return null;

  // Découpe les photos en groupes de 6 (un cycle de la mosaic desktop)
  const cycles: string[][] = [];
  for (let i = 0; i < photos.length; i += 6) {
    cycles.push(photos.slice(i, i + 6));
  }

  return (
    <>
      {/* Mobile — photos complètes en ratio natif, sans crop */}
      <div className="space-y-6 md:hidden">
        {photos.map((src) => (
          <div
            key={src}
            className="relative w-full overflow-hidden bg-[var(--bg-2)]"
          >
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1067}
              sizes="100vw"
              className="t-photo h-auto w-full"
            />
          </div>
        ))}
      </div>

      {/* Desktop — mosaïque éditoriale magazine */}
      <div className="hidden space-y-6 md:block md:space-y-8">
        {cycles.map((cycle, idx) => (
          <MosaicCycle key={idx} photos={cycle} alt={alt} />
        ))}
      </div>
    </>
  );
}

function MosaicCycle({ photos, alt }: { photos: string[]; alt: string }) {
  return (
    <div className="grid gap-6 md:gap-8">
      {photos[0] && (
        <div className="group relative aspect-[16/9] overflow-hidden bg-[var(--bg-2)]">
          <Image
            src={photos[0]}
            alt={alt}
            fill
            sizes="100vw"
            className="t-photo object-cover"
          />
        </div>
      )}

      {(photos[1] || photos[2]) && (
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          {photos[1] && (
            <div className="group relative aspect-[3/4] overflow-hidden bg-[var(--bg-2)] md:col-span-7">
              <Image
                src={photos[1]}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="t-photo object-cover"
              />
            </div>
          )}
          {photos[2] && (
            <div className="group relative aspect-[3/4] self-end overflow-hidden bg-[var(--bg-2)] md:col-span-5">
              <Image
                src={photos[2]}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="t-photo object-cover"
              />
            </div>
          )}
        </div>
      )}

      {photos[3] && (
        <div className="group relative aspect-[16/10] overflow-hidden bg-[var(--bg-2)]">
          <Image
            src={photos[3]}
            alt={alt}
            fill
            sizes="100vw"
            className="t-photo object-cover"
          />
        </div>
      )}

      {(photos[4] || photos[5]) && (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {[photos[4], photos[5]].filter(Boolean).map((src, i) => (
            <div
              key={src ?? i}
              className="group relative aspect-[4/5] overflow-hidden bg-[var(--bg-2)]"
            >
              <Image
                src={src as string}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="t-photo object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
