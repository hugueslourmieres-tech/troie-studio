import { Fragment } from "react";

/**
 * LetterReveal : révèle un titre lettre par lettre (montée + défloutage),
 * en cascade. Animation CSS pure (au chargement), élégante. Le texte complet
 * reste lisible par les lecteurs d'écran via aria-label.
 *
 * Chaque mot reste insécable (whitespace-nowrap) mais l'espace entre les
 * mots est un vrai espace : le titre peut donc revenir à la ligne mot par
 * mot selon la largeur, pour s'adapter parfaitement à l'écran.
 */
export function LetterReveal({
  text,
  className,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  /** Décalage entre chaque lettre, en secondes. */
  stagger?: number;
}) {
  const words = text.split(" ");
  let n = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {[...word].map((ch, ci) => {
              const delay = (n++ * stagger).toFixed(3);
              return (
                <span
                  key={ci}
                  className="hero-letter inline-block"
                  style={{ animationDelay: `${delay}s` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
