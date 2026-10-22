"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { HeroPhoto } from "@/lib/hero-photos";

const WIPE_MS = 900;
const pad = (n: number) => String(n).padStart(2, "0");

// 4:5 photo frame. Auto-advances every 5s (timed by the progress-bar animation), the next photo wipes in
// from the right behind a yellow edge, and a scan line sweeps down on each change.
export function PhotoCarousel({ photos }: { photos: HeroPhoto[] }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [changes, setChanges] = useState(0);
  const busy = useRef(false);
  const touchX = useRef<number | null>(null);
  const many = photos.length > 1;

  const go = useCallback(
    (target: number) => {
      const n = (target + photos.length) % photos.length;
      if (n === idx || busy.current) return;
      setChanges((c) => c + 1);
      if (reduce) {
        setIdx(n);
        return;
      }
      busy.current = true;
      setIncoming(n);
      setTimeout(() => {
        setIdx(n);
        setIncoming(null);
        busy.current = false;
      }, WIPE_MS);
    },
    [idx, photos.length, reduce],
  );

  if (photos.length === 0) return null;
  const current = incoming ?? idx;

  return (
    <figure
      className={paused ? "portrait paused" : "portrait"}
      aria-roledescription="carousel"
      aria-label="Photos of Bonavee"
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(current - 1);
        if (e.key === "ArrowRight") go(current + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {photos.map((p, i) => (
        <div
          key={p.src}
          className={i === incoming ? "slide in" : i === idx ? "slide on" : "slide"}
          aria-hidden={i !== current}
        >
          <Image
            src={p.src}
            alt={`Bonavee, photo ${i + 1} of ${photos.length}`}
            fill
            sizes="(min-width: 960px) 360px, calc(100vw - 32px)"
            priority={i === 0}
          />
        </div>
      ))}

      {many && (
        <div className="pbars">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={i < current ? "done" : i === current && !reduce ? "run" : undefined}
              onClick={() => go(i)}
            >
              {/* Re-keyed on every change so the 5s fill restarts; its end advances the carousel. */}
              <i key={i === current ? `run-${changes}` : "idle"} onAnimationEnd={() => go(current + 1)} />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={photos[current].caption}
          className="cap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {photos[current].caption}
        </m.span>
      </AnimatePresence>

      {many && (
        <>
          <button
            type="button"
            className="sbtn prev"
            aria-label="Previous photo"
            onClick={() => go(current - 1)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" className="sbtn next" aria-label="Next photo" onClick={() => go(current + 1)}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      <span className="scount" aria-hidden="true">
        {pad(current + 1)} / {pad(photos.length)}
      </span>
      <span key={changes} className={changes ? "scan again" : "scan"} aria-hidden="true" />
      <span className="br b" aria-hidden="true" />
      <span className="br c" aria-hidden="true" />
      <span className="br d" aria-hidden="true" />
    </figure>
  );
}
