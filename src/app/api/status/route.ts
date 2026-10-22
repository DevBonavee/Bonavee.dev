import { getRedis, STATUS_KEY, toPublic, type StoredStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

// GET /api/status -> { online, lastSeen, vscode }. Reports offline when Redis is missing or unreachable.
export async function GET() {
  const redis = getRedis();
  let stored: StoredStatus | null = null;
  if (redis) {
    try {
      stored = await redis.get<StoredStatus>(STATUS_KEY);
    } catch {
      stored = null;
    }
  }
  return Response.json(toPublic(stored), { headers: { "Cache-Control": "no-store" } });
}
