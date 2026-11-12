import { site } from "@content/site";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/portfolio/about";
import { Portfolio } from "@/components/sections/portfolio";
import { GitHubSection } from "@/components/live/github-section";
import { WritingSection } from "@/components/live/writing-section";
import { Building } from "@/components/sections/building";
import { Contact } from "@/components/sections/contact";
import { Hire } from "@/components/sections/hire";
import { Marquee } from "@/components/sections/marquee";
import { Reading } from "@/components/sections/reading";
import { Resume } from "@/components/sections/resume";
import { Stack } from "@/components/sections/stack";

// Re-render hourly so the month-based shelf and live data stay current.
export const revalidate = 3600;

// Structured data so search engines can show a person card. No location, per the brief.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.short,
  jobTitle: "Full-stack developer",
  description: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: Object.values(site.socials),
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "FastAPI",
    "Python",
    "SQLModel",
    "LLM agents",
    "n8n",
    "Zapier",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <main>
        <About />
        <Portfolio limit={4} />
        <Marquee />
        <Hire />
        <Building />
        <GitHubSection />
        <Stack />
        <Reading />
        <WritingSection limit={3} />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
