import type { Metadata } from "next";
import { WritingSection } from "@/components/live/writing-section";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing",
  description: "Everything Bonavee has published on Medium, newest first.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <main className="pt-[90px]">
      <h1 className="sr-only">Writing</h1>
      <WritingSection />
    </main>
  );
}
