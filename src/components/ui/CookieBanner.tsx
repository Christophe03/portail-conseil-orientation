'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShieldCheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveCookieConsent(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptSelected = () => {
    saveCookieConsent(preferences);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const allRejected = {
      necessary: true, // Les cookies nécessaires sont toujours acceptés
      analytics: false,
      marketing: false,
    };
    setPreferences(allRejected);
    saveCookieConsent(allRejected);
    setShowBanner(false);
  };

  const saveCookieConsent = (consent: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Appliquer les préférences
    if (consent.analytics) {
      // Activer Google Analytics
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
      };
    }
    
    if (consent.marketing) {
      // Activer les cookies marketing
      console.log('Cookies marketing activés');
    }
  };

  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 shadow-2xl"
      >
        <div className="container-custom py-6">
          {!showPreferences ? (
            // Bannière principale
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      🍪 Nous utilisons des cookies
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                      En continuant à utiliser ce site, vous acceptez notre utilisation des cookies.
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <Link 
                        href="/privacy" 
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium underline"
                      >
                        Politique de confidentialité
                      </Link>
                      <button
                        onClick={() => setShowPreferences(true)}
                        className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 text-sm font-medium underline"
                      >
                        Personnaliser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 font-medium"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Accepter tout
                </button>
              </div>
              
              <button
                onClick={() => setShowBanner(false)}
                className="lg:hidden p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            // Préférences détaillées
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  🎛️ Préférences des cookies
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Cookies nécessaires */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white">
                        Cookies nécessaires
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Essentiels au fonctionnement du site. Ne peuvent pas être désactivés.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="h-4 w-4 text-green-600 bg-neutral-100 border-neutral-300 rounded focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Cookies analytiques */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white">
                        Cookies analytiques
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Nous aident à comprendre comment vous utilisez le site.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="h-4 w-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Cookies marketing */}
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <InformationCircleIcon className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white">
                        Cookies marketing
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Utilisés pour afficher des publicités pertinentes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="h-4 w-4 text-purple-600 bg-neutral-100 border-neutral-300 rounded focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 font-medium"
                >
                  Refuser tout
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Enregistrer mes choix
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
