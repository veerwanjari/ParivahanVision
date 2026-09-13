import { Section, SectionHeading } from '@/components/ui/Section';
import { TECH_STACK } from '@/data/content';

export function TechStack() {
  return (
    <Section id="stack" className="py-24 lg:py-32">
      <SectionHeading title="Built on" description="No wrapper libraries between this and the models doing the work." />

      <div className="mt-12 grid grid-cols-1 divide-y divide-hairline border-y border-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
        {TECH_STACK.map((tech) => (
          <div key={tech.name} className="flex items-baseline justify-between gap-4 px-1 py-5 sm:px-6">
            <span className="font-display text-base font-semibold text-paper">{tech.name}</span>
            <span className="text-right text-sm text-mist">{tech.role}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
