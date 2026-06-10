import type { Metadata } from "next";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageHero } from "@/components/ui";
import { ProductCatalog } from "@/components/product-catalog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Products",
  description: "Browse certified PPE and industrial safety equipment. Filter by category, search, and request a quote."
};

export default async function ProductsPage() {
  const rows = await db
    .select({ id: products.id, name: products.name, slug: products.slug, imageUrl: products.imageUrl, categoryName: categories.name })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.published, true))
    .catch(() => []);

  const items = rows.map(r => ({ id: r.id, name: r.name, slug: r.slug, imageUrl: r.imageUrl, category: r.categoryName ?? "" }));
  const cats  = Array.from(new Set(items.map(i => i.category).filter(Boolean)));

  return (
    <>
      <PageHero crumb="Products" title="Product Catalogue"
        subtitle="Browse our full range of certified PPE and industrial safety equipment. Filter by category, search, and request a quote on any item." />
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-6">
          {items.length === 0
            ? <p className="text-muted">No products yet. Run <code className="rounded bg-surface-200 px-1.5 py-0.5">npm run db:seed</code> or add products from the admin dashboard.</p>
            : <ProductCatalog products={items} categories={cats} />}
        </div>
      </section>
    </>
  );
}
