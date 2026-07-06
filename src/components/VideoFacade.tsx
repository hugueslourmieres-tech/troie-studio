"use client";

import { useState } from "react";

/**
 * VideoFacade : aperçu propre (poster N&B + bouton lecture) qui charge
 * l'iframe YouTube seulement au clic. Évite la miniature YouTube
 * putaclic et allège le chargement initial.
 */
export function VideoFacade({
  youtubeSrc,
  poster,
  title,
}: {
  youtubeSrc: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const playSrc = `${youtubeSrc}${youtubeSrc.includes("?") ? "&" : "?"}autoplay=1`;

  return (
    <div className="relative aspect-video overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--ink)]">
      {playing ? (
        <iframe
          src={playSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Lire la vidéo : ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ filter: "grayscale(1)" }}
          />
          <span className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/5" />
          <span className="absolute left-1/2 top-1/2 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--bg)]/92 text-[var(--fg)] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
