/**
 * Icones trophees, reutilisent les 4 pixel-art TROIE + variantes.
 * Rend des SVG simples pour les tier badges.
 */
export function TrophyIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": "true" as const,
    style,
  };
  switch (name) {
    case "shield":
      return (
        <svg {...common} className={className}>
          <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" />
        </svg>
      );
    case "sword":
      return (
        <svg {...common} className={className}>
          <path d="M14.5 17.5 4 5l3-3 12.5 10.5M12 12l5 5M9 19l-3 3M5 17l3 3M16 22l5-5" />
        </svg>
      );
    case "dragon":
      return (
        <svg {...common} className={className}>
          <path d="M3 12c2-4 6-7 10-7s6 3 6 6-2 5-5 5h-3v3l-4-4c-2-1-4-3-4-3z" />
        </svg>
      );
    case "sneaker":
      return (
        <svg {...common} className={className}>
          <path d="M3 16c0 2 2 4 5 4h11c2 0 3-1 3-3v-1L13 11l-3 3-4-1c-2 0-3 1-3 3zM10 14l-1-3" />
        </svg>
      );
    case "star":
    default:
      return (
        <svg {...common} className={className}>
          <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      );
  }
}
