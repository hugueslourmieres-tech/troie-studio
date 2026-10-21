import { AnalyticsPanel } from "./AnalyticsPanel";
import { draftClients } from "@/lib/drafts";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Héros de l'accueil (21/10/2026, refonte « agence qui fait vendre ») :
 * fond blanc, la promesse en deux lignes, puis un vrai tableau de bord
 * client (LOIR Paris, données Shopify) qu'on peut explorer. Aucun chiffre
 * inventé : voir src/lib/results.ts.
 */
const COPY = {
  fr: {
    title: "Nous faisons grandir vos ventes.",
    body: "Sites, contenus, SEO et publicité, pilotés par une seule équipe et mesurés en chiffre d'affaires.",
    book: "Réserver 30 min",
    results: "Voir les résultats",
  },
  en: {
    title: "We grow your sales.",
    body: "Websites, content, SEO and advertising, run by one team and measured in revenue.",
    book: "Book 30 min",
    results: "See the results",
  },
} as const;

export function HomeHero({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-12 md:pt-36 md:pb-24">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <h1 className="t-display text-[2.6rem] leading-[1.02] text-[var(--fg)] sm:text-6xl lg:col-span-8 lg:text-[5.2rem]">
            {c.title}
          </h1>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-md text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-6 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98]"
              >
                {c.book}
              </a>
              <a
                href="#resultats"
                className="text-sm font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]"
              >
                {c.results}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <AnalyticsPanel locale={locale} extraClients={draftClients(locale === "en")} />
        </div>
      </div>
    </section>
  );
}
