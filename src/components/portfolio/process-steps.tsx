"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

type Step = { title: string; description: string; time: string };

// Once in view, the yellow line draws through the steps one by one and each node fills (CSS in portfolio.css).
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const lit = useInView(ref, { once: true, margin: "-15%" });

  return (
    <ol ref={ref} className={lit ? "process lit" : "process"}>
      {steps.map((s, n) => (
        <li key={s.title} style={{ "--n": n } as React.CSSProperties}>
          <span className="pn" aria-hidden="true">
            {String(n + 1).padStart(2, "0")}
          </span>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <span className="pt">{s.time}</span>
        </li>
      ))}
    </ol>
  );
}
