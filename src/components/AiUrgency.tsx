import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Section "urgence IA" : la punchline FOMO, fond ink dramatique, illustration
 * + CTA vers le QCM de niveau. Ton TROIE : phrases courtes, staccato.
 */
export function AiUrgency() {
  return (
    <section className="border-t border-[var(--accent)] bg-[#15120f] text-[#f5f0e6]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          {/* Illustration */}
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#ece4d6]">
              <Image
                src="/images/ai-urgency.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Yeux orange de la bête, qui scintillent */}
              <span aria-hidden="true" className="beast-eye" style={{ top: "20.5%", left: "36%" }} />
              <span aria-hidden="true" className="beast-eye" style={{ top: "18.5%", left: "43%" }} />
            </div>
          </Reveal>

          {/* Texte */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                L&apos;IA n&apos;attend personne
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="t-display mt-8 text-4xl leading-[1.05] text-[#f5f0e6] md:text-5xl lg:text-6xl">
                Utilisez l&apos;IA avant qu&apos;elle ne vous utilise.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#f5f0e6]/70 md:text-lg">
                La production s&apos;accélère. Les outils explosent. La
                comprendre, c&apos;est reprendre la main, pas la subir.
                Situez-vous en 10 questions, gratuitement.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/formations/quiz/niveau-ia"
                  className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6]"
                >
                  Connaître mon niveau
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </Link>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/45">
                  10 questions · 6 min · gratuit
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
