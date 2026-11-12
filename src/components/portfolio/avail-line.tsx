import { site } from "@content/site";

// Whether I'm taking projects is a business fact from content/site.ts, not whether the laptop is online.
export function AvailLine() {
  const open = site.availability.open;
  return (
    <div className={open ? "pavail is-working" : "pavail"}>
      <span className="dot" aria-hidden="true" />
      <span>{open ? "Available for new projects" : "Not taking new projects right now"}</span>
    </div>
  );
}
