import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

const links = [
  ["/admin", "Dashboard"],
  ["/admin/inquiries", "Inquiries"],
  ["/admin/products", "Products"],
  ["/admin/blog", "Blog"]
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // Login page renders its own tree; if unauthenticated here, middleware already
  // redirects protected routes. This is a defensive server-side guard.
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <aside className="hidden w-60 flex-col border-r border-line bg-ink-900 p-5 text-white md:flex">
        <Link href="/admin" className="mb-8 font-display text-[1.2rem] font-black text-white">
          RAYCHEKI<span className="block font-mono text-[.55rem] uppercase tracking-[.18em] text-orange">Admin</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-lg px-3.5 py-2.5 text-[.92rem] font-semibold text-[#9aa3b0] transition hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <Link href="/" className="block px-3.5 py-2 text-[.85rem] text-[#7c8696] hover:text-white">← View site</Link>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
            <button className="mt-1 w-full rounded-lg bg-white/10 px-3.5 py-2.5 text-left text-[.9rem] font-semibold text-white hover:bg-white/20">Sign out</button>
          </form>
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-line bg-white px-6 py-4 md:hidden">
          <span className="font-display font-black">RAYCHEKI Admin</span>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
            <button className="text-[.85rem] font-semibold text-orange">Sign out</button>
          </form>
        </header>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
