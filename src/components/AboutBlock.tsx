import Image from "next/image";
import { useTranslations } from "next-intl";
import { Emblem } from "./Emblem";

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
        {/* HUGUES, fondateur & CEO */}
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="group md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg)]">
              <Image
                src="/images/about/hugues-portrait.jpg"
                alt="Hugues Lourmieres, fondateur et CEO de TROIE"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative md:col-span-7">
            {/* Discreet warrior watermark on the right of the about copy */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-12 hidden opacity-40 md:block"
            >
              <Emblem className="h-72 w-auto" />
            </div>

            <p className="t-eyebrow relative">{t("aboutEyebrow")}</p>
            <h2 className="t-display relative mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {t("aboutTitle")}
            </h2>
            <p className="relative mt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
              Fondateur &amp; CEO, TROIE
            </p>
            <p className="relative mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85">
              {t("aboutBody")}
            </p>
            <ul className="relative mt-12 grid gap-4 border-t border-[var(--rule)] pt-10 md:grid-cols-2">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-baseline gap-4 text-sm text-[var(--fg-2)]"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-px w-3 flex-shrink-0 bg-[var(--accent)]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* L'EQUIPE */}
        <div className="mt-24 border-t border-[var(--rule)] pt-16 md:mt-32 md:pt-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="md:max-w-2xl">
              <p className="t-eyebrow">L&apos;équipe</p>
              <h3 className="t-display mt-6 text-3xl text-[var(--fg)] md:text-4xl lg:text-5xl">
                Des talents complémentaires.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Une cellule resserrée : conseil en IA et communication, création
                de médias. La même exigence, du conseil à la production.
              </p>
            </div>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 md:gap-12">
            {TEAM.map((m) => (
              <li key={m.name} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#ece4d6]">
                  <Image
                    src={m.img}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ filter: "grayscale(1) contrast(1.03)", objectPosition: m.pos }}
                  />
                </div>
                <h4 className="t-display mt-6 text-2xl text-[var(--fg)] md:text-3xl">
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
