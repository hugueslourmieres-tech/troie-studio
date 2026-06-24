import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { VIDEOS } from "@/lib/data/videos";

const REELS = [
  { src: "/images/creation/video/gs.mp4", label: "Grand Sud · reel" },
  { src: "/images/creation/video/monaco.mp4", label: "Monaco · présentation" },
  { src: "/images/creation/video/exact2.mp4", label: "X-Rite eXact 2" },
  { src: "/images/creation/video/ferrari.mp4", label: "Ferrari Auctions" },
];

const CORPO = VIDEOS.filter((v) => v.kind === "youtube");
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Vidéo · Création",
    description:
      "Production vidéo B2B pour marques et industries : films de marque, reels, présentations produit, captations d'événements et témoignages clients.",
    alternates: {
      canonical: `/${locale}/creation/video`,
      languages: { fr: "/fr/creation/video", en: "/en/creation/video" },
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-20">
        <p className="t-eyebrow">Création · Vidéo</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          Vidéo.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
          Production vidéo B2B pour les marques et les industries. Films de
          marque, reels social, présentations produit, captations d&apos;événements
          et témoignages clients. Du concept au montage : on capte, on raconte,
          on prouve.
        </p>

        {/* Reels & social */}
        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)] md:mt-20">
          Reels &amp; social
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {REELS.map((r) => (
            <li key={r.src}>
              <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-[#1a0f08]">
                <video
                  src={r.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={r.label}
                  className="h-full w-full object-cover"
                  style={{ filter: "grayscale(1) contrast(1.05)" }}
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                {r.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Films corporate & témoignages (YouTube) */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
            Films corporate &amp; témoignages
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Le B2B qui se raconte.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Films de marque, cas clients et témoignages tournés pour des
            industriels et des marques, de Monaco à l&apos;international. Aperçu
            en noir et blanc, lecture sur YouTube.
          </p>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
            {CORPO.map((v) => (
              <li key={v.youtubeId}>
                <a
                  href={watch(v.youtubeId)}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-sm bg-[#1a0f08]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumb(v.youtubeId)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.05) brightness(0.92)" }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f5f0e6]/80 bg-[#1a1714]/35 text-[#f5f0e6] backdrop-blur-sm transition group-hover:bg-[var(--accent)] group-hover:text-[#1a1714]">
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--accent)]">
                    {v.client}
                  </p>
                  <h3 className="t-display mt-2 text-lg text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {v.title[locale === "en" ? "en" : "fr"]}
                  </h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
