import { ArrowRight, Github } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GITHUB_URL } from '@/data/content';

export function CTASection() {
  return (
    <Section className="py-24 lg:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface px-8 py-16 text-center sm:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-xl text-display-md font-display font-semibold text-paper">
            The code is open. Run it on your own footage.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-fog">
            Backend setup, model downloads, and configuration are all documented in the repository —
            bring a GPU and about fifteen minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={GITHUB_URL} target="_blank" rel="noreferrer" variant="primary" icon={<Github size={16} />}>
              Open on GitHub
            </Button>
            <Button href="#demo" variant="secondary" icon={<ArrowRight size={16} />}>
              Rewatch the demo
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
