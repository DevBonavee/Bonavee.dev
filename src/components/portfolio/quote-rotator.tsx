"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export type Quote = { quote: string; name: string; role: string; company: string; avatar: React.ReactNode };

const EVERY = 6500;
const EASE = [0.2, 0.8, 0.2, 1] as const;

// The big testimonial card: rotates every 6.5s, pauses on hover or focus, dashes jump to a quote.
export function QuoteRotator({ quotes }: { quotes: Quote[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce || quotes.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % quotes.length), EVERY);
    return () => clearTimeout(t);
  }, [i, paused, reduce, quotes.length]);

  const q = quotes[i];
  return (
    <figure
      className="card quote-big"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <svg className="qmark" viewBox="0 0 48 36" fill="currentColor" aria-hidden="true">
        <path d="M0 36V20C0 8 7 1 19 0v7c-6 1-9 5-9 11h9v18zm29 0V20C29 8 36 1 48 0v7c-6 1-9 5-9 11h9v18z" />
      </svg>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={i}
          className="grid gap-[22px]"
          aria-live={paused ? "polite" : "off"}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <blockquote>{q.quote}</blockquote>
          <figcaption>
            {q.avatar}
            <span>
              <b>{q.name}</b>
              <small>
                {q.role}, {q.company}
              </small>
            </span>
          </figcaption>
        </m.div>
      </AnimatePresence>
      {quotes.length > 1 && (
        <div className="qdots" role="group" aria-label="Choose a testimonial">
          {quotes.map((t, n) => (
            <button
              key={n}
              type="button"
              aria-pressed={n === i}
              aria-label={`Testimonial ${n + 1} of ${quotes.length}`}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
