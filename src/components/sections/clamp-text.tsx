"use client";

import { useEffect, useId, useRef, useState } from "react";

// Shows the first few lines of a long text with a "Read more" toggle.
// The toggle only appears when the text is actually cut off.
export function ClampText({ text, label }: { text: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [cut, setCut] = useState(false);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setCut(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="desc">
      <p id={id} ref={ref} className={open ? undefined : "clamp"}>
        {text}
      </p>
      {(cut || open) && (
        <button
          type="button"
          className="more"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          {open ? "Show less" : "Read more"}
          <span className="sr-only"> about {label}</span>
        </button>
      )}
    </div>
  );
}
