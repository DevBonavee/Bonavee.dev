"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// Screenshots in browser frames; clicking one opens a lightbox (arrows to step, Escape to close).
export function Gallery({ title, images }: { title: string; images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((n) => (n === null ? n : (n + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((n) => (n === null ? n : (n - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, images.length]);

  return (
    <section className="cs-sec">
      <h2>Gallery</h2>
      <div className="cs-gallery">
        {images.map((src, i) => (
          <button key={src} type="button" onClick={() => setOpen(i)} aria-label={`Open screenshot ${i + 1}`}>
            <div className="shot">
              <div className="win">
                <div className="chrome" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="screen">
                  <Image
                    src={src}
                    alt={`${title} screenshot ${i + 1}`}
                    fill
                    sizes="(min-width: 760px) 50vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <m.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshot ${open + 1} of ${images.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            <m.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Image src={images[open]} alt={`${title} screenshot ${open + 1}`} fill sizes="100vw" />
            </m.figure>
            <button
              type="button"
              className="icon-btn lb-close"
              aria-label="Close"
              autoFocus
              onClick={() => setOpen(null)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="icon-btn lb-prev"
                  aria-label="Previous screenshot"
                  onClick={() => setOpen((open - 1 + images.length) % images.length)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="icon-btn lb-next"
                  aria-label="Next screenshot"
                  onClick={() => setOpen((open + 1) % images.length)}
                >
                  →
                </button>
                <span className="mono lb-count">
                  {open + 1} / {images.length}
                </span>
              </>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
