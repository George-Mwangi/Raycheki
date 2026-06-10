"use client";

import { useState } from "react";
import { serviceOptions } from "@/lib/data";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const localErrors: Record<string, string> = {};
    if (String(data.name).trim().length < 2) localErrors.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email))) localErrors.email = "Enter a valid email";
    if (String(data.message).trim().length < 5) localErrors.message = "Please add a short message";
    if (Object.keys(localErrors).length) { setErrors(localErrors); return; }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) { setStatus("ok"); setMessage("✓ Request submitted — we’ll be in touch within 24 hours."); form.reset(); }
      else { const j = await res.json().catch(() => ({})); setStatus("error"); setMessage(j.error || "Something went wrong. Please try again."); }
    } catch {
      setStatus("error"); setMessage("Network error. Please try again.");
    }
  }

  const field = "w-full rounded-lg border border-line px-3.5 py-3 text-[.95rem] outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20";

  return (
    <form onSubmit={onSubmit} className="rounded-[14px] border border-line bg-white p-7" noValidate>
      <h3 className="mb-1.5 text-[1.3rem]">Request a Quote</h3>
      <p className="mb-2 text-[.9rem] text-muted">Fill in the form and our team will respond shortly.</p>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 mt-3.5 block text-[.85rem] font-semibold text-ink-700">Name *</label>
          <input name="name" className={field} />
          {errors.name && <p className="mt-1 text-[.8rem] text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 mt-3.5 block text-[.85rem] font-semibold text-ink-700">Company</label>
          <input name="company" className={field} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 mt-3.5 block text-[.85rem] font-semibold text-ink-700">Email *</label>
          <input name="email" type="email" className={field} />
          {errors.email && <p className="mt-1 text-[.8rem] text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 mt-3.5 block text-[.85rem] font-semibold text-ink-700">Phone</label>
          <input name="phone" className={field} />
        </div>
      </div>
      <label className="mb-1.5 mt-3.5 block text-[.85rem] font-semibold text-ink-700">Service Needed</label>
      <select name="service" defaultValue={defaultService || serviceOptions[0]} className={field}>
        {serviceOptions.map((s) => <option key={s}>{s}</option>)}
      </select>
      <label className="mb-1.5 mt-3.5 block text-[.85rem] font-semibold text-ink-700">Message *</label>
      <textarea name="message" rows={4} placeholder="Tell us about your requirements…" className={`${field} resize-y`} defaultValue={defaultService ? `I'd like to inquire about: ${defaultService}.` : ""} />
      {errors.message && <p className="mt-1 text-[.8rem] text-red-600">{errors.message}</p>}

      <button type="submit" disabled={status === "sending"} className="mt-5 w-full rounded-lg bg-orange py-3.5 font-display font-bold text-white transition hover:bg-orange-dark disabled:opacity-60">
        {status === "sending" ? "Submitting…" : "Submit Request"}
      </button>

      {status === "ok" && <p className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-[.9rem] font-medium text-green-700">{message}</p>}
      {status === "error" && <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-[.9rem] font-medium text-red-700">{message}</p>}

      <p className="mt-3 text-[.8rem] text-muted">🔒 Your information is protected. We never share your details with third parties.</p>
    </form>
  );
}
