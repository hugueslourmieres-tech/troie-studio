import Image from "next/image";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { WORKS } from "@/lib/works";
import { VideoCarousel } from "@/components/VideoCarousel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: "Médias",
    description: isFr
      ? "Réalisations photo et productions vidéo : maisons de luxe, hôtellerie, sport, industrie et nature."
      : "Photography and video productions: luxury houses, hospitality, sport, industry and nature.",
    alternates: {
      canonical: `/${locale}/medias`,
      languages: { fr: "/fr/medias", en: "/en/medias" },
    },
  };
}

export default async function MediasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MediasView locale={locale} />;
}

function MediasView({ locale }: { locale: string }) {
  const t = useTranslations("works");
  const isFr = locale === "fr";

  return (
    <article className="mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-44">
      <header className="max-w-3xl">
        <p className="t-eyebrow">/ Médias</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          Photo &amp; vidéo.
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">
          {isFr
            ? "Réalisations photo et productions vidéo : maisons de luxe, hôtellerie, sport, industrie et nature. Le détail des projets sur demande."
            : "Photography and video productions: luxury houses, hospitality, sport, industry and nature. Project details on request."}
        </p>
      </header>

      {/* Photographie */}
      <section className="mt-24 md:mt-28">
        <p className="t-eyebrow">{isFr ? "Photographie" : "Photography"}</p>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3">
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
                  style={{ objectPosition: w.coverPosition ?? "center" }}
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
      </section>

      {/* Vidéo */}
      <section className="mt-28 border-t border-[var(--rule)] pt-20 md:mt-36 md:pt-28">
        <p className="t-eyebrow">{isFr ? "Vidéo" : "Video"}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
          {isFr
            ? "Témoignages clients, films de marque et brand storytelling."
            : "Client testimonials, brand films and brand storytelling."}
        </p>
        <div className="mt-12">
          <VideoCarousel locale={locale} />
        </div>
      </section>
    </article>
  );
}
