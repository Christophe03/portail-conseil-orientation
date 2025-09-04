import { Metadata } from 'next';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { HeroDownload } from '@/components/sections/HeroDownload';
import { InstallationGuide } from '@/components/sections/InstallationGuide';
import { SystemRequirements } from '@/components/sections/SystemRequirements';

export const metadata: Metadata = {
  title: 'Télécharger',
  description: 'Téléchargez l\'application Conseil d\'Orientation sur iOS, Android ou APK. Commencez votre voyage vers la réussite dès maintenant !',
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen">
      <HeroDownload />
      <DownloadSection />
      <SystemRequirements />
      <InstallationGuide />
    </main>
  );
}
