"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BOOT_MS } from "@/lib/intro";

function partOfDay(h: number) {
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  return "evening";
}

// "~/bonavee $ Good evening. Welcome in." typed from the visitor's local time.
export function Greeting() {
  const reduce = useReducedMotion();
  const [text, setText] = useState("");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const full = `Good ${partOfDay(new Date().getHours())}. Welcome in.`;
    setText(full);
    if (reduce) {
      setShown(full.length);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let k = 0;
    const step = () => {
      setShown(++k);
      if (k < full.length) timer = setTimeout(step, 38 + Math.random() * 40);
    };
    timer = setTimeout(step, BOOT_MS + 1150);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <div className="greet">
      <span className="prompt" aria-hidden="true">
        ~/bonavee $
      </span>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
      <span className="sr-only">{text}</span>
    </div>
  );
}
