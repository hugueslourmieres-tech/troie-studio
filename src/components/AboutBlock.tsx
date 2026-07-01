"use client";

import Image from "next/image";
import { useRef } from "react";

type Member = {
  name: string;
  role: string;
  note: string;
  img: string;
  /** Cadrage object-position pour bien centrer le visage. */
  pos: string;
  link?: { href: string; label: string };
};

const TEAM: Member[] = [
  {
    name: "Hugues Lourmieres",
    role: "Fondateur & CEO",
    note: "CMO dans les arts graphiques. Créateur et consultant IA.",
    img: "/images/about/hugues-studio.jpg",
    pos: "center 14%",
    link: { href: "https://www.linkedin.com/in/hugueslourmieres/", label: "LinkedIn" },
  },
  {
    name: "Vanessa Nobrega",
    role: "Consultante IA & Communication",
    note: "Anciennement à la Maison de l'Intelligence Artificielle.",
    img: "/images/about/vanessa-v2.jpg",
    pos: "center 12%",
    link: { href: "https://vanessanobrega.com", label: "vanessanobrega.com" },
  },
  {
    name: "Gilles Pons",
    role: "Lead développeur",
    note: "Développement fullstack : sites, applications et agents IA.",
    img: "/images/about/gilles-pons.jpg",
    pos: "center",
    link: { href: "https://www.linkedin.com/in/gilles-pons-370569b9/", label: "LinkedIn" },
  },
  {
    name: "Thibaud Lourmieres",
    role: "Créateur de médias",
    note: "Réalisateur de films, vidéos et photographie.",
    img: "/images/about/thibaud-v2.jpg",
    pos: "center 18%",
  },
];

/** Prestations proposées, listées sous l'intro de l'équipe. */
const PRESTATIONS = [
  "Sites web & applications",
  "Design & identité de marque",
  "E-commerce",
  "Photographie & vidéo",
  "Stratégie & communication",
  "Formations IA",
  "Formations outils digitaux",
  "Agents IA & automatisation",
];

export function AboutBlock() {
  const scrollerRef = useRef<HTMLUListElement>(null);

  const slide = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const gap = parseFloat(getComputedStyle(el).columnGap || "32") || 32;
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="border-t border-[var(--accent)] bg-[var(--bg)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        {/* Présentation de l'équipe */}
        <div className="md:max-w-3xl">
          <p className="t-eyebrow">Qui sommes-nous</p>
          <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Atelier, Studio, Équipe.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Nous vous accompagnons dans tous vos projets digitaux.
          </p>
          <ul className="mt-8 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
            {PRESTATIONS.map((p) => (
              <li
                key={p}
                className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base"
              >
                <span aria-hidden="true" className="inline-block h-px w-3.5 flex-shrink-0 bg-[var(--accent)]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ligne de contrôle : intitulé + flèches (desktop) */}
        <div className="mt-12 flex items-end justify-between md:mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--fg-2)]/70">
            L&apos;équipe
          </p>
          <div className="hidden items-center gap-2.5 md:flex">
            <button
              type="button"
              onClick={() => slide(-1)}
              aria-label="Précédent"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => slide(1)}
              aria-label="Suivant"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carrousel : glisse manuelle (flèches) + scroll horizontal tactile */}
        <ul
          ref={scrollerRef}
          style={{ scrollbarWidth: "none" }}
          className="mt-6 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 md:mt-8 md:gap-10 [&::-webkit-scrollbar]:hidden"
        >
          {TEAM.map((m) => (
            <li
              key={m.name}
              className="group flex w-[78%] flex-none snap-start flex-col sm:w-[46%] lg:w-[calc((100%-5rem)/3)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#ece4d6]">
                <Image
                  src={m.img}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ filter: "grayscale(1) contrast(1.03)", objectPosition: m.pos }}
                />
              </div>
              <h4 className="t-display mt-6 text-2xl text-[var(--fg)] md:text-[26px]">
                {m.name}
              </h4>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
                {m.role}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--fg-2)]">
                {m.note}
              </p>
              {m.link && (
                <a
                  href={m.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link mt-auto inline-flex w-fit items-center gap-2 self-start border-b border-[var(--fg)] pb-1 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {m.link.label}
                  <span aria-hidden="true" className="transition group-hover/link:translate-x-1">→</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
