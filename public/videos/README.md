# Adding your processed video

The player expects two files here:

```
public/videos/demo.mp4     — the pre-processed clip
public/videos/poster.jpg   — a still frame, shown before playback starts
```

Until they exist, the player shows a small placeholder instead of a broken
video — see `videoMissing` in `LiveDemoSection.tsx`.

## Option A — commit it directly (simplest, fine under ~20–30MB)

1. Export your processed clip as **H.264 MP4, 1280×720 or 1920×1080, ~5–8
   Mbps**. That's the sweet spot for web playback — visibly sharp, small
   enough to load fast on a phone connection.
2. Keep it short. 15–30 seconds on loop reads as "live" just as well as two
   minutes, and loads instantly.
3. Grab a poster frame: `ffmpeg -i demo.mp4 -ss 00:00:01 -vframes 1 poster.jpg`
4. Drop both files in this folder, `git add` them, and deploy — Vercel
   serves them as static assets with no extra config (see `vercel.json` for
   the cache headers already set up for this path).

## Option B — host it externally (recommended once the file is large)

Git and Vercel deploys get slow and expensive with large binaries in the
repo. Once your clip is more than ~20–30MB, host it elsewhere and point the
player at the URL instead:

- **Cloudflare R2 / AWS S3 / Bunny CDN** — upload the mp4, make it public,
  and use its URL. Cheapest and fastest for a single static file.
- **Vercel Blob storage** — stays inside the Vercel ecosystem, simple API,
  good default if you're already deploying here.
- **Mux / Cloudflare Stream** — overkill for one demo clip, but gives you
  adaptive bitrate if you later want a heavier video.

Whichever you pick, update the two constants at the top of
`src/components/LiveDemo/LiveDemoSection.tsx`:

```ts
const VIDEO_SRC = 'https://your-cdn.example.com/demo.mp4';
const POSTER_SRC = 'https://your-cdn.example.com/poster.jpg';
```

Absolute URLs work exactly like local paths — nothing else changes.

## Re-timing the detection overlay

The bounding boxes are driven by `src/data/detectionTimeline.ts`, not by
anything in the video file — they're keyframed against timestamps. If you
swap in your own footage, that file's comments walk through re-timing the
boxes to match; even rough eyeballed positions in 5–10% increments read
fine once smoothed.
