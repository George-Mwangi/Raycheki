import Link from "next/link";
import { company } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 pt-16 pb-7 text-[#9aa3b0]">
      <div className="mx-auto max-w-wrap px-6">
        <div className="mb-12 grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 font-display text-[1.4rem] font-black text-white">RAYCHEKI</div>
            <p className="max-w-[300px] text-[.92rem]">
              Protecting people and securing workplaces with certified industrial safety
              equipment, training and consultancy.
            </p>
          </div>
          <FooterCol title="Company" links={[["About Us", "/about"], ["Projects", "/projects"], ["Blog", "/blog"], ["Contact", "/contact"]]} />
          <FooterCol title="Solutions" links={[["PPE & Equipment", "/products"], ["Consultancy", "/services"], ["Training", "/services"], ["Audits", "/services"]]} />
          <FooterCol title="Get Started" links={[["Request a Quote", "/contact"], ["Book a Consultation", "/contact"], ["Admin Login", "/admin/login"]]} />
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[.85rem]">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <span className="font-mono uppercase tracking-[.14em] text-[#7c8696]">ISO 45001 · OSHA Aligned · CE Certified</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4 font-display text-[.95rem] text-white">{title}</h4>
      {links.map(([label, href]) => (
        <Link key={label + href} href={href} className="block py-1.5 text-[.92rem] transition hover:text-orange">
          {label}
        </Link>
      ))}
    </div>
  );
}
