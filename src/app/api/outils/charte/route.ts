import { NextResponse, type NextRequest } from "next/server";
import { CHARTE_NIVEAUX, buildChartePdf, type CharteNiveau } from "@/lib/outils/pdf-charte";

/**
 * POST /api/outils/charte : la charte d'usage de l'IA personnalisée, en PDF.
 *
 * Outil gratuit et sans compte, porté depuis troie.app le 23/10/2026. Les
 * entrées sont bornées (longueurs coupées, douze outils au plus, niveau
 * validé). Rien n'est stocké.
 */

export const runtime = "nodejs";

const MAX = { org: 90, activite: 120, referent: 80, contact: 90, outil: 60 };

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const organisation = str(body.organisation, MAX.org);
  if (!organisation) {
    return NextResponse.json({ error: "organisation_requise" }, { status: 400 });
  }

  const niveauRaw = str(body.niveau, 12) as CharteNiveau;
  const niveau: CharteNiveau = CHARTE_NIVEAUX.includes(niveauRaw) ? niveauRaw : "standard";

  const outils = Array.isArray(body.outils)
    ? body.outils.map((o) => str(o, MAX.outil)).filter(Boolean).slice(0, 12)
    : [];

  const pdf = await buildChartePdf({
    organisation,
    activite: str(body.activite, MAX.activite),
    outils,
    referent: str(body.referent, MAX.referent),
    contact: str(body.contact, MAX.contact),
    niveau,
  });

  /* Nom de fichier en ASCII strict : les accents cassent certains clients. */
  const slug =
    organisation
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase()
      .slice(0, 40) || "organisation";

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="charte-ia-${slug}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
