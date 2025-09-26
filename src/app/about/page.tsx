import { Metadata } from 'next';
import { HeroAbout } from '@/components/sections/HeroAbout';
import { MissionSection } from '@/components/sections/MissionSection';
import { StorySection } from '@/components/sections/StorySection';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { StatsAbout } from '@/components/sections/StatsAbout';

export const metadata: Metadata = {
  title: "À Propos - Conseil d'Orientation Mali | Notre Histoire & Mission",
  description:
    "Découvrez l'histoire de Conseil d'Orientation Mali : première version mobile en 2023 et deuxième version en 2025 avec le site web. Notre mission : aider les étudiants du Mali à s'orienter vers les universités publiques et privées, par séries du BAC, et après le BAC.",
  keywords: [
    "à propos conseil orientation Mali",
    "histoire application Mali",
    "mission orientation scolaire Mali",
    "universités publiques et privées Mali",
    "séries du BAC Mali",
    "orientation post-BAC Mali",
    "version 2023",
    "version 2025 site web",
  ],
  openGraph: {
    title: "À Propos - Conseil d'Orientation Mali | Notre Histoire & Mission",
    description:
      "Conseil d'Orientation Mali : v1 mobile (2023) puis v2 avec site web (2025). Orientation vers universités publiques/privées, séries du BAC et post-BAC.",
    url: '/about',
    siteName: "Conseil d'Orientation Mali",
    images: [
      {
        url: '/logo_full.png',
        width: 1200,
        height: 630,
        alt: "Conseil d'Orientation Mali - À propos",
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "À Propos - Conseil d'Orientation Mali | Notre Histoire & Mission",
    description:
      "v1 (2023) mobile, v2 (2025) avec site web. Orientation : universités, séries du BAC, post-BAC.",
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
    </main>
  );
}
