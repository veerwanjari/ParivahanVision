import { Github } from 'lucide-react';
import { NAV_LINKS, GITHUB_URL } from '@/data/content';
import { Section } from '@/components/ui/Section';

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <Section className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-display text-sm font-semibold text-paper">ParivahanVision</span>
          <p className="mt-1 text-xs text-mist">Vehicle detection, tracking, and plate reading for real traffic.</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-fog transition-colors duration-150 ease-out hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-fog transition-colors duration-150 ease-out hover:text-paper"
          >
            <Github size={13} />
            GitHub
          </a>
        </div>
      </Section>
      <Section className="border-t border-hairline py-5">
        <p className="text-xs text-mist">Built by veerwanjari. YOLOv8, DeepSORT, and EasyOCR do the actual seeing.</p>
      </Section>
    </footer>
  );
}
