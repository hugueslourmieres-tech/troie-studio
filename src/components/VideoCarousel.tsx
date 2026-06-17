"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  VIDEOS,
  type VideoItem,
  embedUrl,
  thumbnailUrl,
} from "@/lib/data/videos";

/**
 * VideoCarousel — corporate films + YouTube testimonials.
 *
 * - Local mp4 cards autoplay muted in B&W, click → colour + sound.
 * - YouTube cards show the thumbnail in B&W, click → youtube-nocookie
 *   iframe with autoplay + sound, starting at 10s by default.
 * - Same 3:4 portrait crop for everything so the carousel stays
 *   visually consistent.
 * - Only one card can be activé at a time.
 */
export function VideoCarousel({ locale }: { locale: string }) {
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-6">
          {VIDEOS.map((v, i) => (
            <div
              key={i}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <VideoCard
                vidéo={v}
                index={i}
                lang={lang}
                activé={activeIdx === i}
                onActivate={() => setActiveIdx(i)}
                onDeactivate={() => setActiveIdx(null)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={scrollPrev}
          disabled={!canPrev}
          className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={scrollNext}
          disabled={!canNext}
          className="flex h-11 w-11 items-center justify-center border border-[var(--fg)] text-[var(--fg)] transition disabled:opacity-30 enabled:hover:border-[var(--accent)] enabled:hover:text-[var(--accent)]"
        >
          →
        </button>
      </div>
    </div>
  );
}

function VideoCard({
  vidéo,
  index,
  lang,
  activé,
  onActivate,
  onDeactivate,
}: {
  vidéo: VideoItem;
  index: number;
  lang: "fr" | "en";
  activé: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <article className="flex flex-col">
      <div
        className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-[var(--bg-2)]"
        onClick={() => (activé ? onDeactivate() : onActivate())}
        role="button"
        tabIndex={0}
        aria-label={vidéo.title[lang]}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activé ? onDeactivate() : onActivate();
          }
        }}
      >
        {vidéo.kind === "local" ? (
          <LocalMedia vidéo={vidéo} activé={activé} />
        ) : (
          <YouTubeMedia vidéo={vidéo} activé={activé} title={vidéo.title[lang]} />
        )}

        {activé && (
          <button
            type="button"
            aria-label="Close"
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
          {vidéo.client}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 max-w-md text-sm text-[var(--fg-2)]/70">
        {vidéo.title[lang]}
      </p>
    </article>
  );
}

/**
 * LocalMedia — autoplay muted B&W loop preview; click toggles colour + sound.
 */
function LocalMedia({
  vidéo,
  activé,
}: {
  vidéo: Extract<VideoItem, { kind: "local" }>;
  activé: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (activé) {
      el.muted = false;
      el.loop = false;
      el.currentTime = 0;
      el.play().catch(() => {
        /* autoplay rules — ignore */
      });
    } else {
      el.muted = true;
      el.loop = true;
      if (!el.paused) el.pause();
    }
  }, [activé]);

  return (
    <video
      ref={ref}
      src={vidéo.src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="h-full w-full object-cover transition-[filter] duration-700"
      style={{
        filter: activé
          ? "none"
          : "grayscale(1) brightness(0.96) contrast(1.06)",
      }}
    />
  );
}

/**
 * YouTubeMedia — thumbnail B&W with a play overlay, swaps to a
 * youtube-nocookie iframe when activé.
 */
function YouTubeMedia({
  vidéo,
  activé,
  title,
}: {
  vidéo: Extract<VideoItem, { kind: "youtube" }>;
  activé: boolean;
  title: string;
}) {
  if (activé) {
    return (
      <iframe
        src={embedUrl(vidéo.youtubeId, vidéo.start)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-média; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <>
      <Image
        src={thumbnailUrl(vidéo.youtubeId)}
        alt={title}
        fill
        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.02]"
        style={{ filter: "grayscale(1) brightness(0.96) contrast(1.06)" }}
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
