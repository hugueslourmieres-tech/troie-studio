import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizPlayer } from "../../QuizPlayer";
import { QUIZZES, getQuiz } from "../../quizzes";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return QUIZZES.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  return {
    title: quiz
      ? `${quiz.title} · QCM gratuit · TROIE`
      : "QCM · TROIE Formations",
    description: quiz?.description,
  };
}

export default async function QuizPage({ params }: { params: Params }) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) notFound();

  const passBody = quiz.locked
    ? "Vous avez le déclic. La version complète vous attend pour passer de la théorie à la pratique."
    : "Vous avez les bons réflexes. Continuez avec un autre QCM ou passez à la pratique avec un parcours.";

  const failBody = quiz.locked
    ? "Quelques points méritent une révision. La version complète reprend tout en profondeur, avec des exemples concrets."
    : "Quelques points méritent une seconde lecture. Refaites le QCM tranquillement : l'explication apparaît après chaque réponse.";

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 pt-24 pb-20 md:px-8 md:pt-36 md:pb-32">
      {/* Fil d'ariane */}
      <Link
        href="/formations/quiz"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
      >
        <span aria-hidden="true" className="transition group-hover:-translate-x-1">←</span>
        Tous les QCM
      </Link>

      {/* En-tête, minimal (pas de meta superflu : temps, nb de questions...) */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            {quiz.category === "perso" ? "Perso" : "Pro"} · {quiz.tagline}
          </span>
          {quiz.locked && (
            <span className="border border-[var(--rule)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
              Aperçu
            </span>
          )}
        </div>
        <h1 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-6xl">
          {quiz.title}
        </h1>
        <p className="mt-4 hidden max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:block md:text-lg">
          {quiz.description}
        </p>
      </header>

      {/* QCM */}
      <div className="mt-7 md:mt-12">
        <QuizPlayer
          questions={quiz.questions}
          captureEmail={false}
          showPromo={false}
          passThreshold={0.7}
          passTitle="Bravo."
          passBody={passBody}
          failBody={failBody}
          ctaHref={quiz.ctaHref ?? "/formations/quiz"}
          ctaLabel={quiz.ctaLabel ?? "Choisir un autre QCM"}
        />
      </div>
    </main>
  );
}
