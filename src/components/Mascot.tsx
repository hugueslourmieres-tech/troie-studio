"use client";

import { useEffect, useState } from "react";

/**
 * Troyie, la mascotte / assistant IA de TROIE Studio (PNG transparent, traits
 * noirs). L'image est préchargée en JS : elle n'est rendue que si elle se
 * charge réellement. Tant que le fichier n'existe pas, le composant ne rend
 * RIEN (aucune image cassée).
 *
 * Fichiers dans public/images/mascot/ :
 *   - troyie-face.png   (de face, idle : page formations, dashboard, sections)
 *   - troyie-happy.png  (bras levés, réussite d'un QCM)
 *   - troyie-side.png   (de profil)
 */
export function Mascot({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const img = new window.Image();
    img.onload = () => {
      if (alive) setReady(true);
    };
    img.onerror = () => {
      if (alive) setReady(false);
    };
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  if (!ready) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
