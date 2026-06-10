import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { createPost, togglePublish, deletePost } from "./actions";

export const dynamic = "force-dynamic";
const CATS = ["Workplace Safety","PPE Guides","Safety Regulations","Fire Safety","Risk Management"];
const field = "w-full rounded-lg border border-line px-3 py-2 text-[.9rem] outline-none focus:border-orange";

export default async function AdminBlog() {
  const rows = await db.select().from(posts).orderBy(desc(posts.createdAt));
  const published = rows.filter(p => p.status === "PUBLISHED").length;

  return (
    <div>
      <h1 className="mb-1 font-display text-[1.8rem] font-black text-ink">Blog</h1>
      <p className="mb-8 text-muted">{rows.length} articles · {published} published.</p>
      <div className="mb-8 rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-4 font-display text-[1.15rem] font-bold">New Article</h2>
        <form action={createPost} className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="title" placeholder="Article title *" required className={field}/>
            <select name="category" className={field}>{CATS.map(c=><option key={c}>{c}</option>)}</select>
          </div>
          <input name="coverUrl" placeholder="Cover image URL (https://…)" className={field}/>
          <textarea name="excerpt" placeholder="Short excerpt (shown on blog listing)" rows={2} className={field}/>
          <textarea name="body" placeholder="Full article body…" rows={8} className={field}/>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[.9rem]"><input type="checkbox" name="publish"/> Publish immediately</label>
            <button className="rounded-lg bg-orange px-5 py-2.5 font-display font-bold text-white hover:bg-orange-dark">Save Article</button>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[600px] text-left text-[.9rem]">
          <thead className="border-b border-line bg-surface-muted font-mono text-[.7rem] uppercase tracking-[.1em] text-muted">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(p=>(
              <tr key={p.id}>
                <td className="px-4 py-3 font-display font-semibold">{p.title}</td>
                <td className="px-4 py-3 text-muted">{p.category}</td>
                <td className="px-4 py-3">
                  <form action={togglePublish}><input type="hidden" name="id" value={p.id}/><input type="hidden" name="status" value={p.status}/>
                    <button className={`rounded-full px-3 py-1 text-[.75rem] font-semibold ${p.status==="PUBLISHED"?"bg-green-100 text-green-700":"bg-surface-muted text-muted"}`}>{p.status==="PUBLISHED"?"Published":"Draft"}</button>
                  </form>
                </td>
                <td className="px-4 py-3 text-muted">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right"><form action={deletePost}><input type="hidden" name="id" value={p.id}/><button className="text-[.82rem] font-semibold text-red-600 hover:underline">Delete</button></form></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
