import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { SampleTag, SecHead } from "@/components/sections/sec-head";
import { portfolio, testimonials, workedWith } from "@/lib/content";
import { Avatar } from "./bits";
import { QuoteRotator } from "./quote-rotator";

// "Proof, not promises": the rotating testimonial, who I've worked with, and certifications.
export function Proof() {
  // Featured quotes lead the rotation.
  const quotes = [...testimonials.filter((t) => t.featured), ...testimonials.filter((t) => !t.featured)];

  return (
    <section className="block" id="proof">
      <Container>
        <SecHead
          path={
            <>
              bonavee.dev/portfolio<b>#proof</b>
            </>
          }
          title={
            <>
              Proof, not <em>promises</em>
            </>
          }
        >
          From clients and teammates.{" "}
          <SampleTag show={testimonials.some((t) => t.sample)}>
            sample quotes: replace with real ones
          </SampleTag>
        </SecHead>
        <div className="testi">
          {quotes.length > 0 && (
            <Reveal>
              <QuoteRotator
                quotes={quotes.map((t) => ({
                  quote: t.quote,
                  name: t.name,
                  role: t.role,
                  company: t.company,
                  avatar: <Avatar name={t.name} src={t.avatar} />,
                }))}
              />
            </Reveal>
          )}

          {workedWith.length > 0 && (
            <Reveal className="logos">
              <span className="eyebrow">Worked with</span>
              <div className="logo-row">
                {workedWith.map((w) =>
                  w.logo ? (
                    <Image key={w.name} src={w.logo} alt={w.name} width={120} height={28} />
                  ) : (
                    <span key={w.name}>{w.name}</span>
                  ),
                )}
              </div>
            </Reveal>
          )}

          {portfolio.certifications.length > 0 && (
            <Reveal className="certs">
              <span className="eyebrow">Certifications &amp; awards</span>
              <div className="cert-row">
                {portfolio.certifications.map((c) => (
                  <div key={c.title} className="card cert">
                    <span className="cert-ic" aria-hidden="true">
                      {c.icon === "star" ? "★" : "✓"}
                    </span>
                    <b>{c.title}</b>
                    <small>{c.year ? `${c.issuer} · ${c.year}` : c.issuer}</small>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
