/**
 * LetterReveal : révèle un titre lettre par lettre (montée + défloutage),
 * en cascade. Animation CSS pure (au chargement), élégante. Le texte complet
 * reste lisible par les lecteurs d'écran via aria-label.
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
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
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
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
