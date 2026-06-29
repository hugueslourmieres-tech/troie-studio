import Image from "next/image";

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
    name: "Thibaud Lourmieres",
    role: "Créateur de médias",
    note: "Réalisateur de films, vidéos et photographie.",
    img: "/images/about/thibaud-v2.jpg",
    pos: "center 18%",
  },
  {
    name: "Gilles Pons",
    role: "Lead développeur",
    note: "Développement fullstack : sites, applications et agents IA.",
    img: "/images/about/gilles-pons.jpg",
    pos: "center",
    link: { href: "https://www.linkedin.com/in/gilles-pons-370569b9/", label: "LinkedIn" },
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
  "Agents IA & automatisation",
];

export function AboutBlock() {
  return (
    <section
      id="about"
      className="border-t border-[var(--accent)] bg-[var(--bg)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        {/* Présentation de l'équipe */}
        <div className="md:max-w-3xl">
          <p className="t-eyebrow">L&apos;équipe</p>
          <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Quatre talents, une seule exigence.
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

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 md:gap-10 lg:grid-cols-3">
          {TEAM.map((m) => (
            <li key={m.name} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#ece4d6]">
                <Image
                  src={m.img}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
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
