"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { playSound, setMuted, isMuted } from "./sounds";
import { Mascot } from "@/components/Mascot";

/**
 * QuizPlayer, moteur de QCM pour les Modules de formation TROIE.
 *
 * Affiche les questions une par une, capture la réponse, montre le
 * feedback (correct / incorrect + explication), puis passé à la
 * suivante. Score affiche au scroll final + CTA conditionnelle :
 *  - Score >= 70 % : bravo + code promo Cours 01
 *  - Score < 70 %  : invitation a refaire OU a passer au Cours 01
 *
 * Le moteur reste agnostique du contenu : il rend n'importe quelle
 * liste de QuizQuestion. Module 0 gratuit en passé une, les modules
 * payants en passeront leurs propres.
 */

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /** Visuel illustrant la question (photo CC duotone, ou logo d'app). */
  image?: string;
};

export function QuizPlayer({
  questions,
  passThreshold = 0.7,
  unlockCode = "TROIE-START",
  captureEmail = true,
  showPromo = true,
  passTitle = "Bien joué.",
  passBody = "Vous comprenez les fondations. C'est le bon moment pour passer au Cours 01 et apprendre à équiper votre premier héros IA.",
  failBody = "Proche. La notion mérite une seconde lecture. Refaites le quiz ou démarrez direct le Cours 01 : on revoit chaque point en profondeur, avec des exemples concrets.",
  ctaHref = "/formations/cours-01",
  ctaLabel = "Voir le Cours 01",
  tiers,
  contactHref,
  contactLabel = "Nous contacter",
}: {
  questions: QuizQuestion[];
  passThreshold?: number;
  unlockCode?: string;
  /** QCM "niveau" : 3 paliers de résultat (sinon pass/fail binaire). */
  tiers?: { min: number; label: string; body: string }[];
  /** CTA secondaire "nous contacter" en fin de QCM. */
  contactHref?: string;
  contactLabel?: string;
  /** Si vrai, demandé l'email avant de devoiler le code promo / contenu suivant. */
  captureEmail?: boolean;
  /** Si vrai, propose le bloc code promo / email (cas Module 0). Sinon écran de résultat simple. */
  showPromo?: boolean;
  /** Copie de l'écran final, personnalisable par QCM. */
  passTitle?: string;
  passBody?: string;
  failBody?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sound, setSound] = useState(true);

  const total = questions.length;
  const current = questions[index];
  const isAnswered = selected !== null;
  const isCorrect = selected === current?.correctIndex;

  const toggleSound = () => {
    const nextOn = isMuted();
    setMuted(!nextOn);
    setSound(nextOn);
    if (nextOn) playSound("tick");
  };

  const pick = (i: number) => {
    if (isAnswered) return;
    playSound("select");
    setSelected(i);
    const correct = i === current.correctIndex;
    if (correct) setScore((s) => s + 1);
    // Petit délai pour que le son de résultat suive le clic.
    window.setTimeout(() => playSound(correct ? "correct" : "wrong"), 110);
  };

  const next = () => {
    if (index + 1 < total) {
      playSound("tick");
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      playSound("finish");
      setFinished(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  // Filet de sécurité : si l'index dépasse la dernière question (double-clic
  // ultra-rapide), on bascule sur l'écran de résultat au lieu de rendre du vide.
  useEffect(() => {
    if (!finished && index >= total) setFinished(true);
  }, [index, total, finished]);

  // ── Écran final ──────────────────────────────────────────────────
  if (finished) {
    const pct = score / total;
    const passed = pct >= passThreshold;

    // QCM "niveau" : on situe sur 3 paliers + on propose formations / contact.
    if (tiers && tiers.length) {
      const tier =
        [...tiers].reverse().find((t) => pct >= t.min) ?? tiers[0];
      return (
        <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8 md:p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Votre niveau
          </p>
          <h3 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-6xl">
            {tier.label}
          </h3>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
            {score} / {total} · {Math.round(pct * 100)} % de bonnes réponses
          </p>

          <Mascot
            src="/images/mascot/robot-success.gif"
            alt=""
            className="mt-8 h-24 w-24 object-contain"
          />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {tier.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
            >
              {ctaLabel}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
            {contactHref && (
              <a
                href={contactHref}
                className="group inline-flex items-center gap-3 border border-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {contactLabel}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            )}
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

    return (
      <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8 md:p-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Résultat
        </p>
        <h3 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-6xl">
          {score} / {total}
        </h3>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
          {Math.round(pct * 100)} % de bonnes réponses
        </p>

        {passed ? (
          <>
            <Mascot
              src="/images/mascot/robot-success.gif"
              alt="Bravo !"
              className="mt-8 h-28 w-28 object-contain"
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              <strong className="text-[var(--fg)]">{passTitle}</strong>{" "}
              {passBody}
            </p>

            {showPromo && (captureEmail && !emailSubmitted ? (
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
                    // TODO: POST email vers /api/leads quand backend prêt
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
                  RGPD · pas de revente · désinscription en 1 clic
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
                  Cours 01 "Maîtriser ChatGPT &amp; Claude". Valable 7 jours.
                </p>
                {emailSubmitted && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    Egalement envoyé a {email}
                  </p>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            <strong className="text-[var(--fg)]">Presque.</strong>{" "}
            {failBody}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
          >
            {ctaLabel}
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

  // ── Écran question ──────────────────────────────────────────────
  // Garde-fou : si l'index sort des bornes (double-clic rapide), on ne
  // rend rien pour cette frame plutôt que de crasher sur current.prompt.
  if (!current) return null;

  return (
    <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-5 md:p-12">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Question {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
            Score : {score}
          </span>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={sound ? "Couper le son" : "Activer le son"}
            className="flex h-6 w-6 items-center justify-center text-[var(--fg-2)]/60 transition hover:text-[var(--accent)]"
          >
            {sound ? (
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4z" />
                <path d="m23 9-6 6M17 9l6 6" />
              </svg>
            )}
          </button>
        </div>
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

      {/* motion.div keyé (entrée seule). Pas d'AnimatePresence mode="wait" :
          avec cette version de motion + React 19, l'animation de sortie pouvait
          rester bloquée et figer le contenu sur la question précédente. */}
      <div>
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {current.image && (
            <div className="relative mt-6 aspect-[16/7] overflow-hidden rounded-sm bg-[#1a0f08] md:mt-8 md:aspect-[16/6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                style={{ filter: "grayscale(1) contrast(1.1) brightness(0.92)" }}
                loading="lazy"
              />
              {/* Duotone orange : multiply de l'accent sur le N&B */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[var(--accent)] opacity-55 mix-blend-multiply"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1a0f08]/55 to-transparent"
              />
            </div>
          )}
          <h3 className="t-display mt-5 text-xl text-[var(--fg)] md:mt-8 md:text-4xl">
            {current.prompt}
          </h3>

          {/* Avant réponse : les 4 options. Après réponse : on réduit à la
              bonne réponse (+ le choix erroné si besoin), pour ne pas avoir à
              scroller chercher le bouton suivant. */}
          {!isAnswered ? (
            <ul className="mt-5 space-y-2.5 md:mt-8 md:space-y-3">
              {current.options.map((opt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    onMouseEnter={() => playSound("hover")}
                    className="w-full cursor-pointer border border-[var(--rule)] bg-[var(--bg)] px-5 py-3.5 text-left text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:px-6 md:py-5"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm leading-relaxed md:text-base">{opt}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 space-y-4"
            >
              {/* Choix erroné de l'utilisateur, rappelé en petit */}
              {!isCorrect && selected !== null && (
                <div className="flex items-center gap-4 border border-[var(--fg)]/25 bg-[var(--fg)]/5 px-6 py-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                    {String.fromCharCode(65 + selected)}
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--fg-2)]/65 line-through md:text-base">
                    {current.options[selected]}
                  </span>
                </div>
              )}

              {/* La bonne réponse, mise en avant + check animé */}
              <motion.div
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="flex items-center gap-4 border border-[var(--accent)] bg-[var(--accent)]/10 px-6 py-5"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.05 }}
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </motion.span>
                <span className="text-sm leading-relaxed text-[var(--fg)] md:text-base">
                  {current.options[current.correctIndex]}
                </span>
              </motion.div>

              {/* Feedback + explication */}
              <div className="border-t border-[var(--rule)] pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {isCorrect ? "Correct" : "Pas tout à fait"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {current.explanation}
                </p>
                <button
                  type="button"
                  onClick={next}
                  onMouseEnter={() => playSound("hover")}
                  className="group mt-6 inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                >
                  {index + 1 < total ? "Question suivante" : "Voir le résultat"}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
