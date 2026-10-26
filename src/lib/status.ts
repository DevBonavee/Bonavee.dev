import "server-only";
import { Redis } from "@upstash/redis";

export const STATUS_KEY = "status";
export const ONLINE_WINDOW_MS = 3 * 60_000;

// "Working" means the laptop is awake and online: a heartbeat arrived in the last 3 minutes.
export type StoredStatus = { lastSeen: number; source: string };
export type PublicStatus = { online: boolean; lastSeen: number | null };

// Upstash from the Vercel Marketplace may expose either naming scheme, and Vercel's "custom prefix"
// option renames them (e.g. MYPREFIX_KV_REST_API_URL), so any prefix in front of KV_REST_API_* works too.
function prefixedKv(): { url?: string; token?: string } {
  const urlKey = Object.keys(process.env).find((k) => k.endsWith("KV_REST_API_URL"));
  if (!urlKey) return {};
  const prefix = urlKey.slice(0, -"KV_REST_API_URL".length);
  return { url: process.env[urlKey], token: process.env[`${prefix}KV_REST_API_TOKEN`] };
}

export function getRedis(): Redis | null {
  const kv = prefixedKv();
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? kv.url;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? kv.token;
  if (!url?.startsWith("https://") || !token) return null;
  return new Redis({ url, token });
}

export function toPublic(s: StoredStatus | null, now = Date.now()): PublicStatus {
  if (!s || typeof s.lastSeen !== "number") return { online: false, lastSeen: null };
  return { online: now - s.lastSeen < ONLINE_WINDOW_MS, lastSeen: s.lastSeen };
}
