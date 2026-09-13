import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const VARIANTS = {
  primary:
    'bg-amber text-ink hover:bg-amber-soft border border-transparent shadow-[0_0_0_1px_rgba(255,176,32,0.4)]',
  secondary: 'bg-transparent text-paper border border-hairline2 hover:bg-surface2 hover:border-fog/40',
  ghost: 'bg-transparent text-fog border border-transparent hover:text-paper',
} as const;

/**
 * Press feedback is a CSS transition, not a gesture — there is no drag here,
 * so a spring would be overkill. 150ms, strong ease-out, scale 0.97: the
 * ceiling for something a user taps often.
 */
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  icon,
  className,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium',
    'transition-[transform,background-color,border-color,color] duration-150 ease-out',
    'active:scale-[0.97]',
    VARIANTS[variant],
    className,
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} target={target} rel={rel}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} type="button">
      {children}
      {icon}
    </button>
  );
}
