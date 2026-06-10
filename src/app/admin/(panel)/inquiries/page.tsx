import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { updateInquiryStatus } from "./actions";

export const dynamic = "force-dynamic";
const STATUSES = ["NEW","IN_PROGRESS","QUOTED","WON","LOST"];

export default async function InquiriesPage() {
  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-display text-[1.8rem] font-black text-ink">Inquiries</h1><p className="text-muted">{rows.length} total leads.</p></div>
        <a href="/admin/inquiries/export" className="rounded-lg bg-ink px-4 py-2.5 text-[.9rem] font-semibold text-white hover:bg-ink-900">Export CSV</a>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[760px] text-left text-[.9rem]">
          <thead className="border-b border-line bg-surface-muted font-mono text-[.7rem] uppercase tracking-[.1em] text-muted">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Service</th><th className="px-4 py-3">Message</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(i => (
              <tr key={i.id} className="align-top">
                <td className="px-4 py-3"><b className="font-display">{i.name}</b><div className="text-[.8rem] text-muted">{i.company||"—"}</div></td>
                <td className="px-4 py-3"><div>{i.email}</div><div className="text-[.8rem] text-muted">{i.phone||"—"}</div></td>
                <td className="px-4 py-3">{i.service}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-muted">{i.message}</td>
                <td className="px-4 py-3 text-muted">{new Date(i.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <form action={updateInquiryStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={i.id}/>
                    <select name="status" defaultValue={i.status} className="rounded-md border border-line px-2 py-1 text-[.8rem]">{STATUSES.map(s=><option key={s} value={s}>{s}</option>)}</select>
                    <button className="rounded-md bg-orange px-2.5 py-1 text-[.78rem] font-semibold text-white">Save</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
