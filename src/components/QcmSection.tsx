import Link from "next/link";
import { Reveal } from "./Reveal";
import { STARTER_QUIZZES } from "@/app/formations/quizzes";

/* DA couleur des cartes (comme /ia) : crème, taupe, orange, noir. */
const TONES = [
  { card: "bg-[#ede3d0]", title: "text-[#1a1714]", sub: "text-[#1a1714]/65", accent: "text-[#c2570f]", hover: "group-hover:text-[#c2570f]" },
  { card: "bg-[#5a4a3a]", title: "text-[#f5f0e6]", sub: "text-[#f5f0e6]/70", accent: "text-[var(--accent)]", hover: "group-hover:text-[var(--accent)]" },
  { card: "bg-[var(--accent)]", title: "text-[#1a1714]", sub: "text-[#1a1714]/70", accent: "text-[#1a1714]", hover: "group-hover:text-[#1a1714]" },
  { card: "bg-[#1a1714]", title: "text-[#f5f0e6]", sub: "text-[#f5f0e6]/65", accent: "text-[var(--accent)]", hover: "group-hover:text-[var(--accent)]" },
];

/**
 * Section Particuliers : les QCM gratuits, cartes 100% cliquables. La couleur
 * vient des cartes (DA crème / taupe / orange / noir, comme /ia) ; la cover
 * est en N&B pour rester neutre sur tous les tons. Zoom au survol.
 */
export function QcmSection() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="md:max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Particuliers &amp; familles · gratuit
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                Comprendre l&apos;IA commence par un QCM.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Testez vos réflexes en 8 minutes. Gratuit, sans pièges, avec
                l&apos;explication après chaque réponse. On commence par là, pas
                par des heures de vidéo.
              </p>
            </div>
            <Link
              href="/formations/quiz"
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Tous les QCM
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-4">
          {STARTER_QUIZZES.map((q, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <li key={q.slug}>
                <Reveal delay={i * 0.05}>
                  <Link
                    href={`/formations/quiz/${q.slug}`}
                    className={`group flex h-full flex-col overflow-hidden rounded-sm transition-transform hover:-translate-y-1 ${tone.card}`}
                  >
                    {/* Cover N&B + picto, zoom au survol */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#1a0f08]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={q.cover}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: "grayscale(1) contrast(1.05) brightness(0.95)" }}
                        loading="lazy"
                      />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a0f08]/70">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#f6ead4]" aria-hidden="true">
                          <path d={q.icon} />
                        </svg>
                      </div>
                      <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[#f6ead4]/85">
                        Gratuit
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className={`font-mono text-[10px] uppercase tracking-[0.28em] ${tone.accent}`}>
                        {q.tagline}
                      </p>
                      <h3 className={`t-display mt-3 text-xl ${tone.title}`}>
                        {q.title}
                      </h3>
                      <p className={`mt-2 flex-1 text-sm leading-relaxed ${tone.sub}`}>
                        {q.description}
                      </p>
                      <span className={`mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] ${tone.sub} transition-colors ${tone.hover}`}>
                        Lancer le QCM
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
