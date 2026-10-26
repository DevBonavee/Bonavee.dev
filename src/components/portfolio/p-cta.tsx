import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@content/site";
import { Arrow, booking } from "./bits";

export function PortfolioCta() {
  return (
    <section className="pcta" id="cta">
      <Container>
        <Reveal>
          <div className="card pcta-card">
            <div>
              <div className="path mono">
                ~/<b>next-step</b>
              </div>
              <h2>
                Have a project <em>in mind?</em>
              </h2>
              <p>Book a free 30-minute call. You&apos;ll get a written scope and price within 48 hours.</p>
            </div>
            <div className="pcta-actions">
              <a className="btn magnetic" {...booking}>
                Book a call <Arrow />
              </a>
              <a className="mono pmail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
