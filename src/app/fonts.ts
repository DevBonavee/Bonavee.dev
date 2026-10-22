import { Instrument_Sans, JetBrains_Mono, Unbounded } from "next/font/google";

export const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["600", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});
