import { Metadata } from 'next';
import { HeroDocs } from '@/components/sections/HeroDocs';
import { DocumentationNav } from '@/components/sections/DocumentationNav';
import { QuickStartGuide } from '@/components/sections/QuickStartGuide';
import { APIDocumentation } from '@/components/sections/APIDocumentation';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Documentation complète de l\'application Conseil d\'Orientation. Guides d\'utilisation, tutoriels et références techniques.',
};

export default function DocumentationPage() {
  return (
    <main className="min-h-screen">
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
