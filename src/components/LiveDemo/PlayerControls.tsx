import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  muted: boolean;
  onToggleMute: () => void;
  currentTime: number;
  duration: number;
  onSeek: (fraction: number) => void;
  onFullscreen: () => void;
}

/**
 * The scrubber uses Pointer Events + setPointerCapture so dragging keeps
 * tracking even if the pointer leaves the track — the direct-manipulation
 * rule from apple-design.md: touch and content move together, with no dead
 * zone at the edges.
 */
export function PlayerControls({
  isPlaying,
  onTogglePlay,
  muted,
  onToggleMute,
  currentTime,
  duration,
  onSeek,
  onFullscreen,
}: PlayerControlsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function fractionFromEvent(clientX: number) {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onSeek(fractionFromEvent(e.clientX));
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    onSeek(fractionFromEvent(e.clientX));
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <button
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-150 ease-out active:scale-[0.92]"
      >
        {isPlaying ? (
          <Pause size={13} fill="currentColor" />
        ) : (
          <Play size={13} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      <span className="hidden font-mono text-[11px] tabular-nums text-fog sm:inline">
        {formatTime(currentTime)}
      </span>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="group relative h-4 flex-1 cursor-pointer touch-none"
      >
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-hairline2" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-amber transition-[width] duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
          style={{ left: `${progress * 100}%` }}
        />
      </div>

      <span className="font-mono text-[11px] tabular-nums text-mist">{formatTime(duration)}</span>

      <button
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-fog transition-colors duration-150 ease-out hover:text-paper active:scale-[0.92]"
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      <button
        onClick={onFullscreen}
        aria-label="Fullscreen"
        className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-fog transition-colors duration-150 ease-out hover:text-paper active:scale-[0.92] sm:flex"
      >
        <Maximize size={14} />
      </button>
    </div>
  );
}
