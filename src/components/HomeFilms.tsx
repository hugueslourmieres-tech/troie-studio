"use client";

import { useEffect, useRef } from "react";

/**
 * Films clients en boucle (21/10/2026) : extraits verticaux tournés et
 * montés par l'équipe, muets, lancés seulement quand ils sont à l'écran.
 * Noir et blanc au repos, couleur au survol (DA du site).
 */
const FILMS = [
  { src: "/images/creation/video/exact2.mp4", fr: "X-Rite, lancement de l'eXact 2 à Paris", en: "X-Rite, eXact 2 launch in Paris" },
  { src: "/images/creation/video/gs.mp4", fr: "GS Monaco, reels", en: "GS Monaco, reels" },
  { src: "/images/creation/video/ferrari.mp4", fr: "Ferrari Auctions, reels", en: "Ferrari Auctions, reels" },
];

const COPY = {
  fr: {
    title: "Nos films.",
    body: "Témoignages clients, lancements de produits, reels. Tournés et montés par l'équipe, pensés pour vendre.",
    more: "Tous les films",
  },
  en: {
    title: "Our films.",
    body: "Customer stories, product launches, reels. Shot and edited by the team, made to sell.",
    more: "All films",
  },
} as const;

function Film({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="group">
      <div className="overflow-hidden rounded-2xl bg-[var(--bg-2)]">
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="aspect-[9/16] w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
        />
      </div>
      <figcaption className="mt-3 text-[15px] text-[var(--fg-2)]">{label}</figcaption>
    </figure>
  );
}

export function HomeFilms({ locale }: { locale: string }) {
  const en = locale === "en";
  const c = COPY[en ? "en" : "fr"];
  return (
    <section id="films" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="t-display text-4xl text-[var(--fg)] md:text-5xl">{c.title}</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.body}</p>
          <a
            href={`/${locale}/medias`}
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]"
          >
            {c.more}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8 lg:gap-5">
          {FILMS.map((f, i) => (
            <div key={f.src} className={i === 2 ? "hidden sm:block" : undefined}>
              <Film src={f.src} label={en ? f.en : f.fr} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
