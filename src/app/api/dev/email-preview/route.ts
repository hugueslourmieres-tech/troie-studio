import { NextResponse, type NextRequest } from "next/server";
import {
  renderLifecycleEmail,
  type LifecycleEmailType,
} from "@/lib/emails/lifecycle";

/**
 * Prévisualisation des emails de cycle de vie, en dev uniquement :
 * /api/dev/email-preview?type=welcome|trial_j2|trial_j5|inactive_j3|inactive_j14
 */

const TYPES: LifecycleEmailType[] = [
  "welcome",
  "trial_j2",
  "trial_j5",
  "inactive_j3",
  "inactive_j14",
];

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const type = (request.nextUrl.searchParams.get("type") ??
    "welcome") as LifecycleEmailType;
  if (!TYPES.includes(type)) {
    return NextResponse.json(
      { error: "unknown_type", types: TYPES },
      { status: 400 },
    );
  }
  const { subject, html } = renderLifecycleEmail(type);
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"/><title>${subject}</title></head><body style="margin:0;">${html}</body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
