"use client";

import { useEffect, useState } from "react";

// Floating bottom-right button: near the top it jumps to the bottom, past the hero it jumps back up.
export function ScrollJump() {
  const [up, setUp] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const limit = hero ? hero.offsetTop + hero.offsetHeight * 0.6 : window.innerHeight * 0.6;
      setUp(window.scrollY > limit);
      // Only worth showing when the page is longer than about two screens.
      setShow(document.documentElement.scrollHeight > window.innerHeight * 1.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jump = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: up ? 0 : document.documentElement.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-jump${show ? " on" : ""}${up ? " up" : ""}`}
      onClick={jump}
      aria-label={up ? "Scroll to top" : "Scroll to bottom"}
      title={up ? "Back to top" : "Jump to bottom"}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
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
        <path d="M12 5v14M6 13l6 6 6-6" />
      </svg>
    </button>
  );
}
