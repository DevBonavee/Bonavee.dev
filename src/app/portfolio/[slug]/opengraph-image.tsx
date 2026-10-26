import { ImageResponse } from "next/og";
import { Badge } from "@/components/og/badge";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { ogFonts } from "@/lib/og-fonts";

export const alt = "Case study by Bonavee";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#172923";
const FG = "#F2F1EC";
const FAINT = "#6f857a";
const MUTED = "#a8b7ae";
const YELLOW = "#FFD000";
const RAISE = "#1e352d";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

// Share card: path, title, summary and the first two results as tiles (the first one yellow).
export default async function CaseStudyImage({ params }: { params: Promise<{ slug: string }> }) {
  const cs = getCaseStudy((await params).slug);
  const title = cs?.title ?? "Case study";
  const results = cs?.results.slice(0, 2) ?? [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "56px 72px",
        background: BG,
        color: FG,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Badge size={48} radius={12} />
        <div style={{ display: "flex", fontSize: 24, color: FAINT }}>
          bonavee.dev/portfolio/<span style={{ color: YELLOW }}>{cs?.slug ?? ""}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 56,
          fontFamily: "Unbounded",
          fontSize: title.length > 14 ? 84 : 112,
          letterSpacing: "-0.05em",
          lineHeight: 1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 28,
          color: MUTED,
          maxWidth: 980,
          lineHeight: 1.35,
        }}
      >
        {cs?.summary ?? ""}
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: "auto" }}>
        {results.map((r, i) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 26px",
              borderRadius: 16,
              background: i === 0 ? YELLOW : RAISE,
              color: i === 0 ? BG : FG,
            }}
          >
            <span style={{ fontFamily: "Unbounded", fontSize: 52, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {r.value}
            </span>
            <span style={{ fontSize: 20, marginTop: 8, opacity: 0.8 }}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
