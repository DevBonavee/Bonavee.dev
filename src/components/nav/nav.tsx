"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@content/site";
import { StatusPill } from "./status-pill";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for whichever section crosses the middle band of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    // Clear the underline when back above the first section.
    const top = document.getElementById("top");
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (top) topIo.observe(top);
    return () => {
      io.disconnect();
      topIo.disconnect();
    };
  }, []);

  return (
    <nav className={lifted ? "nav lifted" : "nav"} aria-label="Main">
      <div className="bar">
        <a className="logo" href="#top" aria-label="Bonavee.dev home">
          <span className="logo-mark">BV</span>
          <span>
            Bonavee<span className="text-accent-text">.dev</span>
          </span>
        </a>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "active" : undefined}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-ind"
                  className="nav-ind"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <StatusPill />
          <ThemeToggle />
          <a className="btn sm" href="#contact">
            Book a call
          </a>
        </div>
      </div>
    </nav>
  );
}
