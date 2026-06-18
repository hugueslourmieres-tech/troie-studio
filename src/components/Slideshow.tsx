"use client";

import { useEffect, useState } from "react";

/**
 * Slideshow simple : enchaîne des images en fondu, en boucle automatique.
 * Pas de dépendance, respecte prefers-reduced-motion (fige sur la 1re image).
 */
export function Slideshow({
  images,
  interval = 3800,
  className = "",
  imgStyle,
}: {
  images: string[];
  interval?: number;
  className?: string;
  imgStyle?: React.CSSProperties;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setI((p) => (p + 1) % images.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((src, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
          style={imgStyle}
        />
      ))}
      {/* Indicateurs */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((src, idx) => (
            <span
              key={src}
              aria-hidden="true"
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === i ? "w-5 bg-white/90" : "w-1.5 bg-white/45"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
