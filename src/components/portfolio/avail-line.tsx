"use client";

import { useLiveStatus } from "@/components/status/status-provider";

// "Available for new projects", with the same live dot as the nav pill.
export function AvailLine() {
  const online = useLiveStatus()?.online ?? false;
  return (
    <div className={online ? "pavail is-working" : "pavail"}>
      <span className="dot" aria-hidden="true" />
      <span>Available for new projects</span>
    </div>
  );
}
