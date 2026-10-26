import Image from "next/image";
import { CountUp } from "@/components/live/count-up";
import { site } from "@content/site";

export const Arrow = () => (
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
);

// "Book a call" opens the booking page in a new tab; until it is set, it falls back to email.
export const booking = site.bookingUrl
  ? { href: site.bookingUrl, target: "_blank", rel: "noopener noreferrer" }
  : { href: `mailto:${site.email}?subject=Project%20enquiry` };

// Content strings mark emphasis Markdown-style: *yellow text* and **text on a yellow bar**.
export function Marked({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <span key={i} className="grow">
          {part.slice(2, -2)}
        </span>
      );
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

// A stat or fact value: counts up when `count` is set, with the suffix drawn after it.
export function Value({ value, count, suffix }: { value: string; count?: number; suffix?: string }) {
  if (count === undefined) return <>{value}</>;
  return (
    <>
      <CountUp value={count} />
      {suffix && <i>{suffix}</i>}
    </>
  );
}

export function Avatar({ name, src, small }: { name: string; src?: string; small?: boolean }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className={small ? "avatar sm" : "avatar"} aria-hidden="true">
      {src ? <Image src={src} alt="" fill sizes="46px" /> : initials}
    </span>
  );
}

const STAR = "M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.8z";
export function Stars({ rating }: { rating: number }) {
  const n = Math.round(rating);
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );
}
