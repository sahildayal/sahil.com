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

## Outstanding

Placeholders are marked `TODO(sahil)` in `src/content/` and render a visible
notice on the page, so nothing fake ships silently:

- `world.ts` — real World Cup fixtures, the full 40-country cooking list, current book
- `profile.ts` — top 4–6 relevant courses
- headshot, and a hosted resume PDF
- `PREDICTIONS_URL` env var to bring the football panel online (see
  `src/components/PredictorPanel.tsx`)
