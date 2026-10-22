import type { Metadata, Viewport } from "next";
import { site } from "@content/site";
import { Footer } from "@/components/footer";
import { Intro } from "@/components/motion/intro";
import { PointerFx } from "@/components/motion/pointer-fx";
import { Nav } from "@/components/nav/nav";
import { Providers } from "@/components/providers";
import { INTRO_SCRIPT } from "@/lib/intro";
import { instrumentSans, jetbrainsMono, unbounded } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.short} · ${site.role}`,
  description: `${site.name} (${site.short}), a ${site.role.toLowerCase()}. Next.js, TypeScript, FastAPI and AI agents.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#172923" },
    { media: "(prefers-color-scheme: light)", color: "#F2F1EC" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${unbounded.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Decides before first paint whether the intro plays, so the page never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <Providers>
          <Intro />
          <div className="grain" aria-hidden="true" />
          <PointerFx />
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
