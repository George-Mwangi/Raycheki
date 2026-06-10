import * as dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { users, categories, products, posts, projects, inquiries } from "./schema";
import {
  seedCategories, seedProducts, seedPosts,
  seedProjects, slugify
} from "../lib/data";

const conn = postgres(process.env.DATABASE_URL!, { max: 1, ssl: "require" });
const db   = drizzle(conn);

async function main() {
  // --- Admin user ---
  const email    = (process.env.SEED_ADMIN_EMAIL    || "admin@raycheki.com").toLowerCase();
  const password =  process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const hash     = await bcrypt.hash(password, 12);

  await db.insert(users).values({ name: "Site Admin", email, password: hash, role: "ADMIN" })
    .onConflictDoNothing({ target: users.email });
  console.log(`Admin ready: ${email}`);

  // --- Categories ---
  const catRows = seedCategories.map(name => ({ name, slug: slugify(name) }));
  await db.insert(categories).values(catRows).onConflictDoNothing({ target: categories.slug });

  const allCats = await db.select().from(categories);
  const catMap  = new Map(allCats.map(c => [c.name, c.id]));

  // --- Products ---
  for (const p of seedProducts) {
    const catId = catMap.get(p.category);
    if (!catId) { console.warn(`Category not found: ${p.category}`); continue; }
    await db.insert(products).values({
      name:        p.name,
      slug:        slugify(p.name),
      description: `Certified ${p.name.toLowerCase()} engineered for industrial environments, meeting ISO and CE standards with full traceability and batch documentation.`,
      features:    ["Fully compliance-tested", "Durable, ergonomic design", "Bulk & volume pricing available", "Backed by 12-month warranty"],
      specs:       { Certification: "ISO / CE", Material: "Industrial-grade", Sizes: "S – XXL", Warranty: "12 months" },
      imageUrl:    p.image,
      featured:    p.featured,
      published:   true,
      categoryId:  catId
    }).onConflictDoNothing({ target: products.slug });
  }

  // --- Posts ---
  for (const post of seedPosts) {
    await db.insert(posts).values({
      title:       post.title,
      slug:        slugify(post.title),
      category:    post.category,
      excerpt:     post.excerpt,
      body:        `${post.excerpt}\n\nThis is placeholder article content. Replace it from the admin dashboard with your full, SEO-optimised article.`,
      coverUrl:    post.cover,
      status:      "PUBLISHED",
      publishedAt: new Date()
    }).onConflictDoNothing({ target: posts.slug });
  }

  // --- Projects ---
  for (const pr of seedProjects) {
    await db.insert(projects).values({
      title:       pr.title,
      slug:        slugify(pr.title),
      industry:    pr.industry,
      client:      pr.client,
      description: pr.description,
      results:     pr.results as [string, string][],
      imageUrl:    pr.image
    }).onConflictDoNothing({ target: projects.slug });
  }

  // --- Sample inquiries ---
  const existing = await db.select({ id: inquiries.id }).from(inquiries).limit(1);
  if (existing.length === 0) {
    await db.insert(inquiries).values([
      { name: "Jane Wanjiru",  company: "BuildCo",     email: "jane@buildco.example",  phone: "+254711111111", service: "PPE & Equipment Supply", message: "Need 200 helmets and hi-vis vests for a new site.", status: "NEW" },
      { name: "Tom Otieno",    company: "Apex Mining", email: "tom@apex.example",       phone: "+254722222222", service: "Safety Training",          message: "Requesting a quote for emergency response training.", status: "IN_PROGRESS" }
    ]);
  }

  console.log("✓ Seed complete.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => conn.end());
