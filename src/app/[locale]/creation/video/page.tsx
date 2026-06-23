import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";

const REELS = [
  { src: "/images/creation/video/gs.mp4", label: "Grand Sud · reel" },
  { src: "/images/creation/video/monaco.mp4", label: "Monaco · présentation" },
  { src: "/images/creation/video/exact2.mp4", label: "X-Rite eXact 2" },
  { src: "/images/creation/video/ferrari.mp4", label: "Ferrari Auctions" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Vidéo · Création",
    description:
      "Films de marque, reels social et présentations produit réalisés par TROIE.",
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
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24">
        <p className="t-eyebrow">Création · Vidéo</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          Vidéo.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
          Films de marque, reels social et présentations produit. Du concept au
          montage, pensés pour capter en quelques secondes.
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
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
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                {r.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
