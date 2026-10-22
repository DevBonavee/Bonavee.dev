import { Fragment } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SecHead } from "./sec-head";

const FRONTEND = ["HTML", "CSS", "Tailwind", "JavaScript", "TypeScript", "React", "Next.js"];
const BACKEND = ["Python", "FastAPI", "SQLModel", "Alembic"];
const FLOW = [
  { name: "Browser", note: 'user clicks "Plan route"' },
  { name: "Next.js", note: "React · TS · Tailwind", hot: true },
  { name: "FastAPI", note: "validates · calls LLM", hot: true },
  { name: "SQLModel", note: "typed models" },
  { name: "Postgres", note: "Alembic migrations" },
];

function TechCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card spot stack-col">
      <h3>
        <span>{title}</span>
        <span aria-hidden="true">{String(items.length).padStart(2, "0")}</span>
      </h3>
      <ul className="tech">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  return (
    <section className="block" id="stack">
      <div className="wrap">
        <SecHead
          path={
            <>
              ~/<b>package.json</b> + <b>pyproject.toml</b>
            </>
          }
          title={
            <>
              The <em>stack</em>
            </>
          }
        >
          Typed on both ends. A request runs through all of this on a normal day.
        </SecHead>

        <div className="stack-grid">
          <Reveal i={0}>
            <TechCard title="Frontend" items={FRONTEND} />
          </Reveal>
          <Reveal i={1}>
            <TechCard title="Backend" items={BACKEND} />
          </Reveal>
          <Reveal i={2} className="col-span-full">
            <div className="card pipeline">
              <h3>How a request flows</h3>
              <ol className="pipe">
                {FLOW.map((n, i) => (
                  <Fragment key={n.name}>
                    {i > 0 && (
                      <li className="wire" aria-hidden="true">
                        <i style={{ "--dl": `${(i - 1) * 0.45}s` } as React.CSSProperties} />
                      </li>
                    )}
                    <li className={n.hot ? "pnode hot" : "pnode"}>
                      <b>{n.name}</b>
                      <small>{n.note}</small>
                    </li>
                  </Fragment>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
