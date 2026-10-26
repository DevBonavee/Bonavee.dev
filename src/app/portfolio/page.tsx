import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/portfolio";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Web apps, AI features and automations by Bonavee, with live demos and source.",
  alternates: { canonical: "/portfolio" },
};

// Phase 1: the live project grid moves here from the homepage. The full sales page
// (case studies, proof, services, process, about) replaces this in the portfolio phase.
export default function PortfolioPage() {
  return (
    <main className="pt-[90px]">
      <h1 className="sr-only">Portfolio</h1>
      <Portfolio />
    </main>
  );
}
