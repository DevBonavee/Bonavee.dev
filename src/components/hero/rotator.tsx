"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Cycles phrases every 2.4s: the current one slides up into place, the previous one slides out the top.
// All phrases share one grid cell, so the line keeps the width of the longest.
export function Rotator({ phrases }: { phrases: string[] }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2400);
    return () => clearInterval(id);
  }, [reduce, phrases.length]);

  const prev = (idx - 1 + phrases.length) % phrases.length;
  return (
    <>
      <span className="rot" aria-hidden="true">
        {phrases.map((p, i) => (
          <motion.span
            key={p}
            initial={false}
            animate={
              i === idx
                ? { opacity: 1, y: "0%" }
                : i === prev
                  ? { opacity: 0, y: "-60%" }
                  : { opacity: 0, y: "60%" }
            }
            transition={{ duration: 0.45, ease: EASE }}
          >
            {p}
          </motion.span>
        ))}
      </span>
      <span className="sr-only">{phrases.join(", ")}</span>
    </>
  );
}
