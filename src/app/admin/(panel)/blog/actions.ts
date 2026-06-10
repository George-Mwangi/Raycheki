"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { slugify } from "@/lib/data";

async function guard() { const s = await auth(); if (!s?.user) throw new Error("Unauthorized"); }

export async function createPost(formData: FormData) {
  await guard();
  const title   = String(formData.get("title")||"").trim();
  if (!title) return;
  const publish = formData.get("publish") === "on";
  await db.insert(posts).values({
    title,
    slug:        `${slugify(title)}-${Date.now()}`,
    category:    String(formData.get("category")||"Workplace Safety"),
    excerpt:     String(formData.get("excerpt")||"").slice(0, 400),
    body:        String(formData.get("body")||""),
    coverUrl:    String(formData.get("coverUrl")||"")||null,
    status:      publish ? "PUBLISHED" : "DRAFT",
    publishedAt: publish ? new Date() : null
  });
  revalidatePath("/admin/blog"); revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function togglePublish(formData: FormData) {
  await guard();
  const id       = String(formData.get("id"));
  const current  = String(formData.get("status"));
  const pub      = current !== "PUBLISHED";
  await db.update(posts).set({ status: pub ? "PUBLISHED" : "DRAFT", publishedAt: pub ? new Date() : null }).where(eq(posts.id, id));
  revalidatePath("/admin/blog"); revalidatePath("/blog");
}

export async function deletePost(formData: FormData) {
  await guard();
  await db.delete(posts).where(eq(posts.id, String(formData.get("id"))));
  revalidatePath("/admin/blog"); revalidatePath("/blog");
}
