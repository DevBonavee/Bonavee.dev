import type { Metadata, Viewport } from "next";
import { site } from "@content/site";
import { Footer } from "@/components/footer";
import { Intro } from "@/components/motion/intro";
import { PageWipe } from "@/components/motion/page-wipe";
import { PointerFx } from "@/components/motion/pointer-fx";
import { Nav } from "@/components/nav/nav";
import { Providers } from "@/components/providers";
import { ScrollJump } from "@/components/scroll-jump";
import { INTRO_SCRIPT } from "@/lib/intro";
// Validates every file in content/ at build time; a typo fails the build with a clear message.
import "@/lib/content";
import { getCaseStudies } from "@/lib/case-studies";
import { instrumentSans, jetbrainsMono, unbounded } from "./fonts";
import "./globals.css";

const title = `${site.short} · ${site.role}`;
const description = `${site.name} (${site.short}) builds web apps and AI features end to end with Next.js, TypeScript, FastAPI and LLM agents. Portfolio, live GitHub activity, writing and résumé.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.short}` },
  description,
  applicationName: `${site.short}.dev`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    site.short,
    "full-stack developer",
    "AI engineer",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Python",
    "LLM agents",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.short}.dev`,
    title,
    description,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title, description, creator: "@Bonaventure_NC" },
  robots: { index: true, follow: true },
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

// Same for the case-study MDX files.
getCaseStudies();

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
          <ScrollJump />
          <PageWipe />
        </Providers>
      </body>
    </html>
  );
}
