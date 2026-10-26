import { getPortfolio } from "@/lib/portfolio";

export const revalidate = 3600;

// GET /api/portfolio -> [{ slug, demo }] for repos with a live site.
// Read by .github/workflows/screenshots.yml to know which sites to capture.
export async function GET() {
  const projects = await getPortfolio();
  const sites = projects.filter((p) => p.slug && p.demo).map((p) => ({ slug: p.slug, demo: p.demo }));
  return Response.json(sites);
}
