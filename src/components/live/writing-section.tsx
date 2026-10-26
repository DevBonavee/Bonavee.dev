import { Container } from "@/components/container";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
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

// `limit` trims the list on the homepage, which then links to /writing for the rest.
export async function WritingSection({ limit }: { limit?: number }) {
  const all = await getPosts();
  const posts = limit && all ? all.slice(0, limit) : all;

  return (
    <section className="block" id="writing">
      <Container>
        <SecHead
          path={
            <>
              bonavee120.medium.com/<b>feed</b>
            </>
          }
          title={
            <>
              My <em>writing</em>
            </>
          }
        >
          Pulled from my Medium. New posts appear here automatically.
        </SecHead>

        {posts?.length ? (
          <ul className="posts">
            {posts.map((p, i) => (
              <Reveal as="li" key={p.link} i={i}>
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
              </Reveal>
            ))}
          </ul>
        ) : null}
        {posts?.length && limit ? (
          <p className="all-posts">
            <Link href="/writing">All posts →</Link>
          </p>
        ) : null}
        {posts?.length ? null : (
          <div className="card unavailable" role="status">
            <span>{posts ? "No posts yet." : "Medium is unavailable right now."}</span>
            <a href={MEDIUM} target="_blank" rel="noopener noreferrer">
              Read on Medium ↗
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
