import { Section, SectionHeading } from '@/components/ui/Section';
import { GROUND_TRUTH } from '@/data/content';
import { cn } from '@/lib/utils';

const STATUS_META = {
  real: { label: 'Real inference', color: 'bg-scan', text: 'text-scan' },
  'model-or-heuristic': { label: 'Model, with fallback', color: 'bg-amber', text: 'text-amber' },
  heuristic: { label: 'Heuristic', color: 'bg-violet', text: 'text-violet' },
} as const;

export function GroundTruth() {
  return (
    <Section id="ground-truth" className="py-24 lg:py-32">
      <SectionHeading
        title="What's real, and what's a heuristic"
        description="Most demos let you assume everything is a trained model. This one would rather tell you which parts are, and which are a well-reasoned approximation."
      />

      <div className="mt-12 divide-y divide-hairline border-y border-hairline">
        {GROUND_TRUTH.map((row) => {
          const meta = STATUS_META[row.status];
          return (
            <div key={row.title} className="flex flex-col gap-3 py-6 sm:flex-row sm:gap-10">
              <div className="flex shrink-0 items-center gap-2 sm:w-44">
                <span className={cn('h-1.5 w-1.5 rounded-full', meta.color)} />
                <span className={cn('text-sm', meta.text)}>{meta.label}</span>
              </div>
              <div>
                <h3 className="text-base font-medium text-paper">{row.title}</h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-fog">{row.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
