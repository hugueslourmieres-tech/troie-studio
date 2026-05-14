import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-6 py-24 md:px-10">
      <p className="t-eyebrow">404</p>
      <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
        Page introuvable.
      </h1>
      <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
        La page que vous cherchez n'existe pas ou a été déplacée.
        <br />
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/fr"
          className="inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          ← Retour accueil
        </Link>
        <Link
          href="/en"
          className="inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          ← Back home
        </Link>
      </div>
    </article>
  );
}
