import { Emblem } from "./Emblem";

/**
 * TROIE, wordmark dans la veine des maisons de luxe (Hermès, Cartier, Loewe).
 * Pure typographie, capitales, généreusement lettré. L'emblème (guerrier
 * grec) accompagne le wordmark dans certaines variantes pour en faire la
 * signature visuelle de la marque.
 *
 * Variants:
 *   - "wordmark"        : "TROIE" seul (header simple)
 *   - "wordmark-emblem" : guerrier + "TROIE" inline (header default)
 *   - "stack"           : guerrier au-dessus + "TROIE" + ligne + "STUDIO · PARIS" (footer / signature)
 *   - "mark"            : juste "TR" texte (favicon, très petit usage)
 */
export function Logo({
  variant = "wordmark",
  className = "",
}: {
  variant?: "wordmark" | "stack" | "wordmark-emblem" | "mark";
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 64 32"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="TROIE"
      >
        <text
          x="32"
          y="24"
          textAnchor="middle"
          fontFamily="var(--font-bodoni, ui-serif, Georgia, serif)"
          fontWeight="400"
          fontSize="22"
          letterSpacing="3"
          fill="currentColor"
        >
          TR
        </text>
      </svg>
    );
  }

  if (variant === "wordmark-emblem") {
    // Wordmark "TROIE" seul, sans emblème ni caption (demande client).
    // textLength + lengthAdjust="spacing" justifie TROIE exactement sur la
    // largeur du viewBox : le lettrage remplit la box, parfaitement aligné,
    // à toutes les tailles. y centré verticalement dans le viewBox.
    return (
      <svg
        viewBox="0 0 170 34"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-auto ${className}`}
        aria-label="TROIE"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="0"
          y="26"
          textLength="170"
          lengthAdjust="spacing"
          fontFamily="var(--font-bodoni, ui-serif, Georgia, serif)"
          fontWeight="400"
          fontSize="30"
          fill="currentColor"
        >
          TROIE
        </text>
      </svg>
    );
  }

  if (variant === "stack") {
    return (
      <div
        className={`flex flex-col items-center ${className}`}
        aria-label="TROIE, Studio France"
      >
        <Emblem className="h-14 w-auto" />
        <svg viewBox="0 0 200 50" className="mt-3 h-auto w-full" aria-hidden="true">
          <text
            x="100"
            y="32"
            textAnchor="middle"
            fontFamily="var(--font-bodoni, ui-serif, Georgia, serif)"
            fontWeight="400"
            fontSize="34"
            letterSpacing="14"
            fill="currentColor"
          >
            TROIE
          </text>
          <line
            x1="40"
            y1="44"
            x2="160"
            y2="44"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
        <span
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] opacity-70"
          style={{ color: "currentColor" }}
        >
          Atelier Digital
        </span>
      </div>
    );
  }

  // Default: horizontal wordmark, pure type
  return (
    <svg
      viewBox="0 0 220 36"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TROIE"
    >
      <text
        x="0"
        y="26"
        fontFamily="var(--font-bodoni, ui-serif, Georgia, serif)"
        fontWeight="400"
        fontSize="28"
        letterSpacing="10"
        fill="currentColor"
      >
        TROIE
      </text>
    </svg>
  );
}
