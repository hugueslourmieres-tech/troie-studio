import { NextResponse } from "next/server";
import { runAudit, summarize } from "@/lib/audit/engine";
import {
  clientIp,
  createRateLimiter,
  normalizeTarget,
  originAllowed,
} from "@/lib/audit/guards";
import type { StreamEvent } from "@/lib/audit/types";

/**
 * POST /api/scan-ia
 *
 * L'audit SEO et GEO gratuit de /audit-seo-gratuit (26/10/2026), successeur
 * du scan IA du 17/08/2026. Reçoit { url, locale }, lit la page d'accueil,
 * robots.txt, llms.txt et le sitemap, et répond en flux NDJSON : une ligne
 * par étape réellement terminée ({ type: "phase" }), puis le résumé
 * ({ type: "result" }) ou une erreur ({ type: "error" }). La page coche les
 * étapes au rythme du vrai scan, sans faux délai.
 *
 * Le résumé ne contient ni les explications ni les correctifs : ils sont
 * envoyés par /api/scan-ia/report, contre l'e-mail du visiteur.
 *
 * PÉRIMÈTRE HONNÊTE : lisibilité par les moteurs, jamais une promesse de
 * citation par ChatGPT (voir src/lib/audit/engine.ts).
 *
 * Anti-abus (src/lib/audit/guards.ts) : Origin, 10 scans par heure et par
 * IP, garde SSRF, 1,5 Mo et 8 s par ressource.
 */

export const runtime = "nodejs";
export const maxDuration = 30;

const rateLimited = createRateLimiter(10, 60 * 60 * 1000);

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, error: "origin" }, { status: 400 });
  }
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let body: { url?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "body" }, { status: 400 });
  }
  const target = normalizeTarget(String(body.url ?? ""));
  if (!target) {
    return NextResponse.json({ ok: false, error: "url" }, { status: 422 });
  }
  const en = body.locale === "en";

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (e: StreamEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        const out = await runAudit(target, { en, onPhase: (id) => send({ type: "phase", id }) });
        if ("error" in out) send({ type: "error", error: out.error, status: out.status });
        else send({ type: "result", summary: summarize(out) });
      } catch (err) {
        console.error("Audit SEO : échec du scan", err);
        send({ type: "error", error: "failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
