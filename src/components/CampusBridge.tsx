import Image from "next/image";
import { Reveal } from "./Reveal";
import { GreekMark } from "./GreekMark";

/**
 * La passerelle décisive du studio vers troie.app : la section qui explique
 * ce QU'EST le campus (une plateforme en ligne) et À QUOI il sert (se mettre
 * en règle avec l'article 4 de l'AI Act, en deux heures, avec une attestation
 * vérifiable). Placée juste après le hook AI Act (AiUrgency) : le problème est
 * posé, voici le produit qui le résout. Sigle Β = Le campus (taxonomie de
 * marque partagée, cf. GreekMark). DA studio Hermès ; le visuel est une vraie
 * capture du produit, encadrée en fenêtre de navigateur.
 */
const APP_URL = "https://troie.app";
const AI_ACT_URL = "https://troie.app/ai-act";

const COPY = {
  fr: {
    label: "Le campus, troie.app",
    title: "En règle avec l'AI Act. En 2 heures.",
    lede: "troie.app, c'est notre campus en ligne. Des modules courts pour comprendre l'IA, vous mettre en conformité avec l'article 4 de l'AI Act, et repartir avec une attestation de formation vérifiable, à ajouter sur votre profil LinkedIn.",
    points: [
      "Commencez gratuitement, sans carte bancaire",
      "Des leçons de 5 minutes, à votre rythme",
      "Une attestation de formation vérifiable, prête pour LinkedIn",
    ],
    deadline: "Sanctions AI Act, 2 août 2026",
    cta: "Découvrir troie.app",
    secondary: "Comprendre l'AI Act",
    shot: "L'accueil du campus troie.app : parcours AI Act et progression.",
  },
  en: {
    label: "The campus, troie.app",
    title: "Compliant with the EU AI Act. In 2 hours.",
    lede: "troie.app is our online campus. Short modules to understand AI, meet Article 4 of the EU AI Act, and walk away with a verifiable training certificate you can add to your LinkedIn profile.",
    points: [
      "Start for free, no credit card",
      "Five-minute lessons, at your own pace",
      "A verifiable training certificate, ready for LinkedIn",
    ],
    deadline: "AI Act penalties, 2 August 2026",
    cta: "Explore troie.app",
    secondary: "Understand the AI Act",
    shot: "The troie.app campus home: AI Act path and progress.",
  },
} as const;

const LOCK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export function CampusBridge({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
        {/* Colonne texte : ce que c'est, à quoi ça sert, l'échéance, les CTA */}
        <Reveal>
          <GreekMark letter="Β" label={c.label} />
          <h2 className="t-display mt-6 max-w-xl text-4xl leading-[1.02] text-[var(--fg)] md:text-5xl lg:text-6xl">
            {c.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.lede}
          </p>

          <ul className="mt-8 space-y-3">
            {c.points.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 text-[15px] leading-relaxed text-[var(--fg)]"
              >
                <span aria-hidden="true" className="inline-block h-px w-4 flex-shrink-0 translate-y-[-3px] bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Échéance : l'urgence qui déclenche l'action */}
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {c.deadline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href={APP_URL}
              className="group/cta inline-flex items-center gap-3 bg-[var(--accent)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--ink)]"
            >
              {c.cta}
              <span aria-hidden="true" className="transition group-hover/cta:translate-x-1">→</span>
            </a>
            <a
              href={AI_ACT_URL}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
            >
              {c.secondary}
            </a>
          </div>
        </Reveal>

        {/* Colonne visuel : capture réelle du produit en fenêtre navigateur */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--bg-2)] shadow-[0_44px_100px_-55px_rgba(26,23,20,0.6)]">
            {/* Barre du navigateur : pastilles + adresse troie.app */}
            <div className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-3">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 inline-flex items-center gap-1.5 rounded-md bg-[var(--bg)] px-3 py-1 font-mono text-[11px] text-[var(--fg-2)]">
                {LOCK}
                troie.app
              </span>
            </div>
            {/* La capture : on montre le haut de l'écran (menu + parcours) */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/campus/troie-app-home.png"
                alt={c.shot}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
