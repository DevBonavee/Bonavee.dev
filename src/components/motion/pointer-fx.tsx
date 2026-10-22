"use client";

import { useEffect, useRef, useState } from "react";

const TILT_DEG = 8;
const MAGNET = 0.25;
const GROW_ON = "a, button, .tech li";

// One delegated pointer listener for the whole page:
// - `.spot` cards get --mx/--my so their yellow spotlight follows the cursor
// - `.tilt` cards rotate up to ±8° toward the cursor
// - `.magnetic` buttons drift ~25% toward the cursor
// - a 34px yellow ring cursor (fine pointers only) that grows over links and buttons
// Tilt, magnet and cursor are skipped for reduced motion and touch.
export function PointerFx() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = fine && !reduce;
    setCursor(motion);

    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;
    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;

    const release = (el: HTMLElement | null) => {
      if (el) el.style.transform = "";
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;

      const spot = target?.closest<HTMLElement>(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (!motion) return;

      const tilt = target?.closest<HTMLElement>(".tilt") ?? null;
      if (tilt !== tiltEl) release(tiltEl);
      tiltEl = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(900px) rotateY(${x * TILT_DEG * 2}deg) rotateX(${-y * TILT_DEG * 2}deg) translateY(-4px)`;
      }

      const mag = target?.closest<HTMLElement>(".magnetic") ?? null;
      if (mag !== magEl) release(magEl);
      magEl = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        mag.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * MAGNET}px, ${(e.clientY - r.top - r.height / 2) * MAGNET}px)`;
      }

      pos.tx = e.clientX;
      pos.ty = e.clientY;
      cursorRef.current?.classList.toggle("big", Boolean(target?.closest(GROW_ON)));
    };

    const onLeave = () => {
      release(tiltEl);
      release(magEl);
      tiltEl = magEl = null;
      pos.tx = pos.ty = -100;
    };

    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.2;
      pos.y += (pos.ty - pos.y) * 0.2;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    if (motion) raf = requestAnimationFrame(loop);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return cursor ? <div ref={cursorRef} className="cursor" aria-hidden="true" /> : null;
}
