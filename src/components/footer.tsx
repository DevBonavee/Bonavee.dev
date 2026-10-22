import { site } from "@content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2.5">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.short}
        </span>
        <span>Built with Next.js · TypeScript · Tailwind · Framer Motion</span>
      </div>
    </footer>
  );
}
