import { NextResponse } from "next/server";
import { buildRegistrePdf } from "@/lib/outils/pdf-registre";

/** GET /api/outils/registre : le registre des usages de l'IA, modèle vierge en PDF. */

export const runtime = "nodejs";

export async function GET() {
  const bytes = await buildRegistrePdf();
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="registre-usages-ia-troie-studio.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
