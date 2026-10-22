"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type LiveStatus = { online: boolean; lastSeen: number | null; vscode: boolean };

const POLL_MS = 30_000;
const StatusContext = createContext<LiveStatus | null>(null);

// Polls /api/status every 30s while the tab is visible, and right away when it becomes visible again.
// null means "not loaded yet".
export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      clearTimeout(timer);
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (res.ok && alive) setStatus((await res.json()) as LiveStatus);
      } catch {
        // Network blip: keep the last known status.
      }
      if (alive && document.visibilityState === "visible") timer = setTimeout(poll, POLL_MS);
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") poll();
      else clearTimeout(timer);
    };

    poll();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return <StatusContext.Provider value={status}>{children}</StatusContext.Provider>;
}

export const useLiveStatus = () => useContext(StatusContext);

// "45s", "12m", "3h", "2d"
export function shortAgo(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
