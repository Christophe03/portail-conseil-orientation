import { Metadata } from 'next';
import { PrivacyPageContent } from './PrivacyPageContent';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée sur Conseil d\'Orientation.',
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}