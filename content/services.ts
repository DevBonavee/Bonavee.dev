// "What you can hire me for" on /portfolio. One card per entry, in this order.
// `featured: true` makes the card span two columns with a "Most requested" tag; `flow` is the
// little animated workflow strip on that card. Add `priceFrom` (and optional `priceUnit`) to show a "from $X" line; none are shown now.
// `sample: true` on the export below shows a "sample services" tag; set it to false once the copy is real.
import type { Service } from "@/lib/content/schema";

export const servicesSample = true;

export const services: Service[] = [
  {
    title: "AI automation",
    icon: "automation",
    category: "Automation",
    description:
      "Hand the repetitive work to workflows that run 24/7: leads, follow-ups, reports, inbox triage and data entry, with AI making the judgment calls.",
    deliverables: [
      "n8n and Zapier workflows",
      "AI agents with OpenAI and Claude",
      "Connect Gmail, Sheets, CRMs and Slack",
    ],
    featured: true,
    flow: ["New lead", "n8n", "AI scores it", "CRM + Slack"],
  },
  {
    title: "Web apps",
    icon: "web",
    category: "Web apps",
    description: "Dashboards, portals and SaaS products with accounts, payments and real data.",
    deliverables: ["Next.js + TypeScript", "Auth, roles, payments", "Deployed on Vercel"],
  },
  {
    title: "APIs & backends",
    icon: "api",
    category: "APIs",
    description: "Fast, documented Python APIs with clean data models and safe migrations.",
    deliverables: ["FastAPI + SQLModel", "Postgres + Alembic", "OpenAPI docs"],
  },
  {
    title: "Websites",
    icon: "site",
    category: "Websites",
    description: "Fast, animated marketing sites and landing pages that load in under a second.",
    deliverables: ["Next.js + Tailwind", "Motion and SEO", "Editable content"],
  },
];
