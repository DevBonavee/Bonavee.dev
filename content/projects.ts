// Portfolio cards. Most cards come from GitHub automatically: any repo with the
// "portfolio" topic shows up, newest first, with its live URL (repo "Website" field,
// else latest production deployment, else GitHub Pages). Optional screenshot:
// public/projects/<repo-name>.png. Entries below are extra, manual cards shown after those.
// Sample entries hide once a real portfolio repo exists.
// Put screenshots in public/projects/ (16:10 works best).
// If the image file is missing, the card shows a drawn placeholder instead.
// `sample: true` shows a dashed "sample" tag; remove it once the project is real.
export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo?: string;
  source?: string;
  sample?: boolean;
};

export const projects: Project[] = [
  {
    title: "LedgerLite",
    description: "Sales and expense tracking for market traders, with daily summaries sent by SMS.",
    image: "/projects/ledgerlite.png",
    tags: ["Next.js", "FastAPI", "SQLModel"],
    source: "https://github.com/Bonvee120",
    sample: true,
  },
  {
    title: "DocChat",
    description: "Ask questions about your PDFs. Retrieval over embeddings with cited answers.",
    image: "/projects/docchat.png",
    tags: ["React", "Python", "RAG"],
    source: "https://github.com/Bonvee120",
    sample: true,
  },
  {
    title: "SustyHub",
    description: "Volunteer events board for climate communities, with sign-ups and check-ins.",
    image: "/projects/sustyhub.png",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    source: "https://github.com/Bonvee120",
    sample: true,
  },
];
