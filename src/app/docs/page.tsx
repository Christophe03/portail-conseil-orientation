import { Metadata } from 'next';
import { HeroDocs } from '@/components/sections/HeroDocs';
import { DocumentationNav } from '@/components/sections/DocumentationNav';
import { QuickStartGuide } from '@/components/sections/QuickStartGuide';
import { APIDocumentation } from '@/components/sections/APIDocumentation';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Documentation Officielle — Guides & Tutoriels',
  description: 'Guide complet d\'utilisation de l\'application Conseil d\'Orientation Mali : installation, simulation de bourse CENOU, recherche d\'universités et conseiller IA.',
  keywords: [
    'documentation conseil orientation Mali',
    'guide orientation scolaire Mali',
    'tutoriel application mobile orientation',
    'guide bourses CENOU Mali',
    'aide inscription université Mali',
  ],
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Documentation Officielle — Conseil d\'Orientation Mali',
    description: 'Guides d\'utilisation, tutoriels d\'installation et documentation de l\'application mobile Conseil d\'Orientation au Mali.',
    url: '/docs',
    type: 'website',
    images: [
      {
        url: '/app_icon.png',
        width: 512,
        height: 512,
        alt: 'Documentation Conseil d\'Orientation Mali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation — Conseil d\'Orientation Mali',
    description: 'Guides d\'utilisation et tutoriels pour s\'orienter dans l\'enseignement supérieur malien.',
    images: ['/app_icon.png'],
  },
};

export default function DocumentationPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: '/' },
          { name: 'Documentation', item: '/docs' },
        ]}
      />
      <HeroDocs />
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <DocumentationNav />
          <div className="lg:col-span-3">
            <QuickStartGuide />
            <APIDocumentation />
          </div>
        </div>
      </div>
    </main>
  );
}
