import { notFound } from "next/navigation";

/**
 * Adresse inconnue sous /fr ou /en (9/10/2026) : sans cette route, Next
 * servait sa page 404 par défaut, en anglais, sans en-tête ni navigation.
 * notFound() affiche src/app/[locale]/not-found.tsx, dans la mise en page
 * du site.
 */
export default function CatchAll() {
  notFound();
}
