// The "From operations to code" section on /portfolio. Without `photo`, the first hero photo is used.
// `count` makes a fact's number count up when it scrolls into view; `suffix` follows it.
import type { About } from "@/lib/content/schema";

export const about: About = {
  lead: "I spent three years running operations: moving trucks, budgets and volunteers so community projects shipped on time. Now I build the software that makes that kind of work easier.",
  body: [
    "That background is why I start every project by asking what changes for the person using it. I write typed, tested code on both ends, explain trade-offs in plain language, and stay around after launch.",
    "Outside client work I volunteer with climate communities, speak on environmental topics, and write about what I learn building with AI.",
  ],
  facts: [
    { label: "Initiatives led", value: "10+", count: 10, suffix: "+" },
    { label: "Community members engaged", value: "100+", count: 100, suffix: "+" },
    { label: "Languages", value: "English, Igbo" },
  ],
};
