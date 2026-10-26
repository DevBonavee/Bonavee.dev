import { Container } from "@/components/container";
import { SampleTag } from "@/components/sections/sec-head";
import { portfolio } from "@/lib/content";
import { AvailLine } from "./avail-line";
import { Arrow, booking, Marked, Value } from "./bits";

const JUMPS = [
  { href: "#work", label: "Case studies" },
  { href: "#proof", label: "Proof" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

// The value line: what I build and why it matters, with the proof numbers beside it.
export function PortfolioHero() {
  return (
    <header className="phero" id="top">
      <Container>
        <div className="phero-main">
          <div className="path mono">
            bonavee.dev/<b>portfolio</b>
          </div>
          <h1 className="phero-h">
            <Marked text={portfolio.headline} />
          </h1>
          <p className="phero-sub">{portfolio.subline}</p>
          <div className="cta-row">
            <a className="btn magnetic" {...booking}>
              Book a call <Arrow />
            </a>
            <a className="btn ghost magnetic" href="#work">
              See case studies
            </a>
          </div>
        </div>
        <aside className="card phero-card" aria-label="At a glance">
          <AvailLine />
          <dl className="pstats">
            {portfolio.stats.map((st) => (
              <div key={st.label}>
                <dt>{st.label}</dt>
                <dd>
                  <b>
                    <Value value={st.value} count={st.count} suffix={st.suffix} />
                  </b>
                </dd>
              </div>
            ))}
          </dl>
          <nav className="pjump" aria-label="On this page">
            {JUMPS.map((j) => (
              <a key={j.href} href={j.href}>
                {j.label}
              </a>
            ))}
          </nav>
          <SampleTag show={portfolio.sample}>sample numbers</SampleTag>
        </aside>
      </Container>
    </header>
  );
}
