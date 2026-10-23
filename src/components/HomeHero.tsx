import { ResultCards } from "./ResultCards";
import { RotatingWord } from "./RotatingWord";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Premier écran (21/10/2026, contrat dans .impeccable/surfaces) : un titre
 * court, une phrase et l'appel, puis trois résultats réels qui se tracent.
 */
const COPY = {
  fr: {
    title: "Nous faisons grandir",
    lead: "vos",
    words: [
      { word: "ventes.", icon: "chart" },
      { word: "commandes.", icon: "package" },
      { word: "visites.", icon: "eye" },
      { word: "prospects.", icon: "target" },
      { word: "abonnés.", icon: "users" },
      { word: "demandes.", icon: "chat" },
    ],
    srWords: "ventes, commandes, visites, prospects, abonnés et demandes.",
    body: "Sites, applications, SEO, publicité, films et réseaux sociaux. Une seule équipe, des résultats mesurés.",
    book: "Réserver 30 min",
    project: "Décrire mon projet",
  },
  en: {
    title: "We grow",
    lead: "your",
    words: [
      { word: "sales.", icon: "chart" },
      { word: "orders.", icon: "package" },
      { word: "traffic.", icon: "eye" },
      { word: "leads.", icon: "target" },
      { word: "followers.", icon: "users" },
      { word: "bookings.", icon: "calendar" },
    ],
    srWords: "sales, orders, traffic, leads, followers and bookings.",
    body: "Websites, apps, SEO and SEA (online advertising), films and social media. One team, measured results.",
    book: "Book 30 min",
    project: "Describe my project",
  },
} as const;

export function HomeHero({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-12 md:pt-36 md:pb-24">
        <h1 className="t-display text-[2.5rem] leading-[1.02] text-[var(--fg)] sm:text-6xl lg:text-[5.5rem]">
          {c.title}{" "}
          <br />
          <span className="sr-only">{c.lead} {c.srWords}</span>
          <RotatingWord prefix={c.lead} items={c.words} />
        </h1>
        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[34rem] text-lg leading-relaxed text-[var(--fg-2)]">{c.body}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98]"
            >
              {c.book}
            </a>
            <a
              href={`/${locale}/contact#projet`}
              className="inline-flex h-12 items-center rounded-full border border-[var(--rule-strong)] px-6 text-[15px] font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--fg)]"
            >
              {c.project}
            </a>
          </div>
        </div>
        <div className="mt-12 md:mt-14">
          <ResultCards locale={locale} />
        </div>
      </div>
    </section>
  );
}
