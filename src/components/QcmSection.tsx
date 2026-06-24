import Link from "next/link";
import { Reveal } from "./Reveal";
import { QcmDemo } from "./QcmDemo";
import { STARTER_QUIZZES } from "@/app/formations/quizzes";

/**
 * Section QCM, version punchy : une accroche forte + une démo animée d'un QCM
 * (Troyie saute de joie à la bonne réponse) qui montre que c'est interactif et
 * ludique, pour les familles, les particuliers et les pros. En dessous, le
 * catalogue des QCM gratuits. Le QCM « niveau IA » est mis en avant ailleurs.
 */
export function QcmSection() {
  const quizzes = STARTER_QUIZZES.filter((q) => q.slug !== "niveau-ia");
  const first = quizzes[0];

  return (
    <section className="overflow-hidden border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        {/* Accroche + démo animée */}
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
              Le premier QCM · gratuit
            </p>
            <h2 className="t-display mt-6 text-4xl leading-[1.05] text-[var(--fg)] md:text-5xl lg:text-6xl">
              L&apos;IA, ça s&apos;apprend en jouant.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              Dix questions, l&apos;explication après chaque réponse. Pour les
              familles, les particuliers et les pros. Vous vous trompez&nbsp;? Vous
              comprenez pourquoi. C&apos;est tout l&apos;intérêt.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={`/formations/quiz/${first.slug}`}
                className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
              >
                Commencer le premier QCM
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                10 questions · 6 min · gratuit
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:pl-6 lg:pl-10">
            <QcmDemo />
          </Reveal>
        </div>

        {/* Catalogue des QCM gratuits */}
        <div className="mt-24 border-t border-[var(--rule)] pt-16 md:mt-32 md:pt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h3 className="t-display text-3xl text-[var(--fg)] md:text-4xl">
                Tous nos QCM, gratuits.
              </h3>
              <Link
                href="/formations/quiz"
                className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Voir tous les QCM
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>

          <ul className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-4">
            {quizzes.map((q, i) => (
              <li key={q.slug} className="h-full">
                <Reveal delay={i * 0.05} className="h-full">
                  <Link
                    href={`/formations/quiz/${q.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--rule)] bg-[#f4f1e5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={q.cover}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-[var(--bg)]/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-[#1a1714]/65 backdrop-blur-sm">
                        Gratuit
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                        {q.tagline}
                      </p>
                      <h4 className="t-display mt-3 text-xl text-[var(--fg)]">
                        {q.title}
                      </h4>
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
      </div>
    </section>
  );
}
