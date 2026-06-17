import Link from "next/link";
import { Logo } from "@/components/Logo";

const MAIN_SITE = "https://troiestudio.fr";

export const metadata = {
  title: "Espace membre · TROIE Formations",
  description:
    "Vos cours, votre progression, vos prompts. Espace membre TROIE.",
  robots: { index: false, follow: false },
};

/* ─────────────────────────────────────────────────────────────────────
   /formations/dashboard — placeholder espace membre.
   Sera relie a Supabase + Lemon Squeezy au moment du go-live.
   Pour l'instant : maquette statique avec etats logged-out + logged-in
   pour montrer la cible d'experience.
   ───────────────────────────────────────────────────────────────────── */

const COURSES_LOCKED = [
  {
    badge: "Cours 01 · Entry",
    title: "Maitriser ChatGPT & Claude",
    href: "/formations/cours-01",
    progress: 0,
    bought: false,
    price: "97 €",
  },
  {
    badge: "Cours 02 · Advanced",
    title: "Workflows IA solo & equipe",
    href: "/formations/cours-02",
    progress: 0,
    bought: false,
    price: "297 €",
  },
  {
    badge: "Mastermind",
    title: "Abo : tous cours + community",
    href: "/formations/mastermind",
    progress: 0,
    bought: false,
    price: "49 € / mois",
  },
];

export default function DashboardPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Global FormationsHeader rendered via layout */}
      {/* HERO LOGIN-LIKE */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Espace membre · acces a vos cours
          </p>
          <h1 className="t-display mt-6 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Bienvenue. Vos parcours vous attendent.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Cet espace sera actif des l'activation du systeme de paiement.
            Pour l'instant, tous les cours sont accessibles en preview :
            vous voyez le plan, les modules, les livrables. Le contenu
            video et les ressources telechargeables se debloquent apres
            achat.
          </p>

          {/* Login form placeholder */}
          <div className="mt-12 max-w-md rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              Connexion
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">
              Disponible bientot. Pour l'instant, contactez{" "}
              <a
                href="mailto:contact@troiestudio.fr"
                className="font-mono text-[12px] uppercase tracking-[0.22em] text-[var(--accent)] hover:underline"
              >
                contact@troiestudio.fr
              </a>
              .
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                placeholder="votre@email.fr"
                disabled
                aria-label="Email (bientot dispo)"
                className="border border-[var(--rule)] bg-[var(--bg)] px-4 py-3 text-base text-[var(--fg)] placeholder:text-[var(--fg-2)]/55 disabled:opacity-65"
              />
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-3 bg-[var(--fg)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] disabled:opacity-65"
              >
                Recevoir un lien magique (bientot)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des cours (etat locked / unlocked) */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Vos cours
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-4xl lg:text-5xl">
            Etat : non connecte
          </h2>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
            {COURSES_LOCKED.map((c) => (
              <div
                key={c.title}
                className="flex h-full flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                    {c.badge}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                    {c.bought ? "Achete" : "Locked"}
                  </span>
                </div>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[26px]">
                  {c.title}
                </h3>

                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    Progression
                  </p>
                  <div className="mt-2 h-[3px] w-full overflow-hidden bg-[var(--fg)]/12">
                    <div
                      className="h-full bg-[var(--accent)]"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                    {c.progress} %
                  </p>
                </div>

                <div className="flex-1" />
                <div className="mt-8 border-t border-[var(--rule)] pt-6">
                  <p className="t-display text-2xl text-[var(--fg)] md:text-3xl">
                    {c.price}
                  </p>
                  <Link
                    href={c.href}
                    className="group mt-4 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                  >
                    Voir la page
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap espace membre */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Ce qui arrive
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-4xl lg:text-5xl">
            Roadmap espace membre.
          </h2>

          <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-4">
            {[
              {
                title: "Auth magic link",
                body: "Connexion par email (Supabase Auth). Pas de mot de passe.",
              },
              {
                title: "Paiement Lemon Squeezy",
                body: "Checkout securise (CB, Apple/Google Pay, virement SEPA). TVA EU gere.",
              },
              {
                title: "Hosting video",
                body: "Mux ou Cloudflare Stream. HLS adaptatif, pas de downloads.",
              },
              {
                title: "Bibliotheque prompts",
                body: "Recherche, tags, copie en 1 clic, MAJ mensuelles automatiques.",
              },
            ].map((s, i) => (
              <li key={s.title} className="border-t border-[var(--rule)] pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")} ·
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <Logo variant="wordmark-emblem" className="h-10 text-[var(--fg)] md:h-12" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                Atelier digital · Paris · Formations IA en ligne
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end md:justify-end">
              <Link href={MAIN_SITE} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]">
                Retour au site principal →
              </Link>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                © 2026 TROIE Studio
              </p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
