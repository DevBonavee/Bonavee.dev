"use client";

import { useEffect, useState } from "react";
import { shortAgo, useLiveStatus } from "@/components/status/status-provider";

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// The status.ts editor window: "Working" while the laptop is awake and online, plus the visitor's clock.
export function StatusCard() {
  const status = useLiveStatus();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const online = status?.online ?? false;
  const since = status?.lastSeen && now ? now - status.lastSeen : null;

  let title = "Checking…";
  let sub = "Looking for a heartbeat";
  if (status) {
    title = online ? "Working" : "Not working";
    if (online) sub = "Laptop online";
    else sub = since !== null ? `Laptop offline · no heartbeat for ${shortAgo(since)}` : "Laptop offline";
  }

  let beat = "--";
  if (since !== null) beat = since < 2000 ? "just now" : `${shortAgo(since)} ago`;
  else if (status) beat = "none yet";

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
            <strong>{title}</strong>
            <small>{sub}</small>
          </div>
        </div>
        <div className="row">
          <span className="k">Local time</span>
          <span className="v">{now ? timeFmt.format(now) : "--:--:--"}</span>
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
            <span>{beat}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
