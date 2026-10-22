import "server-only";
import fs from "node:fs";
import path from "node:path";

// True when a "/foo/bar.png" path from content/ points at a real file in public/.
// Lets cards fall back to a drawn placeholder until the owner drops the image in.
export function publicFileExists(src: string | undefined): src is string {
  if (!src?.startsWith("/")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
