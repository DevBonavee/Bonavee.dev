import "server-only";

// Google reviews for the "Proof" section, from Places API (New) Place Details.
// The API key stays on the server. Without GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID, or when the call
// fails or returns no reviews, this returns null and the block doesn't render.
// Google returns at most 5 reviews and picks which ones.

export type GoogleReview = {
  rating: number;
  text: string;
  authorName: string;
  authorPhoto?: string;
  authorUrl?: string;
  relativeTime: string;
};

export type GoogleReviews = {
  rating: number;
  count: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};

type RawReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  relativePublishTimeDescription?: string;
};
type RawPlace = { rating?: number; userRatingCount?: number; googleMapsUri?: string; reviews?: RawReview[] };

const REVALIDATE = 86_400; // once a day

export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const place = process.env.GOOGLE_PLACE_ID;
  if (!key || !place) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(place)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const raw = (await res.json()) as RawPlace;

    const reviews = (raw.reviews ?? []).flatMap((r): GoogleReview[] => {
      const text = (r.text?.text ?? r.originalText?.text ?? "").trim();
      const authorName = r.authorAttribution?.displayName;
      if (!text || !authorName || !r.rating) return [];
      return [
        {
          rating: r.rating,
          text,
          authorName,
          authorPhoto: r.authorAttribution?.photoUri,
          authorUrl: r.authorAttribution?.uri,
          relativeTime: r.relativePublishTimeDescription ?? "",
        },
      ];
    });
    if (reviews.length === 0 || !raw.rating) return null;

    return {
      rating: raw.rating,
      count: raw.userRatingCount ?? reviews.length,
      mapsUrl: raw.googleMapsUri,
      reviews: reviews.slice(0, 5),
    };
  } catch {
    return null;
  }
}
