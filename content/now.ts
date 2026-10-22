// "Currently building": the one project getting most of the hours right now.
// `sample: true` shows a dashed "sample" tag; remove it once this is real.
export type NowNote = { date: string; text: string; state: "done" | "now" };

export type Now = {
  title: string;
  description: string;
  tags: string[];
  progress: number; // 0-100
  milestone: string;
  notes: NowNote[]; // newest first
  preview?: { prompt: string; reply: string }; // chat bubbles in the little UI preview
  sample?: boolean;
};

export const now: Now = {
  title: "Waste pickups, routed by an AI dispatcher",
  description:
    "A route-planning assistant for community waste collectors. Drivers describe the day in plain language and the agent turns it into an ordered pickup route, built on what I learned running operations at Eco-Cyclers.",
  tags: ["Next.js", "FastAPI", "OpenAI / Claude"],
  progress: 68,
  milestone: "v0.4 milestone",
  notes: [
    { date: "today", text: "Streaming the agent's route plan into the UI token by token", state: "now" },
    {
      date: "Oct 17",
      text: "Added `Stop` and `Route` models with SQLModel, first Alembic migration",
      state: "done",
    },
    { date: "Oct 12", text: "FastAPI endpoints for routes, with auth and rate limits", state: "done" },
    {
      date: "Oct 05",
      text: "Interviewed 4 waste collectors about how they plan pickups today",
      state: "done",
    },
  ],
  preview: {
    prompt: "Plan today's north-side pickups, 14 stops",
    reply: "Route ready: 14 stops, 38 km, about 2h 10m. Moved the market stops earlier to avoid traffic.",
  },
  sample: true,
};
