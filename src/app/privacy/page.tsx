import { Metadata } from 'next';
import { PrivacyPageContent } from './PrivacyPageContent';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité & Protection des Données',
  description: 'Découvrez les engagements de Conseil d\'Orientation Mali concernant la protection de vos données personnelles, le respect de la vie privée et la sécurité sur notre site et application mobile.',
  keywords: [
    'confidentialité conseil orientation Mali',
    'protection des données personnelles Mali',
    'vie privée application orientation',
    'mentions légales conseil orientation',
  ],
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Politique de Confidentialité — Conseil d\'Orientation Mali',
    description: 'Engagements de transparence et de protection des données pour les utilisateurs de Conseil d\'Orientation Mali.',
    url: '/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Politique de Confidentialité — Conseil d\'Orientation Mali',
    description: 'Protection des données et respect de votre vie privée.',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: '/' },
          { name: 'Politique de Confidentialité', item: '/privacy' },
        ]}
      />
      <PrivacyPageContent />
    </>
  );
}