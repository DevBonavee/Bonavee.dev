import { z } from "zod";

// Shapes for everything in content/. The build checks each file against these, so a typo
// (a missing field, a progress of 120, a month like "Oct 2026") fails with a clear message.

const text = z.string().trim().min(1, "can't be empty");
const publicPath = z.string().regex(/^\/[^\s]*$/, 'must be a path inside public/, starting with "/"');
const url = z.url();
const percent = z.number().min(0).max(100);

// ---------- now.ts ----------
export const nowSchema = z.object({
  repo: z.string().optional(), // pin "Currently building" to this GitHub repo
  title: text,
  description: text,
  tags: z.array(text),
  progress: percent,
  milestone: text,
  notes: z.array(z.object({ date: text, text, state: z.enum(["done", "now"]) })),
  preview: z.object({ prompt: text, reply: text }).optional(),
  sample: z.boolean().optional(),
});

// ---------- books.ts ----------
export const bookSchema = z.object({
  title: text,
  author: text,
  cover: publicPath,
  progress: percent,
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'must look like "2026-10"'),
  sample: z.boolean().optional(),
});

// ---------- cvs.ts ----------
export const cvSchema = z.object({
  role: text,
  file: z.string().regex(/^[\w.-]+\.pdf$/i, 'must be a PDF file name like "Nnamah_CV_AI.pdf"'),
  pages: z.number().int().positive(),
  summary: text,
});

// ---------- hero.ts ----------
export const heroCaptionSchema = z.object({ file: text, caption: text });

// ---------- resume.ts ----------
export const jobSchema = z.object({
  role: text,
  org: text,
  when: text,
  live: z.boolean().optional(),
  points: z.array(text),
  sample: z.boolean().optional(),
});
export const studySchema = z.object({ title: text, org: text, when: text });

// ---------- services.ts ----------
export const serviceSchema = z.object({
  title: text,
  icon: z.enum(["automation", "web", "ai", "api", "site"]),
  category: z.enum(["Web apps", "AI", "APIs", "Websites", "Automation"]),
  description: text,
  deliverables: z.array(text).min(1).max(5),
  priceFrom: z.string().optional(),
  priceUnit: z.string().optional(),
  featured: z.boolean().optional(),
  flow: z.array(text).optional(), // the featured card's little workflow strip
});

// ---------- process.ts ----------
export const stepSchema = z.object({ title: text, description: text, time: text });

// ---------- testimonials.ts ----------
export const testimonialSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9-]+$/, "use lowercase letters, numbers and dashes")
    .optional(), // a case study's `testimonial:` field points here
  quote: text,
  name: text,
  role: text,
  company: text,
  avatar: publicPath.optional(),
  project: z.string().optional(), // a case-study slug
  featured: z.boolean().optional(),
  sample: z.boolean().optional(),
});
export const workedWithSchema = z.object({ name: text, logo: publicPath.optional() });

// ---------- about.ts ----------
export const aboutSchema = z.object({
  lead: text,
  body: z.array(text).min(1),
  photo: publicPath.optional(),
  facts: z.array(
    z.object({ label: text, value: text, count: z.number().optional(), suffix: z.string().optional() }),
  ),
});

// ---------- portfolio.ts ----------
export const statSchema = z.object({
  label: text,
  value: text,
  count: z.number().optional(),
  suffix: z.string().optional(),
  home: z.string().optional(), // set to show this stat in the homepage hero, under this label
});
export const portfolioSchema = z.object({
  headline: text,
  subline: text,
  stats: z.array(statSchema).min(1).max(4),
  certifications: z.array(
    z.object({ title: text, issuer: text, year: z.string().optional(), icon: z.enum(["check", "star"]) }),
  ),
  sample: z.boolean().optional(),
});

// ---------- site.ts ----------
export const siteSchema = z.object({
  name: text,
  short: text,
  role: text,
  availability: z.object({ open: z.boolean(), label: text }),
  email: z.email(),
  url,
  bookingUrl: z.union([url, z.literal("")]),
  github: text,
  socials: z.record(z.string(), url),
});

// ---------- case-studies/*.mdx frontmatter ----------
export const CATEGORIES = ["Web apps", "AI", "APIs", "Websites"] as const;
export const caseStudySchema = z.object({
  title: text,
  slug: z.string().regex(/^[a-z0-9-]+$/, "use lowercase letters, numbers and dashes"),
  summary: text,
  category: z.enum(CATEGORIES),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  role: text,
  timeline: text,
  client: z.string().optional(),
  stack: z.array(text).min(1),
  cover: publicPath.optional(),
  gallery: z.array(publicPath).default([]),
  results: z
    .array(z.object({ value: text, label: text }))
    .min(1)
    .max(4),
  live: url.optional(),
  source: url.optional(),
  testimonial: z.string().optional(),
  draft: z.boolean().default(false),
});

export type Service = z.infer<typeof serviceSchema>;
export type Step = z.infer<typeof stepSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type WorkedWith = z.infer<typeof workedWithSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type Stat = z.infer<typeof statSchema>;
export type CaseStudyMeta = z.infer<typeof caseStudySchema>;
