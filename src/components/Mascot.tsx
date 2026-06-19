"use client";

import { useEffect, useState } from "react";

/**
 * Mascotte robot TROIE (GIF). Le GIF est préchargé en JS : l'image n'est
 * rendue que si elle se charge réellement. Tant que le fichier n'existe pas,
 * le composant ne rend RIEN (aucune image cassée). Dès que le GIF est déposé
 * au chemin indiqué, il apparaît automatiquement.
 *
 * Fichiers attendus dans public/images/mascot/ :
 *   - robot.gif          (idle, dans la page et le dashboard)
 *   - robot-success.gif  (réussite d'un QCM)
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
