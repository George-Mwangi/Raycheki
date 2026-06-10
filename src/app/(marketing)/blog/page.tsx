import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Safety Insights", description: "Guides, regulations and best practice on workplace safety, PPE, fire safety and risk management." };

export default async function BlogPage() {
  const rows = await db.select().from(posts).where(eq(posts.status, "PUBLISHED")).orderBy(desc(posts.publishedAt)).catch(() => []);
  return (
    <>
      <PageHero crumb="Blog" title="Safety Insights" subtitle="Guides, regulations and best practice from our safety experts." />
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-6">
          {rows.length === 0
            ? <p className="text-muted">No posts yet. Run <code className="rounded bg-surface-200 px-1.5 py-0.5">npm run db:seed</code> or publish from the admin dashboard.</p>
            : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rows.map(p => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-[14px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-200">
                      {p.coverUrl && <Image src={p.coverUrl} alt={p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition group-hover:scale-105"/>}
                    </div>
                    <div className="p-5">
                      <span className="font-mono text-[.72rem] uppercase tracking-[.12em] text-accent">{p.category}</span>
                      <h3 className="my-2 text-[1.12rem]">{p.title}</h3>
                      <p className="text-[.9rem] text-muted">{p.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
        </div>
      </section>
    </>
  );
}
