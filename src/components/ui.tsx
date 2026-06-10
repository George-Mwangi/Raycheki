import Link from "next/link";
import { ReactNode } from "react";

export function PageHero({ crumb, title, subtitle }: { crumb: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_400px_at_85%_20%,rgba(37,99,235,.22),transparent_60%)]" />
      <div className="relative mx-auto max-w-wrap px-6">
        <div className="mb-3 font-mono text-[.72rem] uppercase tracking-[.14em] text-[#7c8696]">
          Home / <span className="text-orange">{crumb}</span>
        </div>
        <h1 className="text-[clamp(2.1rem,4.5vw,3.4rem)] text-white">{title}</h1>
        {subtitle && <p className="mt-3 max-w-[620px] text-[1.1rem] text-[#C7CDD6]">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-[680px] ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow mb-4">{eyebrow}</span>
      <h2 className="text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold text-ink">{title}</h2>
      {sub && <p className="mt-4 text-[1.08rem] text-muted">{sub}</p>}
    </div>
  );
}

export function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "dark" | "ghost" | "outline" }) {
  const styles: Record<string, string> = {
    primary: "bg-orange text-white hover:bg-orange-dark",
    dark: "bg-ink text-white hover:bg-ink-900",
    ghost: "border-2 border-white/40 text-white hover:border-white hover:bg-white/10",
    outline: "border-2 border-line bg-white text-ink hover:border-orange hover:text-orange"
  };
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-lg px-6 py-3.5 font-display text-[.95rem] font-bold transition ${styles[variant]}`}>
      {children}
    </Link>
  );
}
