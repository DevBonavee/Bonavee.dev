"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { StatusProvider } from "./status/status-provider";

// Motion features load in a separate chunk, keeping most of framer-motion out of the first bundle.
const loadFeatures = () => import("./motion/features").then((mod) => mod.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">
          <StatusProvider>{children}</StatusProvider>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
