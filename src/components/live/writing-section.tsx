import { site } from "@content/site";
import { getPosts } from "@/lib/medium";
import { SecHead } from "../sections/sec-head";

const MEDIUM = site.socials.medium;

function postDate(iso: string) {
  const d = new Date(iso);
  const sameYear = d.getUTCFullYear() === new Date().getUTCFullYear();
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
    timeZone: "UTC",
  });
}

export async function WritingSection() {
  const posts = await getPosts();

  return (
    <section className="block" id="writing">
      <div className="wrap">
        <SecHead
          path={
            <>
              bonavee120.medium.com/<b>feed</b>
            </>
          }
          title={
            <>
              Notes from <em>the build</em>
            </>
          }
        >
          Pulled from my Medium. New posts appear here automatically.
        </SecHead>

        {posts?.length ? (
          <ul className="posts">
            {posts.map((p) => (
              <li key={p.link}>
                <a className="post" href={p.link} target="_blank" rel="noopener noreferrer">
                  <span className="pm">
                    <time dateTime={p.date}>{postDate(p.date)}</time> · {p.minutes} min
                  </span>
                  <h3>{p.title}</h3>
                  <span className="pr">
                    Read on Medium
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card unavailable" role="status">
            <span>{posts ? "No posts yet." : "Medium is unavailable right now."}</span>
            <a href={MEDIUM} target="_blank" rel="noopener noreferrer">
              Read on Medium ↗
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
