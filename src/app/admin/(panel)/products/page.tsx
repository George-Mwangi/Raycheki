import Image from "next/image";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { createProduct, deleteProduct, toggleFeatured } from "./actions";

export const dynamic = "force-dynamic";
const field = "w-full rounded-lg border border-line px-3 py-2 text-[.9rem] outline-none focus:border-orange";

export default async function AdminProducts() {
  const rows = await db.select({ p: products, catName: categories.name })
    .from(products).leftJoin(categories, eq(products.categoryId, categories.id)).orderBy(desc(products.createdAt));

  return (
    <div>
      <h1 className="mb-1 font-display text-[1.8rem] font-black text-ink">Products</h1>
      <p className="mb-8 text-muted">{rows.length} products in the catalogue.</p>
      <div className="mb-8 rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-4 font-display text-[1.15rem] font-bold">Add Product</h2>
        <form action={createProduct} className="grid gap-3 sm:grid-cols-2">
          <input name="name" placeholder="Product name *" required className={field}/>
          <input name="category" placeholder="Category *" required className={field}/>
          <input name="imageUrl" placeholder="Image URL (https://…)" className={`${field} sm:col-span-2`}/>
          <textarea name="description" placeholder="Description" rows={2} className={`${field} sm:col-span-2`}/>
          <textarea name="features" placeholder="Features (one per line)" rows={3} className={`${field} sm:col-span-2`}/>
          <label className="flex items-center gap-2 text-[.9rem]"><input type="checkbox" name="featured"/> Feature on homepage</label>
          <div className="sm:col-span-2"><button className="rounded-lg bg-orange px-5 py-2.5 font-display font-bold text-white hover:bg-orange-dark">Add Product</button></div>
        </form>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[640px] text-left text-[.9rem]">
          <thead className="border-b border-line bg-surface-muted font-mono text-[.7rem] uppercase tracking-[.1em] text-muted">
            <tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Featured</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(({p, catName}) => (
              <tr key={p.id}>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><span className="relative h-10 w-10 overflow-hidden rounded-md bg-surface-200">{p.imageUrl&&<Image src={p.imageUrl} alt={p.name} fill sizes="40px" className="object-cover"/>}</span><b className="font-display">{p.name}</b></div></td>
                <td className="px-4 py-3">{catName??""}</td>
                <td className="px-4 py-3">
                  <form action={toggleFeatured}><input type="hidden" name="id" value={p.id}/><input type="hidden" name="featured" value={String(p.featured)}/><button className={`rounded-full px-3 py-1 text-[.75rem] font-semibold ${p.featured?"bg-orange text-white":"bg-surface-muted text-muted"}`}>{p.featured?"Featured":"No"}</button></form>
                </td>
                <td className="px-4 py-3 text-right"><form action={deleteProduct}><input type="hidden" name="id" value={p.id}/><button className="text-[.82rem] font-semibold text-red-600 hover:underline">Delete</button></form></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
