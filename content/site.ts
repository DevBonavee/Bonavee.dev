// Site-wide details. Edit freely: the nav, contact section and footer read from here.
export const site = {
  name: "Chukwuebuka Bonaventure Nnamah",
  short: "Bonavee",
  role: "Full-stack developer working with AI",
  // The "OPEN" pill at the top of the hero. Set open: false to hide it.
  availability: { open: true, label: "Taking new projects this quarter" },
  email: "chukwuebukannamah@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonavee.dev",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  github: "Bonvee120",
  socials: {
    github: "https://github.com/Bonvee120",
    linkedin: "https://www.linkedin.com/in/chukwuebuka-bonaventure-nnamah",
    x: "https://x.com/Bonaventure_NC",
    facebook: "https://www.facebook.com/share/1k1Eg1R8u1/",
    medium: "https://bonavee120.medium.com",
  },
} as const;

// Nav links, in order. `id` is the homepage section the underline follows while scrolling `/`.
export const navLinks = [
  { id: "top", label: "home", href: "/" },
  { id: "portfolio", label: "portfolio", href: "/portfolio" },
  { id: "building", label: "now", href: "/#building" },
  { id: "github", label: "github", href: "/#github" },
  { id: "reading", label: "reading", href: "/#reading" },
  { id: "writing", label: "writing", href: "/#writing" },
  { id: "resume", label: "resume", href: "/#resume" },
] as const;
