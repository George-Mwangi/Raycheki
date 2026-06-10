import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [row] = await db.select({ name: products.name, description: products.description }).from(products).where(eq(products.slug, slug)).limit(1).catch(() => []);
  if (!row) return { title: "Product" };
  return { title: row.name, description: row.description.slice(0, 155) };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [row] = await db
    .select({ p: products, catName: categories.name })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1)
    .catch(() => []);

  if (!row) notFound();
  const product = row.p;
  const catName = row.catName ?? "";
  const specs   = (product.specs ?? {}) as Record<string, string>;

  return (
    <section className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        name: product.name, description: product.description, category: catName, image: product.imageUrl ?? undefined
      })}} />
      <div className="mx-auto max-w-wrap px-6">
        <Link href="/products" className="font-mono text-[.75rem] uppercase tracking-[.12em] text-muted">← Back to catalogue</Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface-200">
            {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover"/>}
          </div>
          <div>
            <span className="eyebrow mb-3">{catName}</span>
            <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] text-ink">{product.name}</h1>
            <p className="mt-4 text-muted">{product.description}</p>
            <div className="my-6 grid grid-cols-2 gap-2.5">
              {Object.entries(specs).map(([k, v]) => (
                <div key={k} className="rounded-lg bg-surface-muted px-3.5 py-3 text-[.85rem]"><b className="text-ink">{k}:</b> {v}</div>
              ))}
            </div>
            <h3 className="mb-2 text-[1.1rem]">Key Features</h3>
            <ul className="space-y-1.5 text-[.95rem] text-ink-700">
              {(product.features as string[]).map(f => (
                <li key={f} className="relative pl-6 before:absolute before:left-0 before:text-orange before:content-['✓']">{f}</li>
              ))}
            </ul>
            <div className="mt-8"><Button href={`/contact?product=${encodeURIComponent(product.name)}`}>Inquire About This Product →</Button></div>
          </div>
        </div>
      </div>
    </section>
  );
}
