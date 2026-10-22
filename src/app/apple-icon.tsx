import { ImageResponse } from "next/og";
import { Badge } from "@/components/og/badge";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so the badge fills the square.
export default async function AppleIcon() {
  return new ImageResponse(<Badge size={180} radius={0} />, { ...size, fonts: await ogFonts() });
}
