import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Avatar, booking } from "@/components/portfolio/bits";
import { Gallery } from "@/components/portfolio/gallery";
import { SampleTag } from "@/components/sections/sec-head";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { publicFileExists } from "@/lib/public-file";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return {
    title: `${cs.title}: case study`,
    description: cs.summary,
    alternates: { canonical: `/portfolio/${cs.slug}` },
  };
}

// Splits the Markdown body on its "## " headings, so "The problem" and "What I built" can sit side by side.
function sections(body: string) {
  const out: { title: string; md: string }[] = [];
  for (const chunk of body.split(/^## +/m)) {
    const nl = chunk.indexOf("\n");
    const title = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
    const md = nl === -1 ? "" : chunk.slice(nl + 1).trim();
    if (title || md) out.push({ title, md });
  }
  return out;
}

function Section({ title, md }: { title: string; md: string }) {
  return (
    <section className="cs-sec">
      {title && <h2>{title}</h2>}
      <MDXRemote source={md} />
    </section>
  );
}

const SIDE_BY_SIDE = ["the problem", "what i built"];

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const all = getCaseStudies();
  const at = all.findIndex((c) => c.slug === cs.slug);
  const prev = at > 0 ? all[at - 1] : undefined;
  const next = at < all.length - 1 ? all[at + 1] : undefined;

  const parts = sections(cs.body);
  const cols = parts.filter((p) => SIDE_BY_SIDE.includes(p.title.toLowerCase()));
  const rest = parts.filter((p) => !SIDE_BY_SIDE.includes(p.title.toLowerCase()));
  const gallery = cs.gallery.filter((src) => publicFileExists(src));
  const quote = cs.testimonialQuote;

  const meta = [
    { k: "Role", v: cs.role },
    { k: "Timeline", v: cs.timeline },
    { k: "Stack", v: cs.stack.join(", ") },
    ...(cs.client ? [{ k: "Client", v: cs.client }] : []),
  ];

  return (
    <main className="cs-page">
      <Container>
        <article className="cs-sheet">
          <div className="cs-bar">
            <span className="mono cs-path">
              bonavee.dev/portfolio/<b>{cs.slug}</b>
            </span>
            <Link className="mono" href="/portfolio#work">
              ← All case studies
            </Link>
          </div>
          <div className="cs-body">
            <header className="cs-head">
              <SampleTag show={cs.draft}>sample case study</SampleTag>
              <h1>{cs.title}</h1>
              <p className="cs-sum">{cs.summary}</p>
              <dl className="cs-meta">
                {meta.map((m) => (
                  <div key={m.k}>
                    <dt>{m.k}</dt>
                    <dd>{m.v}</dd>
                  </div>
                ))}
              </dl>
            </header>

            <div className="cs-metrics">
              {cs.results.map((r, k) => (
                <div key={r.label} style={{ "--k": k } as React.CSSProperties}>
                  <b>{r.value}</b>
                  <small>{r.label}</small>
                </div>
              ))}
            </div>

            {cols.length > 0 && (
              <div className="cs-cols">
                {cols.map((p) => (
                  <Section key={p.title} {...p} />
                ))}
              </div>
            )}
            {rest.map((p) => (
              <Section key={p.title || "intro"} {...p} />
            ))}

            {gallery.length > 0 && <Gallery title={cs.title} images={gallery} />}

            {quote && (
              <figure className="card quote-big cs-quote">
                <svg className="qmark" viewBox="0 0 48 36" fill="currentColor" aria-hidden="true">
                  <path d="M0 36V20C0 8 7 1 19 0v7c-6 1-9 5-9 11h9v18zm29 0V20C29 8 36 1 48 0v7c-6 1-9 5-9 11h9v18z" />
                </svg>
                <blockquote>{quote.quote}</blockquote>
                <figcaption>
                  <Avatar name={quote.name} src={quote.avatar} />
                  <span>
                    <b>{quote.name}</b>
                    <small>
                      {quote.role}, {quote.company}
                    </small>
                  </span>
                  <SampleTag show={quote.sample} />
                </figcaption>
              </figure>
            )}

            <div className="cs-links">
              {cs.live && (
                <a className="btn" href={cs.live} target="_blank" rel="noopener noreferrer">
                  Visit live site ↗
                </a>
              )}
              {cs.source && (
                <a className="btn ghost" href={cs.source} target="_blank" rel="noopener noreferrer">
                  View source ↗
                </a>
              )}
              <a className={cs.live ? "btn ghost" : "btn"} {...booking}>
                Start a project like this
              </a>
            </div>

            {(prev || next) && (
              <nav className="cs-nav" aria-label="More case studies">
                {prev && (
                  <Link href={`/portfolio/${prev.slug}`}>
                    <small>← Previous</small>
                    <b>{prev.title}</b>
                  </Link>
                )}
                {next && (
                  <Link className="next" href={`/portfolio/${next.slug}`}>
                    <small>Next →</small>
                    <b>{next.title}</b>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </article>
      </Container>
    </main>
  );
}
