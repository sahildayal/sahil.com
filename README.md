# sahil.com

Personal portfolio — [sahildayal.vercel.app](https://sahildayal.vercel.app)

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · Motion · deployed on Vercel.

## Design

**Palette — "Terracotta & Ink."** Warm paper ground, deep ink, one clay accent.
Light and dark are both first-class; the toggle writes `data-theme` on `<html>`
and an inline script applies it before first paint so the page never flashes the
wrong ground. All tokens live at the top of `src/app/globals.css`.

**Type.** `Archivo` (variable, width axis) for display — signage grotesque
rather than an editorial serif, borrowing from split-flap boards and football
matchday programmes. `Newsreader` for long-form prose. `JetBrains Mono` for
tabular numerals and data, which do a lot of work here.

**Signature.** The split-flap board in the hero (`src/components/SplitFlap.tsx`)
and the 4-3-3 teamsheet on `/world` (`src/components/Pitch.tsx`).

## Layout

```
src/
  app/                 routes — / /work /projects /projects/[slug] /world /about
  components/          UI
  content/             all copy and data lives here, not in components
    profile.ts         bio, skills, education, certifications, board messages
    experience.ts      roles + agentic design principles
    projects.ts        project case studies
    world.ts           teamsheet, fixtures, countries cooked
```

Editing content means editing `src/content/*` — no component changes needed.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Maintaining

**Fixtures** (`src/content/world.ts`) — the two upcoming matches on `/world` are
hand-maintained. Swap them as the season goes; only the first `MAX_FIXTURES`
render, so extras are harmless. These should eventually be driven by
`EPL_LALIGA_PREDICTOR` output instead.

**The football panel** on the home page renders an honest offline state until
`PREDICTIONS_URL` is set to a JSON endpoint. See `src/components/PredictorPanel.tsx`.

**Resume** — `public/resume.pdf`. The link is gated on `resumeUrl` in
`src/content/profile.ts`, so setting it to `null` hides the link everywhere
rather than shipping a dead one.

## Outstanding

- Verify the cooking list in `world.ts` — the dishes need to match what was
  actually cooked
- Current book for the Reading card
- Everyday-Todo stays description-only while the repo is private
