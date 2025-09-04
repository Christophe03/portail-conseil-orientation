'use client';

import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const requirements = [
  {
    platform: 'Android',
    icon: DevicePhoneMobileIcon,
    minVersion: '6.0 (API 23)',
    ram: '2 GB minimum',
    storage: '100 MB',
    connection: 'Internet requis',
    features: ['Notifications push', 'Synchronisation cloud', 'Mode hors ligne partiel'],
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    platform: 'iOS',
    icon: DevicePhoneMobileIcon,
    minVersion: '12.0',
    ram: '2 GB minimum',
    storage: '120 MB',
    connection: 'Internet requis',
    features: ['iCloud Sync', 'Notifications push', 'Mode hors ligne partiel'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    platform: 'APK Direct',
    icon: ComputerDesktopIcon,
    minVersion: '6.0 (API 23)',
    ram: '2 GB minimum',
    storage: '80 MB',
    connection: 'Internet requis',
    features: ['Installation manuelle', 'Contrôle total', 'Mises à jour manuelles'],
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

const recommendations = [
  'Connexion internet stable pour les fonctionnalités en temps réel',
  'Espace de stockage suffisant pour les ressources téléchargées',
  'Mise à jour régulière pour les dernières fonctionnalités',
  'Fermeture des autres applications pour de meilleures performances'
];

export function SystemRequirements() {
  return (
    <section className="section-padding bg-white dark:bg-neutral-900">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Exigences{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Système
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Assurez-vous que votre appareil répond aux exigences minimales 
            pour une expérience optimale avec l'application.
          </p>
        </motion.div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700"
            >
              {/* Platform Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 ${req.bgColor} rounded-xl flex items-center justify-center`}>
                  <req.icon className={`h-6 w-6 ${req.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {req.platform}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Version minimale
                  </p>
                </div>
              </div>

              {/* Requirements List */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Version OS:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{req.minVersion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">RAM:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{req.ram}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Stockage:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{req.storage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Connexion:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{req.connection}</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
                  Fonctionnalités incluses:
                </h4>
                <ul className="space-y-2">
                  {req.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700"
        >
          <div className="flex items-start space-x-4 mb-6">
            <ExclamationTriangleIcon className="h-8 w-8 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Recommandations pour une Expérience Optimale
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Suivez ces conseils pour profiter pleinement de toutes les fonctionnalités de l'application.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700 dark:text-neutral-300">{rec}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compatibility Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
            Votre appareil n'est pas compatible ? Contactez notre support pour des alternatives.
          </p>
          <button className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200">
            <span>Contacter le support</span>
            <CheckCircleIcon className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
