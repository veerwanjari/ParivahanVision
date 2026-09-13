import React, { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { FpsReadout, ModelBadge, StatusBadge, VehicleCounter } from './Hud';
import { PlayerControls } from './PlayerControls';
import { useDetectionTimeline } from './useDetectionTimeline';
import { ViolationCards } from './ViolationCards'; // Import the new violation card grid

/**
 * Swap these for your own processed clip and still frame. Keep the same
 * filenames (or update the paths) — see /public/videos/README.md for export
 * settings and how to re-time src/data/detectionTimeline.ts to match.
 */
const VIDEO_SRC = '/videos/demo.mp4';
const POSTER_SRC = '/videos/poster.jpg';

export const LiveDemoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoMissing, setVideoMissing] = useState(false);

  const { vehicleCount, fps } = useDetectionTimeline(videoRef, isPlaying);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }

  function seek(fraction: number) {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = fraction * duration;
    setCurrentTime(video.currentTime);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen();
  }

  return (
    <Section id="demo" className="py-24 lg:py-32">
      <SectionHeading
        title="Watch the pipeline work"
        description="A processed run of real traffic footage — vehicle count, tracking status, and FPS come from an actual YOLOv8 + DeepSORT + EasyOCR pass, played back with a live HUD over the top."
      />

      <div className="mt-10 max-w-5xl mx-auto">
        <GlassPanel className="overflow-hidden !rounded-3xl bg-surface/90 p-0">
          <div ref={containerRef} className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              muted={muted}
              loop
              playsInline
              className="h-full w-full object-cover"
              onClick={togglePlay}
              onError={() => setVideoMissing(true)}
            />

            {videoMissing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface px-6 text-center">
                <p className="text-sm text-fog">
                  Drop your processed clip at <code className="text-scan">/public/videos/demo.mp4</code> to
                  replace this placeholder.
                </p>
              </div>
            )}

            {/* top HUD row */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
              <div className="flex items-center gap-2">
                <StatusBadge isPlaying={isPlaying} />
                <ModelBadge />
              </div>
              <div className="flex items-center gap-2">
                <FpsReadout fps={fps} />
                <VehicleCounter count={vehicleCount} />
              </div>
            </div>
          </div>

          <div className="border-t border-hairline">
            <PlayerControls
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              muted={muted}
              onToggleMute={() => setMuted((m) => !m)}
              currentTime={currentTime}
              duration={duration}
              onSeek={seek}
              onFullscreen={toggleFullscreen}
            />
          </div>
        </GlassPanel>

        <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mist px-2">
          <Info size={14} className="mt-0.5 shrink-0 text-mist" />
          <p>
            This is a recorded output, not a live inference call — the full detection pipeline needs a GPU
            and doesn't run inside a static frontend. Run the real thing locally with the backend setup in
            the{' '}
            <a
              href="https://github.com/veerwanjari/ParivahanVision#quick-start"
              target="_blank"
              rel="noreferrer"
              className="text-fog underline decoration-hairline2 underline-offset-2 transition-colors duration-150 ease-out hover:text-paper"
            >
              README
            </a>
            .
          </p>
        </div>

        {/* Render Violation Image Cards Directly Below Video */}
        <div className="mt-16">
          <ViolationCards videoRef={videoRef} />
        </div>
      </div>
    </Section>
  );
};