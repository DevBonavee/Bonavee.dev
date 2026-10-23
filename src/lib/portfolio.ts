import "server-only";
import { projects as manual, type Project } from "@content/projects";
import { get, REVALIDATE, USER } from "./github";
import { publicFileExists } from "./public-file";

// Portfolio cards = GitHub repos tagged "portfolio" (newest first) + manual entries from content/projects.ts.
// Live URL per repo: the repo's "Website" field, else its latest production deployment
// (Vercel, or Render with GitHub deployments on), else GitHub Pages.
// Screenshot: public/projects/<repo-name>.png, else the live site's og:image, else a drawn placeholder.

export type PortfolioProject = Omit<Project, "image"> & { image?: string; remote?: boolean };

type RawRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  has_pages: boolean;
  created_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

type RawDeployment = { id: number; environment: string };
type RawStatus = { state: string; environment_url?: string };

const isHttp = (u: string | null | undefined): u is string => !!u && /^https?:\/\//i.test(u);

async function deploymentUrl(repo: string): Promise<string | undefined> {
  const deps = await get<RawDeployment[]>(`/repos/${USER}/${repo}/deployments?per_page=20`);
  if (!Array.isArray(deps)) return undefined;
  // Prefer production; never show previews (often private or short-lived).
  const live = deps.filter((d) => !/preview|staging|dev/i.test(d.environment));
  const ordered = [...live.filter((d) => /prod/i.test(d.environment)), ...live];
  for (const d of ordered.slice(0, 3)) {
    const statuses = await get<RawStatus[]>(`/repos/${USER}/${repo}/deployments/${d.id}/statuses?per_page=5`);
    const ok = statuses?.find((s) => s.state === "success" && isHttp(s.environment_url));
    if (ok) return ok.environment_url;
  }
  return undefined;
}

async function liveUrl(r: RawRepo): Promise<string | undefined> {
  if (isHttp(r.homepage)) return r.homepage;
  const dep = await deploymentUrl(r.name);
  if (dep) return dep;
  if (r.has_pages) return `https://${USER.toLowerCase()}.github.io/${r.name}/`;
  return undefined;
}

// Reads og:image from the live site. Slow or sleeping hosts (Render free tier) just get the placeholder.
async function ogImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) return undefined;
    const html = (await res.text()).slice(0, 200_000);
    const tag = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*>/i)?.[0];
    const content = tag?.match(/content=["']([^"']+)["']/i)?.[1];
    if (!content) return undefined;
    const abs = new URL(content.replace(/&amp;/g, "&"), url).toString();
    return abs.startsWith("https://") ? abs : undefined;
  } catch {
    return undefined;
  }
}

const titleCase = (name: string) =>
  name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

async function fromGitHub(): Promise<PortfolioProject[]> {
  const raw = await get<RawRepo[]>(`/users/${USER}/repos?per_page=100&sort=updated`);
  if (!Array.isArray(raw)) return [];
  const repos = raw
    .filter((r) => r.topics?.includes("portfolio") && !r.archived)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  return Promise.all(
    repos.map(async (r) => {
      const demo = await liveUrl(r);
      const local = ["png", "jpg", "jpeg", "webp"]
        .map((ext) => `/projects/${r.name}.${ext}`)
        .find((p) => publicFileExists(p));
      const og = !local && demo ? await ogImage(demo) : undefined;
      const tags = [r.language, ...(r.topics ?? []).filter((t) => t !== "portfolio")]
        .filter((t): t is string => !!t)
        .slice(0, 4);
      return {
        title: titleCase(r.name),
        description: r.description ?? "",
        image: local ?? og,
        remote: !local && !!og,
        tags,
        demo,
        source: r.html_url,
      };
    }),
  );
}

export async function getPortfolio(): Promise<PortfolioProject[]> {
  const live = await fromGitHub();
  // Once real repos show up, drop the sample cards. Skip manual entries that point at a repo already listed.
  const seen = new Set(live.map((p) => p.source?.toLowerCase()));
  const rest = manual
    .filter((p) => !(live.length && p.sample))
    .filter((p) => !p.source || !seen.has(p.source.toLowerCase()))
    .map((p) => ({ ...p, image: publicFileExists(p.image) ? p.image : undefined }));
  return [...live, ...rest];
}
