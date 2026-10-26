import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Placeholder } from "@/components/sections/portfolio";
import { SampleTag, SecHead } from "@/components/sections/sec-head";
import { getCaseStudies, type CaseStudy } from "@/lib/case-studies";
import { CATEGORIES } from "@/lib/content/schema";
import { publicFileExists } from "@/lib/public-file";
import { WorkGrid } from "./work-grid";

function CaseCard({ cs, i }: { cs: CaseStudy; i: number }) {
  const cover = publicFileExists(cs.cover) ? cs.cover : undefined;
  return (
    <article className="card proj tilt">
      <div className="shot">
        <div className="win">
          <div className="chrome" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          {cover ? (
            <div className="screen">
              <Image
                src={cover}
                alt={`Screenshot of ${cs.title}`}
                fill
                sizes="(min-width: 1180px) 440px, (min-width: 720px) 50vw, 100vw"
              />
            </div>
          ) : (
            <Placeholder variant={i % 3} />
          )}
        </div>
      </div>
      <div className="body">
        <h3>
          {cs.title}
          <SampleTag show={cs.draft} />
        </h3>
        <p>{cs.summary}</p>
        <div className="chips">
          {cs.stack.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="results">
          {cs.results.slice(0, 2).map((r) => (
            <div key={r.label}>
              <b>{r.value}</b>
              <small>{r.label}</small>
            </div>
          ))}
        </div>
        <div className="links">
          <Link className="cs-open" href={`/portfolio/${cs.slug}`}>
            Read case study →<span className="sr-only">: {cs.title}</span>
          </Link>
          {cs.live && (
            <a href={cs.live} target="_blank" rel="noopener noreferrer">
              Live ↗<span className="sr-only"> {cs.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// Featured case studies first; the rest open with "See all". Filter chips appear past five projects.
export function CaseStudies() {
  const studies = getCaseStudies();
  if (studies.length === 0) return null;
  const ordered = [...studies.filter((c) => c.featured), ...studies.filter((c) => !c.featured)];

  return (
    <section className="block" id="work">
      <Container>
        <SecHead
          path={
            <>
              bonavee.dev/portfolio<b>#work</b>
            </>
          }
          title={
            <>
              Case <em>studies</em>
            </>
          }
        >
          My best work, each with the problem, what I built, the stack, and what changed for the people using
          it. <SampleTag show={studies.some((c) => c.draft)}>sample projects</SampleTag>
        </SecHead>
        <WorkGrid
          categories={CATEGORIES}
          items={ordered.map((cs, i) => ({
            key: cs.slug,
            category: cs.category,
            featured: cs.featured,
            card: <CaseCard cs={cs} i={i} />,
          }))}
        />
      </Container>
    </section>
  );
}
