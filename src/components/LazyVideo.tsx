"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

/**
 * Vidéo décorative en boucle qui ne se télécharge qu'à l'approche de l'écran
 * (24/09/2026). Avec `autoPlay`, le navigateur charge le fichier entier dès
 * l'ouverture de la page, quel que soit `preload` : l'accueil tirait ainsi
 * 6,6 Mo de vidéos avant le premier défilement. Hors écran, elle se met en
 * pause pour ne pas occuper le processeur.
 */
export function LazyVideo({
  src,
  ...rest
}: Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> & { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useNearViewport(ref);
  return <video ref={ref} src={near ? src : undefined} {...rest} />;
}

/**
 * Vrai dès que l'élément approche de l'écran (300 px de marge), puis le
 * reste. Relance la lecture en revenant à l'écran, la coupe en le quittant.
 */
export function useNearViewport(ref: React.RefObject<HTMLVideoElement | null>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          if (el.paused && el.currentSrc && el.muted) el.play().catch(() => {});
        } else if (!el.paused && el.muted) {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return near;
}
