"use client";

import type { ReactNode } from "react";
import { NEED_EVENT, type NeedSlug } from "@/lib/needs";

/**
 * Lien « Décrire mon projet » de l'accueil : descend jusqu'au formulaire
 * (#projet) et, depuis une carte, y présélectionne le besoin.
 */
export function NeedLink({
  need,
  className,
  children,
}: {
  need?: NeedSlug;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#projet"
      className={className}
      onClick={() => {
        if (need) {
          window.dispatchEvent(new CustomEvent(NEED_EVENT, { detail: need }));
        }
      }}
    >
      {children}
    </a>
  );
}
