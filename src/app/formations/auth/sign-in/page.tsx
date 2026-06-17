import Link from "next/link";
import { SignInForm } from "./SignInForm";

export const metadata = {
  title: "Connexion · TROIE Formations",
  description:
    "Connectez-vous à votre espace membre TROIE Formations. Magic link, sans mot de passe.",
  robots: { index: false, follow: false },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <section className="border-b border-[var(--rule)]">
      <div className="mx-auto max-w-xl px-6 pt-32 pb-32 md:px-12 md:pt-40 md:pb-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Espace membre · connexion
        </p>
        <h1 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl">
          Bon retour.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          Un lien magique vous est envoyé par email. Pas de mot de passe.
          Cliquez, vous êtes connecté.
        </p>

        <SignInForm next={next ?? "/formations/dashboard"} />

        <p className="mt-12 text-sm leading-relaxed text-[var(--fg-2)]">
          Pas encore de compte ?{" "}
          <Link
            href="/formations#start"
            className="text-[var(--accent)] hover:underline"
          >
            Acheter un cours
          </Link>{" "}
          ou{" "}
          <Link
            href="/formations/module-0"
            className="text-[var(--accent)] hover:underline"
          >
            commencer par le Module 0 gratuit
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
