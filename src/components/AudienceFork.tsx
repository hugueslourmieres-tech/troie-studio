import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Fork Pro / Perso : oriente d'emblée le visiteur vers son parcours.
 * Particuliers et familles -> cours en ligne + QCM gratuit.
 * Professionnels et équipes -> accompagnement + audit.
 * DA couleur (comme /ia) : carte crème pour le perso, carte noire pour le pro.
 */
export function AudienceFork({ locale }: { locale: string }) {
  return (
    <section className="border-t border-[#f5f0e6]/10 bg-[#1a1714]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Par où commencer
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-4xl text-[#f5f0e6] md:text-5xl lg:text-6xl">
            Deux parcours, une méthode.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#f5f0e6]/70 md:text-lg">
            On vous forme et on vous accompagne à l&apos;IA, en ligne et en
            présentiel. Choisissez votre profil, on s&apos;occupe du reste.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {/* PERSO, carte crème */}
          <Reveal>
            <div className="group flex h-full flex-col rounded-sm bg-[#ede3d0] p-8 transition-transform hover:-translate-y-1 md:p-10">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1a1714]/15 text-[#c2570f]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#c2570f]">
                Particuliers &amp; familles
              </p>
              <h3 className="t-display mt-3 text-2xl text-[#1a1714] md:text-3xl">
                Comprendre l&apos;IA, sans danger.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#1a1714]/70">
                Pour vous, vos enfants, vos parents. On commence par un QCM
                gratuit, pas par des heures de vidéo.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "QCM gratuits dès l'inscription",
                  "Cours en ligne, à votre rythme",
                  "Sécurité, esprit critique, usages du quotidien",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm leading-relaxed text-[#1a1714]/75"
                  >
                    <span aria-hidden="true" className="inline-block h-px w-3 flex-shrink-0 bg-[#c2570f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex-1" />
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link
                  href="/formations/quiz"
                  className="group/cta inline-flex items-center gap-3 bg-[#1a1714] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
                >
                  Faire le QCM gratuit
                  <span aria-hidden="true" className="transition group-hover/cta:translate-x-1">→</span>
                </Link>
                <Link
                  href="/formations"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714]/55 transition hover:text-[#c2570f]"
                >
                  Voir les cours
                </Link>
              </div>
            </div>
          </Reveal>

          {/* PRO, carte noire */}
          <Reveal delay={0.08}>
            <div className="group flex h-full flex-col rounded-sm bg-[#5a4a3a] p-8 transition-transform hover:-translate-y-1 md:p-10">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f5f0e6]/15 text-[var(--accent)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                Professionnels &amp; équipes
              </p>
              <h3 className="t-display mt-3 text-2xl text-[#f5f0e6] md:text-3xl">
                Formez et déployez l&apos;IA.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#f5f0e6]/70">
                Montée en compétence des équipes, conformité AI Act, agents sur
                mesure. En présentiel ou à distance.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Formations intra-entreprise, France et remote",
                  "Cadrage des usages et conformité AI Act",
                  "Agents IA : création, déploiement, supervision",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm leading-relaxed text-[#f5f0e6]/70"
                  >
                    <span aria-hidden="true" className="inline-block h-px w-3 flex-shrink-0 bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex-1" />
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link
                  href={`/${locale}/contact`}
                  className="group/cta inline-flex items-center gap-3 bg-[var(--accent)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Réserver un audit de 30 min
                  <span aria-hidden="true" className="transition group-hover/cta:translate-x-1">→</span>
                </Link>
                <Link
                  href="/ia"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6]/55 transition hover:text-[var(--accent)]"
                >
                  TROIE IA Pro
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
