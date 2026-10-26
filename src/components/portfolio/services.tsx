import { Fragment } from "react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { SampleTag, SecHead } from "@/components/sections/sec-head";
import { services, servicesSample } from "@/lib/content";
import type { Service } from "@/lib/content/schema";

const ICONS: Record<Service["icon"], React.ReactNode> = {
  automation: (
    <>
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M7.5 12h4l3.5-5M11.5 12l3.5 5" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M8 21h8M12 18v3" />
    </>
  ),
  ai: <path d="M12 3l2.2 5.6L20 9.3l-4.4 3.8 1.4 5.9L12 16l-5 3 1.4-5.9L4 9.3l5.8-.7z" />,
  api: (
    <>
      <path d="M4 6h16M4 12h16M4 18h10" />
      <circle cx="19" cy="18" r="2" />
    </>
  ),
  site: <path d="M4 4h16v16H4zM4 9h16M9 9v11" />,
};

// The featured card's workflow strip: the middle steps glow, dots travel the dashed links.
function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flow" role="img" aria-label={`Example workflow: ${steps.join(" → ")}`}>
      {steps.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && (
            <span className="fw" aria-hidden="true">
              <i style={{ "--dl": `${(i - 1) * 0.5}s` } as React.CSSProperties} />
            </span>
          )}
          <span className={i > 0 && i < steps.length - 1 ? "fnode hot" : "fnode"} aria-hidden="true">
            {s}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function Services() {
  return (
    <section className="block" id="services">
      <Container>
        <SecHead
          path={
            <>
              bonavee.dev/portfolio<b>#services</b>
            </>
          }
          title={
            <>
              What you can <em>hire me</em> for
            </>
          }
        >
          Fixed-scope projects or ongoing work. Every build is typed end to end, tested, and handed over with
          docs. <SampleTag show={servicesSample}>sample prices</SampleTag>
        </SecHead>
        <div className="services">
          {services.map((s, i) => (
            <Reveal key={s.title} i={i} className={s.featured ? "svc-feat" : undefined}>
              <article className="card spot svc">
                <span className="svc-ic" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[s.icon]}
                  </svg>
                </span>
                {s.featured && <span className="tag y feat-tag">Most requested</span>}
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                {s.featured && s.flow && s.flow.length > 1 && <Flow steps={s.flow} />}
                <ul>
                  {s.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {s.priceFrom && (
                  <div className="price">
                    from <b>{s.priceFrom}</b>
                    {s.priceUnit && ` ${s.priceUnit}`}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
