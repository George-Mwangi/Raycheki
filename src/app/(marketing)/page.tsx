import Image from "next/image";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Button, SectionHead } from "@/components/ui";
import { whyChoose, industries, testimonials } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await db.select({ id: products.id, name: products.name, slug: products.slug, imageUrl: products.imageUrl })
    .from(products).where(and(eq(products.published, true), eq(products.featured, true))).limit(10).catch(() => []);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="hero-grid absolute inset-0 opacity-[.07]" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_500px_at_78%_10%,rgba(37,99,235,.25),transparent_60%),radial-gradient(700px_600px_at_10%_90%,rgba(255,107,0,.18),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-wrap items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div className="animate-fade-up">
            <span className="eyebrow mb-4">ISO 45001 · OSHA Aligned · Certified</span>
            <h1 className="text-[clamp(2.6rem,5.4vw,4.4rem)] font-black text-white">Protecting People.<br /><span className="text-orange">Securing Workplaces.</span></h1>
            <p className="my-6 max-w-[560px] text-[1.18rem] text-[#C7CDD6]">World-class industrial safety equipment, training, and workplace safety solutions trusted across manufacturing, construction, oil &amp; gas, and government sectors.</p>
            <div className="flex flex-wrap gap-3.5">
              <Button href="/contact">Request a Quote →</Button>
              <Button href="/products" variant="ghost">Explore Products</Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              {[["2,400+","Sites Protected"],["18 yrs","Industry Experience"],["99.8%","Compliance Rate"]].map(([n,l])=>(
                <div key={l}><span className="block font-display text-[2rem] font-black text-white">{n}</span><span className="font-mono text-[.66rem] uppercase tracking-[.14em] text-[#9aa3b0]">{l}</span></div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[18px] bg-ink-900 shadow-card">
            <Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=70" alt="Industrial workers wearing PPE on site" fill priority sizes="(max-width:1024px) 100vw, 45vw" className="object-cover opacity-90"/>
            <div className="absolute inset-0 [background:linear-gradient(180deg,transparent_40%,rgba(15,22,32,.55))]"/>
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/80 px-4 py-3 backdrop-blur">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z" stroke="#fff" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div><b className="block font-display text-[.95rem] text-white">Certified Protection</b><small className="text-[#9aa3b0]">Every product compliance-tested</small></div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-ink-900 py-5 text-white">
        <div className="mx-auto flex max-w-wrap flex-wrap items-center justify-center gap-8 px-6">
          <span className="font-mono text-[.72rem] uppercase tracking-[.14em] text-[#7c8696]">Trusted by industry leaders</span>
          {["NorthBridge","PetroGulf","Apex Mining","BuildCo","MediCare Group","StateWorks"].map(b=><span key={b} className="font-display text-[1.05rem] font-bold text-white/80">{b}</span>)}
        </div>
      </div>

      <section className="py-20">
        <div className="mx-auto max-w-wrap px-6">
          <SectionHead center eyebrow="Why Raycheki" title="The safety partner that never compromises" sub="Six reasons leading organisations rely on Raycheki to keep their people safe and their operations compliant." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map(([title,body])=>(
              <div key={title} className="group relative overflow-hidden rounded-[14px] border border-line bg-white p-7 transition hover:-translate-y-1 hover:shadow-card before:absolute before:left-0 before:top-0 before:h-1 before:w-0 before:bg-orange before:transition-all before:duration-300 hover:before:w-full">
                <div className="mb-5 grid h-[54px] w-[54px] place-items-center rounded-xl bg-surface-muted text-orange"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg></div>
                <h3 className="mb-2.5 text-[1.18rem]">{title}</h3><p className="text-[.96rem] text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-wrap px-6">
          <SectionHead eyebrow="Product Range" title="Certified equipment, head to toe" sub="A complete catalogue of PPE and industrial safety gear — certified and ready for fast delivery." />
          {featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {featured.map(p=>(
                <a key={p.id} href={`/products/${p.slug}`} className="group overflow-hidden rounded-[14px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card">
                  <div className="relative aspect-square overflow-hidden bg-surface-200">{p.imageUrl&&<Image src={p.imageUrl} alt={p.name} fill sizes="200px" className="object-cover transition group-hover:scale-105"/>}</div>
                  <div className="p-4"><h4 className="text-[1rem]">{p.name}</h4><small className="text-[.82rem] text-muted">View details →</small></div>
                </a>
              ))}
            </div>
          ) : <p className="text-muted">Run <code className="rounded bg-surface-200 px-1.5 py-0.5">npm run db:seed</code> to load products.</p>}
          <div className="mt-8"><Button href="/products" variant="dark">View Full Catalogue →</Button></div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-wrap px-6">
          <SectionHead eyebrow="Industries We Serve" title="Safety solutions for every environment" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(([name,tag,img])=>(
              <div key={name} className="relative flex min-h-[230px] items-end overflow-hidden rounded-[14px] bg-ink p-6 text-white">
                <Image src={img} alt={name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover opacity-60"/>
                <div className="absolute inset-0 [background:linear-gradient(180deg,transparent_30%,rgba(15,22,32,.92))]"/>
                <div className="relative"><div className="font-mono text-[.72rem] uppercase tracking-[.14em] text-orange">{tag}</div><h3 className="text-[1.3rem] text-white">{name}</h3></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-wrap px-6">
          <SectionHead center eyebrow="Client Stories" title="Trusted on the ground, every day" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map(([quote,name,role,initials])=>(
              <div key={name} className="rounded-[14px] border border-line bg-white p-7">
                <div className="text-orange">★★★★★</div>
                <p className="my-4 text-ink-700">{quote}</p>
                <div className="flex items-center gap-3">
                  <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-ink font-display font-bold text-white">{initials}</span>
                  <div><b className="block font-display">{name}</b><small className="text-muted">{role}</small></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-wrap px-6">
          <div className="relative overflow-hidden rounded-[20px] bg-ink p-10 text-center text-white md:p-16">
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(600px_300px_at_80%_0,rgba(255,107,0,.22),transparent_60%)]"/>
            <h2 className="relative text-[clamp(1.9rem,4vw,2.8rem)] text-white">Ready to Improve Workplace Safety?</h2>
            <p className="relative mx-auto my-4 max-w-[520px] text-[#C7CDD6]">Get a tailored safety assessment and equipment quote from our certified consultants — usually within 24 hours.</p>
            <div className="relative flex justify-center gap-3.5"><Button href="/contact">Get Quote</Button><Button href="/contact" variant="ghost">Contact Us</Button></div>
          </div>
        </div>
      </section>
    </>
  );
}
