"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";

type Item = { key: string; category: string; featured: boolean; card: React.ReactNode };

const ALL = "All";
const MAX_FEATURED = 5;
const FILTER_FROM = 6; // filter chips appear once there are more than five projects

export function WorkGrid({ items, categories }: { items: Item[]; categories: readonly string[] }) {
  const [filter, setFilter] = useState<string>(ALL);
  const [showAll, setShowAll] = useState(false);

  const featured = items.filter((it) => it.featured).slice(0, MAX_FEATURED);
  const top = featured.length > 0 ? featured : items.slice(0, 3);
  const cats = [ALL, ...categories.filter((c) => items.some((it) => it.category === c))];

  const shown = filter !== ALL ? items.filter((it) => it.category === filter) : showAll ? items : top;

  return (
    <>
      {items.length >= FILTER_FROM && (
        <div className="seg work-filter" role="group" aria-label="Filter case studies">
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {filter === c && (
                <m.span
                  layoutId="work-pill"
                  className="thumb"
                  transition={{ duration: 0.4, ease: [0.3, 1.25, 0.45, 1] }}
                />
              )}
              <span>{c}</span>
            </button>
          ))}
        </div>
      )}
      <div className="projects">
        {shown.map((it, i) => (
          <Reveal key={it.key} i={i}>
            {it.card}
          </Reveal>
        ))}
      </div>
      {filter === ALL && !showAll && items.length > top.length && (
        <div className="see-all">
          <button type="button" className="btn ghost" onClick={() => setShowAll(true)}>
            See all {items.length} case studies
          </button>
        </div>
      )}
    </>
  );
}
