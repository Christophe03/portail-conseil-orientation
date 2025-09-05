import { Metadata } from 'next';
import { HeroAbout } from '@/components/sections/HeroAbout';
import { MissionSection } from '@/components/sections/MissionSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { StorySection } from '@/components/sections/StorySection';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { StatsAbout } from '@/components/sections/StatsAbout';

export const metadata: Metadata = {
  title: 'À Propos - Conseil d\'Orientation Mali | Notre Histoire & Mission',
  description: 'Découvrez l\'histoire de Conseil d\'Orientation Mali, créé en 2023. Notre mission : démocratiser l\'orientation scolaire en Afrique avec l\'IA et 1000+ bourses d\'études.',
  keywords: [
    'à propos conseil orientation Mali', 'histoire entreprise Mali', 'mission orientation scolaire Afrique',
    'équipe conseil orientation', 'fondation 2023 Mali', 'innovation éducation Afrique',
    'conseil orientation équipe', 'histoire application mobile Mali', 'mission éducation Mali'
  ],
  openGraph: {
    title: 'À Propos - Conseil d\'Orientation Mali | Notre Histoire & Mission',
    description: 'Découvrez l\'histoire de Conseil d\'Orientation Mali, créé en 2023. Notre mission : démocratiser l\'orientation scolaire en Afrique avec l\'IA et 1000+ bourses d\'études.',
    url: '/about',
    siteName: 'Conseil d\'Orientation Mali',
    images: [
      {
        url: '/logo_full.png',
        width: 1200,
        height: 630,
        alt: 'Conseil d\'Orientation Mali - À propos',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À Propos - Conseil d\'Orientation Mali | Notre Histoire & Mission',
    description: 'Découvrez l\'histoire de Conseil d\'Orientation Mali, créé en 2023. Notre mission : démocratiser l\'orientation scolaire en Afrique avec l\'IA et 1000+ bourses d\'études.',
    images: ['/logo_full.png'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <HeroAbout />
      <MissionSection />
      <StorySection />
      <ValuesSection />
      <StatsAbout />
      <TeamSection />
    </main>
  );
}
