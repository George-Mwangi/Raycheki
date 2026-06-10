import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui";
import { values, team, certs } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Raycheki Industrial Safety Solutions — eighteen years of certified equipment, consultancy and training."
};

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" title="About Raycheki" subtitle="Founded on a single principle: that every worker deserves to go home safe." />

      <section className="py-16">
        <div className="mx-auto grid max-w-wrap items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="eyebrow mb-4">Our Story</span>
            <h2 className="mb-4 text-[2.2rem]">Eighteen years of keeping people safe</h2>
            <p className="mb-3.5 text-muted">Raycheki Industrial Safety Solutions began in 2007 as a small PPE supplier and has grown into a full-spectrum safety partner serving corporate and government clients across the region.</p>
            <p className="text-muted">Today we combine certified equipment, expert consultancy, and accredited training under one roof — protecting more than 2,400 active worksites.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Image src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=70" alt="Safety team reviewing plans on an industrial site" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-16">
        <div className="mx-auto max-w-wrap px-6">
          <div className="mb-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-[14px] border border-line bg-white p-7"><h3 className="mb-2 text-orange">Our Mission</h3><p className="text-muted">To eliminate preventable workplace incidents by delivering certified safety equipment, training and consultancy to every industry we serve.</p></div>
            <div className="rounded-[14px] border border-line bg-white p-7"><h3 className="mb-2 text-accent">Our Vision</h3><p className="text-muted">A world where industrial productivity and human safety advance together — where no one is harmed in the course of their work.</p></div>
          </div>
          <div className="mb-10 text-center"><span className="eyebrow mb-3">Core Values</span><h2 className="text-[2rem]">What we stand for</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([n, t, d]) => (
              <div key={t} className="rounded-[14px] border border-line bg-white p-6">
                <div className="font-display text-[1.4rem] font-black text-orange">{n}</div>
                <h3 className="my-2 text-[1.15rem]">{t}</h3>
                <p className="text-[.92rem] text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-6">
          <div className="mb-10 text-center"><span className="eyebrow mb-3">Leadership</span><h2 className="text-[2rem]">Meet the team</h2></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(([name, role, initials]) => (
              <div key={name} className="text-center">
                <div className="mb-3.5 grid aspect-square place-items-center rounded-2xl bg-ink font-display text-[2rem] font-black text-white">{initials}</div>
                <b className="block font-display">{name}</b>
                <small className="text-muted">{role}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-16">
        <div className="mx-auto max-w-wrap px-6">
          <div className="mb-10 text-center"><span className="eyebrow mb-3">Accreditations</span><h2 className="text-[2rem]">Certified & compliant</h2></div>
          <div className="flex flex-wrap justify-center gap-4">
            {certs.map(([b, s]) => (
              <div key={b} className="min-w-[140px] rounded-xl border border-line bg-white px-6 py-4 text-center">
                <b className="block font-display text-[1.2rem] text-ink">{b}</b>
                <small className="text-[.78rem] text-muted">{s}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
