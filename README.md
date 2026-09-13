# ParivahanVision — showcase frontend

A standalone marketing/demo frontend for [ParivahanVision](https://github.com/veerwanjari/ParivahanVision).
It doesn't call the FastAPI backend at all — the "Live Demo" plays a
pre-processed video with a HUD overlay (FPS, vehicle counter, bounding
boxes, status badge) that's synced to the recording's timeline. That's what
makes it deployable to Vercel as a static site with no backend, no GPU, and
no cold starts.

## Stack

React 18 + TypeScript + Vite, Tailwind CSS, [Motion](https://motion.dev)
(the Framer Motion successor) for the handful of places motion actually
earns its keep — press feedback, the HUD's live counters, one orchestrated
hero entrance. Everything else is static.

## Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Add your video

See [`public/videos/README.md`](public/videos/README.md) — drop in
`demo.mp4` + `poster.jpg`, or point the player at an external URL if the
file is large. Then tune `src/data/detectionTimeline.ts` so the bounding
boxes track your footage (the file walks through how).

## Deploy to Vercel

**Option 1 — CLI**

```bash
npm i -g vercel
vercel
```

Follow the prompts; Vercel auto-detects Vite (`vercel.json` in this repo
also pins the build command and adds long-lived caching for `/videos/*`).

**Option 2 — Git integration**

1. Push this folder to a GitHub repo.
2. [vercel.com/new](https://vercel.com/new) → import the repo → Vercel
   detects the Vite preset automatically → Deploy.
3. Every push to `main` redeploys automatically.

No environment variables are required — this frontend has no backend
dependency by design.

## Project structure

```
src/
  components/
    ui/            Button, Section, GlassPanel — shared primitives
    LiveDemo/       the video player, HUD, and detection-overlay logic
    Navbar, Hero, GroundTruth, HowItWorks, TechStack, CTASection, Footer
  data/
    content.ts              copy: nav, stats, pipeline steps, tech list
    detectionTimeline.ts     the HUD's "detections" — keyframed to the video
  lib/utils.ts       cn() classname helper
```

## Design system notes

The visual language (colors, type scale, motion tokens) lives in
`tailwind.config.js` and `src/index.css` — everything pulls from those
shared tokens rather than one-off values, so retheming means editing one
file, not hunting through components.

- **Color** — near-black base (`ink`/`surface`), cyan (`scan`) for the
  detection/vision motif, amber for primary actions and traffic-signal
  accents, violet for secondary detection classes, red (`alert`) reserved
  for violation flags only.
- **Type** — Space Grotesk for display/headings, Inter for body, JetBrains
  Mono strictly for telemetry-style numbers (FPS, counters, coordinates) —
  mirroring how a real vision-system HUD reads, not decoration.
- **Motion** — one orchestrated entrance on the hero; everything after that
  is either a direct response to input (button press, scrubber drag, menu
  toggle) or a live value changing (FPS, vehicle count, detection boxes).
  Nothing fades-and-slides-up just because it scrolled into view — see
  `src/components/ui/Section.tsx` for why.
