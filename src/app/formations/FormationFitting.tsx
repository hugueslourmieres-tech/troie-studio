"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

/**
 * FormationFitting, composant interactif qui recommande le bon
 * parcours TROIE selon le profil de l'utilisateur en 3 questions.
 *
 * 3 questions binaires / a choix :
 *   1. Profil : Solo / Équipe / Entreprise
 *   2. Niveau IA actuel : Débutant / Intermediaire / Avancé
 *   3. Objectif : Apprendre / Workflows / Tout
 *
 * Sortie : carte de recommandation avec :
 *  - Le parcours conseille (avec lien)
 *  - 1 ou 2 alternatives
 *  - Le temps gagne estimé / mois
 */

type Profile = "solo" | "team" | "enterprise";
type Level = "beginner" | "intermediate" | "advanced";
type Goal = "learn" | "workflow" | "everything";

type Reco = {
  primary: {
    label: string;
    sub: string;
    href: string;
    price: string;
  };
  secondary?: {
    label: string;
    href: string;
  };
  timeGain: string;
};

function getReco(profile: Profile, level: Level, goal: Goal): Reco {
  // Entreprise quel que soit le reste -> agents
  if (profile === "enterprise") {
    return {
      primary: {
        label: "Agents IA & formations équipe",
        sub: "Déploiement sur mesure, sur devis",
        href: "/fr/agents",
        price: "Sur devis",
      },
      timeGain: "Variable selon la taille de l'équipe",
    };
  }

  // Équipe
  if (profile === "team") {
    if (goal === "everything") {
      return {
        primary: {
          label: "Mastermind TROIE",
          sub: "Cours 01 + 02 inclus + communauté",
          href: "/formations/mastermind",
          price: "Sur devis",
        },
        secondary: { label: "Ou Cours 02 à l'unité (297 €)", href: "/formations/cours-02" },
        timeGain: "~ 25-40 h/mois pour l'équipe",
      };
    }
    return {
      primary: {
        label: "Cours 02 · Workflows IA",
        sub: "MCPs, agents persistants, pipelines",
        href: "/formations/cours-02",
        price: "Sur devis",
      },
      secondary: { label: "Avec Cours 01 (97 €) si nouveau", href: "/formations/cours-01" },
      timeGain: "~ 15-25 h/mois pour l'équipe",
    };
  }

  // Solo
  if (level === "beginner") {
    if (goal === "learn") {
      return {
        primary: {
          label: "Module 0 (gratuit)",
          sub: "Théorie LLM 15 min + QCM",
          href: "/formations/module-0",
          price: "Sur devis",
        },
        secondary: { label: "Puis Cours 01 (97 €)", href: "/formations/cours-01" },
        timeGain: "Premiers gains dès la 1re semaine",
      };
    }
    return {
      primary: {
        label: "Cours 01 · Maîtriser ChatGPT & Claude",
        sub: "4 modules + 25 prompts + 5 templates",
        href: "/formations/cours-01",
        price: "Sur devis",
      },
      secondary: { label: "Ou Pack Freelance (29 €)", href: "/formations/prompts/freelance" },
      timeGain: "~ 8-12 h/semaine récupérées",
    };
  }

  if (level === "intermediate") {
    if (goal === "workflow") {
      return {
        primary: {
          label: "Cours 02 · Workflows IA",
          sub: "MCPs, agents persistants, automatisation",
          href: "/formations/cours-02",
          price: "Sur devis",
        },
        secondary: { label: "Avec Pack Marketing (29 €)", href: "/formations/prompts/marketing" },
        timeGain: "~ 12-18 h/semaine récupérées",
      };
    }
    return {
      primary: {
        label: "Cours 01 + Pack métier (Bundle)",
        sub: "Cours 01 (97 €) + 1 pack prompts (29 €)",
        href: "/formations/cours-01",
        price: "Sur devis",
      },
      secondary: { label: "Ou Boutique prompts seule (29-99 €)", href: "/formations/prompts" },
      timeGain: "~ 10-15 h/semaine récupérées",
    };
  }

  // Solo + Avancé
  if (goal === "everything") {
    return {
      primary: {
        label: "Mastermind TROIE",
        sub: "Tous les cours + bibliothèque vivante + communauté",
        href: "/formations/mastermind",
        price: "Sur devis",
      },
      secondary: { label: "Ou Annuel (490 €, 2 mois offerts)", href: "/formations/mastermind" },
      timeGain: "~ 15-25 h/semaine récupérées",
    };
  }
  return {
    primary: {
      label: "Cours 02 · Workflows IA",
      sub: "Si vous maîtrisez déjà les prompts pro",
      href: "/formations/cours-02",
      price: "Sur devis",
    },
    secondary: { label: "Pour rester à jour : Mastermind", href: "/formations/mastermind" },
    timeGain: "~ 12-20 h/semaine récupérées",
  };
}

const PROFILE_OPTS: { key: Profile; label: string; sub: string }[] = [
  { key: "solo", label: "Solo", sub: "Freelance, micro, indép" },
  { key: "team", label: "Équipe", sub: "2 à 15 personnes" },
  { key: "enterprise", label: "Entreprise", sub: "15+ ou besoin sur mesure" },
];

const LEVEL_OPTS: { key: Level; label: string; sub: string }[] = [
  { key: "beginner", label: "Débutant", sub: "Jamais ou peu utilisé" },
  { key: "intermediate", label: "Intermédiaire", sub: "Utilisé au quotidien" },
  { key: "advanced", label: "Avancé", sub: "Connais prompts, agents" },
];

const GOAL_OPTS: { key: Goal; label: string; sub: string }[] = [
  { key: "learn", label: "Apprendre", sub: "Comprendre & démarrer" },
  { key: "workflow", label: "Workflows", sub: "Automatiser des tâches" },
  { key: "everything", label: "Tout", sub: "Cours + communauté" },
];

export function FormationFitting() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  const allAnswered = profile && level && goal;
  const reco = allAnswered ? getReco(profile, level, goal) : null;

  const reset = () => {
    setProfile(null);
    setLevel(null);
    setGoal(null);
  };

  return (
    <div className="relative rounded-sm border border-[var(--fg)]/15 bg-[var(--bg)]/40 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Fitting personnalisé · 3 questions
        </p>
        {allAnswered && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 transition-colors hover:text-[var(--accent)]"
          >
            Recommencer
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!reco ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-8"
          >
            {/* Q1, Profil */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-2)]/70">
                01 · Votre profil
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {PROFILE_OPTS.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setProfile(o.key)}
                    className={`border px-4 py-3 text-left transition-colors ${
                      profile === o.key
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--rule)] hover:border-[var(--accent)]"
                    }`}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]">
                      {o.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-[var(--fg-2)]">
                      {o.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Q2, Niveau */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-2)]/70">
                02 · Votre niveau IA
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {LEVEL_OPTS.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setLevel(o.key)}
                    className={`border px-4 py-3 text-left transition-colors ${
                      level === o.key
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--rule)] hover:border-[var(--accent)]"
                    }`}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]">
                      {o.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-[var(--fg-2)]">
                      {o.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Q3, Objectif */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-2)]/70">
                03 · Votre objectif
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {GOAL_OPTS.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setGoal(o.key)}
                    className={`border px-4 py-3 text-left transition-colors ${
                      goal === o.key
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--rule)] hover:border-[var(--accent)]"
                    }`}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]">
                      {o.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-[var(--fg-2)]">
                      {o.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
              Réponse instantanée. Pas d'inscription.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="reco"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
              Notre recommandation
            </p>
            <h3 className="t-display mt-3 text-3xl text-[var(--fg)] md:text-4xl">
              {reco.primary.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
              {reco.primary.sub}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
              {reco.primary.price}
            </p>

            <Link
              href={reco.primary.href}
              className="group mt-6 inline-flex items-center gap-3 bg-[var(--fg)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
            >
              Découvrir
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>

            <div className="mt-8 border-t border-[var(--fg)]/15 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-2)]/65">
                Estimation gain de temps
              </p>
              <p className="mt-2 t-display text-2xl text-[var(--accent)] md:text-3xl">
                {reco.timeGain}
              </p>
            </div>

            {reco.secondary && (
              <Link
                href={reco.secondary.href}
                className="mt-6 inline-flex items-center gap-2 border-b border-[var(--fg-2)]/30 pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Alternative : {reco.secondary.label}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
