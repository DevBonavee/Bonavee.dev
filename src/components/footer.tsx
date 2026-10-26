import { site } from "@content/site";
import { Container } from "./container";
import { SOCIAL_ICONS, SOCIAL_ORDER } from "./social-icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.short}
        </span>
        <ul className="socials m-0 list-none p-0">
          {SOCIAL_ORDER.map((k) => (
            <li key={k}>
              <a href={site.socials[k]} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {SOCIAL_ICONS[k].path}
                </svg>
                <span className="sr-only">{SOCIAL_ICONS[k].label} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <span>Built with Next.js · TypeScript · Tailwind · Framer Motion</span>
      </Container>
    </footer>
  );
}
