import { AnalyticsPanel } from "./AnalyticsPanel";
import { SpectrumBackdrop } from "./SpectrumBackdrop";
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
    <section id="chiffres" className="scroll-mt-20">
      {/* Section entière sur la toile spectre (DA « Prisme »), texte blanc. */}
      <SpectrumBackdrop scrim>
        <div data-reveal className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
          <h2 className="t-display text-4xl text-white md:text-5xl">{c.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{c.body}</p>
          <div className="mt-12 rounded-[22px] shadow-[0_40px_80px_-40px_rgba(13,14,18,0.6)]">
            <AnalyticsPanel locale={locale} extraClients={draftClients(en)} />
          </div>
        </div>
      </SpectrumBackdrop>
    </section>
  );
}
