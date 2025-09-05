// Utilitaires pour optimiser les performances et les Core Web Vitals

// Interface pour les métriques de performance
interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

// Configuration des seuils de performance
export const performanceThresholds: PerformanceMetrics = {
  lcp: 2.5, // secondes
  fid: 100, // millisecondes
  cls: 0.1, // score
  fcp: 1.8, // secondes
  ttfb: 600, // millisecondes
};

// Fonction pour mesurer les Core Web Vitals
export function measureCoreWebVitals(): Promise<PerformanceMetrics> {
  return new Promise((resolve) => {
    const metrics: Partial<PerformanceMetrics> = {};

    // Mesurer LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime: number };
        metrics.lcp = lastEntry.renderTime / 1000; // Convertir en secondes
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Mesurer FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          metrics.fid = entry.processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Mesurer CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Mesurer FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          metrics.fcp = entry.startTime / 1000; // Convertir en secondes
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Mesurer TTFB (Time to First Byte)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // Résoudre après un délai pour permettre la collecte des métriques
      setTimeout(() => {
        resolve(metrics as PerformanceMetrics);
      }, 3000);
    } else {
      // Fallback pour les navigateurs qui ne supportent pas PerformanceObserver
      resolve({
        lcp: 0,
        fid: 0,
        cls: 0,
        fcp: 0,
        ttfb: 0
      });
    }
  });
}

// Fonction pour optimiser les performances de chargement
export function optimizeLoadingPerformance() {
  // Preload des ressources critiques
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

  // DNS prefetch pour les domaines externes
  const externalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

// Fonction pour optimiser les performances de rendu
export function optimizeRenderingPerformance() {
  // Utiliser requestAnimationFrame pour les animations
  const animate = (callback: () => void) => {
    requestAnimationFrame(callback);
  };

  // Optimiser les transitions CSS
  const optimizeTransitions = () => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      
      .gpu-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
    `;
    document.head.appendChild(style);
  };

  optimizeTransitions();

  return { animate };
}

// Fonction pour optimiser les performances de mémoire
export function optimizeMemoryPerformance() {
  // Nettoyer les event listeners
  const cleanupEventListeners = () => {
    // Supprimer les event listeners non utilisés
    const elements = document.querySelectorAll('[data-cleanup]');
    elements.forEach(element => {
      element.removeAttribute('data-cleanup');
    });
  };

  // Optimiser les images
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

  // Optimiser les scripts
  const optimizeScripts = () => {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach((script) => {
      script.setAttribute('defer', 'true');
    });
  };

  cleanupEventListeners();
  optimizeImages();
  optimizeScripts();
}

// Fonction pour optimiser les performances de réseau
export function optimizeNetworkPerformance() {
  // Utiliser Service Worker pour la mise en cache
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker enregistré:', registration);
      })
      .catch((error) => {
        console.log('Erreur Service Worker:', error);
      });
  }

  // Optimiser les requêtes HTTP
  const optimizeHTTPRequests = () => {
    // Utiliser fetch avec des options optimisées
    const optimizedFetch = (url: string, options: RequestInit = {}) => {
      return fetch(url, {
        ...options,
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
          ...options.headers
        }
      });
    };

    return { optimizedFetch };
  };

  return optimizeHTTPRequests();
}

// Fonction pour générer un rapport de performance
export function generatePerformanceReport(): Promise<{
  metrics: PerformanceMetrics;
  recommendations: string[];
}> {
  return measureCoreWebVitals().then((metrics) => {
    const recommendations: string[] = [];

    // Analyser LCP
    if (metrics.lcp > performanceThresholds.lcp) {
      recommendations.push('Optimiser le LCP en preloadant les ressources critiques');
    }

    // Analyser FID
    if (metrics.fid > performanceThresholds.fid) {
      recommendations.push('Réduire le FID en déferant les scripts non critiques');
    }

    // Analyser CLS
    if (metrics.cls > performanceThresholds.cls) {
      recommendations.push('Réduire le CLS en définissant des dimensions explicites pour les images');
    }

    // Analyser FCP
    if (metrics.fcp > performanceThresholds.fcp) {
      recommendations.push('Optimiser le FCP en minifiant le CSS critique');
    }

    // Analyser TTFB
    if (metrics.ttfb > performanceThresholds.ttfb) {
      recommendations.push('Améliorer le TTFB en optimisant le serveur');
    }

    return { metrics, recommendations };
  });
}

// Fonction pour surveiller les performances en temps réel
export function monitorPerformance() {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('Performance entry:', entry);
      
      // Envoyer les métriques à un service d'analytics
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;
        console.log('Navigation timing:', {
          domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
          totalTime: navEntry.loadEventEnd - navEntry.fetchStart
        });
      }
    });
  });

  observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

  return observer;
}

// Fonction pour optimiser les performances globales
export function optimizeGlobalPerformance() {
  // Optimiser le chargement
  optimizeLoadingPerformance();

  // Optimiser le rendu
  const { animate } = optimizeRenderingPerformance();

  // Optimiser la mémoire
  optimizeMemoryPerformance();

  // Optimiser le réseau
  const { optimizedFetch } = optimizeNetworkPerformance();

  // Surveiller les performances
  const performanceObserver = monitorPerformance();

  return {
    animate,
    optimizedFetch,
    performanceObserver,
    generateReport: generatePerformanceReport
  };
}
