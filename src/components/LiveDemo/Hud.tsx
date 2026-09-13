import { AnimatePresence, motion } from 'motion/react';
import { Car, Gauge, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DETECTION_TYPE_META, DETECTION_TIMELINE } from '@/data/detectionTimeline';
import type { ActiveDetection } from './useDetectionTimeline';

export function StatusBadge({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-hairline2 bg-ink/60 px-2.5 py-1.5 backdrop-blur-sm">
      <Radio size={11} className={cn(isPlaying ? 'animate-blink text-alert' : 'text-mist')} />
      <span className="font-mono text-[10px] font-medium tracking-wide text-paper">
        {isPlaying ? 'LIVE' : 'PAUSED'}
      </span>
    </div>
  );
}

export function ModelBadge() {
  return (
    <div className="hidden items-center gap-1.5 rounded-full border border-hairline2 bg-ink/60 px-2.5 py-1.5 backdrop-blur-sm sm:flex">
      <span className="font-mono text-[10px] text-fog">YOLOv8n · DeepSORT</span>
    </div>
  );
}

export function FpsReadout({ fps }: { fps: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-hairline2 bg-ink/60 px-2.5 py-1.5 backdrop-blur-sm">
      <Gauge size={11} className="text-scan" />
      <span className="w-[3.2ch] font-mono text-[10px] tabular-nums text-paper">
        {fps > 0 ? fps.toFixed(1) : '—'}
      </span>
      <span className="font-mono text-[9px] text-mist">fps</span>
    </div>
  );
}

export function VehicleCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-hairline2 bg-ink/60 px-2.5 py-1.5 backdrop-blur-sm">
      <Car size={11} className="text-amber" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="w-[2ch] font-mono text-[10px] tabular-nums text-paper"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <span className="font-mono text-[9px] text-mist">tracked</span>
    </div>
  );
}

export function DetectionLog({ detections }: { detections: ActiveDetection[] }) {
  const visible = [...detections].reverse().slice(0, 4);

  return (
    <div className="hidden w-56 flex-col gap-1.5 lg:flex">
      <span className="px-1 font-mono text-[10px] uppercase tracking-wider text-mist">
        Active tracks
      </span>
      <div className="flex min-h-[7.5rem] flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {visible.map((d) => {
            const meta = DETECTION_TYPE_META[d.type];
            return (
              <motion.div
                layout
                key={d.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center justify-between gap-2 rounded-lg border border-hairline2 bg-ink/60 px-2.5 py-1.5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span className="truncate font-mono text-[10px] text-paper">{d.id}</span>
                </div>
                <span className="shrink-0 font-mono text-[10px] tabular-nums text-mist">
                  {d.plate ?? `${Math.round(d.confidence * 100)}%`}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const TOTAL_TRACKS = DETECTION_TIMELINE.length;
