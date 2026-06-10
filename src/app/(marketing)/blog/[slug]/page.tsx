import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [p] = await db.select({ title: posts.title, excerpt: posts.excerpt, coverUrl: posts.coverUrl }).from(posts).where(eq(posts.slug, slug)).limit(1).catch(() => []);
  if (!p) return { title: "Article" };
  return { title: p.title, description: p.excerpt, openGraph: { images: p.coverUrl ? [p.coverUrl] : [] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(and(eq(posts.slug, slug), eq(posts.status, "PUBLISHED"))).limit(1).catch(() => []);
  if (!post) notFound();

  return (
    <article className="py-16">
      <div className="mx-auto max-w-[760px] px-6">
        <span className="font-mono text-[.75rem] uppercase tracking-[.12em] text-accent">{post.category}</span>
        <h1 className="my-3 text-[clamp(2rem,4vw,2.8rem)] text-ink">{post.title}</h1>
        {post.publishedAt && (
          <time className="text-[.85rem] text-muted">{new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</time>
        )}
        {post.coverUrl && (
          <div className="relative my-6 aspect-video overflow-hidden rounded-2xl bg-surface-200">
            <Image src={post.coverUrl} alt={post.title} fill sizes="760px" className="object-cover" priority/>
          </div>
        )}
        <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink-700">
          {post.body.split("\n").filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>
    </article>
  );
}
