import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}

/**
 * Deliberately not animated on scroll. Every section fading-and-sliding up
 * on entry is the templated default this build is trying to avoid — motion
 * here is reserved for the live HUD, the hero's one load sequence, and
 * things the user actually touches.
 */
export function Section({ id, children, className, bleed }: SectionProps) {
  return (
    <section id={id} className={cn('relative', className)}>
      <div className={cn(!bleed && 'mx-auto w-full max-w-6xl px-6 lg:px-8')}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  align = 'left',
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <h2 className="text-display-lg font-display font-semibold text-paper">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-fog">{description}</p> : null}
    </div>
  );
}
