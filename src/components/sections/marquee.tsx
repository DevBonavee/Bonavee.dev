const WORDS = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind",
  "FastAPI",
  "Python",
  "SQLModel",
  "Alembic",
  "LLM agents",
  "n8n",
  "Zapier",
  "JavaScript",
];

// Yellow band of stack words scrolling forever. Two copies make the loop seamless.
export function Marquee() {
  return (
    <div className="marquee">
      <p className="sr-only">Tech stack: {WORDS.join(", ")}</p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => WORDS.map((w) => <span key={`${copy}-${w}`}>{w}</span>))}
      </div>
    </div>
  );
}
