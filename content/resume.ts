// Résumé timeline and quick facts. Newest first.
export type Job = { role: string; org: string; when: string; live?: boolean; points: string[] };
export type Study = { title: string; org: string; when: string };

export const experience: Job[] = [
  {
    role: "Full-stack developer",
    org: "Freelance",
    when: "2025 –",
    live: true,
    points: ["Building web apps and AI features with Next.js, TypeScript and FastAPI."],
  },
  {
    role: "Operations Manager",
    org: "Eco-Cyclers",
    when: "Mar 2022 –",
    live: true,
    points: [
      "Led 10+ grassroots waste management initiatives, raising collection efficiency by 25%.",
      "Cut operating costs by 30% through planning and logistics.",
      "Built a community engagement programme that lifted participation by 40%.",
    ],
  },
  {
    role: "Volunteer Engagement Manager",
    org: "SustyVibes",
    when: "Nov 2023 –",
    live: true,
    points: ["Engages 100+ community members through events, trainings and monthly check-ins."],
  },
  {
    role: "Administrative Assistant",
    org: "Edunamic",
    when: "Apr – Aug 2023",
    points: ["Cut scheduling conflicts by 15% and kept email responses 100% on time."],
  },
];

export const education: Study[] = [
  { title: "B.Sc. Political Science", org: "University of Nigeria, Nsukka", when: "2017 – 2022" },
  { title: "Certificate in Climate Action", org: "Greenswitch Academy", when: "2023" },
];

export const facts = [
  { label: "Languages", value: "English and Igbo, both fluent" },
  { label: "Recognition", value: "SustyViber of the Month · ALX Virtual Assistant" },
  { label: "Speaking", value: "World Environment Day on Afia TV and Solid FM" },
];
