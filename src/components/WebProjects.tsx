import Image from "next/image";

/**
 * Réalisations web, partagées par l'accueil et /creation/web. Fenêtre
 * navigateur (vidéo en boucle ou capture) + téléphone aux vraies proportions.
 */
export const PROJECTS: Project[] = [
  {
    name: "Bien en règle",
    kind: "Web app : la conformité des locations de vacances, ville par ville",
    href: "https://bienenregle.com",
    url: "bienenregle.com",
    label: "bienenregle.com",
    desktop: "/images/creation/web/bienenregle-desktop.jpg",
    mobile: "/images/creation/web/bienenregle-mobile.jpg",
    mobileRatio: "600 / 1300",
    featured: true,
  },
  {
    name: "LOIR Paris",
    kind: "E-commerce, mode : boutique en ligne Shopify",
    href: "https://loirparis.fr",
    url: "loirparis.fr",
    label: "loirparis.fr",
    desktop: "/images/creation/web/loirparis-desktop.jpg",
    mobile: "/images/creation/web/loirparis-mobile.jpg",
    mobileRatio: "600 / 1154",
    featured: true,
  },
  {
    name: "Rutherford",
    kind: "Site web & plateforme SaaS",
    href: "https://rutherford.fr",
    url: "rutherford.fr",
    label: "rutherford.fr",
    desktop: "/images/creation/web/rutherford-desktop.jpg",
    mobile: "/images/creation/web/rutherford-mobile.jpg",
    mobileRatio: "600 / 1300",
  },
  {
    name: "Top Akita Inu",
    kind: "Site vitrine et réservation en ligne, élevage canin",
    href: "https://www.top-akita-inu.com",
    url: "top-akita-inu.com",
    label: "top-akita-inu.com",
    desktop: "/images/creation/web/topakita-desktop.jpg",
    mobile: "/images/creation/web/topakita-mobile.jpg",
    mobileRatio: "600 / 1300",
  },
  {
    name: "Capefront Energies",
    kind: "Site web corporate, énergie",
    href: "https://capefront-site.vercel.app/fr",
    url: "capefront-site.vercel.app",
    label: "capefront-site.vercel.app",
    desktop: "/images/creation/web/capefront-desktop.jpg",
    mobile: "/images/creation/web/capefront-mobile.jpg",
    mobileRatio: "600 / 1300",
  },
  {
    name: "PerPost",
    kind: "Site web & application",
    href: "https://perpost-web.vercel.app",
    url: "perpost-web.vercel.app",
    label: "perpost-web.vercel.app",
    desktop: "/images/creation/web/perpost-desktop.jpg",
    mobile: "/images/creation/web/perpost-mobile.jpg",
    mobileRatio: "600 / 1300",
  },
  {
    name: "Color Guesser",
    kind: "Jeu web en 7 langues, 466 défis de couleurs",
    href: "https://playcolorguesser.com",
    url: "playcolorguesser.com",
    label: "playcolorguesser.com",
    desktop: "/images/creation/web/colorguesser-desktop.jpg",
    video: "/videos/creation/web/colorguesser.mp4",
    mobile: "/images/creation/web/colorguesser-mobile.jpg",
    mobileRatio: "600 / 1301",
  },
  {
    name: "Bilber",
    kind: "Jeu web quotidien : la course au code-barres",
    href: "https://bilber.app",
    url: "bilber.app",
    label: "bilber.app",
    desktop: "/images/creation/web/bilber-desktop.jpg",
    video: "/videos/creation/web/bilber.mp4",
    mobile: "/images/creation/web/bilber-mobile.jpg",
    mobileRatio: "600 / 1301",
  },
];

export type Project = {
  name: string;
  kind: string;
  href: string;
  url: string;
  label: string;
  desktop: string;
  mobile: string;
  /** Aperçu video du hero (lit en boucle, fallback sur l'image desktop). */
  video?: string;
  /** Proportions réelles de la capture mobile (largeur / hauteur) : rien n'est rogné. */
  mobileRatio: string;
  /** Mis en avant en pleine largeur en haut de page. */
  featured?: boolean;
};

/** Carte projet : fenêtre navigateur desktop + fenêtre mobile en superposition. */
export function ProjectCard({ p }: { p: Project }) {
  const big = !!p.featured;
  return (
    <li className={big ? "lg:col-span-2" : undefined}>
      <a href={p.href} target="_blank" rel="noreferrer" className="group block">
        {/* Desktop : fenêtre navigateur (le téléphone se superpose dessus) */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--bg-2)] shadow-[0_30px_70px_-34px_rgba(26,23,20,0.42)] transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 border-b border-[var(--rule)] bg-[var(--bg)] px-4 py-2.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="mx-auto flex h-5 w-1/2 max-w-[210px] items-center justify-center rounded-full bg-[var(--bg-2)] font-mono text-[9px] tracking-[0.08em] text-[var(--fg-2)]/55">
                {p.url}
              </span>
            </div>
            <div
              className="relative w-full overflow-hidden bg-white"
              style={{ aspectRatio: "16 / 10" }}
            >
              {p.video ? (
                <video
                  className="absolute inset-0 block h-full w-full object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  poster={p.desktop}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={big ? "auto" : "metadata"}
                  aria-label={`${p.name}, aperçu animé`}
                >
                  <source src={p.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={p.desktop}
                  alt={`${p.name}, aperçu desktop`}
                  fill
                  sizes={big ? "(max-width: 1024px) 100vw, 1200px" : "(max-width: 1024px) 100vw, 50vw"}
                  className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
              )}
            </div>
          </div>

          {/* Mobile : la page mobile en superposition (sans cadre), centrée */}
          <div className={`absolute -bottom-9 right-6 sm:right-10 transition-transform duration-500 group-hover:-translate-y-1 ${big ? "w-[24%] min-w-[88px] max-w-[250px]" : "w-[26%] min-w-[88px] max-w-[178px]"}`}>
            <div className="overflow-hidden rounded-[1.4rem] bg-[var(--bg-2)] shadow-[0_28px_62px_-18px_rgba(26,23,20,0.5)] ring-1 ring-[#111318]/10">
              <div className="border-b border-[var(--rule)] bg-[var(--bg)] px-2.5 py-2">
                <div className="mx-auto flex max-w-[150px] items-center justify-center gap-1.5 rounded-full bg-[var(--bg-2)] px-3 py-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-[var(--fg-2)]/45">
                    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
                    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                  </svg>
                  <span className="truncate font-mono text-[8px] tracking-[0.08em] text-[var(--fg-2)]/55">{p.url}</span>
                </div>
              </div>
              <div
                className="relative w-full overflow-hidden bg-white"
                style={{ aspectRatio: p.mobileRatio }}
              >
                <Image
                  src={p.mobile}
                  alt={`${p.name}, aperçu mobile`}
                  fill
                  sizes={big ? "250px" : "178px"}
                  className="object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>

        <h3 className={`t-display mt-16 text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] ${big ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {p.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--fg-2)]">{p.kind}</p>
        <span className="mt-3 inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
          {p.label}
          <span aria-hidden="true" className="transition group-hover:translate-x-1">↗</span>
        </span>
      </a>
    </li>
  );
}

