"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { StatusProvider } from "./status/status-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <StatusProvider>{children}</StatusProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
