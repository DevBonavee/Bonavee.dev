import { Hero } from "@/components/hero/hero";
import { GitHubSection } from "@/components/live/github-section";
import { WritingSection } from "@/components/live/writing-section";
import { Building } from "@/components/sections/building";
import { Contact } from "@/components/sections/contact";
import { Marquee } from "@/components/sections/marquee";
import { Portfolio } from "@/components/sections/portfolio";
import { Reading } from "@/components/sections/reading";
import { Resume } from "@/components/sections/resume";
import { Stack } from "@/components/sections/stack";

// Re-render hourly so the month-based shelf and live data stay current.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <main>
        <Building />
        <GitHubSection />
        <Portfolio />
        <Stack />
        <Reading />
        <WritingSection />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
