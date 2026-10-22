"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Calendar } from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const longDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

// Month labels sit above the first week of each month. A partial first month too close to the
// next label gives up its slot, as on GitHub.
function monthLabels(weeks: Calendar["weeks"]) {
  const out: { col: number; label: string }[] = [];
  let last = -1;
  weeks.forEach((w, i) => {
    const m = new Date(`${w[0].date}T00:00:00Z`).getUTCMonth();
    if (m === last) return;
    last = m;
    const prev = out.at(-1);
    if (prev && i - prev.col < 3) {
      if (prev.col === 0) out.pop();
      else return;
    }
    out.push({ col: i, label: MONTHS[m] });
  });
  return out;
}

// 53 x 7 grid of yellow squares. Cells pop in, staggered, the first time the graph scrolls into view.
export function ContribGraph({ calendar }: { calendar: Calendar }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);

  // Hide the cells only once JS is running, so the graph is never blank without it.
  useEffect(() => {
    if (!reduce) setArmed(true);
  }, [reduce]);

  const firstDay = new Date(`${calendar.weeks[0]?.[0]?.date}T00:00:00Z`).getUTCDay();
  const cls = ["graph", armed && "pre", armed && inView && "in"].filter(Boolean).join(" ");

  return (
    <div className="graph-scroll">
      <div
        className="months"
        aria-hidden="true"
        style={{ "--weeks": calendar.weeks.length } as React.CSSProperties}
      >
        {monthLabels(calendar.weeks).map((m) => (
          <span key={`${m.col}-${m.label}`} style={{ gridColumn: m.col + 1 }}>
            {m.label}
          </span>
        ))}
      </div>
      <div
        ref={ref}
        className={cls}
        role="img"
        aria-label={`Contribution graph: ${calendar.total} contributions in the last year`}
        style={{ "--weeks": calendar.weeks.length } as React.CSSProperties}
      >
        {calendar.weeks.map((week, w) =>
          week.map((d, j) => (
            <i
              key={d.date}
              data-l={d.level}
              title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${longDate.format(new Date(`${d.date}T00:00:00Z`))}`}
              style={
                {
                  "--d": w + j * 2,
                  ...(w === 0 && j === 0 ? { gridRowStart: firstDay + 1 } : {}),
                } as React.CSSProperties
              }
            />
          )),
        )}
      </div>
    </div>
  );
}
