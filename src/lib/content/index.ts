import "server-only";
import { z } from "zod";
import { about as rawAbout } from "@content/about";
import { books as rawBooks } from "@content/books";
import { cvs as rawCvs } from "@content/cvs";
import { heroCaptions as rawHero } from "@content/hero";
import { now as rawNow } from "@content/now";
import { portfolio as rawPortfolio } from "@content/portfolio";
import { processSteps as rawProcess } from "@content/process";
import { education as rawEducation, experience as rawExperience } from "@content/resume";
import { services as rawServices, servicesSample } from "@content/services";
import { site as rawSite } from "@content/site";
import { testimonials as rawTestimonials, workedWith as rawWorkedWith } from "@content/testimonials";
import * as s from "./schema";

// Checks one content file and throws a readable error naming the file and the bad field.
function check<T extends z.ZodType>(file: string, schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`content/${file} has a mistake:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const now = check("now.ts", s.nowSchema, rawNow);
export const books = check("books.ts", z.array(s.bookSchema), rawBooks);
export const cvs = check("cvs.ts", z.array(s.cvSchema).min(1), rawCvs);
export const heroCaptions = check("hero.ts", z.array(s.heroCaptionSchema), rawHero);
export const experience = check("resume.ts (experience)", z.array(s.jobSchema), rawExperience);
export const education = check("resume.ts (education)", z.array(s.studySchema), rawEducation);
export const services = check("services.ts", z.array(s.serviceSchema), rawServices);
export { servicesSample };
export const processSteps = check("process.ts", z.array(s.stepSchema), rawProcess);
export const testimonials = check("testimonials.ts", z.array(s.testimonialSchema), rawTestimonials);
export const workedWith = check("testimonials.ts (workedWith)", z.array(s.workedWithSchema), rawWorkedWith);
export const about = check("about.ts", s.aboutSchema, rawAbout);
export const portfolio = check("portfolio.ts", s.portfolioSchema, rawPortfolio);
check("site.ts", s.siteSchema, rawSite);

const ids = testimonials.flatMap((t) => (t.id ? [t.id] : []));
const dupe = ids.find((id, i) => ids.indexOf(id) !== i);
if (dupe) throw new Error(`content/testimonials.ts: two testimonials share the id "${dupe}"`);
