'use client';

import { useEffect, useState } from 'react';
import { measureCoreWebVitals, generatePerformanceReport } from '@/lib/performance';

interface PerformanceData {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  recommendations: string[];
}

export function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Démarrer le monitoring des performances
    const startMonitoring = async () => {
      setIsMonitoring(true);
      
      try {
        const report = await generatePerformanceReport();
        setPerformanceData({
          lcp: report.metrics.lcp,
          fid: report.metrics.fid,
          cls: report.metrics.cls,
          fcp: report.metrics.fcp,
          ttfb: report.metrics.ttfb,
          recommendations: report.recommendations
        });
      } catch (error) {
        console.error('Erreur lors du monitoring des performances:', error);
      } finally {
        setIsMonitoring(false);
      }
    };

    // Démarrer le monitoring après un délai pour permettre le chargement
    const timer = setTimeout(startMonitoring, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Afficher les données de performance en mode développement
  if (process.env.NODE_ENV === 'development' && performanceData) {
    return (
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
        <h3 className="font-bold mb-2">Core Web Vitals</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>LCP:</span>
            <span className={performanceData.lcp > 2.5 ? 'text-red-400' : 'text-green-400'}>
              {performanceData.lcp.toFixed(2)}s
            </span>
          </div>
          <div className="flex justify-between">
            <span>FID:</span>
            <span className={performanceData.fid > 100 ? 'text-red-400' : 'text-green-400'}>
              {performanceData.fid.toFixed(0)}ms
            </span>
          </div>
          <div className="flex justify-between">
            <span>CLS:</span>
            <span className={performanceData.cls > 0.1 ? 'text-red-400' : 'text-green-400'}>
              {performanceData.cls.toFixed(3)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>FCP:</span>
            <span className={performanceData.fcp > 1.8 ? 'text-red-400' : 'text-green-400'}>
              {performanceData.fcp.toFixed(2)}s
            </span>
          </div>
          <div className="flex justify-between">
            <span>TTFB:</span>
            <span className={performanceData.ttfb > 600 ? 'text-red-400' : 'text-green-400'}>
              {performanceData.ttfb.toFixed(0)}ms
            </span>
          </div>
        </div>
        
        {performanceData.recommendations.length > 0 && (
          <div className="mt-3">
            <h4 className="font-bold mb-1">Recommandations:</h4>
            <ul className="text-xs space-y-1">
              {performanceData.recommendations.map((rec, index) => (
                <li key={index} className="text-yellow-400">• {rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return null;
}

// Composant pour surveiller les performances des images
export function ImagePerformanceMonitor() {
  const [imageMetrics, setImageMetrics] = useState<{
    loadedImages: number;
    totalImages: number;
    averageLoadTime: number;
  }>({
    loadedImages: 0,
    totalImages: 0,
    averageLoadTime: 0
  });

  useEffect(() => {
    const images = document.querySelectorAll('img');
    setImageMetrics(prev => ({ ...prev, totalImages: images.length }));

    const imageLoadTimes: number[] = [];

    images.forEach((img) => {
      const startTime = performance.now();
      
      img.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        imageLoadTimes.push(loadTime);
        
        setImageMetrics(prev => ({
          ...prev,
          loadedImages: prev.loadedImages + 1,
          averageLoadTime: imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length
        }));
      });
    });
  }, []);

  // Afficher les métriques des images en mode développement
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
        <h3 className="font-bold mb-2">Image Performance</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Images chargées:</span>
            <span>{imageMetrics.loadedImages}/{imageMetrics.totalImages}</span>
          </div>
          <div className="flex justify-between">
            <span>Temps moyen:</span>
            <span>{imageMetrics.averageLoadTime.toFixed(0)}ms</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Composant pour surveiller les performances des composants
export function ComponentPerformanceMonitor({ children, name }: { children: React.ReactNode; name: string }) {
  const [renderTime, setRenderTime] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      setRenderTime(endTime - startTime);
    };
  }, []);

  // Afficher les métriques des composants en mode développement
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="relative">
        {children}
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded">
          {name}: {renderTime.toFixed(1)}ms
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook pour surveiller les performances d'un composant
export function usePerformanceMonitor(componentName: string) {
  const [metrics, setMetrics] = useState<{
    renderCount: number;
    averageRenderTime: number;
    lastRenderTime: number;
  }>({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      setMetrics(prev => ({
        renderCount: prev.renderCount + 1,
        averageRenderTime: (prev.averageRenderTime + renderTime) / 2,
        lastRenderTime: renderTime
      }));
    };
  });

  return metrics;
}

// Composant pour afficher les métriques de performance
export function PerformanceMetricsDisplay() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const collectMetrics = async () => {
      try {
        const report = await generatePerformanceReport();
        setMetrics(report);
      } catch (error) {
        console.error('Erreur lors de la collecte des métriques:', error);
      }
    };

    collectMetrics();
  }, []);

  if (!metrics || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-lg mb-3">Performance Metrics</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">LCP:</span>
          <span className={`text-sm font-mono ${metrics.metrics.lcp > 2.5 ? 'text-red-600' : 'text-green-600'}`}>
            {metrics.metrics.lcp.toFixed(2)}s
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm">FID:</span>
          <span className={`text-sm font-mono ${metrics.metrics.fid > 100 ? 'text-red-600' : 'text-green-600'}`}>
            {metrics.metrics.fid.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm">CLS:</span>
          <span className={`text-sm font-mono ${metrics.metrics.cls > 0.1 ? 'text-red-600' : 'text-green-600'}`}>
            {metrics.metrics.cls.toFixed(3)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm">FCP:</span>
          <span className={`text-sm font-mono ${metrics.metrics.fcp > 1.8 ? 'text-red-600' : 'text-green-600'}`}>
            {metrics.metrics.fcp.toFixed(2)}s
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm">TTFB:</span>
          <span className={`text-sm font-mono ${metrics.metrics.ttfb > 600 ? 'text-red-600' : 'text-green-600'}`}>
            {metrics.metrics.ttfb.toFixed(0)}ms
          </span>
        </div>
      </div>
      
      {metrics.recommendations.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm mb-2">Recommandations:</h4>
          <ul className="text-xs space-y-1">
            {metrics.recommendations.map((rec: string, index: number) => (
              <li key={index} className="text-yellow-600">• {rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
