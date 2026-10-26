// Numbers and copy for the /portfolio hero. The homepage hero stats row reads the same `stats`,
// so the two always match. `count` makes a number count up; `suffix` is drawn in yellow.
// `sample: true` shows a dashed "sample" tag; remove it once these are real.
export type Stat = { label: string; value: string; count?: number; suffix?: string };

export const portfolio = {
  headline: "I build web apps, AI features & automations that help businesses grow.",
  subline:
    "Full-stack developer and AI automation builder. Next.js, FastAPI and LLMs for products, n8n and Zapier for the busywork. I take projects from first call to launch, and stay around after.",
  // Shown in the homepage hero (first three) and the portfolio hero card.
  stats: [
    { label: "years shipping", value: "3+", count: 3, suffix: "+" },
    { label: "projects live", value: "9", count: 9 },
    { label: "reply time", value: "24h", count: 24, suffix: "h" },
  ] satisfies Stat[],
  sample: true,
};
