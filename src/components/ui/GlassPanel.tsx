import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Apple's materials principle: a translucent layer with a bright top edge
 * where light would catch it, not a flat opaque card. Used for the nav,
 * the HUD, and floating chrome over the demo video.
 */
export function GlassPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-hairline bg-surface/70 shadow-panel backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
