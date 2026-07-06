/**
 * OfficialEmblems : petit bloc discret (République française + Union
 * européenne) pour signaler une source officielle. Posé sur une pastille
 * blanche pour rester lisible sur fond clair comme sur fond sombre.
 */
export function OfficialEmblems({
  url,
  className = "",
}: {
  url?: string;
  className?: string;
}) {
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/gov/republique-francaise.svg"
        alt="République française"
        className="h-7 w-auto"
      />
      <span aria-hidden="true" className="h-6 w-px bg-black/10" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/gov/union-europeenne.png"
        alt="Union européenne"
        className="h-[17px] w-auto rounded-[1px] ring-1 ring-black/5"
      />
    </>
  );
  const cls = `inline-flex items-center gap-3 rounded-sm bg-white px-3.5 py-2 ring-1 ring-black/10 ${className}`;

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Texte officiel du règlement sur l'IA (République française, Union européenne)"
      className={`${cls} transition hover:ring-black/25`}
    >
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}
