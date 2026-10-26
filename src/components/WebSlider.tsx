"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Project } from "./WebProjects";
import { IPhone, MacBook } from "./DeviceMockups";

/**
 * Accueil : le design de nos sites en slider (21/10/2026, demande de Hugues :
 * « on n'est pas obligé de scroller et de voir plein de trucs »). Chaque site
 * sur un MacBook, avec sa version mobile sur iPhone (22/10/2026), défilement horizontal aimanté, flèches et
 * compteur. Aperçus en noir et blanc, couleur au survol. Les vidéos ne
 * tournent que pour la diapositive visible.
 */
export function WebSlider({ projects, en }: { projects: Project[]; en: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];

  const go = useCallback((i: number) => {
    const el = track.current;
    const target = slides()[Math.max(0, Math.min(projects.length - 1, i))];
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [projects.length]);

  // Diapositive active = celle dont le bord gauche est le plus proche du début.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = el.scrollLeft;
        let best = 0;
        let dist = Infinity;
        slides().forEach((s, i) => {
          const d = Math.abs(s.offsetLeft - el.offsetLeft - x);
          if (d < dist) { dist = d; best = i; }
        });
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = projects.length - 1;
        setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [projects.length]);

  // Lecture des vidéos visibles seulement.
  useEffect(() => {
    const vids = Array.from(track.current?.querySelectorAll("video") ?? []);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && e.intersectionRatio > 0.5) v.play().catch(() => {});
        else v.pause();
      }),
      { threshold: [0, 0.5, 1] },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const nav =
    "inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-2)] transition-[color,transform,opacity] duration-200 hover:text-[var(--fg)] active:scale-[0.92] disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  return (
    <div>
      <ul
        ref={track}
        aria-label={en ? "Our websites" : "Nos sites"}
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] md:-ml-12 md:mr-[calc(50%-50vw)] md:scroll-px-12 md:gap-8 md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <li
            key={p.name}
            className="w-[86%] shrink-0 snap-start md:w-[72%] lg:w-[64%]"
            aria-roledescription={en ? "slide" : "diapositive"}
            aria-label={`${i + 1} / ${projects.length}, ${p.name}`}
          >
            <a href={p.href} target="_blank" rel="noreferrer" className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-2xl">
              {/* Le site sur MacBook, la version mobile ou l'application sur iPhone */}
              <div className="relative pb-[7%]">
                <MacBook className="w-[90%]">
                    {p.video ? (
                      <video
                        className="absolute inset-0 block h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        poster={p.desktop}
                        muted
                        loop
                        playsInline
                        preload={i < 2 ? "auto" : "metadata"}
                        aria-label={`${p.name}, ${en ? "animated preview" : "aperçu animé"}`}
                      >
                        <source src={p.video} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={p.desktop}
                        alt={`${p.name}, ${en ? "preview" : "aperçu"}`}
                        fill
                        sizes="(max-width: 768px) 86vw, 820px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    )}
                </MacBook>
                <div className="absolute bottom-0 right-0 w-[20%] min-w-[78px]">
                  <IPhone>
                    <Image
                      src={p.mobile}
                      alt={`${p.name}, ${en ? "mobile" : "sur mobile"}`}
                      fill
                      sizes="200px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </IPhone>
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--fg)] md:text-2xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-[var(--fg-2)]">{p.kind}</p>
                </div>
                <span className="hidden shrink-0 border-b border-[var(--fg)] pb-0.5 text-sm font-medium text-[var(--fg)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] sm:inline">
                  {p.label}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Comme sous les résultats du hero : flèches aux bords, points au centre. */}
      <div className="mt-6 flex items-center justify-between">
        <button type="button" className={nav} onClick={() => go(active - 1)} disabled={active === 0} aria-label={en ? "Previous website" : "Site précédent"}>
          <CaretLeft weight="bold" className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          {projects.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => go(i)}
              aria-label={p.name}
              aria-current={i === active ? "true" : undefined}
              className="group flex h-8 items-center px-[3px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]"
            >
              <span
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? "w-6 bg-[var(--fg)]" : "w-1.5 bg-[var(--rule-strong)] group-hover:bg-[var(--fg-2)]"}`}
              />
            </button>
          ))}
        </div>
        <button type="button" className={nav} onClick={() => go(active + 1)} disabled={active === projects.length - 1} aria-label={en ? "Next website" : "Site suivant"}>
          <CaretRight weight="bold" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
