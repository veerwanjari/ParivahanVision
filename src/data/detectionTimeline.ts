/**
 * Detection timeline for the Live Demo overlay.
 *
 * The demo video is pre-processed — there is no model running in the browser.
 * This file is what makes the overlay track the footage instead of floating
 * randomly on top of it: each entry is a bounding box with a start/end time
 * (seconds into the video) and one or more keyframes describing where the
 * box sits, in PERCENT of the video frame (0–100, top-left origin). Percent
 * coordinates keep the overlay correct at any player size.
 *
 * HOW TO RE-TIME THIS FOR YOUR OWN CLIP
 * 1. Play your processed video and scrub to where each vehicle enters/exits.
 * 2. Note the timestamp (seconds) and roughly where the box sits on screen —
 *    eyeballing it in 5–10% increments is plenty; the interpolation below
 *    smooths the rest.
 * 2. Add one keyframe per meaningful position change; two (enter, exit) is
 *    enough for a vehicle that barely moves, three or four for one that
 *    crosses the frame.
 * 3. `id` just needs to be unique — it's what the vehicle counter counts.
 *
 * If you'd rather not hand-time it, leave 2–3 boxes with wide start/end
 * windows near the center of frame — understated is safer than misaligned.
 */

export type DetectionType = 'car' | 'motorcycle' | 'bus' | 'truck';
export type DetectionFlag = 'no-helmet' | 'overspeed' | 'illegal-park';

export interface BoxKeyframe {
  /** seconds into the clip */
  t: number;
  /** percent from left, 0–100 */
  x: number;
  /** percent from top, 0–100 */
  y: number;
  /** percent of frame width */
  w: number;
  /** percent of frame height */
  h: number;
}

export interface DetectionEntry {
  id: string;
  type: DetectionType;
  label: string;
  confidence: number;
  plate?: string;
  flag?: DetectionFlag;
  start: number;
  end: number;
  path: BoxKeyframe[];
}

export const DETECTION_TYPE_META: Record<
  DetectionType,
  { color: string; glow: string; label: string }
> = {
  car: { color: '#4CC9F0', glow: 'rgba(76,201,240,0.55)', label: 'Car' },
  motorcycle: { color: '#FFB020', glow: 'rgba(255,176,32,0.55)', label: 'Motorcycle' },
  bus: { color: '#A78BFA', glow: 'rgba(167,139,250,0.55)', label: 'Bus' },
  truck: { color: '#A78BFA', glow: 'rgba(167,139,250,0.55)', label: 'Truck' },
};

/**
 * Sample timeline tuned for a ~24s clip. Replace with real timings for your
 * own footage — see the guide above.
 */
export const DETECTION_TIMELINE: DetectionEntry[] = [
  {
    id: 'V-014',
    type: 'car',
    label: 'Car',
    confidence: 0.94,
    plate: 'MH 12 GT 4471',
    start: 0.6,
    end: 8.5,
    path: [
      { t: 0.6, x: 6, y: 46, w: 20, h: 16 },
      { t: 4.5, x: 30, y: 42, w: 24, h: 19 },
      { t: 8.5, x: 58, y: 38, w: 28, h: 22 },
    ],
  },
  {
    id: 'V-015',
    type: 'motorcycle',
    label: 'Motorcycle',
    confidence: 0.88,
    flag: 'no-helmet',
    start: 1.8,
    end: 9.2,
    path: [
      { t: 1.8, x: 42, y: 58, w: 8, h: 12 },
      { t: 5.5, x: 52, y: 56, w: 9, h: 13 },
      { t: 9.2, x: 66, y: 53, w: 10, h: 14 },
    ],
  },
  {
    id: 'V-016',
    type: 'truck',
    label: 'Truck',
    confidence: 0.91,
    start: 3.2,
    end: 12.4,
    path: [
      { t: 3.2, x: 2, y: 30, w: 22, h: 24 },
      { t: 8.0, x: 20, y: 28, w: 26, h: 27 },
      { t: 12.4, x: 46, y: 26, w: 30, h: 30 },
    ],
  },
  {
    id: 'V-017',
    type: 'car',
    label: 'Car',
    confidence: 0.9,
    plate: 'DL 4C AF 9021',
    start: 7.0,
    end: 14.8,
    path: [
      { t: 7.0, x: 4, y: 50, w: 18, h: 15 },
      { t: 11.0, x: 26, y: 47, w: 21, h: 17 },
      { t: 14.8, x: 52, y: 44, w: 25, h: 20 },
    ],
  },
  {
    id: 'V-018',
    type: 'motorcycle',
    label: 'Motorcycle',
    confidence: 0.85,
    start: 10.5,
    end: 17.6,
    path: [
      { t: 10.5, x: 10, y: 60, w: 7, h: 11 },
      { t: 14.0, x: 24, y: 58, w: 8, h: 12 },
      { t: 17.6, x: 40, y: 55, w: 9, h: 13 },
    ],
  },
  {
    id: 'V-019',
    type: 'bus',
    label: 'Bus',
    confidence: 0.93,
    start: 13.5,
    end: 21.0,
    path: [
      { t: 13.5, x: 3, y: 22, w: 24, h: 30 },
      { t: 17.0, x: 22, y: 21, w: 28, h: 32 },
      { t: 21.0, x: 50, y: 19, w: 32, h: 35 },
    ],
  },
  {
    id: 'V-020',
    type: 'car',
    label: 'Car',
    confidence: 0.96,
    flag: 'overspeed',
    plate: 'KA 03 MN 7742',
    start: 16.0,
    end: 22.5,
    path: [
      { t: 16.0, x: 8, y: 48, w: 19, h: 16 },
      { t: 19.0, x: 34, y: 45, w: 22, h: 18 },
      { t: 22.5, x: 60, y: 41, w: 26, h: 21 },
    ],
  },
  {
    id: 'V-021',
    type: 'car',
    label: 'Car',
    confidence: 0.89,
    start: 18.5,
    end: 24.0,
    path: [
      { t: 18.5, x: 5, y: 52, w: 17, h: 14 },
      { t: 21.5, x: 28, y: 49, w: 20, h: 16 },
      { t: 24.0, x: 50, y: 46, w: 23, h: 18 },
    ],
  },
];

/** Total plate reads for the "OCR reads" stat in the HUD sidebar. */
export const PLATE_READ_COUNT = DETECTION_TIMELINE.filter((d) => d.plate).length;
