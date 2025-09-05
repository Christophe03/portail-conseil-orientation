// Configuration SEO centralisée pour Conseil d'Orientation Mali

export const seoConfig = {
  // Configuration de base
  site: {
    name: 'Conseil d\'Orientation Mali',
    url: 'https://conseil-orientation-mali.com',
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    logo: '/logo_full.png',
    icon: '/app_icon.png',
    language: 'fr',
    locale: 'fr_FR',
    country: 'ML',
    region: 'Mali',
    coordinates: {
      latitude: 17.570692,
      longitude: -3.996166
    }
  },

  // Mots-clés principaux
  keywords: {
    primary: [
      'orientation scolaire Mali',
      'conseil orientation Afrique',
      'bourses études Mali',
      'IA orientation scolaire',
      'application mobile éducation'
    ],
    secondary: [
      'orientation universitaire Mali',
      'bourses internationales',
      'conseil carrière étudiant',
      'orientation professionnelle Mali',
      'études supérieures Mali',
      'bourses bourse Mali',
      'orientation scolaire gratuite',
      'conseil orientation IA',
      'application éducation Mali',
      'orientation scolaire personnalisée'
    ],
    longTail: [
      'comment choisir orientation scolaire Mali',
      'meilleure application orientation scolaire Afrique',
      'bourses études supérieures Mali 2024',
      'conseil orientation professionnelle gratuite',
      'application mobile éducation Mali',
      'IA pour orientation scolaire personnalisée',
      'trouver bourse études internationales Mali',
      'conseil carrière étudiant université Mali'
    ]
  },

  // Configuration des pages
  pages: {
    home: {
      title: 'Conseil d\'Orientation Mali - IA pour Orientation Scolaire & Bourses d\'Études',
      description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
      keywords: [
        'orientation scolaire Mali', 'conseil orientation Afrique', 'bourses études Mali', 
        'IA orientation scolaire', 'application mobile éducation', 'orientation universitaire Mali',
        'bourses internationales', 'conseil carrière étudiant', 'orientation professionnelle Mali',
        'études supérieures Mali', 'bourses bourse Mali', 'orientation scolaire gratuite',
        'conseil orientation IA', 'application éducation Mali', 'orientation scolaire personnalisée'
      ],
      priority: 1.0,
      changefreq: 'daily'
    },
    about: {
      title: 'À Propos - Conseil d\'Orientation Mali | Notre Histoire & Mission',
      description: 'Découvrez l\'histoire de Conseil d\'Orientation Mali, créé en 2023. Notre mission : démocratiser l\'orientation scolaire en Afrique avec l\'IA et 1000+ bourses d\'études.',
      keywords: [
        'à propos conseil orientation Mali', 'histoire entreprise Mali', 'mission orientation scolaire Afrique',
        'équipe conseil orientation', 'fondation 2023 Mali', 'innovation éducation Afrique',
        'conseil orientation équipe', 'histoire application mobile Mali', 'mission éducation Mali'
      ],
      priority: 0.8,
      changefreq: 'weekly'
    },
    features: {
      title: 'Fonctionnalités - Conseil d\'Orientation Mali | IA & Bourses d\'Études',
      description: 'Découvrez toutes les fonctionnalités de Conseil d\'Orientation Mali : assistant IA avancé, 1000+ bourses d\'études, conseils personnalisés, recherche de formations et analyse de marché du travail.',
      keywords: [
        'fonctionnalités conseil orientation Mali', 'assistant IA orientation scolaire', 'bourses études Mali',
        'conseils personnalisés orientation', 'recherche formations Mali', 'analyse marché travail Mali',
        'application mobile éducation', 'IA orientation scolaire Afrique', 'base données bourses Mali',
        'conseil carrière étudiant Mali', 'orientation professionnelle IA', 'fonctionnalités app éducation'
      ],
      priority: 0.9,
      changefreq: 'weekly'
    },
    download: {
      title: 'Télécharger - Conseil d\'Orientation Mali | App Mobile Gratuite',
      description: 'Téléchargez gratuitement l\'application Conseil d\'Orientation Mali sur Android et iOS. IA avancée, 1000+ bourses d\'études, conseils personnalisés pour votre orientation scolaire.',
      keywords: [
        'télécharger conseil orientation Mali', 'app mobile orientation scolaire', 'application gratuite éducation Mali',
        'télécharger app Android iOS', 'conseil orientation mobile Mali', 'application orientation scolaire gratuite',
        'télécharger app éducation Afrique', 'conseil orientation téléchargement', 'app mobile bourses études Mali',
        'télécharger application IA orientation', 'conseil orientation app store', 'play store conseil orientation Mali'
      ],
      priority: 0.9,
      changefreq: 'weekly'
    },
    docs: {
      title: 'Documentation - Conseil d\'Orientation Mali | Guide d\'Utilisation',
      description: 'Documentation complète de l\'application Conseil d\'Orientation Mali. Guides d\'utilisation, API, intégration et support technique.',
      keywords: [
        'documentation conseil orientation Mali', 'guide utilisation app orientation', 'API conseil orientation',
        'intégration application éducation', 'support technique orientation scolaire', 'manuel utilisateur Mali',
        'documentation technique app mobile', 'guide développeur conseil orientation', 'tutoriel application éducation'
      ],
      priority: 0.7,
      changefreq: 'weekly'
    },
    support: {
      title: 'Support - Conseil d\'Orientation Mali | Aide & Contact',
      description: 'Support technique et aide pour l\'application Conseil d\'Orientation Mali. Contactez notre équipe 24/7 pour toute assistance.',
      keywords: [
        'support conseil orientation Mali', 'aide application orientation scolaire', 'contact conseil orientation',
        'assistance technique app mobile', 'support client éducation Mali', 'aide utilisateur orientation',
        'contact équipe conseil orientation', 'support 24/7 application éducation', 'aide technique Mali'
      ],
      priority: 0.6,
      changefreq: 'weekly'
    },
    privacy: {
      title: 'Politique de Confidentialité - Conseil d\'Orientation Mali',
      description: 'Politique de confidentialité et protection des données personnelles de l\'application Conseil d\'Orientation Mali. Conformité RGPD et sécurité des données.',
      keywords: [
        'politique confidentialité Mali', 'protection données personnelles', 'RGPD application éducation',
        'confidentialité conseil orientation', 'sécurité données utilisateur', 'vie privée app mobile Mali',
        'politique données Conseil d\'Orientation', 'protection informations personnelles', 'confidentialité éducation Mali'
      ],
      priority: 0.5,
      changefreq: 'monthly'
    }
  },

  // Configuration Open Graph
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Conseil d\'Orientation Mali',
    images: {
      default: '/app_icon.png',
      logo: '/logo_full.png',
      about: '/logo_about.png'
    }
  },

  // Configuration Twitter
  twitter: {
    card: 'summary_large_image',
    creator: '@conseilorient',
    site: '@conseilorient',
    images: {
      default: '/app_icon.png'
    }
  },

  // Configuration des réseaux sociaux
  social: {
    facebook: 'https://facebook.com/conseilorientation',
    twitter: 'https://twitter.com/conseilorient',
    instagram: 'https://instagram.com/conseilorientation',
    linkedin: 'https://linkedin.com/company/conseil-orientation',
    whatsapp: 'https://wa.me/22392722564'
  },

  // Configuration des contacts
  contact: {
    email: {
      primary: 'goldeninnovationtech@gmail.com',
      support: 'conseilorientationinfo@gmail.com'
    },
    phone: {
      primary: '+223 96 85 52 82',
      secondary: '+223 92 72 25 64'
    },
    address: {
      country: 'Mali',
      city: 'Kati Koko',
      full: 'Mali, Kati Koko'
    }
  },

  // Configuration des performances
  performance: {
    // Core Web Vitals targets
    lcp: 2.5, // Largest Contentful Paint (seconds)
    fid: 100, // First Input Delay (milliseconds)
    cls: 0.1, // Cumulative Layout Shift
    fcp: 1.8, // First Contentful Paint (seconds)
    ttfb: 600, // Time to First Byte (milliseconds)
    
    // Image optimization
    imageFormats: ['webp', 'avif'],
    imageSizes: [320, 640, 768, 1024, 1200, 1920],
    
    // Font optimization
    fontDisplay: 'swap',
    preloadFonts: ['Inter', 'Poppins']
  },

  // Configuration des robots
  robots: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/', '/admin/', '/_next/', '/private/', '/temp/'],
    sitemap: 'https://conseil-orientation-mali.com/sitemap.xml',
    crawlDelay: 1
  },

  // Configuration des analytics
  analytics: {
    google: {
      measurementId: 'G-XXXXXXXXXX', // À remplacer par votre ID Google Analytics
      tagManagerId: 'GTM-XXXXXXX' // À remplacer par votre ID Google Tag Manager
    },
    facebook: {
      pixelId: 'XXXXXXXXXXXXXXX' // À remplacer par votre ID Facebook Pixel
    }
  }
};

// Fonctions utilitaires SEO
export const seoUtils = {
  // Générer une URL canonique
  generateCanonicalUrl: (path: string): string => {
    return `${seoConfig.site.url}${path}`;
  },

  // Générer des métadonnées pour une page
  generatePageMetadata: (pageKey: keyof typeof seoConfig.pages) => {
    const page = seoConfig.pages[pageKey];
    return {
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      openGraph: {
        title: page.title,
        description: page.description,
        url: seoUtils.generateCanonicalUrl(`/${pageKey}`),
        siteName: seoConfig.openGraph.siteName,
        images: [seoConfig.openGraph.images.default],
        locale: seoConfig.openGraph.locale,
        type: seoConfig.openGraph.type
      },
      twitter: {
        card: seoConfig.twitter.card,
        title: page.title,
        description: page.description,
        images: [seoConfig.twitter.images.default],
        creator: seoConfig.twitter.creator,
        site: seoConfig.twitter.site
      },
      alternates: {
        canonical: seoUtils.generateCanonicalUrl(`/${pageKey}`)
      }
    };
  },

  // Générer des données structurées pour l'organisation
  generateOrganizationStructuredData: () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: seoConfig.site.name,
      alternateName: 'Conseil d\'Orientation',
      description: seoConfig.site.description,
      url: seoConfig.site.url,
      logo: `${seoConfig.site.url}${seoConfig.site.logo}`,
      image: `${seoConfig.site.url}${seoConfig.site.icon}`,
      foundingDate: '2023',
      foundingLocation: {
        '@type': 'Place',
        name: seoConfig.site.region,
        address: {
          '@type': 'PostalAddress',
          addressCountry: seoConfig.site.country,
          addressLocality: seoConfig.contact.address.city
        }
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: seoConfig.contact.phone.primary,
          contactType: 'customer service',
          availableLanguage: ['French', 'English']
        },
        {
          '@type': 'ContactPoint',
          email: seoConfig.contact.email.support,
          contactType: 'customer service',
          availableLanguage: ['French', 'English']
        }
      ],
      sameAs: Object.values(seoConfig.social)
    };
  }
};
