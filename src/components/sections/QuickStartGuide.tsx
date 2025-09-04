'use client';

import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  UserIcon,
  LightBulbIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: DevicePhoneMobileIcon,
    title: '1. Téléchargement',
    description: 'Téléchargez l\'application depuis l\'App Store, Google Play ou notre site web.',
    details: [
      'iOS : App Store (iOS 12.0+)',
      'Android : Google Play (Android 6.0+)',
      'APK : Téléchargement direct depuis notre site'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: UserIcon,
    title: '2. Création de Compte',
    description: 'Créez votre profil étudiant en quelques étapes simples.',
    details: [
      'Informations personnelles de base',
      'Niveau d\'études actuel',
      'Centres d\'intérêt et objectifs',
      'Préférences de formation'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    icon: LightBulbIcon,
    title: '3. Configuration IA',
    description: 'Laissez notre IA analyser votre profil pour des recommandations personnalisées.',
    details: [
      'Analyse automatique de votre profil',
      'Génération de recommandations',
      'Personnalisation des conseils',
      'Adaptation continue'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    icon: CheckCircleIcon,
    title: '4. Première Utilisation',
    description: 'Explorez les fonctionnalités et commencez votre parcours d\'orientation.',
    details: [
      'Découverte de l\'interface',
      'Recherche de bourses',
      'Accès aux ressources',
      'Premiers conseils IA'
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

const tips = [
  'Prenez le temps de bien remplir votre profil pour des recommandations plus précises',
  'Activez les notifications pour ne manquer aucune opportunité de bourse',
  'Utilisez régulièrement l\'assistant IA pour affiner vos choix',
  'Téléchargez les ressources éducatives pour un accès hors ligne'
];

export function QuickStartGuide() {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-3 mb-6">
          <RocketLaunchIcon className="h-8 w-8 text-secondary-600" />
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Guide de Démarrage Rapide
          </h2>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          Prêt à commencer votre voyage d'orientation ? Suivez ce guide en 4 étapes 
          pour configurer et utiliser l'application Conseil d'Orientation.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-soft"
          >
            {/* Step Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center`}>
                <step.icon className={`h-6 w-6 ${step.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Step Details */}
            <ul className="space-y-2">
              {step.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="flex items-start space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-r from-accent-50 to-warning-50 dark:from-accent-900/20 dark:to-warning-900/20 rounded-2xl p-8 border border-accent-200 dark:border-accent-700"
      >
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          💡 Conseils pour un Démarrage Réussi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <LightBulbIcon className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
              <span className="text-neutral-700 dark:text-neutral-300">{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Prêt pour la Suite ?
        </h3>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          Maintenant que vous avez configuré l'application, explorez nos guides détaillés 
          pour maîtriser toutes les fonctionnalités.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-semibold transition-colors duration-200">
            Guide des Fonctionnalités
          </button>
          <button className="px-6 py-3 border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
            Tutoriels Vidéo
          </button>
        </div>
      </motion.div>
    </section>
  );
}
