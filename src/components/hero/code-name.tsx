"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { bootDelay } from "@/lib/intro";

const TOKENS = [
  { text: "<", className: "tk-p" },
  { text: "Bona", className: undefined },
  { text: "vee", className: "y" },
  { text: "/>", className: "tk-p tk-close" },
];
const TOTAL = TOKENS.reduce((n, t) => n + t.text.length, 0);

// <Bonavee /> typed character by character, followed by a blinking block cursor.
export function CodeName() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduce) {
      setTyped(TOTAL);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let k = 0;
    const step = () => {
      setTyped(++k);
      if (k < TOTAL) timer = setTimeout(step, 70 + Math.random() * 90);
    };
    timer = setTimeout(step, bootDelay() + 100);
    return () => clearTimeout(timer);
  }, [reduce]);

  let left = typed;
  return (
    <h1 className="code-name">
      <span className="sr-only">Bonavee</span>
      <span aria-hidden="true">
        {TOKENS.map((t) => {
          const part = t.text.slice(0, Math.max(0, left));
          left -= t.text.length;
          return (
            <span key={t.text} className={t.className}>
              {part}
            </span>
          );
        })}
      </span>
      <span className={typed < TOTAL ? "bigcaret typing" : "bigcaret"} aria-hidden="true" />
    </h1>
  );
}
