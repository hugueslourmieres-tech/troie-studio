import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maison Lumière · Hôtel & Rooftop, Riviera",
  robots: { index: false, follow: false },
};

const serif = { fontFamily: "var(--demo-display, Georgia, serif)" } as const;
const sans = { fontFamily: "var(--demo-sans, system-ui, sans-serif)" } as const;

const GALLERY = [
  "/images/works/Monaco/01.jpg",
  "/images/works/CHANEL/cover.jpg",
  "/images/works/Monaco/03.jpg",
  "/images/slideshow/04.jpg",
  "/images/works/Monaco/04.jpg",
  "/images/slideshow/01.jpg",
];

/**
 * DÉMO portfolio TROIE : vitrine hôtellerie / luxe.
 * Marque fictive "Maison Lumière". Photos issues des réalisations TROIE.
 */
export default function MaisonLumiere() {
  return (
    <div style={sans} className="min-h-screen bg-[#f6f2ea] text-[#1c1a16] antialiased">
      {/* Barre de navigation, posée sur le hero */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
          <span style={serif} className="text-xl tracking-[0.16em] text-white md:text-2xl">
            MAISON LUMIÈRE
          </span>
          <nav className="hidden items-center gap-10 text-[12px] uppercase tracking-[0.22em] text-white/85 md:flex">
            <a href="#maison" className="transition hover:text-white">La Maison</a>
            <a href="#sejour" className="transition hover:text-white">Séjour</a>
            <a href="#table" className="transition hover:text-white">La Table</a>
            <a href="#galerie" className="transition hover:text-white">Galerie</a>
          </nav>
          <a
            href="#reserver"
            className="border border-white/60 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-[#1c1a16]"
          >
            Réserver
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/works/Monaco/cover.jpg"
          alt="Maison Lumière, vue sur la baie de nuit"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/80">
            Riviera · depuis 1923
          </p>
          <h1 style={serif} className="mt-7 text-5xl font-light leading-[1.02] md:text-7xl lg:text-[5.5rem]">
            L&apos;art de recevoir,
            <br />
            au-dessus de la baie.
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/85">
            Hôtel particulier et rooftop signature, suspendus entre mer et ciel.
            Vingt-quatre chambres, une table d&apos;exception, le calme absolu.
          </p>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#reserver"
              className="bg-white px-9 py-4 text-[11px] uppercase tracking-[0.26em] text-[#1c1a16] transition hover:bg-[#a8884e] hover:text-white"
            >
              Réserver un séjour
            </a>
            <a
              href="#table"
              className="border-b border-white/50 pb-1 text-[11px] uppercase tracking-[0.26em] text-white transition hover:border-white"
            >
              Découvrir la table
            </a>
          </div>
        </div>
        <span className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/70">
          Défiler
        </span>
      </section>

      {/* La Maison */}
      <section id="maison" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#a8884e]">La Maison</p>
            <div className="mt-6 h-px w-16 bg-[#a8884e]/50" />
          </div>
          <div className="md:col-span-8">
            <h2 style={serif} className="text-3xl font-light leading-tight text-[#1c1a16] md:text-5xl">
              Un siècle d&apos;élégance, face à la Méditerranée.
            </h2>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#46413a]">
              Derrière une façade Belle Époque, la Maison Lumière cultive un luxe
              discret : marbres patinés, lin écru, lumière dorée du Sud. Chaque
              détail répond à une seule exigence, vous faire oublier le temps.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
              {[
                ["24", "Chambres & suites"],
                ["1923", "Année de création"],
                ["1", "Étoile Michelin"],
                ["7j/7", "Conciergerie"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p style={serif} className="text-4xl font-light text-[#1c1a16]">{n}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#8c8475]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section id="sejour" className="bg-[#efe9de]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-8 md:grid-cols-3 md:gap-7">
            {[
              { img: "/images/works/Monaco/02.jpg", k: "Les Suites", t: "Vue mer, terrasses privées et majordome dédié." },
              { img: "/images/works/CHANEL/DSC_8647-2.jpg", k: "Le Spa", t: "Soins signature, hammam et piscine intérieure." },
              { img: "/images/slideshow/04.jpg", k: "Les Événements", t: "Mariages et réceptions privées sur le rooftop." },
            ].map((c) => (
              <article key={c.k} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ddd5c7]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.k}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <h3 style={serif} className="mt-7 text-2xl font-light text-[#1c1a16]">{c.k}</h3>
                <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-[#5d574c]">{c.t}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* La Table */}
      <section id="table" className="relative overflow-hidden bg-[#161310] text-[#f3ede1]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-10 md:py-36">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#c9a86a]">La Table</p>
            <h2 style={serif} className="mt-6 text-4xl font-light leading-tight md:text-6xl">
              Une cuisine de lumière, au coucher du soleil.
            </h2>
            <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-[#cabfac]">
              Sur le rooftop, le chef compose une carte méditerranéenne au
              rythme des saisons et des pêcheurs de la baie. Une étoile, une
              vue, un moment suspendu.
            </p>
            <a
              href="#reserver"
              className="mt-10 inline-block border border-[#c9a86a]/60 px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[#f3ede1] transition hover:bg-[#c9a86a] hover:text-[#161310]"
            >
              Réserver une table
            </a>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/works/CHANEL/cover.jpg"
              alt="La table de la Maison Lumière"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 style={serif} className="text-3xl font-light text-[#1c1a16] md:text-5xl">
            La Maison en images
          </h2>
          <span className="hidden text-[11px] uppercase tracking-[0.24em] text-[#a8884e] md:block">
            Riviera française
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {GALLERY.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden bg-[#ddd5c7] ${i % 5 === 0 ? "aspect-[4/5]" : "aspect-square"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Citation */}
      <section className="bg-[#efe9de]">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
          <p style={serif} className="text-3xl font-light italic leading-snug text-[#1c1a16] md:text-5xl md:leading-[1.15]">
            « Un lieu où le luxe se fait silence, et le temps, une faveur. »
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#8c8475]">
            Condé Nast Traveller
          </p>
        </div>
      </section>

      {/* Réserver */}
      <section id="reserver" className="mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#a8884e]">Réservation</p>
        <h2 style={serif} className="mt-6 text-4xl font-light leading-tight text-[#1c1a16] md:text-6xl">
          Votre séjour commence ici.
        </h2>
        <p className="mx-auto mt-7 max-w-md text-lg font-light leading-relaxed text-[#46413a]">
          Notre conciergerie compose chaque séjour sur mesure. Indiquez vos
          dates, nous nous occupons du reste.
        </p>
        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-4 sm:flex-row">
          <input
            type="text"
            readOnly
            placeholder="Arrivée"
            className="flex-1 border border-[#1c1a16]/20 bg-transparent px-5 py-4 text-sm tracking-wide text-[#1c1a16] placeholder:text-[#1c1a16]/40 focus:border-[#a8884e] focus:outline-none"
          />
          <input
            type="text"
            readOnly
            placeholder="Départ"
            className="flex-1 border border-[#1c1a16]/20 bg-transparent px-5 py-4 text-sm tracking-wide text-[#1c1a16] placeholder:text-[#1c1a16]/40 focus:border-[#a8884e] focus:outline-none"
          />
          <button
            type="button"
            className="bg-[#1c1a16] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[#f6f2ea] transition hover:bg-[#a8884e]"
          >
            Demander
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1c1a16]/12 bg-[#f6f2ea]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p style={serif} className="text-lg tracking-[0.16em] text-[#1c1a16]">MAISON LUMIÈRE</p>
            <p className="mt-3 text-sm font-light text-[#6b6457]">
              12 promenade des Anglais · Nice · Riviera française
            </p>
          </div>
          <div className="text-sm font-light text-[#6b6457]">
            <p>+33 4 00 00 00 00</p>
            <p>contact@maison-lumiere.fr</p>
          </div>
        </div>
        <div className="border-t border-[#1c1a16]/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-[#8c8475] md:flex-row md:items-center md:justify-between md:px-10">
            <span>Démonstration · Marque fictive</span>
            <a href="https://troiestudio.fr" className="transition hover:text-[#a8884e]">
              Site réalisé par TROIE Studio →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
