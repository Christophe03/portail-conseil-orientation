'use client';

import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const requirements = [
  {
    platform: 'Android (APK)',
    badge: 'Application Native',
    icon: DevicePhoneMobileIcon,
    minVersion: 'Android 6.0 (Marshmallow+)',
    ram: '1.5 Go minimum (2 Go conseillé)',
    storage: '35 Mo disponible',
    connection: 'Hors ligne partiel (synchro en ligne)',
    features: [
      'Accès instantané sans connexion',
      'Calculateur de série du Bac intégré',
      'Fiches universités complètes',
      'Mises à jour automatiques'
    ]
  },
  {
    platform: 'Navigateur Web & Mobile',
    badge: 'Accès Direct Sans Installation',
    icon: GlobeAltIcon,
    minVersion: 'Chrome, Safari, Firefox, Edge',
    ram: 'Tout smartphone ou ordinateur',
    storage: '0 Mo requis',
    connection: 'Connexion internet requise',
    features: [
      'Accessible sur iPhone, Android et PC',
      'Recherche en direct de filières',
      'Fiches téléchargeables en PDF',
      'Partage de fiches par lien'
    ]
  },
  {
    platform: 'Tablettes & Ordinateurs',
    badge: 'Grand Écran Optimisé',
    icon: ComputerDesktopIcon,
    minVersion: 'Windows, macOS, Linux, iPadOS',
    ram: '2 Go minimum',
    storage: 'Navigateur moderne à jour',
    connection: 'Connexion haut débit ou 4G',
    features: [
      'Interface plein écran confortable',
      'Comparateur de séries côte à côte',
      'Espace d\'orientation pour conseillers',
      'Exportation et impression de listes'
    ]
  }
];

const recommendations = [
  'Vérifiez d\'avoir au moins 50 Mo d\'espace libre avant d\'installer le fichier APK.',
  'Activez la mise à jour automatique ou consultez régulièrement cette page pour obtenir la dernière version.',
  'Une connexion 3G/4G stable est recommandée lors du premier lancement pour synchroniser les dernières données.',
  'L\'application est conçue pour fonctionner avec une très faible consommation de données mobiles.'
];

export function SystemRequirements() {
  return (
    <section id="requirements" className="py-16 sm:py-24 bg-white dark:bg-[#0a192f] border-b border-slate-200 dark:border-slate-800">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Compatibilité Matérielle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Exigences et compatibilité{' '}
            <span className="text-[#13508F] dark:text-[#3B9DF8]">système</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Notre solution a été optimisée pour fonctionner de manière fluide même sur des smartphones d'entrée de gamme couramment utilisés au Mali.
          </p>
        </motion.div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50/70 dark:bg-[#112240] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Platform Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0">
                    <req.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {req.platform}
                    </h3>
                    <span className="text-xs font-medium text-[#13508F] dark:text-[#3B9DF8]">
                      {req.badge}
                    </span>
                  </div>
                </div>

                {/* Requirements List */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-b border-slate-200 dark:border-slate-800 py-4 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Version min.</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">{req.minVersion}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Mémoire RAM</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{req.ram}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Stockage</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{req.storage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Réseau</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">{req.connection}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Fonctionnalités incluses :
                  </h4>
                  <ul className="space-y-2">
                    {req.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircleIcon className="h-4 w-4 text-[#13508F] dark:text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-[#112240] border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-start gap-3.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0 mt-0.5">
              <InformationCircleIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Conseils pour une utilisation optimale
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Quelques recommandations pour tirer le maximum de l'application Conseil d'Orientation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#0a192f] border border-slate-200 dark:border-slate-800">
                <CheckCircleIcon className="h-5 w-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
