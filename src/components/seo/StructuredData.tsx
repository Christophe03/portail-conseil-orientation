import { Metadata } from 'next';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'mobileApplication' | 'softwareApplication';
  data?: any;
}

export function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://conseil-orientation-mali.com';
  
  const defaultData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Conseil d\'Orientation Mali',
    alternateName: 'Conseil d\'Orientation',
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
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
        addressLocality: 'Kati Koko'
      }
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+223-92-72-25-64',
        contactType: 'customer service',
        availableLanguage: ['French', 'English']
      },
      {
        '@type': 'ContactPoint',
        email: 'conseilorientationinfo@gmail.com',
        contactType: 'customer service',
        availableLanguage: ['French', 'English']
      }
    ],
    sameAs: [
      'https://facebook.com/conseilorientation',
      'https://twitter.com/conseilorient',
      'https://instagram.com/conseilorientation',
      'https://linkedin.com/company/conseil-orientation'
    ],
    applicationCategory: 'EducationApplication',
    operatingSystem: ['Android', 'iOS'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000',
      bestRating: '5',
      worstRating: '1'
    },
    keywords: 'orientation scolaire Mali, conseil orientation Afrique, bourses études Mali, IA orientation scolaire, application mobile éducation'
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Conseil d\'Orientation Mali',
    alternateName: 'Conseil d\'Orientation',
    url: baseUrl,
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    inLanguage: 'fr-FR',
    copyrightYear: '2024',
    author: {
      '@type': 'Organization',
      name: 'Conseil d\'Orientation Mali'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const mobileAppData = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Conseil d\'Orientation',
    applicationCategory: 'EducationApplication',
    operatingSystem: ['Android', 'iOS'],
    url: baseUrl,
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    screenshot: `${baseUrl}/app_icon.png`,
    softwareVersion: '2.0',
    datePublished: '2023-06-01',
    dateModified: '2024-01-01',
    author: {
      '@type': 'Organization',
      name: 'Conseil d\'Orientation Mali'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000',
      bestRating: '5',
      worstRating: '1'
    },
    downloadUrl: [
      'https://play.google.com/store/apps/details?id=com.tcd.conseil_orientation',
      'https://apps.apple.com/app/conseil-orientation/id1234567890'
    ]
  };

  const softwareAppData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Conseil d\'Orientation',
    applicationCategory: 'EducationApplication',
    operatingSystem: ['Android', 'iOS'],
    url: baseUrl,
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    screenshot: `${baseUrl}/app_icon.png`,
    softwareVersion: '2.0',
    datePublished: '2023-06-01',
    dateModified: '2024-01-01',
    author: {
      '@type': 'Organization',
      name: 'Conseil d\'Orientation Mali'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000',
      bestRating: '5',
      worstRating: '1'
    },
    featureList: [
      'Assistant IA pour orientation scolaire',
      'Base de données de 1000+ bourses d\'études',
      'Conseils personnalisés',
      'Recherche de formations',
      'Analyse de marché du travail',
      'Support multilingue'
    ]
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
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}

// Composant pour les FAQ
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2)
      }}
    />
  );
}

// Composant pour les articles de blog
export function ArticleStructuredData({ 
  title, 
  description, 
  author, 
  datePublished, 
  dateModified, 
  image 
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://conseil-orientation-mali.com';
  
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Conseil d\'Orientation Mali',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo_full.png`
      }
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': baseUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleData, null, 2)
      }}
    />
  );
}
