import React from 'react';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { CONTACT_EMAIL } from '@/lib/contact';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.conseil-orientation-mali.com';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'mobileApplication' | 'softwareApplication';
  data?: any;
}

export function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const baseUrl = SITE_URL;

  const defaultData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Conseil d\'Orientation Mali',
    alternateName: 'Conseil d\'Orientation',
    description: 'Portail national d\'orientation scolaire et universitaire au Mali. Répertoire officiel des universités publiques et privées, séries du bac et application mobile Android.',
    url: baseUrl,
    logo: `${baseUrl}/logo_full.png`,
    image: `${baseUrl}/app_icon.png`,
    foundingDate: '2023',
    foundingLocation: {
      '@type': 'Place',
      name: 'Mali',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ML',
        addressLocality: 'Kati Koko',
        addressRegion: 'Koulikoro',
      },
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+223 92 72 25 64',
        contactType: 'customer support',
        availableLanguage: ['French', 'Bambara'],
      },
      {
        '@type': 'ContactPoint',
        email: CONTACT_EMAIL,
        contactType: 'customer support',
        availableLanguage: ['French'],
      },
    ],
    sameAs: [
      'https://facebook.com/conseilorientation',
      'https://wa.me/22392722564',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Mali',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock',
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Conseil d\'Orientation Mali',
    alternateName: 'Conseil d\'Orientation',
    url: baseUrl,
    description: 'Portail officiel d\'orientation scolaire et universitaire au Mali. Annuaire de plus de 190 universités privées et universités publiques, simulation de bourse nationale et conseiller IA.',
    inLanguage: 'fr-FR',
    copyrightYear: new Date().getFullYear(),
    publisher: {
      '@type': 'Organization',
      name: 'Conseil d\'Orientation Mali',
      logo: `${baseUrl}/logo_full.png`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/universites?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const mobileAppData = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Conseil d\'Orientation Mali',
    operatingSystem: 'Android 6.0 et supérieur',
    applicationCategory: 'EducationalApplication',
    url: `${baseUrl}/download`,
    downloadUrl: APP_DOWNLOAD_URL,
    installUrl: APP_DOWNLOAD_URL,
    description: 'Application mobile d\'orientation scolaire au Mali avec simulateur d\'éligibilité aux bourses nationales CENOU, répertoires des universités et conseiller intelligent.',
    screenshot: `${baseUrl}/images/app/app-mockup-1.webp`,
    softwareVersion: '1.0.0',
    datePublished: '2023-09-01',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: 'Conseil d\'Orientation Mali',
    },
  };

  const softwareAppData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Conseil d\'Orientation Mali',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Android',
    url: baseUrl,
    description: 'Solution d\'orientation post-baccalauréat au Mali intégrant un moteur d\'orientation par série du BAC et un annuaire national d\'établissements d\'enseignement supérieur.',
    screenshot: `${baseUrl}/images/app/app-mockup-1.webp`,
    softwareVersion: '2.0.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Orientation selon les séries du Baccalauréat malien (TSE, TSExp, TSS, TAL, etc.)',
      'Simulateur d\'éligibilité à la bourse nationale (CENOU)',
      'Annuaire officiel des universités publiques et privées agréées',
      'Fiches détaillées des formations et débouchés professionnels',
      'Conseiller IA virtuel disponible 24/7',
    ],
  };

  let structuredData;
  switch (type) {
    case 'organization':
      structuredData = defaultData;
      break;
    case 'website':
      structuredData = websiteData;
      break;
    case 'mobileApplication':
      structuredData = mobileAppData;
      break;
    case 'softwareApplication':
      structuredData = softwareAppData;
      break;
    default:
      structuredData = data || defaultData;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/**
 * Fil d'Ariane Schema.org (BreadcrumbList) pour enrichir la navigation dans les SERP Google.
 */
export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; item: string }>;
}) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith('http') ? it.item : `${SITE_URL}${it.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}

/**
 * Schema.org pour Établissement d'Enseignement Supérieur (CollegeOrUniversity / EducationalOrganization)
 */
export function UniversityStructuredData({
  name,
  acronym,
  location,
  address,
  phone,
  email,
  website,
  isPublic = false,
  description,
  url,
}: {
  name: string;
  acronym?: string;
  location?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  isPublic?: boolean;
  description?: string;
  url: string;
}) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const univData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: name,
    alternateName: acronym ? [acronym] : undefined,
    url: fullUrl,
    description:
      description ||
      `${name}${acronym ? ` (${acronym})` : ''}, établissement d'enseignement supérieur ${isPublic ? 'public' : 'privé'} au Mali.`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ML',
      addressLocality: location || 'Bamako',
      streetAddress: address || undefined,
    },
  };

  if (phone) univData.telephone = phone;
  if (email) univData.email = email;
  if (website && website.startsWith('http')) univData.sameAs = [website];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(univData),
      }}
    />
  );
}

/**
 * Schema.org pour FAQ (FAQPage)
 */
export function FAQStructuredData({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}

/**
 * Schema.org pour Programme / Série du Baccalauréat (EducationalOccupationalProgram)
 */
export function ProgramStructuredData({
  name,
  description,
  url,
  programType = 'Série du Baccalauréat',
}: {
  name: string;
  description: string;
  url: string;
  programType?: string;
}) {
  const programData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    programType,
    educationalCredentialAwarded: 'Diplôme du Baccalauréat Malien',
    timeToComplete: 'P3Y',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(programData),
      }}
    />
  );
}
