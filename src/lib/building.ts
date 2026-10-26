import "server-only";
import { now as manual, type NowNote } from "@content/now";
import { get, titleCase, USER } from "./github";

// "Currently building", live from GitHub (refreshed hourly like the rest of the GitHub data):
// - the repo: the one pinned with `repo` in content/now.ts, else the public repo pushed most recently
//   (skipping forks, archived repos, this site's own repo, and any repo with the topic "no-now")
// - title and description: the repo's name and GitHub description
// - tags: its top three languages
// - progress notes: its latest commits, newest marked "in progress"
// - progress bar: the newest open GitHub milestone (closed issues / all issues); without one, the card
//   shows how many commits landed in the last 30 days instead
// If GitHub can't be reached, the card falls back to what's written in content/now.ts.

export type Building = {
  title: string;
  description: string;
  tags: string[];
  notes: NowNote[];
  progress: { percent: number; label: string } | null;
  activity?: { commits30: number; lastPush: string }; // shown when there's no milestone
  preview?: { prompt: string; reply: string };
  url?: string;
  live: boolean; // true when the data came from GitHub
  sample?: boolean;
};

const SITE_REPO = "bonavee.dev";
const NOTES = 5;

type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  archived: boolean;
  topics?: string[];
};
type RawCommit = { sha: string; commit: { message: string; author: { date: string } | null } };
type RawMilestone = { title: string; open_issues: number; closed_issues: number };

const day = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", timeZone: "UTC" });

function fromContent(): Building {
  return {
    title: manual.title,
    description: manual.description,
    tags: manual.tags,
    notes: manual.notes,
    progress: { percent: Math.max(0, Math.min(100, manual.progress)), label: manual.milestone },
    preview: manual.preview,
    live: false,
    sample: manual.sample,
  };
}

export async function getBuilding(): Promise<Building> {
  const repos = await get<RawRepo[]>(`/users/${USER}/repos?per_page=100&sort=pushed`);
  if (!Array.isArray(repos)) return fromContent();

  const pinned = manual.repo?.toLowerCase();
  const repo = pinned
    ? repos.find((r) => r.name.toLowerCase() === pinned)
    : repos.find(
        (r) => !r.fork && !r.archived && r.name.toLowerCase() !== SITE_REPO && !r.topics?.includes("no-now"),
      );
  if (!repo) return fromContent();

  const base = `/repos/${USER}/${repo.name}`;
  const [commits, languages, milestones] = await Promise.all([
    get<RawCommit[]>(`${base}/commits?per_page=20`),
    get<Record<string, number>>(`${base}/languages`),
    get<RawMilestone[]>(`${base}/milestones?state=open&sort=due_on&direction=asc&per_page=1`),
  ]);
  if (!Array.isArray(commits)) return fromContent();

  const monthAgo = Date.now() - 30 * 86_400_000;
  const commits30 = commits.filter(
    (c) => c.commit.author && Date.parse(c.commit.author.date) > monthAgo,
  ).length;

  const notes: NowNote[] = commits
    .map((c) => ({ text: c.commit.message.split("\n")[0].trim(), at: c.commit.author?.date }))
    .filter((c) => c.text && c.at && !/^Merge (pull request|branch)/.test(c.text))
    .slice(0, NOTES)
    .map((c, i) => ({
      date: day.format(new Date(c.at!)),
      text: c.text.length > 90 ? `${c.text.slice(0, 87)}…` : c.text,
      state: i === 0 ? "now" : "done",
    }));
  if (notes.length === 0) return fromContent();

  const tags = Object.entries(languages ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);

  const m = Array.isArray(milestones) ? milestones[0] : undefined;
  const total = m ? m.open_issues + m.closed_issues : 0;
  const progress =
    m && total > 0 ? { percent: Math.round((m.closed_issues / total) * 100), label: m.title } : null;

  return {
    title: titleCase(repo.name),
    description: repo.description?.trim() || `Latest work on ${repo.name}, straight from GitHub.`,
    tags,
    notes,
    progress,
    activity: { commits30, lastPush: notes[0].date },
    url: repo.html_url,
    live: true,
  };
}
