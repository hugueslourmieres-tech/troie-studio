import { Fragment } from "react";

/**
 * Titre qui « s'écrit » mot par mot au chargement (cascade CSS pure via
 * animation-delay inline). Gère les retours à la ligne avec "\n".
 * Aucun JS requis : sûr pour le SEO et sans flash.
 */
export function WriteHeadline({
  text,
  className = "",
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  const lines = text.split("\n");
  let index = 0;

  return (
    <h1 className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((word, wi) => {
              const i = index++;
              return (
                <Fragment key={i}>
                  <span
                    className="write-word"
                    style={{ animationDelay: `${0.15 + i * stagger}s` }}
                  >
                    {word}
                  </span>
                  {wi < words.length - 1 ? " " : ""}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
