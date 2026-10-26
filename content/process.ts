// "How we'll work" on /portfolio: five steps, drawn left to right on desktop.
import type { Step } from "@/lib/content/schema";

export const processSteps: Step[] = [
  {
    title: "Discover",
    description:
      "A 30-minute call to understand the goal, users and budget. You get a written scope within 48 hours.",
    time: "Week 0",
  },
  {
    title: "Design",
    description: "Wireframes, then a clickable design. We agree on it before any code is written.",
    time: "Week 1",
  },
  {
    title: "Build",
    description: "Weekly demos on a live preview link, so you see progress as it happens.",
    time: "Weeks 2–5",
  },
  {
    title: "Launch",
    description: "Testing, deploy, analytics and a handover call with docs for your team.",
    time: "Week 6",
  },
  {
    title: "Support",
    description: "30 days of fixes included, then optional monthly care.",
    time: "After launch",
  },
];
