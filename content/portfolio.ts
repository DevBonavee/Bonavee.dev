// The /portfolio hero: headline, subline, the four stat tiles, and the certifications row.
// In the headline, *words* turn yellow and **words** sit on the yellow bar that draws in.
// A stat with `home` also appears in the homepage hero row under that label, so the two pages
// always show the same numbers. `count` makes a number count up; `suffix` is drawn in yellow.
// `sample: true` shows a "sample numbers" tag; remove it once these are real.
import type { Portfolio } from "@/lib/content/schema";

export const portfolio: Portfolio = {
  headline: "I build *web apps*, *AI features* & *automations* that help businesses **grow.**",
  subline:
    "Full-stack developer and AI automation builder. Next.js, FastAPI and LLMs for products, n8n and Zapier for the busywork. I take projects from first call to launch, and stay around after.",
  stats: [
    { label: "projects shipped", value: "9", count: 9, home: "projects live" },
    { label: "reply time", value: "24h", count: 24, suffix: "h", home: "reply time" },
    { label: "years leading teams", value: "3+", count: 3, suffix: "+", home: "years shipping" },
    { label: "ways to hire me", value: "5", count: 5 },
  ],
  certifications: [
    { title: "Certificate in Climate Action", issuer: "Greenswitch Academy", year: "2023", icon: "check" },
    { title: "ALX Virtual Assistant", issuer: "ALX", icon: "check" },
    { title: "SustyViber of the Month", issuer: "SustyVibes", icon: "star" },
  ],
  sample: true,
};
