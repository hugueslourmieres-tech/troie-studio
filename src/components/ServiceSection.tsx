import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export type Photo = { src: string; alt: string };
export type Tool = { src: string; label: string };

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  photos: Photo[];
  tools?: Tool[];
  reverse?: boolean;
  id?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Service section — un pilier (Création / Stratégie / Formation).
 * Texte 5 colonnes / photos 7 colonnes, inversable.
 * Le PhotoMosaic supporte automatiquement photo + vidéo : si le `src`
 * se termine par .mov / .mp4 / .webm, on rend une `<video>` autoplay
 * muted loop à la place de l'`Image`.
 */
export function ServiceSection({
  eyebrow,
  title,
  body,
  items,
  photos,
  tools,
  reverse = false,
  id,
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <section
      id={id}
      className="border-t border-[var(--accent)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <div
          className={`grid gap-16 md:grid-cols-12 md:gap-20 ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Text column */}
          <div className="md:col-span-5">
            <Reveal direction={reverse ? "right" : "left"}>
              <p className="t-eyebrow">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1} direction={reverse ? "right" : "left"}>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-md text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
                {body}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-12 space-y-3 border-t border-[var(--rule)] pt-8">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-px w-3 flex-shrink-0 bg-[var(--accent)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {tools && tools.length > 0 && (
              <Reveal delay={0.4}>
                <ToolsRow tools={tools} />
              </Reveal>
            )}

            {/* Desktop CTA — stays under the bullets / tools, in the text column */}
            {ctaLabel && ctaHref && (
              <Reveal delay={0.5}>
                <Link
                  href={ctaHref}
                  className="group mt-12 hidden items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex"
                >
                  {ctaLabel}
                  <span
                    aria-hidden="true"
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            )}
          </div>

          {/* Photo column */}
          <div className="md:col-span-7">
            <Reveal delay={0.15} direction={reverse ? "left" : "right"}>
              <PhotoMosaic photos={photos} />
            </Reveal>

            {/* Mobile CTA — sits below the photos on mobile only */}
            {ctaLabel && ctaHref && (
              <Reveal delay={0.2}>
                <Link
                  href={ctaHref}
                  className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
                >
                  {ctaLabel}
                  <span
                    aria-hidden="true"
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const isVideo = (src: string) => /\.(mov|mp4|webm)$/i.test(src);

/**
 * ToolsRow — rangée discrète de logos sous les bullets.
 * Monochrome noir via filter brightness(0), opacité réduite.
 * Texte caption au-dessus pour contextualiser ("Outils utilisés").
 */
function ToolsRow({ tools }: { tools: Tool[] }) {
  return (
    <div className="mt-10 border-t border-[var(--rule)] pt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
        Outils utilisés
      </p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        {tools.map((t) => (
          <li
            key={t.src}
            title={t.label}
            className="flex h-6 items-center opacity-55 transition-opacity duration-300 hover:opacity-95"
          >
            <img
              src={t.src}
              alt={t.label}
              loading="lazy"
              className="h-6 w-auto"
              style={{ filter: "brightness(0)" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Media — slot polymorphe photo ↔ vidéo. Conserve la mécanique t-photo
 * (filtre N&B → couleur au survol) pour les deux types.
 */
function Media({
  photo,
  sizes,
}: {
  photo: Photo;
  sizes: string;
}) {
  if (isVideo(photo.src)) {
    return (
      <video
        src={photo.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={photo.alt}
        className="t-photo absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      className="t-photo object-cover"
    />
  );
}

function PhotoMosaic({ photos }: { photos: Photo[] }) {
  if (photos.length === 1) {
    return (
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg-2)]">
        <Media photo={photos[0]} sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {photos.map((p) => (
          <div
            key={p.src}
            className="group relative aspect-[3/4] overflow-hidden bg-[var(--bg-2)]"
          >
            <Media photo={p} sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="group relative aspect-[3/4] row-span-2 overflow-hidden bg-[var(--bg-2)]">
        <Media photo={photos[0]} sizes="(max-width: 768px) 50vw, 30vw" />
      </div>
      <div className="group relative aspect-[4/3] overflow-hidden bg-[var(--bg-2)]">
        <Media photo={photos[1]} sizes="(max-width: 768px) 50vw, 25vw" />
      </div>
      {photos[2] && (
        <div className="group relative aspect-[4/3] overflow-hidden bg-[var(--bg-2)]">
          <Media photo={photos[2]} sizes="(max-width: 768px) 50vw, 25vw" />
        </div>
      )}
    </div>
  );
}
