import "server-only";
import { site } from "@content/site";

export const USER = site.github;
const API = "https://api.github.com";
export const REVALIDATE = 3600;

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
};

export type Activity = {
  id: string;
  kind: "push" | "pr" | "star" | "repo" | "release";
  text: string; // e.g. "Merged PR #42 in"
  target: string; // bolded repo / tag name
  suffix?: string;
  at: string; // ISO date
  url: string;
};

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Calendar = { total: number; weeks: Day[][] };

export type GitHubData = {
  publicRepos: number | null;
  repos: Repo[] | null; // repos tagged with the "portfolio" topic
  activity: Activity[] | null;
  calendar: Calendar | null; // needs GITHUB_TOKEN
  streak: number | null;
  mergedPrs: number | null;
};

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type RawRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  topics?: string[];
  fork: boolean;
};

async function getRepos(): Promise<Repo[] | null> {
  const raw = await get<RawRepo[]>(`/users/${USER}/repos?per_page=100&sort=updated`);
  if (!Array.isArray(raw)) return null;
  return raw
    .filter((r) => r.topics?.includes("portfolio"))
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      url: r.html_url,
    }));
}

type RawEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    number?: number;
    ref?: string | null;
    ref_type?: string;
    size?: number;
    pull_request?: { merged?: boolean; number?: number; html_url?: string };
    release?: { tag_name?: string; html_url?: string };
  };
};

const repoUrl = (name: string) => `https://github.com/${name}`;
const shortRepo = (name: string) => (name.startsWith(`${USER}/`) ? name.slice(USER.length + 1) : name);

function toActivity(e: RawEvent): Activity | null {
  const repo = e.repo.name;
  const base = { id: e.id, at: e.created_at };
  switch (e.type) {
    case "PushEvent": {
      const n = e.payload.size;
      const branch = e.payload.ref?.replace(/^refs\/heads\//, "");
      return {
        ...base,
        kind: "push",
        text: n ? `Pushed ${n} commit${n === 1 ? "" : "s"} to` : "Pushed to",
        target: shortRepo(repo),
        suffix: !n && branch ? `on ${branch}` : undefined,
        url: repoUrl(repo),
      };
    }
    case "PullRequestEvent": {
      const merged =
        e.payload.action === "merged" || (e.payload.action === "closed" && e.payload.pull_request?.merged);
      if (!merged) return null;
      const num = e.payload.number ?? e.payload.pull_request?.number;
      return {
        ...base,
        kind: "pr",
        text: `Merged PR${num ? ` #${num}` : ""} in`,
        target: shortRepo(repo),
        url: num ? `${repoUrl(repo)}/pull/${num}` : repoUrl(repo),
      };
    }
    case "WatchEvent":
      return { ...base, kind: "star", text: "Starred", target: repo, url: repoUrl(repo) };
    case "CreateEvent":
      if (e.payload.ref_type !== "repository") return null;
      return { ...base, kind: "repo", text: "Created", target: shortRepo(repo), url: repoUrl(repo) };
    case "ReleaseEvent": {
      if (e.payload.action !== "published") return null;
      const tag = e.payload.release?.tag_name ?? "a release";
      return {
        ...base,
        kind: "release",
        text: "Released",
        target: tag,
        suffix: `of ${shortRepo(repo)}`,
        url: e.payload.release?.html_url ?? repoUrl(repo),
      };
    }
    default:
      return null;
  }
}

async function getActivity(): Promise<Activity[] | null> {
  const raw = await get<RawEvent[]>(`/users/${USER}/events/public?per_page=15`);
  if (!Array.isArray(raw)) return null;
  // Collapse runs of the same action on the same repo (e.g. several pushes in a row).
  const out: Activity[] = [];
  for (const a of raw.map(toActivity)) {
    if (!a) continue;
    const prev = out.at(-1);
    if (prev && prev.kind === a.kind && prev.target === a.target && a.kind === "push") continue;
    out.push(a);
  }
  return out.slice(0, 6);
}

const LEVELS: Record<string, Day["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type RawCalendar = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: { date: string; contributionCount: number; contributionLevel: string }[];
          }[];
        };
      };
    };
  };
};

async function getCalendar(): Promise<Calendar | null> {
  if (!process.env.GITHUB_TOKEN) return null;
  try {
    const res = await fetch(`${API}/graphql`, {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`,
        variables: { login: USER },
      }),
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as RawCalendar;
    const cal = json.data?.user?.contributionsCollection.contributionCalendar;
    if (!cal) return null;
    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVELS[d.contributionLevel] ?? 0,
        })),
      ),
    };
  } catch {
    return null;
  }
}

// Consecutive days with contributions, ending today (or yesterday, so an empty morning doesn't reset it).
export function currentStreak(cal: Calendar): number {
  const days = cal.weeks.flat();
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  let streak = 0;
  for (; i >= 0 && days[i].count > 0; i--) streak++;
  return streak;
}

async function getMergedPrs(): Promise<number | null> {
  const res = await get<{ total_count: number }>(
    `/search/issues?q=${encodeURIComponent(`author:${USER} type:pr is:merged`)}&per_page=1`,
  );
  return typeof res?.total_count === "number" ? res.total_count : null;
}

export async function getGitHub(): Promise<GitHubData> {
  const [user, repos, activity, calendar, mergedPrs] = await Promise.all([
    get<{ public_repos: number }>(`/users/${USER}`),
    getRepos(),
    getActivity(),
    getCalendar(),
    getMergedPrs(),
  ]);
  return {
    publicRepos: typeof user?.public_repos === "number" ? user.public_repos : null,
    repos,
    activity,
    calendar,
    streak: calendar ? currentStreak(calendar) : null,
    mergedPrs,
  };
}
