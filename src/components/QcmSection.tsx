import Link from "next/link";
import { Reveal } from "./Reveal";
import { STARTER_QUIZZES } from "@/app/formations/quizzes";

/**
 * Section Particuliers sur la home : les QCM gratuits, en grandes cartes
 * 100% cliquables (image, titre et texte mènent au QCM). Hook fort,
 * cover en duotone orange (identité QCM), zoom au survol. DA TROIE.
 */
export function QcmSection() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="md:max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Particuliers &amp; familles · gratuit
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                Comprendre l&apos;IA commence par un QCM.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Testez vos réflexes en 8 minutes. Gratuit, sans pièges, avec
                l&apos;explication après chaque réponse. On commence par là, pas
                par des heures de vidéo.
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

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-4">
          {STARTER_QUIZZES.map((q, i) => (
            <li key={q.slug}>
              <Reveal delay={i * 0.05}>
                <Link
                  href={`/formations/quiz/${q.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]"
                >
                  {/* Cover duotone orange + picto, zoom au survol */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1a0f08]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={q.cover}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.1) brightness(0.92)" }}
                      loading="lazy"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-[var(--accent)] opacity-55 mix-blend-multiply" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f08]/70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#f6ead4]" aria-hidden="true">
                        <path d={q.icon} />
                      </svg>
                    </div>
                    <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[#f6ead4]/85">
                      Gratuit
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                      {q.tagline}
                    </p>
                    <h3 className="t-display mt-3 text-xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
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
