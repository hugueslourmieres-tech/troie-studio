import Link from "next/link";
import { STARTER_QUIZZES } from "./quizzes";
import { FormationsFooter } from "@/components/FormationsFooter";
import { QcmSlideshow } from "@/components/QcmSlideshow";
import { Mascot } from "@/components/Mascot";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/troiestudio/30min";

/* Parcours pro, paiement unique ou abonnement. */
const PRO_PATHS = [
  {
    badge: "Cours 01 · Solo",
    title: "Maîtriser une IA, niveau pro.",
    duration: "4 modules · 25 prompts livrés",
    price: "Sur devis",
    priceNote: "Paiement unique · accès à vie",
    body: "Claude ou ChatGPT, configuré pour votre métier : un preset, 25 prompts, les 3 connexions essentielles. À la fin, vous l'utilisez comme un pro.",
    href: "/formations/cours-01",
    icon: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M16 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0",
  },
  {
    badge: "Cours 02 · Avancé",
    title: "Quatre IA, automatisation.",
    duration: "7 modules · 100 prompts + templates",
    price: "Sur devis",
    priceNote: "Paiement unique · accès à vie",
    body: "Claude, ChatGPT, Gemini, Copilot. 100 prompts métier, agents, automatisations Make. Le bon outil pour la bonne tâche, à chaque fois.",
    href: "/formations/cours-02",
    featured: true,
    icon: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83zM2 12.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92M2 17.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92",
  },
  {
    badge: "Cours 03 · Mastermind",
    title: "Rester à jour, chaque mois.",
    duration: "Abonnement · communauté",
    price: "Sur devis",
    priceNote: "",
    body: "L'IA bouge vite. Nouveaux prompts chaque mois, office hours en direct, communauté privée. Vous restez au niveau sans effort.",
    href: "/formations/mastermind",
    icon: "m17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3",
  },
];

export default function FormationsPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO, fond vidéo sombre marron + bouton orange
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-[#1c0f07] text-[#f6ead4]">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/training-section/02.jpg"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
        >
          <source src="/images/videos/formation.mp4" type="video/mp4" />
        </video>
        {/* Voile marron foncé pour la lisibilité */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1c0f07]/82 via-[#2d1a0d]/78 to-[#160b04]/94"
        />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-36 pb-24 md:grid-cols-12 md:gap-16 md:px-12 md:pt-44 md:pb-32">
          <div className="md:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Cours en ligne IA · pro · perso · famille
          </p>
          <h1 className="t-display mt-8 text-5xl leading-[1.0] md:text-6xl lg:text-7xl">
            Comprendre et intégrer l'IA
            <br />
            <span className="text-[var(--accent)]">au quotidien.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#f6ead4]/85 md:text-lg">
            Des cours en ligne pour vous, votre famille et vos équipes :
            comprendre l'IA, l'utiliser vraiment et l'intégrer dans votre
            quotidien. Accès immédiat, à votre rythme. On commence par un QCM
            gratuit, pas par des heures de vidéo.
          </p>

          {/* Deux voies, boutons orange */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/formations/quiz"
              className="group inline-flex items-center justify-center gap-3 bg-[var(--accent)] px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f6ead4]"
            >
              Se former perso · gratuit
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#pro"
              className="group inline-flex items-center justify-center gap-3 border border-[#f6ead4]/35 px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f6ead4] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Se former pro
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
          </div>

          {/* Slideshow des QCM proposés */}
          <div className="flex items-center md:col-span-5">
            <QcmSlideshow
              quizzes={STARTER_QUIZZES.map((q) => ({
                slug: q.slug,
                title: q.title,
                tagline: q.tagline,
                cover: q.cover,
                icon: q.icon,
                level: q.level,
                minutes: q.minutes,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PERSO, QCM gratuits dès l'inscription
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="perso" className="border-t border-[var(--rule)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <div>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--accent)]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                    Cours en ligne · perso
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                    Gratuit · pour tous, en famille
                  </p>
                </div>
              </div>
              <h2 className="t-display mt-6 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                Des cours pour comprendre et utiliser l'IA, sans danger.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Vos cours commencent par quatre QCM gratuits, débloqués dès la
                création de compte. Une dizaine de questions chacun, avec
                l'explication après chaque réponse.
              </p>
            </div>
            <Mascot
              src="/images/mascot/troyie-face.png"
              alt=""
              className="hidden h-40 w-40 shrink-0 object-contain lg:block xl:h-44 xl:w-44"
            />
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {STARTER_QUIZZES.map((q) => (
              <li key={q.slug}>
                <Link
                  href={`/formations/quiz/${q.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-colors hover:border-[var(--accent)]"
                >
                  {/* Illustration QCM (trait noir sur crème) */}
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--rule)] bg-[var(--bg)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={q.cover}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
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
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/formations/quiz"
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Voir tous les QCM
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/formations/prompts"
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
            >
              Boutique de prompts →
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRO, parcours payants
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="pro" className="border-t border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--accent)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Cours en ligne · pro
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                Accès à vie · indépendants et équipes
              </p>
            </div>
          </div>
          <h2 className="t-display mt-6 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Des cours pour gagner du temps, sérieusement.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Pour les indépendants et les équipes : des cours concrets pour faire
            travailler l'IA dans vos vrais outils.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {PRO_PATHS.map((p) => (
              <div
                key={p.title}
                className={`flex h-full flex-col rounded-sm border p-8 transition-transform hover:-translate-y-1 md:p-9 ${
                  p.featured
                    ? "border-[var(--accent)] bg-[var(--accent)]/[0.06]"
                    : "border-[var(--rule)] bg-[var(--bg)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {p.badge}
                  </p>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-[var(--accent)]"
                    aria-hidden="true"
                  >
                    <path d={p.icon} />
                  </svg>
                </div>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                  {p.duration}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {p.body}
                </p>
                <div className="flex-1" />
                <div className="mt-8 border-t border-[var(--rule)] pt-6">
                  <p className="t-display text-2xl text-[var(--fg)] md:text-3xl">
                    {p.price}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                    {p.priceNote}
                  </p>
                  <Link
                    href={p.href}
                    className={`group mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                      p.featured
                        ? "bg-[var(--accent)] text-[#1a1714] hover:bg-[var(--ink)] hover:text-[var(--bg)]"
                        : "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-[#1a1714]"
                    }`}
                  >
                    Voir le cours
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA orientation
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="tone-accent border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-8">
              <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">
                Pas sûr du bon cours ?
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                30 min en visio, gratuit. On regarde votre situation et on vous
                dit honnêtement par où commencer, ou si vous n'avez besoin
                d'aucun cours.
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--bg)] hover:text-[var(--bg)]"
              >
                Réserver 30 min
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="md:col-span-4 md:border-l md:border-[var(--fg)]/20 md:pl-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/70">
                Pour votre entreprise
              </p>
              <Link
                href="/ia"
                className="t-display mt-3 block text-2xl text-[var(--fg)] transition hover:text-[var(--bg)] md:text-3xl"
              >
                Voir TROIE IA Pro →
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/75">
                Agents IA, déploiement et formation sur mesure pour vos équipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Équipes & entreprises : la porte B2B du hub (audit, intra, agents) */}
      <section className="border-t border-[var(--rule)] bg-[var(--ink)] text-[#f5f0e6]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Équipes &amp; entreprises
              </p>
              <h2 className="t-display mt-6 text-3xl text-[#f5f0e6] md:text-5xl">
                Formez toute l&apos;équipe, déployez vos agents.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#f5f0e6]/75 md:text-lg">
                Formations intra sur vos cas réels dès 990 €, déploiement
                d&apos;agents IA, conformité AI Act et supervision continue.
                Certification Qualiopi en cours. Tout commence par un audit
                gratuit de 30 minutes.
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f0e6]/60">
                <Link
                  href="/fr/blog/ai-act-controlable-2-aout-2026"
                  className="transition hover:text-[var(--accent)]"
                >
                  Le 2 août 2026, l&apos;AI Act devient contrôlable : ce que votre PME doit avoir fait →
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-4 md:col-span-5">
              <a
                href="https://cal.com/troiestudio/30min"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-[var(--accent)] px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6]"
              >
                Audit gratuit · 30 min
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/ia"
                className="group inline-flex items-center justify-center gap-3 border border-[#f5f0e6]/30 px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Découvrir TROIE IA Pro
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FormationsFooter />
    </article>
  );
}
