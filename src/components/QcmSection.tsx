import Link from "next/link";
import { Reveal } from "./Reveal";
import { STARTER_QUIZZES } from "@/app/formations/quizzes";

/**
 * Section QCM : présente les QCM gratuits, porte d'entrée des formations en
 * ligne (cliquer, tester, apprendre). Le QCM "niveau IA" est mis en avant plus
 * haut (section dédiée), on l'exclut donc ici. DA TROIE.
 */
export function QcmSection() {
  const quizzes = STARTER_QUIZZES.filter((q) => q.slug !== "niveau-ia");

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="md:max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Formations en ligne · gratuit
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                Apprendre l&apos;IA, ça commence par un QCM.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Des QCM courts et gratuits pour entrer dans chaque sujet, avec
                l&apos;explication après chaque réponse. La porte d&apos;entrée de nos
                formations en ligne : cliquez, testez, apprenez.
              </p>
            </div>
            <Link
              href="/formations/quiz"
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Tous les QCM
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-14 grid items-stretch gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-4">
          {quizzes.map((q, i) => (
            <li key={q.slug} className="h-full">
              <Reveal delay={i * 0.05} className="h-full">
                <Link
                  href={`/formations/quiz/${q.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1a0f08]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={q.cover}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.05) brightness(0.95)" }}
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[#f6ead4]/85">
                      Gratuit
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                      {q.tagline}
                    </p>
                    <h3 className="t-display mt-3 text-xl text-[var(--fg)]">
                      {q.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-2)]">
                      {q.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 transition-colors group-hover:text-[var(--accent)]">
                      Lancer le QCM
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
