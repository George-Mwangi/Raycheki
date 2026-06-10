"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-wrap items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-[42px] w-[42px] place-items-center rounded-[9px] bg-ink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z" fill="#FF6B00" />
              <path d="M9 12l2 2 4-4" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-[1.3rem] font-black leading-none text-ink">
            RAYCHEKI
            <span className="block font-mono text-[.56rem] font-medium uppercase tracking-[.18em] text-orange">
              Industrial Safety
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-md px-3.5 py-2 text-[.93rem] font-semibold transition hover:bg-surface-muted hover:text-orange ${
                isActive(n.href) ? "text-orange" : "text-ink-700"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-lg bg-orange px-5 py-2.5 font-display text-[.92rem] font-bold text-white transition hover:bg-orange-dark sm:inline-flex"
          >
            Request a Quote
          </Link>
          <button
            aria-label="Toggle menu"
            className="flex flex-col gap-[5px] p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-4 py-3 lg:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-4 py-3 font-semibold ${
                isActive(n.href) ? "text-orange" : "text-ink-700"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-orange px-4 py-3 text-center font-display font-bold text-white"
          >
            Request a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
