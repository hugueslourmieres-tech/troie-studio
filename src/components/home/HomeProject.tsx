import { ProjectForm } from "@/components/ProjectForm";

/**
 * Bloc 5 de l'accueil : le formulaire de projet. Les boutons « Décrire mon
 * projet » de la page descendent ici (#projet), besoin présélectionné.
 */

const COPY = {
  fr: {
    eyebrow: "Votre projet",
    title: "Parlez-nous de votre projet.",
    sub: "Dites-nous ce que vous voulez obtenir, pas comment le faire. Si vous hésitez sur un point, répondez « à définir ».",
    points: [
      "Une réponse sous 24 heures ouvrées",
      "Une proposition avec le calendrier et le prix",
      "Un échange d'abord, si le projet le demande",
    ],
  },
  en: {
    eyebrow: "Your project",
    title: "Tell us about your project.",
    sub: "Tell us what you want to achieve, not how to build it. If you're unsure about something, just answer “not sure yet”.",
    points: [
      "A reply within 24 business hours",
      "A proposal with timeline and price",
      "A call first, if the project needs it",
    ],
  },
} as const;

export function HomeProject({ locale }: { locale: string }) {
  const c = locale === "en" ? COPY.en : COPY.fr;

  return (
    <section id="projet" className="scroll-mt-16 border-t border-[var(--accent)] bg-[var(--bg)]">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-12 md:gap-16 md:px-12 md:py-36">
        <div className="md:col-span-5">
          <p className="t-eyebrow">{c.eyebrow}</p>
          <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl">{c.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.sub}</p>
          <ul className="mt-10 space-y-4 border-t border-[var(--rule)] pt-8">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--fg)]">
                <span aria-hidden="true" className="mt-[0.72em] inline-block h-[1.5px] w-3.5 flex-none bg-[var(--accent)]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <ProjectForm locale={locale} className="md:col-span-7" />
      </div>
    </section>
  );
}
