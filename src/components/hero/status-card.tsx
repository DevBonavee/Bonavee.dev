"use client";

import { useEffect, useState } from "react";

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// The status.ts editor window. Static "online" for now; phase 5 feeds it from /api/status.
export function StatusCard({ online = true }: { online?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  const [mountedAt] = useState(() => Date.now());

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const age = now ? Math.max(0, Math.floor((now.getTime() - mountedAt) / 1000) % 60) : 0;

  return (
    <aside className={online ? "console is-working" : "console"} aria-label="Live status">
      <div className="console-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>status.ts</span>
      </div>
      <div className="console-body">
        <div className="state-big">
          <span className="lamp" aria-hidden="true">
            <b />
          </span>
          <div>
            <strong>{online ? "Working" : "Not working"}</strong>
            <small>{online ? "Laptop online · coding in VS Code" : "Laptop offline · no heartbeat"}</small>
          </div>
        </div>
        <div className="row">
          <span className="k">Local time</span>
          <span className="v" suppressHydrationWarning>
            {now ? timeFmt.format(now) : "--:--:--"}
          </span>
        </div>
        <div className="row">
          <span className="k">Heartbeat</span>
          <span className="v beat-v">
            <svg
              className="beat"
              viewBox="0 0 120 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M0 17h30l6-12 8 26 7-20 5 6h64" />
            </svg>
            <span>{age < 2 ? "just now" : `${age}s ago`}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
