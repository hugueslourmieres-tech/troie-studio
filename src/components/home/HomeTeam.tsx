import Image from "next/image";

/**
 * Bloc 4 de l'accueil : l'équipe et le rôle de chacun. Portraits et liens
 * identiques à AboutBlock ; seuls les rôles sont resserrés sur ce que
 * chacun apporte à un projet.
 */

const MEDIA = {
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
    link: undefined,
  },
} as const;

type Key = keyof typeof MEDIA;

const COPY: Record<
  "fr" | "en",
  { eyebrow: string; title: string; sub: string; team: Record<Key, { role: string; note: string }> }
> = {
  fr: {
    eyebrow: "Le studio",
    title: "L'équipe et le rôle de chacun.",
    sub: "Basés à Nice, nous travaillons partout en France et à l'international, sur place ou à distance.",
    team: {
      hugues: {
        role: "Fondateur",
        note: "Stratégie marketing, produit et IA. Directeur marketing à temps partagé dans les arts graphiques depuis 2018.",
      },
      vanessa: {
        role: "Conseil IA et communication",
        note: "Anciennement à la Maison de l'Intelligence Artificielle.",
      },
      gilles: {
        role: "Lead développeur",
        note: "Développement fullstack : sites, applications et agents IA.",
      },
      thibaud: {
        role: "Vidéo et photographie",
        note: "Réalisateur de films, vidéos et reportages photo.",
      },
    },
  },
  en: {
    eyebrow: "The studio",
    title: "The team, and who does what.",
    sub: "Based in Nice, we work across France and internationally, on site or remotely.",
    team: {
      hugues: {
        role: "Founder",
        note: "Marketing strategy, product and AI. Fractional CMO in the graphic arts industry since 2018.",
      },
      vanessa: {
        role: "AI and communications",
        note: "Formerly at the Maison de l'Intelligence Artificielle.",
      },
      gilles: {
        role: "Lead developer",
        note: "Full-stack development: websites, apps and AI agents.",
      },
      thibaud: {
        role: "Video and photography",
        note: "Director of films, videos and photo stories.",
      },
    },
  },
};

export function HomeTeam({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const keys = Object.keys(MEDIA) as Key[];

  return (
    <section id="studio" className="scroll-mt-20 border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <div className="max-w-3xl">
          <p className="t-eyebrow">{c.eyebrow}</p>
          <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl">{c.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.sub}</p>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {keys.map((k) => {
            const m = MEDIA[k];
            const t = c.team[k];
            return (
              <li key={k} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ece4d6]">
                  <Image
                    src={m.img}
                    alt={`${m.name}, ${t.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ filter: "grayscale(1) contrast(1.03)", objectPosition: m.pos }}
                  />
                </div>
                <h3 className="t-display mt-6 text-2xl text-[var(--fg)] md:text-[26px]">{m.name}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                  {t.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">{t.note}</p>
                {m.link && (
                  <a
                    href={m.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link mt-auto inline-flex w-fit items-center gap-2 border-b border-[var(--fg)] pb-1 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {m.link.label}
                    <span aria-hidden="true" className="transition group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
