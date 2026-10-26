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
  links?: { href: string; label: string }[];
};

/* Portraits : identiques dans les deux langues, seuls rôle et note changent. */
const TEAM_MEDIA = {
  hugues: {
    name: "Hugues Lourmieres",
    img: "/images/about/hugues-studio.jpg",
    pos: "center 14%",
    /* Instagram en premier (1er/10/2026) : c'est le compte qui fait venir les
       visiteurs, le site doit y renvoyer. */
    links: [
      { href: "https://www.instagram.com/hugueslourmieres/", label: "Instagram" },
      { href: "https://www.linkedin.com/in/hugueslourmieres/", label: "LinkedIn" },
    ],
  },
  vanessa: {
    name: "Vanessa Nobrega",
    img: "/images/about/vanessa-v2.jpg",
    pos: "center 12%",
    links: [{ href: "https://vanessanobrega.com", label: "vanessanobrega.com" }],
  },
  gilles: {
    name: "Gilles Pons",
    img: "/images/about/gilles-pons.jpg",
    pos: "center",
    links: [{ href: "https://www.linkedin.com/in/gilles-pons-370569b9/", label: "LinkedIn" }],
  },
} as const;

/* La section codait tout en français et le servait sur /en : 10 chaînes
   fuyaient (titres, prestations, rôles de l'équipe).
   Réécrite le 1er/10/2026 : stratégie d'abord, l'IA n'apparaît que dans la
   dernière prestation. Le rôle de Vanessa reste un repère visible dans le
   proto, à remplacer par l'intitulé qu'elle aura validé avant toute
   publication. */
const COPY = {
  fr: {
    eyebrow: "Le studio",
    title: "Notre équipe.",
    sub: "Vous parlez directement aux personnes qui font votre projet.",
    prestations: [
      "Stratégie de marque et positionnement",
      "Conseil en communication",
      "Direction artistique",
      "Photographie et vidéo",
      "Sites web, applications et e-commerce",
      "Référencement et acquisition",
      "Direction marketing à temps partagé",
      "Ateliers et prise en main des outils, IA comprise",
    ],
    teamLabel: "L'équipe",
    team: {
      hugues: {
        role: "Fondateur",
        note: "Stratégie, photo et vidéo. Directeur marketing dans l'imprimerie.",
      },
      vanessa: {
        role: "Conseil en communication",
        note: "Vos messages et votre image de marque.",
      },
      gilles: { role: "Développeur principal", note: "Sites, applications et outils sur mesure." },
    },
  },
  en: {
    eyebrow: "The studio",
    title: "Our team.",
    sub: "You talk directly to the people who make your project.",
    prestations: [
      "Brand strategy and positioning",
      "Communication consulting",
      "Art direction",
      "Photography and video",
      "Websites, apps and e-commerce",
      "Search and acquisition",
      "Fractional marketing direction",
      "Workshops and getting started with tools, AI included",
    ],
    teamLabel: "The team",
    team: {
      hugues: {
        role: "Founder",
        note: "Strategy, photo and video. Marketing director in the printing industry.",
      },
      vanessa: {
        role: "Communication consultant",
        note: "Your messages and your brand image.",
      },
      gilles: { role: "Lead developer", note: "Websites, apps and custom tools." },
    },
  },
} as const;

export function AboutBlock({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const scrollerRef = useRef<HTMLUListElement>(null);

  const TEAM: Member[] = (Object.keys(TEAM_MEDIA) as (keyof typeof TEAM_MEDIA)[]).map(
    (k) => {
      const m = TEAM_MEDIA[k];
      return { ...m, ...c.team[k], links: "links" in m ? m.links.map((l) => ({ ...l })) : undefined };
    },
  );

  return (
    <section
      id="about"
      className="border-t border-[var(--rule)] bg-[var(--bg)] scroll-mt-24"
    >
      <div data-reveal className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
        {/* Présentation de l'équipe */}
        <div className="md:max-w-3xl">
          <h2 className="t-display text-4xl text-[var(--fg)] md:text-5xl">
            {c.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.sub}
          </p>
        </div>

        {/* Trois portraits : une ligne sur ordinateur, glisse tactile sur téléphone (flèches retirées le 24/10/2026). */}
        <ul
          ref={scrollerRef}
          style={{ scrollbarWidth: "none" }}
          className="mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 md:mt-14 md:gap-10 [&::-webkit-scrollbar]:hidden"
        >
          {TEAM.map((m) => (
            <li
              key={m.name}
              className="group flex w-[78%] flex-none snap-start flex-col sm:w-[46%] lg:w-[calc((100%-5rem)/3)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--bg-2)]">
                <Image
                  src={m.img}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ filter: "grayscale(1) contrast(1.03)", objectPosition: m.pos }}
                />
              </div>
              <h3 className="t-display mt-6 text-2xl text-[var(--fg)] md:text-[26px]">
                {m.name}
              </h3>
              <p className="text-sm mt-2 text-[var(--fg-2)] font-medium">
                {m.role}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--fg-2)]">
                {m.note}
              </p>
              {m.links && m.links.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
                  {m.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm group/link inline-flex w-fit items-center gap-2 border-b border-[var(--fg)] pb-1 text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
