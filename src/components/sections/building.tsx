import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { getBuilding } from "@/lib/building";
import { InlineCode, SampleTag, SecHead } from "./sec-head";

export async function Building() {
  const now = await getBuilding();

  return (
    <section className="block" id="building">
      <Container>
        <SecHead
          path={
            <>
              ~/now/<b>building.md</b>
            </>
          }
          title={
            <>
              Currently <em>building</em>
            </>
          }
        >
          {now.live
            ? "The repo I pushed to most recently, with its latest commits. It updates on its own."
            : "The one project getting most of my hours right now, with progress notes as I ship."}
        </SecHead>

        <div className="build">
          <Reveal i={0}>
            <article className="card spot feature">
              <div className="top">
                <span className="tag y">In progress</span>
                {now.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
                <SampleTag show={now.sample} />
              </div>
              <h3>
                {now.url ? (
                  <a href={now.url} target="_blank" rel="noopener noreferrer">
                    {now.title}
                    <span className="sr-only"> on GitHub (opens in a new tab)</span>
                  </a>
                ) : (
                  now.title
                )}
              </h3>
              <p>{now.description}</p>
              {now.preview && (
                <div className="mini-ui" aria-hidden="true">
                  <div className="side">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="main">
                    <div className="chat u">{now.preview.prompt}</div>
                    <div className="chat a">{now.preview.reply}</div>
                    <div className="chat a w-16">
                      <span className="typing">
                        <b />
                        <b />
                        <b />
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {now.progress && (
                <div className="progress">
                  <div className="row">
                    <span>{now.progress.label}</span>
                    <span className="text-accent-text">{now.progress.percent}%</span>
                  </div>
                  <div
                    className="bar"
                    role="progressbar"
                    aria-label={now.progress.label}
                    aria-valuenow={now.progress.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <i style={{ "--w": `${now.progress.percent}%` } as React.CSSProperties} />
                  </div>
                </div>
              )}
              {!now.progress && now.activity && (
                <div className="progress activity">
                  <div className="row">
                    <span>
                      <b className="text-accent-text">
                        {now.activity.commits30}
                        {now.activity.commits30 >= 20 ? "+" : ""}
                      </b>{" "}
                      commit{now.activity.commits30 === 1 ? "" : "s"} in the last 30 days
                    </span>
                    <span>last push {now.activity.lastPush}</span>
                  </div>
                </div>
              )}
              {now.url && (
                <div className="links">
                  <a href={now.url} target="_blank" rel="noopener noreferrer">
                    View on GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              )}
            </article>
          </Reveal>

          <Reveal i={1}>
            <article className="card log">
              <h3>
                {now.live ? "Latest commits" : "Progress notes"} <SampleTag show={now.sample} />
              </h3>
              <ol className="commits">
                {now.notes.map((n) => (
                  <li key={`${n.date}-${n.text}`} className={n.state}>
                    <span className="node" aria-hidden="true" />
                    <div>
                      <div className="meta">
                        {n.date}
                        {n.state === "now" && " · in progress"}
                      </div>
                      <div className="msg">
                        <InlineCode text={n.text} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
