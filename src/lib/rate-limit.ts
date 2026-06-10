// In-memory rate limiter (per-process). Fine for a single instance.
// For multi-instance production, swap for Upstash Redis or Vercel KV.
const hits = new Map<string, { count: number; start: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(key);
  if (!rec || now - rec.start > windowMs) {
    hits.set(key, { count: 1, start: now });
    return { ok: true, remaining: limit - 1 };
  }
  rec.count += 1;
  return { ok: rec.count <= limit, remaining: Math.max(0, limit - rec.count) };
}
