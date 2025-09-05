import { useEffect } from 'react';

// Component for managing canonical URLs
interface CanonicalURLProps {
  url: string;
}

export function CanonicalURL({ url }: CanonicalURLProps) {
  useEffect(() => {
    // Remove existing canonical links
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = url;
    document.head.appendChild(canonicalLink);
  }, [url]);

  return null;
}

// Component for managing hreflang tags
interface HreflangProps {
  languages: Array<{ code: string; url: string }>;
}

export function Hreflang({ languages }: HreflangProps) {
  useEffect(() => {
    // Remove existing hreflang links
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    // Add new hreflang links
    languages.forEach(({ code, url }) => {
      const hreflangLink = document.createElement('link');
      hreflangLink.rel = 'alternate';
      hreflangLink.hreflang = code;
      hreflangLink.href = url;
      document.head.appendChild(hreflangLink);
    });
  }, [languages]);

  return null;
}

// Component for managing meta robots
interface MetaRobotsProps {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  nocache?: boolean;
}

export function MetaRobots({ 
  index = true, 
  follow = true, 
  noarchive = false, 
  nosnippet = false, 
  noimageindex = false, 
  nocache = false 
}: MetaRobotsProps) {
  useEffect(() => {
    // Remove existing robots meta
    const existingRobots = document.querySelector('meta[name="robots"]');
    if (existingRobots) {
      existingRobots.remove();
    }

    // Build robots content
    const robotsContent = [
      index ? 'index' : 'noindex',
      follow ? 'follow' : 'nofollow',
      noarchive ? 'noarchive' : '',
      nosnippet ? 'nosnippet' : '',
      noimageindex ? 'noimageindex' : '',
      nocache ? 'nocache' : ''
    ].filter(Boolean).join(', ');

    // Add new robots meta
    const robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    robotsMeta.content = robotsContent;
    document.head.appendChild(robotsMeta);
  }, [index, follow, noarchive, nosnippet, noimageindex, nocache]);

  return null;
}

// Component for managing viewport meta
interface ViewportProps {
  width?: string;
  initialScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
}

export function Viewport({ 
  width = 'device-width', 
  initialScale = 1, 
  maximumScale = 5, 
  userScalable = true 
}: ViewportProps) {
  useEffect(() => {
    // Remove existing viewport meta
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (existingViewport) {
      existingViewport.remove();
    }

    // Build viewport content
    const viewportContent = [
      `width=${width}`,
      `initial-scale=${initialScale}`,
      `maximum-scale=${maximumScale}`,
      `user-scalable=${userScalable ? 'yes' : 'no'}`
    ].join(', ');

    // Add new viewport meta
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = viewportContent;
    document.head.appendChild(viewportMeta);
  }, [width, initialScale, maximumScale, userScalable]);

  return null;
}

// Component for managing Open Graph meta tags
interface OpenGraphProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

export function OpenGraph({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website', 
  siteName = 'Conseil d\'Orientation Mali',
  locale = 'fr_FR'
}: OpenGraphProps) {
  useEffect(() => {
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale }
    ];

    ogTags.forEach(({ property, content }) => {
      if (content) {
        // Remove existing tag
        const existingTag = document.querySelector(`meta[property="${property}"]`);
        if (existingTag) {
          existingTag.remove();
        }

        // Add new tag
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    });
  }, [title, description, image, url, type, siteName, locale]);

  return null;
}

// Component for managing Twitter Card meta tags
interface TwitterCardProps {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
  creator?: string;
  site?: string;
}

export function TwitterCard({ 
  card = 'summary_large_image', 
  title, 
  description, 
  image, 
  creator = '@conseilorient',
  site = '@conseilorient'
}: TwitterCardProps) {
  useEffect(() => {
    const twitterTags = [
      { name: 'twitter:card', content: card },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:creator', content: creator },
      { name: 'twitter:site', content: site }
    ];

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        // Remove existing tag
        const existingTag = document.querySelector(`meta[name="${name}"]`);
        if (existingTag) {
          existingTag.remove();
        }

        // Add new tag
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    });
  }, [card, title, description, image, creator, site]);

  return null;
}

// Component for managing JSON-LD structured data
interface JSONLDProps {
  data: any;
  type?: string;
}

export function JSONLD({ data, type = 'application/ld+json' }: JSONLDProps) {
  useEffect(() => {
    // Remove existing JSON-LD with same type
    const existingJSONLD = document.querySelector(`script[type="${type}"]`);
    if (existingJSONLD) {
      existingJSONLD.remove();
    }

    // Add new JSON-LD
    const script = document.createElement('script');
    script.type = type;
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }, [data, type]);

  return null;
}

// Component for managing page loading optimization
export function PageLoadingOptimizer() {
  useEffect(() => {
    // Optimize page loading
    const optimizePageLoading = () => {
      // Preload critical resources
      const criticalResources = [
        { href: '/app_icon.png', as: 'image' },
        { href: '/logo_full.png', as: 'image' },
        { href: '/styles/globals.css', as: 'style' }
      ];

      criticalResources.forEach(({ href, as }) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
      });

      // Optimize font loading
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@100..900&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);
    };

    optimizePageLoading();
  }, []);

  return null;
}

// Component for managing search engine optimization
export function SearchEngineOptimizer() {
  useEffect(() => {
    // Add search engine specific optimizations
    const optimizeForSearchEngines = () => {
      // Add Google-specific meta tags
      const googleMeta = document.createElement('meta');
      googleMeta.name = 'google-site-verification';
      googleMeta.content = 'your-google-verification-code';
      document.head.appendChild(googleMeta);

      // Add Bing-specific meta tags
      const bingMeta = document.createElement('meta');
      bingMeta.name = 'msvalidate.01';
      bingMeta.content = 'your-bing-verification-code';
      document.head.appendChild(bingMeta);

      // Add Yandex-specific meta tags
      const yandexMeta = document.createElement('meta');
      yandexMeta.name = 'yandex-verification';
      yandexMeta.content = 'your-yandex-verification-code';
      document.head.appendChild(yandexMeta);
    };

    optimizeForSearchEngines();
  }, []);

  return null;
}
