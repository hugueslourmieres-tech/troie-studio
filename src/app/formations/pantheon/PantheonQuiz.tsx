"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HOUSES,
  PANTHEON_QUESTIONS,
  assignHouse,
  isHouseSlug,
  type HouseSlug,
} from "@/lib/pantheon";
import { saveHouse } from "./actions";

type Phase = "quiz" | "reveal";

/**
 * Le test du Panthéon : 5 questions, une maison, un sésame.
 * - Connecté : la maison est enregistrée + le sésame part par email.
 * - Anonyme : bouton de connexion avec retour ?house=... et
 *   enregistrement automatique au retour.
 */
export function PantheonQuiz() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<HouseSlug[]>([]);
  const [house, setHouse] = useState<HouseSlug | null>(null);
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "not_signed_in" | "unavailable"
  >("idle");

  // Retour de connexion : ?house=... dans l'URL, on finalise.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("house");
    if (isHouseSlug(fromUrl)) {
      setHouse(fromUrl);
      setPhase("reveal");
      void persist(fromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function persist(h: HouseSlug) {
    setSaveState("saving");
    try {
      const r = await saveHouse(h);
      setSaveState(
        r === "saved" ? "saved" : r === "not_signed_in" ? "not_signed_in" : "unavailable",
      );
    } catch {
      setSaveState("unavailable");
    }
  }

  function answer(h: HouseSlug) {
    const next = [...picks, h];
    if (next.length >= PANTHEON_QUESTIONS.length) {
      const result = assignHouse(next);
      setHouse(result);
      setPhase("reveal");
      void persist(result);
      return;
    }
    setPicks(next);
    setStep(step + 1);
  }

  if (phase === "reveal" && house) {
    const H = HOUSES[house];
    return (
      <div className="mx-auto max-w-3xl">
        <div
          className="overflow-hidden rounded-sm border p-8 md:p-12"
          style={{ backgroundColor: H.bg, borderColor: H.bg, color: H.fg }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: H.accent }}
          >
            Le Panthéon a parlé
          </p>
          <h2 className="t-display mt-5 text-4xl md:text-6xl">{H.title}.</h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            Vous avez l&apos;étoffe d&apos;un {H.godOf}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-90 md:text-lg">
            {H.description}
          </p>
          <p className="t-display mt-8 text-xl md:text-2xl" style={{ color: H.accent }}>
            « {H.motto} »
          </p>

          <div className="mt-10 border-t pt-6" style={{ borderColor: `${H.fg}33` }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-70">
              Vos armes, choisies pour votre lignée
            </p>
            <ul className="mt-4 space-y-2">
              {H.offers.map((o) => (
                <li key={o.label}>
                  <Link
                    href={o.href}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] underline-offset-4 transition hover:underline"
                  >
                    {o.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Le sésame */}
        <div className="mt-6 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-8">
          {saveState === "saved" && (
            <p className="text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Sésame envoyé ·
              </span>{" "}
              Votre sésame pour l&apos;Olympe arrive par email, et votre blason
              est accroché dans{" "}
              <Link href="/formations/dashboard" className="underline underline-offset-4 hover:text-[var(--accent)]">
                votre espace membre
              </Link>
              .
            </p>
          )}
          {saveState === "not_signed_in" && (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-md text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                Réclamez votre sésame : créez votre compte (gratuit) et
                recevez votre lettre d&apos;ascension, votre blason et votre
                parcours de maison.
              </p>
              <Link
                href={`/formations/auth/sign-in?next=${encodeURIComponent(`/formations/pantheon?house=${house}`)}`}
                className="group inline-flex items-center gap-3 bg-[var(--accent)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
              >
                Recevoir mon sésame
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}
          {saveState === "saving" && (
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
              Gravure de votre blason...
            </p>
          )}
          {saveState === "unavailable" && (
            <p className="text-sm leading-relaxed text-[var(--fg-2)]">
              Impossible d&apos;enregistrer votre maison pour l&apos;instant.
              Réessayez depuis votre espace membre.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setPhase("quiz");
            setStep(0);
            setPicks([]);
            setHouse(null);
            setSaveState("idle");
            window.history.replaceState(null, "", "/formations/pantheon");
          }}
          className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 transition hover:text-[var(--accent)]"
        >
          ↺ Refaire le test
        </button>
      </div>
    );
  }

  const q = PANTHEON_QUESTIONS[step];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Question {step + 1} / {PANTHEON_QUESTIONS.length}
        </p>
        <div className="flex gap-1.5" aria-hidden="true">
          {PANTHEON_QUESTIONS.map((_, i) => (
            <span
              key={i}
              className={`h-[3px] w-8 ${i <= step ? "bg-[var(--accent)]" : "bg-[var(--fg)]/15"}`}
            />
          ))}
        </div>
      </div>

      <h2 className="t-display mt-6 text-3xl text-[var(--fg)] md:text-5xl">{q.q}</h2>

      <div className="mt-10 grid gap-3">
        {q.answers.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => answer(a.house)}
            className="group flex items-center justify-between gap-4 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] px-6 py-5 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/8"
          >
            <span className="text-base text-[var(--fg)] md:text-lg">{a.label}</span>
            <span
              aria-hidden="true"
              className="font-mono text-[var(--accent)] opacity-0 transition group-hover:opacity-100"
            >
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
