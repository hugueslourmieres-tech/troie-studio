import type { Metadata } from "next";
import { PantheonQuiz } from "./PantheonQuiz";

export const metadata: Metadata = {
  title: "Le test du Panthéon : quelle maison de l'Olympe êtes-vous ?",
  description:
    "5 questions pour découvrir votre maison : Hermès, Athéna, Achille ou Hestia. Recevez votre sésame pour l'Olympe et devenez le dieu de votre domaine, avec l'IA comme pouvoir.",
  alternates: { canonical: "https://troiestudio.fr/formations/pantheon" },
  openGraph: {
    type: "website",
    url: "https://troiestudio.fr/formations/pantheon",
    title: "Quelle maison de l'Olympe êtes-vous ?",
    description:
      "5 questions, une maison, un sésame. Devenez le dieu de votre domaine avec l'IA.",
  },
};

/**
 * Le test du Panthéon : la porte d'entrée gamifiée de la plateforme.
 * L'utilisateur découvre sa maison, reçoit son sésame par email et
 * repart avec un parcours taillé pour son usage.
 */
export default function PantheonPage() {
  return (
    <div className="bg-[var(--bg)] pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <header className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Le Panthéon · Test d&apos;ascension
          </p>
          <h1 className="t-display mt-6 text-4xl leading-[1.05] text-[var(--fg)] md:text-6xl">
            Vous n&apos;allez pas apprendre l&apos;IA. Vous allez devenir un dieu.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Cinq questions. Le Panthéon vous révèle votre maison : Hermès,
            Athéna, Achille ou Hestia. Vous recevez votre sésame pour
            l&apos;Olympe, avec le parcours et les armes de votre lignée.
          </p>
        </header>

        <div className="mt-14 md:mt-20">
          <PantheonQuiz />
        </div>
      </div>
    </div>
  );
}
