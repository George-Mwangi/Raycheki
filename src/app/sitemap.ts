import type { MetadataRoute } from "next";
import { db } from "@/db";
import { products, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/products", "/services", "/projects", "/about", "/blog", "/contact"].map(p => ({
    url: `${base}${p}`, lastModified: new Date(),
    changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7
  }));

  let dynamic: MetadataRoute.Sitemap = [];
  try {
    const [prods, psts] = await Promise.all([
      db.select({ slug: products.slug }).from(products).where(eq(products.published, true)),
      db.select({ slug: posts.slug }).from(posts).where(eq(posts.status, "PUBLISHED"))
    ]);
    dynamic = [
      ...prods.map(p => ({ url: `${base}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
      ...psts.map(p => ({ url: `${base}/blog/${p.slug}`,     changeFrequency: "monthly" as const, priority: 0.5 }))
    ];
  } catch { /* DB unavailable at build time */ }

  return [...staticRoutes, ...dynamic];
}
