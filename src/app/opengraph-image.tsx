import { ImageResponse } from "next/og";
import { site } from "@content/site";
import { Badge } from "@/components/og/badge";
import { ogFonts } from "@/lib/og-fonts";

export const alt = `${site.short}: ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#172923";
const FG = "#F2F1EC";
const FAINT = "#6f857a";
const MUTED = "#a8b7ae";
const YELLOW = "#FFD000";

// A small contribution-style grid for the right edge, same look as the hero canvas.
const COLS = 9;
const ROWS = 6;
const LIT: Record<number, number> = {
  3: 0.55,
  11: 1,
  16: 0.3,
  22: 0.75,
  30: 0.3,
  37: 1,
  41: 0.55,
  49: 0.3,
  52: 0.75,
};

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BG,
        color: FG,
        fontFamily: "JetBrains Mono",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 48,
          top: 36,
          display: "flex",
          flexWrap: "wrap",
          width: COLS * 30,
          gap: 8,
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <div
            key={i}
            style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              background: LIT[i] ? YELLOW : "rgba(242,241,236,.07)",
              opacity: LIT[i] ?? 1,
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Badge size={56} radius={14} />
          <div style={{ display: "flex", fontFamily: "Unbounded", fontSize: 30, letterSpacing: "-0.02em" }}>
            Bonavee<span style={{ color: YELLOW }}>.dev</span>
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 92, fontSize: 28, color: FAINT }}>
          ~/bonavee $ <span style={{ color: YELLOW, marginLeft: 14 }}>whoami</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 18,
            fontFamily: "Unbounded",
            fontSize: 128,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 92, color: FAINT }}>&lt;</span>
          <span>Bona</span>
          <span style={{ color: YELLOW }}>vee</span>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 92, color: FAINT, marginLeft: 18 }}>
            /&gt;
          </span>
          <span style={{ width: 52, height: 112, background: YELLOW, marginLeft: 14 }} />
        </div>

        <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: MUTED }}>
          {site.name} · Full-stack &amp; AI
        </div>
        <div style={{ display: "flex", marginTop: 10, fontSize: 24, color: FAINT }}>
          Next.js · TypeScript · FastAPI · LLM agents
        </div>
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
