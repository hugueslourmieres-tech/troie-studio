"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Profile } from "@/lib/types";
import { HOUSES, isHouseSlug, PANTHEON_ENABLED } from "@/lib/pantheon";

/**
 * DashboardSidebar, nav verticale + carte profil avec XP / level.
 * Sticky en desktop, compact en mobile (haut de page).
 *
 * Le formulaire de signout est un POST vers /formations/auth/sign-out
 * (handler route.ts qui efface la session puis redirige vers /formations).
 */

const NAV = [
  { href: "/formations/dashboard", label: "Vue d'ensemble", icon: "home" },
  { href: "/formations/dashboard/courses", label: "Mes cours", icon: "book" },
  { href: "/formations/dashboard/trophies", label: "Trophées", icon: "trophy" },
  { href: "/formations/dashboard/profile", label: "Profil", icon: "user" },
];

const PLAN_LABELS = {
  subscription: "Abonnement actif",
  lifetime: "Cours à vie",
  free: "Découverte",
} as const;

export function DashboardSidebar({
  profile,
  unlockedTrophyCount,
  streak = 1,
  plan = "free",
}: {
  profile: Profile;
  unlockedTrophyCount: number;
  streak?: number;
  plan?: keyof typeof PLAN_LABELS;
}) {
  const pathname = usePathname();
  const xpInLevel = profile.xp_total % 500;
  const xpPct = Math.round((xpInLevel / 500) * 100);

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Profil card */}
      <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-5">
        <div className="flex items-center gap-3">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt=""
              referrerPolicy="no-referrer"
              className="h-12 w-12 flex-shrink-0 rounded-full border border-[var(--rule)] object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[var(--accent)] text-[#1a1714]">
              <span className="t-display text-2xl">
                {(profile.full_name?.[0] ?? profile.email[0]).toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="t-display text-lg leading-tight text-[var(--fg)]">
              {profile.full_name || profile.email.split("@")[0]}
            </p>
            <p className="truncate font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Maison du Panthéon (masquée tant que PANTHEON_ENABLED est false) */}
        {PANTHEON_ENABLED && (isHouseSlug(profile.house) ? (
          <div
            className="mt-4 flex items-center justify-between rounded-sm px-3 py-2.5"
            style={{
              backgroundColor: HOUSES[profile.house].bg,
              color: HOUSES[profile.house].fg,
            }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
              ⚡ {HOUSES[profile.house].title}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-75"
            >
              {HOUSES[profile.house].motto}
            </span>
          </div>
        ) : (
          <Link
            href="/formations/pantheon/test"
            className="mt-4 flex items-center justify-between rounded-sm border border-dashed border-[var(--rule-strong)] px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/75 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>Découvrir ma maison</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}

        {/* Plan */}
        <div className="mt-4 flex items-center justify-between border-t border-[var(--rule)] pt-4">
          <span
            className={`inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] ${
              plan === "free" ? "text-[var(--fg-2)]/70" : "text-[var(--accent)]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                plan === "free" ? "bg-[var(--fg-2)]/50" : "bg-[var(--accent)]"
              }`}
            />
            {PLAN_LABELS[plan]}
          </span>
          {plan === "free" && (
            <Link
              href="/formations/tarifs"
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)] hover:underline"
            >
              Débloquer →
            </Link>
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
              Niveau {profile.level}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
              {profile.xp_total} XP
            </span>
          </div>
          <div className="mt-2 h-[3px] w-full overflow-hidden bg-[var(--fg)]/12">
            <div
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
            {500 - xpInLevel} XP avant niveau {profile.level + 1}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--rule)] pt-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
              Trophées
            </p>
            <p className="t-display text-xl text-[var(--accent)]">
              {unlockedTrophyCount}<span className="text-[var(--fg-2)]/55 text-sm">/10</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
              Streak
            </p>
            <p className="t-display text-xl text-[var(--fg)]">
              <span aria-hidden="true">🔥</span> {streak}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav>
        <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
          Navigation
        </p>
        <ul className="mt-3 space-y-1">
          {NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/formations/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 border-l-2 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)]/8 text-[var(--accent)]"
                      : "border-transparent text-[var(--fg-2)]/80 hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                  }`}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick links */}
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
          Raccourcis
        </p>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href="/formations"
              className="block py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 hover:text-[var(--accent)]"
            >
              ← Site formations
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="block py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 hover:text-[var(--accent)]"
            >
              ← TROIE Studio
            </Link>
          </li>
        </ul>
      </div>

      {/* Sign out */}
      <form action="/formations/auth/sign-out" method="POST" className="mt-auto">
        <button
          type="submit"
          className="w-full border border-[var(--rule)] px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": "true" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common} className={className}>
          <path d="M3 12 12 3l9 9M5 10v10h14V10" />
        </svg>
      );
    case "book":
      return (
        <svg {...common} className={className}>
          <path d="M4 5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1-2-2zM4 5v14a2 2 0 0 1 2-2h14" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common} className={className}>
          <path d="M6 4h12v6a6 6 0 0 1-12 0zM6 6H3a2 2 0 0 0 2 4M18 6h3a2 2 0 0 1-2 4M10 18h4v3h-4zM8 21h8" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
        </svg>
      );
    default:
      return null;
  }
}
