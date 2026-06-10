# Raycheki Industrial Safety Solutions

Production-ready marketing site + admin dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **PostgreSQL**, and **Auth.js v5**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + @fontsource |
| Database | PostgreSQL via Prisma ORM |
| Auth | Auth.js v5 (NextAuth) — credentials + JWT |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
src/
  app/
    (marketing)/          # Public site — Home, Products, Services, Projects, About, Blog, Contact
    admin/
      (panel)/            # Guarded admin — Dashboard, Inquiries, Products, Blog
      login/              # Login page (no auth guard)
    api/
      auth/[...nextauth]/ # Auth.js route handler
      inquiries/          # POST — lead capture (rate-limited + validated)
    sitemap.ts            # Auto-generated /sitemap.xml
    robots.ts             # Auto-generated /robots.txt
  components/             # SiteHeader, SiteFooter, WhatsApp, ContactForm, ProductCatalog, UI
  lib/                    # prisma.ts · data.ts · validators.ts · rate-limit.ts
  auth.ts                 # Full Auth.js config (credentials + JWT callbacks)
  auth.config.ts          # Edge-safe config (used by middleware)
  middleware.ts           # Protects /admin/* routes
prisma/
  schema.prisma           # DB models: User, Product, Category, Inquiry, Post, Project
  seed.ts                 # Seeds categories, products, blog posts, projects, admin user
```

---

## Quick Start (Local Development)

### Prerequisites
- **Node.js 20 LTS** or newer — https://nodejs.org
- **Git** — https://git-scm.com
- A **PostgreSQL database** — easiest free option: https://neon.tech (no local install needed)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/George-Mwangi/Raycheki.git
cd Raycheki
```

---

### Step 2 — Install dependencies

```bash
npm install
```

This also runs `prisma generate` automatically via the `postinstall` script.

---

### Step 3 — Create your environment file

```bash
cp .env.example .env
```

Open `.env` and fill in every variable:

```env
# Get this from Neon, Supabase, Railway, or your own PostgreSQL server
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/raycheki?sslmode=require"

# Generate with: openssl rand -base64 32
AUTH_SECRET="paste-your-generated-secret-here"

# Used for SEO metadata and the sitemap
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# The admin account the seed script will create
SEED_ADMIN_EMAIL="admin@raycheki.com"
SEED_ADMIN_PASSWORD="ChangeMe123!"
```

> **Getting a free PostgreSQL database on Neon:**
> 1. Go to https://neon.tech and sign up for free.
> 2. Create a new project → copy the **Connection string**.
> 3. Paste it as `DATABASE_URL` in your `.env`.

---

### Step 4 — Push the database schema

```bash
npx prisma db push
```

This creates all tables in your database. You should see confirmation for each model.

---

### Step 5 — Seed the database

```bash
npm run db:seed
```

This creates:
- All 10 product categories and 10 products with Unsplash images
- 6 published blog articles
- 4 completed projects
- 2 sample inquiries
- Your admin user (email + password from `.env`)

---

### Step 6 — Run the development server

```bash
npm run dev
```

Open **http://localhost:3000** — the full site is live.

| URL | Description |
|---|---|
| http://localhost:3000 | Public home page |
| http://localhost:3000/products | Product catalogue |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:3000/admin | Dashboard (after login) |
| http://localhost:3000/admin/inquiries | Lead management + CSV export |
| http://localhost:3000/admin/products | Product CRUD |
| http://localhost:3000/admin/blog | Blog CRUD |

Log in with the email and password you set in `.env` (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

---

## Deploying to Production on Vercel

### Step 1 — Push your code to GitHub

If this is the first time pushing:

```bash
# Inside the project folder
git init                          # skip if already a git repo
git remote add origin https://github.com/George-Mwangi/Raycheki.git
git add .
git commit -m "Initial production build"
git branch -M main
git push -u origin main
```

If the repo already exists and you're adding this code:

```bash
git add .
git commit -m "Initial production build"
git push
```

---

### Step 2 — Import the project on Vercel

1. Go to https://vercel.com and log in (sign up with GitHub if new).
2. Click **Add New → Project**.
3. Under **Import Git Repository**, find `George-Mwangi/Raycheki` and click **Import**.
4. Framework Preset: **Next.js** (auto-detected).
5. Do **not** click Deploy yet — add environment variables first.

---

### Step 3 — Add environment variables on Vercel

In the **Environment Variables** section of the import screen, add:

| Key | Value |
|---|---|
| `DATABASE_URL` | Your Neon/Supabase/PostgreSQL connection string |
| `AUTH_SECRET` | The 32-byte base64 secret (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (or your Vercel `.vercel.app` URL) |
| `SEED_ADMIN_EMAIL` | Your admin login email |
| `SEED_ADMIN_PASSWORD` | Your admin login password |

> Add these for **Production**, **Preview**, and **Development** environments.

---

### Step 4 — Deploy

Click **Deploy**. Vercel will:
1. Run `npm install` (which runs `prisma generate` via postinstall).
2. Run `prisma generate && next build`.
3. Deploy to a global CDN.

The first deploy takes ~2 minutes. You get a URL like `raycheki.vercel.app`.

---

### Step 5 — Run database migration on Vercel

After the first successful deploy, run the migration against your production database:

```bash
# Locally, pointing at your production DATABASE_URL
DATABASE_URL="your-production-connection-string" npx prisma migrate deploy
```

Or if you used `prisma db push` locally and your dev and prod databases are the same: skip this step.

---

### Step 6 — Seed the production database

```bash
DATABASE_URL="your-production-connection-string" npm run db:seed
```

This populates products, blog posts, projects, and your admin account in production.

---

### Step 7 — Connect a custom domain (optional)

1. In Vercel → your project → **Settings → Domains**.
2. Add `raycheki.com` (or whichever domain you own).
3. Follow Vercel's DNS instructions (usually add an A or CNAME record at your registrar).
4. HTTPS is automatic.
5. Update `NEXT_PUBLIC_SITE_URL` to your real domain and redeploy.

---

## Updating the site

Every `git push` to `main` triggers an automatic Vercel redeploy. No manual steps needed.

---

## Replacing Placeholder Content

Open `src/lib/data.ts` — everything is clearly labelled:

| Field | What to replace |
|---|---|
| `company.phone` | Your real phone number |
| `company.email` / `company.salesEmail` | Your real email addresses |
| `company.address` | Your real physical address |
| `company.whatsapp` | Your WhatsApp number (digits only, international format) |
| `company.mapEmbed` | OpenStreetMap embed URL for your location |
| `team[]` | Real team member names and roles |
| `testimonials[]` | Real client testimonials |

Commit and push — Vercel redeploys automatically.

---

## Admin Panel

| Action | How |
|---|---|
| Add products | Admin → Products → fill the form |
| Feature on homepage | Toggle the "Featured" button on any product |
| Write an article | Admin → Blog → fill the form, tick "Publish immediately" |
| View leads | Admin → Inquiries |
| Change lead status | Select from the dropdown in the Inquiries table, click Save |
| Export all leads | Admin → Inquiries → **Export CSV** button |

---

## Security Notes

- All `/admin/*` routes are protected by Auth.js middleware — unauthenticated requests are redirected to `/admin/login`.
- The lead API (`/api/inquiries`) has per-IP rate limiting (5 requests/minute) and Zod input validation.
- A hidden honeypot field silently drops bot submissions.
- Security headers (X-Frame-Options, HSTS, X-Content-Type-Options, etc.) are set globally in `next.config.mjs`.
- Prisma parameterises all queries — no SQL injection surface.
- Change `SEED_ADMIN_PASSWORD` to a strong password before seeding production.
