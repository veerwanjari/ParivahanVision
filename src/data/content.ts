export const NAV_LINKS = [
  { label: 'Live demo', href: '#demo' },
  { label: 'Ground truth', href: '#ground-truth' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Stack', href: '#stack' },
];

export const GITHUB_URL = 'https://github.com/veerwanjari/ParivahanVision';

export const STATS = [
  { value: '4', unit: '', label: 'vehicle classes tracked' },
  { value: '35', unit: '+', label: 'fps on a single GPU' },
  { value: '0.35', unit: '', label: 'min. detection confidence' },
  { value: '3', unit: '', label: 'models in the pipeline' },
];

/**
 * Mirrors the project README's own "what's real vs. heuristic" honesty —
 * the most distinctive, credible content on the page. Keep this list in
 * sync with backend/README if the pipeline changes.
 */
export const GROUND_TRUTH = [
  {
    status: 'real' as const,
    title: 'Vehicle detection',
    detail:
      'YOLOv8, COCO-pretrained, classifying cars, motorcycles, buses, and trucks frame by frame.',
  },
  {
    status: 'real' as const,
    title: 'Multi-object tracking',
    detail:
      'DeepSORT assigns a stable ID per vehicle using appearance embeddings, so a bike that ducks behind a bus for a second is still the same bike on the other side.',
  },
  {
    status: 'real' as const,
    title: 'License plate OCR',
    detail:
      'EasyOCR runs on a cropped plate region per vehicle. A blurry or angled plate honestly comes back low-confidence or UNREADABLE — that is correct behaviour, not a bug.',
  },
  {
    status: 'model-or-heuristic' as const,
    title: 'Helmet detection',
    detail:
      'A dedicated YOLOv8 model when its weights are downloaded; falls back to an edge-density and shape heuristic if not. Either way, the app keeps running.',
  },
  {
    status: 'heuristic' as const,
    title: 'Speed & lane violations',
    detail:
      'Computed from real tracked pixel positions, but the pixel-to-metre constant is an approximate calibration — good for relative comparison, not legal enforcement.',
  },
];

export const PIPELINE_STEPS = [
  {
    index: '01',
    title: 'Ingest footage',
    detail: 'A traffic camera feed or uploaded clip enters the FastAPI backend frame by frame.',
  },
  {
    index: '02',
    title: 'Detect vehicles',
    detail: 'YOLOv8 marks every car, motorcycle, bus, and truck in the frame with a confidence score.',
  },
  {
    index: '03',
    title: 'Track across frames',
    detail: 'DeepSORT links detections into persistent tracks, surviving brief occlusion.',
  },
  {
    index: '04',
    title: 'Read plates',
    detail: 'EasyOCR reads a cropped plate region per tracked vehicle, honestly, confidence and all.',
  },
  {
    index: '05',
    title: 'Flag violations',
    detail: 'Speed, illegal parking, and lane heuristics run on the tracked positions in real units.',
  },
];

export const TECH_STACK = [
  { name: 'YOLOv8', role: 'Vehicle & helmet detection' },
  { name: 'DeepSORT', role: 'Multi-object tracking' },
  { name: 'EasyOCR', role: 'License plate reading' },
  { name: 'FastAPI', role: 'Inference backend' },
  { name: 'React + Vite', role: 'This frontend' },
  { name: 'Tailwind CSS', role: 'Design system' },
];
