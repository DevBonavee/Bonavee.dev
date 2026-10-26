import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { testimonials } from "./content";
import { caseStudySchema, type CaseStudyMeta, type Testimonial } from "./content/schema";

// Case studies live in content/case-studies/*.mdx: frontmatter for the card and page header,
// Markdown body for the write-up. A new file adds a card on /portfolio and a page at /portfolio/<slug>.

export type CaseStudy = CaseStudyMeta & { body: string; testimonialQuote?: Testimonial };

const DIR = path.join(process.cwd(), "content", "case-studies");

function load(): CaseStudy[] {
  if (!fs.existsSync(DIR)) return [];
  const studies = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      const parsed = caseStudySchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`content/case-studies/${file} has a mistake:\n${z.prettifyError(parsed.error)}`);
      }
      const meta = parsed.data;
      if (`${meta.slug}.mdx` !== file) {
        throw new Error(`content/case-studies/${file}: the slug "${meta.slug}" must match the file name`);
      }
      const quote = meta.testimonial ? testimonials.find((t) => t.id === meta.testimonial) : undefined;
      if (meta.testimonial && !quote) {
        throw new Error(
          `content/case-studies/${file}: no testimonial has the id "${meta.testimonial}" in content/testimonials.ts`,
        );
      }
      return { ...meta, body: content, testimonialQuote: quote };
    });
  return studies.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

// Read once per server process; the files only change with a deploy.
let cache: CaseStudy[] | undefined;
export function getCaseStudies(): CaseStudy[] {
  cache ??= load();
  return cache;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((c) => c.slug === slug);
}

// The 3–5 featured ones for the top of /portfolio.
export function getFeaturedCaseStudies(): CaseStudy[] {
  return getCaseStudies()
    .filter((c) => c.featured)
    .slice(0, 5);
}
