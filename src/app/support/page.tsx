import { Metadata } from 'next';
import { HeroSupport } from '@/components/sections/HeroSupport';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { SupportChannels } from '@/components/sections/SupportChannels';
import { Troubleshooting } from '@/components/sections/Troubleshooting';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Besoin d\'aide ? Notre équipe de support est là pour vous accompagner. FAQ, contact et ressources pour résoudre tous vos problèmes.',
};

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <HeroSupport />
      <FAQSection />
      <Troubleshooting />
      <SupportChannels />
      <ContactForm />
    </main>
  );
}
