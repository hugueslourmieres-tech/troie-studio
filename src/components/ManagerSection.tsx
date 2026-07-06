import Link from "next/link";
import { VideoFacade } from "./VideoFacade";

/**
 * Section home "Devenez manager" : juste après le hero. Pose le vrai
 * sujet, la citation d'Arthur Mensch (Mistral) devant l'Assemblée
 * nationale, puis la vidéo de l'audition et le lien vers l'article.
 *
 * Registre soutenu (ton presse).
 */

const COPY = {
  fr: {
    eyebrow: "La valeur ajoutée",
    title: "L'IA exécute, vous pilotez.",
    quote: "Vous n'êtes plus un artisan, vous êtes un manager.",
    quoteAttr: "Arthur Mensch, PDG de Mistral AI, devant l'Assemblée nationale",
    caption: "Arthur Mensch (Mistral) devant l'Assemblée nationale, 12 mai 2026.",
    cta: "Lire l'article",
    slug: "ia-remplacer-mon-metier-manager-pas-remplace",
  },
  en: {
    eyebrow: "The added value",
    title: "AI executes. You steer.",
    quote: "You are no longer a craftsman, you are a manager.",
    quoteAttr: "Arthur Mensch, CEO of Mistral AI, before the French National Assembly",
    caption: "Arthur Mensch (Mistral) before the French National Assembly, May 12, 2026.",
    cta: "Read the article",
    slug: "ia-remplacer-mon-metier-manager-pas-remplace",
  },
} as const;

export function ManagerSection({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:px-12 md:py-32">
        <p className="t-eyebrow">{c.eyebrow}</p>
        <h2 className="t-display mt-6 text-4xl leading-[1.05] text-[var(--fg)] md:text-6xl">
          {c.title}
        </h2>
        <blockquote className="mx-auto mt-10 max-w-2xl">
          <p className="t-display text-2xl italic text-[var(--fg)] md:text-3xl">
            « {c.quote} »
          </p>
          <cite className="mt-4 flex items-center justify-center gap-3 font-mono text-[10px] uppercase not-italic tracking-[0.22em] text-[var(--fg-2)]/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/mistral.svg"
              alt="Mistral AI"
              className="h-4 w-auto opacity-80"
            />
            {c.quoteAttr}
          </cite>
        </blockquote>

        {/* Vidéo de l'audition + lien article */}
        <figure className="mx-auto mt-12 max-w-3xl md:mt-14">
          <VideoFacade
            youtubeSrc="https://www.youtube-nocookie.com/embed/vczBo0AvbTI?start=375"
            poster="/images/mensch-audition.jpg"
            title="Arthur Mensch (Mistral) devant l'Assemblée nationale"
          />
          <figcaption className="mt-5 flex flex-col items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
              {c.caption}
            </span>
            <Link
              href={`/${locale}/blog/${c.slug}`}
              className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--bg-2)] hover:text-[var(--fg)]"
            >
              {c.cta}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
