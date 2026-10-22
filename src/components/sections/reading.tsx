import Image from "next/image";
import { books } from "@content/books";
import { publicFileExists } from "@/lib/public-file";
import { SampleTag, SecHead } from "./sec-head";

const COVER_STYLES = ["c1", "c2", "c3"];

// Entries for the current month, or for the latest month that has any.
function shelf(today: Date) {
  const current = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const thisMonth = books.filter((b) => b.month === current);
  if (thisMonth.length) return thisMonth;
  const latest = books
    .map((b) => b.month)
    .filter((m) => m < current)
    .sort()
    .at(-1);
  return books.filter((b) => b.month === latest);
}

export function Reading() {
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const list = shelf(today);

  return (
    <section className="block" id="reading">
      <div className="wrap">
        <SecHead
          path={
            <>
              ~/shelf/<b>{month.toLowerCase()}.json</b>
            </>
          }
          title={
            <>
              Reading <em>in {month}</em>
            </>
          }
        >
          What&apos;s on my desk this month.{" "}
          <SampleTag show={list.some((b) => b.sample)}>sample books</SampleTag>
        </SecHead>

        <ul className="books">
          {list.map((b, i) => {
            const progress = Math.max(0, Math.min(100, b.progress));
            const hasCover = publicFileExists(b.cover);
            return (
              <li key={b.title} className="book">
                <div className={hasCover ? "cover" : `cover ${COVER_STYLES[i % COVER_STYLES.length]}`}>
                  {hasCover ? (
                    <Image
                      src={b.cover}
                      alt={`Cover of ${b.title}`}
                      fill
                      sizes="(min-width: 900px) 260px, (min-width: 480px) 45vw, 100vw"
                    />
                  ) : (
                    <>
                      <span className="ca" aria-hidden="true">
                        {b.author}
                      </span>
                      <span className="art" aria-hidden="true" />
                      <span className="ct" aria-hidden="true">
                        {b.title}
                      </span>
                    </>
                  )}
                </div>
                <div className="info">
                  <b>{b.title}</b>
                  <span>
                    {b.author} · {progress >= 100 ? "finished" : `${progress}% read`}
                  </span>
                  <div
                    className="readbar"
                    role="progressbar"
                    aria-label={`${b.title} reading progress`}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <i style={{ "--w": `${progress}%` } as React.CSSProperties} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
