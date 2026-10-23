import localFont from "next/font/local";

// Self-hosted variable fonts (latin subset), downloaded from Google Fonts.
// next/font/google fetches from Google at build time, which broke Vercel builds
// when Google returned font URLs without a file extension.

export const unbounded = localFont({
  src: "./fonts/Unbounded-latin.woff2",
  weight: "600 900",
  variable: "--font-unbounded",
  display: "swap",
});

export const instrumentSans = localFont({
  src: "./fonts/InstrumentSans-latin.woff2",
  weight: "400 600",
  variable: "--font-instrument",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-latin.woff2",
  weight: "400 700",
  variable: "--font-jetbrains",
  display: "swap",
});
