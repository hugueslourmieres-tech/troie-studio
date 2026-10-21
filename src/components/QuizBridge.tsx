import { Reveal } from "./Reveal";
import { GreekMark } from "./GreekMark";

/**
 * Le seul pont du studio vers troie.app (9/10/2026). Il remplace la grande
 * section « Le campus » (CampusBridge) : troie.app n'est plus un campus
 * payant mais douze quiz pratiques, gratuits et sans compte. Le studio
 * n'en parle donc plus qu'en une bande courte et un lien, « Nos quiz
 * gratuits », comme le recommandait l'audit du 9/10.
 */
const APP_URL = "https://troie.app";

const COPY = {
  fr: {
    label: "Nos quiz gratuits, troie.app",
    title: "Apprendre à utiliser l'IA, en deux minutes.",
    lede: "Douze petits quiz pratiques pour le travail, l'école et le quotidien. Un texte à copier dans ChatGPT, Claude, Gemini ou Le Chat, puis trois questions pour finir. Gratuit, sans compte.",
    cta: "Nos quiz gratuits",
  },
  en: {
    label: "Our free quizzes, troie.app",
    title: "Learn to use AI, in two minutes.",
    lede: "Twelve short practical quizzes for work, school and everyday life. A text to copy into ChatGPT, Claude, Gemini or Le Chat, then three questions to finish. Free, no account. In French for now.",
    cta: "Our free quizzes",
  },
} as const;

export function QuizBridge({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <Reveal>
        <div className="mx-auto grid max-w-7xl items-end gap-8 px-6 py-16 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 md:px-12 md:py-20">
          <div>
            <GreekMark label={c.label} />
            <h2 className="t-display mt-5 max-w-2xl text-3xl leading-[1.05] text-[var(--fg)] md:text-4xl lg:text-5xl">
              {c.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.lede}</p>
          </div>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener"
            className="group/cta inline-flex items-center gap-3 self-start bg-[var(--accent)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] md:self-end"
          >
            {c.cta}
            <span aria-hidden="true" className="transition group-hover/cta:translate-x-1">
              →
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
