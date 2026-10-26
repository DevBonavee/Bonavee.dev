import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

const ITEMS = ["Case studies", "Services & prices", "Process", "Testimonials"];

// The homepage's bridge to /portfolio, the page that does the selling.
export function Hire() {
  return (
    <section className="hire block" id="hire">
      <Container>
        <Reveal>
          <Link className="card spot hire-card" href="/portfolio">
            <div>
              <div className="path mono">
                bonavee.dev/<b>portfolio</b>
              </div>
              <h2>
                Looking to <em>hire?</em>
              </h2>
              <p>
                Case studies with real results, services and prices, how I work, and what clients say. All on
                one page.
              </p>
            </div>
            <ul className="hire-list mono">
              {ITEMS.map((t) => (
                <li key={t}>→ {t}</li>
              ))}
            </ul>
            <span className="btn">
              Open the portfolio
              <svg
                className="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
