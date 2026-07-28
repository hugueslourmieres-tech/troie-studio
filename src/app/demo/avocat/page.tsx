import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cabinet Vasseur & Associés, Avocats",
  robots: { index: false, follow: false },
};

const serif = { fontFamily: "var(--demo-display, Georgia, serif)" } as const;
const sans = { fontFamily: "var(--demo-sans, system-ui, sans-serif)" } as const;
const IMG = "/images/demo/avocat";

const DOMAINES = [
  ["Droit des affaires", "Sociétés, contrats, fusions-acquisitions, contentieux commercial."],
  ["Droit social", "Relations individuelles et collectives, ruptures, prud'hommes."],
  ["Droit immobilier", "Transactions, baux, copropriété, construction et urbanisme."],
  ["Droit de la famille", "Divorce, succession, régimes matrimoniaux, médiation."],
  ["Droit pénal", "Défense, instruction, comparutions, droits de la défense."],
  ["Fiscalité", "Optimisation, contrôle fiscal, contentieux avec l'administration."],
];

/**
 * DÉMO portfolio TROIE : exemple de site pour un cabinet d'avocats.
 * Marque fictive "Vasseur & Associés". Images de banque (Unsplash).
 */
export default function Avocat() {
  return (
    <div style={sans} className="min-h-screen bg-[#f6f3ec] text-[#1a2230] antialiased">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
          <span style={serif} className="text-lg tracking-[0.12em] text-white md:text-xl">
            VASSEUR <span className="text-[#c2a36b]">&amp;</span> ASSOCIÉS
          </span>
          <nav className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.2em] text-white/85 lg:flex">
            <a href="#cabinet" className="transition hover:text-white">Le Cabinet</a>
            <a href="#domaines" className="transition hover:text-white">Domaines</a>
            <a href="#approche" className="transition hover:text-white">Approche</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
          <a
            href="#contact"
            className="bg-[#c2a36b] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[#141b26] transition hover:bg-white"
          >
            Prendre rendez-vous
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ height: "88vh", minHeight: "560px" }} className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${IMG}/library.jpg`} alt="Bibliothèque du cabinet Vasseur & Associés" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#0f141d]/72" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#c2a36b]">Avocats au Barreau de Nice</p>
          <h1 style={serif} className="mt-7 max-w-3xl text-5xl font-light leading-[1.05] text-white md:text-7xl">
            Défendre vos intérêts, avec exigence.
          </h1>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">
            Un cabinet à taille humaine, une expertise pointue et un
            accompagnement sans concession, pour les entreprises comme pour les
            particuliers.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href="#contact" className="bg-[#c2a36b] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[#141b26] transition hover:bg-white">
              Prendre rendez-vous
            </a>
            <a href="#domaines" className="border-b border-white/40 pb-1 text-[11px] uppercase tracking-[0.24em] text-white transition hover:border-white">
              Nos domaines
            </a>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="border-b border-[#1a2230]/10 bg-[#141b26] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 md:px-10">
          {[
            ["25 ans", "d'expérience"],
            ["3 associés", "+ 6 collaborateurs"],
            ["+ 1 200", "dossiers traités"],
            ["94 %", "de clients satisfaits"],
          ].map(([n, l]) => (
            <div key={l}>
              <p style={serif} className="text-3xl font-light text-[#c2a36b] md:text-4xl">{n}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/55">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Le Cabinet */}
      <section id="cabinet" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/office.jpg`} alt="Les locaux du cabinet" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#a8843f]">Le Cabinet</p>
            <h2 style={serif} className="mt-6 text-4xl font-light leading-tight text-[#1a2230] md:text-5xl">
              Une exigence, une éthique, une équipe.
            </h2>
            <p className="mt-7 text-lg font-light leading-relaxed text-[#46505f]">
              Fondé en 2000, le cabinet Vasseur &amp; Associés conseille et
              défend ses clients avec rigueur et disponibilité. Nous privilégions
              la relation directe, la clarté des honoraires et la recherche de la
              solution la plus juste, négociée ou contentieuse.
            </p>
            <a href="#contact" className="mt-9 inline-block border-b border-[#1a2230] pb-1 text-[12px] uppercase tracking-[0.2em] text-[#1a2230] transition hover:border-[#a8843f] hover:text-[#a8843f]">
              Nous rencontrer →
            </a>
          </div>
        </div>
      </section>

      {/* Domaines */}
      <section id="domaines" className="bg-[#efeada]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#a8843f]">Domaines d&apos;expertise</p>
            <h2 style={serif} className="mt-5 text-3xl font-light text-[#1a2230] md:text-5xl">
              Un conseil sur tous vos enjeux juridiques.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#1a2230]/12 bg-[#1a2230]/12 md:grid-cols-3">
            {DOMAINES.map(([t, d]) => (
              <div key={t} className="bg-[#efeada] p-8 md:p-10">
                <h3 style={serif} className="text-2xl font-normal text-[#1a2230]">{t}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#56606f]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approche */}
      <section id="approche" className="relative overflow-hidden bg-[#141b26] text-white">
        <div className="mx-auto grid max-w-7xl items-stretch gap-0 md:grid-cols-2">
          <div className="px-6 py-24 md:py-32 md:pl-10 md:pr-16 lg:pl-16">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#c2a36b]">Notre approche</p>
            <h2 style={serif} className="mt-6 text-4xl font-light leading-tight md:text-5xl">
              Disponibles, clairs, engagés.
            </h2>
            <ul className="mt-10 space-y-7">
              {[
                ["Premier rendez-vous offert", "Un échange de 30 minutes pour évaluer votre situation sans engagement."],
                ["Honoraires transparents", "Convention écrite dès le départ, aucune surprise en cours de dossier."],
                ["Un interlocuteur dédié", "Le même avocat vous suit du conseil jusqu'à l'audience."],
              ].map(([t, d]) => (
                <li key={t} className="border-l border-[#c2a36b]/50 pl-6">
                  <p style={serif} className="text-xl font-normal text-white">{t}</p>
                  <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-white/65">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[320px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/handshake.jpg`} alt="Accompagnement du cabinet" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Contact / RDV */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#a8843f]">Contact</p>
            <h2 style={serif} className="mt-6 text-4xl font-light leading-tight text-[#1a2230] md:text-5xl">
              Prenons rendez-vous.
            </h2>
            <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-[#46505f]">
              Décrivez-nous votre situation en quelques mots. Nous vous
              recontactons sous 24 heures pour fixer un premier entretien.
            </p>
            <div className="mt-10 space-y-3 text-sm font-light text-[#46505f]">
              <p>14 rue de France, 06000 Nice</p>
              <p>+33 4 00 00 00 00</p>
              <p>contact@vasseur-associes.fr</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input readOnly placeholder="Nom" className="border border-[#1a2230]/20 bg-transparent px-5 py-4 text-sm text-[#1a2230] placeholder:text-[#1a2230]/40 focus:border-[#a8843f] focus:outline-none" />
              <input readOnly placeholder="Téléphone" className="border border-[#1a2230]/20 bg-transparent px-5 py-4 text-sm text-[#1a2230] placeholder:text-[#1a2230]/40 focus:border-[#a8843f] focus:outline-none" />
            </div>
            <input readOnly placeholder="Email" className="w-full border border-[#1a2230]/20 bg-transparent px-5 py-4 text-sm text-[#1a2230] placeholder:text-[#1a2230]/40 focus:border-[#a8843f] focus:outline-none" />
            <textarea readOnly rows={4} placeholder="Votre demande" className="w-full resize-none border border-[#1a2230]/20 bg-transparent px-5 py-4 text-sm text-[#1a2230] placeholder:text-[#1a2230]/40 focus:border-[#a8843f] focus:outline-none" />
            <button type="button" className="w-full bg-[#141b26] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-[#a8843f]">
              Envoyer ma demande
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a2230]/12 bg-[#f6f3ec]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <span style={serif} className="text-lg tracking-[0.12em] text-[#1a2230]">VASSEUR &amp; ASSOCIÉS</span>
          <p className="text-sm font-light text-[#56606f]">Avocats, Barreau de Nice, 06000</p>
        </div>
        <div className="border-t border-[#1a2230]/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-[#8a8470] md:flex-row md:items-center md:justify-between md:px-10">
            <span>Exemple, Marque fictive, Images Unsplash</span>
            <a href="https://troiestudio.fr" className="transition hover:text-[#a8843f]">Site réalisé par TROIE Studio →</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
