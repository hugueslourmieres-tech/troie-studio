"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  VIDEOS,
  type VideoItem,
  embedUrl,
  thumbnailUrl,
} from "@/lib/data/videos";
import { useNearViewport } from "./LazyVideo";

/**
 * VideoCarousel, corporate films + YouTube testimonials.
 *
 * - Local mp4 cards autoplay muted in B&W, click → colour + sound.
 * - YouTube cards show the thumbnail in B&W, click → youtube-nocookie
 *   iframe with autoplay + sound, starting at 10s by default.
 * - Same 3:4 portrait crop for everything so the carousel stays
 *   visually consistent.
 * - Only one card can be active at a time.
 * - `exclude` : identifiants YouTube à masquer (la video Autajon est déjà
 *   montrée par ProofCase sur l'accueil et /medias).
 */
export function VideoCarousel({
  locale,
  exclude,
}: {
  locale: string;
  exclude?: string[];
}) {
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const items = VIDEOS.filter(
    (v) => !(v.kind === "youtube" && exclude?.includes(v.youtubeId)),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [sel, setSel] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setSnaps(emblaApi.scrollSnapList());
      setSel(emblaApi.selectedScrollSnap());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    emblaApi.on("settle", update);
    return () => {
      emblaApi.off("settle", update);
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const nav =
    "inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform,opacity] duration-200 hover:text-[var(--fg)] active:scale-[0.92] disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-6">
          {items.map((v, i) => (
            <div
              key={i}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <VideoCard
                video={v}
                index={i}
                lang={lang}
                active={activeIdx === i}
                onActivate={() => setActiveIdx(i)}
                onDeactivate={() => setActiveIdx(null)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Comme sur l'accueil : flèches aux bords, points au centre. */}
      <div className="mt-6 flex items-center justify-between">
        <button type="button" aria-label={lang === "en" ? "Previous" : "Précédent"} onClick={scrollPrev} disabled={!canPrev} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform,opacity] duration-200 hover:text-[var(--fg)] active:scale-[0.92] disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
          <CaretLeft weight="bold" className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`${i + 1} / ${snaps.length}`}
              aria-current={i === sel ? "true" : undefined}
              className="group flex h-8 items-center px-[3px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]"
            >
              <span
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === sel ? "w-6 bg-[var(--fg)]" : "w-1.5 bg-[var(--rule-strong)] group-hover:bg-[var(--fg-2)]"}`}
              />
            </button>
          ))}
        </div>
        <button type="button" aria-label={lang === "en" ? "Next" : "Suivant"} onClick={scrollNext} disabled={!canNext} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform,opacity] duration-200 hover:text-[var(--fg)] active:scale-[0.92] disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
          <CaretRight weight="bold" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function VideoCard({
  video,
  index,
  lang,
  active,
  onActivate,
  onDeactivate,
}: {
  video: VideoItem;
  index: number;
  lang: "fr" | "en";
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <article className="flex flex-col">
      <div
        className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-[var(--bg-2)]"
        onClick={() => (active ? onDeactivate() : onActivate())}
        role="button"
        tabIndex={0}
        aria-label={video.title[lang]}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            active ? onDeactivate() : onActivate();
          }
        }}
      >
        {video.kind === "local" ? (
          <LocalMedia video={video} active={active} />
        ) : (
          <YouTubeMedia video={video} active={active} title={video.title[lang]} />
        )}

        {active && (
          <button
            type="button"
            aria-label={lang === "en" ? "Close" : "Fermer"}
            onClick={(e) => {
              e.stopPropagation();
              onDeactivate();
            }}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-[var(--bg)]/90 font-mono text-xs text-[var(--fg)] transition hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            ✕
          </button>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="t-display text-xl text-[var(--fg)] md:text-2xl">
          {video.client}
        </h3>
        <span className="text-sm text-[var(--fg-2)]/60 font-medium">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 max-w-md text-sm text-[var(--fg-2)]/70">
        {video.title[lang]}
      </p>
    </article>
  );
}

/**
 * LocalMedia, autoplay muted B&W loop preview; click toggles colour + sound.
 */
function LocalMedia({
  video,
  active,
}: {
  video: Extract<VideoItem, { kind: "local" }>;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Téléchargée seulement à l'approche de l'écran (voir LazyVideo).
  const near = useNearViewport(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      el.muted = false;
      el.loop = false;
      el.currentTime = 0;
      el.play().catch(() => {
        /* autoplay rules, ignore */
      });
    } else {
      el.muted = true;
      el.loop = true;
      if (!el.paused) el.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      src={near ? video.src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="h-full w-full object-cover transition-[filter] duration-700"
      style={{
        // Noir et blanc au repos, couleur pour la vidéo active (21/10/2026).
        filter: active ? "none" : "grayscale(1)",
      }}
    />
  );
}

/**
 * YouTubeMedia, thumbnail B&W with a play overlay, swaps to a
 * youtube-nocookie iframe when active.
 */
function YouTubeMedia({
  video,
  active,
  title,
}: {
  video: Extract<VideoItem, { kind: "youtube" }>;
  active: boolean;
  title: string;
}) {
  if (active) {
    return (
      <iframe
        src={embedUrl(video.youtubeId, video.start)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <>
      <Image
        src={thumbnailUrl(video.youtubeId)}
        alt={title}
        fill
        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
      />
      {/* Play overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--bg)]/70 bg-[var(--bg)]/15 backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-[var(--accent)] md:h-16 md:w-16">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-5 w-5 text-[var(--bg)]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </>
  );
}
