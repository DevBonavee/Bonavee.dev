// Role-based résumés. Put each PDF in public/cv/. A new entry here adds a new tab.
// The first entry is the default for the hero "Download résumé" button.
export type Cv = { role: string; file: string; pages: number; summary: string };

export const cvs: Cv[] = [
  {
    role: "Full-stack",
    file: "Chukwuebuka_Bonaventure_Nnamah_CV.pdf",
    pages: 2,
    summary:
      "Full-stack developer working in Python, FastAPI, TypeScript and Next.js. I built PlastiCash, a plastic buy-back platform with Paystack payouts and 180+ automated tests, and ScreenHive, a cinema booking API, while leading design and technology at Ecocyclers.",
  },
];
