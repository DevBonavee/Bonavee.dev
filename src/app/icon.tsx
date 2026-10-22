import { ImageResponse } from "next/og";
import { Badge } from "@/components/og/badge";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Badge size={32} radius={8} />, { ...size, fonts: await ogFonts() });
}
