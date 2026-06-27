import Link from "next/link";
import { Reveal } from "./Reveal";
import { QcmDemo } from "./QcmDemo";
import { STARTER_QUIZZES } from "@/app/formations/quizzes";

/**
 * Section QCM : un seul QCM mis en avant (situer son niveau en IA), illustration
 * d'un côté et description de l'autre. DA TROIE.
 */
export function QcmSection() {
  // QCM mis en avant ici : différent du QCM "niveau" ciblé plus haut
  // (section L'IA n'attend personne). On garde la même illustration.
  const quiz = STARTER_QUIZZES.find((q) => q.slug === "comprendre-ia");
  if (!quiz) return null;
  const levels = quiz.tiers?.map((t) => t.label) ?? [];

  return (
    <section className="overflow-hidden border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <Link
            href={`/formations/quiz/${quiz.slug}`}
            className="group grid overflow-hidden rounded-sm border border-[#f37b22]/20 bg-[#0f0b08] text-[#f5f0e6] transition-colors hover:border-[var(--accent)] md:grid-cols-2"
          >
            {/* Aperçu : image du robot qui monte les marches + démo QCM */}
            <div className="relative flex flex-col items-center justify-center gap-8 border-b border-[#f5f0e6]/10 bg-[#0f0b08] p-8 md:gap-10 md:border-b-0 md:border-r md:p-12">
              <div className="w-full max-w-md overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/quiz/niveau-ia-v2.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-auto w-full scale-125"
                />
              </div>
              <QcmDemo />
              <span className="absolute left-4 top-4 rounded-full bg-[#f5f0e6]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f5f0e6]/70 backdrop-blur-sm">
                Gratuit
              </span>
            </div>

            {/* Description sur le côté */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                {quiz.tagline}
              </p>
              <h2 className="t-display mt-5 text-3xl text-[#f5f0e6] md:text-4xl lg:text-5xl">
                Apprendre dès maintenant.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#f5f0e6]/70 md:text-lg">
                {quiz.description}
              </p>

              {levels.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f0e6]/60">
                  {levels.map((l) => (
                    <span key={l} className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="h-px w-3 bg-[var(--accent)]" />
                      {l}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors group-hover:bg-[#f5f0e6] group-hover:text-[#1a1714]">
                  Lancer le QCM
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/45">
                  Gratuit · {quiz.minutes} min
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
