import type { Metadata } from "next";
import { PageHero, Button } from "@/components/ui";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Safety consultancy, risk assessments, compliance audits, and accredited training programmes."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumb="Services" title="Safety Services & Consultancy"
        subtitle="From risk assessments to certified training, our consultants help you build a safer, fully compliant workplace." />
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {services.map(([title, desc, items]) => (
              <div key={title} className="rounded-[14px] border border-line border-l-4 border-l-orange bg-white p-7 transition hover:-translate-y-1 hover:shadow-card">
                <h3 className="mb-2.5 text-[1.3rem]">{title}</h3>
                <p className="text-muted">{desc}</p>
                <ul className="mt-3.5 space-y-1.5">
                  {items.map((i) => (
                    <li key={i} className="relative pl-6 text-[.95rem] text-ink-700 before:absolute before:left-0 before:font-bold before:text-orange before:content-['✓']">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface-muted py-16">
        <div className="mx-auto max-w-wrap px-6">
          <div className="relative overflow-hidden rounded-[20px] bg-ink p-10 text-center text-white md:p-14">
            <h2 className="text-[clamp(1.8rem,3.6vw,2.5rem)] text-white">Need a compliance review?</h2>
            <p className="mx-auto my-4 max-w-[480px] text-[#C7CDD6]">Book a site safety audit with a certified Raycheki consultant.</p>
            <div className="flex justify-center"><Button href="/contact">Book an Audit</Button></div>
          </div>
        </div>
      </section>
    </>
  );
}
