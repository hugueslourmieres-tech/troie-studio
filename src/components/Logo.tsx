/**
 * TROIE — primary wordmark.
 * The "O" carries the brand: a closed circle (the gates of Troy)
 * with an inner ember dot (the horse, hidden inside).
 */
export function Logo({
  variant = "wordmark",
  className = "",
}: {
  variant?: "wordmark" | "monogram";
  className?: string;
}) {
  if (variant === "monogram") {
    return (
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="TROIE"
      >
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle cx="32" cy="32" r="6" fill="var(--color-ember, #e44827)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TROIE"
    >
      <text
        x="0"
        y="36"
        fontFamily="var(--font-fraunces, ui-serif, Georgia, serif)"
        fontWeight="500"
        fontSize="42"
        letterSpacing="2"
        fill="currentColor"
      >
        TR
      </text>
      <circle
        cx="78"
        cy="22"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle cx="78" cy="22" r="4.5" fill="var(--color-ember, #e44827)" />
      <text
        x="100"
        y="36"
        fontFamily="var(--font-fraunces, ui-serif, Georgia, serif)"
        fontWeight="500"
        fontSize="42"
        letterSpacing="2"
        fill="currentColor"
      >
        IE
      </text>
    </svg>
  );
}
