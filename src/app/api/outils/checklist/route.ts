import { NextResponse } from "next/server";
import { buildChecklistPdf } from "@/lib/outils/pdf-checklist";

/** GET /api/outils/checklist : la checklist AI Act PME en 7 étapes, en PDF à cocher. */

export const runtime = "nodejs";

export async function GET() {
  const bytes = await buildChecklistPdf();
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="checklist-ai-act-troie-studio.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
