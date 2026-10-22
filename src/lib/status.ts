import "server-only";
import { Redis } from "@upstash/redis";

export const STATUS_KEY = "status";
export const ONLINE_WINDOW_MS = 3 * 60_000;

export type StoredStatus = { lastSeen: number; source: string; vscode: boolean };
export type PublicStatus = { online: boolean; lastSeen: number | null; vscode: boolean };

// Upstash from the Vercel Marketplace may expose either naming scheme.
export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function toPublic(s: StoredStatus | null, now = Date.now()): PublicStatus {
  if (!s || typeof s.lastSeen !== "number") return { online: false, lastSeen: null, vscode: false };
  return { online: now - s.lastSeen < ONLINE_WINDOW_MS, lastSeen: s.lastSeen, vscode: Boolean(s.vscode) };
}
