import Link from "next/link";
import { Reveal } from "./Reveal";
import { getQuiz } from "@/app/formations/quizzes";

const LEVELS = ["Débutant", "Intermédiaire", "Avancé"];

/**
 * Section QCM "niveau IA" : un seul QCM, pour tous (particuliers comme pros).
 * 10 questions, 3 niveaux de réussite, puis on propose les formations / contact.
 * Carte en vedette cliquable. DA TROIE.
 */
export function QcmSection() {
  const quiz = getQuiz("niveau-ia");
  if (!quiz) return null;

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="md:max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
              Pour tous · gratuit
            </p>
            <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              Testez vos connaissances en IA.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              Un seul QCM, 10 questions, pour situer votre niveau et savoir par
              où continuer. Particulier ou professionnel : tout le monde gagne à
              connaître son point de départ. C&apos;est gratuit et ça prend 6 minutes.
            </p>
          </div>
        </Reveal>

        {/* Carte QCM en vedette */}
        <Reveal>
          <Link
            href={`/formations/quiz/${quiz.slug}`}
            className="group mt-12 grid overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)] md:mt-16 md:grid-cols-2"
          >
            {/* Cover N&B */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#1a0f08] md:aspect-auto md:min-h-[340px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quiz.cover}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1a0f08]/55 to-transparent" />
              <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f6ead4]">
                Gratuit · {quiz.minutes} min
              </span>
            </div>

            {/* Texte */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                {quiz.tagline}
              </p>
              <h3 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                {quiz.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--fg-2)]">
                {quiz.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {LEVELS.map((l) => (
                  <li
                    key={l}
                    className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/75"
                  >
                    <span aria-hidden="true" className="inline-block h-px w-3 bg-[var(--accent)]" />
                    {l}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-flex w-fit items-center gap-3 bg-[var(--fg)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[#1a1714]">
                Lancer le QCM
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
