"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import type { Cv } from "@content/cvs";

const SPRING = { duration: 0.4, ease: [0.3, 1.25, 0.45, 1] } as const;

// Role tabs with a sliding yellow pill. Switching fades the summary and swaps the PDF link.
export function CvTabs({ cvs }: { cvs: Cv[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const cv = cvs[active];
  if (!cv) return null;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + cvs.length) % cvs.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <>
      <div>
        <div className="eyebrow mb-2" id={`${id}-label`}>
          Résumé for
        </div>
        <div className="seg cv-seg" role="tablist" aria-labelledby={`${id}-label`}>
          {cvs.map((c, i) => (
            <button
              key={c.role}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {i === active && <motion.span layoutId={`${id}-thumb`} className="thumb" transition={SPRING} />}
              <span>{c.role}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="grid gap-[22px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={cv.role}
            className="sum"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {cv.summary}
          </motion.p>
        </AnimatePresence>
        <a className="pdf" href={`/cv/${cv.file}`} download>
          <span className="file" aria-hidden="true">
            PDF
          </span>
          <span>
            <b>Download {cv.role} résumé</b>
            <small>
              {cv.file} · {cv.pages} {cv.pages === 1 ? "page" : "pages"}
            </small>
          </span>
        </a>
      </div>
    </>
  );
}
