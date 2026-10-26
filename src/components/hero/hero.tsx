import { Container } from "@/components/container";
import Link from "next/link";
import { portfolio } from "@content/portfolio";
import { site } from "@content/site";
import { getHeroPhotos } from "@/lib/hero-photos";
import { CodeName } from "./code-name";
import { FieldCanvas } from "./field-canvas";
import { Greeting } from "./greeting";
import { PhotoCarousel } from "./photo-carousel";
import { Rotator } from "./rotator";
import { StatusCard } from "./status-card";

const PHRASES = [
  "Next.js frontends",
  "FastAPI backends",
  "AI agents",
  "n8n & Zapier automations",
  "products people use",
];

const Arrow = ({ w = "2.4" }: { w?: string }) => (
  <svg
    className="arrow"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={w}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function Hero() {
  const photos = getHeroPhotos();
  const { availability } = site;
  const [label, quarter] = availability.label.split(/(?= this quarter)/);

  return (
    <header className="hero" id="top">
      <FieldCanvas />
      <span className="hero-glow g1" aria-hidden="true" />
      <span className="hero-glow g2" aria-hidden="true" />
      <Container className="hero-grid">
        <div>
          {availability.open && (
            <a className="avail" href="#contact">
              <span className="tag">OPEN</span>
              {label}
              {quarter && <span className="av-q">{quarter}</span>}
              <Arrow />
            </a>
          )}
          <Greeting />
          <p className="fullname">
            <b>{site.name}</b>
            <span className="fn-role"> · Full-stack · AI · Automation</span>
          </p>
          <CodeName />
          <p className="lede">
            Full-stack developer working with AI. I build <Rotator phrases={PHRASES} />
            <br />
            from the first schema to the last pixel.
          </p>
          <div className="cta-row">
            <Link className="btn magnetic" href="/portfolio">
              See my portfolio
              <Arrow />
            </Link>
            <a className="btn ghost magnetic" href="#contact">
              Book a call
              <Arrow w="2.2" />
            </a>
          </div>
          <dl className="hero-stats">
            {portfolio.stats.map((st) => (
              <div key={st.label}>
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <b>
                    {st.suffix ? st.value.slice(0, -st.suffix.length) : st.value}
                    {st.suffix && <i>{st.suffix}</i>}
                  </b>
                  <span aria-hidden="true">{st.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-right">
          <span className="orbit" aria-hidden="true" />
          <span className="orbit o2" aria-hidden="true" />
          <span className="backcard" aria-hidden="true" />
          <PhotoCarousel photos={photos} />
          <StatusCard />
        </div>
      </Container>
      <a className="scroll-cue" href="#hire" aria-label="Scroll down">
        <i />
        scroll
      </a>
    </header>
  );
}
