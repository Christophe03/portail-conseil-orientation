'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheckIcon,
  InformationCircleIcon,
  CheckIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookiePreferences() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookie-consent');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error('Erreur lors du chargement des préférences de cookies');
      }
    }
  }, []);

  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return;
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    if (preferences.analytics) {
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
      };
    }
    
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowModal(false);
    }, 1200);
  };

  const resetPreferences = () => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    window.location.reload();
  };

  return (
    <>
      {/* Bouton Flottant Cookies (Bas Gauche - Évite tout conflit avec le Chatbot à droite) */}
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 shadow-lg shadow-slate-900/5 hover:border-[#13508F] dark:hover:border-[#3B9DF8] hover:text-[#13508F] dark:hover:text-[#3B9DF8] transition-all duration-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B9DF8]/40"
        title="Gérer les préférences de cookies"
        aria-label="Gérer les cookies et la confidentialité"
      >
        <span className="text-sm leading-none" role="img" aria-label="Cookie">🍪</span>
        <span className="hidden sm:inline">Cookies</span>
      </motion.button>

      {/* Modal des préférences de confidentialité */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#112240] rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
                    <AdjustmentsHorizontalIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      Préférences des Cookies
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Respect de votre vie privée</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Fermer"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Le portail Conseil d'Orientation Mali utilise des cookies légers pour assurer le bon fonctionnement du site et analyser la navigation de manière anonyme. Vous pouvez personnaliser vos choix ci-dessous.
              </p>

              {/* Types de cookies */}
              <div className="space-y-3.5 mb-6">
                {/* Cookies nécessaires */}
                <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-[#0a192f] rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Cookies Essentiels (Obligatoires)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Indispensables au fonctionnement du site, à l'affichage des filières et à la mémorisation de vos thèmes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ml-3">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="h-4 w-4 text-[#13508F] bg-slate-100 border-slate-300 rounded cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Cookies analytiques */}
                <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-[#0a192f] rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <InformationCircleIcon className="h-5 w-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Mesures d'Audience & Statistiques
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Nous permettent de connaître les universités les plus consultées pour améliorer nos données.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ml-3">
                    <input
                      type="checkbox"
                      id="cookie-analytics"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="h-4 w-4 text-[#13508F] accent-[#13508F] rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Cookies marketing */}
                <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-[#0a192f] rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <InformationCircleIcon className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Personnalisation & Partages Réseaux
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Facilitent le partage direct de fiches universitaires sur WhatsApp ou Facebook.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ml-3">
                    <input
                      type="checkbox"
                      id="cookie-marketing"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="h-4 w-4 text-[#13508F] accent-[#13508F] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={resetPreferences}
                  className="px-5 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={savePreferences}
                  className="flex-1 px-5 py-3 bg-[#13508F] hover:bg-[#0e3a6a] text-white rounded-xl transition-all text-xs font-semibold flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
                >
                  {saved ? (
                    <>
                      <CheckIcon className="h-4 w-4 text-emerald-300" />
                      <span>Préférences enregistrées !</span>
                    </>
                  ) : (
                    'Enregistrer mes préférences'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
