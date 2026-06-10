import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { inquirySchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const limited = rateLimit(`inquiry:${ip}`, 5, 60_000);
  if (!limited.ok) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  let json: unknown;
  try { json = await req.json(); } catch { return NextResponse.json({ error: "Invalid body." }, { status: 400 }); }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 400 });

  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { name, company, email, phone, service, message } = parsed.data;
  const [row] = await db.insert(inquiries).values({ name, company: company || null, email, phone: phone || null, service, message }).returning({ id: inquiries.id });
  return NextResponse.json({ ok: true, id: row?.id }, { status: 201 });
}
