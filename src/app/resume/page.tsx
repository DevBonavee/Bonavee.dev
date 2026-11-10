import type { Metadata } from "next";
import { Resume } from "@/components/sections/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Bonavee's résumé: a full-stack CV to download and the experience timeline.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="pt-[90px]">
      <h1 className="sr-only">Résumé</h1>
      <Resume />
    </main>
  );
}
