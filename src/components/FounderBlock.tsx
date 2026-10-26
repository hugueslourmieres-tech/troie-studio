import Image from "next/image";

/*
 * Les engagements sont tirés de TROIE-PLATEFORME-DE-MARQUE.md (l.111, 233,
 * 288) et de /rentree. À valider par Hugues avant publication.
 *
 * Deux variantes : la normale pour l'accueil (#fondateur, avec engagements et
 * lien Instagram), la compacte pour /strategie (#qui, portrait réduit, sans
 * engagements ni Instagram).
 */

const INSTAGRAM_URL = "https://www.instagram.com/hugueslourmieres/";

const COPY = {
  fr: {
    alt: "Hugues Lourmieres, fondateur de TROIE Studio",
    eyebrow: "Qui pilote vos projets",
    title: "Un directeur marketing à vos côtés.",
    body: "Hugues Lourmieres a fondé TROIE. Il exerce la direction marketing depuis 2018. Aujourd'hui, il est directeur marketing dans l'industrie des arts graphiques. Il y pilote la stratégie de marque, l'acquisition et les contenus. Il est aussi photographe, vidéaste et directeur artistique. Il connaît les deux côtés de la table : celui qui décide et celui qui fabrique.",
    commitments: [
      "Un senior de l'équipe sur chaque projet stratégique.",
      "La personne qui vous conseille est celle qui fait.",
      "Nous faisons ce que nous disons.",
      "Une proposition écrite avant de commencer.",
      "Une date annoncée est une date tenue.",
    ],
    book: "Nous écrire",
    path: "Son parcours et ses résultats",
    insta: "Ses photos sur Instagram, @hugueslourmieres",
    compact: {
      eyebrow: "Qui vous accompagne",
      title: "Hugues Lourmieres, fondateur.",
      body: "Il exerce la direction marketing depuis 2018, aujourd'hui dans l'industrie des arts graphiques. Photographe, vidéaste et directeur artistique. Il suit chaque projet de stratégie.",
    },
  },
  en: {
    alt: "Hugues Lourmieres, founder of TROIE Studio",
    eyebrow: "Who leads your projects",
    title: "A marketing director by your side.",
    body: "Hugues Lourmieres founded TROIE. He has worked as a marketing director since 2018. Today he is marketing director in the graphic arts industry, where he runs brand strategy, acquisition and content. He is also a photographer, filmmaker and art director. He knows both sides of the table: the one who decides and the one who makes.",
    commitments: [
      "A senior from the team on every strategy project.",
      "The person who advises you is the person who does the work.",
      "We do what we say.",
      "A written proposal before we start.",
      "A date we give is a date we keep.",
    ],
    book: "Write to us",
    path: "His career and results",
    insta: "His photos on Instagram, @hugueslourmieres",
    compact: {
      eyebrow: "Who works with you",
      title: "Hugues Lourmieres, founder.",
      body: "He has worked as a marketing director since 2018, today in the graphic arts industry. Photographer, filmmaker and art director. He follows every strategy project.",
    },
  },
} as const;

// inline-block (et non inline-flex) : le long lien Instagram passe sur deux
// lignes à 375 px, la flèche doit suivre le dernier mot au lieu de partir à
// droite.
const LINK_CLS =
  "group/link inline-block max-w-full border-b border-[var(--fg)] pt-2 pb-1 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]";
const ARROW_CLS = "ml-2 inline-block transition group-hover/link:translate-x-1";

/**
 * Le fondateur : portrait noir et blanc, parcours, engagements et liens.
 */
export function FounderBlock({ locale, compact }: { locale: string; compact?: boolean }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const eyebrow = compact ? c.compact.eyebrow : c.eyebrow;
  const title = compact ? c.compact.title : c.title;
  const body = compact ? c.compact.body : c.body;

  return (
    <section
      id={compact ? "qui" : "fondateur"}
      className="border-t border-[var(--rule)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-sm bg-[#ece4d6] ${
                compact ? "max-w-[200px]" : "max-w-sm"
              }`}
            >
              <Image
                src="/images/about/hugues-studio.jpg"
                alt={c.alt}
                fill
                sizes={compact ? "200px" : "(max-width: 768px) 90vw, 40vw"}
                className="object-cover"
                style={{ filter: "grayscale(1) contrast(1.03)", objectPosition: "center 14%" }}
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {body}
            </p>

            {!compact && (
              <ul className="mt-8 grid max-w-xl gap-y-3">
                {c.commitments.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-px w-3.5 flex-shrink-0 bg-[var(--accent)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <a href={`/${locale}/hugues`} className={LINK_CLS}>
                {c.path}
                <span aria-hidden="true" className={ARROW_CLS}>→</span>
              </a>
              <a href={`/${locale}/contact#ecrire`} className={LINK_CLS}>
                {c.book}
                <span aria-hidden="true" className={ARROW_CLS}>→</span>
              </a>
              {!compact && (
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={LINK_CLS}>
                  {c.insta}
                  <span aria-hidden="true" className={ARROW_CLS}>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
