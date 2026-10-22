import "server-only";
import fs from "node:fs";
import path from "node:path";
import { heroCaptions } from "@content/hero";

export type HeroPhoto = { src: string; caption: string };

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

// Runs at build time: every image in public/hero/ becomes a slide, sorted by file name.
export function getHeroPhotos(): HeroPhoto[] {
  const dir = path.join(process.cwd(), "public", "hero");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMAGE.test(f));
  } catch {
    return [];
  }
  files.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  return files.map((file, i) => ({
    src: `/hero/${file}`,
    caption:
      heroCaptions.find((c) => c.file === file)?.caption ??
      `BONAVEE // PHOTO ${String(i + 1).padStart(2, "0")}`,
  }));
}
