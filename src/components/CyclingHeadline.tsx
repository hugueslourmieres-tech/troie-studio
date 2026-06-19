"use client";

import { useEffect, useState } from "react";

/**
 * Titre du hero : les 3 métiers défilent en surbrillance l'un après
 * l'autre, en boucle. Le mot actif est en noir avec une animation lettre
 * par lettre ; les autres sont grisés. Le cycle se répète toutes les ~1,2s.
 */
export function CyclingHeadline({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  // `cycle` ne sert qu'à forcer le remontage des lettres pour rejouer
  // l'animation à chaque passage en surbrillance.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % words.length);
      setCycle((c) => c + 1);
    }, 1200);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <h1 className={className}>
      {words.map((word, i) => {
        const isActive = i === active;
        return (
          <span
            key={word}
            className={`block transition-colors duration-700 ${
              isActive ? "text-[#1a1714]" : "text-[#1a17142e]"
            }`}
          >
            {isActive ? <Letters key={cycle} text={word} /> : word}
          </span>
        );
      })}
    </h1>
  );
}

function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="letter-in"
          style={{ animationDelay: `${i * 0.028}s` }}
        >
          {ch}
        </span>
      ))}
    </>
  );
}
