import { Metadata } from 'next';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HeroFeatures } from '@/components/sections/HeroFeatures';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { IntegrationSection } from '@/components/sections/IntegrationSection';

export const metadata: Metadata = {
  title: 'Fonctionnalités - Conseil d\'Orientation Mali | IA & Bourses d\'Études',
  description: 'Découvrez toutes les fonctionnalités de Conseil d\'Orientation Mali : assistant IA avancé, 1000+ bourses d\'études, conseils personnalisés, recherche de formations et analyse de marché du travail.',
  keywords: [
    'fonctionnalités conseil orientation Mali', 'assistant IA orientation scolaire', 'bourses études Mali',
    'conseils personnalisés orientation', 'recherche formations Mali', 'analyse marché travail Mali',
    'application mobile éducation', 'IA orientation scolaire Afrique', 'base données bourses Mali',
    'conseil carrière étudiant Mali', 'orientation professionnelle IA', 'fonctionnalités app éducation'
  ],
  openGraph: {
    title: 'Fonctionnalités - Conseil d\'Orientation Mali | IA & Bourses d\'Études',
    description: 'Découvrez toutes les fonctionnalités de Conseil d\'Orientation Mali : assistant IA avancé, 1000+ bourses d\'études, conseils personnalisés, recherche de formations et analyse de marché du travail.',
    url: '/features',
    siteName: 'Conseil d\'Orientation Mali',
    images: [
      {
        url: '/app_icon.png',
        width: 512,
        height: 512,
        alt: 'Fonctionnalités Conseil d\'Orientation Mali',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fonctionnalités - Conseil d\'Orientation Mali | IA & Bourses d\'Études',
    description: 'Découvrez toutes les fonctionnalités de Conseil d\'Orientation Mali : assistant IA avancé, 1000+ bourses d\'études, conseils personnalisés, recherche de formations et analyse de marché du travail.',
    images: ['/app_icon.png'],
  },
  alternates: {
    canonical: '/features',
  },
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
