"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";

/**
 * Nos films (22/10/2026) : la même ligne que les témoignages de Colorloop.
 * Une rangée de cartes qui défile (aperçus animés en noir et blanc, couleur
 * au survol), et un clic ouvre la fiche du film : le film en grand avec le
 * son à gauche, le client, le lieu, ce que l'équipe a fait et le résultat
 * à droite, précédent et suivant en bas. Nos fichiers seulement (22/10 :
 * plus de miniatures ni de lecteur YouTube), lancés directement.
 */

type Story = {
  id: string;
  client: string;
  where?: { fr: string; en: string };
  kind: { fr: string; en: string };
  made: { fr: string; en: string };
  /** Aperçu de la carte : boucle muette. */
  preview: string;
  /** Le film de la fiche, lancé directement (avec le son s'il en a). */
  film: string;
};

const STORIES: Story[] = [
  {
    id: "akita",
    client: "Top Akita Inu",
    kind: { fr: "Interview", en: "Interview" },
    made: { fr: "Interview de Mickaël Bedouet, filmée et montée par l'équipe.", en: "Interview with Mickaël Bedouet, filmed and edited by the team." },
    preview: "/images/videos-local/02.mp4",
    film: "/images/videos-local/akita-interview.mp4",
  },
  {
    id: "exact2",
    client: "X-Rite, eXact 2",
    where: { fr: "Paris", en: "Paris" },
    kind: { fr: "Lancement de produit", en: "Product launch" },
    made: { fr: "Reels courts tournés au lancement de l'eXact 2 à Paris.", en: "Short reels shot at the eXact 2 launch in Paris." },
    preview: "/images/creation/video/exact2.mp4",
    film: "/images/videos-local/05.mp4",
  },
  {
    id: "eshuis",
    client: "Eshuis",
    kind: { fr: "Témoignage client", en: "Customer story" },
    made: {
      fr: "Témoignage filmé en atelier, sous-titré pour les réseaux sociaux.",
      en: "Testimonial filmed in the workshop, subtitled for social media.",
    },
    preview: "/images/videos-local/eshuis-temoignage-loop.mp4",
    film: "/images/videos-local/eshuis-temoignage.mp4",
  },
  {
    id: "unboxing",
    client: "X-Rite, eXact 2",
    kind: { fr: "Unboxing", en: "Unboxing" },
    made: { fr: "Vidéo de déballage de l'eXact 2, pour les réseaux sociaux.", en: "eXact 2 unboxing video, for social media." },
    preview: "/images/videos-local/06.mp4",
    film: "/images/videos-local/06.mp4",
  },
  {
    id: "ferrari",
    client: "Ferrari Auctions",
    kind: { fr: "Reels", en: "Reels" },
    made: { fr: "Reels verticaux pour les réseaux sociaux.", en: "Vertical reels for social media." },
    preview: "/images/creation/video/ferrari.mp4",
    film: "/images/videos-local/04.mp4",
  },
  {
    id: "gs",
    client: "GS Monaco",
    where: { fr: "Monaco", en: "Monaco" },
    kind: { fr: "Vidéo de présentation", en: "Presentation film" },
    made: { fr: "Vidéo de présentation de GS Monaco, tournée sur place.", en: "GS Monaco presentation film, shot on location." },
    preview: "/images/videos-local/01.mp4",
    film: "/images/videos-local/01.mp4",
  },
];

const COPY = {
  fr: {
    title: "Nos films.",
    body: "Interviews, témoignages clients, lancements de produits. Tournés et montés par l'équipe, pensés pour vendre.",
    more: "Tous les films",
    open: "Voir le film",
    made: "Ce que nous avons fait",
    prev: "Précédent",
    next: "Suivant",
    close: "Fermer",
    rail: "Nos films",
  },
  en: {
    title: "Our films.",
    body: "Interviews, customer stories, product launches. Shot and edited by the team, made to sell.",
    more: "All films",
    open: "Watch the film",
    made: "What we did",
    prev: "Previous",
    next: "Next",
    close: "Close",
    rail: "Our films",
  },
} as const;

/** Aperçu de carte : la boucle ne tourne que lorsqu'elle est à l'écran. */
function Preview({ s }: { s: Story }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.3,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const cls =
    "absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0";
  return <video ref={ref} src={s.preview} muted loop playsInline preload="metadata" aria-hidden="true" className={cls} />;
}

export function HomeFilms({ locale }: { locale: string }) {
  const en = locale === "en";
  const L = en ? "en" : "fr";
  const c = COPY[L];
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const show = (i: number, from?: HTMLElement) => {
    if (from) opener.current = from;
    setOpen(i);
    if (!dialog.current?.open) dialog.current?.showModal();
  };
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + STORIES.length) % STORIES.length)), []);

  // Flèches du clavier dans la fiche ; la touche Échap ferme nativement.
  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onClose = () => {
      setOpen(null);
      document.documentElement.style.overflow = "";
      opener.current?.focus({ preventScroll: true });
    };
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [go]);

  useEffect(() => {
    if (open !== null) document.documentElement.style.overflow = "hidden";
  }, [open]);

  const s = open === null ? null : STORIES[open];
  const nextStory = open === null ? null : STORIES[(open + 1) % STORIES.length];

  return (
    <section id="films" className="scroll-mt-24 overflow-hidden border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">{c.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.body}</p>
          </div>
          <a
            href={`/${locale}/medias#video`}
            className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            {c.more}
          </a>
        </div>

        <ul
          data-reveal-stagger
          aria-label={c.rail}
          className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:-ml-12 md:mr-[calc(50%-50vw)] md:scroll-px-12 md:gap-5 md:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {STORIES.map((st, i) => (
            <li key={st.id} className="w-[64%] shrink-0 snap-start sm:w-[38%] lg:w-[23%]">
              <button
                type="button"
                onClick={(e) => show(i, e.currentTarget)}
                className="liquid-sheen group block w-full rounded-2xl border border-[var(--rule)] bg-white text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(17,19,24,0.3)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-t-2xl bg-[var(--bg-2)]">
                  <Preview s={st} />
                </span>
                <span className="block px-5 pb-5 pt-4">
                  <span className="block text-lg font-medium tracking-[-0.01em] text-[var(--fg)]">{st.client}</span>
                  <span className="mt-1 flex items-center justify-between gap-3 text-sm text-[var(--fg-2)]">
                    <span>{st.kind[L]}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-[var(--fg)]">
                      {c.open}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* La fiche du film, comme les histoires clients de Colorloop */}
      <dialog
        ref={dialog}
        aria-label={s?.client}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="film-dialog m-auto w-[min(1120px,calc(100vw-24px))] max-h-[calc(100dvh-24px)] overflow-hidden rounded-2xl bg-white p-0 text-[var(--fg)] backdrop:bg-[#111318]/60 backdrop:backdrop-blur-sm"
      >
        {s && (
          <div className="flex max-h-[calc(100dvh-24px)] flex-col">
            <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[1.15fr_1fr]">
              {/* Le film */}
              <div className="flex items-center justify-center bg-[#111318] p-5 md:p-10">
                <div className="w-full">
                  <video
                    key={s.id}
                    src={s.film}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="mx-auto max-h-[64dvh] w-auto max-w-full rounded-xl"
                  />
                </div>
              </div>

              {/* La fiche */}
              <div className="relative p-6 md:p-10">
                <button
                  type="button"
                  onClick={() => dialog.current?.close()}
                  aria-label={c.close}
                  className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-2)] transition-transform hover:bg-[#e9ebef] active:scale-[0.96]"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-sm text-[var(--fg-2)]">
                  {s.where ? `${s.where[L]}, ${s.kind[L].toLowerCase()}` : s.kind[L]}
                </p>
                <h3 className="t-display mt-3 pr-12 text-4xl text-[var(--fg)] md:text-5xl">{s.client}</h3>
                <div className="mt-8 border-t border-[var(--rule)] pt-6">
                  <p className="text-sm font-medium text-[var(--fg)]">{c.made}</p>
                  <p className="mt-2 text-base leading-relaxed text-[var(--fg-2)]">{s.made[L]}</p>
                </div>
              </div>
            </div>

            {/* Précédent, compteur, suivant */}
            <div className="flex items-center justify-between gap-4 border-t border-[var(--rule)] px-4 py-3 md:px-6">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-[var(--fg-2)] transition-colors hover:text-[var(--fg)]"
              >
                <ArrowLeft className="h-4 w-4" />
                {c.prev}
              </button>
              <span className="font-mono text-sm tabular-nums text-[var(--fg-2)]" aria-live="polite">
                {open! + 1} / {STORIES.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-right text-sm transition-colors"
              >
                <span className="hidden flex-col sm:flex">
                  <span className="text-xs text-[var(--fg-2)]">{c.next}</span>
                  <span className="font-medium text-[var(--fg)]">{nextStory?.client}</span>
                </span>
                <span className="sm:hidden">{c.next}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
