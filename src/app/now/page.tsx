import type { Metadata } from "next";
import { GitHubSection } from "@/components/live/github-section";
import { PageHead } from "@/components/page-head";
import { Building } from "@/components/sections/building";
import { Reading } from "@/components/sections/reading";

// GitHub data and the month-based shelf refresh hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Now",
  description: "What Bonavee is building right now, recent GitHub activity, and this month's reading.",
  alternates: { canonical: "/now" },
};

export default function NowPage() {
  return (
    <>
      <PageHead
        path={
          <>
            bonavee.dev/<b>now</b>
          </>
        }
        title={
          <>
            What I&apos;m doing <em>now</em>
          </>
        }
      >
        The project taking most of my hours, what I&apos;ve pushed to GitHub lately, and the books on my desk
        this month.
      </PageHead>
      <main>
        <Building />
        <GitHubSection />
        <Reading />
      </main>
    </>
  );
}
