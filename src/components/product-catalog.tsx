"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Item = { id: string; name: string; slug: string; imageUrl: string | null; category: string };

export function ProductCatalog({ products, categories }: { products: Item[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        (active === "All" || p.category === active) &&
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
  }, [products, active, query]);

  const chips = ["All", ...categories];

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-line bg-white px-3.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full border-0 py-3 text-[.95rem] outline-none"
            aria-label="Search products"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-[.85rem] font-semibold transition ${
                active === c ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-orange hover:text-orange"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="group overflow-hidden rounded-[14px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-square overflow-hidden bg-surface-200">
                <span className="absolute left-2.5 top-2.5 z-10 rounded bg-ink px-2 py-1 font-mono text-[.62rem] uppercase tracking-[.1em] text-white">{p.category}</span>
                {p.imageUrl && <Image src={p.imageUrl} alt={p.name} fill sizes="260px" className="object-cover transition group-hover:scale-105" />}
              </div>
              <div className="p-4">
                <h4 className="text-[1rem]">{p.name}</h4>
                <small className="text-[.82rem] text-muted">View details →</small>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
