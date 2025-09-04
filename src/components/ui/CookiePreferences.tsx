'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CogIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  CheckIcon,
  XMarkIcon
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
    // Charger les préférences existantes
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
    if (type === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Appliquer les préférences
    if (preferences.analytics) {
      // Activer Google Analytics
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
      };
    }
    
    if (preferences.marketing) {
      // Activer les cookies marketing
      console.log('Cookies marketing activés');
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetPreferences = () => {
    // Supprimer les préférences et afficher à nouveau la bannière
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    
    // Recharger la page pour afficher la bannière
    window.location.reload();
  };

  return (
    <>
      {/* Bouton pour ouvrir les préférences */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 z-40 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        title="Gérer les cookies"
      >
        <CogIcon className="h-6 w-6" />
      </button>

      {/* Modal des préférences */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                🍪 Préférences des Cookies
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Description */}
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Gérez vos préférences de cookies pour contrôler quelles informations nous collectons 
              et comment nous les utilisons pour améliorer votre expérience.
            </p>

            {/* Types de cookies */}
            <div className="space-y-4 mb-8">
              {/* Cookies nécessaires */}
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      Cookies Nécessaires
                    </h3>
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
                    className="h-5 w-5 text-green-600 bg-green-100 border-green-300 rounded focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Cookies analytiques */}
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      Cookies Analytiques
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      Nous aident à comprendre comment vous utilisez le site et à l'améliorer.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="h-5 w-5 text-blue-600 bg-blue-100 border-blue-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Cookies marketing */}
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      Cookies Marketing
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      Utilisés pour afficher des publicités pertinentes et personnalisées.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="h-5 w-5 text-purple-600 bg-purple-100 border-purple-300 rounded focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={resetPreferences}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 font-medium"
              >
                Réinitialiser
              </button>
              <button
                onClick={savePreferences}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                {saved ? (
                  <>
                    <CheckIcon className="h-5 w-5" />
                    Sauvegardé !
                  </>
                ) : (
                  'Enregistrer mes choix'
                )}
              </button>
            </div>

            {/* Note importante */}
            <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <strong>Note :</strong> Les cookies nécessaires sont toujours activés car ils sont 
                essentiels au fonctionnement du site. Vous pouvez modifier vos préférences à tout moment.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
