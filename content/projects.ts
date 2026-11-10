// Portfolio cards. Most cards come from GitHub automatically: any repo with the
// "portfolio" topic shows up, newest first, with its live URL (repo "Website" field,
// else latest production deployment, else GitHub Pages). Optional screenshot:
// public/projects/<repo-name>.png. Entries below are extra, manual cards shown after those.
// Put screenshots in public/projects/ (16:10 works best).
// If the image file is missing, the card shows a drawn placeholder instead.
// `sample: true` shows a dashed "sample" tag; remove it once the project is real.
export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo?: string;
  source?: string;
  sample?: boolean;
};

export const projects: Project[] = [];
