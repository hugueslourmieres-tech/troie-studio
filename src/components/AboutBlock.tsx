import Image from "next/image";
import { useTranslations } from "next-intl";

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
    note: "Direction artistique, stratégie de marque et formation IA. Dix ans auprès de marques exigeantes, en France et à l'international.",
    img: "/images/about/hugues-2025.jpg",
    pos: "center 22%",
  },
  {
    name: "Vanessa Nobrega",
    role: "Consultante IA & Communication",
    note: "Anciennement à la Maison de l'Intelligence Artificielle.",
    img: "/images/about/vanessa.jpg",
    pos: "center 12%",
    link: { href: "https://vanessanobrega.com", label: "vanessanobrega.com" },
  },
  {
    name: "Thibaud Lourmieres",
    role: "Créateur de médias",
    note: "Réalisation photo & vidéo.",
    img: "/images/about/thibaud.jpg",
    pos: "center 18%",
  },
];

export function AboutBlock() {
  const t = useTranslations("home");
  const bullets = t.raw("aboutBullets") as string[];

  return (
    <section
      id="about"
      className="border-t border-[var(--accent)] bg-[var(--bg)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        {/* En-tête studio */}
        <div className="md:max-w-3xl">
          <p className="t-eyebrow">Le studio</p>
          <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            TROIE Studio.
          </h2>
          <p className="mt-8 text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg">
            {t("aboutBody")}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 border-t border-[var(--rule)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)]"
            >
              <span
                aria-hidden="true"
                className="inline-block h-px w-3 flex-shrink-0 bg-[var(--accent)]"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* L'équipe : les 3, ensemble */}
        <div className="mt-20 border-t border-[var(--rule)] pt-16 md:mt-28 md:pt-20">
          <p className="t-eyebrow">L&apos;équipe</p>
          <h3 className="t-display mt-6 text-3xl text-[var(--fg)] md:text-4xl">
            Trois talents, une exigence.
          </h3>

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
                    className="group/link mt-4 inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {m.link.label}
                    <span aria-hidden="true" className="transition group-hover/link:translate-x-1">→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
