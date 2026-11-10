// "Reading this month". Put covers in public/books/ (2:3 works best).
// The site shows the entries for the current month, or the latest month that has entries.
// If a cover file is missing, a typographic cover is drawn instead.
// `sample: true` shows a dashed "sample" tag on the section; remove it once these are real.
export type Book = {
  title: string;
  author: string;
  cover: string;
  progress: number; // 0-100
  month: string; // "YYYY-MM"
  sample?: boolean;
};

export const books: Book[] = [
  {
    title: "AI Engineering",
    author: "Chip Huyen",
    cover: "/books/ai-engineering.jpg",
    progress: 62,
    month: "2026-11",
    sample: true,
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/books/ddia.jpg",
    progress: 100,
    month: "2026-11",
    sample: true,
  },
  {
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    cover: "/books/pragmatic-programmer.jpg",
    progress: 100,
    month: "2026-12",
    sample: true,
  },
];
