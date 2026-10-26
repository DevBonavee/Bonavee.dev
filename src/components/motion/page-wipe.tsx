"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "in" | "out";

const IN_MS = 450; // panel wipes up to cover the page
const OUT_MS = 500; // panel wipes away upward
const ARRIVE_MS = 1600; // how long the new page's hero waits on the wipe (see --arrive in CSS)
const STUCK_MS = 5000; // uncover anyway if navigation never lands

// Route change: a yellow panel covers the page showing the destination ("bonavee.dev/portfolio"),
// the route changes behind it, then it wipes away and the new hero rises in.
// App Router can't animate a page's exit, so this catches internal link clicks before Next's <Link> does.
export function PageWipe() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const pending = useRef<string | null>(null);

  // Capture-phase listener runs before <Link>'s own handler, which skips navigation once we preventDefault.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith("/api/")) return; // files, not pages
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      if (pending.current) return;
      const href = url.pathname + url.search + url.hash;
      pending.current = url.pathname;
      setLabel(`bonavee.dev${url.pathname === "/" ? "" : url.pathname}`);
      setPhase("in");
      setTimeout(() => router.push(href), IN_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new route has rendered behind the panel: hold the hero's entrance for the wipe, then reveal.
  useEffect(() => {
    if (!pending.current || pathname !== pending.current) return;
    pending.current = null;
    const root = document.documentElement;
    root.dataset.pt = "arrive";
    setPhase("out");
    const done = setTimeout(() => setPhase("idle"), OUT_MS);
    const settle = setTimeout(() => delete root.dataset.pt, ARRIVE_MS);
    return () => {
      clearTimeout(done);
      clearTimeout(settle);
    };
  }, [pathname]);

  // Safety net: never leave the page covered.
  useEffect(() => {
    if (phase !== "in") return;
    const t = setTimeout(() => {
      pending.current = null;
      setPhase("out");
      setTimeout(() => setPhase("idle"), OUT_MS);
    }, STUCK_MS);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className={phase === "idle" ? "page-wipe" : `page-wipe ${phase}`} aria-hidden="true">
      <span className="mono">{label}</span>
    </div>
  );
}
