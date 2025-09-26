import { Metadata } from 'next';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { HeroDownload } from '@/components/sections/HeroDownload';
import { InstallationGuide } from '@/components/sections/InstallationGuide';
import { SystemRequirements } from '@/components/sections/SystemRequirements';

export const metadata: Metadata = {
  title: 'Télécharger - Conseil d\'Orientation Mali | App Mobile Gratuite',
  description: 'Téléchargez gratuitement l\'application Conseil d\'Orientation Mali sur Android (APK).',
  keywords: [
    'télécharger conseil orientation Mali', 'app mobile orientation scolaire', 'application gratuite éducation Mali',
    'télécharger app Android APK', 'conseil orientation mobile Mali', 'application orientation scolaire gratuite',
    'télécharger app éducation Afrique', 'conseil orientation téléchargement',
    'télécharger application IA orientation', 'conseil orientation app store', 'play store conseil orientation Mali'
  ],
  openGraph: {
    title: 'Télécharger - Conseil d\'Orientation Mali | App Mobile Gratuite',
    description: 'Téléchargez gratuitement l\'application Conseil d\'Orientation Mali sur Android (APK).',
    url: '/download',
    siteName: 'Conseil d\'Orientation Mali',
    images: [
      {
        url: '/app_icon.png',
        width: 512,
        height: 512,
        alt: 'Télécharger Conseil d\'Orientation Mali',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Télécharger - Conseil d\'Orientation Mali | App Mobile Gratuite',
    description: 'Téléchargez gratuitement l\'application Conseil d\'Orientation Mali sur Android (APK).',
    images: ['/app_icon.png'],
  },
  alternates: {
    canonical: '/download',
  },
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
