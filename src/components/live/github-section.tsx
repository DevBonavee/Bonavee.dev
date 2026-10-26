import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@content/site";
import { getGitHub, type Activity } from "@/lib/github";
import { SecHead } from "../sections/sec-head";
import { ContribGraph } from "./contrib-graph";
import { CountUp } from "./count-up";
import { RelTime } from "./rel-time";

const PROFILE = site.socials.github;

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

const ICONS: Record<Activity["kind"], React.ReactNode> = {
  push: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M3 12h5.5M15.5 12H21" />
    </svg>
  ),
  pr: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5v7M18 15.5V10a3 3 0 0 0-3-3h-4" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
    </svg>
  ),
  repo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  release: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M7 4v16l5-4 5 4V4z" />
    </svg>
  ),
};

function Head() {
  return (
    <SecHead
      path={
        <>
          github.com/<b>{site.github}</b>
        </>
      }
      title={
        <>
          Shipping, <em>daily</em>
        </>
      }
    >
      Live from GitHub. Any repo I tag <span className="text-fg font-mono">portfolio</span> shows up here on
      its own.
    </SecHead>
  );
}

export async function GitHubSection() {
  const gh = await getGitHub();
  const nothing =
    gh.publicRepos === null && gh.repos === null && gh.activity === null && gh.calendar === null;

  const stats = [
    { label: "public repos", value: gh.publicRepos },
    { label: "day streak", value: gh.streak },
    { label: "PRs merged", value: gh.mergedPrs },
    { label: "portfolio repos", value: gh.repos?.length ?? null },
  ].filter((s): s is { label: string; value: number } => s.value !== null);

  return (
    <section className="block" id="github">
      <Container>
        <Head />

        {nothing ? (
          <div className="card unavailable" role="status">
            <span>GitHub is unavailable right now.</span>
            <a href={PROFILE} target="_blank" rel="noopener noreferrer">
              See my profile on GitHub ↗
            </a>
          </div>
        ) : (
          <>
            <div className="gh-grid">
              <Reveal i={0}>
                <div className="card contrib">
                  {gh.calendar ? (
                    <>
                      <div className="contrib-head">
                        <div>
                          <strong>
                            <CountUp value={gh.calendar.total} />
                          </strong>{" "}
                          <span>contributions in the last year</span>
                        </div>
                      </div>
                      <ContribGraph calendar={gh.calendar} />
                      <div className="legend" aria-hidden="true">
                        Less <i data-l="0" />
                        <i data-l="1" />
                        <i data-l="2" />
                        <i data-l="3" />
                        <i data-l="4" /> More
                      </div>
                    </>
                  ) : (
                    <p className="contrib-note">
                      The contribution graph is unavailable right now.{" "}
                      <a href={PROFILE} target="_blank" rel="noopener noreferrer">
                        See it on GitHub ↗
                      </a>
                    </p>
                  )}
                  {stats.length > 0 && (
                    <dl className="gh-stats">
                      {stats.map((s) => (
                        <div key={s.label}>
                          <dt>{s.label}</dt>
                          <dd>
                            <CountUp value={s.value} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </Reveal>

              <Reveal i={1}>
                <aside className="card feed" aria-label="Recent GitHub activity">
                  <h3>Recent activity</h3>
                  {gh.activity?.length ? (
                    <ul>
                      {gh.activity.map((a) => (
                        <li key={a.id}>
                          <span className="ic" aria-hidden="true">
                            {ICONS[a.kind]}
                          </span>
                          <div>
                            <a href={a.url} target="_blank" rel="noopener noreferrer">
                              {a.text} <b>{a.target}</b>
                              {a.suffix && ` ${a.suffix}`}
                            </a>
                            <span className="t">
                              <RelTime iso={a.at} />
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted m-0 text-sm">
                      {gh.activity ? "No public activity lately." : "Activity is unavailable right now."}
                    </p>
                  )}
                </aside>
              </Reveal>
            </div>

            {gh.repos && gh.repos.length > 0 && (
              <div className="repos">
                {gh.repos.map((r, i) => (
                  <Reveal key={r.name} i={i}>
                    <a className="card spot repo" href={r.url} target="_blank" rel="noopener noreferrer">
                      <span className="name">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
                          <path d="M5 17a3 3 0 0 1 3-3h11" />
                        </svg>
                        {r.name}
                      </span>
                      {r.description && <p>{r.description}</p>}
                      <span className="foot">
                        {r.language && (
                          <span className="lang">
                            <i style={{ background: LANG_COLORS[r.language] ?? "var(--faint)" }} />
                            {r.language}
                          </span>
                        )}
                        <span aria-label={`${r.stars} stars`}>★ {r.stars}</span>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
