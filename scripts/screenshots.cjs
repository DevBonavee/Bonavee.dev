// Screenshots every live portfolio site into public/projects/<repo-name>.png (1440x900, 16:10).
// Run by .github/workflows/screenshots.yml. Locally: npm i --no-save playwright && node scripts/screenshots.cjs
const { chromium } = require("playwright");
const path = require("node:path");

const SITE = process.env.SITE_URL || "https://bonavee.dev";
const OUT = path.join(__dirname, "..", "public", "projects");

(async () => {
  const res = await fetch(`${SITE}/api/portfolio`);
  if (!res.ok) throw new Error(`GET ${SITE}/api/portfolio -> ${res.status}`);
  const sites = await res.json();
  console.log(`${sites.length} site(s)`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const { slug, demo } of sites) {
    try {
      // Long timeout: sleeping free-tier hosts (Render) take up to a minute to wake.
      await page.goto(demo, { waitUntil: "load", timeout: 90_000 });
      await page.waitForTimeout(3000); // let entrance animations settle
      await page.screenshot({ path: path.join(OUT, `${slug}.png`) });
      console.log(`ok   ${slug}  ${demo}`);
    } catch (err) {
      console.log(`skip ${slug}  ${demo}  (${err.message.split("\n")[0]})`);
    }
  }
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
