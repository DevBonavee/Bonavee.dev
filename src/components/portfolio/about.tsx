import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { SecHead } from "@/components/sections/sec-head";
import { about } from "@/lib/content";
import { getHeroPhotos } from "@/lib/hero-photos";
import { publicFileExists } from "@/lib/public-file";
import { site } from "@content/site";
import { Arrow, booking, Value } from "./bits";

export function About() {
  const photo = publicFileExists(about.photo) ? about.photo : getHeroPhotos()[0]?.src;

  return (
    <section className="block" id="about">
      <Container>
        <SecHead
          path={
            <>
              bonavee.dev/portfolio<b>#about</b>
            </>
          }
          title={
            <>
              From operations <em>to code</em>
            </>
          }
        />
        <div className="about">
          {photo && (
            <Reveal>
              <figure className="about-photo">
                <Image
                  src={photo}
                  alt={site.name}
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 900px) 320px, 100vw"
                />
                <figcaption className="mono">{site.name}</figcaption>
              </figure>
            </Reveal>
          )}
          <Reveal i={1} className="about-story">
            <p className="about-lead">{about.lead}</p>
            {about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <a className="btn magnetic" {...booking}>
              Book a call <Arrow />
            </a>
            {about.facts.length > 0 && (
              <dl className="card about-facts">
                {about.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>
                      {f.count === undefined ? (
                        f.value
                      ) : (
                        <>
                          <b>
                            <Value value={f.value} count={f.count} />
                          </b>
                          {f.suffix}
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
