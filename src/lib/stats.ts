import "server-only";
import { portfolio, services } from "@/lib/content";
import type { Stat } from "@/lib/content/schema";
import { getPortfolio } from "@/lib/portfolio";

// The hero stats with counted ones (`from`) filled in, so they always match what the page shows.
// A counted stat that comes out as 0 (say GitHub is down) is left out rather than shown as "0".
export async function getStats(): Promise<Stat[]> {
  const projects = portfolio.stats.some((s) => s.from === "projects") ? (await getPortfolio()).length : 0;
  return portfolio.stats.flatMap((s) => {
    if (!s.from) return [s];
    const n = s.from === "projects" ? projects : services.length;
    return n > 0 ? [{ ...s, value: `${n}${s.suffix ?? ""}`, count: n }] : [];
  });
}
