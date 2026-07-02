import { readFile } from "fs/promises";
import path from "path";

/**
 * Contenu écrit des modules : fichiers markdown dans /content,
 * rédigés en amont (source des futures vidéos NotebookLM).
 *
 * Clé `${courseSlug}/${moduleSlug}` → chemin relatif dans /content.
 */
const CONTENT_FILES: Record<string, string> = {
  "module-0/theorie-llm": "cours-01/module-0.md",
  "cours-01/patterns-prompts": "cours-01/module-1.md",
  "cours-01/system-prompts": "cours-01/module-2.md",
  "cours-01/cas-usage-solo": "cours-01/module-3.md",
  "cours-01/limites-securite": "cours-01/module-4.md",
  "cours-02/make-zapier": "cours-02/module-5.md",
  "cours-02/agents-persistants": "cours-02/module-6.md",
  "cours-02/pipeline-lead-mail": "cours-02/module-7.md",
  "cours-02/mcps-strategiques": "cours-02/module-8.md",
  "cours-02/workflows-business": "cours-02/module-9.md",
  "cours-02/production-monitoring": "cours-02/module-10.md",
};

/**
 * Lit le markdown d'un module (sans le H1, déjà affiché par la page).
 * Renvoie null si aucun contenu n'est mappé.
 */
export async function getModuleContent(
  courseSlug: string,
  moduleSlug: string,
): Promise<string | null> {
  const rel = CONTENT_FILES[`${courseSlug}/${moduleSlug}`];
  if (!rel) return null;

  try {
    const raw = await readFile(
      path.join(process.cwd(), "content", rel),
      "utf8",
    );
    // Nettoyage pour affichage élève :
    // - titre H1 (doublon avec le h1 de la page) ;
    // - mention de production interne (durée vidéo NotebookLM cible) ;
    // - section finale "Variables NotebookLM" (consignes de génération
    //   vidéo, réservées à la production, conservées dans le fichier).
    return raw
      .replace(/^# .*\n/, "")
      .replace(/ ?· ?\*\*Durée vidéo NotebookLM cible\*\*[^\n]*/i, "")
      .replace(/\n## Variables NotebookLM[\s\S]*$/i, "")
      .replace(/\n---\s*$/, "")
      .trimStart();
  } catch {
    return null;
  }
}
