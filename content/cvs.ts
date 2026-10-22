// Role-based résumés. Put each PDF in public/cv/. A new entry here adds a new tab.
// The first entry is the default for the hero "Download résumé" button.
export type Cv = { role: string; file: string; pages: number; summary: string };

export const cvs: Cv[] = [
  {
    role: "Full-stack",
    file: "Nnamah_CV_FullStack.pdf",
    pages: 2,
    summary:
      "Full-stack developer who ships end to end, from FastAPI services and SQLModel schemas to Next.js interfaces, backed by three years of leading projects and teams.",
  },
  {
    role: "Frontend",
    file: "Nnamah_CV_Frontend.pdf",
    pages: 2,
    summary:
      "Frontend developer building fast, accessible interfaces with React, Next.js, TypeScript and Tailwind, with a designer's eye from years of making campaign visuals.",
  },
  {
    role: "Backend",
    file: "Nnamah_CV_Backend.pdf",
    pages: 2,
    summary:
      "Backend developer designing typed Python APIs with FastAPI, SQLModel and Alembic, bringing an operations manager's habit of planning for scale and cost.",
  },
  {
    role: "AI / ML",
    file: "Nnamah_CV_AI.pdf",
    pages: 2,
    summary:
      "AI engineer building LLM features people actually use: agents, retrieval and streaming chat, wired into real products with FastAPI and Next.js.",
  },
];
