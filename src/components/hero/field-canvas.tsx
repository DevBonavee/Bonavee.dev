"use client";

import { useEffect, useRef } from "react";
import { bootDelay } from "@/lib/intro";

const S = 22; // grid pitch in px
const SZ = S - 6; // square size
const BUCKETS = 12; // alpha levels; lit squares are batched into one path per level

type Cell = { px: number; py: number; base: number; v: number; ph: number };

// GitHub-contribution-style squares: some twinkle, a diagonal wave sweeps across,
// and squares near the cursor light up. Reduced motion gets a single static frame.
// The grey grid is painted once on a base canvas; each frame only repaints the lit squares.
export function FieldCanvas() {
  const baseRef = useRef<HTMLCanvasElement>(null);
  const litRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const baseCv = baseRef.current;
    const cv = litRef.current;
    const host = cv?.parentElement;
    const bctx = baseCv?.getContext("2d");
    const ctx = cv?.getContext("2d");
    if (!baseCv || !cv || !host || !bctx || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const col = { cell: "", acc: "#FFD000" };
    const mouse = { x: -999, y: -999 };
    const paths: Path2D[] = [];
    let W = 0;
    let H = 0;
    let cells: Cell[] = [];
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const square = (p: Path2D | CanvasRenderingContext2D, x: number, y: number, w: number) => {
      if (p.roundRect) p.roundRect(x, y, w, w, 3);
      else p.rect(x, y, w, w);
    };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      col.cell = cs.getPropertyValue("--cell-0").trim();
      col.acc = cs.getPropertyValue("--accent").trim() || "#FFD000";
    };

    const paintBase = () => {
      bctx.clearRect(0, 0, W, H);
      bctx.fillStyle = col.cell;
      bctx.beginPath();
      for (const c of cells) square(bctx, c.px + 3, c.py + 3, SZ);
      bctx.fill();
    };

    const size = () => {
      const r = cv.getBoundingClientRect();
      const d = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      for (const [c, x] of [
        [baseCv, bctx],
        [cv, ctx],
      ] as const) {
        c.width = W * d;
        c.height = H * d;
        x.setTransform(d, 0, 0, d, 0, 0);
      }
      const cols = Math.ceil(W / S) + 1;
      const rows = Math.ceil(H / S) + 1;
      cells = [];
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const n = Math.random();
          cells.push({
            px: x * S,
            py: y * S,
            base: n > 0.93 ? 0.55 : n > 0.85 ? 0.28 : 0,
            v: 0,
            ph: Math.random() * 6.28,
          });
        }
      paintBase();
    };

    const draw = (now: number, settle: boolean) => {
      const t = (now - t0) / 1000;
      const wave = ((t * 120) % (W + H + 400)) - 200;
      for (let i = 0; i < BUCKETS; i++) paths[i] = new Path2D();
      let any = false;
      for (const c of cells) {
        let target: number;
        if (settle) target = c.base;
        else {
          const hover = Math.max(0, 1 - Math.hypot(c.px + S / 2 - mouse.x, c.py + S / 2 - mouse.y) / 150);
          const wv = Math.max(0, 1 - Math.abs(c.px + c.py - wave) / 90) * 0.45;
          const tw = c.base ? c.base * (0.6 + 0.4 * Math.sin(t * 1.4 + c.ph)) : 0;
          target = Math.max(hover, wv * (c.base ? 1 : 0.35), tw);
        }
        c.v = settle ? target : c.v + (target - c.v) * 0.12;
        if (c.v <= 0.02) continue;
        const v = Math.min(1, c.v);
        const g = SZ * (0.55 + 0.45 * v);
        const o = (SZ - g) / 2;
        square(paths[Math.min(BUCKETS - 1, Math.floor(v * BUCKETS))], c.px + 3 + o, c.py + 3 + o, g);
        any = true;
      }
      ctx.clearRect(0, 0, W, H);
      if (!any) return;
      ctx.fillStyle = col.acc;
      for (let i = 0; i < BUCKETS; i++) {
        ctx.globalAlpha = (i + 0.5) / BUCKETS;
        ctx.fill(paths[i]);
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      draw(now, false);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    let ready = false;
    const start = () => {
      if (reduce) draw(performance.now(), true);
      else if (ready && !raf) raf = requestAnimationFrame(frame);
    };

    readColors();
    size();
    // Paint a still frame now; start animating once the page has loaded, the intro is done and the
    // browser is idle, so the loop doesn't compete with hydration and first paint.
    draw(performance.now(), true);
    let idleId = 0;
    let delayId: ReturnType<typeof setTimeout> | undefined;
    const begin = () => {
      delayId = setTimeout(() => {
        const go = () => {
          ready = true;
          start();
        };
        if ("requestIdleCallback" in window) idleId = requestIdleCallback(go, { timeout: 1500 });
        else go();
      }, bootDelay());
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    const onResize = () => {
      size();
      if (reduce) draw(performance.now(), true);
    };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -999;
    };
    // Repaint with the new palette when the theme changes.
    const themeObs = new MutationObserver(() => {
      readColors();
      paintBase();
      if (reduce) draw(performance.now(), true);
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    // Stop drawing while the hero is off screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(host);

    window.addEventListener("resize", onResize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(delayId);
      if (idleId) cancelIdleCallback(idleId);
      window.removeEventListener("load", begin);
      themeObs.disconnect();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={baseRef} className="field" aria-hidden="true" />
      <canvas ref={litRef} className="field" aria-hidden="true" />
    </>
  );
}
