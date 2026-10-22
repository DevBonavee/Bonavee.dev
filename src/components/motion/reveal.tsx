"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type State = "idle" | "hidden" | "shown";

// Scroll reveal that never hides content already on screen: elements render visible (server and first
// paint), and only those starting below the fold are tucked away on mount, then revealed once in view.
function useReveal(ref: React.RefObject<Element | null>): State {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (reduce) {
      setState("idle");
      return;
    }
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight * 0.95) {
      setState((s) => (s === "idle" ? "hidden" : s));
    }
  }, [reduce, ref]);

  useEffect(() => {
    if (inView) setState((s) => (s === "hidden" ? "shown" : s));
  }, [inView]);

  return state;
}

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Card reveal: fades up 40px with a blur clearing, staggered by `i` (90ms steps, groups of 4).
export function Reveal({
  children,
  i = 0,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  i?: number;
  as?: "div" | "li";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const state = useReveal(ref);
  const Tag = as === "li" ? m.li : m.div;

  return (
    <Tag
      ref={ref}
      className={className ? `rv ${className}` : "rv"}
      data-reveal={state}
      initial={false}
      animate={
        state === "hidden"
          ? { opacity: 0, y: 40, filter: "blur(4px)" }
          : { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none", transform: "none" } }
      }
      transition={state === "hidden" ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: (i % 4) * 0.09 }}
    >
      {children}
    </Tag>
  );
}

// Section heading: the h2 rises out of a clip mask and the path eyebrow slides in (CSS in motion.css).
export function RevealHead({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useReveal(ref);
  return (
    <div ref={ref} className={state === "hidden" ? "sec-head hpre" : "sec-head"}>
      {children}
    </div>
  );
}
