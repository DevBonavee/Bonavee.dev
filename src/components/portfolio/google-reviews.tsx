import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Avatar, Stars } from "./bits";

const reviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL;

function GMark({ big }: { big?: boolean }) {
  return (
    <span className={big ? "gmark big" : "gmark"} aria-hidden="true">
      G
    </span>
  );
}

// Live Google reviews, separate from the hand-picked quotes. Renders nothing until the Places API is set up.
export async function GoogleReviewsBlock() {
  const data = await getGoogleReviews();
  if (!data) return null;
  const rating = Math.round(data.rating * 10) / 10;

  return (
    <Reveal className="greviews">
      <div className="grev-head">
        <div className="grev-score">
          <GMark big />
          <div>
            <div className="grev-num">
              <b>{rating.toFixed(1)}</b>
              <Stars rating={data.rating} />
            </div>
            <small className="mono">
              from {data.count} review{data.count === 1 ? "" : "s"} on Google
            </small>
          </div>
        </div>
        <div className="grev-actions">
          {data.mapsUrl && (
            <a className="btn ghost sm" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
              See all on Google ↗
            </a>
          )}
          {reviewUrl && (
            <a className="btn sm" href={reviewUrl} target="_blank" rel="noopener noreferrer">
              Leave a review
            </a>
          )}
        </div>
      </div>

      <div className="grev-row">
        {data.reviews.map((r, i) => (
          <article key={`${r.authorName}-${i}`} className="card grev">
            <header>
              {r.authorPhoto ? (
                <span className="avatar sm" aria-hidden="true">
                  <Image src={r.authorPhoto} alt="" fill sizes="36px" unoptimized />
                </span>
              ) : (
                <Avatar name={r.authorName} small />
              )}
              <span>
                {r.authorUrl ? (
                  <a href={r.authorUrl} target="_blank" rel="noopener noreferrer">
                    <b>{r.authorName}</b>
                  </a>
                ) : (
                  <b>{r.authorName}</b>
                )}
                <small>{r.relativeTime}</small>
              </span>
              <GMark />
            </header>
            <Stars rating={r.rating} />
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      <small className="mono grev-attr">Reviews from Google</small>
    </Reveal>
  );
}
