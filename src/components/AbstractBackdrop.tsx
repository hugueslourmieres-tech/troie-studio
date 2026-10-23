import type { ReactNode } from "react";

/**
 * Fond abstrait vivant (23/10/2026) : deux toiles floues aux couleurs de la
 * bannière LinkedIn de Hugues (roses, magenta, verts, jaune-vert) qui
 * dérivent lentement et se fondent l'une dans l'autre. Le contenu posé
 * dessus reste blanc et net. Immobile si l'utilisateur réduit les animations.
 */
export function AbstractBackdrop({
  a = "/images/art/art-1.jpg",
  b = "/images/art/art-4.jpg",
  className = "",
  children,
}: {
  a?: string;
  b?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 saturate-[1.2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a} alt="" className="abstract-drift-a absolute inset-[-12%] h-[124%] w-[124%] max-w-none object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={b} alt="" className="abstract-drift-b absolute inset-[-12%] h-[124%] w-[124%] max-w-none object-cover" />
      </div>
      {children}
    </div>
  );
}
