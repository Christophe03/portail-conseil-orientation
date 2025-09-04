import { Metadata } from 'next';
import { HeroAbout } from '@/components/sections/HeroAbout';
import { MissionSection } from '@/components/sections/MissionSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { StorySection } from '@/components/sections/StorySection';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { StatsAbout } from '@/components/sections/StatsAbout';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez l\'histoire, la mission et l\'équipe derrière Conseil d\'Orientation. Notre engagement pour l\'éducation et l\'orientation des étudiants.',
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
