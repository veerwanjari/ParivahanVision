import { Section, SectionHeading } from '@/components/ui/Section';
import { PIPELINE_STEPS } from '@/data/content';

export function HowItWorks() {
  return (
    <Section id="pipeline" className="py-24 lg:py-32">
      <SectionHeading
        title="Five stages, footage to flag"
        description="Every clip moves through the same pipeline, in order — nothing here runs out of sequence."
      />

      <ol className="mt-14 flex flex-col">
        {PIPELINE_STEPS.map((step, i) => (
          <li key={step.index} className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline2 bg-ink font-mono text-xs text-scan">
                {step.index}
              </span>
              {i < PIPELINE_STEPS.length - 1 && <span className="my-1 w-px flex-1 bg-hairline" />}
            </div>
            <div className={i < PIPELINE_STEPS.length - 1 ? 'pb-10' : ''}>
              <h3 className="pt-1.5 text-lg font-medium text-paper">{step.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
