/**
 * Le scanner en une ligne (26/10/2026, demande de Hugues : proposer le score
 * GEO un peu partout). Un simple formulaire GET vers /audit-seo-gratuit :
 * `?site=` y lance l'audit tout seul. Aucun JavaScript, donc utilisable
 * dans un composant serveur. Placé dans l'appel de fin de page (ContactCTA,
 * une vingtaine de pages) et à la fin de chaque article du blog.
 */
export function ScanInline({ locale, tone = "light", className = "" }: { locale: string; tone?: "light" | "dark"; className?: string }) {
  const en = locale === "en";
  const dark = tone === "dark";
  return (
    <form action={`/${en ? "en" : "fr"}/audit-seo-gratuit`} method="get" className={className}>
      <label htmlFor={`scan-inline-${tone}`} className={`block text-sm font-medium ${dark ? "text-white/80" : "text-[var(--fg-2)]"}`}>
        {en ? "Is your site visible on ChatGPT? Free score in a few seconds." : "Votre site est-il visible sur ChatGPT ? Score gratuit en quelques secondes."}
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id={`scan-inline-${tone}`}
          name="site"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          required
          placeholder={en ? "your-site.com" : "votre-site.fr"}
          className={`h-12 min-w-0 flex-1 rounded-full border px-5 text-[16px] outline-none transition-colors ${
            dark
              ? "border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:border-white"
              : "border-[var(--rule-strong)] bg-white text-[var(--fg)] placeholder:text-[var(--fg-2)]/60 focus:border-[var(--accent)]"
          }`}
        />
        <button
          type="submit"
          className={`inline-flex h-12 shrink-0 items-center justify-center rounded-full px-6 text-[15px] font-medium transition-transform duration-200 active:scale-[0.98] ${
            dark ? "border border-white/50 text-white hover:border-white" : "bg-[var(--ink)] text-white"
          }`}
        >
          {en ? "See my score" : "Voir mon score"}
        </button>
      </div>
    </form>
  );
}
