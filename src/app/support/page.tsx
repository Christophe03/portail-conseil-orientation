import { Metadata } from 'next';
import { HeroSupport } from '@/components/sections/HeroSupport';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { SupportChannels } from '@/components/sections/SupportChannels';
import { Troubleshooting } from '@/components/sections/Troubleshooting';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Centre d\'Aide & Support — FAQ et Assistance Étudiants',
  description: 'Besoin d\'aide pour votre orientation au Mali ? Consultez notre foire aux questions (FAQ), nos guides de dépannage ou contactez directement l\'équipe Conseil d\'Orientation par WhatsApp et email.',
  keywords: [
    'support conseil orientation Mali',
    'contact conseil orientation',
    'aide orientation scolaire Mali',
    'FAQ universités Mali',
    'assistance bachelier Mali',
    'aide installation APK conseil orientation',
  ],
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    title: 'Support & Assistance — Conseil d\'Orientation Mali',
    description: 'Foire aux questions, assistance technique et contact direct avec l\'équipe d\'orientation au Mali.',
    url: '/support',
    type: 'website',
    images: [
      {
        url: '/app_icon.png',
        width: 512,
        height: 512,
        alt: 'Support Conseil d\'Orientation Mali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centre d\'Aide & Support — Conseil d\'Orientation Mali',
    description: 'Une question sur votre orientation ou l\'application ? Notre équipe vous accompagne.',
    images: ['/app_icon.png'],
  },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: '/' },
          { name: 'Support & FAQ', item: '/support' },
        ]}
      />
      <HeroSupport />
      <FAQSection />
      <Troubleshooting />
      <SupportChannels />
      <ContactForm />
    </main>
  );
}
