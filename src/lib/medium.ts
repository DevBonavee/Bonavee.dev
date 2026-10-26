import "server-only";
import { XMLParser } from "fast-xml-parser";

const FEEDS = ["https://medium.com/feed/@bonavee120", "https://bonavee120.medium.com/feed"];
const WPM = 230;
// Medium's feed carries the latest 10 posts; /writing shows them all, the homepage the first 3.
const MAX_POSTS = 10;

export type Post = { title: string; link: string; date: string; minutes: number };

type RawItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  "content:encoded"?: string;
};

const parser = new XMLParser({ ignoreAttributes: true, processEntities: true, htmlEntities: true });

function readMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WPM));
}

// Medium titles sometimes arrive as `*Title*`, `Title: …` or wrapped in quotes; show the bare title.
const cleanTitle = (t: string) =>
  t
    .trim()
    .replace(/^\*+\s*|\s*\*+$/g, "")
    .replace(/^title\s*:\s*/i, "")
    .replace(/^["“](.*)["”]$/, "$1")
    .trim();

// Drops Medium's tracking query string so links are clean.
function cleanLink(href: string) {
  try {
    const u = new URL(href);
    u.search = "";
    return u.toString();
  } catch {
    return href;
  }
}

async function fetchFeed(url: string): Promise<Post[] | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const xml = parser.parse(await res.text());
    const raw: RawItem | RawItem[] | undefined = xml?.rss?.channel?.item;
    const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const posts = items
      .filter((i) => i.title && i.link && i.pubDate)
      .map((i) => ({
        title: cleanTitle(String(i.title)),
        link: cleanLink(String(i.link)),
        date: new Date(String(i.pubDate)).toISOString(),
        minutes: readMinutes(String(i["content:encoded"] ?? "")),
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
    return posts.slice(0, MAX_POSTS);
  } catch {
    return null;
  }
}

// Latest posts from the first feed that answers, or null if Medium is unreachable.
export async function getPosts(): Promise<Post[] | null> {
  for (const url of FEEDS) {
    const posts = await fetchFeed(url);
    if (posts) return posts;
  }
  return null;
}
