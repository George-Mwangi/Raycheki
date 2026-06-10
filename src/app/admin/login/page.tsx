"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, undefined);
  const field = "w-full rounded-lg border border-line px-3.5 py-3 text-[.95rem] outline-none focus:border-orange focus:ring-2 focus:ring-orange/20";

  return (
    <div className="grid min-h-screen place-items-center bg-ink-900 p-6">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-ink">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z" fill="#FF6B00" /><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
          <h1 className="font-display text-[1.5rem] font-black text-ink">Admin Login</h1>
          <p className="text-[.85rem] text-muted">Raycheki Safety Solutions</p>
        </div>
        <form action={formAction}>
          <label className="mb-1.5 block text-[.85rem] font-semibold text-ink-700">Email</label>
          <input name="email" type="email" required className={field} />
          <label className="mb-1.5 mt-4 block text-[.85rem] font-semibold text-ink-700">Password</label>
          <input name="password" type="password" required className={field} />
          {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[.85rem] text-red-700">{error}</p>}
          <button disabled={pending} className="mt-5 w-full rounded-lg bg-orange py-3 font-display font-bold text-white transition hover:bg-orange-dark disabled:opacity-60">
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
