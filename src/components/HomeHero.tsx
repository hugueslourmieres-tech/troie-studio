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
    words: ["ventes.", "commandes.", "visites.", "prospects.", "abonnés.", "demandes."],
    srWords: "ventes, commandes, visites, prospects, abonnés et demandes.",
    body: "Sites, films, réseaux sociaux, SEO et publicité. Une seule équipe, des résultats mesurés.",
    book: "Réserver 30 min",
    project: "Décrire mon projet",
  },
  en: {
    title: "We grow",
    lead: "your",
    words: ["sales.", "orders.", "traffic.", "leads.", "followers.", "bookings."],
    srWords: "sales, orders, traffic, leads, followers and bookings.",
    body: "Websites, films, social media, SEO and advertising. One team, measured results.",
    book: "Book 30 min",
    project: "Describe my project",
  },
} as const;

export function HomeHero({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-12 md:pt-36 md:pb-24">
        <h1 className="t-display text-[2.75rem] leading-[1.02] text-[var(--fg)] sm:text-6xl lg:text-[5.5rem]">
          {c.title}
          <br />
          {c.lead}{" "}
          <span className="sr-only">{c.srWords}</span>
          <RotatingWord words={c.words} />
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
              className="text-[15px] font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]"
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
