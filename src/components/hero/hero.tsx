import { cvs } from "@content/cvs";
import { site } from "@content/site";
import { getHeroPhotos } from "@/lib/hero-photos";
import { CodeName } from "./code-name";
import { FieldCanvas } from "./field-canvas";
import { Greeting } from "./greeting";
import { PhotoCarousel } from "./photo-carousel";
import { Rotator } from "./rotator";
import { StatusCard } from "./status-card";

const PHRASES = ["Next.js frontends", "FastAPI backends", "AI agents", "products people use"];

export function Hero() {
  const photos = getHeroPhotos();
  const cv = cvs[0];

  return (
    <header className="hero" id="top">
      <FieldCanvas />
      <div className="wrap hero-grid">
        <div>
          <Greeting />
          <p className="fullname">
            <b>{site.name}</b>
            <span className="fn-role"> · Full-stack &amp; AI</span>
          </p>
          <CodeName />
          <p className="lede">
            Full-stack developer working with AI. I build <Rotator phrases={PHRASES} />
            <br />
            from the first schema to the last pixel.
          </p>
          <div className="cta-row">
            <a className="btn magnetic" href="#portfolio">
              See my portfolio
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
            </a>
            {cv && (
              <a className="btn ghost magnetic" href={`/cv/${cv.file}`} download>
                Download résumé
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="hero-right">
          <PhotoCarousel photos={photos} />
          <StatusCard />
        </div>
      </div>
    </header>
  );
}
