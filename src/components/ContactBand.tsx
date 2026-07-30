import { useTranslations } from "next-intl";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Point de contact intermédiaire, posé juste après les logos clients.
 *
 * POURQUOI IL EXISTE (29/07/2026) : la home fait plus de 20 000 px et son seul
 * point de contact était la section de clôture, tout en bas. Un dirigeant qui
 * arrivait par une recherche « formation IA » devait traverser le portfolio
 * photo et vidéo avant de trouver comment nous parler. Cette bande lui donne
 * la sortie au moment où la preuve vient d'être montrée.
 *
 * Volontairement PLUS LÉGÈRE que ContactCTA, et sans <h2> : la page en a déjà
 * neuf, WriteOnScroll les anime tous, et deux sections de contact portant le
 * même titre auraient dilué le signal comme le rendu.
 */
export function ContactBand() {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[#1a1714]/15">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center md:flex-row md:justify-between md:px-12 md:py-16 md:text-left">
        <p className="max-w-xl text-base leading-relaxed text-[#1a1714]/80 md:text-lg">
          {t("bandText")}
        </p>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex flex-none items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e6] transition hover:bg-[#15120f]"
        >
          {t("bandCta")}
          <span aria-hidden="true" className="transition group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
