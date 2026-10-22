import { createHash, timingSafeEqual } from "node:crypto";
import { getRedis, STATUS_KEY, type StoredStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

// Compare digests so the check takes the same time whatever the input length.
function secretMatches(header: string | null, secret: string) {
  const given = header?.startsWith("Bearer ") ? header.slice(7) : "";
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(secret).digest();
  return given.length > 0 && timingSafeEqual(a, b);
}

const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

// POST /api/heartbeat  (Authorization: Bearer $HEARTBEAT_SECRET)  body: { source }
export async function POST(req: Request) {
  const secret = process.env.HEARTBEAT_SECRET;
  const redis = getRedis();
  if (!secret || !redis) return json({ error: "Heartbeat is not configured" }, 503);
  if (!secretMatches(req.headers.get("authorization"), secret)) return json({ error: "Unauthorized" }, 401);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const b = (body ?? {}) as { source?: unknown };
  const status: StoredStatus = {
    lastSeen: Date.now(),
    source: typeof b.source === "string" ? b.source.slice(0, 40) : "unknown",
  };

  try {
    await redis.set(STATUS_KEY, status);
  } catch {
    return json({ error: "Could not save heartbeat" }, 502);
  }
  return json({ ok: true, lastSeen: status.lastSeen }, 200);
}
