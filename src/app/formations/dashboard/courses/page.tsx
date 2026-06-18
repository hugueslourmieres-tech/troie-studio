import Link from "next/link";
import {
  STARTER_QUIZZES,
  PERSO_QUIZZES,
  PRO_QUIZZES,
  type Quiz,
} from "../../quizzes";

export const metadata = {
  title: "Mes cours · Espace membre TROIE",
  robots: { index: false, follow: false },
};

function QuizRow({ quiz, featured = false }: { quiz: Quiz; featured?: boolean }) {
  return (
    <li>
      <Link
        href={`/formations/quiz/${quiz.slug}`}
        className={`group flex h-full flex-col rounded-sm border p-6 transition-colors md:p-8 ${
          featured
            ? "border-[var(--accent)] bg-[var(--accent)]/5 hover:bg-[var(--accent)]/10"
            : "border-[var(--rule)] bg-[var(--bg-2)] hover:border-[var(--accent)]"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            {quiz.tagline}
          </p>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
            {featured ? "✓ Disponible" : quiz.locked ? "Aperçu" : "Gratuit"}
          </span>
        </div>
        <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
          {quiz.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
          {quiz.description}
        </p>
        <div className="mt-auto flex items-baseline justify-between pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
          <span>{quiz.questions.length} questions · ~ {quiz.minutes} min</span>
          <span className="text-[var(--accent)] transition-transform group-hover:translate-x-1">
            Lancer le QCM →
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function CoursesPage() {
  const starterSlugs = new Set(STARTER_QUIZZES.map((q) => q.slug));
  const persoMore = PERSO_QUIZZES.filter((q) => !starterSlugs.has(q.slug));

  return (
    <div className="space-y-14 md:space-y-20">
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Mes cours
        </p>
        <h1 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-5xl">
          Catalogue & progression.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          On commence par le QCM, pas par la vidéo. Chaque cours s'ouvre sur une
          dizaine de questions avec l'explication après chaque réponse. Quatre
          QCM sont débloqués dès maintenant.
        </p>
      </section>

      {/* 4 QCM débloqués dès l'inscription */}
      <section>
        <div className="flex items-baseline gap-4 border-b border-[var(--rule)] pb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Débloqués
          </span>
          <h2 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
            Vos 4 QCM de départ
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          {STARTER_QUIZZES.map((q) => (
            <QuizRow key={q.slug} quiz={q} featured />
          ))}
        </ul>
      </section>

      {/* Perso, pour aller plus loin */}
      {persoMore.length > 0 && (
        <section>
          <div className="flex items-baseline gap-4 border-b border-[var(--rule)] pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
              Perso
            </span>
            <h2 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
              Pour aller plus loin
            </h2>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
            {persoMore.map((q) => (
              <QuizRow key={q.slug} quiz={q} />
            ))}
          </ul>
        </section>
      )}

      {/* Pro */}
      <section>
        <div className="flex items-baseline gap-4 border-b border-[var(--rule)] pb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Pro
          </span>
          <h2 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
            Parcours professionnels
          </h2>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
          Un aperçu en QCM, puis le parcours complet pour passer à la pratique.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          {PRO_QUIZZES.map((q) => (
            <QuizRow key={q.slug} quiz={q} />
          ))}
        </ul>
      </section>
    </div>
  );
}
