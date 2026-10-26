// Quotes for the "Proof, not promises" card on /portfolio. It rotates through them in this order.
// These are placeholders: replace each with a real quote and the person's real name and role,
// then delete `sample: true`. Put photos in public/people/ and set `avatar`; without one, initials show.
// `id` lets a case study link to the quote (its `testimonial:` field); `project` is the case-study slug.
import type { Testimonial, WorkedWith } from "@/lib/content/schema";

export const testimonials: Testimonial[] = [
  {
    id: "booking-flow",
    quote:
      "Bonavee rebuilt our booking flow in three weeks. Customers stopped calling to confirm appointments, and our team got hours back every week.",
    name: "Client name",
    role: "Founder",
    company: "Company name",
    featured: true,
    sample: true,
  },
  {
    id: "weekly-demos",
    quote:
      "He asks the questions nobody else asks, then ships exactly what we agreed. The weekly demos meant there were no surprises at launch.",
    name: "Teammate name",
    role: "Product lead",
    company: "Company name",
    sample: true,
  },
  {
    id: "docchat-client",
    quote:
      "Our document assistant answers staff questions in seconds with sources attached. It paid for itself in the first month.",
    name: "Client name",
    role: "Operations manager",
    company: "Company name",
    project: "docchat",
    sample: true,
  },
];

// The "Worked with" row. Add `logo: "/logos/name.svg"` to show a logo instead of the name.
export const workedWith: WorkedWith[] = [
  { name: "Eco-Cyclers" },
  { name: "SustyVibes" },
  { name: "Edunamic" },
];
