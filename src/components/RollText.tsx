import { type ReactNode } from "react";

/**
 * Texte qui « déroule » verticalement au survol vers une copie clone
 * (généralement dans une autre couleur). À placer dans un parent portant
 * la classe `group` (le hover du parent déclenche le roll), ou il réagit
 * aussi à son propre survol.
 *
 * `top` = état au repos, `bottom` = état révélé au survol (défaut : `top`).
 */
export function RollText({
  top,
  bottom,
  className = "",
}: {
  top: ReactNode;
  bottom?: ReactNode;
  className?: string;
}) {
  return (
    <span className={`roll ${className}`}>
      <span className="roll-line">{top}</span>
      <span className="roll-line roll-clone" aria-hidden="true">
        {bottom ?? top}
      </span>
    </span>
  );
}
