import { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = '/fonts/inter-var.woff2';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Preload critical images
      const imageLink = document.createElement('link');
      imageLink.rel = 'preload';
      imageLink.href = '/app_icon.png';
      imageLink.as = 'image';
      document.head.appendChild(imageLink);
    };

    // Optimize images loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[data-defer]');
      scripts.forEach((script) => {
        script.setAttribute('defer', 'true');
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeImages();
    optimizeThirdPartyScripts();

    // Cleanup
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}

// Component for lazy loading images
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false 
}: LazyImageProps) {
  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
      />
    );
  }

  return (
    <img
      data-src={src}
      alt={alt}
      className={`lazy ${className}`}
      width={width}
      height={height}
      loading="lazy"
      fetchPriority="low"
      style={{ opacity: 0 }}
      onLoad={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease-in-out';
      }}
    />
  );
}

// Component for preloading critical resources
export function CriticalResourcePreloader() {
  useEffect(() => {
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.href = '/styles/critical.css';
    criticalCSS.as = 'style';
    document.head.appendChild(criticalCSS);

    // Preload critical JavaScript
    const criticalJS = document.createElement('link');
    criticalJS.rel = 'preload';
    criticalJS.href = '/js/critical.js';
    criticalJS.as = 'script';
    document.head.appendChild(criticalJS);

    // DNS prefetch for external domains
    const dnsPrefetchDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

// Component for optimizing Core Web Vitals
export function CoreWebVitalsOptimizer() {
  useEffect(() => {
    // Optimize Largest Contentful Paint (LCP)
    const optimizeLCP = () => {
      // Preload the largest image
      const largestImage = document.querySelector('img[data-lcp]');
      if (largestImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = largestImage.getAttribute('src') || '';
        link.as = 'image';
        document.head.appendChild(link);
      }
    };

    // Optimize First Input Delay (FID)
    const optimizeFID = () => {
      // Defer non-critical JavaScript
      const nonCriticalScripts = document.querySelectorAll('script[data-non-critical]');
      nonCriticalScripts.forEach(script => {
        script.setAttribute('defer', 'true');
      });
    };

    // Optimize Cumulative Layout Shift (CLS)
    const optimizeCLS = () => {
      // Set explicit dimensions for images
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        if (!img.getAttribute('width') && !img.getAttribute('height')) {
          img.style.aspectRatio = '16/9';
        }
      });

      // Reserve space for dynamic content
      const dynamicElements = document.querySelectorAll('[data-dynamic]');
      dynamicElements.forEach(element => {
        element.style.minHeight = '200px';
      });
    };

    // Initialize optimizations
    optimizeLCP();
    optimizeFID();
    optimizeCLS();

    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  }, []);

  return null;
}
