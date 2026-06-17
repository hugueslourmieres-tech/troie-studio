import { MOCK_TROPHIES, MOCK_UNLOCKED_TROPHIES } from "@/lib/mock-data";
import { TrophyIcon } from "../TrophyIcon";

export const metadata = {
  title: "Trophées · Espace membre TROIE",
  robots: { index: false, follow: false },
};

const TIER_LABEL = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  legendary: "Légendaire",
} as const;

const TIER_COLOR = {
  bronze: "#a06a3a",
  silver: "#9ca3af",
  gold: "#d4a72c",
  legendary: "var(--accent)",
} as const;

export default function TrophiesPage() {
  const total = MOCK_TROPHIES.length;
  const unlocked = MOCK_TROPHIES.filter((t) => MOCK_UNLOCKED_TROPHIES.has(t.slug));
  const locked = MOCK_TROPHIES.filter((t) => !MOCK_UNLOCKED_TROPHIES.has(t.slug));

  return (
    <div className="space-y-12 md:space-y-16">
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Trophées · {unlocked.length} / {total} débloqués
        </p>
        <h1 className="t-display mt-4 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
          Votre vitrine.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          Chaque action sur la plateforme débloque des trophées et de l'XP.
          Vos exploits restent visibles ici en permanence.
        </p>

        {/* Tier summary */}
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {(["bronze", "silver", "gold", "legendary"] as const).map((tier) => {
            const tierTrophies = MOCK_TROPHIES.filter((t) => t.tier === tier);
            const unlockedInTier = tierTrophies.filter((t) =>
              MOCK_UNLOCKED_TROPHIES.has(t.slug),
            ).length;
            return (
              <div
                key={tier}
                className="rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-4 md:p-5"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                  {TIER_LABEL[tier]}
                </p>
                <p
                  className="t-display mt-2 text-3xl"
                  style={{ color: TIER_COLOR[tier] }}
                >
                  {unlockedInTier}
                  <span className="text-[var(--fg-2)]/55 text-base">
                    /{tierTrophies.length}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Débloqués
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
            {unlocked.map((t) => (
              <li
                key={t.id}
                className="flex flex-col rounded-sm border border-[var(--accent)] bg-[var(--accent)]/8 p-6 md:p-7"
              >
                <TrophyIcon
                  name={t.icon_slug}
                  className="h-14 w-14"
                  style={{ color: TIER_COLOR[t.tier] }}
                />
                <h3 className="t-display mt-4 text-xl text-[var(--fg)] md:text-2xl">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                  {t.description}
                </p>
                <div className="mt-auto flex items-baseline justify-between pt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                  <span>{TIER_LABEL[t.tier]}</span>
                  <span className="text-[var(--accent)]">+{t.xp_reward} XP</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Locked */}
      <section>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          À débloquer · {locked.length}
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {locked.map((t) => (
            <li
              key={t.id}
              className="flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 opacity-70 md:p-7"
            >
              <TrophyIcon
                name={t.icon_slug}
                className="h-14 w-14 text-[var(--fg-2)]/40"
              />
              <h3 className="t-display mt-4 text-xl text-[var(--fg)]/80 md:text-2xl">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]/80">
                {t.description}
              </p>
              <div className="mt-auto flex items-baseline justify-between pt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                <span>{TIER_LABEL[t.tier]}</span>
                <span>🔒 +{t.xp_reward} XP</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
