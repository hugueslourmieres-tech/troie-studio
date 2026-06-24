import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactForm } from "./ContactForm";

const CAL_URL = "https://cal.com/hugueslourmieres";

/**
 * Section de contact en clôture de page : accroche, réservation d'un créneau
 * (cal.com), formulaire complet, et une gravure néoclassique. Fond sombre
 * (tone-taupe) où le formulaire s'intègre comme sur la page /contact.
 */
export function ContactCTA(_props: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="tone-taupe bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="md:max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Contact
          </p>
          <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg">
            {t("ctaSubtitle")}
          </p>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#1a1714] transition hover:bg-[#ff8c33]"
          >
            Réserver un créneau de 30 min
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
          {/* Formulaire complet (occupe 7 colonnes) */}
          <ContactForm />

          {/* Gravure + rappel email (5 colonnes) */}
          <aside className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--rule)] bg-[#1a130c]">
              <Image
                src="/images/gravure/gravure-equipe.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <a
              href="mailto:contact@troiestudio.fr"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
            >
              <span className="border-b border-[var(--rule-strong)] pb-0.5">contact@troiestudio.fr</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
