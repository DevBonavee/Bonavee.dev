# Bonavee.dev: build brief

This file tells Claude Code how to build the personal portfolio site for **Chukwuebuka Bonaventure Nnamah ("Bonavee")**, a full-stack developer working with AI. GitHub: `Bonvee120`.

`design/mockup.html` in this folder is the approved design. Open it in a browser and match it closely: layout, colors, fonts, copy tone, and every animation. When this brief and the mockup disagree, the brief wins. The mockup's "Preview controls" panel is a mockup-only tool and must not ship.

---

## 1. Stack

- **Next.js 15, App Router**, TypeScript (strict), `src/` directory
- **Tailwind CSS** for styling. Put the design tokens in CSS variables and map them in the Tailwind theme.
- **Framer Motion** for animations (`motion` components, `useInView`, `AnimatePresence`, `layoutId`)
- **next/font/google** for fonts. No external font `<link>` tags.
- **Upstash Redis** (from the Vercel Marketplace) to store the heartbeat timestamp
- Deploy on **Vercel**
- Package manager: `pnpm` (use npm if pnpm is not installed)
- Lint with ESLint and format with Prettier. Never commit `.env*` files.

## 2. Design tokens

Dark green is the default theme. Light theme comes from the system setting or the nav toggle, which is saved in localStorage. Use `next-themes` with `attribute="data-theme"`.

| Token | Dark (default) | Light |
|---|---|---|
| `--bg` | `#172923` | `#F2F1EC` |
| `--bg-deep` | `#11201b` | `#e8e6de` |
| `--raise` (cards) | `#1e352d` | `#fbfaf6` |
| `--raise-2` | `#25403a` | `#efede5` |
| `--fg` | `#F2F1EC` | `#172923` |
| `--muted` | `#a8b7ae` | `#4c5f56` |
| `--faint` | `#6f857a` | `#7d8c84` |
| `--line` | `rgba(242,241,236,.11)` | `rgba(23,41,35,.12)` |
| `--line-strong` | `rgba(242,241,236,.22)` | `rgba(23,41,35,.24)` |
| `--accent` | `#FFD000` | `#FFD000` |
| `--accent-ink` (text on yellow) | `#172923` | `#172923` |
| `--accent-text` (yellow used as text) | `#FFD000` | `#806200` |
| `--accent-soft` | `rgba(255,208,0,.12)` | `rgba(255,208,0,.22)` |
| `--ok` (online green) | `#3ddc84` | `#139a52` |

In light mode, "vee" in the hero name gets a 3px `#172923` text stroke so the yellow stays readable.

**Fonts**
- Display: **Unbounded** (600, 800, 900) for headings, the hero name and the marquee. Tight tracking, about `-0.04em`.
- Body: **Instrument Sans** (400, 500, 600)
- Mono: **JetBrains Mono** (400, 500, 700) for labels, nav links, buttons, file paths and data

**Feel**: techy, IDE-like. Each section has a small mono "file path" eyebrow (for example `~/now/building.md`). Corner radius is 14px on cards, 12px on buttons and 18px on the nav bar. Add a subtle animated film-grain overlay at about 5% opacity.

## 3. Page sections (single page, in this order)

1. **Floating nav**: fixed, detached from the edges (14px from the top, max width 1156px, 18px radius), frosted glass (`backdrop-filter: blur(16px)`), 1px border. The shadow deepens after scrolling 30px. Contents:
   - Left: yellow "BV" logo badge with a periodic shine sweep, then "Bonavee" with ".dev" in yellow
   - Middle (≥1180px only): mono links: building, github, portfolio, stack, reading, writing, resume. A yellow underline slides to the link for the section in view (use Framer `layoutId`).
   - Right: status pill (hidden under 600px), theme toggle, and a yellow "Book a call" button
   - Nav links scroll smoothly. Sections have `scroll-margin-top: 90px`.
2. **Hero**:
   - Background: a canvas of GitHub-contribution-style squares (22px grid). Some squares twinkle yellow, a diagonal yellow wave sweeps across, and squares near the cursor light up. A radial fade blends it into the page.
   - Left column:
     - Mono line `~/bonavee $` followed by a typed greeting: "Good morning", "Good afternoon" or "Good evening" from the visitor's local time (morning 5–12, afternoon 12–17, evening otherwise), then ". Welcome in."
     - Full name **"Chukwuebuka Bonaventure Nnamah"** in bold mono, 15–18px, plus " · Full-stack & AI" (hidden under 520px)
     - Hero name **typed like code**: `<Bonavee />`. The `<` and `/>` are small grey mono. "Bona" is in the fg color and "vee" in yellow, both Unbounded 900. A big yellow block cursor blinks after it. The name types character by character, 70–160ms per character, starting after the intro.
     - Lede: "Full-stack developer working with AI. I build {rotating phrase} from the first schema to the last pixel." The rotating phrase cycles every 2.4s through "Next.js frontends", "FastAPI backends", "AI agents" and "products people use", sliding up with a yellow highlighter underline.
     - Buttons: "See my portfolio →" (yellow, magnetic hover) and "Download résumé" (ghost)
   - Right column: the **hero photo carousel** (section 5) with the **status card** overlapping its bottom-left corner on desktop, and stacked under the photo on mobile.
3. **Stack marquee**: a yellow band of Unbounded words with diamond separators that scrolls forever and pauses on hover: Next.js, TypeScript, React, Tailwind, FastAPI, Python, SQLModel, Alembic, LLM agents, JavaScript.
4. **Currently building** (`~/now/building.md`). Data comes from `content/now.ts`.
   - Featured card: tags, title, description, a small animated UI preview (chat bubbles with a typing indicator), and a striped yellow progress bar that animates its fill.
   - "Progress notes" card: a vertical commit-log timeline. Done items have a yellow check node, and the current item has a pulsing node.
5. **GitHub** (`github.com/Bonvee120`):
   - Contribution graph: 53 weeks × 7 days, 5 yellow intensity levels, cells pop in staggered. Above it, the yearly total counts up.
   - Stat tiles that count up: public repos, current streak, merged PRs, portfolio repos
   - Recent activity feed: pushes, merged PRs, stars, new repos and releases, each with an icon and relative time
   - Repo cards: repos with the **`portfolio` topic** appear automatically, showing name, description, language dot and stars
6. **Portfolio** (`~/portfolio/`, heading "My portfolio"). Project cards from `content/projects.ts`: screenshot in a fake browser frame that lifts on hover, title, description, tech tags, "Live demo ↗" and "Source ↗" links. Cards tilt in 3D toward the cursor.
7. **The stack**: two cards. Frontend: HTML, CSS, Tailwind, JavaScript, TypeScript, React, Next.js. Backend: Python, FastAPI, SQLModel, Alembic. Chips turn yellow and tilt slightly on hover. Below them, a "How a request flows" pipeline: Browser → Next.js → FastAPI → SQLModel → Postgres, with yellow dots travelling along dashed wires. It runs horizontally on desktop and vertically on mobile.
8. **Reading this month** (the heading shows the current month name): book cards from `content/books.ts`. Each card has a cover image (tilted in 3D, straightens on hover), title, author and a reading-progress bar.
9. **Writing**: the latest Medium posts as full-width rows showing date, read time, title and "Read on Medium →". On hover, a yellow fill rises from the bottom and the arrow rotates.
10. **Résumé**:
    - Left card:
      - Role tabs from `content/cvs.ts` (Full-stack, Frontend, Backend, AI / ML). The tabs have a sliding yellow pill, and switching fades the summary text.
      - Facts: languages, recognition, speaking
      - A PDF download button showing the role's file name and page count. It is a real download link to `/cv/<file>`.
    - Right card: experience and education timeline (see section 7)
11. **Contact**:
    - Huge "Let's build something good." with "good." in yellow
    - Social icon buttons that lift and rotate on hover
    - Booking card: "Book a 30-min call" with a button that opens the Google Calendar booking page in a new tab, and the email address with a Copy button
12. **Footer**: "© {year} Chukwuebuka Bonaventure Nnamah · Bonavee" and "Built with Next.js · TypeScript · Tailwind · Framer Motion"

Do not show any location (city or country) anywhere on the site.

## 4. Status card and heartbeat

The status card looks like an editor window titled `status.ts` with three traffic-light dots. It shows:
- A large lamp. **Working** has a green pulsing glow. **Not working** has a grey lamp.
- A subline: "Laptop online · coding in VS Code", or "Laptop offline · no heartbeat for {time}"
- **Local time**: the visitor's own clock, ticking every second
- **Heartbeat**: a small ECG line that animates while online, plus "Ns ago"

No toggle on the live site. The status is real.

**How "online" works**
- `POST /api/heartbeat` takes the header `Authorization: Bearer ${HEARTBEAT_SECRET}` and a body like `{ "source": "laptop", "vscode": true }`. It stores `{ lastSeen: Date.now(), source, vscode }` in Upstash Redis under the key `status`. Reject wrong secrets with 401.
- `GET /api/status` returns `{ online: now - lastSeen < 3 * 60_000, lastSeen, vscode }` with `Cache-Control: no-store`.
- The client polls `/api/status` every 30s and updates the nav pill and the status card.

**The heartbeat script**: create `scripts/heartbeat.py`. It uses only the Python standard library and loads environment variables from a local `.env` if one exists.

```python
# Sends "I'm online" to bonavee.dev every 60s while this computer is on and connected.
import json, os, time, urllib.request, subprocess, platform

URL = os.environ.get("HEARTBEAT_URL", "https://bonavee.dev/api/heartbeat")
SECRET = os.environ["HEARTBEAT_SECRET"]

def vscode_running() -> bool:
    try:
        if platform.system() == "Windows":
            out = subprocess.run(["tasklist"], capture_output=True, text=True).stdout
            return "Code.exe" in out
        out = subprocess.run(["pgrep", "-f", "Visual Studio Code|/code"], capture_output=True, text=True).stdout
        return bool(out.strip())
    except Exception:
        return False

while True:
    try:
        body = json.dumps({"source": "laptop", "vscode": vscode_running()}).encode()
        req = urllib.request.Request(URL, data=body, method="POST", headers={
            "Content-Type": "application/json", "Authorization": f"Bearer {SECRET}"})
        urllib.request.urlopen(req, timeout=10)
    except Exception:
        pass  # offline or site down: try again next minute
    time.sleep(60)
```

Write `scripts/README.md` explaining how to start the script automatically at login:
- **Windows**: Task Scheduler, trigger "At log on", action `pythonw.exe path\to\heartbeat.py`
- **macOS**: a `~/Library/LaunchAgents/dev.bonavee.heartbeat.plist` with `RunAtLoad` and `KeepAlive`
- **Linux**: a systemd user service

## 5. Hero photo carousel

- Images are read at build time from `public/hero/` with `fs.readdirSync`. Files are sorted by name (`01.jpg`, `02.jpg`, …). Optional captions come from `content/hero.ts` (`{ file: "01.jpg", caption: "BONAVEE // FULL-STACK" }`). If a file has no entry, use "BONAVEE // PHOTO NN". Adding or removing a file needs no code change.
- 4:5 frame, 22px radius, yellow corner brackets, a small caption chip at the top-left, a "01 / 03" counter at the bottom-right, and a dark gradient at the bottom
- Auto-advances every 5s. Story-style progress bars at the top show the timer, and clicking a bar jumps to that photo.
- **Transition**: the next photo wipes in from the right (`clip-path: inset(0 0 0 100%)` → `inset(0)`, 0.9s, ease `[.75,0,.15,1]`) behind a glowing 3px yellow edge, with a short zoom and colour flash (scale 1.12 → 1, saturate and hue shift settling to normal). A yellow scan line sweeps down the frame on each change.
- Hover or keyboard focus pauses the timer. Prev/next arrow buttons fade in on hover and are always visible on touch screens. Swipe works on mobile.
- Use `next/image` with `priority` for the first photo.

## 6. Motion spec

Wrap the app in Framer Motion's `MotionConfig reducedMotion="user"`, and also gate the canvas, grain, cursor and intro on `prefers-reduced-motion`. Reduced-motion visitors get a complete, static page.

- **Intro (about 1.4s, first visit per session only, via sessionStorage)**:
  1. A full-screen dark panel shows mono lines that appear one by one: `> bonavee.dev`, `> loading modules ........ ok`, `> heartbeat ............. online`, `> welcome`, plus a yellow loading bar.
  2. The dark panel wipes upward, and a yellow panel follows 0.2s later.
  3. Then the hero name types itself, the greeting types, and the photo and status card float up.
- **Section reveal**: each section heading rises out of a clip mask (`clip-path` from the bottom plus translateY 40%, 1s). Cards fade up 40px with a slight blur clearing, staggered about 90ms. Run once, with `useInView({ once: true, margin: "-6%" })`. Content above the fold renders visible immediately.
- **Nav**: the yellow underline slides between links (spring). The status dot pulses when online.
- **Segmented tabs** (résumé roles): a sliding yellow pill with a springy curve `[.3,1.25,.45,1]`, 0.4s.
- **Theme switch**: the new theme spreads out as a circle from the click point using the View Transitions API (`document.startViewTransition` plus a `clip-path: circle()` animation on `::view-transition-new(root)`, 650ms). If the API is missing, switch instantly.
- **Hover**:
  - Primary buttons are magnetic (follow the cursor by about 25%).
  - Cards have a yellow radial spotlight that follows the cursor.
  - Project cards tilt in 3D (±8°).
  - Repo cards lift 4px.
- **Custom cursor** on fine pointers: a 34px yellow ring with `mix-blend-mode: difference` that grows on links and buttons
- **Count-ups**: numbers ease out over 1.4s when they come into view

## 7. Content and data

All editable content lives in `content/`. The owner edits these files and drops files into `public/`, with no other code changes needed.

| File | Shape |
|---|---|
| `content/now.ts` | `{ title, description, tags[], progress: 0-100, milestone, notes: { date, text, state: "done" \| "now" }[] }` |
| `content/projects.ts` | `{ title, description, image: "/projects/x.png", tags[], demo?, source? }[]` |
| `content/books.ts` | `{ title, author, cover: "/books/x.jpg", progress: 0-100, month: "2026-10" }[]`. Show the entries for the current month, or the latest month if the current one has none. |
| `content/cvs.ts` | `{ role, file: "Nnamah_CV_AI.pdf", pages, summary }[]`. PDFs go in `public/cv/`. A new line here creates a new tab. |
| `content/hero.ts` | optional captions for `public/hero/*` |
| `content/resume.ts` | experience and education (below) |
| `content/site.ts` | name, email, socials, booking URL |

**Résumé seed** (from the owner's older CV; keep the wording tight):
- Experience:
  - **Full-stack developer**, Freelance, 2025–now: building web apps and AI features with Next.js, TypeScript and FastAPI. *(The owner will expand this.)*
  - **Operations Manager**, Eco-Cyclers, Mar 2022–now:
    - Led 10+ grassroots waste management initiatives, raising collection efficiency by 25%.
    - Cut operating costs by 30% through planning and logistics.
    - Built a community engagement programme that lifted participation by 40%.
  - **Volunteer Engagement Manager**, SustyVibes, Nov 2023–now: engages 100+ community members through events, trainings and monthly check-ins.
  - **Administrative Assistant**, Edunamic, Apr–Aug 2023: cut scheduling conflicts by 15% and kept email responses 100% on time.
- Education:
  - B.Sc. Political Science, University of Nigeria, Nsukka (2017–2022)
  - Certificate in Climate Action, Greenswitch Academy (2023)
- Facts:
  - Languages: English and Igbo, both fluent
  - Recognition: SustyViber of the Month, ALX Virtual Assistant
  - Speaking: World Environment Day on Afia TV and Solid FM

**GitHub (server-side, `lib/github.ts`, revalidate every hour)**
- Repos: `GET https://api.github.com/users/Bonvee120/repos?per_page=100&sort=updated`. Keep repos whose `topics` include `"portfolio"`. Show name, description, language, stars and URL.
- Recent activity: `GET https://api.github.com/users/Bonvee120/events/public?per_page=15`. Map PushEvent, PullRequestEvent (merged), WatchEvent, CreateEvent and ReleaseEvent to feed items.
- Contribution graph and total: the GraphQL API `user(login:"Bonvee120"){ contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } }`. This needs `GITHUB_TOKEN` (a fine-grained token with read-only public access).
- Compute the streak from the calendar. If the API fails, render the section with a quiet "GitHub is unavailable right now" state. Never crash the page.

**Medium (`lib/medium.ts`, revalidate every hour)**
- Fetch the RSS feed at `https://medium.com/feed/@bonavee120`, falling back to `https://bonavee120.medium.com/feed`, and parse it with `fast-xml-parser`.
- Show the latest 3–5 posts: title, link, publish date, and read time estimated from the content at 230 words per minute.

**Site config (`content/site.ts`)**
- Email: `chukwuebukannamah@gmail.com`
- LinkedIn: https://www.linkedin.com/in/chukwuebuka-bonaventure-nnamah
- X: https://x.com/Bonaventure_NC
- Facebook: https://www.facebook.com/share/1k1Eg1R8u1/
- GitHub: https://github.com/Bonvee120
- Medium: https://bonavee120.medium.com
- Booking: `process.env.NEXT_PUBLIC_BOOKING_URL`, a Google Calendar appointment-schedule booking page. Open it in a new tab.

## 8. Environment variables

`.env.example` lists all of these. Real values go in `.env.local` locally and in the Vercel project settings.

```
GITHUB_TOKEN=
HEARTBEAT_SECRET=            # long random string, also used by scripts/heartbeat.py
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_BOOKING_URL=     # Google Calendar appointment schedule link
NEXT_PUBLIC_SITE_URL=https://bonavee.dev
```

## 9. Quality bar

- Lighthouse 95+ on Performance, Accessibility, Best practices and SEO
- Fully responsive from 360px up, with no horizontal scrolling
- Semantic HTML and a visible yellow focus ring
- Every animation respects reduced motion
- Add metadata and Open Graph tags (generate the OG image with `next/og` in the site style), `sitemap.ts`, `robots.ts` and a favicon based on the BV badge
- Server components by default. Use `"use client"` only for interactive pieces (canvas, carousel, tabs, status polling, theme, cursor).

## 10. Build order

Work in phases. After each phase, run `pnpm build` and `pnpm lint`, fix any errors, commit, and stop so the owner can review before the next phase.

1. **Scaffold**: this folder already has `CLAUDE.md`, `design/` and `assets/`, so run create-next-app in a temporary folder and move the generated files in here. Then move `assets/hero/*` to `public/hero/`. Use create-next-app (TS, Tailwind, App Router, src), add Framer Motion and next-themes, set up the fonts, tokens, light/dark themes, the base layout, the floating nav and the footer.
2. **Hero**: background canvas, greeting, code-typed name, rotating lede, buttons, status card (static for now) and the photo carousel reading `public/hero/`.
3. **Static sections**: marquee, Currently building, Portfolio, Stack and pipeline, Books, Résumé with CV tabs, Contact. All of these are driven by the `content/` files.
4. **Live data**: GitHub (repos, graph, stats, activity) and the Medium feed, with caching and fallbacks.
5. **Heartbeat**: Upstash setup, the `/api/heartbeat` and `/api/status` routes, live status polling, `scripts/heartbeat.py` and `scripts/README.md`.
6. **Motion pass**: intro, section reveals, nav underline, tab pills, theme wipe, cursor, magnetic buttons, tilt, and the reduced-motion check.
7. **Polish and ship**: SEO, OG image, Lighthouse fixes, a README for the owner, and deploying to Vercel.
