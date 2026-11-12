"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@content/site";
import { StatusPill } from "./status-pill";
import { ThemeToggle } from "./theme-toggle";

const EASE = [0.75, 0, 0.2, 1] as const;
// Pages where the underline follows the section in view, and the sections it can land on.
const TRACKED: Record<string, readonly string[]> = {
  "/": ["building", "github", "reading", "writing", "resume"],
  "/now": ["building", "github", "reading"],
};

// Which link gets the underline: "projects" anywhere under /portfolio, the matching link on /writing and
// /resume, and on / and /now whichever section is in view.
function useActive(pathname: string) {
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    const ids = TRACKED[pathname];
    if (!ids) return;
    // On the homepage the hero, about, hire card, stack and contact have no link: they clear the underline to "home".
    const fallback = pathname === "/" ? "top" : ids[0];
    setSection(fallback);
    const band = { rootMargin: "-45% 0px -50% 0px" };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries)
        if (e.isIntersecting) setSection(ids.includes(e.target.id) ? e.target.id : fallback);
    }, band);
    [...(pathname === "/" ? ["top", "about", "hire"] : []), ...ids].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/portfolio")) return "portfolio";
  if (TRACKED[pathname]) return section ?? (pathname === "/" ? "top" : TRACKED[pathname][0]);
  if (pathname.startsWith("/writing")) return "writing";
  if (pathname.startsWith("/resume")) return "resume";
  return null;
}

export function Nav() {
  const pathname = usePathname();
  const active = useActive(pathname);
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sheetRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close the dropdown on navigation, on Escape and on a tap outside it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!sheetRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const booking = site.bookingUrl
    ? { href: site.bookingUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: "/#contact" };

  return (
    <>
      <nav className={lifted ? "nav lifted" : "nav"} aria-label="Main">
        <div className="bar">
          <Link className="logo" href="/" aria-label="Bonavee.dev home">
            <span className="logo-mark">BV</span>
            <span>
              Bonavee<span className="text-accent-text">.dev</span>
            </span>
          </Link>
          <div className="nav-links">
            {navLinks.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                className={active === l.id ? "active" : undefined}
                aria-current={active === l.id ? (l.href === pathname ? "page" : "true") : undefined}
              >
                {l.label}
                {active === l.id && (
                  <m.span
                    layoutId="nav-ind"
                    className="nav-ind"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <StatusPill />
            <ThemeToggle className="hide-xs" />
            <a className="btn sm magnetic" {...booking}>
              Book a call
            </a>
            <button
              ref={btnRef}
              type="button"
              className="icon-btn menu-btn"
              aria-expanded={open}
              aria-controls="menu-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            ref={sheetRef}
            id="menu-sheet"
            className="menu-sheet"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0 round 18px)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0 round 18px)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0 round 18px)", opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ul>
              {navLinks.map((l, i) => (
                <m.li
                  key={l.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.03, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link
                    href={l.href}
                    aria-current={active === l.id ? "true" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <small>{String(i + 1).padStart(2, "0")}</small>
                    {l.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="menu-foot">
              <a className="btn sm" {...booking}>
                Book a call
              </a>
              <span className="mono text-muted text-[13px]">{site.email}</span>
              <ThemeToggle />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
