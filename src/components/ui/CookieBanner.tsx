'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheckIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
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
      necessary: true,
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
    
    if (consent.analytics) {
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
      };
    }
  };

  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return;
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#071324]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl"
      >
        <div className="container-custom py-5">
          {!showPreferences ? (
            /* Main Banner */
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div className="flex items-start gap-3.5 max-w-3xl">
                <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                    🍪 Gestion des cookies & respect de votre vie privée
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Nous utilisons des cookies strictement nécessaires au fonctionnement du portail et des mesures d'audience anonymes pour améliorer les fiches d'orientation scolaire au Mali.
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <Link 
                      href="/privacy" 
                      className="text-[#13508F] dark:text-[#3B9DF8] font-semibold hover:underline"
                    >
                      Politique de confidentialité
                    </Link>
                    <span className="text-slate-400">•</span>
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium underline"
                    >
                      Personnaliser mes choix
                    </button>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold min-h-[40px]"
                >
                  Refuser non-essentiels
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white transition-all text-xs font-semibold shadow-sm min-h-[40px]"
                >
                  Accepter tout
                </button>
                <button
                  onClick={() => setShowBanner(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg lg:ml-2"
                  aria-label="Fermer la bannière"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            /* Preferences Panel */
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Préférences des cookies
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#112240] border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Nécessaires</span>
                    <input type="checkbox" checked={preferences.necessary} disabled className="h-4 w-4 text-[#13508F]" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Indispensables au fonctionnement du portail.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#112240] border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Analytiques</span>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="h-4 w-4 text-[#13508F] accent-[#13508F] cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Statistiques anonymes de fréquentation.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#112240] border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Marketing</span>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="h-4 w-4 text-[#13508F] accent-[#13508F] cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Partages et interactions sociales.</p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Refuser tout
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="px-5 py-2 bg-[#13508F] hover:bg-[#0e3a6a] text-white rounded-xl text-xs font-semibold shadow-sm"
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
