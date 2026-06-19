"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Machine à écrire : tape un mot lettre par lettre, marque une pause,
 * l'efface, puis tape le suivant, en boucle. Curseur clignotant.
 * Respecte prefers-reduced-motion (affiche le premier mot, figé).
 */
export function Typewriter({
  words,
  className = "",
  typeSpeed = 85,
  deleteSpeed = 45,
  pause = 1600,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) setSub(words[0]?.length ?? 0);
  }, [words]);

  useEffect(() => {
    if (reduced.current) return;
    const word = words[index] ?? "";

    // Mot complet : pause, puis on efface.
    if (!deleting && sub === word.length) {
      const t = window.setTimeout(() => setDeleting(true), pause);
      return () => window.clearTimeout(t);
    }
    // Mot effacé : on passe au suivant.
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = window.setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => window.clearTimeout(t);
  }, [sub, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  const word = words[index] ?? "";

  return (
    <span className={className}>
      <span className="whitespace-nowrap">{word.substring(0, sub)}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block w-[0.06em] self-stretch bg-current align-baseline"
        style={{
          height: "0.85em",
          animation: reduced.current
            ? "none"
            : "tw-cursor 1s step-end infinite",
        }}
      />
    </span>
  );
}
