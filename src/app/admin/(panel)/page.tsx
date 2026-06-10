import Link from "next/link";
import { db } from "@/db";
import { inquiries, products, posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { count } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [[totalLeads], [newLeads], [totalProducts], [totalPosts], recent] = await Promise.all([
    db.select({ value: count() }).from(inquiries),
    db.select({ value: count() }).from(inquiries).where(eq(inquiries.status, "NEW")),
    db.select({ value: count() }).from(products),
    db.select({ value: count() }).from(posts),
    db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(6)
  ]);

  const stats = [
    ["Total Leads",  totalLeads?.value  ?? 0],
    ["New Leads",    newLeads?.value    ?? 0],
    ["Products",     totalProducts?.value ?? 0],
    ["Blog Posts",   totalPosts?.value  ?? 0]
  ] as const;

  return (
    <div>
      <h1 className="mb-1 font-display text-[1.8rem] font-black text-ink">Dashboard</h1>
      <p className="mb-8 text-muted">Overview of leads, catalogue and content.</p>
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-6">
            <div className="font-display text-[2.4rem] font-black text-ink">{value}</div>
            <div className="font-mono text-[.72rem] uppercase tracking-[.12em] text-muted">{label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-line bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[1.2rem] font-bold">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-[.85rem] font-semibold text-orange">View all →</Link>
        </div>
        {recent.length === 0 ? <p className="text-muted">No inquiries yet.</p> : (
          <div className="divide-y divide-line">
            {recent.map(i => (
              <div key={i.id} className="flex items-center justify-between py-3">
                <div><b className="font-display">{i.name}</b><span className="text-muted"> · {i.service}</span><div className="text-[.82rem] text-muted">{i.email}</div></div>
                <span className="rounded-full bg-surface-muted px-3 py-1 text-[.72rem] font-semibold">{i.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
