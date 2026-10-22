"use client";

import { useLiveStatus } from "@/components/status/status-provider";

// Nav pill mirroring the laptop heartbeat. Pulses green while online.
export function StatusPill() {
  const status = useLiveStatus();
  const online = status?.online ?? false;
  const label = status ? (online ? "Working" : "Not working") : "Checking…";

  return (
    <span className={online ? "status is-working" : "status"} role="status" aria-live="polite">
      <span className="dot" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
