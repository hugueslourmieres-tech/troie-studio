import { AnalyticsPanel } from "./AnalyticsPanel";
import { AbstractBackdrop } from "./AbstractBackdrop";
import { draftClients } from "@/lib/drafts";

/**
 * Le tableau de bord des clients, sous les films : on y explore les vraies
 * courbes, en pourcentages. Les cartes du premier écran y mènent.
 */
const COPY = {
  fr: { title: "Explorez les chiffres.", body: "Les vraies courbes de nos clients, lues dans leurs outils. Choisissez un client, puis un indicateur." },
  en: { title: "Explore the numbers.", body: "Our clients' real curves, read in their own tools. Pick a client, then a metric." },
} as const;

export function HomeDashboard({ locale }: { locale: string }) {
  const en = locale === "en";
  const c = COPY[en ? "en" : "fr"];
  return (
    <section id="chiffres" className="scroll-mt-20 border-t border-[var(--rule)]">
      <div data-reveal className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
        <h2 className="t-display text-4xl text-[var(--fg)] md:text-5xl">{c.title}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.body}</p>
        {/* Le tableau de bord posé sur un fond abstrait vivant (23/10/2026). */}
        <AbstractBackdrop a="/images/art/art-4.jpg" b="/images/art/art-1.jpg" className="-mx-5 mt-12 px-3 py-5 md:mx-0 md:rounded-[28px] md:p-8">
          <AnalyticsPanel locale={locale} extraClients={draftClients(en)} />
        </AbstractBackdrop>
      </div>
    </section>
  );
}
