import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Projects", description: "Completed industrial safety projects across oil & gas, construction, mining and healthcare." };

export default async function ProjectsPage() {
  const rows = await db.select().from(projects).catch(() => []);
  return (
    <>
      <PageHero crumb="Projects" title="Completed Projects" subtitle="Real outcomes from safety programmes delivered across multiple industries." />
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-6">
          {rows.length === 0
            ? <p className="text-muted">No projects yet. Run <code className="rounded bg-surface-200 px-1.5 py-0.5">npm run db:seed</code>.</p>
            : (
              <div className="grid gap-6 md:grid-cols-2">
                {rows.map(p => {
                  const results = (p.results as [string, string][]) ?? [];
                  return (
                    <article key={p.id} className="overflow-hidden rounded-[14px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-card">
                      <div className="relative aspect-video overflow-hidden bg-surface-200">
                        {p.imageUrl && <Image src={p.imageUrl} alt={p.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover"/>}
                      </div>
                      <div className="p-7">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="rounded-md bg-surface-muted px-2.5 py-1 text-[.74rem] font-semibold text-ink-700">{p.industry}</span>
                          <span className="rounded-md bg-surface-muted px-2.5 py-1 text-[.74rem] font-semibold text-ink-700">{p.client}</span>
                        </div>
                        <h3 className="mb-2 text-[1.25rem]">{p.title}</h3>
                        <p className="text-[.95rem] text-muted">{p.description}</p>
                        <div className="mt-4 flex gap-6 border-t border-dashed border-line pt-4">
                          {results.map(([v, l]) => (
                            <div key={l}><span className="block font-display text-[1.5rem] font-black text-orange">{v}</span><small className="text-[.74rem] text-muted">{l}</small></div>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
        </div>
      </section>
    </>
  );
}
