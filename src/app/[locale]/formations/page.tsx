import { permanentRedirect } from "next/navigation";

/**
 * Ancienne vitrine formation (doublon) : redirige definitivement vers
 * le hub unique /formations (plateforme + offres + entreprises).
 * Decision de consolidation du 02/07/2026.
 */
export default function FormationRedirect() {
  permanentRedirect("/formations");
}
