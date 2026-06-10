import {
  pgTable, pgEnum, text, boolean, json,
  timestamp, varchar
} from "drizzle-orm/pg-core";

// ---- Enums ----
export const roleEnum = pgEnum("role", ["ADMIN", "EDITOR", "VIEWER"]);
export const inquiryStatusEnum = pgEnum("inquiry_status", ["NEW", "IN_PROGRESS", "QUOTED", "WON", "LOST"]);
export const postStatusEnum = pgEnum("post_status", ["DRAFT", "PUBLISHED"]);

// ---- Users ----
export const users = pgTable("users", {
  id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name:      text("name").notNull(),
  email:     text("email").notNull().unique(),
  password:  text("password").notNull(),
  role:      roleEnum("role").notNull().default("VIEWER"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// ---- Categories ----
export const categories = pgTable("categories", {
  id:   text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique()
});

// ---- Products ----
export const products = pgTable("products", {
  id:          text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name:        text("name").notNull(),
  slug:        text("slug").notNull().unique(),
  description: text("description").notNull(),
  features:    json("features").$type<string[]>().notNull().default([]),
  specs:       json("specs").$type<Record<string, string>>().notNull().default({}),
  imageUrl:    text("image_url"),
  published:   boolean("published").notNull().default(true),
  featured:    boolean("featured").notNull().default(false),
  categoryId:  text("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
  createdAt:   timestamp("created_at").notNull().defaultNow()
});

// ---- Inquiries ----
export const inquiries = pgTable("inquiries", {
  id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name:      text("name").notNull(),
  company:   text("company"),
  email:     text("email").notNull(),
  phone:     text("phone"),
  service:   text("service").notNull(),
  message:   text("message").notNull(),
  status:    inquiryStatusEnum("status").notNull().default("NEW"),
  source:    text("source").notNull().default("contact_form"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// ---- Posts ----
export const posts = pgTable("posts", {
  id:          text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title:       text("title").notNull(),
  slug:        text("slug").notNull().unique(),
  category:    text("category").notNull(),
  excerpt:     text("excerpt").notNull(),
  body:        text("body").notNull(),
  coverUrl:    text("cover_url"),
  status:      postStatusEnum("status").notNull().default("DRAFT"),
  publishedAt: timestamp("published_at"),
  createdAt:   timestamp("created_at").notNull().defaultNow()
});

// ---- Projects ----
export const projects = pgTable("projects", {
  id:          text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title:       text("title").notNull(),
  slug:        text("slug").notNull().unique(),
  industry:    text("industry").notNull(),
  client:      text("client").notNull(),
  description: text("description").notNull(),
  results:     json("results").$type<[string, string][]>().notNull().default([]),
  imageUrl:    text("image_url"),
  createdAt:   timestamp("created_at").notNull().defaultNow()
});

// ---- Types ----
export type User     = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product  = typeof products.$inferSelect & { category?: Category };
export type Inquiry  = typeof inquiries.$inferSelect;
export type Post     = typeof posts.$inferSelect;
export type Project  = typeof projects.$inferSelect;
