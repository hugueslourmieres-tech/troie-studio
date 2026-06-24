import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { SealBadge } from "./SealBadge";

/**
 * Fork Pro / Perso : oriente d'emblée le visiteur vers son parcours.
 * Particuliers et familles -> cours en ligne + QCM gratuit.
 * Professionnels et équipes -> accompagnement + audit.
 * Chaque carte porte une photo d'atelier TROIE + le sceau festonné.
 */
export function AudienceFork({ locale }: { locale: string }) {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <p className="t-eyebrow">Par où commencer</p>
          <h2 className="t-display mt-6 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Deux parcours, une méthode.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            On vous forme et on vous accompagne à l&apos;IA, en ligne et en
            présentiel. Choisissez votre profil, on s&apos;occupe du reste.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {/* PERSO */}
          <Reveal>
            <div className="group flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#1a0f08]">
                <Image
                  src="/images/audience/perso.jpg"
                  alt="Particulier en formation IA chez TROIE"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ filter: "grayscale(1) contrast(1.03)" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <SealBadge>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </SealBadge>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  Particuliers &amp; familles
                </p>
                <h3 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
                  Comprendre l&apos;IA, sans danger.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--fg-2)]">
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
                      className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)]"
                    >
                      <span aria-hidden="true" className="inline-block h-px w-3 flex-shrink-0 bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex-1" />
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link
                    href="/formations/quiz"
                    className="group/cta inline-flex items-center gap-3 bg-[var(--accent)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                  >
                    Faire le QCM gratuit
                    <span aria-hidden="true" className="transition group-hover/cta:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/formations"
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                  >
                    Voir les cours
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* PRO */}
          <Reveal delay={0.08}>
            <div className="group flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#1a0f08]">
                <Image
                  src="/images/audience/pro.jpg"
                  alt="Équipe en formation IA chez TROIE"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ filter: "grayscale(1) contrast(1.03)" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <SealBadge>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </SealBadge>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  Professionnels &amp; équipes
                </p>
                <h3 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
                  Formez et déployez l&apos;IA.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--fg-2)]">
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
                      className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)]"
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
                    className="group/cta inline-flex items-center gap-3 bg-[var(--fg)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
                  >
                    Réserver un audit de 30 min
                    <span aria-hidden="true" className="transition group-hover/cta:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/ia"
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                  >
                    TROIE IA Pro
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
