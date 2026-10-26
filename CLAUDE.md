# Bonavee.dev: build brief

This file tells Claude Code how to build the personal portfolio site for **Chukwuebuka Bonaventure Nnamah ("Bonavee")**, a full-stack developer who also builds AI features and **AI automations with n8n and Zapier**. GitHub: `Bonvee120`.

`design/mockup.html` in this folder is the approved design. Open it in a browser and match it closely: colors, fonts, components, copy tone and every animation. The owner has signed off on the colors, fonts and motion, so do not change them. The mockup has two pages: the homepage, and the portfolio page (click "portfolio" in the nav or "See my portfolio" to see it, along with the yellow page transition). Its "Read case study" overlay shows the design of the `/portfolio/[slug]` page. When this brief and the mockup disagree, the brief wins. The mockup's "Preview controls" panel is a mockup-only tool and must not ship.

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

**Layout container** (one shared `<Container>` component in `src/components/container.tsx`; every section, the nav, hero, grids, cards and footer use it so edges line up):
- Max width **1520px** (was 1180px), centred. Define it once as `--maxw: 1520px` and a Tailwind `maxWidth.container`; never hardcode page widths elsewhere.
- Side padding (gutter): 16px under 720px, 32px from 720px, **56px from 1280px**, **64px from 1680px**. Mobile and tablet (under 1280px) look exactly as before.
- Usable content width at full size: 1520 − 2×56 = **1408px** (was 1180 − 2×32 = 1116px).
- From 1280px up, grids grow proportionally instead of text stretching: hero columns `1.1fr 1fr` with an 80–96px gap; repos `auto-fit minmax(300px,1fr)`; projects `auto-fit minmax(340px,1fr)`; GitHub panel `1fr minmax(340px,28%)`; résumé sidebar `minmax(320px,26%) 1fr`; portfolio hero `1.6fr 1fr`; about `minmax(0,420px) 1fr`; case-study sheet up to 1200px.
- Text keeps readable measures: body copy and ledes cap at 40–60ch even when the container is wide. Section-head blurbs go up to 52ch.
- Hero imagery scales with the container: photo, back card and orbits grow to 480px wide at 1280px+, and the hero name goes up to 112px.

**Feel**: techy, IDE-like. Each section has a small mono "file path" eyebrow (for example `~/now/building.md`). Corner radius is 14px on cards, 12px on buttons and 18px on the nav bar. Add a subtle animated film-grain overlay at about 5% opacity.

## 3. Site structure and pages

The personal brand (homepage) pulls people in, and the **standalone `/portfolio` page** closes the deal. A client should see proof within 10 seconds there and be able to dig deeper. Every page shares the floating nav, the footer, the film grain, the custom cursor and the "Book a call" button, so booking is always one click away.

**Routes**

| Route | Purpose |
|---|---|
| `/` | Personal brand homepage: who Bonavee is, what he's building, what he's reading and writing. Links clearly to the portfolio. |
| `/portfolio` | **The standalone portfolio and sales page** for clients. It covers all six items below. |
| `/portfolio/[slug]` | One case-study page per project |
| `/now` | Currently building, GitHub activity and the reading list (an expanded version of the homepage sections) |
| `/writing` | All Medium posts |
| `/resume` | Role-based CVs and the timeline |

### Shared pieces

- **Floating nav**:
  - Fixed and detached from the edges: 14px from the top, 18px radius. Its width matches the container: the nav box lines up with the content edges (container width minus the gutters, plus 24px so the logo sits on the content edge).
  - Frosted glass (`backdrop-filter: blur(16px)`) with a 1px border. The shadow deepens after scrolling 30px.
  - Left: yellow "BV" logo badge with a periodic shine sweep, then "Bonavee" with ".dev" in yellow. It links to `/`.
  - Middle (≥1180px only): mono links to home, **portfolio**, now, github, reading, writing and resume.
  - The yellow underline (Framer `layoutId`) sits on "portfolio" anywhere under `/portfolio`. On `/`, it follows the section in view.
  - Right: status pill (hidden under 600px), theme toggle and a yellow "Book a call" button that opens the booking link.
  - Under 1180px, add a menu button that opens a full-screen sheet. The links stagger in, and the sheet wipes down with the same easing as the intro.
- **Page transitions**: on every route change, a full-screen yellow panel wipes up (`clip-path` 0.45s, ease `[.75,0,.2,1]`). It shows the destination path in the middle in bold mono, for example `bonavee.dev/portfolio`. It then wipes away upward (0.5s), and the new page's hero rises in staggered (heading, subline, buttons, side card; translateY 40px plus blur clearing, 0.9s). Use Framer `AnimatePresence` in `app/template.tsx`. This is exactly the transition in the mockup when you click "portfolio".
- **Footer**: "© {year} Chukwuebuka Bonaventure Nnamah · Bonavee", the social icons and "Built with Next.js · TypeScript · Tailwind · Framer Motion".
- **Section eyebrows**: a small mono path for each section, written as the real route (for example `bonavee.dev/portfolio#services` or `~/now/building.md`).
- **Location**: do not show any location (city or country) anywhere on the site.

### `/` Homepage: the personal brand (in this order)

1. **Hero** (roomy and full-height: `min-height: min(100svh, 980px)`, content vertically centred):
   - Spacing: side padding 16px on phones, 48px from 720px up. Vertical padding 136px top / 112px bottom on mobile, 150px / 120px from 960px. Column gap 56px on mobile, 80px on desktop. Columns `1.25fr 1fr`. Lede `max-width: 40ch`, line-height 1.62, 30px above it; buttons 42px below the lede; stats row 46px below the buttons.
   - Background: a canvas of GitHub-contribution-style squares (22px grid). Some squares twinkle yellow, a diagonal yellow wave sweeps across, and squares near the cursor light up. A soft radial fade clears the grid behind the text column (bg colour at the centre, transparent by about 62%) and a bottom fade blends into the marquee.
   - Two blurred glow orbs drift slowly (14s and 18s, alternate): a yellow one behind the photo (opacity .32) and a faint green one bottom-left (opacity .18).
   - Left column:
     - **Availability pill** first: a rounded glassy pill linking to the contact section, with a yellow "OPEN" tag and "Taking new projects this quarter →" in mono 12.5px (" this quarter" hidden under 520px). It lifts 2px and gets a yellow border on hover. Text comes from `content/site.ts` (`availability: { open: boolean, label: string }`); hide the pill when `open` is false.
     - Mono line `~/bonavee $` followed by a typed greeting: "Good morning", "Good afternoon" or "Good evening" from the visitor's local time (morning 5–12, afternoon 12–17, evening otherwise), then ". Welcome in."
     - Full name **"Chukwuebuka Bonaventure Nnamah"** in bold mono, 15–18px, plus " · Full-stack · AI · Automation" (hidden under 520px).
     - Hero name **typed like code**: `<Bonavee />`. The `<` and `/>` are small grey mono. "Bona" is in the fg color and "vee" in yellow, both Unbounded 900. A big yellow block cursor blinks after it. The name types character by character, 70–160ms per character, starting after the intro.
     - Lede: "Full-stack developer working with AI. I build {rotating} from the first schema to the last pixel." The rotating phrase cycles every 2.4s through "Next.js frontends", "FastAPI backends", "AI agents", "n8n & Zapier automations" and "products people use", sliding up with a yellow highlighter underline.
     - Buttons: "See my portfolio →" (yellow, magnetic, goes to `/portfolio`) and "Book a call" (ghost).
     - **Stats row**: a dashed top border, then three facts split by thin dividers: "3+ years shipping", "9 projects live", "24h reply time". Numbers in Unbounded 800 (24–32px) with the suffix ("+", "h") in the accent colour; labels in faint mono 11.5px. Values come from `content/portfolio.ts` stats so they match the portfolio hero.
   - Right column: the **hero photo carousel** (section 5), 400px wide max, with depth layers behind it:
     - A yellow "back card" the same size, rotated 5deg (3deg on mobile) and offset, with faint diagonal hatching.
     - Two slow-spinning orbit rings (desktop only): a dashed yellow ring (60s) with a glowing yellow dot, and a thin solid ring (90s, reverse) with a small dark dot.
     - The **status card** (290px) overlaps the photo's lower-left on desktop, kept clear of the face. Between 960 and 1239px it sits lower and further left (270px wide). On mobile it stacks under the photo.
   - **Scroll cue** at the bottom centre (desktop, viewport height 760px+): a small mouse outline with a yellow dot that drips down, plus "SCROLL" in mono.
   - All hero motion stops under `prefers-reduced-motion`.
2. **Stack marquee**: a yellow band of Unbounded words with diamond separators that scrolls forever and pauses on hover: Next.js, TypeScript, React, Tailwind, FastAPI, Python, SQLModel, Alembic, LLM agents, n8n, Zapier, JavaScript.
3. **"Looking to hire?" card**: one large card that links to `/portfolio`.
   - Left: eyebrow `bonavee.dev/portfolio`, heading "Looking to *hire?*" and the line "Case studies with real results, services and prices, how I work, and what clients say. All on one page."
   - Middle: a mono "→" list of Case studies, Services & prices, Process and Testimonials.
   - Right: an "Open the portfolio →" button.
   - Hover: the card lifts 4px, the border turns yellow and the spotlight follows the cursor.
4. **Currently building** (`content/now.ts`):
   - Featured card: tags, title, description, a small animated UI preview (chat bubbles with a typing indicator) and a striped yellow progress bar that animates its fill.
   - "Progress notes" card: a vertical commit-log timeline. Done items have a yellow check node, and the current item has a pulsing node.
5. **GitHub**:
   - Contribution graph: 53 weeks × 7 days, 5 yellow intensity levels, cells pop in staggered. Above it, the yearly total counts up.
   - Stat tiles that count up: public repos, current streak, merged PRs, portfolio repos.
   - Recent activity feed: pushes, merged PRs, stars, new repos and releases, each with an icon and relative time.
   - Repo cards: repos with the **`portfolio` topic** appear automatically.
6. **The stack**:
   - Three cards (columns 1.3fr 1fr 1fr on desktop):
     - Frontend: HTML, CSS, Tailwind, JavaScript, TypeScript, React, Next.js
     - Backend: Python, FastAPI, SQLModel, Alembic
     - AI & automation: n8n, Zapier, OpenAI, Claude, Webhooks
     Chips turn yellow and tilt on hover.
   - The "How a request flows" pipeline below: Browser → Next.js → FastAPI → SQLModel → Postgres, with yellow dots travelling along dashed wires.
7. **Reading this month**: book cards from `content/books.ts`. Each has a cover tilted in 3D that straightens on hover, the title, the author and a progress bar.
8. **Writing**: heading "My *writing*" ("writing" in yellow), eyebrow `bonavee120.medium.com/feed`. Shows the latest 3 Medium posts as full-width rows. On hover, a yellow fill rises from the bottom. Add "All posts →" linking to `/writing`.
9. **Résumé**: the same block as `/resume` (role tabs and timeline).
10. **Contact / booking**:
    - Huge "Let's build something good." with "good." in yellow
    - Socials
    - A booking card with "Book a 30-min call" and the email address with a Copy button

### `/portfolio`: the standalone portfolio (in this order)

This page has to work on its own. A client who lands here from a link should not need the homepage.

1. **Value-line hero** (`#top`):
   - Background: a faint 22px grid with a soft yellow glow at the top-right, fading into the page.
   - Left:
     - Eyebrow `bonavee.dev/portfolio`
     - Headline in Unbounded 800 at 34–72px: "I build *web apps*, *AI features* & *automations* that help businesses **grow.**". "web apps", "AI features" and "automations" are yellow text. "grow." sits on a solid yellow bar (dark text) that draws in from left to right (scaleX, 1s, 0.5s delay).
     - Subline: "Full-stack developer and AI automation builder. Next.js, FastAPI and LLMs for products, n8n and Zapier for the busywork. I take projects from first call to launch, and stay around after."
     - Buttons: "Book a call →" and "See case studies".
   - Right card:
     - "Available for new projects" with the live status dot
     - Four stat tiles: projects shipped, reply time, years leading teams, ways to hire me. They come from `content/portfolio.ts`, and numbers count up.
     - Jump links as pill chips: Case studies, Proof, Services, Process, About.
2. **Case studies** (`#work`): the 3–5 projects marked `featured`, plus "See all" if there are more. Each card has:
   - A screenshot in a fake browser frame that lifts on hover
   - Title, one-line summary and tech tags
   - **Two result tiles** (big yellow Unbounded number plus a mono label)
   - "Read case study →" (to `/portfolio/[slug]`) and "Live ↗"
   - A 3D tilt toward the cursor
   Filter chips (Web apps, AI, APIs, Websites) with the sliding yellow pill appear once there are more than 5 projects.
3. **Proof** (`#proof`, heading "Proof, not *promises*"):
   - The big rotating testimonial card: yellow quote mark, quote in Unbounded 600 at 20–32px, avatar, name and role.
   - Progress dashes switch quotes. It auto-rotates every 6.5s and pauses on hover. The swap fades out with a 12px drop and blur, then fades in.
   - A "Worked with" row of names or logos.
   - **Google reviews** (separate from the hand-picked testimonials above):
     - Header: a Google "G" mark, the overall rating in Unbounded 900 with 5 yellow stars, and "from {count} reviews on Google". On the right, two buttons: "See all on Google ↗" (ghost) and "Leave a review" (yellow). They open the Google Maps place URL and `NEXT_PUBLIC_GOOGLE_REVIEW_URL` in new tabs.
     - Up to 5 review cards in a horizontally scrolling, snap-aligned row. Each card has the reviewer photo (or initials), name, relative time (for example "2 weeks ago"), a small Google mark, stars and the review text clamped to 5 lines. Cards lift on hover.
     - Show Google's required attribution: reviewer names link to their profiles, plus "Reviews from Google".
     - The whole block **hides itself** when the env vars are missing, the API fails or there are no reviews.
   - "Certifications & awards": cards with a yellow check or star tile, title and issuer/year. They lift and get a yellow border on hover. Seed data: Certificate in Climate Action (Greenswitch Academy, 2023), ALX Virtual Assistant (ALX) and SustyViber of the Month (SustyVibes).
4. **Services** (`#services`, heading "What you can *hire me* for"), 5 cards from `content/services.ts`:
   - Layout: 3 columns on desktop and 2 on tablet. The **featured** card ("AI automation") spans 2 columns, has a yellow-tinted border and gradient, and a "Most requested" yellow tag in its corner.
   - The featured card shows a small animated workflow strip: "New lead" → "n8n" → "AI scores it" → "CRM + Slack". The middle nodes have yellow borders, and yellow dots travel along the dashed connectors. The strip scrolls sideways on narrow screens.
   - Seed services:
     - **AI automation** (featured): n8n and Zapier workflows, AI agents with OpenAI and Claude, connecting Gmail, Sheets, CRMs and Slack. From $400 per workflow.
     - **Web apps**: from $1,500
     - **AI features**: from $1,200
     - **APIs & backends**: from $900
     - **Websites**: from $600
   - Icon tile (yellow-soft, turns solid yellow and rotates -8° on hover)
   - Title, description, 3 deliverables as a mono "→" list
   - "from $X" under a dashed rule, hidden when empty
   - Cards lift 6px and get a yellow border on hover
5. **Process** (`#process`, heading "How we'll *work*"), 5 steps from `content/process.ts`: Discover, Design, Build, Launch, Support.
   - Each step: a numbered node, title, description and a mono time label.
   - Horizontal on desktop, vertical on mobile.
   - On scroll-in, a glowing yellow line draws through the steps one by one (about 0.45s each), and each node fills yellow as the line reaches it.
6. **About** (`#about`, heading "From operations *to code*"):
   - Left: a 4:5 photo (the first hero image, or `content/about.ts` `photo`) with a name chip. It zooms slightly and loses its slight grayscale on hover.
   - Right: a large lead paragraph, two body paragraphs (background, and why he does this work) and "Book a call".
   - Under the text, a facts card with count-ups: years leading projects, initiatives led, community members engaged, languages.
7. **CTA** (`#cta`): a solid yellow card with eyebrow `~/next-step`, "Have a project *in mind?*" (the em is underlined), "Book a free 30-minute call. You'll get a written scope and price within 48 hours.", a dark "Book a call" button and the email address.

### `/portfolio/[slug]` Case-study page

Statically generate one page per MDX file in `content/case-studies/`.
- **Header**:
  - Mono path `bonavee.dev/portfolio/{slug}`
  - Huge title and summary
  - A meta row with Role, Timeline, Stack, and optionally Client
- **Result tiles**: 2–4 metrics. The first tile is solid yellow and the rest are cards. They pop up staggered by 0.1s.
- **Body**: "The problem" and "What I built" side by side on desktop, then optional "How it works" with screenshots or a diagram, "Results" and a "Testimonial" quote if one is linked.
- **Gallery**: screenshots in browser frames. Clicking one opens a lightbox.
- **Links**: "Visit live site ↗", "View source ↗" and "Start a project like this" (booking).
- **Next / previous case study** at the bottom.
- **Page entry**: the sheet-style rise from the mockup's case-study overlay (translateY 60px plus a clip-path reveal, 0.6s).
- **Metadata**: SEO title/description and a generated OG image for each case study.

### `/now`

- **Currently building** (`content/now.ts`):
  - Featured card: tags, title, description, a small animated UI preview (chat bubbles with a typing indicator) and a striped yellow progress bar that animates its fill.
  - "Progress notes" card: a vertical commit-log timeline. Done items have a yellow check node, and the current item has a pulsing node.
- **GitHub**:
  - Contribution graph: 53 weeks × 7 days, 5 yellow intensity levels, cells pop in staggered. Above it, the yearly total counts up.
  - Stat tiles that count up: public repos, current streak, merged PRs, portfolio repos.
  - Recent activity feed: pushes, merged PRs, stars, new repos and releases, each with an icon and relative time.
  - Repo cards: repos with the **`portfolio` topic** appear automatically, showing name, description, language dot and stars.
- **Reading this month** (the heading shows the current month name): book cards from `content/books.ts`. Each has a cover image (tilted in 3D, straightens on hover), title, author and a reading-progress bar.

### `/writing`

Page heading: "My *writing*", the same as the homepage section.

All Medium posts as full-width rows showing date, read time, title and "Read on Medium →". On hover, a yellow fill rises from the bottom and the arrow rotates. The homepage shows the latest 3 and links here.

### `/resume`

- **Left card**:
  - Role tabs from `content/cvs.ts` (Full-stack, Frontend, Backend, AI / ML). The tabs have a sliding yellow pill, and switching fades the summary text.
  - Facts: languages, recognition, speaking.
  - A PDF download button showing the role's file name and page count. It is a real download link to `/cv/<file>`.
- **Right card**: the experience and education timeline (see section 7).

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

- **Intro (about 1.4s, homepage only, first visit per session only, via sessionStorage)**:
  1. A full-screen dark panel shows mono lines that appear one by one: `> bonavee.dev`, `> loading modules ........ ok`, `> heartbeat ............. online`, `> welcome`, plus a yellow loading bar.
  2. The dark panel wipes upward, and a yellow panel follows 0.2s later.
  3. Then the hero name types itself, the greeting types, and the photo and status card float up.
- **Section reveal**: each section heading rises out of a clip mask (`clip-path` from the bottom plus translateY 40%, 1s). Cards fade up 40px with a slight blur clearing, staggered about 90ms. Run once, with `useInView({ once: true, margin: "-6%" })`. Content above the fold renders visible immediately.
- **Nav**: the yellow underline slides between links (spring). The status dot pulses when online.
- **Segmented tabs** (résumé roles, portfolio filters): a sliding yellow pill with a springy curve `[.3,1.25,.45,1]`, 0.4s.
- **Theme switch**: the new theme spreads out as a circle from the click point using the View Transitions API (`document.startViewTransition` plus a `clip-path: circle()` animation on `::view-transition-new(root)`, 650ms). If the API is missing, switch instantly.
- **Hover**:
  - Primary buttons are magnetic (follow the cursor by about 25%).
  - Cards have a yellow radial spotlight that follows the cursor.
  - Project cards tilt in 3D (±8°).
  - Repo cards lift 4px.
- **Custom cursor** on fine pointers: a 34px yellow ring with `mix-blend-mode: difference` that grows on links and buttons
- **Count-ups**: numbers ease out over 1.4s when they come into view.
- **Process line**: draws step by step on scroll-in (see `/portfolio`).
- **Testimonial swap**: the old quote fades out with a 12px drop and blur, then the new one fades in. Rotates every 6.5s and pauses on hover.
- **Service cards**: lift 6px, the border turns yellow, and the icon tile fills yellow and rotates -8°.
- **Route change**: a yellow wipe plus the heading rising from its mask (see section 3).

## 7. Content and data

All editable content lives in `content/`. The owner edits these files and drops files into `public/`, with no other code changes needed. Use MDX for case studies (`next-mdx-remote` or `@next/mdx`, with `gray-matter` for frontmatter) and validate every content file with **zod** at build time, so a typo shows a clear error.

Add `content/README.md` that explains, in plain steps, how to add a case study, a service, a testimonial, a book, a CV and a hero photo.

**Case-study frontmatter**

```yaml
---
title: LedgerLite
slug: ledgerlite
summary: Sales and expense tracking for market traders, with a daily summary sent by SMS.
category: Web apps          # Web apps | AI | APIs | Websites (used by the filter chips)
featured: true              # the 3 featured ones show on the homepage
order: 1
role: Design + full-stack build
timeline: 6 weeks
client: Optional client name
stack: [Next.js, FastAPI, SQLModel, Postgres]
cover: /work/ledgerlite/cover.png
gallery: [/work/ledgerlite/1.png, /work/ledgerlite/2.png]
results:
  - { value: "3×", label: "faster daily close" }
  - { value: "120+", label: "traders onboarded" }
live: https://example.com
source: https://github.com/Bonvee120/ledgerlite
testimonial: client-name     # optional, matches a testimonial
---
```

Seed `content/case-studies/` with the three sample projects from the mockup (LedgerLite, DocChat and SustyHub, with the copy and metrics from its case-study overlay). Mark each one `draft: true` and show a small dashed "sample" tag on drafts, so the owner can replace them with real work. Seed services, process and testimonials from the mockup in the same way. Testimonials must use placeholder names until the owner adds real quotes. Never invent real-sounding people.

| File | Shape |
|---|---|
| `content/now.ts` | `{ title, description, tags[], progress: 0-100, milestone, notes: { date, text, state: "done" \| "now" }[] }` |
| `content/case-studies/*.mdx` | One file per project. The frontmatter is below, and the body is Markdown with "## The problem", "## What I built", "## How it works" and "## Results" sections. Images go in `public/work/<slug>/`. A new file creates a new card and a new page. |
| `content/services.ts` | `{ title, icon: "automation" \| "web" \| "ai" \| "api" \| "site", description, deliverables: string[], priceFrom?: string, priceUnit?: string, featured?: boolean, flow?: string[], category }[]` |
| `content/process.ts` | `{ title, description, time }[]` (5 steps) |
| `content/testimonials.ts` | `{ quote, name, role, company, avatar?: "/people/x.jpg", project?: slug, featured?: boolean }[]` plus `workedWith: { name, logo?: "/logos/x.svg" }[]` |
| `content/about.ts` | `{ lead, body: string[], photo?: "/about.jpg", facts: { label, value, count?: number, suffix? }[] }` |
| `content/portfolio.ts` | `{ headline, subline, stats: { label, value, count?: number }[], certifications: { title, issuer, year?, icon: "check" \| "star" }[] }` |
| `content/books.ts` | `{ title, author, cover: "/books/x.jpg", progress: 0-100, month: "2026-10" }[]`. Show the entries for the current month, or the latest month if the current one has none. |
| `content/cvs.ts` | `{ role, file: "Nnamah_CV_AI.pdf", pages, summary }[]`. PDFs go in `public/cv/`. A new line here creates a new tab. |
| `content/hero.ts` | optional captions for `public/hero/*` |
| `content/resume.ts` | experience and education (below) |
| `content/site.ts` | name, email, socials, booking URL, availability pill |

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

**Google reviews (`lib/google-reviews.ts`, server-only, revalidate every 86400s)**
- Call Google Places API (New) Place Details: `GET https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}` with the headers `X-Goog-Api-Key: ${GOOGLE_PLACES_API_KEY}` and `X-Goog-FieldMask: rating,userRatingCount,reviews,googleMapsUri`.
- Map each review to `{ rating, text: text.text, authorName: authorAttribution.displayName, authorPhoto: authorAttribution.photoUri, authorUrl: authorAttribution.uri, relativeTime: relativePublishTimeDescription }`.
- The API returns at most 5 reviews, and Google picks which ones. Never import this module in a client component. The key must never reach the browser (use `import "server-only"`).
- If either env var is missing or the call fails, return `null` and the block does not render.
- The owner gets `GOOGLE_PLACE_ID` from Google's Place ID Finder after creating the Business Profile. The "Leave a review" link is the profile's "Ask for reviews" share link.

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
GOOGLE_PLACES_API_KEY=       # server-only, restrict it to the Places API
GOOGLE_PLACE_ID=
NEXT_PUBLIC_GOOGLE_REVIEW_URL=   # the "Ask for reviews" link from the Google Business Profile
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
3. **Content layer**: the zod schemas, MDX case-study loading, all `content/` files with the seeds, and `content/README.md`.
4. **Homepage**: marquee, "Looking to hire?" card, Currently building, GitHub (static placeholders until phase 7), stack and pipeline, books, writing, résumé and contact/booking.
5. **Portfolio**: the standalone `/portfolio` page (value-line hero, case studies, proof with testimonials, logos and certifications, services, process, about with photo, CTA), then `/portfolio/[slug]` case-study pages with `generateStaticParams`, gallery lightbox, next/previous links and per-page OG images.
6. **Personal pages**: `/now` with the current build, GitHub and books, `/writing`, and `/resume` with CV tabs.
7. **Live data**: GitHub (repos, graph, stats, activity), the Medium feed and Google reviews, with caching and fallbacks.
8. **Heartbeat**: Upstash setup, the `/api/heartbeat` and `/api/status` routes, live status polling, `scripts/heartbeat.py` and `scripts/README.md`.
9. **Motion pass**: intro, the yellow route-transition wipe with the destination path, section reveals, nav underline, tab pills, process line, testimonial swap, theme wipe, cursor, magnetic buttons and tilt, then the reduced-motion check.
10. **Polish and ship**: SEO, sitemap including every case study, OG images, Lighthouse fixes, a README for the owner, and deploying to Vercel.
