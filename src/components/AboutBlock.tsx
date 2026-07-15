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

/* Portraits : identiques dans les deux langues, seuls rôle et note changent. */
const TEAM_MEDIA = {
  hugues: {
    name: "Hugues Lourmieres",
    img: "/images/about/hugues-studio.jpg",
    pos: "center 14%",
    link: { href: "https://www.linkedin.com/in/hugueslourmieres/", label: "LinkedIn" },
  },
  vanessa: {
    name: "Vanessa Nobrega",
    img: "/images/about/vanessa-v2.jpg",
    pos: "center 12%",
    link: { href: "https://vanessanobrega.com", label: "vanessanobrega.com" },
  },
  gilles: {
    name: "Gilles Pons",
    img: "/images/about/gilles-pons.jpg",
    pos: "center",
    link: { href: "https://www.linkedin.com/in/gilles-pons-370569b9/", label: "LinkedIn" },
  },
  thibaud: {
    name: "Thibaud Lourmieres",
    img: "/images/about/thibaud-v2.jpg",
    pos: "center 18%",
  },
} as const;

/* La section codait tout en français et le servait sur /en : 10 chaînes
   fuyaient (titres, prestations, rôles de l'équipe). */
const COPY = {
  fr: {
    eyebrow: "Qui sommes-nous",
    title: "L'Atelier TROIE vous accompagne.",
    sub: "Une équipe pluridisciplinaire pour tous vos projets digitaux.",
    prestations: [
      "Sites web & applications",
      "Design & identité de marque",
      "E-commerce",
      "Photographie & vidéo",
      "Stratégie & communication",
      "Formations IA",
      "Formations outils digitaux",
      "Agents IA & automatisation",
    ],
    teamLabel: "L'équipe",
    prev: "Précédent",
    next: "Suivant",
    team: {
      hugues: { role: "Fondateur & CEO", note: "CMO dans les arts graphiques. Créateur et consultant IA." },
      vanessa: { role: "Consultante IA & Communication", note: "Anciennement à la Maison de l'Intelligence Artificielle." },
      gilles: { role: "Lead développeur", note: "Développement fullstack : sites, applications et agents IA." },
      thibaud: { role: "Créateur de médias", note: "Réalisateur de films, vidéos et photographie." },
    },
  },
  en: {
    eyebrow: "Who we are",
    title: "The TROIE studio, at your side.",
    sub: "A multidisciplinary team for all your digital projects.",
    prestations: [
      "Websites & apps",
      "Design & brand identity",
      "E-commerce",
      "Photography & video",
      "Strategy & communication",
      "AI training",
      "Digital tools training",
      "AI agents & automation",
    ],
    teamLabel: "The team",
    prev: "Previous",
    next: "Next",
    team: {
      hugues: { role: "Founder & CEO", note: "CMO in the graphic arts industry. AI builder and consultant." },
      vanessa: { role: "AI & Communication consultant", note: "Formerly at the Maison de l'Intelligence Artificielle." },
      gilles: { role: "Lead developer", note: "Full-stack development: websites, apps and AI agents." },
      thibaud: { role: "Media creator", note: "Film director, video and photography." },
    },
  },
} as const;

export function AboutBlock({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const scrollerRef = useRef<HTMLUListElement>(null);

  const TEAM: Member[] = (Object.keys(TEAM_MEDIA) as (keyof typeof TEAM_MEDIA)[]).map(
    (k) => ({ ...TEAM_MEDIA[k], ...c.team[k] }),
  );

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
          <p className="t-eyebrow">{c.eyebrow}</p>
          <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            {c.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.sub}
          </p>
          <ul className="mt-8 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
            {c.prestations.map((p) => (
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
            {c.teamLabel}
          </p>
          <div className="hidden items-center gap-2.5 md:flex">
            <button
              type="button"
              onClick={() => slide(-1)}
              aria-label={c.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => slide(1)}
              aria-label={c.next}
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
