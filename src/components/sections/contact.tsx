import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@content/site";
import { SOCIAL_ICONS as ICONS, SOCIAL_ORDER as ORDER } from "@/components/social-icons";
import { CopyEmail } from "./copy-email";

export function Contact() {
  const booking = site.bookingUrl || `mailto:${site.email}?subject=Let's%20book%20a%20call`;

  return (
    <section className="contact" id="contact">
      <Container className="contact-inner">
        <div>
          <div className="eyebrow mb-[22px]">~/contact</div>
          <h2 className="mega">
            <span className="line">Let&apos;s build</span>
            <span className="line">
              something <span className="y">good.</span>
            </span>
          </h2>
          <ul className="socials">
            {ORDER.map((k) => (
              <li key={k}>
                <a href={site.socials[k]} target="_blank" rel="noopener noreferrer me">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {ICONS[k].path}
                  </svg>
                  <span className="sr-only">{ICONS[k].label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <div className="card book-card">
            <div className="head">
              <h3>Book a 30-min call</h3>
              <span className="tag">Google Calendar</span>
            </div>
            <p>Pick a time that suits you on my Google Calendar booking page.</p>
            <a className="btn magnetic" href={booking} target="_blank" rel="noopener noreferrer">
              Open booking page
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
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <CopyEmail email={site.email} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
