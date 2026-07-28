"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type QcmSlide = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  icon: string;
  level: string;
  minutes: number;
};

/**
 * Slideshow des QCM sur le hero formations : fait défiler les QCM de départ
 * (cover en duotone orange + titre + niveau) pour montrer concrètement ce
 * qu'on propose. Auto-avance, points cliquables, lien vers le QCM affiché.
 */
export function QcmSlideshow({ quizzes }: { quizzes: QcmSlide[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (quizzes.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setI((p) => (p + 1) % quizzes.length),
      3400,
    );
    return () => window.clearInterval(id);
  }, [quizzes.length]);

  const active = quizzes[i];

  return (
    <div className="w-full overflow-hidden rounded-sm border border-[#f6ead4]/15 bg-[#241509]/80 backdrop-blur-sm">
      {/* Visuels empilés, crossfade */}
      <div className="relative aspect-[16/10] w-full">
        {quizzes.map((q, idx) => (
          <div
            key={q.slug}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={q.cover}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(1) contrast(1.1) brightness(0.9)" }}
              loading="lazy"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[var(--accent)] opacity-55 mix-blend-multiply"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#160b04] via-transparent to-transparent"
            />
          </div>
        ))}

        {/* Badge picto du QCM actif */}
        <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#f6ead4]/25 bg-[#160b04]/70 text-[#f6ead4]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d={active.icon} />
          </svg>
        </div>

        <span className="absolute right-5 top-5 font-mono text-[9px] uppercase tracking-[0.28em] text-[#f6ead4]/80">
          QCM gratuit
        </span>
      </div>

      {/* Texte du QCM actif */}
      <div className="p-5 md:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          {active.tagline}
        </p>
        <h3 className="t-display mt-2 text-2xl text-[#f6ead4]">{active.title}</h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f6ead4]/55">
          {active.level}, {active.minutes} min
        </p>

        <div className="mt-5 flex items-center justify-between">
          <Link
            href={`/formations/quiz/${active.slug}`}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f6ead4] transition-colors hover:text-[var(--accent)]"
          >
            Lancer le QCM
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>

          {/* Points de navigation */}
          <div className="flex items-center gap-2">
            {quizzes.map((q, idx) => (
              <button
                key={q.slug}
                type="button"
                aria-label={`Voir : ${q.title}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i
                    ? "w-5 bg-[var(--accent)]"
                    : "w-1.5 bg-[#f6ead4]/30 hover:bg-[#f6ead4]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
