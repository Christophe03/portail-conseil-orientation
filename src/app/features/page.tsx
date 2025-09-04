import { Metadata } from 'next';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HeroFeatures } from '@/components/sections/HeroFeatures';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { IntegrationSection } from '@/components/sections/IntegrationSection';

export const metadata: Metadata = {
  title: 'Fonctionnalités',
  description: 'Découvrez toutes les fonctionnalités révolutionnaires de l\'application Conseil d\'Orientation : IA intelligente, bourses d\'études, ressources éducatives et plus encore.',
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <HeroFeatures />
      <FeaturesSection />
      <ComparisonTable />
      <IntegrationSection />
    </main>
  );
}
