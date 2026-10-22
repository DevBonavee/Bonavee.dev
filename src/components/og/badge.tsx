// The yellow "BV" badge, drawn for next/og (favicon, apple icon, OG image).
export function Badge({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "#FFD000",
        color: "#172923",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Unbounded",
        fontWeight: 900,
        fontSize: size * 0.42,
        letterSpacing: "-0.04em",
      }}
    >
      BV
    </div>
  );
}
