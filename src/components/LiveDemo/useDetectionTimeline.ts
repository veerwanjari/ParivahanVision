import { useEffect, useRef, useState, type RefObject } from 'react';
import { DETECTION_TIMELINE, type BoxKeyframe, type DetectionEntry } from '@/data/detectionTimeline';

export interface ActiveDetection extends DetectionEntry {
  box: { x: number; y: number; w: number; h: number };
}

function interpolateBox(path: BoxKeyframe[], t: number) {
  const first = path[0];
  const last = path[path.length - 1];
  if (t <= first.t) return first;
  if (t >= last.t) return last;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (t >= a.t && t <= b.t) {
      const p = (t - a.t) / (b.t - a.t || 1);
      return {
        x: a.x + (b.x - a.x) * p,
        y: a.y + (b.y - a.y) * p,
        w: a.w + (b.w - a.w) * p,
        h: a.h + (b.h - a.h) * p,
      };
    }
  }
  return last;
}

/**
 * Reads video.currentTime and derives the overlay state from it, so the
 * "detections" always match what's on screen instead of drifting.
 *
 * Sampled at ~12Hz rather than every rAF frame — a bounding box doesn't need
 * 60 state updates a second to read as live, and each box carries a short
 * CSS transition (see DetectionOverlay) that smooths the gaps between
 * samples. That keeps this to a handful of re-renders a second instead of
 * pinning the main thread with 60.
 */
export function useDetectionTimeline(videoRef: RefObject<HTMLVideoElement>, isPlaying: boolean) {
  const [active, setActive] = useState<ActiveDetection[]>([]);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [fps, setFps] = useState(29.4);
  const lastSampleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const SAMPLE_INTERVAL = 1000 / 12;

    function tick(now: number) {
      const video = videoRef.current;
      if (video && now - lastSampleRef.current >= SAMPLE_INTERVAL) {
        lastSampleRef.current = now;
        const t = video.currentTime;
        const looped = t < lastTimeRef.current - 0.5;
        lastTimeRef.current = t;

        const currentActive = DETECTION_TIMELINE.filter((d) => t >= d.start && t <= d.end).map((d) => ({
          ...d,
          box: interpolateBox(d.path, t),
        }));
        setActive(currentActive);
        setSeenIds((prev) => {
          const base = looped ? [] : prev;
          const additions = currentActive.map((d) => d.id).filter((id) => !base.includes(id));
          return additions.length || looped ? [...base, ...additions] : prev;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [videoRef]);

  // Simulated FPS readout — a believable jitter around a target, not a real
  // per-frame measurement (there's no model running in the browser).
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setFps((prev) => {
        const next = prev + (Math.random() - 0.5) * 3.4;
        return Math.min(33.5, Math.max(24.5, next));
      });
    }, 420);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  return {
    active,
    vehicleCount: seenIds.length,
    fps: isPlaying ? fps : 0,
    recentIds: seenIds,
  };
}
