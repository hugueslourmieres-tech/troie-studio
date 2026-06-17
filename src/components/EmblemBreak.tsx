import { Emblem } from "./Emblem";

/**
 * EmblemBreak, séparateur graphique entre deux sections.
 * Le guerrier centré au milieu de deux fines lignes (façon Hermès)
 * comme ponctuation visuelle qui ré-affirme la signature de la marque.
 *
 * Hauteur réglable via prop `size` (default: medium).
 */
export function EmblemBreak({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const heightClass =
    size === "sm" ? "h-12" : size === "lg" ? "h-24" : "h-16";
  const py = size === "sm" ? "py-12" : size === "lg" ? "py-24" : "py-16";

  return (
    <div
      className={`flex items-center justify-center gap-6 ${py} md:gap-10 ${className}`}
    >
      <span
        className="hidden h-px flex-1 max-w-xs bg-[var(--rule-strong)] sm:block"
        aria-hidden="true"
      />
      <Emblem className={`${heightClass} w-auto`} />
      <span
        className="hidden h-px flex-1 max-w-xs bg-[var(--rule-strong)] sm:block"
        aria-hidden="true"
      />
    </div>
  );
}
