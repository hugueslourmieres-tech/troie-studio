import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

type Tool = { src: string; label: string };

type Fork = {
  key: "perso" | "pro";
  /** Couleur signature du pack. */
  tint: string;
  /** Encre lisible posée sur la couleur du pack. */
  ink: string;
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  tools: Tool[];
  toolsLabel: string;
  icon: React.ReactNode;
  cta: { href: string; label: string };
  secondary: { href: string; label: string };
};

const PERSO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PRO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

/**
 * Fork Pro / Perso : le carrefour central de la home. Oriente d'emblée le
 * visiteur vers son parcours. Deux box appuyées, chacune sa couleur signature
 * (particuliers en orange Hermès, pros en vert pétrole), une photo forte et la
 * rangée des outils maîtrisés dans chaque univers.
 */
export function AudienceFork({ locale }: { locale: string }) {
  const FORKS: Fork[] = [
    {
      key: "perso",
      tint: "#f37b22",
      ink: "#1a1714",
      image: "/images/audience/perso-v5.jpg",
      eyebrow: "Particuliers & familles",
      title: "Comprendre l'IA, sans danger.",
      body: "Pour vous, vos enfants, vos parents. On commence par un QCM gratuit, pas par des heures de vidéo.",
      points: [
        "QCM gratuits dès l'inscription",
        "Cours en ligne, à votre rythme",
        "Sécurité, esprit critique, usages du quotidien",
      ],
      toolsLabel: "Les outils du quotidien",
      tools: [
        { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
        { src: "/images/logos/gemini.svg", label: "Gemini" },
        { src: "/images/logos/copilot.svg", label: "Copilot" },
        { src: "/images/logos/claude.svg", label: "Claude" },
        { src: "/images/logos/midjourney.svg", label: "Midjourney" },
      ],
      icon: PERSO_ICON,
      cta: { href: "/formations/quiz", label: "Faire le QCM gratuit" },
      secondary: { href: "/formations", label: "Voir les cours" },
    },
    {
      key: "pro",
      tint: "#1f4d4a",
      ink: "#fdfaf3",
      image: "/images/audience/pro-v5.jpg",
      eyebrow: "Professionnels & équipes",
      title: "Formez et déployez l'IA.",
      body: "Montée en compétence des équipes, conformité AI Act, agents sur mesure. En présentiel ou à distance.",
      points: [
        "Formations intra-entreprise, France et remote",
        "Cadrage des usages et conformité AI Act",
        "Agents IA : création, déploiement, supervision",
      ],
      toolsLabel: "Les outils des équipes",
      tools: [
        { src: "/images/logos/notion.svg", label: "Notion" },
        { src: "/images/logos/slack.svg", label: "Slack" },
        { src: "/images/logos/hubspot.svg", label: "HubSpot" },
        { src: "/images/logos/make.svg", label: "Make" },
        { src: "/images/logos/salesforce.svg", label: "Salesforce" },
      ],
      icon: PRO_ICON,
      cta: { href: `/${locale}/contact`, label: "Réserver un audit de 30 min" },
      secondary: { href: "/ia", label: "TROIE IA Pro" },
    },
  ];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <p className="t-eyebrow">Par où commencer</p>
          <h2 className="t-display mt-6 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Deux parcours, une méthode.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            On vous forme et on vous accompagne à l&apos;IA, en ligne et en
            présentiel. Choisissez votre profil, on s&apos;occupe du reste.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {FORKS.map((fork, i) => (
            <Reveal key={fork.key} delay={i * 0.08}>
              <ForkCard fork={fork} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForkCard({ fork }: { fork: Fork }) {
  // Couleurs du pack exposées en variables CSS pour le hover et les CTA.
  const style = {
    "--card": fork.tint,
    "--ink": fork.ink,
  } as CSSProperties;

  return (
    <article
      style={style}
      className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--card)] hover:shadow-[0_36px_80px_-40px_rgba(26,23,20,0.5)]"
    >
      {/* Bandeau couleur signature du pack */}
      <span aria-hidden="true" className="block h-1.5 w-full bg-[var(--card)]" />

      {/* Photo éditoriale N&B */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={fork.image}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Pastille profil, dans la couleur du pack */}
        <span
          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--bg)]/85 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-sm"
          style={{ color: fork.tint }}
        >
          {fork.icon}
          {fork.eyebrow}
        </span>
      </div>

      {/* Corps */}
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <h3 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
          {fork.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[var(--fg-2)]">
          {fork.body}
        </p>

        <ul className="mt-6 space-y-2.5">
          {fork.points.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--fg-2)]"
            >
              <span aria-hidden="true" className="inline-block h-px w-3 flex-shrink-0 bg-[var(--card)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Outils maîtrisés dans cet univers */}
        <div className="mt-7 border-t border-[var(--rule)] pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg-2)]/60">
            {fork.toolsLabel}
          </p>
          <ul aria-label={fork.toolsLabel} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            {fork.tools.map((tool) => (
              <li
                key={tool.src}
                title={tool.label}
                className="flex h-6 items-center opacity-55 transition-opacity duration-300 group-hover:opacity-90"
              >
                <img
                  src={tool.src}
                  alt={tool.label}
                  loading="lazy"
                  className="h-6 w-auto"
                  style={{ filter: "brightness(0)" }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1" />

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href={fork.cta.href}
            className="group/cta inline-flex items-center gap-3 bg-[var(--card)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink)] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
          >
            {fork.cta.label}
            <span aria-hidden="true" className="transition group-hover/cta:translate-x-1">→</span>
          </Link>
          <Link
            href={fork.secondary.href}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)] transition hover:text-[var(--card)]"
          >
            {fork.secondary.label}
          </Link>
        </div>
      </div>
    </article>
  );
}
