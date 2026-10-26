import { site } from "@content/site";

// Brand marks for the socials in content/site.ts, shared by the contact section and the footer.
export const SOCIAL_ICONS: Record<keyof typeof site.socials, { label: string; path: React.ReactNode }> = {
  linkedin: {
    label: "LinkedIn",
    path: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
    ),
  },
  x: {
    label: "X",
    path: (
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.2h1.7L7.4 4.73H5.58z" />
    ),
  },
  facebook: {
    label: "Facebook",
    path: (
      <path d="M14 8.5V6.8c0-.8.5-1.3 1.4-1.3H17V2.2h-2.4C11.9 2.2 10.6 4 10.6 6.5v2H8V12h2.6v10H14V12h2.7l.4-3.5z" />
    ),
  },
  github: {
    label: "GitHub",
    path: (
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    ),
  },
  medium: {
    label: "Medium",
    path: (
      <>
        <ellipse cx="7" cy="12" rx="5.5" ry="5.8" />
        <ellipse cx="16" cy="12" rx="2.8" ry="5.4" />
        <ellipse cx="21" cy="12" rx="1.1" ry="4.8" />
      </>
    ),
  },
};

export const SOCIAL_ORDER = ["linkedin", "x", "facebook", "github", "medium"] as const;
