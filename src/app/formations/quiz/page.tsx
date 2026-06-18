import Link from "next/link";
import { PERSO_QUIZZES, PRO_QUIZZES, type Quiz } from "../quizzes";

export const metadata = {
  title: "QCM gratuits · Comprendre et utiliser l'IA · TROIE",
  description:
    "Des QCM gratuits pour comprendre l'IA, l'utiliser au quotidien et en famille sans danger, puis aller plus loin côté pro. Dès la création de compte.",
};

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <li>
      <Link
        href={`/formations/quiz/${quiz.slug}`}
        className="group flex h-full flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 transition-colors hover:border-[var(--accent)] md:p-8"
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            {quiz.tagline}
          </p>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
            {quiz.locked ? "Aperçu" : "Gratuit"}
          </span>
        </div>
        <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
          {quiz.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
          {quiz.description}
        </p>
        <div className="mt-auto flex items-baseline justify-between pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
          <span>{quiz.audience} · {quiz.questions.length} questions</span>
          <span className="text-[var(--accent)] transition-transform group-hover:translate-x-1">
            Lancer →
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function QuizCatalogPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          QCM gratuits · sans vidéo, on teste tout de suite
        </p>
        <h1 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
          Évaluez, puis apprenez.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          On ne vous noie pas dans des heures de vidéo. Chaque cours commence
          par un QCM d'une dizaine de questions, avec l'explication après chaque
          réponse. Quatre QCM sont ouverts dès la création de compte, côté perso
          comme côté pro.
        </p>
      </header>

      {/* PERSO */}
      <section className="mt-16 md:mt-24">
        <div className="flex items-baseline gap-4 border-b border-[var(--rule)] pb-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            01
          </span>
          <h2 className="t-display text-3xl text-[var(--fg)] md:text-4xl">
            Perso · comprendre & utiliser
          </h2>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
          Pour tout le monde, y compris les familles : comprendre ce qu'est
          l'IA, l'utiliser au quotidien et en sécurité, parents et enfants
          ensemble.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {PERSO_QUIZZES.map((q) => (
            <QuizCard key={q.slug} quiz={q} />
          ))}
        </ul>
      </section>

      {/* PRO */}
      <section className="mt-16 md:mt-24">
        <div className="flex items-baseline gap-4 border-b border-[var(--rule)] pb-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            02
          </span>
          <h2 className="t-display text-3xl text-[var(--fg)] md:text-4xl">
            Pro · aller plus loin
          </h2>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
          Pour les indépendants et les équipes : un aperçu des parcours
          prompting, agents et automatisation. Le QCM donne le ton, le parcours
          complet déroule la pratique.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {PRO_QUIZZES.map((q) => (
            <QuizCard key={q.slug} quiz={q} />
          ))}
        </ul>
      </section>

      {/* CTA compte */}
      <section className="mt-20 rounded-sm border border-[var(--accent)] bg-[var(--accent)]/5 p-8 md:mt-28 md:p-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Créez votre compte gratuit
        </p>
        <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-5xl">
          4 QCM débloqués dès l'inscription.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          Suivez votre progression, gagnez de l'XP, débloquez des trophées. Les
          quatre QCM perso sont offerts, sans carte bancaire.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/formations/auth/sign-in"
            className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
          >
            Créer mon compte
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/formations"
            className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Voir tous les parcours
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
