import type { Metadata } from "next";
import { About } from "@/components/portfolio/about";
import { CaseStudies } from "@/components/portfolio/case-studies";
import { PortfolioCta } from "@/components/portfolio/p-cta";
import { PortfolioHero } from "@/components/portfolio/p-hero";
import { Process } from "@/components/portfolio/process";
import { Proof } from "@/components/portfolio/proof";
import { Services } from "@/components/portfolio/services";
import { Portfolio } from "@/components/sections/portfolio";

// "Projects" lists GitHub repos with a live site, refreshed hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web apps, AI features and n8n/Zapier automations by Bonavee: live projects, services, and how a project runs.",
  alternates: { canonical: "/portfolio" },
};

// The standalone sales page: a client who lands here should not need the homepage.
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <main>
        <Portfolio limit={5} />
        <CaseStudies />
        <Proof />
        <Services />
        <Process />
        <About />
        <PortfolioCta />
      </main>
    </>
  );
}
