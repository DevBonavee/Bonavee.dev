// Site-wide details. Edit freely: the nav, contact section and footer read from here.
export const site = {
  name: "Chukwuebuka Bonaventure Nnamah",
  short: "Bonavee",
  role: "Full-stack developer working with AI",
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

// In-page sections linked from the nav, in page order.
export const navLinks = [
  { id: "building", label: "building" },
  { id: "github", label: "github" },
  { id: "portfolio", label: "portfolio" },
  { id: "stack", label: "stack" },
  { id: "reading", label: "reading" },
  { id: "writing", label: "writing" },
  { id: "resume", label: "resume" },
] as const;
