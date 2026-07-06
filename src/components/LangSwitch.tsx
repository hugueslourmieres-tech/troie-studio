"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routing } from "@/i18n/routing";

/**
 * LangSwitch, compact dropdown (e.g. "FR ▾") that opens a small menu
 * with the alternate locales. Saves space vs the inline "FR / EN" version.
 *
 * Swaps the leading /fr or /en in the current path without losing the
 * rest of the route. Closes on outside click and Escape.
 */
export function LangSwitch({ locale }: { locale: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const otherLocales = routing.locales.filter((l) => l !== locale);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const swap = (target: string) => {
    const segments = pathname.split("/");
    if (segments.length > 1 && (routing.locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
      return segments.join("/") || `/${target}`;
    }
    return `/${target}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)] transition hover:text-[var(--accent)]"
      >
        <span>{locale}</span>
        <svg
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[80px] border border-[var(--rule-strong)] bg-[var(--bg)] py-1 shadow-sm"
        >
          {otherLocales.map((l) => (
            <li key={l}>
              <Link
                href={swap(l)}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)] transition hover:bg-[var(--ink)] hover:text-[var(--bg)]"
              >
                {l}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
