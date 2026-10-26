import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";
import { getPortfolio } from "@/lib/portfolio";
import { SampleTag, SecHead } from "./sec-head";

// Drawn stand-ins for a missing screenshot, cycling through three looks.
export function Placeholder({ variant }: { variant: number }) {
  if (variant === 1)
    return (
      <div className="canvas" aria-hidden="true">
        <div className="sk y w-[35%]" />
        <div className="chat a sm">Summarise this PDF in 5 bullets</div>
        <div className="chat u sm">1. Revenue grew 18%…</div>
        <div className="sk w-[55%]" />
      </div>
    );
  if (variant === 2)
    return (
      <div className="canvas" aria-hidden="true">
        <div className="sk big w-[45%]" />
        <div className="tiles">
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="canvas" aria-hidden="true">
      <div className="sk big" />
      <div className="sk w-[80%]" />
      <div className="bars">
        {[40, 70, 55, 90, 65, 100, 75].map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export async function Portfolio() {
  const projects = await getPortfolio();
  const anySample = projects.some((p) => p.sample);

  return (
    <section className="block" id="projects">
      <Container>
        <SecHead
          path={
            <>
              bonavee.dev/portfolio<b>#projects</b>
            </>
          }
          title={
            <>
              My <em>projects</em>
            </>
          }
        >
          Live sites I built, with the source. New repos show up here on their own.{" "}
          <SampleTag show={anySample}>sample projects</SampleTag>
        </SecHead>

        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.source ?? p.title} i={i}>
              <article className="card proj tilt">
                <div className="shot">
                  <div className="win">
                    <div className="chrome" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    {p.image ? (
                      <div className="screen">
                        <Image
                          src={p.image}
                          alt={`Screenshot of ${p.title}`}
                          fill
                          unoptimized={p.remote}
                          sizes="(min-width: 1180px) 360px, (min-width: 720px) 50vw, 100vw"
                        />
                      </div>
                    ) : (
                      <Placeholder variant={i % 3} />
                    )}
                  </div>
                </div>
                <div className="body">
                  <h3>
                    {p.title}
                    <SampleTag show={p.sample} />
                  </h3>
                  <p>{p.description}</p>
                  <div className="chips">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  {(p.demo || p.source) && (
                    <div className="links">
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer">
                          Live demo ↗<span className="sr-only"> for {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {p.source && (
                        <a href={p.source} target="_blank" rel="noopener noreferrer">
                          Source ↗<span className="sr-only"> for {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
