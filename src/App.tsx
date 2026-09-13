import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { GroundTruth } from '@/components/GroundTruth';
import { LiveDemoSection } from '@/components/LiveDemo/LiveDemoSection';
import { HowItWorks } from '@/components/HowItWorks';
import { TechStack } from '@/components/TechStack';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <Navbar />
      <main>
        <Hero />
        <LiveDemoSection />
        <GroundTruth />
        <HowItWorks />
        <TechStack />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
