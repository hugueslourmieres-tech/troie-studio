"use client";

import { useState, type FormEvent } from "react";

/**
 * Formulaire du générateur de charte. Aucun compte, aucune adresse email
 * demandée : le PDF est produit côté serveur (/api/outils/charte) puis
 * téléchargé directement, le nom du fichier vient de l'en-tête.
 */

const OUTILS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Microsoft Copilot",
  "Mistral, Le Chat",
  "Perplexity",
  "Notion AI",
  "Canva IA",
  "GitHub Copilot",
  "Make ou n8n",
];

const NIVEAUX = [
  { id: "souple", t: "Souple", d: "Vous ouvrez l'usage et posez des garde-fous simples." },
  { id: "standard", t: "Standard", d: "L'équilibre conseillé : cadre clair, usage encouragé." },
  { id: "strict", t: "Strict", d: "Données sensibles ou secteur régulé : validation écrite avant tout." },
] as const;

const LABEL = "text-sm font-medium text-[var(--fg)]";
const HINT = "font-normal text-[var(--fg-2)]";
const FIELD =
  "mt-2 h-12 w-full rounded-xl border border-[var(--rule-strong)] bg-white px-4 text-[16px] text-[var(--fg)] caret-[var(--accent)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--fg-mute)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-soft)]";

export function CharteForm() {
  const [organisation, setOrganisation] = useState("");
  const [activite, setActivite] = useState("");
  const [referent, setReferent] = useState("");
  const [contact, setContact] = useState("");
  const [niveau, setNiveau] = useState<string>("standard");
  const [outils, setOutils] = useState<string[]>(["ChatGPT", "Claude"]);
  const [autre, setAutre] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const toggle = (o: string) =>
    setOutils((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!organisation.trim()) {
      setError("Indiquez le nom de votre organisation : il figure sur la charte.");
      return;
    }
    setBusy(true);
    setError("");
    setDone(false);
    try {
      const liste = [
        ...outils,
        ...autre
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      ];
      const res = await fetch("/api/outils/charte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organisation, activite, referent, contact, niveau, outils: liste }),
      });
      if (!res.ok) throw new Error("generation");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const match = /filename="([^"]+)"/.exec(res.headers.get("Content-Disposition") ?? "");
      a.download = match?.[1] ?? "charte-ia.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDone(true);
    } catch {
      setError("La génération n'a pas abouti. Vérifiez votre connexion et réessayez.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-10" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="organisation" className={LABEL}>
            Votre organisation
          </label>
          <input
            id="organisation"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            placeholder="Le nom qui figurera sur la charte"
            className={FIELD}
            maxLength={90}
            autoComplete="organization"
            aria-invalid={!!error && !organisation.trim()}
            required
          />
        </div>
        <div>
          <label htmlFor="activite" className={LABEL}>
            Activité <span className={HINT}>(facultatif)</span>
          </label>
          <input
            id="activite"
            value={activite}
            onChange={(e) => setActivite(e.target.value)}
            placeholder="Cabinet comptable, agence immobilière, industrie..."
            className={FIELD}
            maxLength={120}
          />
        </div>
      </div>

      <fieldset>
        <legend className={LABEL}>Les outils que vous autorisez</legend>
        <p className="mt-1 text-sm text-[var(--fg-2)]">
          Ils sont nommés dans la règle 2. La charte prévoit la procédure pour en ajouter.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {OUTILS.map((o) => {
            const on = outils.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                aria-pressed={on}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  on
                    ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                    : "border-[var(--rule-strong)] bg-white text-[var(--fg-2)] hover:border-[var(--ink)] hover:text-[var(--fg)]"
                }`}
              >
                {on && (
                  <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3">
                    <path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {o}
              </button>
            );
          })}
        </div>
        <label htmlFor="autre" className="sr-only">
          Autres outils
        </label>
        <input
          id="autre"
          value={autre}
          onChange={(e) => setAutre(e.target.value)}
          placeholder="Un autre outil ? Séparez par des virgules"
          className={`${FIELD} mt-4`}
          maxLength={200}
        />
      </fieldset>

      <fieldset>
        <legend className={LABEL}>Le niveau d&apos;exigence</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {NIVEAUX.map((n) => {
            const on = niveau === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setNiveau(n.id)}
                aria-pressed={on}
                className={`rounded-2xl border p-5 text-left transition-[border-color,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  on
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--rule-strong)] bg-white hover:border-[var(--ink)]"
                }`}
              >
                <span className="block text-[16px] font-medium text-[var(--fg)]">{n.t}</span>
                <span className="mt-1.5 block text-sm leading-snug text-[var(--fg-2)]">{n.d}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="referent" className={LABEL}>
            Référent IA <span className={HINT}>(facultatif)</span>
          </label>
          <input
            id="referent"
            value={referent}
            onChange={(e) => setReferent(e.target.value)}
            placeholder="Un nom, pas un service"
            className={FIELD}
            maxLength={80}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="contact" className={LABEL}>
            Adresse de signalement <span className={HINT}>(facultatif)</span>
          </label>
          <input
            id="contact"
            type="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="ia@votre-entreprise.fr"
            className={FIELD}
            maxLength={90}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-[#fdf1ef] px-4 py-3 text-[15px] text-[#8a2a1b]">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-4 border-t border-[var(--rule)] pt-8 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={busy}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          {busy ? "Génération en cours..." : "Générer ma charte en PDF"}
          {!busy && (
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          )}
        </button>
        <p aria-live="polite" className="text-[15px] text-[var(--fg-2)]">
          {done ? "Charte téléchargée. Signez-la, diffusez-la, rangez-la avec le registre." : "Rien n'est enregistré sur nos serveurs."}
        </p>
      </div>
    </form>
  );
}
