"use client";

import { useState, useTransition } from "react";
import { markModuleComplete } from "@/app/formations/dashboard/courses/actions";

/**
 * Bouton "Marquer comme terminé" d'un module : appelle l'action serveur,
 * affiche l'état terminé, et célèbre la fin du cours complet.
 */
export function CompleteModuleButton({
  courseSlug,
  moduleSlug,
  initiallyCompleted,
}: {
  courseSlug: string;
  moduleSlug: string;
  initiallyCompleted: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [courseDone, setCourseDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = () => {
    setError(null);
    startTransition(async () => {
      const res = await markModuleComplete(courseSlug, moduleSlug);
      if (res.ok) {
        setCompleted(true);
        if (res.courseCompleted) setCourseDone(true);
      } else {
        setError(
          res.error === "auth_required"
            ? "Connectez-vous pour enregistrer votre progression."
            : res.error === "course_locked"
              ? "Ce cours n'est pas débloqué sur votre compte."
              : "Impossible d'enregistrer, réessayez.",
        );
      }
    });
  };

  if (completed) {
    return (
      <div>
        <p className="inline-flex items-center gap-3 border border-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          ✓ Module terminé
        </p>
        {courseDone && (
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
            Cours complété à 100 %, trophée débloqué. Bravo.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : "✓ Marquer comme terminé"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
        Débloque XP + déclenche les trophées éligibles.
      </p>
      {error && (
        <p className="mt-2 text-sm text-[var(--accent)]">{error}</p>
      )}
    </div>
  );
}
