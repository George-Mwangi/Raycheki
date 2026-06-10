import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote, ask about a product, or book a consultation with Raycheki's safety experts."
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;

  const rows: [string, string, string][] = [
    ["Phone", company.phone, "phone"],
    ["Email", `${company.email} · ${company.salesEmail}`, "mail"],
    ["Address", company.address, "pin"],
    ["Hours", company.hours, "clock"]
  ];

  return (
    <>
      <PageHero crumb="Contact" title="Get in Touch"
        subtitle="Request a quote, ask about a product, or book a consultation. We typically respond within 24 hours." />
      <section className="py-16">
        <div className="mx-auto grid max-w-wrap gap-10 px-6 lg:grid-cols-2">
          <div>
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-start gap-4 border-b border-line py-4">
                <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[10px] bg-surface-muted text-orange">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
                </span>
                <div><b className="font-display">{label}</b><small className="block text-muted">{value}</small></div>
              </div>
            ))}
            <div className="mt-6 h-[240px] overflow-hidden rounded-2xl border border-line">
              <iframe title="Location map" src={company.mapEmbed} className="h-full w-full border-0" loading="lazy" />
            </div>
          </div>
          <ContactForm defaultService={product} />
        </div>
      </section>
    </>
  );
}
