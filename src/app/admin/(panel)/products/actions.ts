"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { slugify } from "@/lib/data";

async function guard() { const s = await auth(); if (!s?.user) throw new Error("Unauthorized"); }

export async function createProduct(formData: FormData) {
  await guard();
  const name     = String(formData.get("name")||"").trim();
  const catName  = String(formData.get("category")||"").trim();
  const imageUrl = String(formData.get("imageUrl")||"").trim() || null;
  const desc     = String(formData.get("description")||`Certified ${name}.`);
  const feats    = String(formData.get("features")||"").split("\n").map(s=>s.trim()).filter(Boolean);
  const featured = formData.get("featured") === "on";
  if (!name || !catName) return;

  const slug = slugify(name) + "-" + Date.now();
  const [cat] = await db.insert(categories).values({ name: catName, slug: slugify(catName) })
    .onConflictDoUpdate({ target: categories.slug, set: { name: catName } }).returning();

  await db.insert(products).values({ name, slug, description: desc, features: feats, specs: {}, imageUrl, featured, published: true, categoryId: cat!.id });
  revalidatePath("/admin/products"); revalidatePath("/products");
}

export async function deleteProduct(formData: FormData) {
  await guard();
  await db.delete(products).where(eq(products.id, String(formData.get("id"))));
  revalidatePath("/admin/products"); revalidatePath("/products");
}

export async function toggleFeatured(formData: FormData) {
  await guard();
  const id      = String(formData.get("id"));
  const current = formData.get("featured") === "true";
  await db.update(products).set({ featured: !current }).where(eq(products.id, id));
  revalidatePath("/admin/products");
}
