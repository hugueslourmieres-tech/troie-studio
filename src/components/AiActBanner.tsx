import Link from "next/link";

/**
 * Bandeau annonce AI Act : fond marron, texte défilant en boucle, ponctué
 * d'étoiles IA, qui mène à l'article « contrôlable le 2 août 2026 ».
 *
 * ⚠️ DEUX RENDUS, UN PAR CONTEXTE (29/07/2026).
 *
 * Sur ordinateur, le bandeau entier défile et reste cliquable : le survol met
 * l'animation en pause (`.t-marquee:hover`, globals.css), donc la cible
 * s'immobilise avant qu'on ne clique.
 *
 * Sur mobile, le survol n'existe pas. Le bandeau était donc un lien de 460 px
 * de large en mouvement permanent : on y visait une cible mouvante, ce qui
 * produit des taps ratés et des navigations involontaires. En dessous de
 * `md`, le texte ne défile plus et n'est plus cliquable ; seul le « S'informer »
 * reste un lien, fixe, avec une hauteur tactile de 44 px.
 *
 * `prefers-reduced-motion` neutralise l'animation dans les deux cas.
 */

/*
 * `short` sert au rendu mobile. La phrase longue y était tronquée à
 * « L'AI ACT DEVIENT CONTRÔLABLE LE … », ce qui coupait précisément la date,
 * c'est-à-dire la seule information qui donne son urgence au bandeau. La
 * version courte tient sans points de suspension à côté du lien.
 */
/*
 * Campagne de rentrée 2026 (24/08) : le bandeau porte l'offre « La rentrée
 * qui se prouve » jusqu'à fin décembre. Le message AI Act précédent est
 * conservé ci-dessous en commentaire : un revert suffit à le rétablir.
 * Ancien message : « L'AI Act est contrôlable depuis le 2 août 2026 »
 * (href /fr/blog/ai-act-controlable-2-aout-2026).
 */
const COPY = {
  fr: {
    text: "La rentrée qui se prouve : SEO, visibilité IA, agents, prix publics",
    short: "Offre de rentrée : la preuve, prix publics",
    cta: "Voir l'offre →",
    href: "/fr/rentree",
  },
  en: {
    text: "Back-to-business offer: SEO, AI visibility, agents, public prices",
    short: "Back-to-business offer, public prices",
    cta: "See the offer →",
    href: "/en/rentree",
  },
} as const;

export function AiActBanner({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const items = Array.from({ length: 6 });

  return (
    <div className="bg-[#3d2418]">
      {/* Mobile et petite tablette : fixe, lisible, un seul lien à viser. */}
      {/* Pas de padding vertical : c'est la hauteur tactile du lien (44 px) qui
          fixe celle du bandeau. Avec `py-1.5` en plus, l'en-tête fixe passait
          de 115 à 140 px sur mobile, soit 17 % de l'écran confisqués en
          permanence, l'inverse du but recherché. */}
      <div className="flex items-center justify-center gap-2.5 px-3 md:hidden">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#f5f0e6]">
          {c.short}
        </span>
        <Link
          href={c.href}
          className="inline-flex min-h-[44px] flex-none items-center font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--accent)] underline-offset-4 hover:underline"
        >
          {c.cta}
        </Link>
      </div>

      {/* Ordinateur : le bandeau défilant, cliquable, en pause au survol. */}
      <Link
        href={c.href}
        aria-label={`${c.text} ${c.cta}`}
        className="group hidden overflow-hidden py-2.5 md:block"
      >
        <div className="t-marquee flex w-max">
          {[0, 1].map((half) => (
            <div
              key={half}
              aria-hidden={half === 1 || undefined}
              className="flex w-max shrink-0"
            >
              {items.map((_, i) => (
                <span
                  key={i}
                  className="mr-14 flex items-baseline gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]"
                >
                  <span aria-hidden="true" className="text-[var(--accent)]">✦</span>
                  {c.text}
                  <span aria-hidden="true" className="text-[var(--accent)]/70">✧</span>
                  <span className="text-[var(--accent)] transition group-hover:underline">
                    {c.cta}
                  </span>
                  <span aria-hidden="true" className="ml-1 text-[10px] text-[#f5f0e6]/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
