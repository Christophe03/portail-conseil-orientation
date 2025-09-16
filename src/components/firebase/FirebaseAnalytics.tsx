'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  trackPageView, 
  setAnalyticsScreen, 
  usePageTimeTracking, 
  useScrollTracking 
} from '@/lib/firebase-analytics';

interface FirebaseAnalyticsProps {
  children: React.ReactNode;
}

export function FirebaseAnalytics({ children }: FirebaseAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Enregistrer la vue de page
    const pageName = pathname;
    const pageTitle = document.title;
    
    trackPageView(pageName, pageTitle);
    setAnalyticsScreen(pageName);
  }, [pathname, searchParams]);

  // Mesurer le temps passé sur la page
  usePageTimeTracking(pathname);
  
  // Mesurer la profondeur de scroll
  useScrollTracking(pathname);

  return <>{children}</>;
}

// Composant pour enregistrer les événements de clic
interface TrackClickProps {
  eventName: string;
  parameters?: { [key: string]: any };
  children: React.ReactNode;
}

export function TrackClick({ eventName, parameters, children }: TrackClickProps) {
  const handleClick = () => {
    import('@/lib/firebase-analytics').then(({ trackEvent }) => {
      trackEvent(eventName, parameters);
    });
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}

// Composant pour enregistrer les événements de formulaire
interface TrackFormProps {
  formName: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  children: React.ReactNode;
}

export function TrackForm({ formName, onSuccess, onError, children }: TrackFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Logique de soumission du formulaire ici
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      // Enregistrer la soumission réussie
      import('@/lib/firebase-analytics').then(({ trackFormSubmit }) => {
        trackFormSubmit(formName, true, Object.keys(data));
      });
      
      onSuccess?.(data);
    } catch (error) {
      // Enregistrer l'erreur
      import('@/lib/firebase-analytics').then(({ trackFormSubmit, trackError }) => {
        trackFormSubmit(formName, false);
        trackError('form_submission', error instanceof Error ? error.message : 'Erreur inconnue', formName);
      });
      
      onError?.(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

// Hook pour enregistrer les erreurs
export const useErrorTracking = () => {
  const trackError = (error: Error, context?: string) => {
    import('@/lib/firebase-analytics').then(({ trackError: trackErrorEvent }) => {
      trackErrorEvent('javascript_error', error.message, context || 'unknown');
    });
  };

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError(new Error(event.message), event.filename);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(new Error(event.reason), 'unhandled_promise_rejection');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return { trackError };
};

// Composant pour enregistrer les performances
export function PerformanceTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mesurer le temps de chargement de la page
    const measurePageLoadTime = () => {
      const loadTime = performance.now();
      import('@/lib/firebase-analytics').then(({ trackPerformance }) => {
        trackPerformance('page_load_time', loadTime, 'milliseconds');
      });
    };

    // Mesurer les Core Web Vitals (temporairement désactivé)
    const measureCoreWebVitals = () => {
      // Fonctionnalité temporairement désactivée pour le déploiement
      console.log('Core Web Vitals measurement disabled for deployment');
    };

    // Attendre que la page soit complètement chargée
    if (document.readyState === 'complete') {
      measurePageLoadTime();
      measureCoreWebVitals();
    } else {
      window.addEventListener('load', () => {
        measurePageLoadTime();
        measureCoreWebVitals();
      });
    }
  }, []);

  return null;
}
