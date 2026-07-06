"use client";

import { useEffect, useState } from "react";

/**
 * Lien email anti-moisson : l'adresse n'apparait jamais dans le HTML
 * servi (elle est assemblee apres hydratation), les robots qui
 * scrapent le code source ne la voient pas.
 *
 * - children : libelle du lien (bouton, texte...). Sans children,
 *   l'adresse elle-meme est affichee une fois montee.
 * - subject : pre-rempli l'objet du mail.
 */

const USER = "contact";
const DOMAIN = ["troiestudio", "fr"].join(".");

export function ObfuscatedEmail({
  subject,
  className,
  children,
}: {
  subject?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [href, setHref] = useState<string>("");

  useEffect(() => {
    const address = `${USER}@${DOMAIN}`;
    setHref(
      `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`,
    );
  }, [subject]);

  return (
    <a
      href={href || "#contact"}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
      className={className}
    >
      {children ?? (href ? `${USER}@${DOMAIN}` : `${USER}(a)${DOMAIN}`)}
    </a>
  );
}
