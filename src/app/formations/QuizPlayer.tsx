"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * QuizPlayer — moteur de QCM pour les Modules de formation TROIE.
 *
 * Affiche les questions une par une, capture la reponse, montre le
 * feedback (correct / incorrect + explication), puis passe a la
 * suivante. Score affiche au scroll final + CTA conditionnelle :
 *  - Score >= 70 % : bravo + code promo Cours 01
 *  - Score < 70 %  : invitation a refaire OU a passer au Cours 01
 *
 * Le moteur reste agnostique du contenu : il rend n'importe quelle
 * liste de QuizQuestion. Module 0 gratuit en passe une, les modules
 * payants en passeront leurs propres.
 */

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function QuizPlayer({
  questions,
  passThreshold = 0.7,
  unlockCode = "TROIE-START",
  captureEmail = true,
}: {
  questions: QuizQuestion[];
  passThreshold?: number;
  unlockCode?: string;
  /** Si vrai, demande l'email avant de devoiler le code promo / contenu suivant. */
  captureEmail?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const total = questions.length;
  const current = questions[index];
  const isAnswered = selected !== null;
  const isCorrect = selected === current?.correctIndex;

  const pick = (i: number) => {
    if (isAnswered) return;
    setSelected(i);
    if (i === current.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  // ── Ecran final ──────────────────────────────────────────────────
  if (finished) {
    const pct = score / total;
    const passed = pct >= passThreshold;
    return (
      <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8 md:p-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Resultat
        </p>
        <h3 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-6xl">
          {score} / {total}
        </h3>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
          {Math.round(pct * 100)} % de bonnes reponses
        </p>

        {passed ? (
          <>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              <strong className="text-[var(--fg)]">Bien joue.</strong>{" "}
              Vous comprenez les fondations. C'est le bon moment pour
              passer au Cours 01 et apprendre a equiper votre premier
              heros IA.
            </p>

            {captureEmail && !emailSubmitted ? (
              <div className="mt-8 rounded-sm border border-[var(--accent)] bg-[var(--bg)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  Recevez votre code promo
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  Laissez votre email : on vous envoie le code{" "}
                  <strong className="text-[var(--fg)]">-15 %</strong>{" "}
                  sur le Cours 01 + une newsletter mensuelle avec 3 prompts utiles, sans spam.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email.trim() || !email.includes("@")) return;
                    // TODO: POST email vers /api/leads quand backend pret
                    setEmailSubmitted(true);
                  }}
                  className="mt-5 flex flex-col gap-3 md:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="flex-1 border border-[var(--rule)] bg-[var(--bg)] px-4 py-3 text-base text-[var(--fg)] placeholder:text-[var(--fg-2)]/55 focus:border-[var(--accent)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 bg-[var(--fg)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                  >
                    Recevoir le code
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </button>
                </form>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  RGPD · pas de revente · desinscription en 1 clic
                </p>
              </div>
            ) : (
              <div className="mt-8 rounded-sm border border-[var(--accent)] bg-[var(--bg)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  Code promo Cours 01
                </p>
                <p className="t-display mt-3 text-3xl text-[var(--fg)] md:text-4xl">
                  {unlockCode}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                  <strong className="text-[var(--fg)]">-15 %</strong> sur le
                  Cours 01 "Maitriser ChatGPT &amp; Claude". Valable 7 jours.
                </p>
                {emailSubmitted && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    Egalement envoye a {email}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            <strong className="text-[var(--fg)]">Proche.</strong>{" "}
            La theorie LLM merite une seconde lecture. Refaites le
            quiz ou demarrez direct le Cours 01 : on revoit chaque
            notion en profondeur, avec exemples concrets.
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="/formations/cours-01"
            className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
          >
            Voir le Cours 01
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
          <button
            type="button"
            onClick={restart}
            className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Refaire le quiz
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    );
  }

  // ── Ecran question ──────────────────────────────────────────────
  return (
    <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8 md:p-12">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Question {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
          Score : {score}
        </span>
      </div>

      {/* Progression */}
      <div className="mt-5 h-[3px] w-full overflow-hidden bg-[var(--fg)]/10">
        <motion.div
          className="h-full bg-[var(--accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${((index + (isAnswered ? 1 : 0)) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="t-display mt-10 text-2xl text-[var(--fg)] md:text-4xl">
            {current.prompt}
          </h3>

          <ul className="mt-8 space-y-3">
            {current.options.map((opt, i) => {
              const isThis = selected === i;
              const isThisCorrect = isAnswered && i === current.correctIndex;
              const isThisWrong = isAnswered && isThis && !isCorrect;

              let cls =
                "w-full border border-[var(--rule)] bg-[var(--bg)] px-6 py-5 text-left text-[var(--fg)] transition-colors";
              if (!isAnswered) {
                cls += " hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer";
              } else if (isThisCorrect) {
                cls = "w-full border border-[var(--accent)] bg-[var(--accent)]/10 px-6 py-5 text-left text-[var(--fg)]";
              } else if (isThisWrong) {
                cls = "w-full border border-[var(--fg)]/40 bg-[var(--fg)]/5 px-6 py-5 text-left text-[var(--fg)]/65 line-through";
              } else {
                cls += " opacity-50";
              }

              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    disabled={isAnswered}
                    className={cls}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm leading-relaxed md:text-base">{opt}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 border-t border-[var(--rule)] pt-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                {isCorrect ? "Correct" : "Pas tout a fait"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                {current.explanation}
              </p>
              <button
                type="button"
                onClick={next}
                className="group mt-8 inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
              >
                {index + 1 < total ? "Question suivante" : "Voir le resultat"}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
