"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Locale switcher. Swaps the leading /fr or /en in the current path
 * without losing the rest of the route. Pure client logic, no JS heavy lifting.
 */
export function LangSwitch({ locale }: { locale: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const otherLocales = routing.locales.filter((l) => l !== locale);

  const swap = (target: string) => {
    const segments = pathname.split("/");
    if (segments.length > 1 && (routing.locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
      return segments.join("/") || `/${target}`;
    }
    return `/${target}`;
  };

  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]">
      <span className="text-[var(--color-bone)]">{locale}</span>
      {otherLocales.map((l) => (
        <span key={l} className="flex items-center gap-2">
          <span className="text-[var(--color-mist-strong)]">/</span>
          <Link
            href={swap(l)}
            className="text-[var(--color-mist-strong)] transition hover:text-[var(--color-bone)]"
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
