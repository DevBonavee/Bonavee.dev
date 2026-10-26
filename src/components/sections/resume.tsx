import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { cvs } from "@content/cvs";
import { education, experience, facts } from "@content/resume";
import { CvTabs } from "./cv-tabs";
import { SecHead } from "./sec-head";

export function Resume() {
  return (
    <section className="block" id="resume">
      <Container>
        <SecHead
          path={
            <>
              ~/<b>resume.pdf</b>
            </>
          }
          title={
            <>
              The <em>résumé</em>
            </>
          }
        >
          A builder with an operations background: I&apos;ve led teams, run budgets and shipped projects on
          time.
        </SecHead>

        <div className="resume">
          <Reveal i={0}>
            <aside className="card r-side" aria-label="Résumé downloads">
              <CvTabs cvs={cvs} />
              <dl>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>

          <Reveal i={1}>
            <div className="card timeline">
              <div className="tl-group">
                <h3 className="eyebrow">Experience</h3>
                {experience.map((j) => (
                  <div key={`${j.role}-${j.org}`} className="job">
                    <div className="when">
                      {j.when} {j.live && <span className="live">now</span>}
                    </div>
                    <div>
                      <h4>
                        {j.role} <span>· {j.org}</span>
                      </h4>
                      {j.points.length > 0 && (
                        <ul>
                          {j.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="tl-group">
                <h3 className="eyebrow">Education</h3>
                {education.map((e) => (
                  <div key={e.title} className="job">
                    <div className="when">{e.when}</div>
                    <div>
                      <h4>
                        {e.title} <span>· {e.org}</span>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
