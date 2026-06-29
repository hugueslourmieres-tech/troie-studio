import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maison Lumière · Hôtel & Rooftop, Riviera",
  robots: { index: false, follow: false },
};

const serif = { fontFamily: "var(--demo-display, Georgia, serif)" } as const;
const sans = { fontFamily: "var(--demo-sans, system-ui, sans-serif)" } as const;
const IMG = "/images/demo/maison";

const GALLERY = [
  `${IMG}/pool2.jpg`,
  `${IMG}/dining1.jpg`,
  `${IMG}/room2.jpg`,
  `${IMG}/coast1.jpg`,
  `${IMG}/lobby.jpg`,
  `${IMG}/room1.jpg`,
];

/**
 * DÉMO portfolio TROIE : vitrine hôtellerie / luxe.
 * Marque fictive "Maison Lumière". Photos de banque d'images (Unsplash).
 */
export default function MaisonLumiere() {
  return (
    <div style={sans} className="min-h-screen bg-[#f7f4ee] text-[#22201b] antialiased">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
          <span style={serif} className="text-xl tracking-[0.18em] text-white md:text-2xl">
            MAISON LUMIÈRE
          </span>
          <nav className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.2em] text-white/85 lg:flex">
            <a href="#maison" className="transition hover:text-white">La Maison</a>
            <a href="#sejour" className="transition hover:text-white">Séjour</a>
            <a href="#table" className="transition hover:text-white">La Table</a>
            <a href="#galerie" className="transition hover:text-white">Galerie</a>
          </nav>
          <a
            href="#reserver"
            className="border border-white/60 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-[#22201b]"
          >
            Réserver
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ height: "92vh", minHeight: "600px" }} className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${IMG}/pool1.jpg`}
          alt="Maison Lumière, hôtel et piscine au crépuscule"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/65" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-[11px] uppercase tracking-[0.42em] text-white/80">
            Hôtel & Rooftop · Riviera
          </p>
          <h1 style={serif} className="mt-7 max-w-4xl text-5xl font-light leading-[1.04] md:text-7xl lg:text-[5.25rem]">
            Le luxe, en bord de mer.
          </h1>
          <p className="mt-7 max-w-lg text-base font-light leading-relaxed text-white/85">
            Vingt-quatre chambres, une piscine face à la baie et une table
            étoilée. Le calme absolu, à deux pas de Nice.
          </p>
          <a
            href="#reserver"
            className="mt-10 bg-white px-9 py-4 text-[11px] uppercase tracking-[0.26em] text-[#22201b] transition hover:bg-[#b08d57] hover:text-white"
          >
            Réserver un séjour
          </a>
        </div>
      </section>

      {/* La Maison */}
      <section id="maison" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#b08d57]">La Maison</p>
            <h2 style={serif} className="mt-6 text-4xl font-light leading-tight text-[#22201b] md:text-5xl">
              Un siècle d&apos;élégance, face à la Méditerranée.
            </h2>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-[#544e44]">
              Derrière sa façade Belle Époque, la Maison Lumière cultive un luxe
              discret : pierre claire, lin écru, lumière dorée du Sud. Une seule
              exigence, vous faire oublier le temps.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                ["24", "Chambres"],
                ["1923", "Depuis"],
                ["1", "Étoile"],
                ["7j/7", "Conciergerie"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p style={serif} className="text-4xl font-light text-[#22201b]">{n}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#9a9183]">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/coast1.jpg`} alt="Piscine à débordement sur la baie" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Séjour */}
      <section id="sejour" className="bg-[#efe9df]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#b08d57]">Le Séjour</p>
            <h2 style={serif} className="mt-5 text-3xl font-light text-[#22201b] md:text-5xl">
              Tout est pensé pour le repos.
            </h2>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {[
              { img: `${IMG}/villa.jpg`, k: "Les Suites", t: "Vue mer, terrasses privées et majordome dédié." },
              { img: `${IMG}/spa.jpg`, k: "Le Spa", t: "Soins signature, hammam et piscine intérieure." },
              { img: `${IMG}/bath.jpg`, k: "Le Rooftop", t: "Piscine à débordement et bar au coucher du soleil." },
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
                <h3 style={serif} className="mt-6 text-2xl font-light text-[#22201b]">{c.k}</h3>
                <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-[#6a6356]">{c.t}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* La Table */}
      <section id="table" className="bg-[#181613] text-[#f3ede1]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-0 md:grid-cols-2 md:px-0">
          <div className="order-2 px-0 py-20 md:order-1 md:py-32 md:pl-10 md:pr-16 lg:pl-16">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#c9a86a]">La Table</p>
            <h2 style={serif} className="mt-6 text-4xl font-light leading-tight md:text-6xl">
              Une cuisine de lumière, au coucher du soleil.
            </h2>
            <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-[#cabfac]">
              Sur le rooftop, le chef compose une carte méditerranéenne au
              rythme des saisons et des pêcheurs de la baie. Une étoile, une
              vue, un moment suspendu.
            </p>
            <a
              href="#reserver"
              className="mt-9 inline-block border border-[#c9a86a]/60 px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[#f3ede1] transition hover:bg-[#c9a86a] hover:text-[#181613]"
            >
              Réserver une table
            </a>
          </div>
          <div className="order-1 h-72 w-full overflow-hidden md:order-2 md:h-[640px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/dining2.jpg`} alt="Le rooftop de la Maison Lumière au coucher du soleil" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <h2 style={serif} className="mb-12 text-3xl font-light text-[#22201b] md:text-5xl">
          La Maison en images
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {GALLERY.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden bg-[#ddd5c7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Citation */}
      <section className="bg-[#efe9df]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <p style={serif} className="text-3xl font-light italic leading-snug text-[#22201b] md:text-4xl md:leading-[1.2]">
            « Un lieu où le luxe se fait silence, et le temps, une faveur. »
          </p>
          <p className="mt-7 text-[11px] uppercase tracking-[0.28em] text-[#9a9183]">
            Condé Nast Traveller
          </p>
        </div>
      </section>

      {/* Réserver */}
      <section id="reserver" className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#b08d57]">Réservation</p>
        <h2 style={serif} className="mt-6 text-4xl font-light leading-tight text-[#22201b] md:text-6xl">
          Votre séjour commence ici.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg font-light leading-relaxed text-[#544e44]">
          Indiquez vos dates, notre conciergerie compose le reste sur mesure.
        </p>
        <div className="mx-auto mt-11 flex max-w-xl flex-col gap-4 sm:flex-row">
          <input
            type="text"
            readOnly
            placeholder="Arrivée"
            className="flex-1 border border-[#22201b]/20 bg-transparent px-5 py-4 text-sm tracking-wide text-[#22201b] placeholder:text-[#22201b]/40 focus:border-[#b08d57] focus:outline-none"
          />
          <input
            type="text"
            readOnly
            placeholder="Départ"
            className="flex-1 border border-[#22201b]/20 bg-transparent px-5 py-4 text-sm tracking-wide text-[#22201b] placeholder:text-[#22201b]/40 focus:border-[#b08d57] focus:outline-none"
          />
          <button
            type="button"
            className="bg-[#22201b] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[#f7f4ee] transition hover:bg-[#b08d57]"
          >
            Demander
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#22201b]/12 bg-[#f7f4ee]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p style={serif} className="text-lg tracking-[0.18em] text-[#22201b]">MAISON LUMIÈRE</p>
            <p className="mt-3 text-sm font-light text-[#6a6356]">
              12 promenade des Anglais · Nice · Riviera française
            </p>
          </div>
          <div className="text-sm font-light text-[#6a6356]">
            <p>+33 4 00 00 00 00</p>
            <p>contact@maison-lumiere.fr</p>
          </div>
        </div>
        <div className="border-t border-[#22201b]/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-[#9a9183] md:flex-row md:items-center md:justify-between md:px-10">
            <span>Démonstration · Marque fictive · Images Unsplash</span>
            <a href="https://troiestudio.fr" className="transition hover:text-[#b08d57]">
              Site réalisé par TROIE Studio →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
