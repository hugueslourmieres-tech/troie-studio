import Link from "next/link";
import { Logo } from "@/components/Logo";
import { EmblemBreak } from "@/components/EmblemBreak";
import { QuizPlayer } from "../QuizPlayer";
import { MODULE_0_FREE, COURSE_01_PREVIEW, COURSE_02_PREVIEW } from "../questions";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";

export const metadata = {
  title: "Module 0 · La theorie LLM en 15 minutes — TROIE Formations",
  description:
    "QCM gratuit · 10 questions pour comprendre comment fonctionne un LLM, pourquoi il hallucine, et comment lui parler. Sans inscription.",
  alternates: {
    canonical: "https://troiestudio.fr/formations/module-0",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   /formations/module-0 — Module 0 gratuit
   - Theorie LLM en 15 min
   - QCM interactif 10 questions (QuizPlayer)
   - Section locked : preview Cours 01 + Cours 02 (teaser payant)
   ───────────────────────────────────────────────────────────────────── */

const LECONS = [
  {
    badge: "01 · Pre-training",
    title: "Comment un modele apprend a predire.",
    body: "Le modele est nourri de milliards de tokens. Il apprend a deviner le prochain mot. C'est tout. Pas de comprehension, pas de logique : juste des probabilites.",
  },
  {
    badge: "02 · RLHF",
    title: "Pourquoi il devient sycophant.",
    body: "Apres le pre-training, des humains notent ses reponses. Il apprend a vous plaire. Effet secondaire : il vous donne raison meme quand vous avez tort.",
  },
  {
    badge: "03 · Hallucinations",
    title: "D'ou viennent les inventions.",
    body: "Comme c'est un predicteur, il privilegie ce qui 'sonne juste'. Quand il n'a pas l'info exacte, il l'invente. Particulierement sur chiffres, dates et citations.",
  },
  {
    badge: "04 · Reflexes pro",
    title: "Ne plus jamais vous faire avoir.",
    body: "Trois reflexes : forcer la sortie de secours 'je ne sais pas', exiger les sources, et toujours verifier les chiffres a deux fois avant de publier.",
  },
];

export default function Module0Page() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <header className="relative border-b border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Retour au site TROIE">
              <Logo variant="wordmark-emblem" className="h-10 text-[var(--fg)] md:h-12" />
            </Link>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)] md:inline-block">
              · Module 0
            </span>
          </div>
          <Link
            href="/formations"
            className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)] md:text-[11px]"
          >
            <span aria-hidden="true">←</span>
            Toutes les formations
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Module 0 · gratuit · 15 min · sans inscription
          </p>
          <h1 className="t-display mt-8 max-w-4xl text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px]">
            Pourquoi un LLM hallucine{" "}
            <span className="text-[var(--accent)]">et veut vous plaire.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
            Avant d'equiper votre heros, comprenez son fonctionnement de
            base. La theorie LLM en 4 lecons, puis 10 questions pour
            valider votre comprehension. Score ≥ 7/10 :{" "}
            <strong className="text-[var(--fg)]">code promo de -15 %</strong>{" "}
            sur le Cours 01.
          </p>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* 4 LECONS */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            La theorie · 4 lecons
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Comprendre pour ne plus jamais subir.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-2">
            {LECONS.map((l) => (
              <div key={l.badge} className="bg-[var(--bg)] p-8 md:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  {l.badge}
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
                  {l.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {l.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* QCM */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            QCM · 10 questions · gratuit
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Validez votre comprehension.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Chaque question a une explication detaillee. Score &ge; 7/10 : code
            promo -15 % debloque pour le Cours 01.
          </p>

          <div className="mt-16">
            <QuizPlayer
              questions={MODULE_0_FREE}
              passThreshold={0.7}
              unlockCode="TROIE-START"
            />
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* PREVIEW LOCKED — Cours 01 + Cours 02 */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Plus de questions ? · payant
          </p>
          <h2 className="t-display mt-8 max-w-4xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Les Cours 01 et 02 embarquent 100+ questions.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Les parcours payants couvrent les prompts patterns, les
            system prompts, les MCPs, les agents persistants et les
            workflows Make. Voici 2 exemples de questions.
          </p>

          {/* Locked preview cards */}
          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
            {/* Cours 01 locked card */}
            <div className="relative overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Cours 01 · Entry · 97 €
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  Locked
                </span>
              </div>
              <h3 className="t-display mt-6 text-2xl text-[var(--fg)] md:text-3xl">
                Maitriser ChatGPT &amp; Claude
              </h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                30 questions · 5 patterns · 25 prompts · acces a vie
              </p>

              {/* Question preview floutee */}
              <div className="relative mt-6 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  Question · extrait
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg)] md:text-base">
                  {COURSE_01_PREVIEW[0].prompt}
                </p>
                <ul className="mt-4 space-y-2">
                  {COURSE_01_PREVIEW[0].options.map((opt, i) => (
                    <li
                      key={i}
                      className={`text-sm text-[var(--fg-2)] ${
                        i > 0 ? "blur-[3px] select-none" : ""
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </li>
                  ))}
                </ul>
                {/* Overlay verrou */}
                <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4">
                  <div className="rounded-sm border border-[var(--accent)] bg-[var(--bg)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    + 28 questions
                  </div>
                </div>
              </div>

              <a
                href="/formations#paths"
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
              >
                Debloquer · 97 €
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Cours 02 locked card */}
            <div className="relative overflow-hidden rounded-sm border border-[var(--rule)] bg-[#1a1714] p-8 text-[#f5f0e6] md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Cours 02 · Advanced · 297 €
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/55">
                  Locked
                </span>
              </div>
              <h3 className="t-display mt-6 text-2xl md:text-3xl">
                Workflows IA solo &amp; equipe
              </h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/60">
                70 questions · 100 prompts · 8 MCPs · 10 templates Make
              </p>

              <div className="relative mt-6 rounded-sm border border-[#f5f0e6]/15 bg-[#f5f0e6]/5 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  Question · extrait
                </p>
                <p className="mt-3 text-sm leading-relaxed md:text-base">
                  {COURSE_02_PREVIEW[0].prompt}
                </p>
                <ul className="mt-4 space-y-2">
                  {COURSE_02_PREVIEW[0].options.map((opt, i) => (
                    <li
                      key={i}
                      className={`text-sm text-[#f5f0e6]/85 ${
                        i > 0 ? "blur-[3px] select-none" : ""
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </li>
                  ))}
                </ul>
                <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4">
                  <div className="rounded-sm border border-[var(--accent)] bg-[#1a1714] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    + 68 questions
                  </div>
                </div>
              </div>

              <a
                href="/formations#paths"
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[var(--accent)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
              >
                Debloquer · 297 €
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="tone-accent border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-8">
              <h2 className="t-display text-4xl text-[var(--fg)] md:text-7xl">
                Pret a equiper votre premier heros ?
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Si vous avez compris le Module 0, vous etes pret pour
                le Cours 01. On y voit 5 patterns de prompts
                reutilisables, comment ecrire un system prompt qui
                tient, et les 3 MCPs essentiels pour transformer
                ChatGPT ou Claude en outil pro.
              </p>
              <a
                href="/formations#paths"
                className="group mt-12 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--bg)] hover:text-[var(--bg)] md:text-[12px]"
              >
                Voir les 3 parcours
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="md:col-span-4 md:border-l md:border-[var(--fg)]/20 md:pl-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/70">
                Ou parler a un humain
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="t-display mt-3 block text-2xl text-[var(--fg)] hover:text-[var(--bg)] md:text-3xl"
              >
                30 min en visio →
              </a>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/75">
                On regarde votre activite. On vous dit honnetement par quel cours commencer.
              </p>
            </div>
          </div>
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
