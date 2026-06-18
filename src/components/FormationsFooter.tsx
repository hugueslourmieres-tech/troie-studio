import Link from "next/link";
import { Logo } from "./Logo";

const MAIN_SITE = "https://troiestudio.fr";
const LINKEDIN_URL = "https://www.linkedin.com/in/hugueslourmieres/";
const INSTAGRAM_URL = "https://www.instagram.com/hugueslourmieres/";

/**
 * Footer commun à toutes les pages de formation (/formations, /ia,
 * cours, mastermind, boutique). Donne du sens à l'offre globale :
 * se former (perso), se former (entreprise), se connecter, réseaux.
 */
export function FormationsFooter() {
  const COLS: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Se former · perso",
      links: [
        { label: "QCM gratuits", href: "/formations/quiz" },
        { label: "Boutique de prompts", href: "/formations/prompts" },
        { label: "Mastermind", href: "/formations/mastermind" },
      ],
    },
    {
      title: "Se former · entreprise",
      links: [
        { label: "TROIE · IA Pro", href: "/ia" },
        { label: "Agents IA", href: "/fr/agents" },
        { label: "Parcours pro", href: "/formations#pro" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Marque + se connecter */}
          <div className="md:col-span-5">
            <Logo variant="wordmark-emblem" className="h-9 text-[var(--fg)] md:h-10" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
              Apprendre l'IA et l'utiliser vraiment. Pour vous, votre famille et
              vos équipes. On commence par un QCM, pas par des heures de vidéo.
            </p>
            <Link
              href="/formations/auth/sign-in"
              className="group mt-7 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
              </svg>
              Se connecter
            </Link>
          </div>

          {/* Colonnes de liens */}
          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Réseaux */}
          <div className="md:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
              Suivre
            </p>
            <ul className="mt-5 flex gap-4 md:flex-col md:gap-4">
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[var(--fg-2)] transition hover:text-[var(--accent)]">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[var(--fg-2)] transition hover:text-[var(--accent)]">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4 border-t border-[var(--rule)] pt-6">
          <a href={MAIN_SITE} className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/75 transition hover:text-[var(--accent)] md:text-[11px]">
            Studio créatif · troiestudio.fr
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
            © 2026 TROIE Studio · Atelier digital
          </p>
        </div>
      </div>
    </footer>
  );
}
