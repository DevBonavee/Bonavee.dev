"use client";

import { useEffect, useRef, useState } from "react";

// Email address with a Copy button. Falls back to selecting the text if the clipboard is blocked.
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 1800);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      const sel = getSelection();
      if (ref.current && sel) {
        const r = document.createRange();
        r.selectNodeContents(ref.current);
        sel.removeAllRanges();
        sel.addRange(r);
      }
      setState("selected");
    }
  };

  return (
    <div className="mail">
      <a ref={ref} href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" onClick={copy}>
        {state === "copied" ? "Copied" : state === "selected" ? "Press Ctrl+C" : "Copy"}
      </button>
      <span className="sr-only" role="status">
        {state === "copied"
          ? "Email copied"
          : state === "selected"
            ? "Email selected, press Control C to copy"
            : ""}
      </span>
    </div>
  );
}
