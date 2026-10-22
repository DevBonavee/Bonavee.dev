import { now } from "@content/now";
import { InlineCode, SampleTag, SecHead } from "./sec-head";

export function Building() {
  const progress = Math.max(0, Math.min(100, now.progress));

  return (
    <section className="block" id="building">
      <div className="wrap">
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
          The one project getting most of my hours right now, with progress notes as I ship.
        </SecHead>

        <div className="build">
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
            <h3>{now.title}</h3>
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
            <div className="progress">
              <div className="row">
                <span>{now.milestone}</span>
                <span className="text-accent-text">{progress}%</span>
              </div>
              <div
                className="bar"
                role="progressbar"
                aria-label={now.milestone}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <i style={{ "--w": `${progress}%` } as React.CSSProperties} />
              </div>
            </div>
          </article>

          <article className="card log">
            <h3>
              Progress notes <SampleTag show={now.sample} />
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
        </div>
      </div>
    </section>
  );
}
