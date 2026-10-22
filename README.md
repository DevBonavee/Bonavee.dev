# bonavee.dev

The personal site of Chukwuebuka Bonaventure Nnamah (Bonavee). Next.js 15 with the App Router, TypeScript, Tailwind CSS 4 and Framer Motion, hosted on Vercel.

`CLAUDE.md` is the original build brief and `design/mockup.html` is the approved design. This file covers the day-to-day: running it, editing content, and the settings it needs.

## Run it locally

You need Node.js 20 or newer.

```sh
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command          | What it does                                                            |
| ---------------- | ----------------------------------------------------------------------- |
| `npm run build`  | Production build. Run this before you push; Vercel runs the same thing. |
| `npm run start`  | Serves the production build locally.                                    |
| `npm run lint`   | ESLint.                                                                 |
| `npm run format` | Formats everything with Prettier. `npm run format:check` only checks.   |

If `npm run build` ever fails inside webpack with `WasmHash ... reading 'length'`, delete `.next/cache` and build again. It happens on Windows when a build runs while another Next.js process still has the `.next` folder open.

## Edit the content

Everything a visitor reads lives in `content/`, and images live in `public/`. You never need to touch `src/` to update the site.

| To change                    | Edit                                       | Notes                                                                                                              |
| ---------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Name, email, social links    | `content/site.ts`                          | The booking link comes from `NEXT_PUBLIC_BOOKING_URL`.                                                             |
| Hero photos                  | `public/hero/`                             | Drop in `01.jpg`, `02.jpg`, … They show in file-name order. With two or more, the progress bars and arrows appear. |
| Hero photo captions          | `content/hero.ts`                          | Optional. A photo with no caption shows "BONAVEE // PHOTO NN".                                                     |
| Currently building           | `content/now.ts`                           | `progress` is 0–100. In notes, wrap code in backticks: `` `Route` ``.                                              |
| Portfolio                    | `content/projects.ts` + `public/projects/` | Screenshots at 16:10 look best. Until the file exists the card draws a placeholder.                                |
| Books                        | `content/books.ts` + `public/books/`       | Set `month` to `"YYYY-MM"`. The site shows this month's books, or the most recent month that has some.             |
| Résumé PDFs and tabs         | `content/cvs.ts` + `public/cv/`            | One entry per tab. The first one is also the hero's "Download résumé" button.                                      |
| Experience, education, facts | `content/resume.ts`                        |                                                                                                                    |

Entries copied from the mockup have `sample: true`, which shows a dashed "sample" tag on the page. Delete that line when you replace the entry with real content.

GitHub and Medium update themselves:

- **GitHub repo cards**: add the topic `portfolio` to any public repo (repo page > About > gear icon > Topics). It shows up within an hour.
- **Medium**: new posts on bonavee120.medium.com show up within an hour.

The page rebuilds itself at most once an hour, so content edits that you deploy show up straight away, but live data can lag by up to an hour.

## Environment variables

Put these in `.env.local` for local work and in Vercel under Project > Settings > Environment Variables. Never commit `.env*` files; git already ignores them.

| Variable                                             | Needed for                                | How to get it                                                                                                                                                                                   |
| ---------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`                                       | Contribution graph and day streak         | GitHub > Settings > Developer settings > Fine-grained tokens. "Public repositories (read-only)" access is enough. Without it the graph card says it's unavailable; everything else still works. |
| `HEARTBEAT_SECRET`                                   | The Working / Not working status          | Any long random string. `python -c "import secrets; print(secrets.token_urlsafe(48))"` makes one. Use the same value in `scripts/.env` on your laptop.                                          |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Storing the heartbeat                     | Vercel > Storage (Marketplace) > Upstash for Redis > connect it to the project. If Vercel names them `KV_REST_API_URL` and `KV_REST_API_TOKEN` instead, that works too.                         |
| `NEXT_PUBLIC_BOOKING_URL`                            | "Book a call"                             | Google Calendar > Create > Appointment schedule > open the booking page > copy its link. If unset, the button opens an email to you.                                                            |
| `NEXT_PUBLIC_SITE_URL`                               | Canonical links, sitemap, social previews | `https://bonavee.dev`                                                                                                                                                                           |

## The Working / Not working light

A small Python script on your laptop tells the site you're online once a minute. The site shows **Working** while a heartbeat has arrived in the last 3 minutes. Close the lid or lose internet and it flips to **Not working** about 3 minutes later.

Setup, including starting it automatically when you log in on Windows, macOS or Linux, is in [`scripts/README.md`](scripts/README.md).

## Deploying

The site is meant for Vercel:

1. Push this repo to GitHub.
2. In Vercel, import the repo. The defaults (Next.js, `npm run build`) are right.
3. Add the environment variables above, including the Upstash store.
4. Deploy, then add `bonavee.dev` under Project > Settings > Domains and follow the DNS instructions.

After that, every push to `main` deploys to production.

Check the result on [PageSpeed Insights](https://pagespeed.web.dev/) once it's live. Scores measured against `npm run start` on a Windows laptop vary a lot between runs and can come out lower than the deployed site, because the local server answers more slowly than Vercel's CDN.

## Where things are

```
content/              everything you edit
public/               hero photos, project screenshots, book covers, CV PDFs
scripts/              heartbeat.py and its setup guide
src/app/              page, layout, API routes, icons, OG image, sitemap, robots
src/components/       hero, sections, live data, motion, nav
src/lib/              GitHub, Medium, heartbeat and hero-photo loaders
src/assets/fonts/     TTFs used only to draw the favicon and social preview image
design/mockup.html    the approved design
```
