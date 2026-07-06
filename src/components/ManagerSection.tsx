/**
 * Section home "Devenez manager" : juste après le hero, elle pose le
 * vrai sujet et la citation d'Arthur Mensch (Mistral) devant
 * l'Assemblée nationale. La vidéo et le lien article vivent plus bas,
 * dans la section sombre AiUrgency.
 *
 * Registre soutenu (ton presse).
 */

const COPY = {
  fr: {
    eyebrow: "Le vrai sujet",
    title: "Ne soyez pas remplacé. Devenez manager.",
    quote: "Vous n'êtes plus un artisan, vous êtes un manager.",
    quoteAttr: "Arthur Mensch, PDG de Mistral AI, devant l'Assemblée nationale",
  },
  en: {
    eyebrow: "The real question",
    title: "Don't get replaced. Become a manager.",
    quote: "You are no longer a craftsman, you are a manager.",
    quoteAttr: "Arthur Mensch, CEO of Mistral AI, before the French National Assembly",
  },
} as const;

export function ManagerSection({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:px-12 md:py-32">
        <p className="t-eyebrow">{c.eyebrow}</p>
        <h2 className="t-display mt-6 text-3xl leading-[1.1] text-[var(--fg)] md:text-5xl">
          {c.title}
        </h2>
        <blockquote className="mx-auto mt-12 max-w-2xl">
          <p className="t-display text-2xl italic text-[var(--fg)] md:text-3xl">
            « {c.quote} »
          </p>
          <cite className="mt-4 block font-mono text-[10px] uppercase not-italic tracking-[0.22em] text-[var(--fg-2)]/70">
            {c.quoteAttr}
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
