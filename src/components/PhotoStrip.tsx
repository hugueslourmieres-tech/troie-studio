import Image from "next/image";
import { PHOTO_SIZES } from "@/lib/photo-sizes";

/**
 * Bande de photos qui défile sur le côté (21/10/2026). Chaque photo garde
 * ses proportions, à hauteur fixe : rien n'est rogné. Noir et blanc au
 * repos, couleur au survol, comme le reste du site.
 */
export function PhotoStrip({ photos, label }: { photos: string[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] md:-ml-12 md:mr-[calc(50%-50vw)] md:scroll-px-12 md:gap-4 md:px-12 [&::-webkit-scrollbar]:hidden"
    >
      {photos.map((src, i) => {
        const [w, h] = PHOTO_SIZES[src] ?? [1600, 1200];
        return (
          <li key={src} className="shrink-0 snap-start">
            <Image
              src={src}
              alt=""
              width={w}
              height={h}
              sizes="(max-width: 768px) 80vw, 560px"
              loading={i < 3 ? "eager" : "lazy"}
              className="t-photo h-[260px] w-auto rounded-xl md:h-[420px]"
            />
          </li>
        );
      })}
    </ul>
  );
}
