import Link from "next/link";

/**
 * Section home "Devenez manager" : juste après le hero, elle tient la
 * promesse tout de suite. Part de l'audition d'Arthur Mensch (Mistral)
 * devant l'Assemblée nationale : nos métiers glissent de l'exécution
 * vers la supervision. Renvoie vers l'article de blog complet.
 *
 * Registre volontairement soutenu (ton presse), aucun chiffre avancé
 * sans l'article pour le sourcer.
 */

const COPY = {
  fr: {
    eyebrow: "Le vrai sujet",
    title: "Ne soyez pas remplacé. Devenez manager.",
    body: "Devant l'Assemblée nationale, le dirigeant de Mistral AI l'a formulé sans détour : nos métiers glissent de l'exécution vers la supervision. On cesse de tout faire à la main, on pilote des agents qui exécutent, et l'on conserve le dernier mot. Ce n'est pas une menace, c'est un nouveau rôle. Il s'apprend.",
    quote: "Vous n'êtes plus un artisan, vous êtes un manager.",
    quoteAttr: "Arthur Mensch, PDG de Mistral AI, devant l'Assemblée nationale",
    cta: "Lire l'article",
    caption: "Audition à l'Assemblée nationale, 12 mai 2026.",
    slug: "ia-remplacer-mon-metier-manager-pas-remplace",
  },
  en: {
    eyebrow: "The real question",
    title: "Don't get replaced. Become a manager.",
    body: "Before the French National Assembly, the head of Mistral AI put it plainly: our jobs are shifting from doing to supervising. You stop doing everything by hand, you direct agents that carry it out, and you keep the final say. It is not a threat, it is a new role. And it can be learned.",
    quote: "You are no longer a craftsman, you are a manager.",
    quoteAttr: "Arthur Mensch, CEO of Mistral AI, before the French National Assembly",
    cta: "Read the article",
    caption: "National Assembly hearing, May 12, 2026.",
    slug: "ia-remplacer-mon-metier-manager-pas-remplace",
  },
} as const;

export function ManagerSection({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Texte */}
          <div className="md:col-span-5">
            <p className="t-eyebrow">{c.eyebrow}</p>
            <h2 className="t-display mt-6 text-3xl leading-[1.1] text-[var(--fg)] md:text-5xl">
              {c.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {c.body}
            </p>
            <blockquote className="mt-8 border-l-2 border-[var(--accent)] pl-5">
              <p className="t-display text-xl italic text-[var(--fg)] md:text-2xl">
                « {c.quote} »
              </p>
              <cite className="mt-3 block font-mono text-[10px] uppercase not-italic tracking-[0.2em] text-[var(--fg-2)]/70">
                {c.quoteAttr}
              </cite>
            </blockquote>
            <Link
              href={`/${locale}/blog/${c.slug}`}
              className="group mt-9 inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
            >
              {c.cta}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Vidéo, audition Mensch, démarre au passage clé (6:15) */}
          <div className="md:col-span-7">
            <figure>
              <div className="relative aspect-video overflow-hidden rounded-sm border border-[var(--rule)] bg-[#1a1714]">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/vczBo0AvbTI?start=375"
                  title="Arthur Mensch (Mistral) devant l'Assemblée nationale"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
                {c.caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
