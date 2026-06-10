import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

function cell(v: unknown) { return `"${String(v??'').replace(/"/g,'""')}"`; }

export async function GET() {
  const session = await auth();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  const header = ["Name","Company","Email","Phone","Service","Message","Status","Date"];
  const body   = rows.map(r => [r.name,r.company,r.email,r.phone,r.service,r.message,r.status,r.createdAt.toISOString()].map(cell).join(","));
  const csv    = [header.join(","), ...body].join("\n");
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="raycheki-leads-${new Date().toISOString().slice(0,10)}.csv"` }
  });
}
