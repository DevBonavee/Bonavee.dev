# Editing the site's content

Everything on the site that isn't live data (GitHub, Medium, Google reviews, the status lamp) comes from the files in this folder, plus the images you drop into `public/`. You never need to touch the code in `src/`.

After any change, commit and push. Vercel rebuilds the site in a minute or two.

The build checks every file here. If something is wrong, such as a missing field, a progress of 120 or a month written as "Oct 2026", the build stops and tells you which file and which field. Fix it and push again; the live site keeps running the previous version in the meantime.

## Add a case study

1. Copy `case-studies/ledgerlite.mdx` and rename it, for example `case-studies/invoice-bot.mdx`. The file name must match the `slug` inside it.
2. Edit the block between the two `---` lines:
   - `title`, `summary` (one sentence for the card), `role`, `timeline`, `stack`
   - `category`: one of `Web apps`, `AI`, `APIs`, `Websites`
   - `featured: true` puts it in the top row of /portfolio (up to five show there). `order` sorts them, lowest first.
   - `results`: two to four numbers, such as `{ value: "3×", label: "faster daily close" }`. The first two appear on the card.
   - `live` and `source`: full links, or delete the lines.
   - `testimonial`: the `id` of a quote in `testimonials.ts`, or delete the line.
   - `draft: true` shows a dashed "sample" tag. Delete it when the case study is real.
3. Write the story under the headings `## The problem`, `## What I built`, `## How it works` and `## Results`. The first two sit side by side on the page; any other heading you add shows full width below them. Plain Markdown works: paragraphs, `- ` lists, **bold**, links.
4. Put images in `public/work/<slug>/`. Use `cover.png` for the card, and list any others under `gallery`, for example `gallery: [/work/invoice-bot/1.png, /work/invoice-bot/2.png]`.

The three files that are there now (LedgerLite, DocChat, SustyHub) are samples. Replace them with your own work or delete them.

## Add or change a service

Edit `services.ts`. Each entry is one card on /portfolio, in the order listed. `icon` is one of `automation`, `web`, `ai`, `api` or `site`. Leave out `priceFrom` to hide the price. Only one service should have `featured: true`; it gets the wide card and the "Most requested" tag. When the prices are real, set `servicesSample` to `false` to remove the "sample prices" tag.

## Add a testimonial

Edit `testimonials.ts`. Add an entry with the person's `quote`, `name`, `role` and `company`. For a photo, put a square image in `public/people/` and set `avatar: "/people/name.jpg"`; otherwise their initials show. Give it an `id` if a case study should show it. Delete `sample: true` from each real quote.

The placeholder quotes there now are not from real people. Replace them before you share the portfolio.

`workedWith` at the bottom of the same file is the "Worked with" row. Add a `logo` path to show a logo instead of the name.

## Add a book

Edit `books.ts`. Add an entry with the `title`, `author`, `progress` (0 to 100) and `month` written as `"2026-11"`. Put the cover in `public/books/` and set `cover` to its path; a 2:3 image works best. If the file is missing, a plain text cover is drawn instead.

The reading section shows the books for the current month. If there are none yet, it shows the most recent month that has books and labels it with that month. Update `progress` as you read.

## Add a résumé for another role

1. Put the PDF in `public/cv/`, for example `public/cv/Nnamah_CV_PM.pdf`.
2. Add an entry to `cvs.ts` with the `role` (the tab label), the `file` name, the number of `pages` and a one-paragraph `summary`.

A new tab appears on the résumé card. The first entry is the default.

## Add a hero photo

Drop the image into `public/hero/`. Photos play in file-name order, so name them `01.jpg`, `02.jpg` and so on. A 4:5 portrait crop works best. To give a photo a caption, add it to `hero.ts`, for example `{ file: "02.jpg", caption: "BONAVEE // ON STAGE" }`. Without one, the caption is "BONAVEE // PHOTO 02". Delete a file to remove the photo.

## The other files

- `site.ts`: your name, email, social links and the "OPEN · Taking new projects" pill. Set `availability.open` to `false` to hide the pill.
- `portfolio.ts`: the /portfolio headline, subline, stat tiles and certifications. In the headline, `*web apps*` turns yellow and `**grow.**` sits on the yellow bar. A stat with a `home` label also shows in the homepage hero, so both pages always agree.
- `about.ts`: the "From operations to code" story and its facts.
- `process.ts`: the five "How we'll work" steps.
- `now.ts`: what you're building right now, its progress and the progress notes.
- `resume.ts`: the experience and education timeline.
- `projects.ts`: extra project cards that aren't on GitHub. Repos with a live site show up on their own.
