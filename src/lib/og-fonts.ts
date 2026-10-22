import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "assets", "fonts");

// TTFs for next/og (it can't read woff2). Committed to the repo so builds never depend on a font CDN.
export async function ogFonts() {
  const [display, mono] = await Promise.all([
    readFile(path.join(dir, "Unbounded-Black.ttf")),
    readFile(path.join(dir, "JetBrainsMono-Medium.ttf")),
  ]);
  return [
    { name: "Unbounded", data: display, weight: 900 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}
