import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { CTASection } from '@/components/sections/CTASection';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Conseil d\'Orientation Mali - IA pour Orientation Scolaire',
  description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
  keywords: [
    'orientation scolaire Mali', 'conseil orientation Afrique', 
    'IA orientation scolaire', 'application mobile éducation', 'orientation universitaire Mali',
    'conseil carrière étudiant', 'orientation professionnelle Mali',
    'études supérieures Mali', 'orientation scolaire gratuite',
    'conseil orientation IA', 'application éducation Mali', 'orientation scolaire personnalisée'
  ],
  openGraph: {
    title: 'Conseil d\'Orientation Mali - IA pour Orientation Scolaire',
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    url: '/',
    siteName: 'Conseil d\'Orientation Mali',
    images: [
      {
        url: '/app_icon.png',
        width: 512,
        height: 512,
        alt: 'Conseil d\'Orientation Mali - Application d\'orientation scolaire',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conseil d\'Orientation Mali - IA pour Orientation Scolaire & Bourses d\'Études',
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    images: ['/app_icon.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData type="softwareApplication" />
      <HeroSection />
      <FeaturesSection />
      <DownloadSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
