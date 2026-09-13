import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Github, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, GITHUB_URL } from '@/data/content';
import { Button } from '@/components/ui/Button';

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="5" stroke="#4CC9F0" strokeWidth="1.4" />
      <rect x="5.5" y="8.5" width="7" height="5" rx="1" stroke="#FFB020" strokeWidth="1.3" />
      <circle cx="16.2" cy="6" r="1.6" fill="#FB4141" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-colors duration-300 ease-out',
          scrolled ? 'border-hairline bg-ink/75 backdrop-blur-xl' : 'border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-display text-[15px] font-semibold tracking-tight text-paper">
              ParivahanVision
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-fog transition-colors duration-150 ease-out hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button href={GITHUB_URL} target="_blank" rel="noreferrer" variant="ghost" icon={<Github size={16} />}>
              Source
            </Button>
            <Button href="#demo" variant="primary">
              Live demo
            </Button>
          </div>

          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-paper transition-transform duration-150 ease-out active:scale-[0.94] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="border-b border-hairline bg-ink/95 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-fog transition-colors duration-150 ease-out hover:text-paper"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-3">
                <Button href="#demo" variant="primary" onClick={() => setOpen(false)} className="justify-center">
                  Live demo
                </Button>
                <Button
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  icon={<Github size={16} />}
                  className="justify-center"
                >
                  Source
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
