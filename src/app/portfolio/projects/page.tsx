import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/portfolio";

// GitHub repos with a live site, refreshed hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All projects",
  description: "Every live project Bonavee has built, newest first, with links to the site and the source.",
  alternates: { canonical: "/portfolio/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="pt-[90px]">
      <h1 className="sr-only">All projects</h1>
      <Portfolio />
    </main>
  );
}
